'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function MarqueeRow() {
  return (
    <div className="flex">
      {/* Render the image strips multiple times for a seamless loop */}
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex flex-shrink-0">
          <img src="/logos1.png" alt="Logos 1" className="h-24 md:h-32 w-auto object-contain pointer-events-none" />
          <img src="/logos2.png" alt="Logos 2" className="h-24 md:h-32 w-auto object-contain pointer-events-none" />
          <img src="/logos3.png" alt="Logos 3" className="h-24 md:h-32 w-auto object-contain pointer-events-none" />
          <img src="/logos4.png" alt="Logos 4" className="h-24 md:h-32 w-auto object-contain pointer-events-none" />
        </div>
      ))}
    </div>
  );
}

export default function Marquee() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <>
      {/* View Events Bar */}
      <div className="w-full bg-slate-500 py-3 text-center cursor-pointer hover:bg-slate-600 transition-colors">
        <span className="text-white text-sm font-medium">View Events</span>
      </div>

      <section id="clients" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1eb386] overflow-hidden">
        <div ref={sectionRef} className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white">
            Industries We Serve
          </h2>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full max-w-[100vw] left-[50%] right-[50%] -ml-[50vw] -mr-[50vw]">
        {/* Left gradient mask */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-r from-[#1eb386] to-transparent pointer-events-none" />
        {/* Right gradient mask */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-l from-[#1eb386] to-transparent pointer-events-none" />

        {/* Row 1 — scrolls left */}
        <div className="flex animate-marquee">
          <MarqueeRow />
        </div>
      </div>
    </section>
    </>
  );
}
