import { useState, useEffect } from 'react';
import { searchProducts } from '../services/api';
import { Product } from './useProducts';

interface SearchResult {
  products: Product[];
  currentPage: number;
  totalPages: number;
  total: number;
  filterOptions: any;
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
  rating?: string[];
}

export const useSearch = (query: string) => {
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState<Filters>({});
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [sortBy, setSortBy] = useState('featured');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });

  const sortResults = (sortOption: string) => {
    setSortBy(sortOption);
    const sortedResults = [...results];

    switch (sortOption) {
      case 'a-to-z':
        sortedResults.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'z-to-a':
        sortedResults.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-low-high':
        sortedResults.sort((a, b) => {
          const priceA = a.price * (1 - a.discount / 100);
          const priceB = b.price * (1 - b.discount / 100);
          return priceA - priceB;
        });
        break;
      case 'price-high-low':
        sortedResults.sort((a, b) => {
          const priceA = a.price * (1 - a.discount / 100);
          const priceB = b.price * (1 - b.discount / 100);
          return priceB - priceA;
        });
        break;
      case 'newest':
        sortedResults.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'best-selling':
        // Sort by number of reviews as a proxy for best selling
        sortedResults.sort((a, b) => b.numReviews - a.numReviews);
        break;
      case 'top-rated':
        sortedResults.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // 'featured' - use the default order from the backend
        break;
    }

    setResults(sortedResults);
  };

  const fetchResults = async () => {
    if (!query.trim()) {
      setResults([]);
      setPagination({
        currentPage: 1,
        totalPages: 1,
        total: 0
      });
      setFilterOptions(null);
      return;
    }

    try {
      setLoading(true);
      const data = await searchProducts(query, page, selectedFilters, sortBy);
      setResults(data.products);
      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        total: data.total
      });
      setFilterOptions(data.filterOptions);
      
      // Apply current sort if it's not 'featured'
      if (sortBy !== 'featured') {
        sortResults(sortBy);
      }
      
      setError(null);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to fetch search results');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [query, page, selectedFilters]);

  const applyFilters = (filters: Filters) => {
    setSelectedFilters(filters);
    setPage(1);
  };

  const clearFilters = () => {
    setSelectedFilters({});
    setPage(1);
  };

  return {
    results,
    loading,
    error,
    pagination,
    filterOptions,
    selectedFilters,
    setPage,
    applyFilters,
    clearFilters,
    sortResults
  };
};

export default useSearch; 