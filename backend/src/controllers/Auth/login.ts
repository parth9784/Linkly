import { Request, Response } from "express";
import User from "../../models/users";
import { generateToken } from "../../config/jwt";
import { console } from "node:inspector/promises";
import { AuthenticatedRequest } from "../../middleware/authmiddlware";
const bcrypt = require("bcrypt");
require("dotenv").config();

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        userExist.password
      );
      if (!isPasswordCorrect) {
        res.status(401).json({
          success: false,
          message: "Invalid Credentials",
        });
      }
      generateToken(userExist._id, res);
      res.status(200).json({
        success: true,
        data: {
          userid: userExist._id,
          email: userExist.email,
          profilePic: userExist.profilePic,
          fullName: userExist.fullName,
          since: userExist.createdAt,
        },
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.log("Error in Login Controller");
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error in Login" });
  }
};

export const LogOut = async (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
      success: true,
      message: "Logout Successfully",
    });
  } catch (error) {
    console.log("Error in Logout Controller", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error in Logout",
    });
  }
};

export const checkAuth = (req: AuthenticatedRequest, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    console.log("Error in Check Auth Controller", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error in Check Auth",
    });
  }
};
