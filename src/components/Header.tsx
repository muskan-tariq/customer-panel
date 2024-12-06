import { ShoppingCart, User, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assests/logo.png';

const Header = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 48,
    minutes: 0,
    seconds: 0
  });

  const [showProductsDropdown, setShowProductsDropdown] = useState(false);

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

  const productCategories = [
    { name: 'Moisturizer', path: '/products/moisturizer' },
    { name: 'Serum', path: '/products/serum' },
    { name: 'Toner', path: '/products/toner' },
    { name: 'Face Wash', path: '/products/facewash' },
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
            <div className="flex items-center space-x-6 w-[100px]">
              <button className="hover:text-primary transition-colors" aria-label="Account">
                <User className="h-5 w-5" />
              </button>
              <button className="hover:text-primary transition-colors" aria-label="Search">
                <Search className="h-5 w-5" />
              </button>
              <button className="hover:text-primary transition-colors relative" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </button>
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
    </header>
  );
};

export default Header;