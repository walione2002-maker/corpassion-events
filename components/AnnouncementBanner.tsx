'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowUpRight, X } from 'lucide-react';
import { events } from '@/data/events';
import { AnimatePresence, motion } from 'framer-motion';

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('announcement-dismissed');
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  // Find all upcoming events, sorted by date
  const now = new Date();
  const upcomingEvents = events
    .filter(e => e.registrationOpen && e.startDate && new Date(e.startDate) > now)
    .sort((a, b) => new Date(a.startDate!).getTime() - new Date(b.startDate!).getTime());

  const displayEvents = upcomingEvents.length > 0 ? upcomingEvents : events.filter(e => e.registrationOpen);

  // Auto-rotate through events
  useEffect(() => {
    if (displayEvents.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % displayEvents.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [displayEvents.length, isPaused]);

  const handleClose = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(false);
    sessionStorage.setItem('announcement-dismissed', 'true');
  }, []);

  if (!isVisible || displayEvents.length === 0) return null;

  const currentEvent = displayEvents[activeIndex];

  // Truncate title for banner
  const shortTitle = currentEvent.title
    .replace('AI FOR NON-TECHNICAL LEADERS SUMMIT & SOLUTIONS SHOWCASE', 'Dubai AI Summit')
    .replace('Enterprise AI & Workforce Transformation Summit Europe', 'Amsterdam Enterprise AI');

  return (
    <div
      className="relative z-[110] overflow-hidden border-b border-white/[0.06] bg-[#0a0a14]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Animated gradient shimmer along bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-400/60 to-transparent animate-shimmer" />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentEvent.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          <Link
            href={`/events/${currentEvent.id}`}
            className="mx-auto flex h-10 max-w-7xl items-center justify-center gap-2 px-4 text-xs font-medium text-slate-300 transition-colors hover:text-white sm:px-6 lg:px-8 group"
          >
            {/* Live Pulse Dot + Label */}
            <span className="hidden shrink-0 items-center gap-2 sm:inline-flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-400" />
              </span>
              <span className="font-semibold uppercase tracking-[0.14em] text-brand-300">
                Next Summit
              </span>
            </span>

            <span className="hidden h-3 w-px bg-white/15 sm:block shrink-0" aria-hidden="true" />

            <span className="truncate">
              {shortTitle} &middot; {currentEvent.location} &middot; {currentEvent.dates}
            </span>

            <span className="inline-flex shrink-0 items-center gap-1 font-semibold text-brand-300 group-hover:text-brand-200">
              Register
              <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>

            {/* Event dots indicator (when multiple) */}
            {displayEvents.length > 1 && (
              <span className="hidden sm:inline-flex items-center gap-1 ml-2" aria-hidden="true">
                {displayEvents.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === activeIndex ? 'w-3 bg-brand-400' : 'w-1 bg-white/20'
                    }`}
                  />
                ))}
              </span>
            )}
          </Link>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={handleClose}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-slate-500 hover:text-slate-300 transition-colors rounded-full hover:bg-white/10"
        aria-label="Dismiss announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
