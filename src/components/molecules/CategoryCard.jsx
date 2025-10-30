import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'

const CategoryCard = ({ category, count, icon, color }) => {
  const navigate = useNavigate()

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(`/categories?category_type=${category}`)}
      className="relative overflow-hidden rounded-xl cursor-pointer group"
      style={{
        background: `linear-gradient(135deg, ${color}20 0%, ${color}40 100%)`
      }}
    >
      <div className="p-4 flex flex-col items-center text-center space-y-2">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: color }}
        >
          <ApperIcon name={icon} size={24} className="text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 capitalize">
            {category}
          </h3>
          <p className="text-sm text-gray-600">
            {count} {count === 1 ? 'phone' : 'phones'}
          </p>
        </div>
      </div>
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
        style={{ backgroundColor: color }}
      />
    </motion.div>
  )
}

export default CategoryCard