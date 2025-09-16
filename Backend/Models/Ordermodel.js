import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    plan: {
      type: String,
      enum: ["Basic", "Premium", "Business"],
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    name: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
