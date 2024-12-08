import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config/api';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  total: number;
  totalItems: number;
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  applyDiscount: (code: string) => Promise<void>;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        console.log('Fetching cart...');
        const token = localStorage.getItem('token');
        console.log('Token:', token ? 'exists' : 'missing');

        if (!token) {
          setIsLoading(false);
          return;
        }

        const response = await axios.get(`${API_URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Cart response:', response.data);

        setItems(response.data.items || []);
        setTotal(response.data.total || 0);
      } catch (error) {
        console.error('Cart fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    const newTotalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    setTotalItems(newTotalItems);
  }, [items]);

  const addItem = async (item: CartItem) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Please login to add items to cart');

      await axios.post(`${API_URL}/cart/items`, item, {
        headers: { Authorization: `Bearer ${token}` }
      });

      await fetchCart();
      setIsOpen(true);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to add item to cart');
    }
  };

  const removeItem = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');

      await axios.delete(`${API_URL}/cart/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      await fetchCart();
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to remove item');
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');

      await axios.put(`${API_URL}/cart/items/${id}`, 
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await fetchCart();
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update quantity');
    }
  };

  const clearCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');

      await axios.delete(`${API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setItems([]);
      setTotal(0);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to clear cart');
    }
  };

  const applyDiscount = async (code: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');

      await axios.post(`${API_URL}/cart/discount`,
        { code },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await fetchCart();
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to apply discount');
    }
  };

  return (
    <CartContext.Provider value={{
      items,
      total,
      totalItems,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isOpen,
      setIsOpen,
      setIsCartOpen: setIsOpen,
      applyDiscount,
      isLoading
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