import { NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "@/app/components/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { order } = await req.json();

    if (!order.email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const {
      email,
      customerName,
      phone,
      subTotal,
      shipFees,
      total,
      shipMethod,
      address,
      items,
      transactionId,
    } = order;

    const cartItems = Array.isArray(items) ? items : [];

    const html = (
      <EmailTemplate
        name={customerName}
        phone={phone}
        email={email}
        address={
          address.street +
            ", " +
            address.city +
            ", " +
            address.postalCode +
            ", " +
            address.state +
            ", " +
            address.country || ""
        }
        cartItems={cartItems}
        paymentMethod={shipMethod || "COD(Cash On Delivery)"}
        subTotal={parseFloat(subTotal)}
        shipFees={parseFloat(shipFees)}
        total={parseFloat(total)}
        transactionId={transactionId}
      />
    );

    const res = await resend.emails.send({
      from: "Packwiz <info@packwiz.ca>",
      to: [email, "info@packwiz.ca"],
      subject: "Order Confirmation",
      react: html,
    });

    if (res.error) {
      return NextResponse.json({ error: res.error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
