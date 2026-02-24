import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const MotionDiv = motion.div as any;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
          ? 'py-4 bg-heppu-cream/80 backdrop-blur-md shadow-sm'
          : 'py-6 bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo Text/Image Placeholder */}
          <div className="flex items-center gap-2 z-50">
            <img
              src="/heppu-logo.png"
              alt="Heppu Logo"
              className="h-16 w-auto object-contain"
            />
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 md:gap-8 font-medium overflow-x-auto no-scrollbar whitespace-nowrap scroll-smooth px-2">
            <a href="#" className="hover:text-[#570B03] transition-colors text-sm md:text-base">Our Story</a>
            <a href="#" className="hover:text-[#570B03] transition-colors text-sm md:text-base">Products</a>
            <a href="#" className="hover:text-[#570B03] transition-colors text-sm md:text-base">Recipes</a>
            <a href="#" className="hover:text-[#570B03] transition-colors text-sm md:text-base hidden sm:block">Sustainability</a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            <button className="flex items-center gap-1 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-heppu-dark/20 hover:bg-heppu-dark hover:text-heppu-cream transition-all">
              <ShoppingBag size={18} className="w-4 h-4 md:w-[18px] md:h-[18px]" />
              <span className="text-sm md:text-base whitespace-nowrap">Cart (0)</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;