'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { events } from '@/data/events';
import EventCard from './EventCard';

export default function EventCatalog() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="events"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-transparent overflow-hidden"
    >
      {/* Faded Background Image specific to Event Catalog */}
      <div className="absolute inset-0 z-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none mix-blend-luminosity">
        <Image 
          src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=2000&auto=format&fit=crop" 
          alt="Audience Background"
          fill
          className="object-cover"
        />
      </div>

      {/* Ambient background glow removed in favor of GlobalBackground */}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <h2 className="font-display text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl lg:text-6xl tracking-tight mb-6">
            Find the right <span className="text-brand-700 dark:text-brand-400">room to be in.</span>
          </h2>
          <p className="text-lg leading-relaxed text-slate-800 dark:text-gray-400">
            From Registration Open summits to specialized forums, discover the events
            shaping the future of AI leadership across the globe.
          </p>
        </motion.div>

        {/* ── Events Grid (1-col mobile, 2-col tablet, 3-col desktop) ───────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + 0.15 * index,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-full"
            >
              <EventCard event={event} priority={index === 0} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
