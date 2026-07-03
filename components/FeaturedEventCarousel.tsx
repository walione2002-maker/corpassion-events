'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';
import { IEvent } from '@/data/events';

interface Props {
  currentEvent: IEvent;
  openEventsCount: number;
  onNextClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function FeaturedEventCarousel({
  currentEvent,
  openEventsCount,
  onNextClick,
  onMouseEnter,
  onMouseLeave
}: Props) {
  if (!currentEvent) {
    return null;
  }

  return (
    <div 
      className="relative w-full max-w-lg mx-auto lg:ml-auto"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-live="polite"
    >
      {/* Card Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-brand-400 to-brand-600 rounded-2xl blur-xl opacity-20 animate-pulse" />
      
      {/* Arrow Button for Multiple Events */}
      {openEventsCount > 1 && (
        <button
          onClick={onNextClick}
          aria-label="Next event"
          className="absolute right-2 md:right-[-20px] top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.1)] text-brand-600 dark:text-brand-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* The Card */}
      <div className="relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl border border-slate-200/50 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden transition-transform duration-500 hover:-translate-y-2">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentEvent.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Status Badge */}
            <div className="mb-4">
              <span className="inline-flex bg-brand-500/20 text-brand-700 dark:text-brand-400 text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full border border-brand-500/30">
                Registration Open
              </span>
            </div>

            {/* Event Title */}
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white mb-2 leading-tight">
              {currentEvent.title}
            </h3>
            
            <p className="text-sm text-slate-600 dark:text-gray-400 mb-6 line-clamp-2">
              {currentEvent.taglines[0]}
            </p>

            {/* Meta Data */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-slate-700 dark:text-gray-300">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 shrink-0">
                  <Calendar className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                </div>
                <span className="text-sm font-medium">{currentEvent.dates}</span>
              </div>
              
              <div className="flex items-center gap-3 text-slate-700 dark:text-gray-300">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 shrink-0">
                  <MapPin className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                </div>
                <span className="text-sm font-medium">{currentEvent.location}</span>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4 border-t border-slate-200 dark:border-white/10 pt-6 mb-8">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">3</div>
                <div className="text-[10px] text-slate-500 dark:text-gray-500 uppercase tracking-widest mt-1">Days</div>
              </div>
              <div className="text-center border-l border-slate-200 dark:border-white/10">
                <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">40+</div>
                <div className="text-[10px] text-slate-500 dark:text-gray-500 uppercase tracking-widest mt-1">Talks</div>
              </div>
              <div className="text-center border-l border-slate-200 dark:border-white/10">
                <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">2K</div>
                <div className="text-[10px] text-slate-500 dark:text-gray-500 uppercase tracking-widest mt-1">Attendees</div>
              </div>
            </div>

            {/* View Event Link */}
            <Link
              href={`/events/${currentEvent.id}`}
              className="group/link flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-semibold transition-all hover:bg-slate-200 dark:hover:bg-white/10 hover:border-brand-500/30"
            >
              <span>View Full Agenda</span>
              <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
