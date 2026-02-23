import React, { useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';

// Mock Product Data
const products = [
  { id: 1, name: "Heppu A1 Milk", type: "Full Fat", price: "$4.50", color: "bg-blue-100 text-black" },
  { id: 2, name: "Heppu A2 Milk", type: "Low Fat", price: "$4.20", color: "bg-pink-100 text-black" },
  { id: 3, name: "Heppu Ghee", type: "Flavored", price: "$5.00", color: "bg-amber-700 text-white" },
  { id: 4, name: "Heppu Lassi", type: "Probiotic", price: "$3.50", color: "bg-white border-2 border-heppu-clay text-black" },
  { id: 5, name: "Pot Set Curd", type: "Traditional", price: "$6.00", color: "bg-heppu-dark text-heppu-cream" },
];

const ProductCard: React.FC<{ product: typeof products[0] }> = ({ product }) => {
  return (
    <div className={`
      relative h-[400px] w-[300px] md:h-[500px] md:w-[400px] 
      rounded-3xl flex-shrink-0 p-8 flex flex-col justify-between
      transition-transform hover:scale-105 duration-300 shadow-xl
      ${product.color}
    `}>
      <div>
        <h3 className="text-3xl font-display font-bold mb-2">{product.name}</h3>
        <p className="opacity-70 font-medium tracking-wide">{product.type}</p>
      </div>

      <div className="flex justify-center my-8">
        {/* Placeholder for Product Bottle Image */}
        <div className="w-32 h-48 bg-black/5 rounded-full backdrop-blur-sm border-2 border-white/20 flex items-center justify-center">
          <span className="opacity-20 font-display font-bold rotate-90 text-2xl">BOTTLE</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold">{product.price}</span>
        <button className="px-6 py-2 bg-black text-white rounded-full font-bold hover:bg-opacity-80 transition-opacity">
          Add
        </button>
      </div>
    </div>
  );
};

const HorizontalProducts: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Calculate the horizontal translation based on scroll progress
  // We want to move the list to the left as we scroll down
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-65%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">

        {/* Section Header (Fixed position visually) */}
        <div className="absolute top-10 left-10 md:left-20 z-10">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-heppu-dark">
            The Collection
          </h2>
          <p className="text-white/80 mt-2 max-w-xs">Drag, scroll, and discover the richness of Heppu.</p>
        </div>

        {/* Moving Container */}
        <motion.div style={{ x }} className="flex gap-12 px-10 md:px-20 pt-24">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {/* "More coming soon" Card */}
          <div className="h-[400px] w-[300px] md:h-[500px] md:w-[400px] rounded-3xl flex-shrink-0 flex items-center justify-center border-4 border-dashed border-heppu-clay/30">
            <span className="text-2xl font-display text-[#b13e0d] font-bold">More Coming Soon</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalProducts;