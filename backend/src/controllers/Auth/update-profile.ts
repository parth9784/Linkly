import { Response } from "express";
import { AuthenticatedRequest } from "../../middleware/authmiddlware";
import cloudinary from "../../config/cloudinary";
import User from "../../models/users";

export const UpdateProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { profilePic, fullName } = req.body;

    if (!profilePic && !fullName) {
      return res.status(400).json({ message: "Please send an update." });
    }

    const userId = req.user?._id;
    const updateObj: { fullName?: string; profilePic?: string } = {};

    if (fullName) {
      updateObj.fullName = fullName;
    }

    if (profilePic) {
      const uploadResponse = await cloudinary.uploader.upload(profilePic, {
        resource_type: "auto",
      });
      updateObj.profilePic = uploadResponse.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateObj, {
      new: true,
    });

    const user = {
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      since: updatedUser.createdAt,
      profilePic: updatedUser.profilePic,
      userid: updatedUser._id,
    };

    return res.status(200).json({ success: true, userinfo: user });
  } catch (error) {
    console.error("Error in Update Profile controller", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error in Update Controller" });
  }
};
