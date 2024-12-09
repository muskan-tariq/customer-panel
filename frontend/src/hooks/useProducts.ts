import { useState, useEffect } from 'react';
import { API_URL } from '../config/api';

export interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  category: string;
  rating: number;
  numReviews: number;
  stock: number;
  features?: string[];
  ingredients?: string[];
  howToUse?: string;
  discount?: number;
  tag?: string;
  createdAt: string;
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  total: number;
}

export interface FilterOptions {
  priceRange?: string;
  skinTypes?: string[];
  concerns?: string[];
  ingredients?: string[];
  sortBy?: string;
}

export const useProducts = (category?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [pagination, setPagination] = useState<PaginationData>({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });

  const fetchProducts = async (pageNum = page) => {
    try {
      setLoading(true);
      setError('');

      let url = category 
        ? `${API_URL}/products?category=${category}&page=${pageNum}`
        : `${API_URL}/products?page=${pageNum}`;

      // Add filters to URL
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-');
        if (!isNaN(Number(min)) && !isNaN(Number(max))) {
          url += `&priceRange=${min}-${max}`;
        }
      }
      if (filters.skinTypes?.length) {
        url += `&skinTypes=${filters.skinTypes.join(',')}`;
      }
      if (filters.concerns?.length) {
        url += `&concerns=${filters.concerns.join(',')}`;
      }
      if (filters.ingredients?.length) {
        url += `&ingredients=${filters.ingredients.join(',')}`;
      }
      if (filters.sortBy) {
        url += `&sortBy=${filters.sortBy}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch products');
      }

      const data = await response.json();
      setProducts(data.products || []);
      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        total: data.total
      });
    } catch (err: any) {
      console.error('Error fetching products:', err);
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, page, filters]);

  const refreshProducts = async () => {
    await fetchProducts(page);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const applyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  };

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'name_asc', label: 'Name: A to Z' },
    { value: 'name_desc', label: 'Name: Z to A' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' }
  ];

  // Fetch filter options from backend
  const [filterOptions, setFilterOptions] = useState({
    skinTypes: [],
    concerns: [],
    ingredients: []
  });

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await fetch(`${API_URL}/products/filters${category ? `?category=${category}` : ''}`);
        if (!response.ok) throw new Error('Failed to fetch filter options');
        const data = await response.json();
        setFilterOptions(data);
      } catch (err) {
        console.error('Error fetching filter options:', err);
      }
    };

    fetchFilterOptions();
  }, [category]);

  return {
    products,
    loading,
    error,
    refreshProducts,
    pagination,
    setPage: handlePageChange,
    applyFilters,
    filterOptions,
    sortOptions
  };
};

export default useProducts;