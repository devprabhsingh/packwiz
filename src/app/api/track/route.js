import { dbConnect } from "@/utils";
import { Order } from "../../../../models/Order";
import { NextResponse } from "next/server";

// Handles GET /api/track?tx=... or ?email=...
export async function GET(request) {
  await dbConnect(); // ensure DB is connected

  const { searchParams } = new URL(request.url);
  const tx = searchParams.get("tx");
  const email = searchParams.get("email");

  try {
    if (tx) {
      const order = await Order.findOne({ transactionId: tx });

      if (!order) {
        return NextResponse.json(
          { error: "Order not found." },
          { status: 404 }
        );
      }

      return NextResponse.json(order);
    }

    if (email) {
      const orders = await Order.find({ email });

      if (orders.length === 0) {
        return NextResponse.json(
          { error: "No orders found for this email." },
          { status: 404 }
        );
      }

      return NextResponse.json(orders);
    }

    return NextResponse.json(
      { error: "Missing transaction ID or email." },
      { status: 400 }
    );
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
