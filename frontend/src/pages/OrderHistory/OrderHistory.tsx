import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileDown, ChevronDown, ChevronUp, Package, Truck, Calendar, CheckCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useOrder } from '../../contexts/OrderContext';

interface Order {
  _id: string;
  createdAt: string;
  orderStatus: 'processing' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: Array<{
    _id: string;
    product: {
      name: string;
      images: string[];
    };
    quantity: number;
    price: number;
  }>;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

const OrderHistory = () => {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const { getUserOrders, downloadInvoice } = useOrder();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const fetchedOrders = await getUserOrders();
        setOrders(fetchedOrders);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [getUserOrders]);

  const getStatusIcon = (status: Order['orderStatus']) => {
    switch (status) {
      case 'processing':
        return <Package className="w-5 h-5 text-[#FF66C4]" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Package className="w-5 h-5 text-[#FF66C4]" />;
    }
  };

  const handleDownloadInvoice = async (orderId: string) => {
    try {
      await downloadInvoice(orderId);
    } catch (err: any) {
      console.error('Download invoice error:', err);
      // You could add a toast notification here
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF66C4] mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-medium text-gray-900 mb-2">Error</h1>
            <p className="text-gray-500 mb-8">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center px-6 py-3 bg-[#FF66C4] text-white rounded-md hover:bg-[#ff4db7] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-medium text-gray-900 mb-2">No Orders Yet</h1>
            <p className="text-gray-500 mb-8">You haven't placed any orders yet.</p>
            <Link
              to="/best-sellers"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#FF66C4] text-white rounded-md hover:bg-[#ff4db7] transition-colors"
            >
              Start Shopping
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-medium text-gray-900 mb-8">Order History</h1>
          
          <div className="space-y-4">
            {orders.map((order) => (
              <motion.div
                key={order._id}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                layout
              >
                {/* Order Header */}
                <div 
                  className="p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                  onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                >
                  <div className="flex items-center gap-4">
                    {getStatusIcon(order.orderStatus)}
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Order #{order._id}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadInvoice(order._id);
                      }}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#FF66C4] transition-colors"
                    >
                      <FileDown className="w-4 h-4" />
                      Invoice
                    </button>
                    <Link
                      to={`/orders/${order._id}`}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#FF66C4] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Details
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                    <span className="text-sm font-medium">₱{order.total.toLocaleString()}</span>
                    {expandedOrder === order._id ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Order Details */}
                <AnimatePresence>
                  {expandedOrder === order._id && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden border-t border-gray-200"
                    >
                      <div className="p-6 space-y-6">
                        {/* Order Items */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-4">Order Items</h4>
                          <div className="space-y-4">
                            {order.items.map((item) => (
                              <div key={item._id} className="flex items-center gap-4">
                                <img
                                  src={item.product.images[0]}
                                  alt={item.product.name}
                                  className="w-16 h-16 object-cover rounded-md"
                                />
                                <div className="flex-1">
                                  <h5 className="text-sm font-medium text-gray-900">{item.product.name}</h5>
                                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                </div>
                                <span className="text-sm font-medium">
                                  ₱{(item.price * item.quantity).toLocaleString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Shipping Information */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-4">Shipping Information</h4>
                          <div className="text-sm text-gray-500">
                            <p>{order.shippingAddress.street}</p>
                            <p>
                              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                            </p>
                            <p>{order.shippingAddress.country}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory; 