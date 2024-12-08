import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow rounded-lg p-8 text-center">
        <XCircle className="mx-auto h-16 w-16 text-red-500" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Payment Cancelled
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Your payment was cancelled. No charges were made.
        </p>
        
        <div className="mt-8 space-y-4">
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-[#FF66C4] text-white px-4 py-2 rounded-md hover:bg-[#ff4db7]"
          >
            Try Again
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

export default PaymentCancel; 