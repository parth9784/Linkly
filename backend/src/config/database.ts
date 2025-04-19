const mongoose = require("mongoose");
require("dotenv").config();

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database is Connected...");
  } catch (error) {
    console.log("Database Connection Failed", error);
  }
};
