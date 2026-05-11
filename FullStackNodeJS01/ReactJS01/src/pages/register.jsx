import { useState } from "react";
import { Form, Input, Button, Card, Typography, message, Divider } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { registerAPI } from "../util/api";

const { Title, Text } = Typography;

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { username, email, password } = values;
    setLoading(true);
    try {
      const res = await registerAPI(username, email, password);
      if (res.EC === 0) {
        message.success(res.EM);
        navigate("/login");
      } else {
        message.error(res.EM);
      }
    } catch {
      message.error("Đăng ký thất bại, vui lòng thử lại");
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
          <Title level={3} style={{ margin: 0 }}>Tạo tài khoản</Title>
          <Text type="secondary">Đăng ký để bắt đầu sử dụng</Text>
        </div>

        <Form layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item
            name="username"
            label="Tên người dùng"
            rules={[
              { required: true, message: "Vui lòng nhập tên người dùng" },
              { min: 2, message: "Tối thiểu 2 ký tự" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nhập tên của bạn" size="large" />
          </Form.Item>

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
            label="Mật khẩu"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu" },
              { min: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Tối thiểu 6 ký tự" size="large" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp"));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Nhập lại mật khẩu" size="large" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block size="large" loading={loading}>
            Đăng ký
          </Button>
        </Form>

        <Divider />
        <div style={{ textAlign: "center" }}>
          <Text type="secondary">Đã có tài khoản? </Text>
          <Link to="/login">Đăng nhập ngay</Link>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
