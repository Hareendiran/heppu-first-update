import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import HorizontalProducts from './components/HorizontalProducts';
import IngredientsStory from './components/IngredientsStory';
import Footer from './components/Footer';
import MilkPotScroll from './components/MilkPotScroll';
import { useScroll, useSpring, motion } from 'framer-motion';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Smooth scroll fix/optimization for modern browsers
  useEffect(() => {
    document.body.style.overflowX = 'hidden';
  }, []);

  const MotionDiv = motion.div as any;
  const MotionH2 = motion.h2 as any;
  const MotionP = motion.p as any;
  const MotionButton = motion.button as any;

  return (
    <div className="relative w-full min-h-screen bg-black text-heppu-dark font-sans">
      {/* Global Scroll Progress Bar */}
      <MotionDiv
        className="fixed top-0 left-0 right-0 h-2 bg-[#b13e0d] origin-left z-50"
        style={{ scaleX }}
      />

      <Navbar />

      <main>
        <Hero />
        <MilkPotScroll />
        <Marquee />
        <IngredientsStory />
        <HorizontalProducts />

        {/* Call to Action Section */}
        <section className="relative py-32 px-4 bg-black text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <MotionH2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-display font-bold mb-8"
            >
              Taste the Tradition
            </MotionH2>
            <MotionP
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl md:text-2xl mb-12 opacity-80"
            >
              From the clay pot to your glass. Experience HEPPU today.
            </MotionP>
            <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-black text-xl font-bold rounded-full hover:bg-gray-200 transition-colors shadow-lg shadow-white/10"
            >
              Find a Store Near You
            </MotionButton>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;