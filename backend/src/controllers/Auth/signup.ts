import { Request, Response } from "express";
import User from "../../models/users";
const bcrypt = require("bcrypt");
import { generateToken } from "../../config/jwt";

interface user {
  fullName: string;
  password: string;
  email: string;
  profilePic?: string;
}

export const SignUp = async (req: Request, res: Response) => {
  try {
    console.log("i m in signup");
    const { fullName, email, password, profilepic } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please Provide all the data fields",
      });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let userObj: user = {
      fullName,
      email,
      password: hashedPassword,
    };

    if (profilepic) {
      userObj["profilePic"] = profilepic;
    }

    const newUser = new User(userObj);

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        success: true,
        data: {
          userid: newUser._id,
          fullName,
          email,
          profilePic: newUser.profilePic,
          since: newUser.createdAt,
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to create new user",
      });
    }
  } catch (error) {
    console.log("error in SignUp Controller..", error);
    res.status(500).json({
      success: false,
      message: "Error in SignUp Controller..",
    });
  }
};
