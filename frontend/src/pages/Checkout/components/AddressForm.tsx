import React, { useState } from 'react';

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface AddressFormProps {
  initialAddress: Address;
  onSubmit: (address: Address) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ initialAddress, onSubmit }) => {
  const [address, setAddress] = useState<Address>(initialAddress);
  const [errors, setErrors] = useState<Partial<Address>>({});

  const validateForm = () => {
    const newErrors: Partial<Address> = {};
    if (!address.street.trim()) newErrors.street = 'Street address is required';
    if (!address.city.trim()) newErrors.city = 'City is required';
    if (!address.state.trim()) newErrors.state = 'State is required';
    if (!address.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!address.country.trim()) newErrors.country = 'Country is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(address);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof Address]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-medium text-gray-900 mb-6">Shipping Address</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Street Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Street Address
          </label>
          <input
            type="text"
            name="street"
            value={address.street}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 border ${
              errors.street ? 'border-red-300' : 'border-gray-300'
            } focus:outline-none focus:ring-[#FF66C4] focus:border-[#FF66C4]`}
          />
          {errors.street && (
            <p className="mt-1 text-sm text-red-600">{errors.street}</p>
          )}
        </div>

        {/* City and State */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 border ${
                errors.city ? 'border-red-300' : 'border-gray-300'
              } focus:outline-none focus:ring-[#FF66C4] focus:border-[#FF66C4]`}
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              type="text"
              name="state"
              value={address.state}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 border ${
                errors.state ? 'border-red-300' : 'border-gray-300'
              } focus:outline-none focus:ring-[#FF66C4] focus:border-[#FF66C4]`}
            />
            {errors.state && (
              <p className="mt-1 text-sm text-red-600">{errors.state}</p>
            )}
          </div>
        </div>

        {/* ZIP Code and Country */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ZIP Code
            </label>
            <input
              type="text"
              name="zipCode"
              value={address.zipCode}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 border ${
                errors.zipCode ? 'border-red-300' : 'border-gray-300'
              } focus:outline-none focus:ring-[#FF66C4] focus:border-[#FF66C4]`}
            />
            {errors.zipCode && (
              <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={address.country}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 border ${
                errors.country ? 'border-red-300' : 'border-gray-300'
              } focus:outline-none focus:ring-[#FF66C4] focus:border-[#FF66C4]`}
            />
            {errors.country && (
              <p className="mt-1 text-sm text-red-600">{errors.country}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#FF66C4] text-white px-6 py-2 rounded-md hover:bg-[#ff4db7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF66C4]"
          >
            Continue to Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm; 