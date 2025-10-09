import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useComparison } from "@/hooks/useComparison";
import Empty from "@/components/ui/Empty";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const ComparisonPage = () => {
  const navigate = useNavigate();
  const { comparisonItems, removeFromComparison, clearComparison } = useComparison();

  if (comparisonItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-br from-primary via-secondary to-accent text-white">
          <div className="max-w-screen-xl mx-auto px-4 py-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ApperIcon name="ArrowLeft" size={24} />
              </button>
              <h1 className="text-2xl font-bold">Compare Products</h1>
            </div>
          </div>
        </div>
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <Empty
            message="No products to compare"
            description="Add products from the catalog to compare their specifications"
            actionLabel="Browse Products"
            actionPath="/"
          />
        </div>
      </div>
    );
  }

  const specs = [
    { key: "display", label: "Display" },
    { key: "processor", label: "Processor" },
    { key: "ram", label: "RAM" },
    { key: "storage", label: "Storage" },
    { key: "camera", label: "Camera" },
    { key: "battery", label: "Battery" },
    { key: "os", label: "Operating System" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-secondary to-accent text-white">
        <div className="max-w-screen-xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ApperIcon name="ArrowLeft" size={24} />
              </button>
              <div>
                <h1 className="text-2xl font-bold">Compare Products</h1>
                <p className="text-white/90">{comparisonItems.length} products</p>
              </div>
            </div>
            {comparisonItems.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearComparison}
                className="text-white hover:bg-white/10"
              >
                <ApperIcon name="Trash2" size={18} className="mr-2" />
                Clear All
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6">
        {/* Mobile View */}
        <div className="block lg:hidden space-y-6">
          {comparisonItems.map((product) => (
            <motion.div
              key={product.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg overflow-hidden border border-gray-100"
            >
              <div className="relative">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full aspect-square object-cover"
                />
                <button
                  onClick={() => removeFromComparison(product.Id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-error hover:text-white transition-colors"
                >
                  <ApperIcon name="X" size={18} />
                </button>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
                <h3 className="font-semibold text-lg text-gray-900 mb-3">
                  {product.name}
                </h3>
                <div className="text-2xl font-bold text-primary mb-4">
                  ${product.price}
                </div>
                <div className="space-y-3">
                  {specs.map((spec) => (
                    <div key={spec.key} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                      <span className="text-sm text-gray-600">{spec.label}</span>
                      <span className="text-sm font-medium text-gray-900 text-right">
                        {product.specs[spec.key]}
                      </span>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => navigate(`/product/${product.Id}`)}
                  variant="primary"
                  size="md"
                  className="w-full mt-4"
                >
                  View Details
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden lg:block bg-white rounded-lg overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="w-48 p-4 text-left bg-gray-50">
                    <div className="text-sm font-medium text-gray-500">Specification</div>
                  </th>
                  {comparisonItems.map((product) => (
                    <th key={product.Id} className="p-4 text-center relative">
                      <button
                        onClick={() => removeFromComparison(product.Id)}
                        className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <ApperIcon name="X" size={16} />
                      </button>
                      <div className="w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      <div className="text-xl font-bold text-primary mb-3">
                        ${product.price}
                      </div>
                      <Button
                        onClick={() => navigate(`/product/${product.Id}`)}
                        variant="primary"
                        size="sm"
                      >
                        View Details
                      </Button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="p-4 bg-gray-50 font-medium text-gray-700">
                    Rating
                  </td>
                  {comparisonItems.map((product) => (
                    <td key={product.Id} className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <ApperIcon name="Star" size={16} className="text-warning fill-warning" />
                        <span className="font-medium">{product.rating}</span>
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 bg-gray-50 font-medium text-gray-700">
                    Stock
                  </td>
                  {comparisonItems.map((product) => (
                    <td key={product.Id} className="p-4 text-center">
                      <Badge variant={product.inStock ? "success" : "error"}>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </td>
                  ))}
                </tr>
                {specs.map((spec) => (
                  <tr key={spec.key} className="border-b border-gray-100 last:border-0">
                    <td className="p-4 bg-gray-50 font-medium text-gray-700">
                      {spec.label}
                    </td>
                    {comparisonItems.map((product) => (
                      <td key={product.Id} className="p-4 text-center text-gray-900">
                        {product.specs[spec.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;