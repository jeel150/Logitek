import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  role: { type: String, default: "user" }, // you can later add "admin"
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", UserSchema);
