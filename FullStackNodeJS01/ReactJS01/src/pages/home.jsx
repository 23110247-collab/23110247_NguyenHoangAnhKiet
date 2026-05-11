import { Typography, Card, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/context/auth.context";

const { Title, Text } = Typography;

const HomePage = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center",
      justifyContent: "center", background: "#f0f2f5",
    }}>
      <Card style={{ width: 480, textAlign: "center", borderRadius: 12,
                     boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <Title level={2}>🎓 Baitap03</Title>
        <Text type="secondary" style={{ fontSize: 16 }}>
          Full-stack app với ExpressJS + MySQL + ReactJS
        </Text>

        <div style={{ marginTop: 24 }}>
          {auth.isAuthenticated ? (
            <>
              <Title level={4}>Xin chào, {auth.user.username}! 👋</Title>
              <Text>Email: {auth.user.email}</Text><br />
              <Text>Vai trò: <strong>{auth.user.role}</strong></Text>
              {auth.user.role === "admin" && (
                <div style={{ marginTop: 16 }}>
                  <Button type="primary" onClick={() => navigate("/users")}>
                    Xem danh sách Users
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 16 }}>
              <Button size="large" onClick={() => navigate("/login")}>Đăng nhập</Button>
              <Button type="primary" size="large" onClick={() => navigate("/register")}>
                Đăng ký
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default HomePage;
