import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { useComparison } from "@/hooks/useComparison";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToComparison, isInComparison } = useComparison();
  const [imageLoaded, setImageLoaded] = useState(false);
  const inComparison = isInComparison(product?.id);
  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleCompare = (e) => {
    e.stopPropagation();
    addToComparison(product);
  };

  const savings = product.originalPrice - product.price;
  const savingsPercent = Math.round((savings / product.originalPrice) * 100);

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.2 }}
      onClick={() => navigate(`/product/${product.Id}`)}
      className="bg-white rounded-lg overflow-hidden border border-gray-100 cursor-pointer group"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-shimmer" />
        )}
        <img
          src={product.images[0]}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {savingsPercent > 0 && (
            <Badge variant="accent" className="shadow-lg">
              Save {savingsPercent}%
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="error" className="shadow-lg">
              Out of Stock
            </Badge>
          )}
        </div>
<motion.button
          initial={{ opacity: 0, x: 20 }}
          whileHover={{ opacity: 1, x: 0 }}
          onClick={handleCompare}
          className={`absolute top-3 right-3 p-2 rounded-full ${
            inComparison 
              ? 'bg-accent text-white' 
              : 'bg-white/90 text-gray-700 hover:bg-white'
          } shadow-lg transition-colors`}
        >
          <ApperIcon name="GitCompare" size={18} />
        </motion.button>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
            <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
              {product.name}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <ApperIcon name="Star" size={14} className="text-warning fill-warning" />
            <span className="text-sm font-medium text-gray-900">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-400">({product.reviewCount})</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          <Badge variant="default" className="text-xs">
            {product.specs.ram}
          </Badge>
          <Badge variant="default" className="text-xs">
            {product.specs.storage}
          </Badge>
          <Badge variant="default" className="text-xs">
            {product.specs.camera.split(" ")[0]}
          </Badge>
        </div>

        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="text-2xl font-bold text-primary">
              ${product.price}
            </div>
            {product.originalPrice > product.price && (
              <div className="text-sm text-gray-400 line-through">
                ${product.originalPrice}
              </div>
            )}
          </div>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          variant="primary"
          size="md"
          className="w-full"
        >
          <ApperIcon name="ShoppingCart" size={18} className="mr-2" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;