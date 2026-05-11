import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Gửi OTP qua email
 * @param {string} to  - địa chỉ email nhận
 * @param {string} otp - mã OTP 6 chữ số
 */
export const sendOTPEmail = async (to, otp) => {
  const mailOptions = {
    from: `"Baitap03 App" <${process.env.EMAIL_USER}>`,
    to,
    subject: "🔐 Mã OTP đặt lại mật khẩu",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto;
                  border: 1px solid #e0e0e0; border-radius: 8px; padding: 32px;">
        <h2 style="color: #1677ff; margin-bottom: 8px;">Đặt lại mật khẩu</h2>
        <p style="color: #555;">Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.</p>
        <p style="color: #555;">Mã OTP của bạn là:</p>
        <div style="font-size: 36px; font-weight: bold; letter-spacing: 10px;
                    color: #1677ff; text-align: center; padding: 16px 0;">
          ${otp}
        </div>
        <p style="color: #888; font-size: 13px;">
          Mã có hiệu lực trong <strong>5 phút</strong>. Không chia sẻ mã này với ai.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;">
        <p style="color: #bbb; font-size: 12px; text-align: center;">
          Nếu bạn không yêu cầu điều này, hãy bỏ qua email này.
        </p>
      </div>
    `,
  };
  await transporter.sendMail(mailOptions);
};
