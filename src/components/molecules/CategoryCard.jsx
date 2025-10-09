import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

const CategoryCard = ({ category, count, icon, color }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/categories?category=${category}`)}
      className="bg-white rounded-lg p-6 cursor-pointer border border-gray-100 hover:shadow-lg transition-all"
    >
      <div 
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
        style={{ background: `linear-gradient(135deg, ${color}20, ${color}40)` }}
      >
        <ApperIcon name={icon} size={24} style={{ color }} />
      </div>
      <h3 className="font-semibold text-gray-900 mb-1 capitalize">
        {category.replace("-", " ")}
      </h3>
      <p className="text-sm text-gray-500">{count} phones</p>
    </motion.div>
  );
};

export default CategoryCard;