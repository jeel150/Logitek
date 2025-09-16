import express from "express";
import validator from "validator";
import Newsletter from "../Models/Newslettermodel.js";  // your existing newsletter model
import User from "../Models/Usermodel.js";             // your existing user model

const router = express.Router();

// POST /api/newsletter
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ error: "Valid email required" });
    }

    const normalized = email.trim().toLowerCase();

    // Save newsletter entry (your original logic)
    const newsletterDoc = await Newsletter.findOneAndUpdate(
      { email: normalized },
      { $setOnInsert: { email: normalized, ip: req.ip } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // NEW: Also save user entry (if not exists)
    let userDoc = await User.findOne({ email: normalized });
    if (!userDoc) {
      userDoc = new User({ email: normalized });
      await userDoc.save();
    }

    return res.status(201).json({
      message: "Signed up successfully",
      newsletterId: newsletterDoc._id,
      userId: userDoc._id
    });
  } catch (err) {
    console.error("Newsletter error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// GET /api/newsletter
router.get("/", async (req, res) => {
  try {
    const list = await Newsletter.find().sort({ createdAt: -1 }).limit(500);
    res.json(list);
  } catch (err) {
    console.error("Newsletter GET error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
