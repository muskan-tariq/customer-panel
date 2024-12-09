import { ShoppingCart, User, Search, X, Package, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assests/logo.png';
import CartButton from '../pages/Cart/CartButton';
import { useCart } from '../contexts/CartContext';
import Cart from '../pages/Cart/Cart';
import { useAuth } from '../contexts/AuthContext';


const Header = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 48,
    minutes: 0,
    seconds: 0
  });

  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { totalItems, setIsCartOpen } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchModal(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleProfileClick = () => {
    if (user) {
      navigate('/account');
    } else {
      navigate('/register');
    }
  };

  const productCategories = [
    { name: 'Moisturizer', path: '/products/moisturizer' },
    { name: 'Serum', path: '/products/serum' },
    { name: 'Toner', path: '/products/toner' },
    { name: 'Face Wash', path: '/products/face-wash' },
    { name: 'Sunscreen', path: '/products/sunscreen' },
  ];

  return (
    <header className="relative bg-white">
      {/* Announcement Bar - Made Fixed */}
      <div className="fixed top-0 left-0 right-0 bg-[#FF66C4] py-2 text-center z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-[11px]">
            <span className="bg-white/90 text-[#FF66C4] px-2 py-0.5 rounded-full font-medium shrink-0">
              MEGA SALE
            </span>
            <p className="text-white font-medium truncate">
              30% OFF SITEWIDE + FREE SHIPPING on orders above ₱1,000!
            </p>
            <span className="bg-white/90 text-[#FF66C4] px-2 py-0.5 rounded-full font-medium shrink-0">
              SUMMER30
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-white">Ends in:</span>
              <div className="flex gap-0.5 items-center flap-animation">
                <span className="bg-[#4A90E2] text-[#EDFA05] px-1.5 py-0.5 rounded text-[10px] font-bold shadow-sm">
                  {String(timeLeft.hours).padStart(2, '0')}h
                </span>
                <span className="text-[#EDFA05] font-bold">:</span>
                <span className="bg-[#4A90E2] text-[#EDFA05] px-1.5 py-0.5 rounded text-[10px] font-bold shadow-sm">
                  {String(timeLeft.minutes).padStart(2, '0')}m
                </span>
                <span className="text-[#EDFA05] font-bold">:</span>
                <span className="bg-[#4A90E2] text-[#EDFA05] px-1.5 py-0.5 rounded text-[10px] font-bold shadow-sm">
                  {String(timeLeft.seconds).padStart(2, '0')}s
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/10 rounded-full"></div>
        <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/10 rounded-full"></div>
      </div>

      {/* Adjust padding for smaller announcement bar */}
      <div className="h-[40px]"></div>

      {/* Main Header */}
      <div className="bg-white pt-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-8 relative">
            {/* Empty div for spacing */}
            <div className="w-[100px]"></div>
            
            {/* Centered Logo */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <img 
                src={logo} 
                alt="SAM E-GLOWCo" 
                className="h-24 w-auto"
              />
            </Link>

            {/* Icons */}
            <div className="flex items-center gap-6 justify-end min-w-[180px]">
              <Link
                to="/chat" 
                className="hover:text-primary transition-colors relative" 
                aria-label="Customer Support"
              >
                <MessageCircle className="h-5 w-5" />
              </Link>
              <Link
                to="/account/orders" 
                className="hover:text-primary transition-colors relative" 
                aria-label="Order History"
              >
                <Package className="h-5 w-5" />
              </Link>
              <button 
                onClick={handleProfileClick}
                className="hover:text-primary transition-colors relative group" 
                aria-label="Account"
              >
                <User className="h-5 w-5" />
                {!user && (
                  <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg py-1 px-4 text-sm text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Sign in / Register
                  </div>
                )}
              </button>
              <button 
                className="hover:text-primary transition-colors relative" 
                aria-label="Search"
                onClick={() => setShowSearchModal(true)}
              >
                <Search className="h-5 w-5" />
              </button>
              <CartButton itemCount={totalItems} onClick={() => setIsCartOpen(true)} />
            </div>
          </div>

          <nav className="flex justify-center items-center pb-4 mt-4">
            <ul className="flex space-x-12 text-sm font-medium">
              {[
                { name: 'Home', path: '/' },
                { name: 'Best Sellers', path: '/best-sellers' },
                { name: 'Bundles & Deals', path: '/bundles' },
                { name: 'Products', path: '/products', hasDropdown: true },
                { name: 'Blog', path: '/blog' },
                { name: 'About Us', path: '/about' }
              ].map((item) => (
                <li key={item.path} className="relative">
                  {item.hasDropdown ? (
                    <Link
                      to={item.path}
                      className="relative py-2 text-gray-700 hover:text-black transition-colors duration-300 group inline-block"
                      onMouseEnter={() => setShowProductsDropdown(true)}
                      onMouseLeave={() => setShowProductsDropdown(false)}
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                      
                      {/* Dropdown Menu */}
                      {showProductsDropdown && (
                        <div className="absolute top-full left-0 w-48 bg-white shadow-lg py-2 z-50">
                          {productCategories.map((category) => (
                            <Link
                              key={category.path}
                              to={category.path}
                              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#FF66C4]"
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </Link>
                  ) : (
                    <Link
                      to={item.path} 
                      className="relative py-2 text-gray-700 hover:text-black transition-colors duration-300 group inline-block"
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Search Modal */}
      <AnimatePresence>
        {showSearchModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
              onClick={() => setShowSearchModal(false)}
            >
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", duration: 0.3 }}
                className="w-full max-w-2xl mx-4 bg-white rounded-xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Search Header */}
                <div className="p-4 border-b border-gray-100">
                  <h2 className="text-lg font-[450] text-[#303030] text-center">Search Products</h2>
                </div>

                {/* Search Form */}
                <div className="p-6">
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg focus:ring-[#FF66C4] focus:border-[#FF66C4] transition-colors text-[15px]"
                      autoFocus
                    />
                  </form>

                  {/* Popular Searches */}
                  <div className="mt-6">
                    <h3 className="text-sm font-[450] text-gray-500 mb-3">Popular Searches</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Moisturizer', 'Serum', 'Sunscreen', 'Face Wash', 'Toner'].map((term) => (
                        <button
                          key={term}
                          onClick={() => {
                            setSearchQuery(term);
                            handleSearch(new Event('submit') as any);
                          }}
                          className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-600 text-sm rounded-full transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Categories */}
                  <div className="mt-6">
                    <h3 className="text-sm font-[450] text-gray-500 mb-3">Quick Categories</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {productCategories.map((category) => (
                        <Link
                          key={category.path}
                          to={category.path}
                          className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 text-sm rounded-lg transition-colors text-center"
                          onClick={() => setShowSearchModal(false)}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setShowSearchModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <Cart />
    </header>
  );
};

export default Header;