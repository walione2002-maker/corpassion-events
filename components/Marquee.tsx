'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function MarqueeRow() {
  return (
    <div className="flex">
      {/* Render the image strips multiple times for a seamless loop */}
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex flex-shrink-0">
          <img src="/logos1.png" alt="Client logos group 1" className="h-24 md:h-32 w-auto object-contain pointer-events-none" />
          <img src="/logos2.png" alt="Client logos group 2" className="h-24 md:h-32 w-auto object-contain pointer-events-none" />
          <img src="/logos3.png" alt="Client logos group 3" className="h-24 md:h-32 w-auto object-contain pointer-events-none" />
          <img src="/logos4.png" alt="Client logos group 4" className="h-24 md:h-32 w-auto object-contain pointer-events-none" />
        </div>
      ))}
    </div>
  );
}

export default function Marquee() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
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
        {/* Row 1 — scrolls left */}
        <div className="flex animate-marquee">
          <MarqueeRow />
        </div>
      </div>
    </section>
  );
}
