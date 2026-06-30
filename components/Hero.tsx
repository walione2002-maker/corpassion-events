'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, MapPin, Users, Presentation } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import HeroBackground from '@/components/HeroBackground';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <HeroBackground image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&h=900&fit=crop" opacity="opacity-30" />

      {/* Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="text-left">
            {/* Badge */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="mb-6 flex flex-col items-start gap-2"
            >
              <span className="inline-flex border border-brand-400/30 bg-brand-400/10 text-brand-700 dark:text-brand-400 text-xs font-bold tracking-widest rounded-full px-4 py-1.5 uppercase">
                Corpassion Events
              </span>
              <span className="text-xs font-medium text-slate-600 dark:text-gray-400 pl-2 border-l-2 border-brand-400/50">
                Operated by The Excellent Group FZC, Dubai, UAE
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={0.15}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-5xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight mb-6 leading-[1.05] text-slate-900 dark:text-white"
            >
              Where leaders shape the <span className="text-brand-500 dark:text-brand-400">AI era.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              custom={0.3}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-lg md:text-xl text-slate-800 dark:text-gray-400 max-w-xl mb-10 leading-relaxed"
            >
              Connecting visionaries, executives, and decision-makers worldwide through immersive, unparalleled tech summits.
            </motion.p>

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
                  href={ROUTES.REGISTER}
                  className="group relative flex items-center justify-center gap-2 rounded-2xl px-8 py-4 font-semibold transition-all duration-300 bg-brand-400 text-slate-950 shadow-[0_0_20px_rgba(167,139,250,0.4)] hover:shadow-[0_0_40px_rgba(167,139,250,0.6)] active:scale-[0.98] w-full"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-300 to-brand-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 text-lg flex flex-col items-center leading-tight">
                    <span>Attend</span>
                    <span className="text-[10px] uppercase tracking-wider opacity-80 mt-0.5">Register as a Delegate</span>
                  </span>
                </Link>
              </motion.div>

              {/* Secondary Exhibit */}
              <motion.div whileHover={{ scale: 1.05, y: -4 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} className="w-full sm:w-auto z-10">
                <Link
                  href="/events/dubai-ai-summit-2026#sponsorship"
                  className="flex flex-col items-center justify-center gap-0.5 rounded-full px-7 py-3.5 font-semibold transition-all duration-300 bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-brand-400/50 hover:shadow-[0_0_20px_rgba(167,139,250,0.1)] active:scale-[0.98] w-full"
                >
                  <span className="text-base leading-tight">Exhibit</span>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400">Book Your Booth</span>
                </Link>
              </motion.div>

              {/* Secondary Sponsor */}
              <motion.div whileHover={{ scale: 1.05, y: -4, x: 2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} className="w-full sm:w-auto z-10">
                <Link
                  href="/events/dubai-ai-summit-2026#sponsorship"
                  className="flex flex-col items-center justify-center gap-0.5 rounded-full px-7 py-3.5 font-semibold transition-all duration-300 bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-brand-400/50 hover:shadow-[0_0_20px_rgba(167,139,250,0.1)] active:scale-[0.98] w-full"
                >
                  <span className="text-base leading-tight">Sponsor</span>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400">Promote Your Brand</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Floating Flagship Card */}
          <motion.div
            custom={0.6}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="relative lg:ml-auto w-full max-w-lg"
          >
            {/* Card Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-400 to-brand-600 rounded-2xl blur-xl opacity-20 animate-pulse"></div>
            
            {/* The Card */}
            <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <span className="bg-brand-400 text-slate-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Flagship Event
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 mt-4">Dubai AI Summit 2026</h3>
              <p className="text-slate-800 dark:text-gray-400 mb-8">AI FOR NON-TECHNICAL LEADERS SUMMIT & SOLUTIONS SHOWCASE</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-slate-800 dark:text-gray-300">
                  <Calendar className="w-5 h-5 mr-3 text-brand-500 dark:text-brand-400" />
                  <span>14–16 October 2026</span>
                </div>
                <div className="flex items-center text-slate-800 dark:text-gray-300">
                  <MapPin className="w-5 h-5 mr-3 text-brand-500 dark:text-brand-400" />
                  <span>Dubai, UAE</span>
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
                href="/events/dubai-ai-summit-2026"
                className="block w-full text-center py-3 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 transition-colors text-slate-900 dark:text-white font-medium text-sm mt-2"
              >
                View Full Agenda &rarr;
              </Link>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-black to-transparent pointer-events-none" />
    </section>
  );
}
