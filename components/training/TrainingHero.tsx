'use client';

import { motion } from 'framer-motion';

export default function TrainingHero() {
  return (
    <section className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[#0a0a0a] z-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900/40 to-black z-0" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-12">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-lg"
        >
          Training Calendar
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-lg md:text-xl text-zinc-300 max-w-2xl font-light leading-relaxed"
        >
          Premium modules designed for enterprise scalability and professional excellence.
        </motion.p>
      </div>
    </section>
  );
}
