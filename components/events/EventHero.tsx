'use client';

import { motion } from 'framer-motion';
import { IEvent } from '@/data/events';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import AddToCalendarButton from './AddToCalendarButton';
import ShareButton from './ShareButton';
import CountdownTimer from '@/components/CountdownTimer';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function EventHero({ event }: { event: IEvent }) {
  return (
    <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      <div className="relative rounded-3xl overflow-hidden min-h-[85vh] flex flex-col justify-end shadow-2xl">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${event.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-transparent" />

        {/* Top Breadcrumbs */}
        <div className="absolute top-8 left-8 right-8 z-20 flex items-center justify-between">
          <nav className="flex items-center text-sm font-medium text-white/70">
            <Link href="/events" className="hover:text-white transition-colors">
              Events
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-white truncate max-w-[200px] sm:max-w-none">{event.title}</span>
          </nav>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full p-8 sm:p-12 lg:p-16 max-w-5xl">
          {/* Badges */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            {event.category && (
              <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-brand-500 text-white shadow-sm backdrop-blur-md">
                {event.category}
              </span>
            )}
            <span className={`px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-md border shadow-sm ${
              event.registrationOpen 
                ? 'bg-green-500/20 text-green-300 border-green-500/30' 
                : 'bg-white/10 text-white border-white/20'
            }`}>
              {event.registrationOpen ? 'Registration Open' : 'Upcoming'}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={0.1}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-white mb-6 leading-[1.1]"
          >
            {event.title}
          </motion.h1>

          {/* Subtitle & Info */}
          <motion.div
            custom={0.2}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-lg text-gray-300 mb-10"
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">{event.dates}</span>
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-brand-500" />
            <div className="flex items-center gap-2">
              <span>{event.location}</span>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            custom={0.3}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <a 
              href="#pricing"
              className="flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold bg-brand-600 hover:bg-brand-500 text-white transition-colors w-full sm:w-auto shadow-lg shadow-brand-500/25"
            >
              Get tickets
            </a>
            <a 
              href="#sponsorship"
              className="flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold bg-white/10 hover:bg-white/20 text-white backdrop-blur border border-white/10 transition-colors w-full sm:w-auto"
            >
              Exhibit or sponsor
            </a>
            <AddToCalendarButton event={event} />
            <ShareButton />
          </motion.div>

          {/* Countdown */}
          {event.startDate && (
            <motion.div
              custom={0.4}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="inline-block"
            >
              <CountdownTimer targetDate={event.startDate} label="Event begins in" />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
