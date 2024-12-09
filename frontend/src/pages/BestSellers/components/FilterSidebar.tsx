import React, { useState } from 'react';
import { FilterOptions } from '../../../hooks/useProducts';

interface FilterSidebarProps {
  onApply: (filters: FilterOptions) => void;
  filterOptions: {
    skinTypes: Array<{ type: string; count: number }>;
    concerns: Array<{ type: string; count: number }>;
    ingredients: Array<{ type: string; count: number }>;
  };
  sortOptions: Array<{ value: string; label: string }>;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onApply, filterOptions, sortOptions }) => {
  const [selectedFilters, setSelectedFilters] = useState<FilterOptions>({
    skinTypes: [],
    concerns: [],
    ingredients: [],
    sortBy: 'featured'
  });

  // Handle checkbox changes
  const handleCheckboxChange = (filterType: 'skinTypes' | 'concerns' | 'ingredients', value: string) => {
    setSelectedFilters(prev => {
      const currentValues = prev[filterType] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [filterType]: newValues
      };
    });
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      sortBy: value
    }));
  };

  // Apply filters
  const handleApplyFilters = () => {
    onApply(selectedFilters);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedFilters({
      skinTypes: [],
      concerns: [],
      ingredients: [],
      sortBy: 'featured'
    });
    onApply({
      sortBy: 'featured'
    });
  };

  return (
    <div className="w-full">
      <div>
        {/* Sort Options */}
        <div className="mb-8">
          <h4 className="text-sm font-medium mb-3 text-[#666666]">Sort By</h4>
          <select
            value={selectedFilters.sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#779B78]"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Skin Type Filter */}
        {filterOptions.skinTypes?.length > 0 && (
          <div className="mb-8">
            <h4 className="text-sm font-medium mb-3 text-[#666666]">Skin Type</h4>
            <div className="space-y-2">
              {filterOptions.skinTypes.map((type) => (
                <label key={type.type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFilters.skinTypes?.includes(type.type)}
                    onChange={() => handleCheckboxChange('skinTypes', type.type)}
                    className="rounded border-gray-300 text-[#779B78] focus:ring-[#779B78]"
                  />
                  <span className="text-sm text-[#666666]">{type.type} ({type.count})</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Concerns Filter */}
        {filterOptions.concerns?.length > 0 && (
          <div className="mb-8">
            <h4 className="text-sm font-medium mb-3 text-[#666666]">Concerns</h4>
            <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
              {filterOptions.concerns.map((concern) => (
                <label key={concern.type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFilters.concerns?.includes(concern.type)}
                    onChange={() => handleCheckboxChange('concerns', concern.type)}
                    className="rounded border-gray-300 text-[#779B78] focus:ring-[#779B78]"
                  />
                  <span className="text-sm text-[#666666]">{concern.type} ({concern.count})</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Ingredients Filter */}
        {filterOptions.ingredients?.length > 0 && (
          <div className="mb-8">
            <h4 className="text-sm font-medium mb-3 text-[#666666]">Ingredients</h4>
            <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
              {filterOptions.ingredients.map((ingredient) => (
                <label key={ingredient.type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFilters.ingredients?.includes(ingredient.type)}
                    onChange={() => handleCheckboxChange('ingredients', ingredient.type)}
                    className="rounded border-gray-300 text-[#779B78] focus:ring-[#779B78]"
                  />
                  <span className="text-sm text-[#666666]">{ingredient.type} ({ingredient.count})</span>
                </label>
              ))}
            </div>
          </div>
        )}

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