import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:5000/api';

interface Filters {
  priceRange?: string[];
  skinTypes?: string[];
  concerns?: string[];
  ingredients?: string[];
}

// Add these at the top of the file, after imports
export const getToken = (): string => {
  return localStorage.getItem('token') || '';
};

const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data || { message: 'An API error occurred' };
  }
  return { message: 'An unexpected error occurred' };
};

// Product-related API calls
export const fetchProducts = async (category?: string) => {
  try {
    const url = category 
      ? `${API_URL}/products?category=${category}`
      : `${API_URL}/products`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const fetchProductsByCategory = async (
  category: string,
  page: number = 1,
  filters: Filters = {},
  sortBy: string = 'featured'
) => {
  try {
    // Build query parameters
    const params = new URLSearchParams();
    params.append('category', category);
    params.append('page', page.toString());
    params.append('sortBy', sortBy);

    // Add filters to query parameters
    if (filters.priceRange?.length) {
      params.append('priceRange', filters.priceRange.join(','));
    }
    if (filters.skinTypes?.length) {
      params.append('skinTypes', filters.skinTypes.join(','));
    }
    if (filters.concerns?.length) {
      params.append('concerns', filters.concerns.join(','));
    }
    if (filters.ingredients?.length) {
      params.append('ingredients', filters.ingredients.join(','));
    }

    const response = await axios.get(`${API_URL}/products`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Review-related API calls
export const fetchProductReviews = async (productId: string) => {
  try {
    const response = await axios.get(`${API_URL}/reviews/product/${productId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createReview = async (reviewData: {
  productId: string;
  rating: number;
  title: string;
  comment: string;
  images: string[];
}) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.post(
      `${API_URL}/reviews`, 
      reviewData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.success) {
      return response.data.review;
    } else {
      throw new Error(response.data.message || 'Failed to create review');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || 'Failed to submit review';
      throw new Error(message);
    }
    throw new Error('Failed to submit review. Please try again.');
  }
};

export const updateReview = async (reviewId: string, reviewData: {
  rating?: number;
  title?: string;
  comment?: string;
  images?: string[];
}) => {
  try {
    const response = await axios.put(`${API_URL}/reviews/${reviewId}`, reviewData, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteReview = async (reviewId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/reviews/${reviewId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const markReviewHelpful = async (reviewId: string) => {
  try {
    const response = await axios.put(`${API_URL}/reviews/${reviewId}/helpful`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const reportReview = async (reviewId: string) => {
  try {
    const response = await axios.put(`${API_URL}/reviews/${reviewId}/report`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getUserReviews = async () => {
  try {
    const response = await axios.get(`${API_URL}/reviews/user`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Cart-related API calls
export const fetchCart = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/cart`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

export const addToCart = async (productId: string, quantity: number, token: string) => {
  try {
    const response = await fetch(`${API_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ productId, quantity })
    });
    if (!response.ok) {
      throw new Error('Failed to add to cart');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const updateCartItem = async (productId: string, quantity: number, token: string) => {
  try {
    const response = await fetch(`${API_URL}/cart/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ quantity })
    });
    if (!response.ok) {
      throw new Error('Failed to update cart item');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

export const removeFromCart = async (productId: string, token: string) => {
  try {
    const response = await fetch(`${API_URL}/cart/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to remove from cart');
    }
    return await response.json();
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

export const fetchFilterOptions = async (category: string) => {
  try {
    console.log('Fetching filter options for category:', category);
    const response = await axios.get(`${API_URL}/products/filters`, {
      params: { category }
    });
    console.log('Filter options response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching filter options:', error);
    throw error;
  }
};

export const searchProducts = async (
  query: string,
  page: number = 1,
  filters: any = {},
  sortBy: string = 'featured'
) => {
  try {
    const params = new URLSearchParams({
      query,
      page: page.toString(),
      sortBy,
      ...(filters.priceRange && { priceRange: filters.priceRange }),
      ...(filters.skinTypes?.length && { skinTypes: filters.skinTypes.join(',') }),
      ...(filters.concerns?.length && { concerns: filters.concerns.join(',') }),
      ...(filters.ingredients?.length && { ingredients: filters.ingredients.join(',') })
    });

    const response = await axios.get(`${API_URL}/products/search?${params}`);
    return response.data;
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
};