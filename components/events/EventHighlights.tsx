'use client';

import { IEvent } from '@/data/events';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function EventHighlights({ event }: { event: IEvent }) {
  if (!event.highlights || event.highlights.length === 0) return null;

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-12 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-brand-100 dark:bg-brand-500/20 rounded-lg">
              <Sparkles className="w-6 h-6 text-brand-600 dark:text-brand-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 dark:text-white">What to expect</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {event.highlights.map((highlight, i) => (
               <div key={i} className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-brand-500 flex-shrink-0" />
                 <span className="text-slate-700 dark:text-gray-200 font-medium">{highlight}</span>
               </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
