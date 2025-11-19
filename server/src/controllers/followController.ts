import { Request, Response } from "express";
import User from "../models/User";

export const followUser = async (req: any, res: Response) => {
  try {
    const targetId = req.params.id;
    const userId = req.userId as string;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    if (targetId === userId) return res.status(400).json({ message: "Cannot follow yourself" });

    const target = await User.findById(targetId);
    const me = await User.findById(userId);
    if (!target || !me) return res.status(404).json({ message: "User not found" });

    if (target.followers.map(String).includes(userId)) {
      return res.status(400).json({ message: "Already following" });
    }

    target.followers.push(me._id);
    me.following.push(target._id);

    await target.save();
    await me.save();

    return res.json({ message: "Followed" });
  } catch (err) {
    console.error("Follow error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const unfollowUser = async (req: any, res: Response) => {
  try {
    const targetId = req.params.id;
    const userId = req.userId as string;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const target = await User.findById(targetId);
    const me = await User.findById(userId);
    if (!target || !me) return res.status(404).json({ message: "User not found" });

    target.followers = target.followers.filter((f: any) => f.toString() !== userId);
    me.following = me.following.filter((f: any) => f.toString() !== targetId);

    await target.save();
    await me.save();

    return res.json({ message: "Unfollowed" });
  } catch (err) {
    console.error("Unfollow error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
