import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { user } from "../models/users";
import dotenv from "dotenv";

dotenv.config();

export interface AuthenticatedRequest extends Request {
  user?: user;
}

export const AuthMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided." });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET not set in environment variables");
    }

    const decoded: any = jwt.verify(token, secret);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Unauthorized - User Not Found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in AuthMiddleware:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error in AuthMiddleware",
    });
  }
};
