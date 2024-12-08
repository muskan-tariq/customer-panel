const dotenv = require('dotenv');
dotenv.config(); // Load environment variables

// Log to debug
console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY);

// Initialize Stripe with proper error handling
let stripe;
try {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is missing in environment variables');
  }
  stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
} catch (error) {
  console.error('Stripe initialization error:', error);
  // Set a default test key for development (you should remove this in production)
  stripe = require('stripe')('sk_test_51QTnV12L33DpQH1CzysmX7qTZdZjo5ygLQsSpA3Sllr1M4hTnFV9rkIdOZA7Zn3N4IofeQkoB9jhAVAhzJPWD03g00jbB0EHG8');
}

const Order = require('../models/Order');

// Create payment intent
exports.createPaymentIntent = async (req, res) => {
  try {
    const { orderId, amount } = req.body;

    if (!orderId || !amount) {
      return res.status(400).json({ message: 'Order ID and amount are required' });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than 0' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'pkr',
      metadata: { orderId },
      payment_method_types: ['card']
    });

    res.json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.error('Payment intent error:', error);
    res.status(500).json({ 
      message: error.message || 'Failed to create payment'
    });
  }
};

// Confirm payment success
exports.confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId, orderId } = req.body;

    // Update order status directly
    await Order.findByIdAndUpdate(orderId, {
      paymentStatus: 'paid',
      orderStatus: 'confirmed'
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Payment confirmation error:', error);
    res.status(500).json({ message: 'Failed to confirm payment' });
  }
}; 