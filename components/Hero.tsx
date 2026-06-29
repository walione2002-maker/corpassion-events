'use client';

import { motion } from 'framer-motion';
import { events } from '@/data/events';

const flagship = events.find((e) => e.flagship) ?? events[0];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const ctaButtons = [
  {
    label: 'Attend',
    sub: 'Register as a Delegate',
    href: '#tickets',
    style: 'filled' as const,
  },
  {
    label: 'Exhibit',
    sub: 'Book Your Booth',
    href: '#exhibit',
    style: 'outlined' as const,
  },
  {
    label: 'Sponsor',
    sub: 'Promote Your Brand',
    href: '#sponsorship',
    style: 'outlined' as const,
  },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Radial gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(129,140,248,0.06)_0%,transparent_50%)]" />

      {/* Animated grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(129,140,248,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(129,140,248,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          animation: 'gridDrift 20s linear infinite',
        }}
      />
      <style jsx>{`
        @keyframes gridDrift {
          0% {
            background-position: 0px 0px;
          }
          100% {
            background-position: 60px 60px;
          }
        }
      `}</style>

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
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-20">
        {/* Badge */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-8 inline-flex"
        >
          <span className="border border-brand-400/30 bg-brand-400/10 text-brand-300 text-sm rounded-full px-5 py-1.5 tracking-wide">
            {flagship.location} &bull; {flagship.dates}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={0.15}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6 leading-[1.08]"
        >
          <span className="bg-gradient-to-r from-white via-white to-brand-400 bg-clip-text text-transparent">
            {flagship.title}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={0.3}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12"
        >
          {flagship.taglines[0]}
        </motion.p>

        {/* Three CTA Buttons */}
        <motion.div
          custom={0.45}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-stretch justify-center gap-4 max-w-2xl mx-auto"
        >
          {ctaButtons.map((cta, i) => (
            <motion.a
              key={cta.label}
              href={cta.href}
              custom={0.5 + i * 0.1}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className={`group flex-1 flex flex-col items-center justify-center gap-1 rounded-xl px-6 py-4 font-medium transition-all duration-300 ${
                cta.style === 'filled'
                  ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:brightness-110 active:scale-[0.97]'
                  : 'border border-white/20 text-white hover:border-brand-400/50 hover:bg-white/5 active:scale-[0.97]'
              }`}
            >
              <span className="text-lg font-semibold">{cta.label}</span>
              <span
                className={`text-xs ${
                  cta.style === 'filled'
                    ? 'text-white/70'
                    : 'text-gray-500 group-hover:text-gray-400'
                } transition-colors`}
              >
                {cta.sub}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
    </section>
  );
}
