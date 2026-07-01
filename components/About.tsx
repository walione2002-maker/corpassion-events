'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Target, Compass } from 'lucide-react';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const glassContainerY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const foregroundTextY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const floatingOrbsY = useTransform(scrollYProgress, [0, 1], ["-10%", "30%"]);

  return (
    <section ref={containerRef} id="about" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#05050a] overflow-hidden flex items-center justify-center">
      {/* Parallax Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-30"
      >
        <div className="hidden md:block absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-[100px]" />
        <div className="hidden md:block absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-500/20 rounded-full blur-[120px]" />
      </motion.div>

      {/* Floating Orbs (Parallax) */}
      <motion.div 
        style={{ y: floatingOrbsY }}
        className="absolute inset-0 z-10 pointer-events-none"
      >
        <div className="absolute top-32 right-32 w-20 h-20 bg-gradient-to-tr from-brand-400 to-indigo-500 rounded-full blur-xl opacity-40 animate-pulse" />
        <div className="absolute bottom-40 left-20 w-32 h-32 bg-gradient-to-tr from-brand-400 to-brand-600 rounded-full blur-2xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-20 w-full">
        <motion.div 
          style={{ y: glassContainerY }}
          className="glass-card bg-white/80 dark:bg-white/[0.03] backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden relative"
        >
          {/* Subtle noise texture overlay if desired */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

          <motion.div style={{ y: foregroundTextY }} className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
            
            <div className="flex-1 space-y-8">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-300 text-sm font-medium border border-brand-500/20 mb-6">
                  <Sparkles className="w-4 h-4" />
                  About Corpassion
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white leading-tight">
                  Redefining the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-400">Future</span> of Corporate Events
                </h2>
              </div>
              
              <div className="space-y-6 text-slate-800 dark:text-gray-300 text-lg leading-relaxed">
                <p>
                  Corpassion Events brings an anti-gravity approach to the traditional corporate summit. We remove the friction, the weight, and the predictable formats that hold ideas down.
                </p>
                <p>
                  Our mission is to engineer environments where innovation flows effortlessly and connections are made without boundaries. By merging spatial design, bleeding-edge technology, and unparalleled curation, we create spaces that elevate human potential.
                </p>
                <p className="border-l-2 border-brand-400/50 pl-4 py-1 text-base mt-2">
                  <strong className="text-slate-900 dark:text-white">Corpassion Events</strong> is proudly operated by <strong className="text-slate-900 dark:text-white">The Excellent Group FZC</strong>, a registered and highly-trusted company based in Dubai, UAE, with a proven track record of delivering world-class business experiences.
                </p>
              </div>
            </div>

            <div className="flex-1 w-full max-w-md space-y-6">
              <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors duration-300 group">
                <div className="w-12 h-12 rounded-full bg-brand-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-6 h-6 text-brand-700 dark:text-brand-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Our Mission</h3>
                <p className="text-slate-800 dark:text-gray-400">To shatter the mundane and deliver transformational knowledge in zero-gravity environments that foster genuine connection.</p>
              </div>

              <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors duration-300 group">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Compass className="w-6 h-6 text-indigo-700 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Our Vision</h3>
                <p className="text-slate-800 dark:text-gray-400">Becoming the global epicenter for leaders and visionaries to converge, align, and propel industries into the future.</p>
              </div>
            </div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
