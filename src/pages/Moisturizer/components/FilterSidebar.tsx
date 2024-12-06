const FilterSidebar = () => {
  return (
    <div className="space-y-6">
      {/* Price Range Filter */}
      <div className="mb-8">
        <h4 className="text-sm font-medium mb-3 text-[#666666]">Price Range</h4>
        <div className="space-y-2">
          {[
            '₱0 - ₱500 (3)',
            '₱501 - ₱1,000 (5)',
            '₱1,001 - ₱1,500 (4)',
            '₱1,501 - ₱2,000 (2)',
            '₱2,000+ (1)'
          ].map((range) => (
            <label key={range} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-[#779B78] focus:ring-[#779B78]" />
              <span className="text-sm text-[#666666]">{range}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Skin Type Filter */}
      <div className="mb-8">
        <h4 className="text-sm font-medium mb-3 text-[#666666]">Skin Type</h4>
        <div className="space-y-2">
          {[
            'Normal (4)',
            'Dry (6)',
            'Oily (5)',
            'Combination (7)',
            'Sensitive (3)'
          ].map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-[#779B78] focus:ring-[#779B78]" />
              <span className="text-sm text-[#666666]">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Concerns Filter */}
      <div className="mb-8">
        <h4 className="text-sm font-medium mb-3 text-[#666666]">Concerns</h4>
        <div className="space-y-2">
          {[
            'Anti-Aging (3)',
            'Brightening (4)',
            'Hydration (6)',
            'Oil Control (3)',
            'Acne-Prone (2)',
            'Dark Spots (3)',
            'Fine Lines (4)'
          ].map((concern) => (
            <label key={concern} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-[#779B78] focus:ring-[#779B78]" />
              <span className="text-sm text-[#666666]">{concern}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Texture Filter */}
      <div className="mb-8">
        <h4 className="text-sm font-medium mb-3 text-[#666666]">Texture</h4>
        <div className="space-y-2">
          {[
            'Cream (5)',
            'Gel (3)',
            'Lotion (4)',
            'Oil (2)'
          ].map((texture) => (
            <label key={texture} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-[#779B78] focus:ring-[#779B78]" />
              <span className="text-sm text-[#666666]">{texture}</span>
            </label>
          ))}
        </div>
      </div>

      <button 
        className="w-full py-2 text-white font-semibold bg-[#779B78] hover:bg-white hover:text-[#779B78] border border-transparent hover:border-[#779B78] transition-all duration-200 rounded-none text-sm tracking-wide"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSidebar; 