'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, CalendarDays, ArrowRight } from 'lucide-react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { IEvent } from '@/data/events';

interface EventCardProps {
  event: IEvent;
  priority?: boolean;
}

export default function EventCard({ event, priority = false }: EventCardProps) {
  const {
    title,
    location,
    dates,
    taglines,
    image,
    registrationOpen,
    id,
    category,
    startingPrice,
    currency,
  } = event;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], [10, -10]);
  const rotateY = useTransform(x, [-150, 150], [-10, 10]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex h-full flex-col overflow-visible rounded-2xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm transition-colors duration-300 hover:shadow-[0_20px_40px_-10px_rgba(167,139,250,0.15)] hover:border-brand-400/30"
    >
      {/* Image Container */}
      <div 
        className="relative aspect-[16/10] overflow-hidden rounded-t-2xl"
        style={{ transform: "translateZ(30px)" }}
      >
        <Image
          src={image}
          alt={title}
          fill
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80" />

        {/* Badges container top-left */}
        <div className="absolute left-4 top-4 flex flex-col items-start gap-2 z-10">
          {category && (
            <span className="rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-900 shadow-sm backdrop-blur-md">
              {category}
            </span>
          )}
          {registrationOpen ? (
            <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/90 backdrop-blur-md px-3 py-1 shadow-sm border border-emerald-400/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                Open
              </span>
            </div>
          ) : (
            <span className="rounded-full bg-black/50 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white border border-white/10">
              Upcoming
            </span>
          )}
        </div>

        {/* Price badge bottom-right */}
        {startingPrice && (
          <div className="absolute right-4 bottom-8 z-10">
             <span className="rounded-full bg-black/70 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-white border border-white/10 shadow-lg shadow-black/20">
               From {currency || '$'}{startingPrice}
             </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div 
        className="flex flex-1 flex-col p-6 z-10 relative bg-white/80 dark:bg-slate-900/80 -mt-6 rounded-t-2xl border-t border-slate-200 dark:border-white/5"
        style={{ transform: "translateZ(40px)" }}
      >
        <h3 className="font-display text-xl font-bold leading-tight text-slate-900 dark:text-white mb-4 line-clamp-2">
          {title}
        </h3>

        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-center gap-3 text-slate-600 dark:text-gray-300">
            <div className="p-2 rounded-lg bg-brand-500/10 dark:bg-brand-400/10">
              <CalendarDays className="h-4 w-4 shrink-0 text-brand-500 dark:text-brand-400" />
            </div>
            <span className="text-sm font-medium">{dates}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-600 dark:text-gray-300">
            <div className="p-2 rounded-lg bg-brand-500/10 dark:bg-brand-400/10">
              <MapPin className="h-4 w-4 shrink-0 text-brand-500 dark:text-brand-400" />
            </div>
            <span className="text-sm font-medium">{location}</span>
          </div>
        </div>

        {taglines.length > 0 && (
          <p className="text-sm leading-relaxed text-slate-500 dark:text-gray-400 line-clamp-2 mt-auto">
            {taglines[0]}
          </p>
        )}

        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
          <a
            href={`/events/${id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-500 dark:text-brand-400 transition-colors duration-200 hover:text-brand-600 dark:hover:text-brand-300 group/link"
          >
            Explore event
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
