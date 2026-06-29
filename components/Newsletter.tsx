'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, Loader2 } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isLoading || isSuccess) return;

    setIsLoading(true);

    // Simulate API call with 2-second delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

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
          <div className="pointer-events-none absolute top-0 right-1/4 h-40 w-40 rounded-full bg-brand-300/5 blur-2xl" />

          {/* Content */}
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-white">
                Stay Ahead of the Curve
              </h2>
              <p className="mt-4 max-w-xl mx-auto text-brand-200/80 text-base md:text-lg">
                Get the latest summit updates, speaker announcements, and
                early-bird alerts directly to your inbox.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isSuccess}
                className="flex-1 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-white backdrop-blur-sm placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50 transition-all"
              />
              <button
                type="submit"
                disabled={isLoading || isSuccess}
                className={`inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 font-semibold transition-all min-w-[160px] ${
                  isSuccess
                    ? 'bg-emerald-500 text-white cursor-default'
                    : 'bg-white text-brand-700 hover:bg-gray-100 disabled:opacity-80'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Subscribing...
                  </>
                ) : isSuccess ? (
                  <>
                    <Check className="h-4 w-4" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    Subscribe
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </motion.form>

            {/* Success message */}
            {isSuccess && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-4 text-sm text-emerald-300/90"
              >
                You&apos;re all set! We&apos;ll keep you posted on the latest updates.
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
