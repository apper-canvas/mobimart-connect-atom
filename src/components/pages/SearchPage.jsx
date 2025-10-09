import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import productService from "@/services/api/productService";
import SearchBar from "@/components/molecules/SearchBar";
import ProductGrid from "@/components/organisms/ProductGrid";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem("recent_searches");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
      handleSearch(query);
    }
  }, [searchParams]);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const results = await productService.search(query);
      setProducts(results);
      
      // Save to recent searches
      const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("recent_searches", JSON.stringify(updated));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRecentSearch = (query) => {
    setSearchQuery(query);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recent_searches");
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-secondary to-accent text-white">
        <div className="max-w-screen-xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ApperIcon name="ArrowLeft" size={24} />
            </button>
            <h1 className="text-2xl font-bold">Search</h1>
          </div>
          <SearchBar onSearch={handleSearch} defaultValue={searchQuery} />
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error message={error} onRetry={() => handleSearch(searchQuery)} />
        ) : searchQuery ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Search Results
              </h2>
              <Badge variant="info">{products.length} found</Badge>
            </div>
            <ProductGrid products={products} />
          </>
        ) : (
          <div className="space-y-6">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Recent Searches
                  </h2>
                  <button
                    onClick={clearRecentSearches}
                    className="text-sm text-gray-500 hover:text-error transition-colors"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentSearch(search)}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm hover:border-primary hover:text-primary transition-colors"
                    >
                      <ApperIcon name="Clock" size={14} className="inline mr-2" />
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Searches */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Popular Searches
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["iPhone", "Samsung Galaxy", "Google Pixel", "OnePlus", "Budget phones", "Flagship"].map((term) => (
                  <button
                    key={term}
                    onClick={() => handleRecentSearch(term)}
                    className="bg-white border border-gray-200 rounded-lg p-4 text-left hover:border-primary hover:shadow-md transition-all group"
                  >
                    <ApperIcon name="TrendingUp" size={20} className="text-gray-400 group-hover:text-primary mb-2" />
                    <div className="font-medium text-gray-900">{term}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Browse by Category
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { name: "Flagship", icon: "Smartphone", path: "/categories?category=flagship" },
                  { name: "Mid-Range", icon: "Tablet", path: "/categories?category=mid-range" },
                  { name: "Budget", icon: "DollarSign", path: "/categories?category=budget" }
                ].map((category) => (
                  <button
                    key={category.name}
                    onClick={() => navigate(category.path)}
                    className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-4 text-center hover:shadow-lg transition-all"
                  >
                    <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                      <ApperIcon name={category.icon} size={24} className="text-white" />
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {category.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;