import { Link, useNavigate } from "react-router-dom";
import { Menu, Button, Avatar, Dropdown, message } from "antd";
import { UserOutlined, LogoutOutlined, TeamOutlined, HomeOutlined } from "@ant-design/icons";
import { useAuth } from "../context/auth.context";

const Header = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setAuth({ isAuthenticated: false, user: { id: "", username: "", email: "", role: "" } });
    message.success("Đăng xuất thành công");
    navigate("/login");
  };

  const dropdownItems = {
    items: [
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: "Đăng xuất",
        danger: true,
        onClick: handleLogout,
      },
    ],
  };

  const menuItems = [
    { key: "home", icon: <HomeOutlined />, label: <Link to="/">Trang chủ</Link> },
  ];

  if (auth.isAuthenticated && (auth.user.role === "admin")) {
    menuItems.push({
      key: "users",
      icon: <TeamOutlined />,
      label: <Link to="/users">Quản lý Users</Link>,
    });
  }

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 24px", background: "#001529", height: 64,
    }}>
      {/* Logo */}
      <Link to="/" style={{ color: "#fff", fontSize: 20, fontWeight: 700, whiteSpace: "nowrap" }}>
        🎓 Baitap03
      </Link>

      {/* Menu */}
      <Menu
        theme="dark"
        mode="horizontal"
        items={menuItems}
        style={{ flex: 1, minWidth: 0, marginLeft: 24 }}
      />

      {/* Auth area */}
      <div>
        {auth.isAuthenticated ? (
          <Dropdown menu={dropdownItems} placement="bottomRight">
            <div style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              <Avatar style={{ backgroundColor: "#1677ff" }} icon={<UserOutlined />} />
              <span style={{ color: "#fff" }}>{auth.user.username}</span>
            </div>
          </Dropdown>
        ) : (
          <div style={{ display: "flex", gap: 8 }}>
            <Button onClick={() => navigate("/login")}>Đăng nhập</Button>
            <Button type="primary" onClick={() => navigate("/register")}>Đăng ký</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
