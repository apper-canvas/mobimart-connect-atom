const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Transform database record to frontend format
const transformOffer = (dbOffer) => {
  if (!dbOffer) return null;
  
  return {
    Id: dbOffer.Id,
    code: dbOffer.name_c || '',
    description: dbOffer.description_c || '',
    discountPercentage: dbOffer.discount_percentage_c || 0,
    startDate: dbOffer.start_date_c || null,
    endDate: dbOffer.end_date_c || null,
    productId: dbOffer.product_c?.Id || null
  };
};

const offerService = {
  getAll: async () => {
    await delay(300);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.fetchRecords('offer_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "discount_percentage_c"}},
          {"field": {"Name": "start_date_c"}},
          {"field": {"Name": "end_date_c"}},
          {"field": {"Name": "product_c"}}
        ]
      });
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data.map(transformOffer);
    } catch (error) {
      console.error("Error fetching offers:", error?.response?.data?.message || error);
      return [];
    }
  },

  getByCode: async (code) => {
    await delay(300);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.fetchRecords('offer_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "discount_percentage_c"}},
          {"field": {"Name": "start_date_c"}},
          {"field": {"Name": "end_date_c"}},
          {"field": {"Name": "product_c"}}
        ],
        where: [{"FieldName": "name_c", "Operator": "EqualTo", "Values": [code]}]
      });
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      if (!response.data || response.data.length === 0) {
        return null;
      }
      
      return transformOffer(response.data[0]);
    } catch (error) {
      console.error("Error fetching offer by code:", error?.response?.data?.message || error);
      return null;
    }
  },

  validateOffer: (offer) => {
    if (!offer) return false;
    
    const now = new Date();
    const startDate = offer.startDate ? new Date(offer.startDate) : null;
    const endDate = offer.endDate ? new Date(offer.endDate) : null;
    
    if (startDate && now < startDate) {
      return false;
    }
    
    if (endDate && now > endDate) {
      return false;
    }
    
    return true;
  }
};

export default offerService;