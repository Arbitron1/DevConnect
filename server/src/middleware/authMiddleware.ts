import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: any;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT secret missing in environment");
    }

    const decoded = jwt.verify(token, secret);
    req.user = decoded;

    next();
  } catch (err) {
    console.error("JWT Verification Error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
