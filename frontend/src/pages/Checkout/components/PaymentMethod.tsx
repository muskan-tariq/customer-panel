import React from 'react';
import { CreditCard, Truck } from 'lucide-react';
import { CardElement } from '@stripe/react-stripe-js';

interface PaymentMethodProps {
  selected: 'cod' | 'online';
  onSelect: (method: 'cod' | 'online') => void;
  onCardError?: (error: string | null) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ selected, onSelect, onCardError }) => {
  const handleCardChange = (event: any) => {
    if (event.error) {
      onCardError?.(event.error.message);
    } else {
      onCardError?.(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-medium text-gray-900 mb-6">Payment Method</h2>

      <div className="space-y-4">
        {/* Cash on Delivery */}
        <div
          onClick={() => onSelect('cod')}
          className={`relative rounded-lg border p-4 cursor-pointer hover:border-[#FF66C4] transition-colors ${
            selected === 'cod' ? 'border-[#FF66C4] bg-pink-50' : 'border-gray-300'
          }`}
        >
          <div className="flex items-center">
            <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
              selected === 'cod' ? 'border-[#FF66C4]' : 'border-gray-300'
            }`}>
              {selected === 'cod' && (
                <div className="h-2.5 w-2.5 rounded-full bg-[#FF66C4]" />
              )}
            </div>
            <div className="ml-4 flex items-center">
              <Truck className={`h-6 w-6 ${
                selected === 'cod' ? 'text-[#FF66C4]' : 'text-gray-400'
              }`} />
              <span className="ml-3 font-medium text-gray-900">Cash on Delivery</span>
            </div>
          </div>
          <p className="mt-2 ml-9 text-sm text-gray-500">
            Pay with cash when your order is delivered
          </p>
        </div>

        {/* Online Payment */}
        <div
          onClick={() => onSelect('online')}
          className={`relative rounded-lg border p-4 cursor-pointer hover:border-[#FF66C4] transition-colors ${
            selected === 'online' ? 'border-[#FF66C4] bg-pink-50' : 'border-gray-300'
          }`}
        >
          <div className="flex items-center">
            <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
              selected === 'online' ? 'border-[#FF66C4]' : 'border-gray-300'
            }`}>
              {selected === 'online' && (
                <div className="h-2.5 w-2.5 rounded-full bg-[#FF66C4]" />
              )}
            </div>
            <div className="ml-4 flex items-center">
              <CreditCard className={`h-6 w-6 ${
                selected === 'online' ? 'text-[#FF66C4]' : 'text-gray-400'
              }`} />
              <span className="ml-3 font-medium text-gray-900">Pay with Card</span>
            </div>
          </div>
          
          {/* Stripe Card Element */}
          {selected === 'online' && (
            <div className="mt-4 ml-9">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4'
                      }
                    },
                    invalid: {
                      color: '#9e2146'
                    }
                  }
                }}
                onChange={handleCardChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod; 