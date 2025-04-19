import { checkAuth, Login, LogOut } from "../controllers/Auth/login";
import { SignUp } from "../controllers/Auth/signup";
import { UpdateProfile } from "../controllers/Auth/update-profile";
import {
  getMessages,
  getuserforSidebar,
} from "../controllers/messageController";
import { AuthMiddleware } from "../middleware/authmiddlware";
const express = require("express");
const router = express.Router();

router.post("/signup", SignUp);
router.post("/login", Login);
router.post("/logout", LogOut);

router.put("/update/profile", AuthMiddleware, UpdateProfile);
router.get("/checkAuth", AuthMiddleware, checkAuth);

router.get("/get/users", AuthMiddleware, getuserforSidebar);
router.get("/message/:id", AuthMiddleware, getMessages);
router.post("/send/:id", AuthMiddleware);

module.exports = router;
