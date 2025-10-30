import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const { product, quantity } = item;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="bg-white rounded-lg p-4 border border-gray-100"
    >
      <div className="flex gap-4">
<div className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={
              product.images 
                ? (Array.isArray(product.images) ? product.images[0] : product.images)
                : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect fill="%23e5e7eb" width="100" height="100"/%3E%3Cpath fill="%239ca3af" d="M30 35h40v30H30z"/%3E%3Ccircle fill="%239ca3af" cx="40" cy="45" r="5"/%3E%3Cpath fill="%239ca3af" d="M35 60l10-10 5 5 15-15 5 5v15H35z"/%3E%3C/svg%3E'
            }
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
              <h3 className="font-semibold text-gray-900 line-clamp-2">
                {product.name}
              </h3>
            </div>
            <button
              onClick={() => onRemove(product.Id)}
              className="text-gray-400 hover:text-error transition-colors flex-shrink-0"
            >
              <ApperIcon name="Trash2" size={18} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="default" className="text-xs">
              {product.specs.ram}
            </Badge>
            <Badge variant="default" className="text-xs">
              {product.specs.storage}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
              <button
                onClick={() => onUpdateQuantity(product.Id, quantity - 1)}
                className="w-8 h-8 flex items-center justify-center hover:bg-white rounded transition-colors"
              >
                <ApperIcon name="Minus" size={16} />
              </button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <button
                onClick={() => onUpdateQuantity(product.Id, quantity + 1)}
                className="w-8 h-8 flex items-center justify-center hover:bg-white rounded transition-colors"
              >
                <ApperIcon name="Plus" size={16} />
              </button>
            </div>

            <div className="text-right">
              <div className="text-xl font-bold text-primary">
                ${(product.price * quantity).toFixed(2)}
              </div>
              <div className="text-xs text-gray-500">
                ${product.price} each
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;