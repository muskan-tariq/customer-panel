import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const PaymentSuccess = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState<string>('');

  useEffect(() => {
    setOrderNumber(orderId?.substring(0, 8) || '');
  }, [orderId]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow rounded-lg p-8 text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Payment Successful!
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Thank you for your order. Your order number is #{orderNumber}
        </p>
        
        <div className="mt-8 space-y-4">
          <button
            onClick={() => navigate('/profile')}
            className="w-full bg-[#FF66C4] text-white px-4 py-2 rounded-md hover:bg-[#ff4db7]"
          >
            View Order Status
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess; 