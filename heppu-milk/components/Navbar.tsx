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

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 font-medium">
            <a href="#" className="hover:text-[#570B03] transition-colors">Our Story</a>
            <a href="#" className="hover:text-[#570B03] transition-colors">Products</a>
            <a href="#" className="hover:text-[#570B03] transition-colors">Recipes</a>
            <a href="#" className="hover:text-[#570B03] transition-colors">Sustainability</a>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-heppu-dark/20 hover:bg-heppu-dark hover:text-heppu-cream transition-all">
              <ShoppingBag size={18} />
              <span>Cart (0)</span>
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden z-50">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MotionDiv
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-heppu-cream z-30 flex flex-col items-center justify-center gap-8 text-2xl font-display"
          >
            <a href="#" onClick={() => setMobileMenuOpen(false)}>Our Story</a>
            <a href="#" onClick={() => setMobileMenuOpen(false)}>Products</a>
            <a href="#" onClick={() => setMobileMenuOpen(false)}>Recipes</a>
            <a href="#" onClick={() => setMobileMenuOpen(false)}>Cart</a>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;