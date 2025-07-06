import { dbConnect } from "@/dbConnect";
import { Order } from "../../../../models/Order";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    await dbConnect();

    const newOrder = new Order(body);
    const saved = await newOrder.save();

    return NextResponse.json({ success: true, order: saved });
  } catch (err) {
    console.error("Save order error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to save order" },
      { status: 500 }
    );
  }
}
