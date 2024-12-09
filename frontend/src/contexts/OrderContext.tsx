import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { API_URL } from '../config/api';

interface OrderItem {
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
  };
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: 'cod' | 'online';
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'processing' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  deliveryFee: number;
  discount?: {
    code: string;
    amount: number;
  };
}

interface OrderContextType {
  createOrder: (data: {
    shippingAddress: Order['shippingAddress'];
    paymentMethod: Order['paymentMethod'];
  }) => Promise<Order>;
  getUserOrders: () => Promise<Order[]>;
  getOrderById: (id: string) => Promise<Order>;
  updateOrderToPaid: (id: string) => Promise<Order>;
  downloadInvoice: (id: string) => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const createOrder = async (data: {
    shippingAddress: Order['shippingAddress'];
    paymentMethod: Order['paymentMethod'];
  }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Please log in to place an order');

      // Validate shipping address
      const { shippingAddress } = data;
      if (!shippingAddress.street || !shippingAddress.city || 
          !shippingAddress.state || !shippingAddress.zipCode) {
        throw new Error('Please complete your shipping address');
      }

      const response = await axios.post(
        `${API_URL}/orders`,
        data,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.data || !response.data._id) {
        throw new Error('Invalid order response from server');
      }

      return response.data;
    } catch (error: any) {
      console.error('Create order error:', error);
      if (error.response?.status === 400) {
        throw new Error(error.response.data.message || 'Invalid order data');
      } else if (error.response?.status === 401) {
        throw new Error('Please log in to place an order');
      } else if (error.response?.status === 500) {
        throw new Error('Server error. Please try again later');
      }
      throw new Error(error.response?.data?.message || error.message || 'Failed to create order');
    }
  };

  const getUserOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');

      const response = await axios.get(
        `${API_URL}/orders`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch orders');
    }
  };

  const getOrderById = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');

      const response = await axios.get(
        `${API_URL}/orders/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch order');
    }
  };

  const updateOrderToPaid = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');

      const response = await axios.put(
        `${API_URL}/orders/${id}/pay`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update order');
    }
  };

  const downloadInvoice = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');

      const response = await axios.get(
        `${API_URL}/orders/${id}/invoice`,
        {
          headers: { 
            Authorization: `Bearer ${token}` 
          },
          responseType: 'blob'
        }
      );

      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice-${id}.pdf`);
      
      // Append to html link element page
      document.body.appendChild(link);
      
      // Start download
      link.click();
      
      // Clean up and remove the link
      link.parentNode?.removeChild(link);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to download invoice');
    }
  };

  return (
    <OrderContext.Provider value={{
      createOrder,
      getUserOrders,
      getOrderById,
      updateOrderToPaid,
      downloadInvoice
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
} 