'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Check, LayoutGrid, Award, ArrowRight } from 'lucide-react';
import {
  boothOptions,
  boothFeatures,
  sponsorshipPackages,
} from '@/data/events';
import SponsorshipTier from './SponsorshipTier';

const tabs = [
  { id: 'booths', label: 'Book Booth Space', icon: LayoutGrid },
  { id: 'sponsorship', label: 'Sponsorship Packages', icon: Award },
] as const;

type TabId = (typeof tabs)[number]['id'];

export default function SponsorshipHub() {
  const [activeTab, setActiveTab] = useState<TabId>('booths');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="sponsorship"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0a0a0a]"
    >
      <div ref={sectionRef} className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          <span className="text-sm tracking-widest text-brand-400 uppercase font-medium">
            Partners
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-slate-900 dark:text-white mt-3">
            Sponsorship &amp; Exhibition
          </h2>
        </motion.div>

        {/* Toggle Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-xl p-1.5 gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  {isActive && (
                    <motion.div
                      layoutId="sponsorship-tab-indicator"
                      className="absolute inset-0 bg-brand-500/15 border border-brand-500/30 rounded-lg"
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <Icon
                    className={`relative z-10 w-4 h-4 ${
                      isActive ? 'text-brand-400' : 'text-slate-400 dark:text-gray-500'
                    }`}
                  />
                  <span
                    className={`relative z-10 hidden sm:inline ${
                      isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-gray-400'
                    }`}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'booths' && (
            <motion.div
              key="booths"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {/* Booth Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {boothOptions.map((booth, index) => (
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
                    className="group bg-white/80 dark:bg-white/[0.03] backdrop-blur-sm border border-slate-200 dark:border-white/[0.06] rounded-2xl p-6 sm:p-7 hover:bg-slate-50 dark:hover:bg-white/[0.06] hover:border-slate-300 dark:hover:border-white/[0.12] transition-all duration-300"
                  >
                    {/* Booth Name */}
                    <h3 className="text-lg font-display font-semibold text-slate-900 dark:text-white">
                      {booth.name}
                    </h3>

                    {/* Price */}
                    <div className="mt-4 mb-3">
                      <span className="text-slate-500 dark:text-gray-400 text-lg align-top">
                        $
                      </span>
                      <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                        {booth.price.toLocaleString()}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
                      {booth.description}
                    </p>

                    {/* CTA */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        window.dispatchEvent(new Event('open-checkout'));
                      }}
                      className="group/btn inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-sm font-semibold bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.12] text-slate-900 dark:text-white border border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/[0.15] transition-all duration-300"
                    >
                      Book This Booth
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Shared Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
                className="bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] rounded-2xl p-6 sm:p-8"
              >
                <h4 className="text-sm tracking-widest text-brand-400 uppercase font-medium mb-5">
                  All Booths Include
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {boothFeatures.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-brand-500/20 flex items-center justify-center">
                        <Check
                          className="w-3 h-3 text-brand-400"
                          strokeWidth={3}
                        />
                      </span>
                      <span className="text-slate-600 dark:text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'sponsorship' && (
            <motion.div
              key="sponsorship"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sponsorshipPackages.map((pkg, index) => (
                  <SponsorshipTier key={pkg.id} pkg={pkg} index={index} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
