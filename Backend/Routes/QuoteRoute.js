import express from "express";
import validator from "validator";
import Quote from "../Models/Quotemodel.js";

const router = express.Router();

// Create new quote
router.post("/", async (req, res) => {
  try {
    const { name, email, service, message } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }
    const quote = new Quote({
      name: name.trim(),
      email: email.trim(),
      service: (service || "").trim(),
      message: (message || "").trim(),
      ip: req.ip
    });
    await quote.save();
    // TODO: send notification email to admin if needed
    return res.status(201).json({ message: "Quote saved", quoteId: quote._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

// (Optional) list quotes
router.get("/", async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 }).limit(200);
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
