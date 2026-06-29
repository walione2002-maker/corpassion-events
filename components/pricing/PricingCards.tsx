'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, ArrowRight, Sparkles } from 'lucide-react';
import { ticketTiers } from '@/data/events';

export default function PricingCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
      <div ref={sectionRef} className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-10"
        >
          <span className="text-sm tracking-widest text-brand-400 uppercase font-medium">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white mt-3">
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
          <div className="bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 rounded-xl p-4 sm:p-5 flex items-center gap-4">
            <div className="shrink-0 w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <p className="text-amber-200 font-semibold text-base sm:text-lg">
                10% to 20% Group Discounts Available
              </p>
              <p className="text-amber-300/70 text-sm mt-0.5">
                Contact us at training@corpassionevent.com for group rates on 3+
                delegates.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      : 'bg-white/[0.08]'
                  }`}
                >
                  {/* Inner card */}
                  <div
                    className={`relative flex flex-col flex-1 rounded-[15px] p-6 sm:p-7 ${
                      isEmphasized
                        ? 'bg-[#0e0e1a]'
                        : 'bg-white/[0.03] backdrop-blur-sm'
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
                        isEmphasized ? 'text-brand-300' : 'text-white'
                      }`}
                    >
                      {tier.name}
                    </h3>

                    {/* Price */}
                    <div className="mt-5 mb-4">
                      <span className="text-gray-400 text-lg align-top">$</span>
                      <span
                        className={`text-4xl font-bold tracking-tight ${
                          isEmphasized ? 'text-white' : 'text-white'
                        }`}
                      >
                        {tier.price}
                      </span>
                      <span className="text-gray-500 text-sm ml-1">/person</span>
                    </div>

                    {/* Deadline */}
                    <p className="text-gray-400 text-sm mb-6">{tier.deadline}</p>

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
                          : 'bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/[0.08] hover:border-white/[0.15]'
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
      </div>
    </section>
  );
}
