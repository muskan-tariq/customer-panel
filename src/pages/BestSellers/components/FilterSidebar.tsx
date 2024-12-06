const FilterSidebar = () => {
  return (
    <div className="w-full">
      <div>
        {/* Availability Filter */}
        <div className="mb-8">
          <h4 className="text-sm font-medium mb-3 text-[#666666]">Availability</h4>
          <label className="flex items-center gap-2 mb-2 cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300 text-[#779B78] focus:ring-[#779B78]" />
            <span className="text-sm text-[#666666]">In stock (25)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300 text-[#779B78] focus:ring-[#779B78]" />
            <span className="text-sm text-[#666666]">Out of stock (0)</span>
          </label>
        </div>

        {/* Price Filter */}
        <div className="mb-8">
          <h4 className="text-sm font-medium mb-3 text-[#666666]">Price</h4>
          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <span className="text-sm text-gray-400">₱</span>
              </div>
              <input
                type="number"
                placeholder="Min"
                className="w-full border border-gray-200 rounded-none pl-6 pr-2 py-1.5 text-sm text-[#666666] focus:border-[#779B78] focus:ring-[#779B78] appearance-none"
              />
            </div>
            <span className="text-[#666666]">-</span>
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <span className="text-sm text-gray-400">₱</span>
              </div>
              <input
                type="number"
                placeholder="Max"
                className="w-full border border-gray-200 rounded-none pl-6 pr-2 py-1.5 text-sm text-[#666666] focus:border-[#779B78] focus:ring-[#779B78] appearance-none"
              />
            </div>
          </div>
        </div>

        {/* Product Type Filter */}
        <div className="mb-8">
          <h4 className="text-sm font-medium mb-3 text-[#666666]">Product Type</h4>
          <div className="max-h-48 overflow-y-auto pr-2">
            {[
              'Anti-Aging Skin Care Kits (4)',
              'Beauty Boxes (5)',
              'Bundle (1)',
              'Cleanser (2)',
              'Eye Makeup (1)',
              'Lip Balms (3)',
              'Lip Makeup (2)',
              'Moisturizer (1)',
              'Skin Care (3)'
            ].map((type) => (
              <label key={type} className="flex items-center gap-2 py-1.5 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-[#779B78] focus:ring-[#779B78]" />
                <span className="text-sm text-[#666666]">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <button 
          className="w-full py-2 text-white font-semibold bg-[#779B78] hover:bg-white hover:text-[#779B78] border border-transparent hover:border-[#779B78] transition-all duration-200 rounded-none text-sm tracking-wide"
        >
          See results
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar; 