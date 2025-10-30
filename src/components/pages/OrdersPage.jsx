import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import orderService from '@/services/api/orderService';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await orderService.getAll();
      setOrders(data);
    } catch (err) {
      setError(err.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Processing': 'bg-blue-100 text-blue-800',
      'Shipped': 'bg-purple-100 text-purple-800',
      'Delivered': 'bg-green-100 text-green-800',
      'Cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadOrders} />;
  }

  if (orders.length === 0) {
    return (
      <Empty 
        icon="Package"
        title="No Orders Yet"
        description="You haven't placed any orders. Start shopping to see your orders here."
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <ApperIcon name="Package" size={24} className="text-primary" />
            <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order, index) => (
            <motion.div
              key={order.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Order #{order.Id}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatDate(order.orderDate)}
                  </p>
                </div>
                <Badge className={`${getStatusColor(order.orderStatus)} px-2 py-1 text-xs font-medium rounded`}>
                  {order.orderStatus}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ApperIcon name="User" size={16} className="text-gray-400 flex-shrink-0" />
                  <p className="text-sm text-gray-900 truncate">{order.customerName || 'N/A'}</p>
                </div>

                <div className="flex items-center gap-2">
                  <ApperIcon name="DollarSign" size={16} className="text-gray-400 flex-shrink-0" />
                  <p className="text-sm font-semibold text-gray-900">
                    {formatCurrency(order.totalAmount)}
                  </p>
                </div>

                {order.shippingAddress && (
                  <div className="flex items-start gap-2">
                    <ApperIcon name="MapPin" size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {order.shippingAddress}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100">
                <button className="w-full text-sm text-primary font-medium hover:text-primary-dark transition-colors flex items-center justify-center gap-2">
                  View Details
                  <ApperIcon name="ChevronRight" size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;