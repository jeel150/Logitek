import mongoose from "mongoose";

const QuoteSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  service: { type: String, required: false, trim: true },
  message: { type: String, required: false, trim: true },
  ip: { type: String, required: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Quote", QuoteSchema);
