import {
  registerService,
  loginService,
  getAccountService,
  getAllUsersService,
  sendOTPService,
  verifyOTPService,
  resetPasswordService,
} from "../services/userService.js";

export const handleRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ EC: 1, EM: "Vui lòng điền đầy đủ thông tin" });
    }
    const result = await registerService({ username, email, password });
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ EC: -1, EM: "Lỗi server" });
  }
};

export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ EC: 1, EM: "Vui lòng điền đầy đủ thông tin" });
    }
    const result = await loginService({ email, password });
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ EC: -1, EM: "Lỗi server" });
  }
};

export const handleGetAccount = async (req, res) => {
  try {
    // req.user được gán bởi middleware auth
    const result = await getAccountService(req.user.id);
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ EC: -1, EM: "Lỗi server" });
  }
};

export const handleGetAllUsers = async (req, res) => {
  try {
    const result = await getAllUsersService();
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ EC: -1, EM: "Lỗi server" });
  }
};

// Bước 1: Gửi OTP
export const handleSendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ EC: 1, EM: "Vui lòng nhập email" });
    const result = await sendOTPService(email);
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ EC: -1, EM: "Lỗi server" });
  }
};

// Bước 2: Xác thực OTP
export const handleVerifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ EC: 1, EM: "Thiếu email hoặc OTP" });
    }
    const result = await verifyOTPService(email, otp);
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ EC: -1, EM: "Lỗi server" });
  }
};

// Bước 3: Đặt lại mật khẩu
export const handleResetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ EC: 1, EM: "Thiếu thông tin" });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ EC: 1, EM: "Mật khẩu mới tối thiểu 6 ký tự" });
    }
    const result = await resetPasswordService(email, otp, newPassword);
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ EC: -1, EM: "Lỗi server" });
  }
};