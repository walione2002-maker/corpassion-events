'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { stats } from '@/data/events';
import Image from 'next/image';

export default function StatsBar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  return (
    <section className="relative z-10 -mt-16 pb-8 overflow-hidden bg-transparent">
      <div className="absolute inset-0 z-[-1] opacity-[0.40] dark:opacity-[0.35] pointer-events-none mix-blend-luminosity">
        <Image 
          src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=3840&h=2160&q=100&fit=crop&auto=format&fit=crop" 
          alt="Workshop Background"
          fill
          className="object-cover"
        />
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={containerRef} className="flex flex-wrap justify-center gap-4 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: i * 0.1,
              }}
              className="flex-1 min-w-[140px] sm:min-w-[200px]"
            >
              <div
                className="bg-white/95 dark:bg-[#0a0a0a]/95 md:bg-white/80 md:dark:bg-white/10 md:backdrop-blur-xl border border-slate-200 dark:border-white/20 rounded-full py-4 px-8 flex flex-col items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] h-full transition-transform hover:-translate-y-2 duration-300"
              >
                <span className="text-3xl sm:text-4xl font-display font-bold text-brand-700 dark:text-brand-400 flex items-center overflow-hidden">
                  <motion.span
                    initial={{ y: 40, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : {}}
                    transition={{
                      type: "spring",
                      stiffness: 120,
                      damping: 10,
                      delay: 0.3 + i * 0.1,
                    }}
                  >
                    {stat.value}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.1 }}
                  >
                    {stat.suffix}
                  </motion.span>
                </span>
                <span className="text-[11px] sm:text-sm text-slate-600 dark:text-gray-300 font-bold uppercase tracking-widest mt-1.5">{stat.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
