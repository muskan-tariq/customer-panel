import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-[#e5e5e5] pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link 
              to="/contact"
              className="inline-block relative group"
            >
              <h3 
                className="text-[15px] font-medium mb-4 text-[#333333] uppercase tracking-[0.1em] hover:text-black transition-colors"
                style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
              >
                Contact Us
              </h3>
              <span className="absolute bottom-[14px] left-0 w-full h-[1px] bg-black transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
            <div className="space-y-[10px]">
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#666666] mt-1" />
                <div>
                  <p className="text-[#666666] text-[14px]">info@sameglow.co</p>
                  <p className="text-[#666666] text-[14px]">support@sameglow.co</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#666666] mt-1" />
                <div>
                  <p className="text-[#666666] text-[14px]">+63 912 345 6789</p>
                  <p className="text-[#666666] text-[14px]">+63 998 765 4321</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#666666] mt-1" />
                <div>
                  <p className="text-[#666666] text-[14px]">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p className="text-[#666666] text-[14px]">Sat: 9:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 
              className="text-[15px] font-medium mb-4 text-[#333333] uppercase tracking-[0.1em]"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-[10px]">
              <li><Link to="/best-sellers" className="text-[#666666] text-[14px] hover:text-black transition-colors">Best Sellers</Link></li>
              <li><Link to="/products" className="text-[#666666] text-[14px] hover:text-black transition-colors">All Products</Link></li>
              <li><Link to="/bundles" className="text-[#666666] text-[14px] hover:text-black transition-colors">Bundles & Deals</Link></li>
              <li><Link to="/blog" className="text-[#666666] text-[14px] hover:text-black transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 
              className="text-[15px] font-medium mb-4 text-[#333333] uppercase tracking-[0.1em]"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              Information
            </h3>
            <ul className="space-y-[10px]">
              <li><Link to="/about" className="text-[#666666] text-[14px] hover:text-black transition-colors">About Us</Link></li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-[#666666] text-[14px] hover:text-black transition-colors relative group"
                >
                  Contact Us
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </Link>
              </li>
              <li><Link to="/shipping-policy" className="text-[#666666] text-[14px] hover:text-black transition-colors">Shipping Policy</Link></li>
              <li><Link to="/refund-policy" className="text-[#666666] text-[14px] hover:text-black transition-colors">Refund Policy</Link></li>
              <li><Link to="/privacy-policy" className="text-[#666666] text-[14px] hover:text-black transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-[#666666] text-[14px] hover:text-black transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 
              className="text-[15px] font-medium mb-4 text-[#333333] uppercase tracking-[0.1em]"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              Newsletter
            </h3>
            <p className="text-[#666666] text-[14px] mb-4">Subscribe to get special offers and updates</p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-[10px] rounded-none border border-[#e5e5e5] text-[14px] focus:outline-none focus:border-black placeholder:text-[#888888]"
              />
              <button className="bg-black text-white px-4 py-[10px] hover:opacity-80 transition-opacity text-[14px] uppercase tracking-wide">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-[#e5e5e5] mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#666666] text-[14px]">
              © 2024 SAM E-GLOWCo. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-[#666666] hover:text-black transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#666666] hover:text-black transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#666666] hover:text-black transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;