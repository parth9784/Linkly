import { Response } from "express";
const jwt = require("jsonwebtoken");
require("dotenv").config();

export const generateToken = (userId: string, res: Response): string | void => {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("SECRET_KEY not set in environment variables");

    const token = jwt.sign({ userId }, secret, {
      expiresIn: "7d",
    });

    const cookieOptions = {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict" as const,
    };

    res.cookie("jwt", token, cookieOptions);

    return token;
  } catch (error) {
    console.error("Error in generateToken function:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
