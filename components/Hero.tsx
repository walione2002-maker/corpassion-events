'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Calendar, MapPin, Users, Presentation } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import Image from 'next/image';
import FeaturedEventCarousel from './FeaturedEventCarousel';
import { events } from '@/data/events';
import CountdownTimer from './CountdownTimer';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function Hero() {
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

  const currentEvent = openEvents.length > 0 ? openEvents[currentIndex] : null;

  return (
    <section
      id="home"
      className="relative min-h-screen flex lg:items-center justify-center overflow-hidden pt-32 pb-24 lg:pt-20 lg:pb-0 bg-transparent"
    >
      {/* Faded Background Image specific to Hero */}
      <div className="absolute inset-0 z-0 opacity-[0.40] dark:opacity-[0.35] pointer-events-none mix-blend-luminosity">
        <Image 
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=3840&h=2160&q=100&fit=crop&auto=format&fit=crop" 
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 lg:items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentEvent?.id || 'default'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Badge */}
                <div className="mb-6 flex flex-col items-start gap-2">
                  <span className="inline-flex border border-brand-400/30 bg-brand-400/10 text-brand-700 dark:text-brand-400 text-xs font-bold tracking-widest rounded-full px-4 py-1.5 uppercase">
                    {currentEvent ? currentEvent.title : 'Corpassion Events'}
                  </span>
                  <span className="text-xs font-medium text-slate-600 dark:text-gray-400 pl-2 border-l-2 border-brand-400/50">
                    Operated by The Excellent Group FZC, Dubai, UAE
                  </span>
                </div>

                {/* Headline */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight mb-6 leading-[1.05] text-slate-900 dark:text-white">
                  Where leaders learn, connect & <span className="text-brand-500 dark:text-brand-400">innovate.</span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-slate-800 dark:text-gray-400 max-w-xl mb-10 leading-relaxed">
                  {currentEvent && currentEvent.taglines.length > 0 
                    ? currentEvent.taglines[0]
                    : 'Empowering professionals. Inspiring industries. Where knowledge meets opportunity.'}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* CTAs */}
            <motion.div
              custom={0.45}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full"
            >
              {/* Primary Attend */}
              <motion.div whileHover={{ scale: 1.05, y: -4, x: -2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} className="w-full sm:w-auto z-20">
                <Link
                  href={currentEvent ? `/checkout/ticket/${currentEvent.id}` : ROUTES.REGISTER}
                  className="group relative flex items-center justify-center gap-2 rounded-2xl px-8 py-4 font-semibold transition-all duration-300 bg-brand-400 text-slate-950 shadow-[0_0_20px_rgba(167,139,250,0.4)] hover:shadow-[0_0_40px_rgba(167,139,250,0.6)] active:scale-[0.98] w-full"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-300 to-brand-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 text-lg flex flex-col items-center leading-tight">
                    <span>Attend</span>
                    <span className="text-xs whitespace-nowrap uppercase tracking-wider opacity-80 mt-0.5">Register as a Delegate</span>
                  </span>
                </Link>
              </motion.div>

              {/* Secondary Exhibit */}
              <motion.div whileHover={{ scale: 1.05, y: -4 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} className="w-full sm:w-auto z-10">
                <Link
                  href={currentEvent ? `/events/${currentEvent.id}#sponsorship` : '/events/dubai-ai-summit-2026#sponsorship'}
                  className="flex flex-col items-center justify-center gap-0.5 rounded-full px-7 py-3.5 font-semibold transition-all duration-300 bg-white dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 hover:border-brand-500/50 dark:hover:border-brand-400/50 hover:shadow-[0_0_20px_rgba(167,139,250,0.15)] shadow-sm dark:shadow-none active:scale-[0.98] w-full"
                >
                  <span className="text-base leading-tight">Exhibit</span>
                  <span className="text-xs whitespace-nowrap uppercase tracking-wider text-slate-500 dark:text-gray-400 mt-0.5">Book Your Booth</span>
                </Link>
              </motion.div>

              {/* Secondary Sponsor */}
              <motion.div whileHover={{ scale: 1.05, y: -4, x: 2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} className="w-full sm:w-auto z-10">
                <Link
                  href={currentEvent ? `/events/${currentEvent.id}#sponsorship` : '/events/dubai-ai-summit-2026#sponsorship'}
                  className="flex flex-col items-center justify-center gap-0.5 rounded-full px-7 py-3.5 font-semibold transition-all duration-300 bg-white dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 hover:border-brand-500/50 dark:hover:border-brand-400/50 hover:shadow-[0_0_20px_rgba(167,139,250,0.15)] shadow-sm dark:shadow-none active:scale-[0.98] w-full"
                >
                  <span className="text-base leading-tight">Sponsor</span>
                  <span className="text-xs whitespace-nowrap uppercase tracking-wider text-slate-500 dark:text-gray-400 mt-0.5">Promote Your Brand</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Countdown Timer */}
            {currentEvent?.startDate && (
              <motion.div
                custom={0.5}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="mt-12 lg:mt-16 flex justify-start w-full"
              >
                <CountdownTimer 
                  targetDate={currentEvent.startDate} 
                  label={`${currentEvent.title.replace('AI FOR NON-TECHNICAL LEADERS SUMMIT & SOLUTIONS SHOWCASE', 'Dubai AI Summit').replace('Enterprise AI & Workforce Transformation Summit Europe', 'Amsterdam Enterprise AI')} begins in`} 
                />
              </motion.div>
            )}
          </div>

          {/* Right Column: Floating Flagship Card */}
          <motion.div
            custom={0.6}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="relative lg:ml-auto w-full max-w-lg"
          >
            {currentEvent && (
              <FeaturedEventCarousel 
                currentEvent={currentEvent} 
                openEventsCount={openEvents.length}
                onNextClick={handleNextClick}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              />
            )}
          </motion.div>

        </div>
      </div>

    </section>
  );
}
