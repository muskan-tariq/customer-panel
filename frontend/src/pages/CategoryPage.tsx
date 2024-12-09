import React, { useState } from 'react';
import { useProducts, FilterOptions } from '../hooks/useProducts';
import ProductGrid from '../components/ProductGrid';
import Pagination from '../components/Pagination';
import FilterSidebar from './BestSellers/components/FilterSidebar';
import { Grid, Grid3x3, Menu, X } from 'lucide-react';

interface CategoryPageProps {
  category: string;
  title: string;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, title }) => {
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
    sortOptions 
  } = useProducts(category);

  const handleApplyFilters = (filters: FilterOptions) => {
    applyFilters(filters);
    setIsFilterOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
              <div className="grid grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-lg aspect-square"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">Oops!</h2>
            <p className="text-gray-500 mb-8">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-medium mb-2">{title}</h1>
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
                  <Menu className="h-4 w-4" />
                  Filter
                </button>
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
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <FilterSidebar 
                      onApply={handleApplyFilters}
                      filterOptions={filterOptions}
                      sortOptions={sortOptions}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Products Grid */}
            <div className="bg-white">
              <ProductGrid products={products} viewType={viewType} />
            </div>
            
            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage; 