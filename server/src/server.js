import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from './routes/admin/productRoutes.js'
dotenv.config();

const app = express();

/* -------------------- MIDDLEWARES -------------------- */
// Parse JSON body
app.use(express.json());
app.use(cors());

/* -------------------- ROUTES -------------------- */

app.use("/api/auth", authRoutes);
app.use('/api/products', productRoutes);
// Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

/* -------------------- DATABASE -------------------- */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

/* -------------------- SERVER -------------------- */

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});



