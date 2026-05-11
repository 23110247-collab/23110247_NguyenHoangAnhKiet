import { useEffect, useState } from "react";
import { Table, Tag, Typography, message, Card } from "antd";
import { getAllUsersAPI } from "../util/api";
import { useAuth } from "../components/context/auth.context";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchUsers();
  }, [auth.isAuthenticated]);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsersAPI();
      if (res.EC === 0) setUsers(res.DT);
      else message.error(res.EM);
    } catch {
      message.error("Không thể tải danh sách users");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: 60 },
    { title: "Tên", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={role === "admin" ? "red" : "blue"}>
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      render: (val) => new Date(val).toLocaleDateString("vi-VN"),
    },
  ];

  return (
    <div style={{ padding: "24px", maxWidth: 900, margin: "0 auto" }}>
      <Card>
        <Title level={4} style={{ marginBottom: 16 }}>👥 Danh sách người dùng</Title>
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
          bordered
        />
      </Card>
    </div>
  );
};

export default UserPage;
