import React, { useState } from 'react';
import { Star } from 'lucide-react';

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

interface FilterSidebarProps {
  onApply: (filters: any) => void;
  filterOptions: FilterOptions | null;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onApply, filterOptions }) => {
  const [selectedFilters, setSelectedFilters] = useState<{
    priceRange: string[];
    skinTypes: string[];
    concerns: string[];
    ingredients: string[];
    rating: string[];
  }>({
    priceRange: [],
    skinTypes: [],
    concerns: [],
    ingredients: [],
    rating: []
  });

  const handleFilterChange = (type: string, value: string) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      const filterType = type.toLowerCase() as keyof typeof selectedFilters;
      
      if (newFilters[filterType].includes(value)) {
        newFilters[filterType] = newFilters[filterType].filter(v => v !== value);
      } else {
        newFilters[filterType] = [...newFilters[filterType], value];
      }
      
      return newFilters;
    });
  };

  const handleApply = () => {
    onApply(selectedFilters);
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      priceRange: [],
      skinTypes: [],
      concerns: [],
      ingredients: [],
      rating: []
    });
    onApply({});
  };

  if (!filterOptions) {
    return null;
  }

  return (
    <div className="w-full">
      <div>
        {/* Price Ranges */}
        {filterOptions.priceRanges.length > 0 && (
          <div className="mb-8">
            <h4 className="text-sm font-medium mb-3 text-[#666666]">Price Range</h4>
            <div className="space-y-2">
              {filterOptions.priceRanges.map((range) => (
                <label key={range.range} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFilters.priceRange.includes(range.range)}
                    onChange={() => handleFilterChange('priceRange', range.range)}
                    className="rounded border-gray-300 text-[#779B78] focus:ring-[#779B78]"
                  />
                  <span className="text-sm text-[#666666]">₱{range.range}</span>
                  <span className="text-xs text-[#666666]">({range.count})</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Skin Types */}
        {filterOptions.skinTypes.length > 0 && (
          <div className="mb-8">
            <h4 className="text-sm font-medium mb-3 text-[#666666]">Skin Type</h4>
            <div className="space-y-2">
              {filterOptions.skinTypes.map((type) => (
                <label key={type.type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFilters.skinTypes.includes(type.type)}
                    onChange={() => handleFilterChange('skinTypes', type.type)}
                    className="rounded border-gray-300 text-[#779B78] focus:ring-[#779B78]"
                  />
                  <span className="text-sm text-[#666666]">{type.type}</span>
                  <span className="text-xs text-[#666666]">({type.count})</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Concerns */}
        {filterOptions.concerns.length > 0 && (
          <div className="mb-8">
            <h4 className="text-sm font-medium mb-3 text-[#666666]">Concerns</h4>
            <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
              {filterOptions.concerns.map((concern) => (
                <label key={concern.type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFilters.concerns.includes(concern.type)}
                    onChange={() => handleFilterChange('concerns', concern.type)}
                    className="rounded border-gray-300 text-[#779B78] focus:ring-[#779B78]"
                  />
                  <span className="text-sm text-[#666666]">{concern.type}</span>
                  <span className="text-xs text-[#666666]">({concern.count})</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Ingredients */}
        {filterOptions.ingredients.length > 0 && (
          <div className="mb-8">
            <h4 className="text-sm font-medium mb-3 text-[#666666]">Key Ingredients</h4>
            <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
              {filterOptions.ingredients.map((ingredient) => (
                <label key={ingredient.type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFilters.ingredients.includes(ingredient.type)}
                    onChange={() => handleFilterChange('ingredients', ingredient.type)}
                    className="rounded border-gray-300 text-[#779B78] focus:ring-[#779B78]"
                  />
                  <span className="text-sm text-[#666666]">{ingredient.type}</span>
                  <span className="text-xs text-[#666666]">({ingredient.count})</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Rating */}
        <div className="mb-8">
          <h4 className="text-sm font-medium mb-3 text-[#666666]">Rating</h4>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters.rating.includes(`${rating}`)}
                  onChange={() => handleFilterChange('rating', `${rating}`)}
                  className="rounded border-gray-300 text-[#779B78] focus:ring-[#779B78]"
                />
                <div className="flex items-center gap-1">
                  {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#F6A429] text-[#F6A429]" />
                  ))}
                  <span className="text-sm text-[#666666]">& Up</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="space-y-3">
          <button 
            onClick={handleApply}
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