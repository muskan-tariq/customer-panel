import { useState } from 'react';
import ProductGrid from './components/ProductGrid';
import FilterSidebar from './components/FilterSidebar';
import SortDropdown from './components/SortDropdown';
import RecentlyViewed from './components/RecentlyViewed';

const Serums = () => {
  const [viewType, setViewType] = useState<'grid4' | 'grid9'>('grid4');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <FilterSidebar />
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4">
          {/* Sort and View Options */}
          <div className="flex justify-between items-center mb-6">
            <SortDropdown />
            <div className="flex gap-2">
              <button
                onClick={() => setViewType('grid4')}
                className={`p-2 ${viewType === 'grid4' ? 'text-[#FF66C4]' : 'text-gray-600'}`}
              >
                Grid 4
              </button>
              <button
                onClick={() => setViewType('grid9')}
                className={`p-2 ${viewType === 'grid9' ? 'text-[#FF66C4]' : 'text-gray-600'}`}
              >
                Grid 9
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <ProductGrid viewType={viewType} />

          {/* Recently Viewed Section */}
          <RecentlyViewed />
        </div>
      </div>
    </div>
  );
};

export default Serums;
