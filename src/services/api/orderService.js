const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Transform database record to frontend format
const transformOrder = (dbOrder) => {
  if (!dbOrder) return null;
  
  return {
    Id: dbOrder.Id,
    name: dbOrder.Name || '',
    tags: dbOrder.Tags || '',
    owner: dbOrder.Owner || null,
    createdOn: dbOrder.CreatedOn || '',
    createdBy: dbOrder.CreatedBy || null,
    modifiedOn: dbOrder.ModifiedOn || '',
    modifiedBy: dbOrder.ModifiedBy || null,
    orderDate: dbOrder.order_date_c || '',
    customerName: dbOrder.customer_name_c || '',
    totalAmount: dbOrder.total_amount_c || 0,
    shippingAddress: dbOrder.shipping_address_c || '',
    orderStatus: dbOrder.order_status_c || 'Pending'
  };
};

const orderService = {
  getAll: async () => {
    await delay(300);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.fetchRecords('orders_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "Owner"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "CreatedBy"}},
          {"field": {"Name": "ModifiedOn"}},
          {"field": {"Name": "ModifiedBy"}},
          {"field": {"Name": "order_date_c"}},
          {"field": {"Name": "customer_name_c"}},
          {"field": {"Name": "total_amount_c"}},
          {"field": {"Name": "shipping_address_c"}},
          {"field": {"Name": "order_status_c"}}
        ],
        orderBy: [{"fieldName": "order_date_c", "sorttype": "DESC"}]
      });
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data.map(transformOrder);
    } catch (error) {
      console.error("Error fetching orders:", error?.response?.data?.message || error);
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
      
      const response = await apperClient.getRecordById('orders_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "Owner"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "CreatedBy"}},
          {"field": {"Name": "ModifiedOn"}},
          {"field": {"Name": "ModifiedBy"}},
          {"field": {"Name": "order_date_c"}},
          {"field": {"Name": "customer_name_c"}},
          {"field": {"Name": "total_amount_c"}},
          {"field": {"Name": "shipping_address_c"}},
          {"field": {"Name": "order_status_c"}}
        ]
      });
      
      if (!response.success) {
        throw new Error(response.message);
      }
      
      return transformOrder(response.data);
    } catch (error) {
      console.error(`Error fetching order ${id}:`, error?.response?.data?.message || error);
      throw new Error("Order not found");
    }
  }
};

export default orderService;