import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, PenLine, ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const { items: cartItems, removeItem, updateQuantity, isCartOpen, setIsCartOpen, orderNote, setOrderNote, totalPrice } = useCart();
  const [isOrderNoteModalOpen, setIsOrderNoteModalOpen] = useState(false);
  const [tempOrderNote, setTempOrderNote] = useState(orderNote);

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handleSaveOrderNote = () => {
    setOrderNote(tempOrderNote);
    setIsOrderNoteModalOpen(false);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />

          {/* Cart Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
          >
            {/* Cart Header */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium">Shopping Cart ({cartItems.length})</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.category}</p>
                          <div className="mt-1 flex items-center gap-4">
                            <div className="flex items-center border border-gray-200 rounded-md">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:bg-gray-50"
                              >
                                <Minus className="w-4 h-4 text-gray-400" />
                              </button>
                              <span className="px-2 py-1 min-w-[2rem] text-center text-sm">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:bg-gray-50"
                              >
                                <Plus className="w-4 h-4 text-gray-400" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            ₱{(item.price * item.quantity).toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            ₱{item.price.toLocaleString()} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Order Note Button */}
                <div className="mt-6">
                  <button
                    onClick={() => {
                      setTempOrderNote(orderNote);
                      setIsOrderNoteModalOpen(true);
                    }}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <PenLine className="w-4 h-4" />
                    {orderNote ? 'Edit Order Note' : 'Add Order Note'}
                  </button>
                  {orderNote && (
                    <div className="mt-2 p-3 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-600">{orderNote}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Cart Footer */}
            <div className="p-4 border-t border-gray-200">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₱{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">{totalPrice >= 1000 ? 'FREE' : '₱100'}</span>
                </div>
                <div className="flex justify-between text-base font-medium pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>₱{(totalPrice + (totalPrice >= 1000 ? 0 : 100)).toLocaleString()}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
                className="w-full bg-[#FF66C4] text-white py-3 rounded-md hover:bg-[#ff4db7] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Checkout
              </button>
            </div>
          </motion.div>

          {/* Order Note Modal */}
          <AnimatePresence>
            {isOrderNoteModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
                onClick={() => setIsOrderNoteModalOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4"
                >
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-medium">Order Note</h3>
                    <button
                      onClick={() => setIsOrderNoteModalOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-4">
                    <textarea
                      value={tempOrderNote}
                      onChange={(e) => setTempOrderNote(e.target.value)}
                      placeholder="How can we help you? Add any special instructions..."
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-[#FF66C4] focus:border-[#FF66C4] h-32 resize-none"
                    />
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={handleSaveOrderNote}
                        className="px-4 py-2 bg-[#FF66C4] text-white rounded-md hover:bg-[#ff4db7] transition-colors"
                      >
                        Save Note
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart; 