import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: 'featured', label: 'Featured' },
    { value: 'a-to-z', label: 'A to Z' },
    { value: 'z-to-a', label: 'Z to A' },
    { value: 'price-low-to-high', label: 'Price: Low to High' },
    { value: 'price-high-to-low', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' }
  ];

  const getSelectedLabel = () => {
    const selected = options.find(opt => opt.value === value);
    return selected ? selected.label : 'Sort';
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
      >
        <span>{getSelectedLabel()}</span>
        <ChevronDown className="h-3.5 w-3.5" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Dropdown */}
          <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg py-2 z-50">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  value === option.value
                    ? 'text-[#FF66C4] bg-gray-50'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-[#FF66C4]'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SortDropdown; 