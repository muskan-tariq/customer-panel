import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { User, MapPin, Package, LogOut } from 'lucide-react';

type TabType = 'profile' | 'addresses' | 'orders';

const Account = () => {
  const navigate = useNavigate();
  const { user, logout, updateProfile, addAddress, updateAddress, deleteAddress } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  const [newAddress, setNewAddress] = useState({
    type: 'shipping' as const,
    street: '',
    city: '',
    state: '',
    zipCode: '',
    isDefault: false
  });

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(profileData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addAddress(newAddress);
      setNewAddress({
        type: 'shipping',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        isDefault: false
      });
    } catch (error) {
      console.error('Failed to add address:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          {/* Sidebar */}
          <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`group rounded-md px-3 py-2 flex items-center text-sm font-medium w-full ${
                  activeTab === 'profile'
                    ? 'bg-[#FF66C4] text-white'
                    : 'text-gray-900 hover:bg-gray-50'
                }`}
              >
                <User
                  className={`flex-shrink-0 -ml-1 mr-3 h-6 w-6 ${
                    activeTab === 'profile' ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                <span>Profile</span>
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                className={`group rounded-md px-3 py-2 flex items-center text-sm font-medium w-full ${
                  activeTab === 'addresses'
                    ? 'bg-[#FF66C4] text-white'
                    : 'text-gray-900 hover:bg-gray-50'
                }`}
              >
                <MapPin
                  className={`flex-shrink-0 -ml-1 mr-3 h-6 w-6 ${
                    activeTab === 'addresses' ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                <span>Addresses</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`group rounded-md px-3 py-2 flex items-center text-sm font-medium w-full ${
                  activeTab === 'orders'
                    ? 'bg-[#FF66C4] text-white'
                    : 'text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Package
                  className={`flex-shrink-0 -ml-1 mr-3 h-6 w-6 ${
                    activeTab === 'orders' ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                <span>Order History</span>
              </button>

              <button
                onClick={handleLogout}
                className="group rounded-md px-3 py-2 flex items-center text-sm font-medium w-full text-gray-900 hover:bg-gray-50"
              >
                <LogOut className="flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                <span>Sign Out</span>
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
            {activeTab === 'profile' && (
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Profile</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Update your personal information.
                    </p>
                  </div>

                  <form onSubmit={handleProfileUpdate}>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          disabled={!isEditing}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF66C4] focus:border-[#FF66C4] sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          disabled={!isEditing}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF66C4] focus:border-[#FF66C4] sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end space-x-2">
                      {isEditing ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF66C4]"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="bg-[#FF66C4] border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-[#ff4db7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF66C4]"
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setIsEditing(true)}
                          className="bg-[#FF66C4] border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-[#ff4db7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF66C4]"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Addresses</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Manage your shipping and billing addresses.
                    </p>
                  </div>

                  {/* Address List */}
                  <div className="space-y-4">
                    {user?.addresses.map((address) => (
                      <div
                        key={address.id}
                        className="border border-gray-200 rounded-md p-4 relative"
                      >
                        <div className="flex justify-between">
                          <div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                              {address.type}
                            </span>
                            {address.isDefault && (
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Default
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => deleteAddress(address.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="mt-2">
                          <p className="text-gray-600">{address.street}</p>
                          <p className="text-gray-600">
                            {address.city}, {address.state} {address.zipCode}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add New Address Form */}
                  <form onSubmit={handleAddAddress} className="mt-6 border-t border-gray-200 pt-6">
                    <h4 className="text-md font-medium text-gray-900 mb-4">Add New Address</h4>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                          Address Type
                        </label>
                        <select
                          id="type"
                          value={newAddress.type}
                          onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value as 'shipping' | 'billing' })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF66C4] focus:border-[#FF66C4] sm:text-sm"
                        >
                          <option value="shipping">Shipping</option>
                          <option value="billing">Billing</option>
                        </select>
                      </div>

                      <div className="col-span-6">
                        <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                          Street Address
                        </label>
                        <input
                          type="text"
                          id="street"
                          value={newAddress.street}
                          onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF66C4] focus:border-[#FF66C4] sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-2">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          value={newAddress.city}
                          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF66C4] focus:border-[#FF66C4] sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-2">
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                          State
                        </label>
                        <input
                          type="text"
                          id="state"
                          value={newAddress.state}
                          onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF66C4] focus:border-[#FF66C4] sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-2">
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          value={newAddress.zipCode}
                          onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF66C4] focus:border-[#FF66C4] sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6">
                        <div className="flex items-center">
                          <input
                            id="isDefault"
                            type="checkbox"
                            checked={newAddress.isDefault}
                            onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                            className="h-4 w-4 text-[#FF66C4] focus:ring-[#FF66C4] border-gray-300 rounded"
                          />
                          <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-900">
                            Set as default address
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <button
                        type="submit"
                        className="bg-[#FF66C4] border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-[#ff4db7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF66C4]"
                      >
                        Add Address
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Order History</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      View your past orders and their status.
                    </p>
                  </div>

                  {/* Order List */}
                  <div className="space-y-4">
                    {/* This would be populated with actual order data */}
                    <div className="border border-gray-200 rounded-md p-4">
                      <p className="text-gray-500 text-sm">No orders found.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account; 