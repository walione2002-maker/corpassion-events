'use client';

import { motion } from 'framer-motion';
import { TrainingEvent } from '@/data/training';
import { MapPin, ArrowRight, Layout, CalendarOff, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { FilterState } from './FilterBar';

interface EventListProps {
  events: TrainingEvent[];
  setFilters: Dispatch<SetStateAction<FilterState>>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function EventList({ events, setFilters }: EventListProps) {
  
  if (events.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto py-32 px-4 flex flex-col items-center justify-center text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="w-24 h-24 bg-zinc-900/50 rounded-full flex items-center justify-center mb-6 border border-zinc-800">
            <CalendarOff className="w-10 h-10 text-zinc-500" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">No Events Found</h3>
          <p className="text-zinc-400 max-w-md mb-8 leading-relaxed">
            We couldn't find any training events matching your current filters. Try adjusting your search criteria.
          </p>
          <button 
            onClick={() => setFilters({ month: '', search: '', venue: '', format: '' })}
            className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-brand-500/20 active:scale-95"
          >
            Clear All Filters
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-16 px-4">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="flex flex-col gap-5"
      >
        {events.map(event => {
          const isCompleted = event.status === 'Completed';
          
          // Parse Dates safely
          let startDay = '00', endDay = '00', monthStr = 'XXX', year = 2026;
          try {
            const start = new Date(event.startDate);
            const end = new Date(event.endDate);
            startDay = start.getDate().toString().padStart(2, '0');
            endDay = end.getDate().toString().padStart(2, '0');
            monthStr = start.toLocaleString('default', { month: 'short' }).toUpperCase();
            year = start.getFullYear();
          } catch (e) {
            console.error("Invalid date parsing", e);
          }
          
          const dateBlockStr = startDay === endDay ? startDay : `${startDay} - ${endDay}`;

          return (
            <motion.div 
              key={event.id}
              variants={itemVariants}
              className={`group flex flex-col md:flex-row items-center md:items-stretch gap-6 p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-md transition-all hover:bg-zinc-800/40 hover:border-brand-500/30 ${isCompleted ? 'opacity-60 saturate-50' : ''}`}
            >
              {/* Date Block */}
              <div className="flex-shrink-0 w-full md:w-36 bg-zinc-950/60 rounded-xl p-4 flex flex-col items-center justify-center border border-zinc-800/50 shadow-inner">
                <span className="text-xl md:text-2xl font-bold text-white mb-1 text-center">{dateBlockStr}</span>
                <span className="text-xs font-semibold text-brand-400 tracking-widest">{monthStr} {year}</span>
              </div>
              
              {/* Event Info */}
              <div className="flex-grow flex flex-col justify-center w-full">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  {isCompleted ? (
                    <span className="flex items-center px-3 py-1 text-xs font-semibold bg-zinc-800/80 text-zinc-300 rounded-full border border-zinc-700">
                      <CheckCircle2 className="w-3 h-3 mr-1.5" />
                      Completed
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-xs font-semibold bg-brand-500/10 text-brand-400 rounded-full border border-brand-500/20">
                      Upcoming
                    </span>
                  )}
                  <span className="flex items-center text-xs font-medium text-zinc-400 bg-zinc-900/50 px-3 py-1 rounded-full border border-zinc-800">
                    <Layout className="w-3 h-3 mr-1.5" />
                    {event.format}
                  </span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-brand-400 transition-colors leading-tight">
                  {event.title}
                </h3>
                
                <div className="flex items-center text-zinc-400 mt-auto">
                  <MapPin className="w-4 h-4 mr-2 text-brand-500" />
                  <span className="text-sm font-medium">{event.venue}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex-shrink-0 w-full md:w-auto flex items-center mt-4 md:mt-0 justify-end">
                <Link 
                  href={event.link}
                  className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-zinc-800 hover:bg-brand-600 text-white font-medium rounded-xl transition-all shadow-lg border border-zinc-700 hover:border-brand-500 group-hover:shadow-brand-500/20 active:scale-95"
                >
                  View Details
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
