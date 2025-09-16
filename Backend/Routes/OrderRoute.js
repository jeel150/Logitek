import express from "express";
import validator from "validator";
import Order from "../Models/Ordermodel.js";

const router = express.Router();

// POST /api/orders
router.post("/", async (req, res) => {
  try {
    const { plan, email, name } = req.body;

    if (!plan || !["Basic", "Premium", "Business"].includes(plan)) {
      return res.status(400).json({ error: "Invalid plan" });
    }
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ error: "Valid email required" });
    }

    const order = new Order({ plan, email: email.toLowerCase(), name });
    await order.save();

    res.status(201).json({
      message: "Order placed successfully",
      orderId: order._id,
    });
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/orders (admin use)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(100);
    res.json(orders);
  } catch (err) {
    console.error("Fetch orders error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
