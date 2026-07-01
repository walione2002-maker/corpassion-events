'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Lightbulb, Network, Wrench, ShieldCheck, type LucideIcon } from 'lucide-react';
import { whyAttendPillars } from '@/data/events';

const iconMap: Record<string, LucideIcon> = {
  Lightbulb,
  Network,
  Wrench,
  ShieldCheck,
};

export default function WhyAttend() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-gradient-to-b from-white via-slate-50 to-white dark:from-[#0a0a0a] dark:via-[#0d0d14] dark:to-[#0a0a0a] overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 h-[480px] w-[720px] rounded-full bg-brand-600/10 blur-[128px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* ── Header ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-700 dark:text-brand-400">
            The Value
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Why Attend
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-800 dark:text-gray-400">
            Four reasons this summit will transform your approach to AI
            leadership.
          </p>
        </motion.div>

        {/* ── 2×2 Grid ───────────────────────────────────────── */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {whyAttendPillars.map((pillar, index) => {
            const Icon = iconMap[pillar.icon] ?? Lightbulb;

            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.15 * index,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/30"
              >
                {/* Subtle hover glow */}
                <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-500/10 via-transparent to-transparent" />
                </div>

                <div className="relative">
                  {/* Icon */}
                  <div className="mb-5 w-fit rounded-xl bg-brand-600/20 p-3">
                    <Icon className="h-6 w-6 text-brand-700 dark:text-brand-400" strokeWidth={1.8} />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 leading-relaxed text-slate-800 dark:text-gray-400">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
