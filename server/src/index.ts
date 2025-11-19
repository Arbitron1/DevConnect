import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";

// Ensure .env is loaded early
dotenv.config();

import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";
import postRoutes from "./routes/postRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import followRoutes from "./routes/followRoutes";
import notificationRoutes from "./routes/notificationRoutes";

import cloudinary from "./config/cloudinary";   

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/devconnect";

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("DB Error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => res.send("DevConnect API is running"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
