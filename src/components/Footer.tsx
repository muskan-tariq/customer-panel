import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white text-[#777777]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 
              className="text-[15px] font-medium mb-4 text-[#333333] uppercase tracking-[0.1em]"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              Contact Us
            </h3>
            <ul className="space-y-[12px]">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FF66C4]" />
                <a href="mailto:support@sameglowco.com" className="text-[#666666] text-[14px] hover:text-black transition-colors">
                  support@sameglowco.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FF66C4]" />
                <a href="tel:+1234567890" className="text-[#666666] text-[14px] hover:text-black transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#FF66C4] mt-[2px]" />
                <div className="text-[#666666]">
                  <p className="text-[14px]">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p className="text-[14px]">Sat - Sun: 10:00 AM - 4:00 PM</p>
                  <p className="text-[14px] text-[#888888]">(EST Time Zone)</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 
              className="text-[15px] font-medium mb-4 text-[#333333] uppercase tracking-[0.1em]"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-[10px]">
              <li><a href="/best-sellers" className="text-[#666666] text-[14px] hover:text-black transition-colors">Best Sellers</a></li>
              <li><a href="/products" className="text-[#666666] text-[14px] hover:text-black transition-colors">All Products</a></li>
              <li><a href="/bundles" className="text-[#666666] text-[14px] hover:text-black transition-colors">Bundles & Deals</a></li>
              <li><a href="/blog" className="text-[#666666] text-[14px] hover:text-black transition-colors">Blog</a></li>
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
              <li><a href="/about" className="text-[#666666] text-[14px] hover:text-black transition-colors">About Us</a></li>
              <li><a href="/shipping" className="text-[#666666] text-[14px] hover:text-black transition-colors">Shipping Policy</a></li>
              <li><a href="/refund" className="text-[#666666] text-[14px] hover:text-black transition-colors">Refund Policy</a></li>
              <li><a href="/privacy" className="text-[#666666] text-[14px] hover:text-black transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-[#666666] text-[14px] hover:text-black transition-colors">Terms of Service</a></li>
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