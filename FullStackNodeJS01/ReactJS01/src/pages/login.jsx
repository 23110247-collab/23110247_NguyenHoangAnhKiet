import { useState } from "react";
import { Form, Input, Button, Card, Typography, message, Divider } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../util/api";
import { useAuth } from "../components/context/auth.context";

const { Title, Text } = Typography;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await loginAPI(values.email, values.password);
      if (res.EC === 0) {
        const { token, user } = res.DT;
        localStorage.setItem("access_token", token);
        setAuth({ isAuthenticated: true, user });
        message.success("Đăng nhập thành công!");
        navigate("/");
      } else {
        message.error(res.EM);
      }
    } catch {
      message.error("Đăng nhập thất bại, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", background: "#f0f2f5",
    }}>
      <Card style={{ width: 420, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", borderRadius: 12 }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={3} style={{ margin: 0 }}>Chào mừng trở lại</Title>
          <Text type="secondary">Đăng nhập vào tài khoản của bạn</Text>
        </div>

        <Form layout="vertical" onFinish={onFinish} autoComplete="off">
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

          <Form.Item
            name="password"
            label={
              <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <span>Mật khẩu</span>
                <Link to="/forgot-password" tabIndex={-1}>Quên mật khẩu?</Link>
              </div>
            }
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" size="large" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block size="large" loading={loading}>
            Đăng nhập
          </Button>
        </Form>

        <Divider />
        <div style={{ textAlign: "center" }}>
          <Text type="secondary">Chưa có tài khoản? </Text>
          <Link to="/register">Đăng ký ngay</Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
