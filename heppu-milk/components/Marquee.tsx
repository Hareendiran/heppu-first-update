import React from 'react';
import { motion } from 'framer-motion';

const Marquee: React.FC = () => {
  const marqueeVariants = {
    animate: {
      x: ["0%", "-50%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    },
  };

  const MotionDiv = motion.div as any;

  return (
    <div className="relative w-full py-12 bg-heppu-dark overflow-hidden transform -skew-y-2">
      <div className="flex whitespace-nowrap">
        <MotionDiv
          className="flex items-center gap-16 pr-16 text-6xl md:text-8xl font-display font-bold text-heppu-cream uppercase opacity-90 border-y-8 border-[#b13e0d] border-dashed py-4"
          variants={marqueeVariants}
          animate="animate"
        >
          <span>Organic</span>
          <span className="text-heppu-accent">•</span>
          <span>Farm Fresh</span>
          <span className="text-heppu-accent">•</span>
          <span>Traditional</span>
          <span className="text-heppu-accent">•</span>
          <span>No Preservatives</span>
          <span className="text-heppu-accent">•</span>
          <span>Clay Pot Cultured</span>
          <span className="text-heppu-accent">•</span>
          <span>Organic</span>
          <span className="text-heppu-accent">•</span>
          <span>Farm Fresh</span>
          <span className="text-heppu-accent">•</span>
          <span>Traditional</span>
          <span className="text-heppu-accent">•</span>
          <span>No Preservatives</span>
          <span className="text-heppu-accent">•</span>
          <span>Clay Pot Cultured</span>
          <span className="text-heppu-accent">•</span>
        </MotionDiv>
      </div>
    </div>
  );
};

export default Marquee;