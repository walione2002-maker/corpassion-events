'use client';

import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 p-12 md:p-16"
        >
          {/* Decorative background orbs */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-brand-400/10 blur-2xl" />

          {/* Content */}
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white">
              Stay Ahead of the Curve
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-brand-200/80">
              Subscribe to our newsletter for updates on business coaching,
              upcoming events, and free industry insights.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-white backdrop-blur-sm placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 font-semibold text-brand-700 transition-all hover:bg-gray-100"
              >
                Subscribe
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
