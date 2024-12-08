import React, { useState } from 'react';

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
  filterOptions: FilterOptions | null;
  onApply: (filters: any) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filterOptions, onApply }) => {
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedSkinTypes, setSelectedSkinTypes] = useState<string[]>([]);
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const handleApplyFilters = () => {
    onApply({
      priceRange: selectedPriceRanges,
      skinTypes: selectedSkinTypes,
      concerns: selectedConcerns,
      ingredients: selectedIngredients
    });
  };

  const handleClearFilters = () => {
    setSelectedPriceRanges([]);
    setSelectedSkinTypes([]);
    setSelectedConcerns([]);
    setSelectedIngredients([]);
  };

  if (!filterOptions) {
    return (
      <div className="p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Price Range Filter */}
      <div className="mb-8">
        <h4 className="text-sm font-medium mb-3 text-[#666666]">Price Range</h4>
        <div className="space-y-2">
          {filterOptions.priceRanges.map((range) => (
            <label key={range.range} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedPriceRanges.includes(range.range)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedPriceRanges([...selectedPriceRanges, range.range]);
                  } else {
                    setSelectedPriceRanges(selectedPriceRanges.filter(r => r !== range.range));
                  }
                }}
                className="rounded border-gray-300 text-[#779B78] focus:ring-[#779B78]"
              />
              <span className="text-sm text-[#666666]">₱{range.range} ({range.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Skin Type Filter */}
      <div className="mb-8">
        <h4 className="text-sm font-medium mb-3 text-[#666666]">Skin Type</h4>
        <div className="space-y-2">
          {filterOptions.skinTypes.map((type) => (
            <label key={type.type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedSkinTypes.includes(type.type)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedSkinTypes([...selectedSkinTypes, type.type]);
                  } else {
                    setSelectedSkinTypes(selectedSkinTypes.filter(t => t !== type.type));
                  }
                }}
                className="rounded border-gray-300 text-[#779B78] focus:ring-[#779B78]"
              />
              <span className="text-sm text-[#666666]">{type.type} ({type.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Concerns Filter */}
      <div className="mb-8">
        <h4 className="text-sm font-medium mb-3 text-[#666666]">Concerns</h4>
        <div className="space-y-2">
          {filterOptions.concerns.map((concern) => (
            <label key={concern.type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedConcerns.includes(concern.type)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedConcerns([...selectedConcerns, concern.type]);
                  } else {
                    setSelectedConcerns(selectedConcerns.filter(c => c !== concern.type));
                  }
                }}
                className="rounded border-gray-300 text-[#779B78] focus:ring-[#779B78]"
              />
              <span className="text-sm text-[#666666]">{concern.type} ({concern.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Ingredients Filter */}
      <div className="mb-8">
        <h4 className="text-sm font-medium mb-3 text-[#666666]">Key Ingredients</h4>
        <div className="space-y-2">
          {filterOptions.ingredients.map((ingredient) => (
            <label key={ingredient.type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedIngredients.includes(ingredient.type)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedIngredients([...selectedIngredients, ingredient.type]);
                  } else {
                    setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient.type));
                  }
                }}
                className="rounded border-gray-300 text-[#779B78] focus:ring-[#779B78]"
              />
              <span className="text-sm text-[#666666]">{ingredient.type} ({ingredient.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button 
          onClick={handleApplyFilters}
          className="w-full py-2 text-white font-semibold bg-[#779B78] hover:bg-white hover:text-[#779B78] border border-transparent hover:border-[#779B78] transition-all duration-200 rounded-none text-sm tracking-wide"
        >
          Apply Filters
        </button>
        <button 
          onClick={handleClearFilters}
          className="w-full py-2 text-[#666666] font-semibold bg-white hover:bg-gray-50 border border-gray-200 transition-all duration-200 rounded-none text-sm tracking-wide"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar; 