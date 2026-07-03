'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';
import { events } from '@/data/events';

export default function FeaturedEventCarousel() {
  const openEvents = events.filter(e => e.registrationOpen === true);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextEvent = () => {
    setCurrentIndex((prev) => (prev + 1) % openEvents.length);
  };

  useEffect(() => {
    if (openEvents.length <= 1) return;

    if (!isPaused) {
      timerRef.current = setInterval(() => {
        nextEvent();
      }, 5000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentIndex, isPaused, openEvents.length]);

  const handleNextClick = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    nextEvent();
  };

  if (openEvents.length === 0) {
    return null; // Gracefully hide if no open events
  }

  const currentEvent = openEvents[currentIndex];

  return (
    <div 
      className="relative w-full max-w-lg"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-live="polite"
    >
      {/* Card Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-brand-400 to-brand-600 rounded-2xl blur-xl opacity-20 animate-pulse" />
      
      {/* Arrow Button for Multiple Events */}
      {openEvents.length > 1 && (
        <button
          onClick={handleNextClick}
          aria-label="Next event"
          className="absolute right-2 md:right-[-20px] top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.1)] text-brand-600 dark:text-brand-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* The Card */}
      <div className="relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl border border-slate-200/50 dark:border-white/10 rounded-3xl p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden transition-transform duration-500 hover:-translate-y-2">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentEvent.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute top-0 right-0 p-4">
              <span className="bg-brand-400 text-slate-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Registration Open
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 mt-4 leading-tight">
              {currentEvent.title}
            </h3>
            <p className="text-slate-800 dark:text-gray-400 mb-8 line-clamp-2">
              {currentEvent.taglines[0]}
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center text-slate-800 dark:text-gray-300">
                <Calendar className="w-5 h-5 mr-3 text-brand-500 dark:text-brand-400 shrink-0" />
                <span>{currentEvent.dates}</span>
              </div>
              <div className="flex items-center text-slate-800 dark:text-gray-300">
                <MapPin className="w-5 h-5 mr-3 text-brand-500 dark:text-brand-400 shrink-0" />
                <span>{currentEvent.location}</span>
              </div>
            </div>

            {/* Stats Grid inside Card */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-slate-200 dark:border-white/10">
              <div className="text-center">
                <div className="text-xl font-bold text-slate-900 dark:text-white">3</div>
                <div className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase mt-1">Days</div>
              </div>
              <div className="text-center border-x border-slate-200 dark:border-white/10">
                <div className="text-xl font-bold text-slate-900 dark:text-white">40+</div>
                <div className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase mt-1">Talks</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-slate-900 dark:text-white">2K</div>
                <div className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase mt-1">Attendees</div>
              </div>
            </div>

            <Link
              href={`/events/${currentEvent.id}`}
              className="block w-full text-center py-3 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 transition-colors text-slate-900 dark:text-white font-medium text-sm mt-2"
            >
              View Full Agenda &rarr;
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
