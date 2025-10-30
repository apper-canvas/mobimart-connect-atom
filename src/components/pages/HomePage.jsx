import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useComparison } from "@/hooks/useComparison";
import productService from "@/services/api/productService";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import ProductGrid from "@/components/organisms/ProductGrid";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import CategoryCard from "@/components/molecules/CategoryCard";
import SearchBar from "@/components/molecules/SearchBar";

const HomePage = () => {
const [featured, setFeatured] = useState([]);
  const [trending, setTrending] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { comparisonItems } = useComparison();

const categories = [
    { name: "flagship", icon: "Star", color: "#3b82f6", count: 0 },
    { name: "mid-range", icon: "Tablet", color: "#0ea5e9", count: 0 },
    { name: "budget", icon: "DollarSign", color: "#10b981", count: 0 }
  ];

  const getCategoryCounts = () => {
    return categories.map(category => ({
      ...category,
      count: allProducts.filter(p => p.category_type_c === category.name).length
    }));
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [featuredData, trendingData, allData] = await Promise.all([
        productService.getFeatured(),
        productService.getTrending(),
        productService.getAll()
      ]);
      setFeatured(featuredData.slice(0, 4));
      setTrending(trendingData.slice(0, 4));
      setAllProducts(allData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="p-4 max-w-screen-xl mx-auto">
        <div className="h-12 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer rounded-lg mb-6" />
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 max-w-screen-xl mx-auto">
        <Error message={error} onRetry={loadData} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-secondary to-accent text-white">
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="text-3xl font-bold mb-2">MobiMart</h1>
            <p className="text-white/90">Find your perfect smartphone</p>
          </motion.div>
          <SearchBar />
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-8">
{/* Categories */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Shop by Category Type</h2>
          <div className="grid grid-cols-3 gap-3">
            {getCategoryCounts().map((category) => (
              <CategoryCard
                key={category.name}
                category={category.name}
                count={category.count}
                icon={category.icon}
                color={category.color}
              />
            ))}
          </div>
        </section>

{/* Featured Products */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Featured Phones</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/categories")}
            >
              View All
              <ApperIcon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </div>
          <ProductGrid products={featured} />
        </section>

        {/* Trending */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/categories")}
            >
              View All
              <ApperIcon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </div>
          <ProductGrid products={trending} />
        </section>

        {/* Promo Banner */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white"
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-3">Get Up to 20% Off</h2>
            <p className="text-white/90 mb-6">
              Shop the latest flagship phones and save big on your favorite brands
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => navigate("/categories")}
            >
              Shop Now
              <ApperIcon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </div>
        </motion.section>
      </div>

      {/* Comparison Floating Button */}
      {comparisonItems.length > 0 && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => navigate("/comparison")}
          className="fixed bottom-20 right-4 bg-gradient-to-r from-accent to-secondary text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 z-40"
        >
          <ApperIcon name="GitCompare" size={20} />
          <span className="font-medium">Compare ({comparisonItems.length})</span>
        </motion.button>
      )}
    </div>
  );
};

export default HomePage;