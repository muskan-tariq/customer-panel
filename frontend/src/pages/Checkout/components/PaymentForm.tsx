import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

interface PaymentFormProps {
  onBack: () => void;
  onPlaceOrder: () => void;
}

const PaymentForm = ({ onBack, onPlaceOrder }: PaymentFormProps) => {
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onPlaceOrder();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-medium text-gray-900 mb-4">Payment Method</h2>
          
          {/* Payment Options */}
          <div className="space-y-4">
            {/* Cash on Delivery */}
            <label className="relative flex items-center p-4 border rounded-lg cursor-pointer hover:border-[#FF66C4] transition-colors">
              <input
                type="radio"
                name="payment-method"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="hidden"
              />
              <div className={`w-5 h-5 rounded-full border-2 ${
                paymentMethod === 'cod' ? 'border-[#FF66C4]' : 'border-gray-300'
              } flex items-center justify-center mr-3`}>
                <div className={`w-2.5 h-2.5 rounded-full ${
                  paymentMethod === 'cod' ? 'bg-[#FF66C4]' : 'bg-transparent'
                }`}></div>
              </div>
              <div>
                <div className="font-medium text-gray-900">Cash on Delivery</div>
                <div className="text-sm text-gray-500">Pay when you receive your order</div>
              </div>
            </label>

            {/* GCash */}
            <label className="relative flex items-center p-4 border rounded-lg cursor-pointer hover:border-[#FF66C4] transition-colors">
              <input
                type="radio"
                name="payment-method"
                value="gcash"
                checked={paymentMethod === 'gcash'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="hidden"
              />
              <div className={`w-5 h-5 rounded-full border-2 ${
                paymentMethod === 'gcash' ? 'border-[#FF66C4]' : 'border-gray-300'
              } flex items-center justify-center mr-3`}>
                <div className={`w-2.5 h-2.5 rounded-full ${
                  paymentMethod === 'gcash' ? 'bg-[#FF66C4]' : 'bg-transparent'
                }`}></div>
              </div>
              <div>
                <div className="font-medium text-gray-900">GCash</div>
                <div className="text-sm text-gray-500">Pay securely with GCash</div>
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <img src="/images/gcash-logo.png" alt="GCash" className="h-8" />
              </div>
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Shipping
          </button>
          <button
            type="submit"
            disabled={isProcessing}
            className={`flex-1 px-6 py-3 bg-[#FF66C4] text-white rounded-md font-medium hover:bg-[#ff4db7] transition-colors ${
              isProcessing ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                Processing...
              </div>
            ) : (
              'Place Order'
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PaymentForm; 