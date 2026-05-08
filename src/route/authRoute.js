import express from "express";
const router = express.Router();
import rateLimit from "express-rate-limit";
import authController from "../controllers/authController.js";

const authLimiter = rateLimit({
  windowMs: 1000 * 60 * 15,
  max: 5,
  message: "Too many attempts, please try again later",
});

router.post("/register", authController.register);
router.post("/login", authLimiter, authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);

export default router;
