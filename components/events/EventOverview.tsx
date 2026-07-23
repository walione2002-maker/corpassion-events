'use client';

import { IEvent } from '@/data/events';
import { motion } from 'framer-motion';

export default function EventOverview({ event }: { event: IEvent }) {
  const descriptionParagraphs = event.description?.split('\n\n') || [];

  return (
    <section id="overview" className="py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Description & Key Topics */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-6">What this event delivers</h2>
              <div className="space-y-4 text-slate-700 dark:text-gray-300 text-lg leading-relaxed">
                {descriptionParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {event.keyTopics && event.keyTopics.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Key Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {event.keyTopics.map((topic, i) => (
                    <span 
                      key={i} 
                      className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-slate-100 text-slate-800 dark:bg-white/5 dark:text-gray-200 border border-slate-200 dark:border-white/10"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right Column: Who should attend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-8 backdrop-blur sticky top-32">
              <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6">Who should attend</h3>
              {event.whoShouldAttend && event.whoShouldAttend.length > 0 ? (
                <ul className="space-y-4">
                  {event.whoShouldAttend.map((audience, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 flex items-center justify-center text-xs font-bold mt-0.5">
                        {i + 1}
                      </div>
                      <span className="text-slate-700 dark:text-gray-300">{audience}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-500 dark:text-gray-400">Industry professionals and enthusiasts.</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
