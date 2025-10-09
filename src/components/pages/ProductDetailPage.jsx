import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { useComparison } from "@/hooks/useComparison";
import ApperIcon from "@/components/ApperIcon";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import productService from "@/services/api/productService";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
const { addToComparison, isInComparison } = useComparison();

  const loadProduct = useCallback(async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError("");
      const data = await productService.getById(id);
      setProduct(data);
    } catch (err) {
      setError(err?.message || "Failed to load product");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart(product, quantity);
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="p-4 max-w-screen-xl mx-auto">
        <div className="h-[400px] bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer rounded-lg mb-6" />
        <div className="space-y-4">
          <div className="h-8 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer rounded w-1/3" />
          <div className="h-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer rounded w-full" />
          <div className="h-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer rounded w-2/3" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="p-4 max-w-screen-xl mx-auto">
        <Error message={error || "Product not found"} onRetry={loadProduct} />
      </div>
    );
  }

const savings = (product?.originalPrice || 0) - (product?.price || 0);
  const savingsPercent = product?.originalPrice ? Math.round((savings / product.originalPrice) * 100) : 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-secondary to-accent text-white sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ApperIcon name="ArrowLeft" size={24} />
          </button>
          <h1 className="text-lg font-semibold flex-1">Product Details</h1>
          <button
onClick={() => product && addToComparison(product)}
            className={`p-2 rounded-lg transition-colors ${
              product && isInComparison(product.Id)
                ? "bg-white text-primary"
                : "hover:bg-white/10"
            }`}
          >
            <ApperIcon name="GitCompare" size={24} />
          </button>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square bg-gray-50 rounded-2xl overflow-hidden"
            >
<img
                src={product?.images?.[selectedImage] || ""}
                alt={product?.name || "Product"}
                className="w-full h-full object-cover"
              />
            </motion.div>
<div className="flex gap-3">
              {(product?.images || []).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-primary scale-105"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
<img
                    src={image}
                    alt={`${product?.name || "Product"} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
<div>
              <p className="text-sm text-gray-500 mb-2">{product?.brand || ""}</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product?.name || "Product Name"}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <ApperIcon
                        key={i}
                        name="Star"
className={`${
                          i < Math.floor(product?.rating || 0)
                            ? "text-warning fill-warning"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                </div>
                  <span className="font-medium">{product?.rating || 0}</span>
                </div>
                <span className="text-gray-500">
                  ({product?.reviewCount || 0} reviews)
                </span>
              </div>

              {/* Stock Status */}
<div className="mb-6">
                {product?.inStock ? (
                  <Badge variant="success" className="text-sm">
                    <ApperIcon name="Check" size={14} className="mr-1" />
                    In Stock
                  </Badge>
                ) : (
                  <Badge variant="error" className="text-sm">
                    <ApperIcon name="X" size={14} className="mr-1" />
                    Out of Stock
                  </Badge>
                )}
              </div>

              {/* Price */}
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 mb-6">
<div className="flex items-end gap-4 mb-2">
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    ${product?.price || 0}
                  </div>
{(product?.originalPrice || 0) > (product?.price || 0) && (
                    <div className="text-xl text-gray-400 line-through pb-1">
                      ${product?.originalPrice || 0}
                    </div>
                  )}
                </div>
                {savingsPercent > 0 && (
                  <Badge variant="accent" className="text-sm">
                    Save {savingsPercent}% (${savings})
                  </Badge>
                )}
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-2 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-white rounded transition-colors"
                  >
                    <ApperIcon name="Minus" size={20} />
                  </button>
                  <span className="w-12 text-center font-medium text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-white rounded transition-colors"
                  >
                    <ApperIcon name="Plus" size={20} />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mb-8">
<Button
                  onClick={handleBuyNow}
                  disabled={!product?.inStock}
                  variant="primary"
                  size="lg"
                  className="flex-1"
                >
                  <ApperIcon name="ShoppingBag" size={20} className="mr-2" />
                  Buy Now
                </Button>
<Button
                  onClick={handleAddToCart}
                  disabled={!product?.inStock}
                  variant="secondary"
                  size="lg"
                  className="flex-1"
                >
                  <ApperIcon name="ShoppingCart" size={20} className="mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Description
              </h2>
<p className="text-gray-600 leading-relaxed">
                {product?.description || "No description available."}
              </p>
            </div>

            {/* Specifications */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Specifications
              </h2>
<div className="bg-gray-50 rounded-xl p-6 space-y-4">
                {Object.entries(product?.specs || {}).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0"
                  >
                    <span className="text-gray-600 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <span className="font-medium text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;