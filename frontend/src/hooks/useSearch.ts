import { useState, useEffect } from 'react';
import { searchProducts } from '../services/api';
import { Product } from './useProducts';

interface SearchResult {
  products: Product[];
  currentPage: number;
  totalPages: number;
  total: number;
}

export const useSearch = (query: string) => {
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('featured');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        setPagination({ currentPage: 1, totalPages: 1, total: 0 });
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await searchProducts(query, page, sortBy);
        setResults(data.products);
        setPagination({
          currentPage: data.currentPage,
          totalPages: data.totalPages,
          total: data.total
        });
      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to search products');
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, page, sortBy]);

  const sortResults = (newSortBy: string) => {
    setSortBy(newSortBy);
    setPage(1); // Reset to first page when sorting changes
  };

  return {
    results,
    loading,
    error,
    pagination,
    setPage,
    sortResults
  };
};

export default useSearch; 