import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true },
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    items: [
      {
        productId: String,
        title: String,
        quantity: Number,
        size: String,
        desc: String,
        price: Number,
        unit: String,
      },
    ],
    status: { type: String },
    subTotal: { type: Number },
    shipFees: { type: Number },
    total: { type: Number, required: true },
    transactionId: { type: String },
    paymentMethod: { type: String },
    courierName: { type: String },
    deliveryInstructions: { type: String },
  },
  { timestamps: true }
);

// Avoid model overwrite upon hot-reloading
export const Order =
  mongoose.models.Order || mongoose.model("Order", orderSchema);
