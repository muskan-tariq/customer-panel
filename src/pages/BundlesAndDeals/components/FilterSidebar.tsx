import { ChevronDown } from 'lucide-react';

interface FilterSidebarProps {
  show: boolean;
}

const FilterSidebar = () => {
  return (
    <div className="space-y-6">
      {/* Bundle Type */}
      <div>
        <h3 className="font-medium text-[#303030] mb-4">Bundle Type</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-gray-300 text-[#FF66C4] focus:ring-[#FF66C4]" />
            <span className="text-sm text-gray-600">Duo Kits</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-gray-300 text-[#FF66C4] focus:ring-[#FF66C4]" />
            <span className="text-sm text-gray-600">Trio Sets</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-gray-300 text-[#FF66C4] focus:ring-[#FF66C4]" />
            <span className="text-sm text-gray-600">Value Packs</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-gray-300 text-[#FF66C4] focus:ring-[#FF66C4]" />
            <span className="text-sm text-gray-600">Gift Sets</span>
          </label>
        </div>
      </div>

      {/* Skin Concern */}
      <div>
        <h3 className="font-medium text-[#303030] mb-4">Skin Concern</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-gray-300 text-[#FF66C4] focus:ring-[#FF66C4]" />
            <span className="text-sm text-gray-600">Brightening</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-gray-300 text-[#FF66C4] focus:ring-[#FF66C4]" />
            <span className="text-sm text-gray-600">Anti-Aging</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-gray-300 text-[#FF66C4] focus:ring-[#FF66C4]" />
            <span className="text-sm text-gray-600">Hydration</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-gray-300 text-[#FF66C4] focus:ring-[#FF66C4]" />
            <span className="text-sm text-gray-600">Acne Control</span>
          </label>
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-medium text-[#303030] mb-4">Price Range</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-gray-300 text-[#FF66C4] focus:ring-[#FF66C4]" />
            <span className="text-sm text-gray-600">Under ₱1,000</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-gray-300 text-[#FF66C4] focus:ring-[#FF66C4]" />
            <span className="text-sm text-gray-600">₱1,000 - ₱2,000</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-gray-300 text-[#FF66C4] focus:ring-[#FF66C4]" />
            <span className="text-sm text-gray-600">₱2,000 - ₱3,000</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-gray-300 text-[#FF66C4] focus:ring-[#FF66C4]" />
            <span className="text-sm text-gray-600">Over ₱3,000</span>
          </label>
        </div>
      </div>

      {/* Discount */}
      <div>
        <h3 className="font-medium text-[#303030] mb-4">Discount</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-gray-300 text-[#FF66C4] focus:ring-[#FF66C4]" />
            <span className="text-sm text-gray-600">20% Off</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-gray-300 text-[#FF66C4] focus:ring-[#FF66C4]" />
            <span className="text-sm text-gray-600">30% Off</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-gray-300 text-[#FF66C4] focus:ring-[#FF66C4]" />
            <span className="text-sm text-gray-600">40% Off</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-gray-300 text-[#FF66C4] focus:ring-[#FF66C4]" />
            <span className="text-sm text-gray-600">50% Off & More</span>
          </label>
        </div>
      </div>

      {/* Clear & Apply Buttons */}
      <div className="flex gap-2 pt-4">
        <button className="flex-1 px-4 py-2 border border-gray-300 text-sm text-gray-600 hover:bg-gray-50 rounded">
          Clear All
        </button>
        <button className="flex-1 px-4 py-2 bg-[#FF66C4] text-white text-sm hover:bg-[#ff4db8] rounded">
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar; 