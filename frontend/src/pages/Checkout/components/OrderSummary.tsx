import React, { useMemo } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderSummaryProps {
  items: CartItem[];
  total?: number;
  loading: boolean;
  error: string;
  onPlaceOrder: () => void;
  disabled: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  total: providedTotal,
  loading,
  error,
  onPlaceOrder,
  disabled
}) => {
  const deliveryFee = 100; // ₱100 delivery fee

  // Calculate total from items if not provided
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [items]);

  const total = providedTotal ?? subtotal;
  const finalTotal = total + deliveryFee;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-medium text-gray-900 mb-6">Order Summary</h2>

      {/* Items List */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center">
            <img
              src={item.image}
              alt={item.name}
              className="h-16 w-16 object-cover rounded"
            />
            <div className="ml-4 flex-1">
              <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">
              ₱{(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span>₱{total.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Delivery Fee</span>
          <span>₱{deliveryFee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-base font-medium text-gray-900 pt-2">
          <span>Total</span>
          <span>₱{finalTotal.toLocaleString()}</span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Place Order Button */}
      <button
        onClick={onPlaceOrder}
        disabled={disabled || loading}
        className={`w-full mt-6 px-6 py-3 rounded-md text-white font-medium
          ${disabled || loading
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-[#FF66C4] hover:bg-[#ff4db7]'
          } transition-colors`}
      >
        {loading ? 'Processing...' : 'Place Order'}
      </button>
    </div>
  );
};

export default OrderSummary; 