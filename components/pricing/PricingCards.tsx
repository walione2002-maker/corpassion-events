'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, ArrowRight, Sparkles } from 'lucide-react';
import { ticketTiers } from '@/data/events';

export default function PricingCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0a0a0a]">
      <div ref={sectionRef} className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-10"
        >
          <span className="text-sm tracking-widest text-brand-700 dark:text-brand-400 uppercase font-medium">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-slate-900 dark:text-white mt-3">
            Registration &amp; Pricing
          </h2>
        </motion.div>

        {/* Group Discount Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-r from-brand-500/20 to-brand-600/20 border border-brand-500/30 rounded-xl p-4 sm:p-5 flex items-center gap-4">
            <div className="shrink-0 w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-brand-700 dark:text-brand-300" />
            </div>
            <div>
              <p className="text-brand-900 dark:text-brand-200 font-semibold text-base sm:text-lg">
                10% to 20% Group Discounts Available
              </p>
              <p className="text-brand-700/70 dark:text-brand-300/70 text-sm mt-0.5">
                Contact us at training@corpassionevent.com for group rates on 3+ delegates.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {ticketTiers.map((tier, index) => {
            const isEmphasized = tier.emphasized === true;

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  ease: 'easeOut',
                  delay: 0.15 + 0.1 * index,
                }}
                className={isEmphasized ? 'sm:-mt-3 sm:mb-[-12px]' : ''}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2,
                  }}
                  className={`relative h-full flex flex-col rounded-2xl p-[1px] transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.05)] glass-card ${
                    isEmphasized
                      ? 'bg-gradient-to-b from-brand-400 via-brand-600 to-brand-900 shadow-lg shadow-brand-500/20'
                      : 'bg-slate-200 dark:bg-white/[0.08]'
                  }`}
                >
                  {/* Inner card */}
                  <div
                    className={`relative flex flex-col flex-1 rounded-[15px] p-6 sm:p-7 ${
                      isEmphasized
                        ? 'bg-white dark:bg-[#0e0e1a]'
                        : 'bg-white/80 dark:bg-white/[0.03] backdrop-blur-sm'
                    }`}
                  >
                    {/* Most Popular Badge */}
                    {isEmphasized && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-1.5 bg-brand-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg shadow-brand-500/30">
                          <Sparkles className="w-3.5 h-3.5" />
                          Most Popular
                        </span>
                      </div>
                    )}

                    {/* Tier Name */}
                    <h3
                      className={`text-lg font-display font-semibold mt-1 ${
                        isEmphasized ? 'text-brand-700 dark:text-brand-300' : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {tier.name}
                    </h3>

                    {/* Price */}
                    <div className="mt-5 mb-4">
                      <span className="text-slate-800 dark:text-gray-400 text-lg align-top">$</span>
                      <span
                        className={`text-4xl font-bold tracking-tight ${
                          isEmphasized ? 'text-slate-900 dark:text-white' : 'text-slate-900 dark:text-white'
                        }`}
                      >
                        {tier.price}
                      </span>
                      <span className="text-slate-800 dark:text-gray-500 text-sm ml-1">/person</span>
                    </div>

                    {/* Deadline */}
                    <p className="text-slate-800 dark:text-gray-400 text-sm mb-6">{tier.deadline}</p>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* CTA Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        window.dispatchEvent(new Event('open-checkout'));
                      }}
                      className={`group/btn inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        isEmphasized
                          ? 'bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40'
                          : 'bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.12] text-slate-900 dark:text-white border border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/[0.15]'
                      }`}
                    >
                      Register Now
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Payments Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.6 }}
          className="mt-12 max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center border border-brand-500/30 shrink-0">
              <span className="text-brand-700 dark:text-brand-400 font-bold text-sm tracking-tighter">EG</span>
            </div>
            <p className="text-xs text-slate-800 dark:text-gray-400 font-medium text-left leading-relaxed">
              Payments securely processed by <strong className="text-slate-900 dark:text-white font-bold">The Excellent Group FZC</strong><br/>
              <span className="text-[11px] text-slate-600 dark:text-gray-500 uppercase tracking-wider">Dubai, UAE — Safe & Registered</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
