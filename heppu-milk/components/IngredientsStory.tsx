import React from 'react';
import { motion } from 'framer-motion';

const FeatureBlock: React.FC<{ title: string; desc: string; align: 'left' | 'right'; delay: number }> = ({ title, desc, align, delay }) => {
  const MotionDiv = motion.div as any;
  return (
    <MotionDiv
      initial={{ opacity: 0, x: align === 'left' ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.8, delay }}
      className={`flex flex-col ${align === 'left' ? 'md:items-start text-left' : 'md:items-end text-right'} mb-32 relative z-10`}
    >
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg transition-transform hover:-translate-y-2 duration-300">
        <h3 className="text-4xl font-display font-bold text-[#b13e0d] mb-4">{title}</h3>
        <p className="text-lg text-[#b13e0d] leading-relaxed font-medium">{desc}</p>
      </div>
    </MotionDiv>
  );
};

const IngredientsStory: React.FC = () => {
  const MotionDiv = motion.div as any;
  return (
    <div className="relative py-32 px-4 max-w-7xl mx-auto overflow-hidden">
      {/* Decorative center line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-heppu-clay/20 -translate-x-1/2 hidden md:block" />

      <FeatureBlock
        title="100% Grass Fed"
        desc="Our cows roam freely on lush, pesticide-free pastures 365 days a year. Happy cows make better milk."
        align="left"
        delay={0}
      />

      <FeatureBlock
        title="Clay Pot Fermented"
        desc="We stick to roots. Our curd is set in traditional earthen pots, enhancing the flavor and probiotic count naturally."
        align="right"
        delay={0.2}
      />

      <FeatureBlock
        title="Zero Processing"
        desc="Straight from the farm to the bottle. No homogenization, no artificial vitamins. Just pure milk."
        align="left"
        delay={0.2}
      />

      {/* Floating particles background */}
      <div className="absolute inset-0 pointer-events-none">
        <MotionDiv
          animate={{ y: [0, -100], opacity: [0, 0.5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/4 w-4 h-4 rounded-full bg-heppu-accent"
        />
        <MotionDiv
          animate={{ y: [0, -150], opacity: [0, 0.3, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute top-3/4 right-1/4 w-6 h-6 rounded-full bg-heppu-brand"
        />
      </div>
    </div>
  );
};

export default IngredientsStory;