import AuthGuard from "@/hocs/AuthGuard";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <AuthGuard>
        <Header />
        <Outlet />
        <Footer />
      </AuthGuard>
    </>
  );
};

export default MainLayout;
