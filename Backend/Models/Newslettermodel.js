import mongoose from "mongoose";

const NewsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, trim: true, unique: true },
  ip: { type: String, required: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Newsletter", NewsletterSchema);
