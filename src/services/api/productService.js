const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Transform database record to frontend format
const transformProduct = (dbProduct) => {
  if (!dbProduct) return null;
  
  return {
    Id: dbProduct.Id,
    name: dbProduct.name_c || '',
    brand: dbProduct.brand_c || '',
    price: dbProduct.price_c || 0,
    originalPrice: dbProduct.original_price_c || 0,
    images: dbProduct.images_c ? dbProduct.images_c.split(',').map(img => img.trim()) : [],
    category: dbProduct.category_c || '',
    specs: {
      display: dbProduct.display_c || '',
      processor: dbProduct.processor_c || '',
      ram: dbProduct.ram_c || '',
      storage: dbProduct.storage_c || '',
      camera: dbProduct.camera_c || '',
      battery: dbProduct.battery_c || '',
      os: dbProduct.os_c || ''
    },
    inStock: dbProduct.in_stock_c || false,
    rating: dbProduct.rating_c || 0,
    reviewCount: dbProduct.review_count_c || 0,
    description: dbProduct.description_c || ''
  };
};

const productService = {
  getAll: async () => {
    await delay(300);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.fetchRecords('product_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "category_type_c"}},
          {"field": {"Name": "display_c"}},
          {"field": {"Name": "processor_c"}},
          {"field": {"Name": "ram_c"}},
          {"field": {"Name": "storage_c"}},
          {"field": {"Name": "camera_c"}},
          {"field": {"Name": "battery_c"}},
          {"field": {"Name": "os_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "description_c"}}
        ]
      });
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data.map(transformProduct);
    } catch (error) {
      console.error("Error fetching products:", error?.response?.data?.message || error);
      return [];
    }
  },

  getById: async (id) => {
    await delay(200);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.getRecordById('product_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "display_c"}},
          {"field": {"Name": "processor_c"}},
          {"field": {"Name": "ram_c"}},
          {"field": {"Name": "storage_c"}},
          {"field": {"Name": "camera_c"}},
          {"field": {"Name": "battery_c"}},
          {"field": {"Name": "os_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "description_c"}}
        ]
      });
      
      if (!response.success) {
        throw new Error(response.message);
      }
      
      return transformProduct(response.data);
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error?.response?.data?.message || error);
      throw new Error("Product not found");
    }
  },

getByCategory: async (category) => {
    await delay(300);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.fetchRecords('product_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "category_type_c"}},
          {"field": {"Name": "display_c"}},
          {"field": {"Name": "processor_c"}},
          {"field": {"Name": "ram_c"}},
          {"field": {"Name": "storage_c"}},
          {"field": {"Name": "camera_c"}},
          {"field": {"Name": "battery_c"}},
          {"field": {"Name": "os_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "description_c"}}
        ],
        where: [{"FieldName": "category_c", "Operator": "EqualTo", "Values": [category]}]
      });
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data.map(transformProduct);
    } catch (error) {
      console.error("Error fetching products by category:", error?.response?.data?.message || error);
      return [];
    }
  },

  getByCategoryType: async (categoryType) => {
    await delay(300);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.fetchRecords('product_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "category_type_c"}},
          {"field": {"Name": "display_c"}},
          {"field": {"Name": "processor_c"}},
          {"field": {"Name": "ram_c"}},
          {"field": {"Name": "storage_c"}},
          {"field": {"Name": "camera_c"}},
          {"field": {"Name": "battery_c"}},
          {"field": {"Name": "os_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "description_c"}}
        ],
        where: [{"FieldName": "category_type_c", "Operator": "EqualTo", "Values": [categoryType]}]
      });
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data.map(transformProduct);
    } catch (error) {
      console.error("Error fetching products by category type:", error?.response?.data?.message || error);
      return [];
    }
  },

  search: async (query) => {
    await delay(250);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.fetchRecords('product_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "display_c"}},
          {"field": {"Name": "processor_c"}},
          {"field": {"Name": "ram_c"}},
          {"field": {"Name": "storage_c"}},
          {"field": {"Name": "camera_c"}},
          {"field": {"Name": "battery_c"}},
          {"field": {"Name": "os_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "description_c"}}
        ],
        whereGroups: [{
          "operator": "OR",
          "subGroups": [
            {
              "conditions": [
                {"fieldName": "name_c", "operator": "Contains", "values": [query]}
              ]
            },
            {
              "conditions": [
                {"fieldName": "brand_c", "operator": "Contains", "values": [query]}
              ]
            },
            {
              "conditions": [
                {"fieldName": "category_c", "operator": "Contains", "values": [query]}
              ]
            }
          ]
        }]
      });
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data.map(transformProduct);
    } catch (error) {
      console.error("Error searching products:", error?.response?.data?.message || error);
      return [];
    }
  },

