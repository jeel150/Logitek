import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import quoteRoutes from "./Routes/QuoteRoute.js";
import newsletterRoutes from "./Routes/NewsletterRoute.js";
import trackRoutes from "./Routes/TrackRoute.js";
import orderRoutes from "./Routes/OrderRoute.js";
import contactRoutes from "./Routes/ContactRoute.js";

dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "*" // change to your front-end origin in production
}));
app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // limit each IP to 60 requests per windowMs
});
app.use(limiter);

// routes
app.use("/api/quotes", quoteRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/track", trackRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => res.send({ message: "Faster backend running" }));

// DB connect and start
const PORT = process.env.PORT || 5000;
async function start() {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI not set in env");
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB Atlas");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}
start();
