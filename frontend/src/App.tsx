import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import { OrderProvider } from './contexts/OrderContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatButton from './components/ChatButton/ChatButton';
import Home from './pages/Home';
import BestSellers from './pages/BestSellers';
import BundlesAndDeals from './pages/BundlesAndDeals';
import Moisturizer from './pages/Moisturizer';
import Serum from './pages/Serum';
import Toner from './pages/Toner';
import FaceWash from './pages/FaceWash';
import Sunscreen from './pages/Sunscreen';
import Blog from './pages/Blog';
import AboutUs from './pages/AboutUs/AboutUs';
import ContactUs from './pages/ContactUs/ContactUs';
import Search from './pages/Search/Search';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Checkout from './pages/Checkout/Checkout';
import OrderHistory from './pages/OrderHistory/OrderHistory';
import OrderDetails from './pages/OrderHistory/OrderDetails';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Account from './pages/Account/Account';
import Chat from './pages/Chat/Chat';
import ShippingPolicy from './pages/policies/ShippingPolicy';
import RefundPolicy from './pages/policies/RefundPolicy';
import PrivacyPolicy from './pages/policies/PrivacyPolicy';
import TermsOfService from './pages/policies/TermsOfService';
import PaymentSuccess from './pages/Payment/Success';
import PaymentCancel from './pages/Payment/Cancel';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_CONFIG } from './config/payment';
import { Suspense } from 'react';
import PrivateRoute from './components/PrivateRoute';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import OrderConfirmation from './pages/OrderHistory/OrderConfirmation';
import Profile from './pages/Profile/Profile';
import AddressForm from './pages/Profile/components/AddressForm';
import { Toaster } from 'react-hot-toast';

const stripePromise = loadStripe(STRIPE_CONFIG.PUBLIC_KEY);

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <ErrorBoundary>
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              <Elements stripe={stripePromise}>
                <ChatProvider>
                  <Router>
                    <div className="flex min-h-screen flex-col">
                      <Header />
                      <main className="flex-grow">
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/best-sellers" element={<BestSellers />} />
                          <Route path="/bundles" element={<BundlesAndDeals />} />
                          <Route path="/products/moisturizer" element={<Moisturizer />} />
                          <Route path="/products/serum" element={<Serum />} />
                          <Route path="/products/toner" element={<Toner />} />
                          <Route path="/products/face-wash" element={<FaceWash />} />
                          <Route path="/products/sunscreen" element={<Sunscreen />} />
                          <Route path="/blog" element={<Blog />} />
                          <Route path="/about" element={<AboutUs />} />
                          <Route path="/contact" element={<ContactUs />} />
                          <Route path="/search" element={<Search />} />
                          <Route path="/products/:category/:id" element={<ProductDetails />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/register" element={<Register />} />
                          <Route path="/shipping-policy" element={<ShippingPolicy />} />
                          <Route path="/refund-policy" element={<RefundPolicy />} />
                          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                          <Route path="/terms-of-service" element={<TermsOfService />} />
                          <Route path="/payment/success/:orderId" element={<PaymentSuccess />} />
                          <Route path="/payment/cancel" element={<PaymentCancel />} />
                          
                          {/* Protected Routes */}
                          <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
                          <Route path="/orders/:orderId" element={<PrivateRoute><OrderDetails /></PrivateRoute>} />
                          <Route path="/order-confirmation/:orderId" element={<PrivateRoute><OrderConfirmation /></PrivateRoute>} />
                          <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>}>
                            <Route path="profile" element={<Profile />} />
                            <Route path="address" element={<AddressForm />} />
                            <Route path="orders" element={<OrderHistory />} />
                            <Route index element={<Navigate to="profile" replace />} />
                          </Route>
                          <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
                        </Routes>
                      </main>
                      <ChatButton />
                      <Footer />
                    </div>
                  </Router>
                </ChatProvider>
              </Elements>
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;