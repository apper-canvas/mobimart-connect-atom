import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const COMPARISON_STORAGE_KEY = "mobimart_comparison";
const MAX_COMPARISON = 3;

export const useComparison = () => {
  const [comparisonItems, setComparisonItems] = useState(() => {
    const saved = localStorage.getItem(COMPARISON_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(COMPARISON_STORAGE_KEY, JSON.stringify(comparisonItems));
  }, [comparisonItems]);

  const addToComparison = (product) => {
    if (comparisonItems.find(item => item.Id === product.Id)) {
      toast.info("Already in comparison");
      return false;
    }

    if (comparisonItems.length >= MAX_COMPARISON) {
      toast.warning(`Maximum ${MAX_COMPARISON} products can be compared`);
      return false;
    }

    setComparisonItems(prev => [...prev, product]);
    toast.success("Added to comparison");
    return true;
  };

  const removeFromComparison = (productId) => {
    setComparisonItems(prev => prev.filter(item => item.Id !== productId));
    toast.info("Removed from comparison");
  };

  const clearComparison = () => {
    setComparisonItems([]);
    toast.info("Comparison cleared");
  };

  const isInComparison = (productId) => {
    return comparisonItems.some(item => item.Id === productId);
  };

  return {
    comparisonItems,
    addToComparison,
    removeFromComparison,
    clearComparison,
    isInComparison,
    canAddMore: comparisonItems.length < MAX_COMPARISON
  };
};