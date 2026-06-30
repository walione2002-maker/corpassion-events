'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { agenda, globalFeatures, type IAgendaSession } from '@/data/events';

// Magnetic Card Component for Weightless Modules
function MagneticCard({ children, config }: { children: React.ReactNode, config: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative group bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(167,139,250,0.2)] hover:bg-white/60 dark:hover:bg-slate-900/60 z-10 hover:border-brand-400/30`}
    >
      <div style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </motion.div>
  );
}

const typeConfig: Record<
  IAgendaSession['type'],
  { color: string; border: string; dot: string; label: string }
> = {
  keynote: {
    color: 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-300',
    border: 'border-purple-500/30',
    dot: 'bg-purple-400',
    label: 'Keynote',
  },
  panel: {
    color: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300',
    border: 'border-blue-500/30',
    dot: 'bg-blue-400',
    label: 'Panel',
  },
  workshop: {
    color: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300',
    border: 'border-emerald-500/30',
    dot: 'bg-emerald-400',
    label: 'Workshop',
  },
  networking: {
    color: 'bg-brand-500/10 text-brand-600 dark:bg-brand-500/20 dark:text-brand-300',
    border: 'border-brand-500/30',
    dot: 'bg-brand-400',
    label: 'Networking',
  },
  break: {
    color: 'bg-slate-500/10 text-slate-700 dark:bg-slate-500/20 dark:text-slate-400',
    border: 'border-slate-500/30',
    dot: 'bg-slate-500',
    label: 'Break',
  },
};

export default function AgendaTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const activeDay = agenda[activeTab];

  return (
    <section id="agenda" className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden z-10">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(167,139,250,0.1)_0%,transparent_70%)] pointer-events-none -z-10" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-widest text-brand-500 dark:text-brand-400 uppercase font-bold">
            3-Day Schedule
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-slate-900 dark:text-white mt-3 mb-6">
            Summit Agenda
          </h2>
        </motion.div>

        {/* Orbit Selector (Floating Pills) */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 relative z-20" style={{ perspective: '1000px' }}>
          {agenda.map((day, index) => (
            <button
              key={day.day}
              onClick={() => setActiveTab(index)}
              className="relative px-6 py-4 rounded-2xl transition-all duration-300 group outline-none"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {activeTab === index ? (
                <motion.div
                  layoutId="orbit-indicator"
                  className="absolute inset-0 bg-white/80 dark:bg-white/10 backdrop-blur-md border border-brand-400/50 rounded-2xl shadow-[0_10px_30px_rgba(167,139,250,0.15)] dark:shadow-[0_10px_30px_rgba(167,139,250,0.25)]"
                  initial={false}
                  animate={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
              ) : (
                <div className="absolute inset-0 bg-white/40 dark:bg-white/5 backdrop-blur-sm border border-slate-200/50 dark:border-white/5 rounded-2xl group-hover:bg-white/60 dark:group-hover:bg-white/10 transition-colors" />
              )}
              
              <span className={`relative z-10 block transition-transform duration-300 ${activeTab === index ? '-translate-y-2' : ''}`}>
                <span className={`block text-lg font-bold ${activeTab === index ? 'text-brand-600 dark:text-brand-300' : 'text-slate-700 dark:text-slate-400'}`}>
                  Day {day.day}
                </span>
                <span className={`block text-sm mt-1 ${activeTab === index ? 'text-slate-800 dark:text-slate-200' : 'text-slate-500 dark:text-slate-500'}`}>
                  {day.date}
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* Day Title & Info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`title-${activeTab}`}
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-display font-semibold text-slate-900 dark:text-white bg-clip-text">
              {activeDay.title}
            </h3>
          </motion.div>
        </AnimatePresence>

        {/* Schedule Grid with Levitating Timeline */}
        <div className="relative">
          {/* Levitating Timeline Conduit */}
          <div className="absolute left-[27px] sm:left-1/2 top-0 bottom-0 w-1 sm:-ml-[2px] bg-gradient-to-b from-brand-400/0 via-brand-400/80 to-brand-400/0 opacity-60 shadow-[0_0_20px_rgba(167,139,250,0.7)] blur-[1px] rounded-full" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={`sessions-${activeTab}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8 sm:space-y-12"
            >
              {activeDay.sessions.map((session, index) => {
                const config = typeConfig[session.type];
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={`${activeTab}-${index}`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, delay: index * 0.05, type: "spring", bounce: 0.3 }}
                    className={`relative flex flex-col sm:flex-row gap-8 sm:gap-16 items-start sm:items-center ${isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                  >
                    {/* Glowing Node */}
                    <div className="absolute left-[19px] sm:left-1/2 sm:-translate-x-1/2 w-5 h-5 rounded-full bg-white dark:bg-slate-900 border-[4px] border-brand-400 shadow-[0_0_20px_rgba(167,139,250,0.9)] z-20" />
                    
                    {/* Empty Space for Staggered Layout (Desktop) */}
                    <div className="hidden sm:block flex-1" />

                    {/* Card Container */}
                    <div className="flex-1 w-full pl-16 sm:pl-0 z-10" style={{ perspective: '1200px' }}>
                      <MagneticCard config={config}>
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <span className="text-brand-600 dark:text-brand-400 font-mono text-sm font-bold tracking-wide">
                              {session.time}
                            </span>
                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${config.color} border ${config.border}`}>
                              {config.label}
                            </span>
                          </div>
                          
                          <h4 className="font-bold text-slate-900 dark:text-white text-lg sm:text-xl leading-snug">
                            {session.title}
                          </h4>
                          
                          {session.speaker && (
                            <p className="text-slate-600 dark:text-slate-400 font-medium">
                              {session.speaker}
                            </p>
                          )}
                        </div>
                      </MagneticCard>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Global Features Dock */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-8 sm:p-10 rounded-[2rem] bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-slate-200/50 dark:border-white/10 shadow-2xl relative overflow-hidden group"
        >
          {/* Subtle animated background mesh */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-400/5 to-purple-500/5 opacity-50 pointer-events-none" />
          <div className="absolute -inset-[100%] animate-[spin_20s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,rgba(167,139,250,0.05)_0%,transparent_50%,rgba(167,139,250,0.05)_100%)] pointer-events-none blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center justify-center p-3 bg-brand-500/10 rounded-2xl mb-6">
              <span className="text-brand-600 dark:text-brand-400 font-bold uppercase tracking-widest text-sm">Continuous Features</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 w-full max-w-3xl mx-auto">
              {globalFeatures.map((feature, idx) => (
                <div 
                  key={idx} 
                  className="px-5 py-3 rounded-xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/50 dark:border-white/5 text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 shadow-sm backdrop-blur-md hover:bg-brand-500/10 hover:border-brand-400/40 hover:-translate-y-1 transition-all duration-300 cursor-default"
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
