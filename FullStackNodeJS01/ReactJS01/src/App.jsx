import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Spin } from "antd";
import Header from "./components/layout/header";
import { useAuth } from "./components/context/auth.context";
import { getAccountAPI } from "./util/api";

const App = () => {
  const { setAuth, appLoading, setAppLoading } = useAuth();

  // Kiểm tra token hợp lệ khi reload trang
  useEffect(() => {
    const fetchAccount = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setAppLoading(false);
        return;
      }
      try {
        const res = await getAccountAPI();
        if (res.EC === 0) {
          setAuth({ isAuthenticated: true, user: res.DT.user });
        } else {
          localStorage.removeItem("access_token");
        }
      } catch {
        localStorage.removeItem("access_token");
      } finally {
        setAppLoading(false);
      }
    };
    fetchAccount();
  }, []);

  if (appLoading) {
    return (
      <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" }}>
        <Spin size="large" tip="Đang tải..." />
      </div>
    );
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default App;
