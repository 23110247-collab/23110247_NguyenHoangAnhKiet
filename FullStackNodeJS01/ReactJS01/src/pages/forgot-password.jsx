import { useState } from "react";
import {
  Form, Input, Button, Card, Typography, message,
  Steps, Result,
} from "antd";
import { MailOutlined, SafetyOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { sendOTPAPI, verifyOTPAPI, resetPasswordAPI } from "../util/api";

const { Title, Text } = Typography;

const ForgotPasswordPage = () => {
  const [current, setCurrent] = useState(0); // 0: email, 1: OTP, 2: new password, 3: done
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [form] = Form.useForm();

  // ─── Bước 1: Gửi OTP ────────────────────────────────────────────────────────
  const handleSendOTP = async ({ email: inputEmail }) => {
    setLoading(true);
    try {
      const res = await sendOTPAPI(inputEmail);
      if (res.EC === 0) {
        setEmail(inputEmail);
        message.success(`OTP đã gửi đến ${inputEmail}`);
        setCurrent(1);
      } else {
        message.error(res.EM);
      }
    } catch {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  // ─── Bước 2: Xác thực OTP ───────────────────────────────────────────────────
  const handleVerifyOTP = async ({ otp: inputOtp }) => {
    setLoading(true);
    try {
      const res = await verifyOTPAPI(email, inputOtp);
      if (res.EC === 0) {
        setOtp(inputOtp);
        message.success("OTP hợp lệ!");
        setCurrent(2);
      } else {
        message.error(res.EM);
      }
    } catch {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  // ─── Bước 3: Đặt lại mật khẩu ──────────────────────────────────────────────
  const handleResetPassword = async ({ newPassword }) => {
    setLoading(true);
    try {
      const res = await resetPasswordAPI(email, otp, newPassword);
      if (res.EC === 0) {
        message.success("Đặt lại mật khẩu thành công!");
        setCurrent(3);
      } else {
        message.error(res.EM);
      }
    } catch {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { title: "Nhập Email" },
    { title: "Xác thực OTP" },
    { title: "Mật khẩu mới" },
  ];

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", background: "#f0f2f5",
    }}>
      <Card style={{ width: 460, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", borderRadius: 12 }}>

        {current < 3 && (
          <>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <Title level={3} style={{ margin: 0 }}>Quên mật khẩu</Title>
              <Text type="secondary">Khôi phục tài khoản của bạn</Text>
            </div>

            <Steps current={current} items={steps} size="small" style={{ marginBottom: 32 }} />
          </>
        )}

        {/* Bước 1 */}
        {current === 0 && (
          <Form layout="vertical" onFinish={handleSendOTP} autoComplete="off">
            <Text type="secondary" style={{ display: "block", marginBottom: 16 }}>
              Nhập email đã đăng ký. Chúng tôi sẽ gửi mã OTP đến email của bạn.
            </Text>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email" },
                { type: "email", message: "Email không hợp lệ" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="your@email.com" size="large" />
            </Form.Item>
            <Button type="primary" htmlType="submit" block size="large" loading={loading}>
              Gửi mã OTP
            </Button>
          </Form>
        )}

        {/* Bước 2 */}
        {current === 1 && (
          <Form layout="vertical" onFinish={handleVerifyOTP} form={form} autoComplete="off">
            <Text type="secondary" style={{ display: "block", marginBottom: 16 }}>
              Mã OTP đã gửi đến <strong>{email}</strong>. Có hiệu lực trong 5 phút.
            </Text>
            <Form.Item
              name="otp"
              label="Mã OTP"
              rules={[
                { required: true, message: "Vui lòng nhập mã OTP" },
                { len: 6, message: "Mã OTP gồm 6 chữ số" },
                { pattern: /^\d+$/, message: "Mã OTP chỉ gồm số" },
              ]}
            >
              <Input
                prefix={<SafetyOutlined />}
                placeholder="Nhập 6 chữ số"
                maxLength={6}
                size="large"
                style={{ letterSpacing: 6, fontSize: 20, textAlign: "center" }}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" block size="large" loading={loading}>
              Xác nhận OTP
            </Button>
            <Button
              type="link" block style={{ marginTop: 8 }}
              onClick={() => { setCurrent(0); form.resetFields(); }}
            >
              ← Gửi lại OTP
            </Button>
          </Form>
        )}

        {/* Bước 3 */}
        {current === 2 && (
          <Form layout="vertical" onFinish={handleResetPassword} autoComplete="off">
            <Text type="secondary" style={{ display: "block", marginBottom: 16 }}>
              Nhập mật khẩu mới cho tài khoản <strong>{email}</strong>.
            </Text>
            <Form.Item
              name="newPassword"
              label="Mật khẩu mới"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu mới" },
                { min: 6, message: "Tối thiểu 6 ký tự" },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Tối thiểu 6 ký tự" size="large" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              dependencies={["newPassword"]}
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value)
                      return Promise.resolve();
                    return Promise.reject(new Error("Mật khẩu không khớp"));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Nhập lại mật khẩu" size="large" />
            </Form.Item>
            <Button type="primary" htmlType="submit" block size="large" loading={loading}>
              Đặt lại mật khẩu
            </Button>
          </Form>
        )}

        {/* Hoàn thành */}
        {current === 3 && (
          <Result
            status="success"
            title="Đặt lại mật khẩu thành công!"
            subTitle="Bạn có thể đăng nhập với mật khẩu mới."
            extra={[
              <Button type="primary" key="login">
                <Link to="/login">Đăng nhập ngay</Link>
              </Button>,
            ]}
          />
        )}

        {current < 3 && (
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <Link to="/login">← Quay lại đăng nhập</Link>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
