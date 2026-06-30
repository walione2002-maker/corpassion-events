'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { stats } from '@/data/events';

export default function StatsBar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  return (
    <section className="relative z-10 -mt-16 pb-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                className="bg-white/80 dark:bg-white/10 backdrop-blur-2xl border border-slate-200 dark:border-white/20 rounded-full py-4 px-8 flex flex-col items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] h-full"
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
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
