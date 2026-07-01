'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function MarqueeRow() {
  return (
    <div className="flex items-center gap-12">
      {/* Render the image strips multiple times for a seamless loop */}
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex flex-shrink-0 gap-12">
          <img src="/logos1.png" alt="Client logos group 1" className="h-32 md:h-48 w-auto object-contain md:transition-transform md:duration-500 md:hover:-translate-y-2 md:hover:scale-105" />
          <img src="/logos2.png" alt="Client logos group 2" className="h-32 md:h-48 w-auto object-contain md:transition-transform md:duration-500 md:hover:-translate-y-2 md:hover:scale-105" />
          <img src="/logos3.png" alt="Client logos group 3" className="h-32 md:h-48 w-auto object-contain md:transition-transform md:duration-500 md:hover:-translate-y-2 md:hover:scale-105" />
          <img src="/logos4.png" alt="Client logos group 4" className="h-32 md:h-48 w-auto object-contain md:transition-transform md:duration-500 md:hover:-translate-y-2 md:hover:scale-105" />
        </div>
      ))}
    </div>
  );
}

export default function Marquee() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <section id="clients" className="py-24 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden">
      <div ref={sectionRef} className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-widest text-brand-400 uppercase font-medium">
            Our Network
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-slate-900 dark:text-white mt-3">
            Brands We Serve
          </h2>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full max-w-[100vw] left-[50%] right-[50%] -ml-[50vw] -mr-[50vw]">
        {/* Row 1 — scrolls left */}
        <div className="flex animate-marquee py-8">
          <MarqueeRow />
        </div>
      </div>
    </section>
  );
}
