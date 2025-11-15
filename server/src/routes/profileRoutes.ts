import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import User from "../models/User";

const router = express.Router();

router.get("/me", authMiddleware, async (req: any, res) => {
  try {
    const userId = req.userId; 
    const user = await User.findById(userId).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

