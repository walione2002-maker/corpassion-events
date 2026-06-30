'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { events } from '@/data/events';
import { CalendarDays, MapPin, ArrowRight } from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function EventsSelectionPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#050505] pt-32 pb-24 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-700/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-widest text-brand-400 uppercase font-medium">
            Select an Event
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-slate-900 dark:text-white mt-4 mb-4">
            Global Summits
          </h1>
          <p className="text-lg text-slate-500 dark:text-gray-400 max-w-2xl mx-auto">
            Choose from our upcoming flagship events and regional showcases. Secure your pass to the future of AI leadership.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {events.map((event) => (
            <motion.div key={event.id} variants={itemVariants}>
              <Link href={`/events/${event.id}`} className="block h-full outline-none">
                <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 hover:border-brand-500/50 rounded-3xl overflow-hidden group h-full flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(34,211,238,0.2)] transition-all duration-500 hover:-translate-y-2">
                  <div className="relative h-48 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-brand-500/20 group-hover:bg-transparent transition-colors z-10 mix-blend-overlay" />
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand-300 transition-colors">
                      {event.title}
                    </h2>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-gray-400">
                        <MapPin className="w-4 h-4 text-brand-500/80" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-gray-400">
                        <CalendarDays className="w-4 h-4 text-brand-500/80" />
                        <span>{event.dates}</span>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                      <span className="text-sm font-semibold text-brand-400">View Details</span>
                      <ArrowRight className="w-5 h-5 text-brand-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
