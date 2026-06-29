'use client';

import { motion } from 'framer-motion';
import { partnerLogos } from '@/data/events';
import { useState } from 'react';

function PartnerLogo({ name, domain }: { name: string; domain: string }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group flex flex-col items-center justify-center gap-3 px-8 md:px-12 flex-shrink-0">
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20 group-hover:scale-110">
        {!imgError ? (
          <img
            src={`https://logo.clearbit.com/${domain}`}
            alt={`${name} logo`}
            width={36}
            height={36}
            className="h-9 w-9 rounded-lg object-contain filter grayscale opacity-50 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-lg font-bold text-gray-500 transition-colors duration-300 group-hover:text-white select-none">
            {name.charAt(0)}
          </span>
        )}
      </div>
      <span className="text-xs font-medium text-gray-500 transition-colors duration-300 group-hover:text-gray-300 whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export default function PartnersCarousel() {
  // Duplicate the array for seamless looping
  const duplicatedLogos = [...partnerLogos, ...partnerLogos];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0a0a0a]">
      {/* Subtle top/bottom border glow */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="inline-block rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-medium tracking-wider text-brand-400 uppercase mb-4">
            Partners
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white">
            Trusted by{' '}
            <span className="gradient-text">Global Innovators</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-gray-400">
            Collaborating with the world&apos;s leading organizations to deliver
            transformative experiences.
          </p>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative">
          {/* Left fade mask */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 md:w-40 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
          {/* Right fade mask */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 md:w-40 bg-gradient-to-l from-[#0a0a0a] to-transparent" />

          {/* Scrolling track */}
          <div className="overflow-hidden">
            <div className="flex animate-marquee w-max">
              {duplicatedLogos.map((logo, index) => (
                <PartnerLogo
                  key={`${logo.domain}-${index}`}
                  name={logo.name}
                  domain={logo.domain}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
