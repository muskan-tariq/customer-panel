import { useState } from 'react';
import { Grid2X2, Grid3X3, ChevronDown } from 'lucide-react';
import ProductGrid from './components/ProductGrid';
import FilterSidebar from './components/FilterSidebar';
import SortDropdown from './components/SortDropdown';

const BestSellers = () => {
  const [gridView, setGridView] = useState<'grid4' | 'grid9'>('grid4');
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState('featured');
  
  return (
    <div className="min-h-screen">
      {/* Border line after navbar */}
      <div className="border-b border-gray-200 w-full"></div>

      {/* View Controls Section */}
      <div className="w-full">
        {/* Sort and Filter Controls */}
        <div className="border-b border-gray-200 w-full">
          <div className="max-w-[1536px] mx-auto px-4">
            <div className="flex justify-between items-center py-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setGridView('grid4')}
                  className={`p-1.5 ${gridView === 'grid4' ? 'text-[#FF66C4]' : 'text-gray-400'}`}
                >
                  <Grid2X2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setGridView('grid9')}
                  className={`p-1.5 ${gridView === 'grid9' ? 'text-[#FF66C4]' : 'text-gray-400'}`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center">
                <div className="relative px-6">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                  >
                    Filter
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="h-5 w-[1px] bg-gray-200"></div>

                <div className="relative px-6">
                  <SortDropdown value={sortOption} onChange={setSortOption} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid Section */}
        <div className="max-w-[1536px] mx-auto px-8">
          <div className="py-6">
            <div className="flex gap-8 relative">
              <ProductGrid viewType={gridView} />
              
              {/* Filter Sidebar */}
              {showFilters && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
                  <div className="absolute right-0 top-0 h-full w-80 bg-white overflow-y-auto">
                    {/* Fixed Header */}
                    <div className="sticky top-0 bg-white z-10 px-4 py-4 border-b border-gray-200">
                      <div className="flex justify-between items-center">
                        <div className="flex-1"></div>
                        <h3 className="font-medium text-[#303030] flex-1 text-center">Filters</h3>
                        <div className="flex-1 flex justify-end">
                          <button 
                            onClick={() => setShowFilters(false)}
                            className="text-gray-500 hover:text-black"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="p-4">
                      <FilterSidebar />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellers; 