import { useState, useEffect } from "react";
import FilterSection from "@/components/molecules/FilterSection";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const FilterSidebar = ({ onFilterChange, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    brands: initialFilters.brands || [],
    categories: initialFilters.categories || [],
    priceRange: initialFilters.priceRange || { min: 0, max: 1500 },
    inStockOnly: initialFilters.inStockOnly || false,
    ram: initialFilters.ram || [],
    storage: initialFilters.storage || []
  });

  useEffect(() => {
    onFilterChange(filters);
  }, [filters]);

  const brands = ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi", "Motorola", "Nothing", "Realme", "Poco"];
  const categories = ["flagship", "mid-range", "budget"];
  const ramOptions = ["6GB", "8GB", "12GB"];
  const storageOptions = ["128GB", "256GB", "512GB"];

  const handleBrandToggle = (brand) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  const handleCategoryToggle = (category) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleRamToggle = (ram) => {
    setFilters(prev => ({
      ...prev,
      ram: prev.ram.includes(ram)
        ? prev.ram.filter(r => r !== ram)
        : [...prev.ram, ram]
    }));
  };

  const handleStorageToggle = (storage) => {
    setFilters(prev => ({
      ...prev,
      storage: prev.storage.includes(storage)
        ? prev.storage.filter(s => s !== storage)
        : [...prev.storage, storage]
    }));
  };

  const handleReset = () => {
    setFilters({
      brands: [],
      categories: [],
      priceRange: { min: 0, max: 1500 },
      inStockOnly: false,
      ram: [],
      storage: []
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
        <Button variant="ghost" size="sm" onClick={handleReset}>
          <ApperIcon name="RotateCcw" size={16} className="mr-2" />
          Reset
        </Button>
      </div>

      <div className="space-y-4">
        <FilterSection title="Category">
          <div className="space-y-2">
            {categories.map(category => (
              <label key={category} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-gray-700 group-hover:text-primary transition-colors capitalize">
                  {category.replace("-", " ")}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Brand">
          <div className="space-y-2">
            {brands.map(brand => (
              <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => handleBrandToggle(brand)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-gray-700 group-hover:text-primary transition-colors">
                  {brand}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Price Range">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Min</label>
                <input
                  type="number"
                  value={filters.priceRange.min}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    priceRange: { ...prev.priceRange, min: parseInt(e.target.value) || 0 }
                  }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Max</label>
                <input
                  type="number"
                  value={filters.priceRange.max}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    priceRange: { ...prev.priceRange, max: parseInt(e.target.value) || 1500 }
                  }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="1500"
              step="50"
              value={filters.priceRange.max}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                priceRange: { ...prev.priceRange, max: parseInt(e.target.value) }
              }))}
              className="w-full"
            />
          </div>
        </FilterSection>

        <FilterSection title="RAM">
          <div className="space-y-2">
            {ramOptions.map(ram => (
              <label key={ram} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.ram.includes(ram)}
                  onChange={() => handleRamToggle(ram)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-gray-700 group-hover:text-primary transition-colors">
                  {ram}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Storage">
          <div className="space-y-2">
            {storageOptions.map(storage => (
              <label key={storage} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.storage.includes(storage)}
                  onChange={() => handleStorageToggle(storage)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-gray-700 group-hover:text-primary transition-colors">
                  {storage}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Availability">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) => setFilters(prev => ({ ...prev, inStockOnly: e.target.checked }))}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <span className="text-gray-700 group-hover:text-primary transition-colors">
              In Stock Only
            </span>
          </label>
        </FilterSection>
      </div>
    </div>
  );
};

export default FilterSidebar;