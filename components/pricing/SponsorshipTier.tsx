'use client';

import { motion } from 'framer-motion';
import { Check, Crown, ArrowRight } from 'lucide-react';
import type { ISponsorshipPackage } from '@/data/events';

interface SponsorshipTierProps {
  pkg: ISponsorshipPackage;
  index?: number;
}

export default function SponsorshipTier({ pkg, index = 0 }: SponsorshipTierProps) {
  const isExclusive = pkg.exclusive === true;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 * index }}
      className="h-full"
    >
      <div
        className={`relative h-full flex flex-col rounded-2xl p-[1px] transition-all duration-300 ${
          isExclusive
            ? 'bg-gradient-to-b from-amber-400 via-amber-600 to-amber-900 shadow-lg shadow-amber-500/15'
            : 'bg-white/[0.08]'
        }`}
      >
        {/* Inner card */}
        <div
          className={`relative flex flex-col flex-1 rounded-[15px] p-6 sm:p-7 ${
            isExclusive
              ? 'bg-[#0e0d10]'
              : 'bg-white/[0.03] backdrop-blur-sm'
          }`}
        >
          {/* Exclusive Badge */}
          {isExclusive && (
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-amber-500/30 tracking-wider uppercase">
                <Crown className="w-3.5 h-3.5" />
                Exclusive
              </span>
            </div>
          )}

          {/* Tier Name */}
          <h3
            className={`text-xl font-display font-bold mt-1 ${
              isExclusive ? 'text-amber-300' : 'text-white'
            }`}
          >
            {pkg.tier}
          </h3>

          {/* Price */}
          <div className="mt-4 mb-3">
            <span className="text-gray-400 text-lg align-top">$</span>
            <span className="text-4xl font-bold tracking-tight text-white">
              {pkg.price.toLocaleString()}
            </span>
          </div>

          {/* Pitch */}
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            {pkg.pitch}
          </p>

          {/* Divider */}
          <div className="border-t border-white/[0.06] mb-5" />

          {/* Benefits */}
          <ul className="space-y-3 mb-8 flex-1">
            {pkg.benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className={`mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                    isExclusive
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-brand-500/20 text-brand-400'
                  }`}
                >
                  <Check className="w-3 h-3" strokeWidth={3} />
                </span>
                <span className="text-gray-300 text-sm leading-snug">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <a
            href="#contact"
            className={`group/btn inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
              isExclusive
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35'
                : 'bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/[0.08] hover:border-white/[0.15]'
            }`}
          >
            Become a Sponsor
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
