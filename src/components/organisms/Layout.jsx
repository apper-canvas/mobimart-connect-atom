import { Outlet } from "react-router-dom";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "../../App";
import ApperIcon from "@/components/ApperIcon";
import BottomNavigation from "@/components/organisms/BottomNavigation";
import Button from "@/components/atoms/Button";

const Layout = () => {
  const { logout } = useContext(AuthContext);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {isAuthenticated && (
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold">
              M
            </div>
            <span className="font-semibold text-gray-900">MobiMart</span>
          </div>
          <div className="flex items-center gap-3">
            {user && (
              <span className="text-sm text-gray-600">
                Welcome, {user.firstName || user.name || 'User'}
              </span>
            )}
            <Button
              onClick={logout}
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <ApperIcon name="LogOut" size={16} />
              Logout
            </Button>
          </div>
        </header>
      )}
      <main className="min-h-screen">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Layout;