import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config/api';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category?: string;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  orderNote: string;
  isLoading: boolean;
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  setIsCartOpen: (isOpen: boolean) => void;
  setOrderNote: (note: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'tuffy_cart';
const NOTE_STORAGE_KEY = 'tuffy_cart_note';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [orderNote, setOrderNote] = useState(() => {
    const savedNote = localStorage.getItem(NOTE_STORAGE_KEY);
    return savedNote || '';
  });

  // Calculate totals
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Fetch cart from backend
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const cartItems = response.data.items.map((item: any) => ({
        id: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0],
        category: item.product.category
      }));

      setItems(cartItems);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error fetching cart:', error);
      // Fallback to localStorage if API fails
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchCart();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // Save order note to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(NOTE_STORAGE_KEY, orderNote);
  }, [orderNote]);

  const addItem = async (newItem: CartItem) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Please login to add items to cart');

      await axios.post(`${API_URL}/cart/items`, {
        productId: newItem.id,
        quantity: newItem.quantity
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      await fetchCart();
      setIsCartOpen(true);
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      // Fallback to localStorage if API fails
      setItems(currentItems => {
        const existingItem = currentItems.find(item => item.id === newItem.id);
        
        if (existingItem) {
          return currentItems.map(item =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          );
        }
        
        return [...currentItems, newItem];
      });
      setIsCartOpen(true);
      throw error;
    }
  };

  const removeItem = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Please login to remove items from cart');

      await axios.delete(`${API_URL}/cart/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      await fetchCart();
    } catch (error: any) {
      console.error('Error removing from cart:', error);
      // Fallback to localStorage if API fails
      setItems(currentItems => currentItems.filter(item => item.id !== id));
      throw error;
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(id);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Please login to update cart');

      await axios.put(`${API_URL}/cart/items/${id}`, 
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await fetchCart();
    } catch (error: any) {
      console.error('Error updating quantity:', error);
      // Fallback to localStorage if API fails
      setItems(currentItems =>
        currentItems.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Please login to clear cart');

      await axios.delete(`${API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setItems([]);
      setOrderNote('');
      localStorage.removeItem(CART_STORAGE_KEY);
      localStorage.removeItem(NOTE_STORAGE_KEY);
    } catch (error: any) {
      console.error('Error clearing cart:', error);
      // Fallback to localStorage if API fails
      setItems([]);
      setOrderNote('');
      localStorage.removeItem(CART_STORAGE_KEY);
      localStorage.removeItem(NOTE_STORAGE_KEY);
      throw error;
    }
  };

  return (
    <CartContext.Provider value={{
      items,
      totalItems,
      totalPrice,
      isCartOpen,
      orderNote,
      isLoading,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      setIsCartOpen,
      setOrderNote
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 