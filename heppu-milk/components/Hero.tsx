import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Milk } from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  // Parallax transformations
  const yText = useTransform(scrollY, [0, 500], [0, 200]);
  const yImage = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const MotionDiv = motion.div as any;

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center pt-20">

      {/* Background Decor Elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-heppu-clay/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-heppu-accent/20 rounded-full blur-3xl" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">

        <MotionDiv style={{ y: yText, opacity }} className="mb-8">
          <span className="inline-block py-1 px-3 rounded-full bg-heppu-dark/5 text-white/90 text-sm font-semibold tracking-wider mb-4">
            EST. 2024
          </span>
          <h1 className="text-7xl md:text-[10rem] leading-none font-display font-bold text-heppu-dark tracking-tighter">
            HEPPU
          </h1>
          <p className="text-xl md:text-3xl mt-4 font-light text-white/80 max-w-2xl mx-auto">
            Pure creamy goodness. Straight from the clay pot.
          </p>
        </MotionDiv>

        {/* Hero Image / Product Representation */}
        <MotionDiv
          style={{ y: yImage, scale }}
          className="relative w-72 h-72 md:w-96 md:h-96 mt-8 flex items-center justify-center"
        >
          {/* Glow effect behind the logo */}
          <div className="absolute inset-0 bg-heppu-accent/20 rounded-full blur-3xl transform scale-75" />

          {/* 
                PLACEHOLDER LOGO 
                Since logo.jpg is not available in this environment, I've created a CSS/SVG 
                placeholder that fits the brand. Replace this entire div with:
                <img src="logo.jpg" alt="Heppu Logo" className="relative z-10 w-full h-full object-contain" />
                when you have the file in your project folder.
             */}
          <img
            src="/heppu-logo.png"
            alt="Heppu Logo"
            className="relative z-10 w-64 h-64 md:w-80 md:h-80 object-contain transition-transform hover:scale-105 duration-500"
          />

          {/* Floating Elements */}
          <MotionDiv
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 w-24 h-24 bg-white rounded-full blur-xl opacity-60 z-0"
          />
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-10 flex flex-col items-center gap-2"
        >
          <span className="text-sm font-medium uppercase tracking-widest text-heppu-dark/50">Scroll to pour</span>
          <div className="w-px h-16 bg-gradient-to-b from-heppu-dark/50 to-transparent"></div>
        </MotionDiv>
      </div>
    </div>
  );
};

export default Hero;