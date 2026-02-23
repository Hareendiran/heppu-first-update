import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-heppu-dark text-[#b13e0d] pt-20 pb-10 rounded-t-[3rem] -mt-10 relative z-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">

        <div className="col-span-1 md:col-span-2">
          <h2 className="text-4xl font-display font-bold mb-6">HEPPU</h2>
          <p className="max-w-sm opacity-70 mb-8">
            Reimagining dairy through tradition. Pure, wholesome, and ethically sourced milk for the modern family.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-heppu-cream/10 flex items-center justify-center hover:bg-heppu-cream hover:text-heppu-dark transition-all">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-heppu-cream/10 flex items-center justify-center hover:bg-heppu-cream hover:text-heppu-dark transition-all">
              <Twitter size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-heppu-cream/10 flex items-center justify-center hover:bg-heppu-cream hover:text-heppu-dark transition-all">
              <Facebook size={20} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-6 text-xl">Shop</h3>
          <ul className="space-y-4 opacity-70">
            <li><a href="#" className="hover:text-heppu-accent transition-colors">All Products</a></li>
            <li><a href="#" className="hover:text-heppu-accent transition-colors">Subscriptions</a></li>
            <li><a href="#" className="hover:text-heppu-accent transition-colors">Gift Cards</a></li>
            <li><a href="#" className="hover:text-heppu-accent transition-colors">Store Locator</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-6 text-xl">Company</h3>
          <ul className="space-y-4 opacity-70">
            <li><a href="#" className="hover:text-heppu-accent transition-colors">Our Story</a></li>
            <li><a href="#" className="hover:text-heppu-accent transition-colors">Sustainability</a></li>
            <li><a href="#" className="hover:text-heppu-accent transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-heppu-accent transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-heppu-cream/10 flex flex-col md:flex-row justify-between items-center text-sm text-black font-medium">
        <p>&copy; {new Date().getFullYear()} Heppu Dairy Co. All rights reserved.</p>
        <div className="flex gap-8 mt-4 md:mt-0">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;