import React, { useState } from 'react';

interface FilterSidebarProps {
  onApply: (filters: any) => void;
  filterOptions: any;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onApply, filterOptions }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: '',
    bundleType: [] as string[],
    discountRange: [] as string[],
    itemCount: [] as string[]
  });

  // Handle checkbox changes
  const handleCheckboxChange = (filterType: string, value: string) => {
    setSelectedFilters(prev => {
      const currentValues = prev[filterType] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [filterType]: newValues
      };
    });
  };

  // Handle price range change
  const handlePriceRangeChange = (range: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      priceRange: prev.priceRange === range ? '' : range
    }));
  };

  // Apply filters
  const handleApplyFilters = () => {
    onApply(selectedFilters);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedFilters({
      priceRange: '',
      bundleType: [],
      discountRange: [],
      itemCount: []
    });
    onApply({});
  };

  // Default bundle types if not provided by backend
  const defaultBundleTypes = [
    { type: 'Skincare Sets', count: 8 },
    { type: 'Value Sets', count: 5 },
    { type: 'Gift Sets', count: 4 },
    { type: 'Travel Sets', count: 3 },
    { type: 'Limited Edition', count: 2 }
  ];

  // Default discount ranges if not provided by backend
  const defaultDiscountRanges = [
    { type: '10% - 20% Off', count: 6 },
    { type: '21% - 30% Off', count: 4 },
    { type: '31% - 40% Off', count: 3 },
    { type: '41% - 50% Off', count: 2 },
    { type: 'Over 50% Off', count: 1 }
  ];

  // Default item counts if not provided by backend
  const defaultItemCounts = [
    { type: '2-3 Items', count: 5 },
    { type: '4-5 Items', count: 4 },
    { type: '6+ Items', count: 2 }
  ];

  return (
    <div className="w-full">
      <div>
        {/* Price Filter */}
        <div className="mb-8">
          <h4 className="text-sm font-medium mb-3 text-[#666666]">Price Range</h4>
          <div className="space-y-2">
            {(filterOptions?.priceRanges || [
              { range: '0 - 1,000', count: 3 },
              { range: '1,001 - 2,000', count: 5 },
              { range: '2,001 - 3,000', count: 4 },
              { range: '3,001 - 4,000', count: 2 },
              { range: '4,000+', count: 1 }
            ]).map((range: any) => (
              <label key={range.range} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters.priceRange === range.range}
                  onChange={() => handlePriceRangeChange(range.range)}
                  className="rounded border-gray-300 text-[#779B78] focus:ring-[#779B78]"
                />
                <span className="text-sm text-[#666666]">₱{range.range} ({range.count})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Bundle Type Filter */}
        <div className="mb-8">
          <h4 className="text-sm font-medium mb-3 text-[#666666]">Bundle Type</h4>
          <div className="space-y-2">
            {(filterOptions?.bundleTypes || defaultBundleTypes).map((type: any) => (
              <label key={type.type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters.bundleType.includes(type.type)}
                  onChange={() => handleCheckboxChange('bundleType', type.type)}
                  className="rounded border-gray-300 text-[#779B78] focus:ring-[#779B78]"
                />
                <span className="text-sm text-[#666666]">{type.type} ({type.count})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Discount Range Filter */}
        <div className="mb-8">
          <h4 className="text-sm font-medium mb-3 text-[#666666]">Discount Range</h4>
          <div className="space-y-2">
            {(filterOptions?.discountRanges || defaultDiscountRanges).map((range: any) => (
              <label key={range.type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters.discountRange.includes(range.type)}
                  onChange={() => handleCheckboxChange('discountRange', range.type)}
                  className="rounded border-gray-300 text-[#779B78] focus:ring-[#779B78]"
                />
                <span className="text-sm text-[#666666]">{range.type} ({range.count})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Item Count Filter */}
        <div className="mb-8">
          <h4 className="text-sm font-medium mb-3 text-[#666666]">Number of Items</h4>
          <div className="space-y-2">
            {(filterOptions?.itemCounts || defaultItemCounts).map((count: any) => (
              <label key={count.type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters.itemCount.includes(count.type)}
                  onChange={() => handleCheckboxChange('itemCount', count.type)}
                  className="rounded border-gray-300 text-[#779B78] focus:ring-[#779B78]"
                />
                <span className="text-sm text-[#666666]">{count.type} ({count.count})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="space-y-3">
          <button 
            onClick={handleApplyFilters}
            className="w-full py-2 text-white font-semibold bg-[#779B78] hover:bg-white hover:text-[#779B78] border border-transparent hover:border-[#779B78] transition-all duration-200 rounded-none text-sm tracking-wide"
          >
            Apply Filters
          </button>
          <button 
            onClick={handleClearFilters}
            className="w-full py-2 text-[#779B78] font-semibold bg-white hover:bg-[#779B78] hover:text-white border border-[#779B78] transition-all duration-200 rounded-none text-sm tracking-wide"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar; 