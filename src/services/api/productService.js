import productsData from "@/services/mockData/products.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const productService = {
  getAll: async () => {
    await delay(300);
    return [...productsData];
  },

  getById: async (id) => {
    await delay(200);
    const product = productsData.find(p => p.Id === parseInt(id));
    if (!product) throw new Error("Product not found");
    return { ...product };
  },

  getByCategory: async (category) => {
    await delay(300);
    return productsData.filter(p => p.category === category).map(p => ({ ...p }));
  },

  search: async (query) => {
    await delay(250);
    const lowerQuery = query.toLowerCase();
    return productsData.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.brand.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
    ).map(p => ({ ...p }));
  },

  filterProducts: async (filters) => {
    await delay(300);
    let filtered = [...productsData];

    if (filters.brands && filters.brands.length > 0) {
      filtered = filtered.filter(p => filters.brands.includes(p.brand));
    }

    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter(p => filters.categories.includes(p.category));
    }

    if (filters.priceRange) {
      filtered = filtered.filter(p => 
        p.price >= filters.priceRange.min && p.price <= filters.priceRange.max
      );
    }

    if (filters.inStockOnly) {
      filtered = filtered.filter(p => p.inStock);
    }

    if (filters.ram && filters.ram.length > 0) {
      filtered = filtered.filter(p => filters.ram.includes(p.specs.ram));
    }

    if (filters.storage && filters.storage.length > 0) {
      filtered = filtered.filter(p => filters.storage.includes(p.specs.storage));
    }

    return filtered;
  },

  getFeatured: async () => {
    await delay(300);
    return productsData.filter(p => p.rating >= 4.6).map(p => ({ ...p }));
  },

  getTrending: async () => {
    await delay(300);
    return productsData.filter(p => p.reviewCount > 500).map(p => ({ ...p }));
  }
};

export default productService;