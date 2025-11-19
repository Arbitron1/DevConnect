import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import { getUserProfile, getMyProfile } from "../controllers/profileController";

const router = express.Router();
router.get("/me", authMiddleware, getMyProfile);
router.get("/:id", getUserProfile);

export default router;
