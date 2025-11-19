import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import { followUser, unfollowUser } from "../controllers/followController";

const router = express.Router();

router.post("/:id", authMiddleware, followUser);
router.delete("/:id", authMiddleware, unfollowUser);

export default router;
