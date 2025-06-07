import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    msg: { type: String, required: true },
  },
  { timestamps: true }
);

// Avoid model overwrite upon hot-reloading
export const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);
