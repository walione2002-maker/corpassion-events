'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import {
  eventBoothOptions,
  boothFeatures,
  eventSponsorshipPackages,
} from '@/data/events';
import SponsorshipTier from './SponsorshipTier';
import Link from 'next/link';

export default function SponsorshipHub({ eventId = 'dubai-ai-summit-2026', currency = '$' }: { eventId?: string, currency?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const currentBoothOptions = eventBoothOptions[eventId] || eventBoothOptions['dubai-ai-summit-2026'];
  const currentSponsorshipPackages = eventSponsorshipPackages[eventId] || eventSponsorshipPackages['dubai-ai-summit-2026'];

  return (
    <section
      id="sponsorship"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-transparent"
    >
      <div ref={sectionRef} className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-widest text-brand-700 dark:text-brand-400 uppercase font-medium">
            Partners
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-slate-900 dark:text-white mt-3">
            Sponsorship &amp; Exhibition
          </h2>
        </motion.div>

        {/* Book Booth Space Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            className="mb-10 text-center"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Book Booth Space</h3>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          >
            {/* Booth Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {currentBoothOptions.map((booth, index) => (
                <motion.div
                  key={booth.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.5,
                    ease: 'easeOut',
                    delay: 0.1 * index,
                  }}
                  className="group bg-white/80 dark:bg-white/[0.03] backdrop-blur-sm border border-slate-200 dark:border-white/[0.06] rounded-2xl p-6 sm:p-7 hover:bg-slate-50 dark:hover:bg-white/[0.06] hover:border-slate-300 dark:hover:border-white/[0.12] transition-all duration-300 flex flex-col"
                >
                  {/* Booth Name */}
                  <h3 className="text-lg font-display font-semibold text-slate-900 dark:text-white">
                    {booth.name}
                  </h3>

                  {/* Price */}
                  <div className="mt-4 mb-3">
                    <span className="text-slate-800 dark:text-gray-400 text-lg align-top">
                      {currency}
                    </span>
                    <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                      {booth.price.toLocaleString()}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-slate-800 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                    {booth.description}
                  </p>

                  {/* CTA */}
                  <Link
                    href={`/checkout/booth/${booth.id}`}
                    className="group/btn inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-sm font-semibold bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.12] text-slate-900 dark:text-white border border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/[0.15] transition-all duration-300 mt-auto"
                  >
                    Book This Booth
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Shared Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
              className="bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] rounded-2xl p-6 sm:p-8"
            >
              <h4 className="text-sm tracking-widest text-brand-700 dark:text-brand-400 uppercase font-medium mb-5">
                All Booths Include
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {boothFeatures.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-brand-500/20 flex items-center justify-center">
                      <Check
                        className="w-3 h-3 text-brand-700 dark:text-brand-400"
                        strokeWidth={3}
                      />
                    </span>
                    <span className="text-slate-800 dark:text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Sponsorship Packages Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-10 text-center"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Sponsorship Packages</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentSponsorshipPackages.map((pkg, index) => (
                <SponsorshipTier key={pkg.id} pkg={pkg} index={index} currency={currency} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
