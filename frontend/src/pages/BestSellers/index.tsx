import React, { useState } from 'react';
import { Grid, Grid3x3, Filter } from 'lucide-react';
import ProductGrid from '../../components/ProductGrid';
import Pagination from '../../components/Pagination';
import { useProducts } from '../../hooks/useProducts';
import FilterSidebar from './components/FilterSidebar';
import SortDropdown from '../Moisturizer/components/SortDropdown';

const BestSellersPage = () => {
  const [viewType, setViewType] = useState<'grid4' | 'grid5'>('grid4');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { 
    products, 
    loading, 
    error, 
    pagination, 
    setPage, 
    applyFilters,
    filterOptions,
    sortProducts 
  } = useProducts('best-sellers');

  const handleApplyFilters = (filters: any) => {
    applyFilters(filters);
    setIsFilterOpen(false);
  };

  const handleSort = (sortBy: string) => {
    sortProducts(sortBy);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-medium mb-2">Best Sellers</h1>
        <div className="h-0.5 bg-gray-200 w-full"></div>
      </div>

      {/* Main Content */}
      <div className="relative">
        {/* Sort and View Options */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
            >
              <Filter className="h-4 w-4" />
              Filter
            </button>
            <SortDropdown value="featured" onChange={handleSort} />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewType('grid4')}
              className={`p-2 rounded ${
                viewType === 'grid4'
                  ? 'text-[#FF66C4]'
                  : 'text-gray-600'
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewType('grid5')}
              className={`p-2 rounded ${
                viewType === 'grid5'
                  ? 'text-[#FF66C4]'
                  : 'text-gray-600'
              }`}
            >
              <Grid3x3 className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Filter Sidebar Drawer */}
        {isFilterOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsFilterOpen(false)}
            ></div>
            
            {/* Drawer */}
            <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-50 overflow-y-auto">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Filters</h3>
                  <button 
                    onClick={() => setIsFilterOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <FilterSidebar 
                  onApply={handleApplyFilters}
                  filterOptions={filterOptions}
                />
              </div>
            </div>
          </>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF66C4]"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center text-red-500 py-8">
            {error}
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <>
            <ProductGrid products={products} viewType={viewType} />
            
            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BestSellersPage; 