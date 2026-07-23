'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { events } from '@/data/events';
import { CalendarDays, MapPin, ArrowRight, Search, Filter } from 'lucide-react';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(events.map(e => e.category || 'Other')))];

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            event.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === 'All' || event.category === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-24 relative overflow-hidden">

      {/* Background Orbs removed in favor of GlobalBackground */}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-widest text-brand-700 dark:text-brand-400 uppercase font-medium">
            Select an Event
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-slate-900 dark:text-white mt-4 mb-4">
            Global Summits
          </h1>
          <p className="text-lg text-slate-800 dark:text-gray-400 max-w-2xl mx-auto">
            Find the right summit to propel your business forward. Connect with leaders, discover new solutions, and build lasting partnerships.
          </p>
        </motion.div>

        {/* Search & Filter */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="relative w-full md:max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-gray-500 group-focus-within:text-brand-500 transition-colors" />
            <input
              type="text"
              placeholder="Search by event name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all shadow-inner"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide hide-scroll-bar">
            <Filter className="w-4 h-4 text-slate-500 dark:text-gray-500 shrink-0 mr-1 hidden md:block" />
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  activeFilter === category 
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20' 
                  : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <motion.div 
                  key={event.id} 
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.95 }}
                  layout
                >
                  <Link href={`/events/${event.id}`} className="block h-full outline-none">
                    <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 hover:border-brand-500/50 rounded-3xl overflow-hidden group h-full flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(167,139,250,0.2)] transition-all duration-500 hover:-translate-y-2">
                      <div className="relative h-48 w-full overflow-hidden">
                        <div className="absolute inset-0 bg-brand-500/20 group-hover:bg-transparent transition-colors z-10 mix-blend-overlay" />
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-3">
                          <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
                            {event.title}
                          </h2>
                        </div>
                        
                        <div className="space-y-2 mb-6">
                          <div className="flex items-center gap-2 text-sm text-slate-800 dark:text-gray-400">
                            <MapPin className="w-4 h-4 text-brand-500/80" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-800 dark:text-gray-400">
                            <CalendarDays className="w-4 h-4 text-brand-500/80" />
                            <span>{event.dates}</span>
                          </div>
                        </div>

                        <div className="mt-auto pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                          <span className="text-sm font-semibold text-brand-700 dark:text-brand-400">View Details</span>
                          <ArrowRight className="w-5 h-5 text-brand-700 dark:text-brand-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="col-span-full py-20 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-white/5 mb-4">
                  <Search className="w-8 h-8 text-slate-400 dark:text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No events found</h3>
                <p className="text-slate-600 dark:text-gray-400">Try adjusting your search query or removing filters.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setActiveFilter('All'); }}
                  className="mt-6 px-6 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
