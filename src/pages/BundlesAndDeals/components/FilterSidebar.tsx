const FilterSidebar = () => {
  return (
    <div className="w-full">
      <div>
        {/* Price Filter */}
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

        {/* Bundle Type Filter */}
        <div className="mb-8">
          <h4 className="text-sm font-medium mb-3 text-[#666666]">Bundle Type</h4>
          <div className="space-y-2">
            {[
              'Skincare Sets (8)',
              'Value Sets (5)',
              'Gift Sets (4)',
              'Travel Sets (3)',
              'Limited Edition (2)'
            ].map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-[#779B78] focus:ring-[#779B78]" />
                <span className="text-sm text-[#666666]">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Discount Range Filter */}
        <div className="mb-8">
          <h4 className="text-sm font-medium mb-3 text-[#666666]">Discount Range</h4>
          <div className="space-y-2">
            {[
              '10% - 20% Off (6)',
              '21% - 30% Off (4)',
              '31% - 40% Off (3)',
              '41% - 50% Off (2)',
              'Over 50% Off (1)'
            ].map((range) => (
              <label key={range} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-[#779B78] focus:ring-[#779B78]" />
                <span className="text-sm text-[#666666]">{range}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="space-y-3">
          <button 
            className="w-full py-2 text-white font-semibold bg-[#779B78] hover:bg-white hover:text-[#779B78] border border-transparent hover:border-[#779B78] transition-all duration-200 rounded-none text-sm tracking-wide"
          >
            Apply Filters
          </button>
          <button 
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