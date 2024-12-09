import React from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { User, Package, MapPin, LogOut } from 'lucide-react';

const Account = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          {/* Sidebar */}
          <aside className="py-6 px-2 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
            <nav className="space-y-1">
              <NavLink
                to="/account/profile"
                className={({ isActive }) =>
                  `group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-[#FF66C4] text-white'
                      : 'text-gray-900 hover:text-[#FF66C4] hover:bg-pink-50'
                  }`
                }
              >
                <User
                  className={`flex-shrink-0 -ml-1 mr-3 h-6 w-6 ${
                    location.pathname === '/account/profile'
                      ? 'text-white'
                      : 'text-gray-500 group-hover:text-[#FF66C4]'
                  }`}
                />
                <span>Profile</span>
              </NavLink>

              <NavLink
                to="/account/orders"
                className={({ isActive }) =>
                  `group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-[#FF66C4] text-white'
                      : 'text-gray-900 hover:text-[#FF66C4] hover:bg-pink-50'
                  }`
                }
              >
                <Package
                  className={`flex-shrink-0 -ml-1 mr-3 h-6 w-6 ${
                    location.pathname === '/account/orders'
                      ? 'text-white'
                      : 'text-gray-500 group-hover:text-[#FF66C4]'
                  }`}
                />
                <span>Orders</span>
              </NavLink>

              <NavLink
                to="/account/address"
                className={({ isActive }) =>
                  `group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-[#FF66C4] text-white'
                      : 'text-gray-900 hover:text-[#FF66C4] hover:bg-pink-50'
                  }`
                }
              >
                <MapPin
                  className={`flex-shrink-0 -ml-1 mr-3 h-6 w-6 ${
                    location.pathname === '/account/address'
                      ? 'text-white'
                      : 'text-gray-500 group-hover:text-[#FF66C4]'
                  }`}
                />
                <span>Address</span>
              </NavLink>

              <button
                onClick={handleLogout}
                className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-900 hover:text-[#FF66C4] hover:bg-pink-50 w-full"
              >
                <LogOut className="flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-gray-500 group-hover:text-[#FF66C4]" />
                <span>Sign Out</span>
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account; 