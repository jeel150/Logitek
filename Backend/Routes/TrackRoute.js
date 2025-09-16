import express from "express";
import TrackLookup from "../Models/TrackLookupmodel.js";

const router = express.Router();

// POST /api/track
router.post("/", async (req, res) => {
  try {
    const { trackingId } = req.body;
    if (!trackingId || typeof trackingId !== "string") {
      return res.status(400).json({ error: "trackingId required" });
    }

    const trimmed = trackingId.trim();

    // Example mock response (static for now)
    const mockResponse = {
      trackingId: trimmed,
      status: "In Transit",
      lastLocation: "Mumbai Hub",
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 3600 * 1000) // +3 days
    };

    // Save lookup in DB
    const record = new TrackLookup({
      trackingId: trimmed,
      ip: req.ip,
      response: mockResponse
    });
    await record.save();

    return res.json({ ok: true, data: mockResponse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
