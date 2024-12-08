import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useOrder } from '../../contexts/OrderContext';
import { useAuth } from '../../contexts/AuthContext';
import AddressForm from './components/AddressForm';
import PaymentMethod from './components/PaymentMethod';
import OrderSummary from './components/OrderSummary';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { API_URL } from '../../config/api';

type PaymentMethod = 'cod' | 'online';

const Checkout = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const { items, total, clearCart, isLoading: cartLoading } = useCart();
  const { createOrder } = useOrder();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [shippingAddress, setShippingAddress] = useState({
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || '',
    country: user?.address?.country || ''
  });
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState<string | null>(null);

  console.log('Checkout Component State:', {
    cartLoading,
    hasUser: !!user,
    hasToken: !!token,
    itemsCount: items?.length,
    total
  });

  if (cartLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF66C4]"></div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    console.log('Cart is empty, redirecting...');
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate('/products')}
            className="text-[#FF66C4] hover:text-[#ff4db7]"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (!user || !token) {
    console.log('User not authenticated, redirecting...');
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">Please login to continue</h2>
          <button
            onClick={() => navigate('/login')}
            className="text-[#FF66C4] hover:text-[#ff4db7]"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  const handleAddressSubmit = (address: typeof shippingAddress) => {
    setShippingAddress(address);
    setStep(2);
  };

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setPaymentMethod(method);
    setCardError(null);
  };

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      setError('');

      if (paymentMethod === 'online') {
        if (!stripe || !elements) {
          throw new Error('Stripe not loaded');
        }

        // Create order first
        const order = await createOrder({
          shippingAddress,
          paymentMethod
        });

        // Create payment intent
        const { data: { clientSecret } } = await axios.post(
          `${API_URL}/payment/create-payment-intent`,
          {
            orderId: order.id,
            amount: total + 100 // total + delivery fee
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        // Confirm card payment
        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: elements.getElement(CardElement)!,
            }
          }
        );

        if (stripeError) {
          throw new Error(stripeError.message);
        }

        // Confirm payment on backend
        await axios.post(
          `${API_URL}/payment/confirm-payment`,
          {
            paymentIntentId: paymentIntent.id,
            orderId: order.id
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        await clearCart();
        navigate(`/payment/success/${order.id}`);
      } else {
        // Handle COD
        const order = await createOrder({
          shippingAddress,
          paymentMethod
        });
        await clearCart();
        navigate(`/order-success/${order.id}`);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Forms */}
          <div className="space-y-8">
            {/* Steps */}
            <nav className="flex items-center justify-center mb-8">
              <ol className="flex items-center space-x-4">
                <li className={`flex items-center ${step >= 1 ? 'text-[#FF66C4]' : 'text-gray-400'}`}>
                  <span className="rounded-full bg-current w-8 h-8 flex items-center justify-center text-white">
                    1
                  </span>
                  <span className="ml-2 font-medium">Shipping</span>
                </li>
                <li className="w-16 border-t border-gray-200" />
                <li className={`flex items-center ${step >= 2 ? 'text-[#FF66C4]' : 'text-gray-400'}`}>
                  <span className="rounded-full bg-current w-8 h-8 flex items-center justify-center text-white">
                    2
                  </span>
                  <span className="ml-2 font-medium">Payment</span>
                </li>
              </ol>
            </nav>

            {/* Forms */}
            {step === 1 ? (
              <AddressForm
                initialAddress={shippingAddress}
                onSubmit={handleAddressSubmit}
              />
            ) : (
              <PaymentMethod
                selected={paymentMethod}
                onSelect={handlePaymentMethodSelect}
                onCardError={setCardError}
              />
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <OrderSummary
              items={items}
              total={total}
              loading={loading}
              error={error || cardError}
              onPlaceOrder={handlePlaceOrder}
              disabled={step !== 2}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 