filterProducts: async (filters) => {
    await delay(300);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const whereConditions = [];
      
      if (filters.brands && filters.brands.length > 0) {
        whereConditions.push({
          "FieldName": "brand_c",
          "Operator": "ExactMatch",
          "Values": filters.brands
        });
      }
      
      if (filters.categories && filters.categories.length > 0) {
        whereConditions.push({
          "FieldName": "category_c", 
          "Operator": "ExactMatch",
          "Values": filters.categories
        });
      }
      
      if (filters.priceRange) {
        whereConditions.push({
          "FieldName": "price_c",
          "Operator": "GreaterThanOrEqualTo",
          "Values": [filters.priceRange.min]
        });
        whereConditions.push({
          "FieldName": "price_c",
          "Operator": "LessThanOrEqualTo", 
          "Values": [filters.priceRange.max]
        });
      }
      
      if (filters.inStockOnly) {
        whereConditions.push({
          "FieldName": "in_stock_c",
          "Operator": "EqualTo",
          "Values": [true]
        });
      }
      
      if (filters.ram && filters.ram.length > 0) {
        whereConditions.push({
          "FieldName": "ram_c",
          "Operator": "ExactMatch",
          "Values": filters.ram
        });
      }
      
      if (filters.storage && filters.storage.length > 0) {
        whereConditions.push({
          "FieldName": "storage_c",
          "Operator": "ExactMatch", 
          "Values": filters.storage
        });
      }
      
      const response = await apperClient.fetchRecords('product_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "category_type_c"}},
          {"field": {"Name": "display_c"}},
          {"field": {"Name": "processor_c"}},
          {"field": {"Name": "ram_c"}},
          {"field": {"Name": "storage_c"}},
          {"field": {"Name": "camera_c"}},
          {"field": {"Name": "battery_c"}},
          {"field": {"Name": "os_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "description_c"}}
        ],
        where: whereConditions
      });
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data.map(transformProduct);
    } catch (error) {
      console.error("Error filtering products:", error?.response?.data?.message || error);
      return [];
    }
  },

getFeatured: async () => {
    await delay(300);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.fetchRecords('product_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "category_type_c"}},
          {"field": {"Name": "display_c"}},
          {"field": {"Name": "processor_c"}},
          {"field": {"Name": "ram_c"}},
          {"field": {"Name": "storage_c"}},
          {"field": {"Name": "camera_c"}},
          {"field": {"Name": "battery_c"}},
          {"field": {"Name": "os_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "description_c"}}
        ],
        where: [{"FieldName": "rating_c", "Operator": "GreaterThanOrEqualTo", "Values": [4.6]}]
      });
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data.map(transformProduct);
    } catch (error) {
      console.error("Error fetching featured products:", error?.response?.data?.message || error);
      return [];
    }
  },

getTrending: async () => {
    await delay(300);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.fetchRecords('product_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "category_type_c"}},
          {"field": {"Name": "display_c"}},
          {"field": {"Name": "processor_c"}},
          {"field": {"Name": "ram_c"}},
          {"field": {"Name": "storage_c"}},
          {"field": {"Name": "camera_c"}},
          {"field": {"Name": "battery_c"}},
          {"field": {"Name": "os_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "description_c"}}
        ],
        where: [{"FieldName": "review_count_c", "Operator": "GreaterThan", "Values": [500]}]
      });
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data.map(transformProduct);
    } catch (error) {
      console.error("Error fetching trending products:", error?.response?.data?.message || error);
      return [];
    }
  }
};

export default productService;