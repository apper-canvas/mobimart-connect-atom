import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import { useCart } from "@/hooks/useCart";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

const navItems = [
    { path: "/", icon: "Home", label: "Home" },
    { path: "/categories", icon: "Grid3x3", label: "Categories" },
    { path: "/search", icon: "Search", label: "Search" },
    { path: "/orders", icon: "Package", label: "Orders" },
    { path: "/cart", icon: "ShoppingCart", label: "Cart", badge: cartCount }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-inset-bottom">
      <div className="flex items-center justify-around h-16 max-w-screen-xl mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.button
              key={item.path}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center flex-1 h-full relative"
            >
              <div className="relative">
                <ApperIcon
                  name={item.icon}
                  size={24}
                  className={`transition-colors ${
                    isActive ? "text-primary" : "text-gray-400"
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {item.badge > 0 && (
                  <Badge 
                    variant="accent" 
                    className="absolute -top-2 -right-2 min-w-[18px] h-[18px] flex items-center justify-center p-0 text-[10px]"
                  >
                    {item.badge > 99 ? "99+" : item.badge}
                  </Badge>
                )}
              </div>
              <span
                className={`text-xs mt-1 transition-colors ${
                  isActive ? "text-primary font-medium" : "text-gray-500"
                }`}
              >
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;