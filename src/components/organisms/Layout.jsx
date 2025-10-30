import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "@/layouts/Root";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import BottomNavigation from "@/components/organisms/BottomNavigation";

const Layout = () => {
  const { logout } = useAuth();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen flex flex-col">
      {isAuthenticated && (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
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
          </div>
        </header>
      )}
      <main className="flex-1">
        <Outlet />
      </main>
      {isAuthenticated && <BottomNavigation />}
    </div>
  );
};

export default Layout;