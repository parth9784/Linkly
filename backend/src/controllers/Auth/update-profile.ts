import { Response } from "express";
import { AuthenticatedRequest } from "../../middleware/authmiddlware";
import cloudinary from "../../config/cloudinary";
import User from "../../models/users";
export const UpdateProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { profilepic } = req.body();
    if (!profilepic) {
      return res
        .status(400)
        .json({ message: "Please send a profile picture." });
    }
    const userId = req.user?._id;
    const uploadResponse = await cloudinary.uploader.upload(profilepic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in Update Profile controller", error);
    res
      .status(500)
      .json({ message: "Internal Server Error in Update Controller" });
  }
};
