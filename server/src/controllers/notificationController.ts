import { Request, Response } from "express";
import Notification from "../models/Notification";

export const getNotifications = async (req: any, res: Response) => {
  try {
    const userId = req.userId as string;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const notifications = await Notification.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    res.json({ notifications });
  } catch (err) {
    console.error("Get notifications error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
