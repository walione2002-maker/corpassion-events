'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { events } from '@/data/events';
import EventCard from './EventCard';

export default function EventCatalog() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const flagshipEvent = events[0];
  const remainingEvents = events.slice(1);

  return (
    <section
      id="events"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-brand-600/8 blur-[120px]" />
        <div className="absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-brand-500/6 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* ── Section Header ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-400">
            Upcoming
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Explore Our Events
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-400">
            From flagship summits to specialized forums, discover the events
            shaping the future of AI leadership across the globe.
          </p>
        </motion.div>

        {/* ── Flagship (Full-width Featured Card) ────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-16"
        >
          <EventCard event={flagshipEvent} featured />
        </motion.div>

        {/* ── Remaining Events (2-col grid) ───────────────────── */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {remainingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.35 + 0.15 * index,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
