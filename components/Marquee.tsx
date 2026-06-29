'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function MarqueeRow() {
  return (
    <div className="flex items-center gap-16 md:gap-24 px-8 md:px-12">
      {/* Render the image strips multiple times for a seamless loop */}
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center gap-16 md:gap-24 flex-shrink-0">
          <img src="/logos1.png" alt="Client logos group 1" className="h-16 md:h-20 w-auto object-contain pointer-events-none opacity-50 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100" />
          <img src="/logos2.png" alt="Client logos group 2" className="h-16 md:h-20 w-auto object-contain pointer-events-none opacity-50 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100" />
          <img src="/logos3.png" alt="Client logos group 3" className="h-16 md:h-20 w-auto object-contain pointer-events-none opacity-50 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100" />
          <img src="/logos4.png" alt="Client logos group 4" className="h-16 md:h-20 w-auto object-contain pointer-events-none opacity-50 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100" />
        </div>
      ))}
    </div>
  );
}

export default function Marquee() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <section id="clients" className="py-16 border-y border-white/5 bg-[#050505] overflow-hidden">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-10 text-center"
        >
          <h2 className="text-xl md:text-2xl font-display font-medium tracking-wide text-gray-400 uppercase">
            Trusted by Global Innovators
          </h2>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full max-w-full overflow-hidden flex">
        {/* Overlay Gradients for smooth fade in/out */}
        <div className="absolute top-0 left-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>
        
        {/* Row 1 — scrolls left */}
        <div className="flex animate-marquee min-w-full">
          <MarqueeRow />
        </div>
      </div>
    </section>
  );
}
