import { motion } from 'framer-motion';
import { CheckCircle, Package, Truck, Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../Cart/CartContext';

interface OrderConfirmationProps {
  orderNumber: string;
}

const OrderConfirmation = ({ orderNumber }: OrderConfirmationProps) => {
  const { items: cartItems, totalPrice } = useCart();
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3); // 3 days from now

  return (
    <div className="min-h-screen bg-[#F6F6F6] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-lg shadow-sm p-8 text-center mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <CheckCircle className="w-16 h-16 text-[#4CAF50] mx-auto mb-4" />
            </motion.div>
            <h1 className="text-2xl font-medium text-gray-900 mb-2">Order Placed Successfully!</h1>
            <p className="text-gray-600 mb-4">
              Thank you for your order. We'll send you a confirmation email shortly.
            </p>
            <div className="text-sm text-gray-500">
              Order Number: <span className="font-medium text-gray-900">{orderNumber}</span>
            </div>
          </motion.div>

          {/* Order Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm p-8 mb-8"
          >
            <h2 className="text-lg font-medium text-gray-900 mb-6">Order Status</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-[#4CAF50] flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Order Confirmed</h3>
                  <p className="text-sm text-gray-500">Your order has been confirmed</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-[#FF66C4] flex items-center justify-center">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Processing Order</h3>
                  <p className="text-sm text-gray-500">We're preparing your items</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Out for Delivery</h3>
                  <p className="text-sm text-gray-500">Estimated delivery by {estimatedDelivery.toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/"
              className="flex-1 bg-[#FF66C4] text-white py-3 rounded-md hover:bg-[#ff4db7] transition-colors text-center"
            >
              Continue Shopping
            </Link>
            <Link
              to={`/orders/${orderNumber}`}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-50 transition-colors text-center flex items-center justify-center gap-2"
            >
              View Order Details
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
