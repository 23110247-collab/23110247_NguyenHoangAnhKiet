import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import User from "../models/user.js";
import PasswordReset from "../models/otp.js";
import { sendOTPEmail } from "../config/mailer.js";

const SALT_ROUNDS = 10;

// ─── REGISTER ────────────────────────────────────────────────────────────────
export const registerService = async ({ username, email, password }) => {
  const existing = await User.findOne({ where: { email } });
  if (existing) return { EC: 1, EM: "Email đã được sử dụng" };

  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  await User.create({ username, email, password: hashed });
  return { EC: 0, EM: "Đăng ký thành công" };
};

// ─── LOGIN ────────────────────────────────────────────────────────────────────
export const loginService = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) return { EC: 1, EM: "Email hoặc mật khẩu không đúng" };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return { EC: 1, EM: "Email hoặc mật khẩu không đúng" };

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    EC: 0,
    EM: "Đăng nhập thành công",
    DT: {
      token,
      user: { id: user.id, username: user.username, email: user.email, role: user.role },
    },
  };
};

// ─── GET ACCOUNT ──────────────────────────────────────────────────────────────
export const getAccountService = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: ["id", "username", "email", "role", "createdAt"],
  });
  if (!user) return { EC: 1, EM: "Người dùng không tồn tại" };
  return { EC: 0, EM: "OK", DT: { user } };
};

// ─── GET ALL USERS ────────────────────────────────────────────────────────────
export const getAllUsersService = async () => {
  const users = await User.findAll({
    attributes: ["id", "username", "email", "role", "createdAt"],
    order: [["createdAt", "DESC"]],
  });
  return { EC: 0, EM: "OK", DT: users };
};

// ─── FORGOT PASSWORD – Bước 1: Gửi OTP ──────────────────────────────────────
export const sendOTPService = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) return { EC: 1, EM: "Email không tồn tại trong hệ thống" };

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await PasswordReset.destroy({ where: { email } });
  await PasswordReset.create({ email, otp, expiresAt });

  try {
    await sendOTPEmail(email, otp);
  } catch (err) {
    console.error("Gửi email thất bại:", err.message);
    return { EC: 2, EM: "Không thể gửi email, vui lòng thử lại" };
  }

  return { EC: 0, EM: "OTP đã được gửi đến email của bạn" };
};

// ─── FORGOT PASSWORD – Bước 2: Verify OTP ────────────────────────────────────
export const verifyOTPService = async (email, otp) => {
  const record = await PasswordReset.findOne({
    where: { email, otp, used: false, expiresAt: { [Op.gt]: new Date() } },
    order: [["createdAt", "DESC"]],
  });
  if (!record) return { EC: 1, EM: "OTP không hợp lệ hoặc đã hết hạn" };
  return { EC: 0, EM: "OTP hợp lệ", DT: { otpId: record.id } };
};

// ─── FORGOT PASSWORD – Bước 3: Reset Password ────────────────────────────────
export const resetPasswordService = async (email, otp, newPassword) => {
  const record = await PasswordReset.findOne({
    where: { email, otp, used: false, expiresAt: { [Op.gt]: new Date() } },
  });
  if (!record) return { EC: 1, EM: "OTP không hợp lệ hoặc đã hết hạn" };

  const hashed = await bcrypt.hash(newPassword, SALT_ROUNDS);
  await User.update({ password: hashed }, { where: { email } });
  await record.update({ used: true });

  return { EC: 0, EM: "Đặt lại mật khẩu thành công" };
};