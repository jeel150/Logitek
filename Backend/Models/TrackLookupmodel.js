import mongoose from "mongoose";

const TrackLookupSchema = new mongoose.Schema({
  trackingId: { type: String, required: true, trim: true, index: true },
  ip: { type: String },
  createdAt: { type: Date, default: Date.now },
  // you can add status / location fields if you want to store lookups or real statuses
  response: { type: mongoose.Schema.Types.Mixed } 
});

export default mongoose.model("TrackLookup", TrackLookupSchema);
