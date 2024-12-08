import { useState, useEffect } from 'react';
import { fetchProductsByCategory, fetchFilterOptions } from '../services/api';

export interface Product {
  _id: string;
  name: string;
  images: string[];
  price: number;
  originalPrice?: number;
  discount: number;
  numReviews: number;
  rating: number;
  tag?: string;
  description: string;
  ingredients: string[];
  features: string[];
  category: string;
  isBundle: boolean;
  bundleItems?: Array<{
    product: Product;
    quantity: number;
  }>;
  createdAt: string;
}

interface FilterOption {
  type: string;
  count: number;
}

interface PriceRange {
  range: string;
  count: number;
}

interface FilterOptions {
  priceRanges: PriceRange[];
  skinTypes: FilterOption[];
  concerns: FilterOption[];
  ingredients: FilterOption[];
}

interface Filters {
  priceRange?: string[];
  skinTypes?: string[];
  concerns?: string[];
  ingredients?: string[];
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  total: number;
}

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  pagination: PaginationData;
  filterOptions: FilterOptions | null;
  selectedFilters: Filters;
  setPage: (page: number) => void;
  applyFilters: (filters: Filters) => void;
  clearFilters: () => void;
  refetch: () => Promise<void>;
  sortProducts: (sortBy: string) => void;
}

export const useProducts = (category: string): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState<Filters>({});
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [sortBy, setSortBy] = useState('featured');
  const [pagination, setPagination] = useState<PaginationData>({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });

  const sortProducts = (sortOption: string) => {
    setSortBy(sortOption);
    const sortedProducts = [...products];

    switch (sortOption) {
      case 'a-to-z':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'z-to-a':
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-low-to-high':
        sortedProducts.sort((a, b) => {
          const priceA = a.price * (1 - a.discount / 100);
          const priceB = b.price * (1 - b.discount / 100);
          return priceA - priceB;
        });
        break;
      case 'price-high-to-low':
        sortedProducts.sort((a, b) => {
          const priceA = a.price * (1 - a.discount / 100);
          const priceB = b.price * (1 - b.discount / 100);
          return priceB - priceA;
        });
        break;
      case 'newest':
        sortedProducts.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      default:
        // 'featured' - use the default order from the backend
        break;
    }

    setProducts(sortedProducts);
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProductsByCategory(category, page, selectedFilters);
      setProducts(data.products);
      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        total: data.total
      });
      // Apply current sort if it's not 'featured'
      if (sortBy !== 'featured') {
        sortProducts(sortBy);
      }
      setError(null);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilters = async () => {
    try {
      console.log('Fetching filters for category:', category);
      const options = await fetchFilterOptions(category);
      console.log('Received filter options:', options);
      setFilterOptions(options);
    } catch (err) {
      console.error('Error loading filter options:', err);
      setError('Failed to load filter options');
    }
  };

  const applyFilters = (filters: Filters) => {
    console.log('Applying filters:', filters);
    setSelectedFilters(filters);
    setPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    console.log('Clearing filters');
    setSelectedFilters({});
    setPage(1);
  };

  useEffect(() => {
    fetchProducts();
  }, [category, page, selectedFilters]);

  useEffect(() => {
    fetchFilters();
  }, [category]);

  return {
    products,
    loading,
    error,
    pagination,
    filterOptions,
    selectedFilters,
    setPage,
    applyFilters,
    clearFilters,
    refetch: fetchProducts,
    sortProducts
  };
};

export default useProducts;
