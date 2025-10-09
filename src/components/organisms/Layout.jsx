import { Outlet } from "react-router-dom";
import BottomNavigation from "@/components/organisms/BottomNavigation";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <main className="min-h-screen">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Layout;