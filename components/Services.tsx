'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { services } from '@/data/events';
import * as LucideIcons from 'lucide-react';

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative overflow-hidden" id="services">
      <div className="max-w-7xl mx-auto text-center mb-16 relative z-10">
        <span className="text-sm tracking-widest text-brand-400 uppercase font-medium">What We Do</span>
        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white mt-3">
          Our Services
        </h2>
      </div>

      <div ref={containerRef} className="max-w-6xl mx-auto relative z-10 flex flex-wrap justify-center gap-8">
        {services.map((service, index) => {
          const IconComponent = (LucideIcons as any)[service.icon] || LucideIcons.Star;
          const isHovered = hoveredIndex === index;
          const isAdjacent = hoveredIndex !== null && (hoveredIndex === index - 1 || hoveredIndex === index + 1);

          return (
            <motion.div
              key={service.title}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              animate={{ 
                scale: isHovered ? 1.05 : isAdjacent ? 0.95 : 1,
                y: [0, -10 + (index % 2) * 5, 0],
                zIndex: isHovered ? 50 : 0
              }}
              transition={{
                y: { duration: 4 + (index % 3), repeat: Infinity, ease: "easeInOut" },
                scale: { type: "spring", stiffness: 300, damping: 20 },
                opacity: { duration: 0.5, delay: index * 0.1 }
              }}
              className={`w-full sm:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)] flex ${index % 2 === 1 ? 'lg:mt-12' : ''}`}
            >
              <div 
                className={`relative w-full h-full p-8 rounded-3xl backdrop-blur-xl border border-white/10 transition-all duration-300 flex flex-col items-center text-center glass-card shadow-[0_20px_50px_rgba(0,0,0,0.1)] ${
                  isHovered ? 'bg-white/10 border-white/30 shadow-[0_30px_60px_rgba(0,0,0,0.2)]' : 'bg-white/5'
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-500/20 to-indigo-500/20 flex items-center justify-center mb-6">
                  <IconComponent className="w-8 h-8 text-brand-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
