import express from "express";
import userController from "../controllers/userController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/profile", verifyToken, userController.getUserProfile);
router.put("/edit-profile", verifyToken, userController.updateUserProfile);

export default router;
