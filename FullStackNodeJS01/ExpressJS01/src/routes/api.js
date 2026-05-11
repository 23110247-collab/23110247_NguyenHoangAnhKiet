import express from "express";
import {
  handleRegister,
  handleLogin,
  handleGetAccount,
  handleGetAllUsers,
  handleSendOTP,
  handleVerifyOTP,
  handleResetPassword,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// ─── Auth (không cần token) ──────────────────────────────────────────────────
router.post("/register", handleRegister); // Đã xóa /v1/api
router.post("/login", handleLogin);       // Đã xóa /v1/api

// ─── Forgot Password ─────────────────────────────────────────────────────────
router.post("/forgot-password/send-otp", handleSendOTP);
router.post("/forgot-password/verify-otp", handleVerifyOTP);
router.post("/forgot-password/reset-password", handleResetPassword);

// ─── Protected (cần token) ───────────────────────────────────────────────────
router.get("/account", authMiddleware, handleGetAccount);
router.get("/users", authMiddleware, handleGetAllUsers);

export default router;