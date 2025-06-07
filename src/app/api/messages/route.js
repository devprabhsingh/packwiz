// app/api/messages/route.js
import { Message } from "../../../../models/Message";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (
      !name ||
      name.trim().length < 3 ||
      !email ||
      !message ||
      message.trim().length === 0
    ) {
      return new Response(JSON.stringify({ message: "Invalid input." }), {
        status: 400,
      });
    }

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    // Check if this email has submitted a message in the last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const recentMessage = await Message.findOne({
      email,
      createdAt: { $gte: fiveMinutesAgo },
    });

    if (recentMessage) {
      return new Response(
        JSON.stringify({
          message:
            "You already submitted a message. Please wait 5 minutes or use a different email.",
        }),
        { status: 409 }
      );
    }

    const newMsg = new Message({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      msg: message.trim(),
    });

    await newMsg.save();

    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response("Error saving message", { status: 500 });
  }
}
