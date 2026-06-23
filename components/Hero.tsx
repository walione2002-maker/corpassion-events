'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const stats = [
  { value: '10+', label: 'Industries Served' },
  { value: '50+', label: 'Masterclasses' },
  { value: '∞', label: 'Global Reach' },
  { value: '100%', label: 'Expert Trainers' },
];

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(129,140,248,0.06)_0%,transparent_50%)]" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-brand-600/20 blur-[128px]"
        animate={{
          y: [0, -40, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-brand-400/15 blur-[128px]"
        animate={{
          y: [0, 30, 0],
          x: [0, -25, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-brand-500/10 blur-[100px]"
        animate={{
          y: [0, 20, 0],
          x: [0, -15, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
        {/* Badge */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-8 inline-flex"
        >
          <span className="border border-brand-400/30 bg-brand-400/10 text-brand-300 text-sm rounded-full px-4 py-1.5">
            The Premier Corporate Training Series
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={0.15}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6"
        >
          <span className="bg-gradient-to-r from-white via-white to-brand-400 bg-clip-text text-transparent">
            Shaping Future Leaders with Expertise and Innovation.
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          custom={0.3}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10"
        >
          Transforming knowledge into real-world impact through corporate
          training, masterclasses, and AI-driven leadership conferences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={0.45}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#events"
            className="group rounded-full bg-brand-600 hover:bg-brand-500 text-white px-8 py-3.5 font-medium transition-all hover:shadow-[0_0_24px_rgba(99,102,241,0.4)] inline-flex items-center gap-2"
          >
            Explore Upcoming Events
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#services"
            className="rounded-full border border-white/20 hover:border-white/40 text-white px-8 py-3.5 font-medium transition-all hover:bg-white/5"
          >
            View Our Services
          </a>
        </motion.div>

        {/* Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-20"
        >
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex flex-col items-center gap-1 ${
                    i < stats.length - 1
                      ? 'md:border-r md:border-white/10'
                      : ''
                  }`}
                >
                  <span className="text-3xl font-display font-bold text-brand-400">
                    {stat.value}
                  </span>
                  <span className="text-sm text-gray-400">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
