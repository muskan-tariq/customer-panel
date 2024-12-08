import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileDown, ChevronDown, ChevronUp, Package, Truck, Calendar, CheckCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../Cart/CartContext';

interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered';
  total: number;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    phone: string;
  };
}

const OrderHistory = () => {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const { orders } = useCart(); // Get orders from cart context

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return <Package className="w-5 h-5 text-[#FF66C4]" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const handleDownloadInvoice = (orderId: string) => {
    // Implement invoice download logic
    console.log(`Downloading invoice for order ${orderId}`);
  };

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
                key={order.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                layout
              >
                {/* Order Header */}
                <div 
                  className="p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                >
                  <div className="flex items-center gap-4">
                    {getStatusIcon(order.status)}
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Order #{order.id}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadInvoice(order.id);
                      }}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#FF66C4] transition-colors"
                    >
                      <FileDown className="w-4 h-4" />
                      Invoice
                    </button>
                    <Link
                      to={`/orders/${order.id}`}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#FF66C4] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Details
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                    <span className="text-sm font-medium">₱{order.total.toLocaleString()}</span>
                    {expandedOrder === order.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Order Details */}
                <AnimatePresence>
                  {expandedOrder === order.id && (
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
                              <div key={item.id} className="flex items-center gap-4">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-16 h-16 object-cover rounded-md"
                                />
                                <div className="flex-1">
                                  <h5 className="text-sm font-medium text-gray-900">{item.name}</h5>
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
                            <p className="font-medium text-gray-900">{order.shippingAddress.name}</p>
                            <p>{order.shippingAddress.address}</p>
                            <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                            <p>{order.shippingAddress.phone}</p>
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