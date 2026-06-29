'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { agenda, type IAgendaSession } from '@/data/events';

const typeConfig: Record<
  IAgendaSession['type'],
  { color: string; border: string; dot: string; label: string }
> = {
  keynote: {
    color: 'bg-purple-500/20 text-purple-300',
    border: 'border-purple-500/60',
    dot: 'bg-purple-400',
    label: 'Keynote',
  },
  panel: {
    color: 'bg-blue-500/20 text-blue-300',
    border: 'border-blue-500/60',
    dot: 'bg-blue-400',
    label: 'Panel',
  },
  workshop: {
    color: 'bg-emerald-500/20 text-emerald-300',
    border: 'border-emerald-500/60',
    dot: 'bg-emerald-400',
    label: 'Workshop',
  },
  networking: {
    color: 'bg-amber-500/20 text-amber-300',
    border: 'border-amber-500/60',
    dot: 'bg-amber-400',
    label: 'Networking',
  },
  break: {
    color: 'bg-gray-500/20 text-gray-400',
    border: 'border-gray-500/40',
    dot: 'bg-gray-500',
    label: 'Break',
  },
};

export default function AgendaTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const activeDay = agenda[activeTab];

  return (
    <section id="agenda" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
      <div ref={sectionRef} className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-widest text-brand-400 uppercase font-medium">
            Schedule
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white mt-3">
            Summit Agenda
          </h2>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
            Three days of transformative content, curated networking, and
            hands-on learning.
          </p>
        </motion.div>

        {/* Tab Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
          className="flex justify-center gap-2 sm:gap-4 mb-12"
        >
          {agenda.map((day, index) => (
            <button
              key={day.day}
              onClick={() => setActiveTab(index)}
              className="relative px-5 py-3 sm:px-8 sm:py-4 rounded-xl text-center transition-colors duration-200"
            >
              {activeTab === index && (
                <motion.div
                  layoutId="agenda-tab-indicator"
                  className="absolute inset-0 bg-brand-500/15 border border-brand-500/40 rounded-xl"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 block">
                <span
                  className={`block text-sm font-semibold ${
                    activeTab === index ? 'text-brand-400' : 'text-gray-400'
                  }`}
                >
                  Day {day.day}
                </span>
                <span
                  className={`block text-xs mt-0.5 ${
                    activeTab === index ? 'text-gray-300' : 'text-gray-500'
                  }`}
                >
                  {day.date}
                </span>
              </span>
            </button>
          ))}
        </motion.div>

        {/* Day Title */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`title-${activeTab}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.25 }}
            className="mb-6"
          >
            <h3 className="text-xl font-display font-semibold text-white">
              {activeDay.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {activeDay.sessions.length} sessions
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Session List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`sessions-${activeTab}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="space-y-3"
          >
            {activeDay.sessions.map((session, index) => {
              const config = typeConfig[session.type];

              return (
                <motion.div
                  key={`${activeTab}-${index}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    ease: 'easeOut',
                    delay: 0.04 * index,
                  }}
                  className={`group relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-xl p-4 sm:p-5 hover:bg-white/[0.06] transition-all duration-300 border-l-[3px] ${config.border}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                    {/* Time */}
                    <span className="text-brand-400 font-mono text-sm shrink-0 w-[130px]">
                      {session.time}
                    </span>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white text-sm sm:text-base leading-snug">
                        {session.title}
                      </h4>
                      {session.speaker && (
                        <p className="text-gray-400 text-sm mt-1">
                          {session.speaker}
                        </p>
                      )}
                    </div>

                    {/* Type Badge */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`w-2 h-2 rounded-full ${config.dot}`} />
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${config.color}`}
                      >
                        {config.label}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
