import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ChevronDown, ChevronUp, Package, Truck, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered';
  total: number;
  items: {
    id: number;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    phone: string;
  };
  paymentMethod: string;
}

const OrderHistory = () => {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Sample orders data - replace with actual data from your backend
  const orders: Order[] = [
    {
      id: 'ORD-123456',
      date: '2024-02-15',
      status: 'delivered',
      total: 2499,
      items: [
        {
          id: 1,
          name: 'Vitamin C Serum',
          quantity: 2,
          price: 999,
          image: 'https://www.tuffyorganics.com/cdn/shop/files/DSC6874_400x.png?v=1717482337'
        },
        {
          id: 2,
          name: 'Hydrating Toner',
          quantity: 1,
          price: 501,
          image: 'https://www.tuffyorganics.com/cdn/shop/files/DSC6902_400x.png?v=1719389704'
        }
      ],
      shippingAddress: {
        name: 'John Doe',
        address: '123 Main St',
        city: 'Manila',
        postalCode: '1000',
        phone: '+63 912 345 6789'
      },
      paymentMethod: 'Cash on Delivery'
    },
    {
      id: 'ORD-123457',
      date: '2024-02-10',
      status: 'shipped',
      total: 1899,
      items: [
        {
          id: 3,
          name: 'Moisturizing Cream',
          quantity: 1,
          price: 1899,
          image: 'https://www.tuffyorganics.com/cdn/shop/files/SPF-Power-Trio---product-image_400x.jpg?v=1682590509'
        }
      ],
      shippingAddress: {
        name: 'John Doe',
        address: '123 Main St',
        city: 'Manila',
        postalCode: '1000',
        phone: '+63 912 345 6789'
      },
      paymentMethod: 'GCash'
    }
  ];

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

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return 'Processing';
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
    }
  };

  const handleDownloadInvoice = (orderId: string) => {
    // Implement invoice download functionality
    console.log(`Downloading invoice for order ${orderId}`);
  };

  return (
    <div className="min-h-screen bg-[#F6F6F6] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-medium text-gray-900 mb-8">Order History</h1>

          {/* Orders List */}
          <div className="space-y-4">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                {/* Order Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Order {order.id}</h3>
                      <p className="text-sm text-gray-500">
                        Placed on {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <span className="text-sm font-medium">{getStatusText(order.status)}</span>
                      </div>
                      <button
                        onClick={() => handleDownloadInvoice(order.id)}
                        className="text-[#FF66C4] hover:text-[#ff4db7] p-2"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Order Total */}
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Total: <span className="font-medium text-gray-900">₱{order.total.toLocaleString()}</span>
                    </div>
                    <button
                      onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                      className="flex items-center gap-1 text-sm text-[#FF66C4] hover:text-[#ff4db7]"
                    >
                      {expandedOrder === order.id ? (
                        <>
                          Hide Details
                          <ChevronUp className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          View Details
                          <ChevronDown className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Order Details */}
                {expandedOrder === order.id && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="border-t border-gray-200"
                  >
                    <div className="p-6">
                      {/* Order Items */}
                      <div className="mb-6">
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
                              <div className="text-sm font-medium text-gray-900">
                                ₱{(item.price * item.quantity).toLocaleString()}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shipping Information */}
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-900 mb-4">Shipping Information</h4>
                        <div className="text-sm text-gray-500">
                          <p className="font-medium text-gray-900">{order.shippingAddress.name}</p>
                          <p>{order.shippingAddress.address}</p>
                          <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                          <p>{order.shippingAddress.phone}</p>
                        </div>
                      </div>

                      {/* Payment Information */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-4">Payment Information</h4>
                        <p className="text-sm text-gray-500">{order.paymentMethod}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory; 