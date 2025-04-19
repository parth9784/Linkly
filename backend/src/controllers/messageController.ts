import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/authmiddlware";
import User from "../models/users";
import Message from "../models/message";
import cloudinary from "../config/cloudinary";

export const getuserforSidebar = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user?._id;
    const filteredUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );
    res.status(200).json({
      success: true,
      data: filteredUsers,
    });
  } catch (error) {
    console.log("Error in getuserforSidebar Controller", error);
    res.status(500).json({
      message: "Internal Server Error in getuserforSidebar Controller",
      success: false,
    });
  }
};

export const getMessages = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user?._id;
    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: senderId },
      ],
    });
    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.log("Error in getMessages Controller");
  }
};

export const SendMessage = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id: messageto } = req.params;
    const { text, image } = req.body();
    const senderId = req.user?._id;
    let imageUrl;
    if (image) {
      const cloudinaryResponse = await cloudinary.uploader.upload(image);
      imageUrl = cloudinaryResponse.secure_url;
    }
    const newMessage = new Message({
      senderId,
      receiverId: messageto,
      image: imageUrl,
      text,
    });
    await newMessage.save();

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.log("Error in getMessage Controller", error);
  }
};
