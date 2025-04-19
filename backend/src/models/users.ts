const mongoose = require("mongoose");

export interface user {
  _id?: string;
  email: string;
  password: string;
  fullName: string;
  profilePic: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    fullName: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: true,
      default:
        "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
