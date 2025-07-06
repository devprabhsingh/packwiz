import { Order } from "../../../../models/Order"; // your mongoose model
import { dbConnect } from "@/dbConnect";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { EmailTemplate } from "@/app/components/EmailTemplate";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function tryFetchOrder(
  email,
  transactionId,
  attempts = 5,
  delayMs = 500
) {
  for (let i = 0; i < attempts; i++) {
    await dbConnect(); // connect to DB
    const order = await Order.findOne({ email, transactionId });

    if (order) {
      return order; // found!
    }

    console.warn(`Retry ${i + 1}/${attempts} - Order not found yet...`);
    await delay(delayMs); // wait before retrying
  }
  return null; // not found after retries
}

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    const metadata = paymentIntent.metadata || {};
    const email = metadata.email;
    const transactionId = paymentIntent.id;

    try {
      const order = await tryFetchOrder(email, transactionId);

      if (!order) {
        console.error(
          "❌ Order not found for email:",
          email,
          "and transactionId:",
          transactionId
        );
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

      const emailHtml = (
        <EmailTemplate
          name={order.customerName}
          phone={order.phone}
          email={order.email}
          address={`${order.address.street}, ${order.address.city}, ${order.address.state}`}
          cartItems={order.items}
          paymentMethod={order.paymentMethod}
          subTotal={order.subTotal}
          shipFees={order.shipFees}
          total={order.total}
          transactionId={transactionId}
          courierName={order.courierName}
        />
      );

      const res = await resend.emails.send({
        from: "Packwiz <info@packwiz.ca>",
        to: [email, "info@packwiz.ca"],
        subject: "Order Confirmation",
        react: emailHtml,
      });

      if (res.error) {
        console.error("❌ Email sending failed:", res.error);
      } else {
        console.log("✅ Order email sent to", email);
      }
    } catch (err) {
      console.error("❌ Error processing payment webhook:", err);
    }
  }

  return NextResponse.json({ received: true });
}
