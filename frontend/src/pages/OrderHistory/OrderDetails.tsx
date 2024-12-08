import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileDown, Package, Truck, Calendar, CheckCircle, ArrowLeft } from 'lucide-react';
import { useCart } from '../Cart/CartContext';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders } = useCart();

  // Find the specific order
  const order = orders.find(o => o.id === orderId);

  console.log('OrderDetails - orderId:', orderId);
  console.log('OrderDetails - orders:', orders);
  console.log('OrderDetails - found order:', order);

  if (!order) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-medium text-gray-900 mb-2">Order Not Found</h1>
            <p className="text-gray-500 mb-8">The order you're looking for doesn't exist.</p>
            <Link
              to="/orders"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#FF66C4] text-white rounded-md hover:bg-[#ff4db7] transition-colors"
            >
              View All Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleDownloadInvoice = () => {
    // Implement invoice download logic
    console.log('Downloading invoice...');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(-1)}
                className="text-gray-500 hover:text-[#FF66C4] transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-medium text-gray-900">Order Details</h1>
            </div>
            <button
              onClick={handleDownloadInvoice}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <FileDown className="w-4 h-4" />
              Download Invoice
            </button>
          </div>

          {/* Order Info Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-sm font-medium text-gray-900">Order #{order.id}</h2>
                <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium capitalize">
                {order.status}
              </div>
            </div>

            {/* Timeline */}
            <div className="relative pb-8">
              <div className="absolute left-8 top-0 h-full w-0.5 bg-gray-200"></div>
              {[
                {
                  status: "Order Placed",
                  date: order.date,
                  icon: <CheckCircle className="w-5 h-5 text-[#FF66C4]" />,
                  isCompleted: true
                },
                {
                  status: "Processing",
                  date: new Date(new Date(order.date).getTime() + 24 * 60 * 60 * 1000).toISOString(),
                  icon: <Package className="w-5 h-5 text-[#FF66C4]" />,
                  isCompleted: order.status !== 'processing'
                },
                {
                  status: "Shipped",
                  date: new Date(new Date(order.date).getTime() + 48 * 60 * 60 * 1000).toISOString(),
                  icon: <Truck className="w-5 h-5 text-[#FF66C4]" />,
                  isCompleted: order.status === 'delivered'
                }
              ].map((event, index, array) => (
                <div key={event.status} className="flex items-start mb-6 last:mb-0">
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      event.isCompleted ? 'bg-pink-50' : 'bg-gray-100'
                    }`}>
                      {event.icon}
                    </div>
                    {index < array.length - 1 && (
                      <div className={`absolute left-1/2 top-16 h-6 w-0.5 ${
                        event.isCompleted ? 'bg-[#FF66C4]' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-base font-medium text-gray-900">{event.status}</h3>
                    <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Order Items */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium">
                        ₱{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₱{order.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">{order.total >= 1000 ? 'FREE' : '₱100'}</span>
                  </div>
                  <div className="flex justify-between text-base font-medium mt-4">
                    <span>Total</span>
                    <span>₱{(order.total + (order.total >= 1000 ? 0 : 100)).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Shipping Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h3>
                <div className="space-y-2 text-sm">
                  <p className="font-medium text-gray-900">{order.shippingAddress.name}</p>
                  <p className="text-gray-600">{order.shippingAddress.address}</p>
                  <p className="text-gray-600">
                    {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                  </p>
                  <p className="text-gray-600">{order.shippingAddress.phone}</p>
                </div>
              </div>

              {/* Need Help? */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Need Help?</h3>
                <div className="space-y-4">
                  <Link
                    to="/contact"
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#FF66C4] transition-colors group"
                  >
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 group-hover:text-[#FF66C4]">
                        Contact Support
                      </h4>
                      <p className="text-sm text-gray-500">Get help with your order</p>
                    </div>
                    <ArrowLeft className="w-4 h-4 rotate-180 text-gray-400 group-hover:text-[#FF66C4]" />
                  </Link>
                  <Link
                    to="/faq"
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#FF66C4] transition-colors group"
                  >
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 group-hover:text-[#FF66C4]">
                        FAQs
                      </h4>
                      <p className="text-sm text-gray-500">View frequently asked questions</p>
                    </div>
                    <ArrowLeft className="w-4 h-4 rotate-180 text-gray-400 group-hover:text-[#FF66C4]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails; 