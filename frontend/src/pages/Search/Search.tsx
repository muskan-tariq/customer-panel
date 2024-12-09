import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid, Grid3x3 } from 'lucide-react';
import ProductGrid from '../../components/ProductGrid';
import Pagination from '../../components/Pagination';
import { useSearch } from '../../hooks/useSearch';
import SortDropdown from './components/SortDropdown';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [columns, setColumns] = React.useState(4);

  const { 
    results, 
    loading, 
    error, 
    pagination,
    setPage,
    sortResults 
  } = useSearch(query);

  const handleSort = (sortBy: string) => {
    sortResults(sortBy);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF66C4]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-medium mb-2">
          Search Results for "{query}"
          {pagination.total > 0 && (
            <span className="text-gray-500 text-lg ml-2">
              ({pagination.total} products found)
            </span>
          )}
        </h1>
        <div className="h-0.5 bg-gray-200 w-full"></div>
      </div>

      {/* Toolbar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">View:</span>
          <button
            onClick={() => setColumns(4)}
            className={`p-1.5 rounded ${columns === 4 ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
            aria-label="4 columns grid"
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setColumns(5)}
            className={`p-1.5 rounded ${columns === 5 ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
            aria-label="5 columns grid"
          >
            <Grid3x3 className="w-5 h-5" />
          </button>
        </div>

        <SortDropdown onSort={handleSort} />
      </div>

      {/* Results */}
      {results.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found for "{query}"</p>
        </div>
      ) : (
        <>
          <ProductGrid 
            products={results} 
            columns={columns}
            isSearchResult={true}
          />
          
          {pagination.totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage; 