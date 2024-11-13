import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middlewre.js";
import { upload } from "../middlewares/multer.middleware.js";

// Import controllers
import {
  changeCurrentPassword,
  getCurrentUser,
  getUserById,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
  updateAvatar,
} from "../controllers/user.controller.js";

const router = Router();

// User registration route
router.route("/register").post(upload.single("avatar"), registerUser);

// User login route
router.route("/login").post(loginUser);

// User logout route
router.route("/logout").post(verifyJwt, logoutUser);

// Refresh 'access token' route
router.route("/refresh-token").post(refreshAccessToken);

// Change password route
router.route("/change-password").post(verifyJwt, changeCurrentPassword);

// Get current user route
router.route("/current-user").get(verifyJwt, getCurrentUser);

// Get user by ID
router.route("/:userId").get(getUserById);

// Update account details route
router.route("/update-account").patch(verifyJwt, updateAccountDetails);

// Update avatar route
router.route("/avatar").patch(verifyJwt, upload.single("avatar"), updateAvatar);

export default router;
