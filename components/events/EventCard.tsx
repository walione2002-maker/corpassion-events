'use client';

import Image from 'next/image';
import { MapPin, CalendarDays, ArrowRight } from 'lucide-react';
import type { IEvent } from '@/data/events';

interface EventCardProps {
  event: IEvent;
  /** When true the card renders in a horizontal (featured) layout on desktop */
  featured?: boolean;
}

export default function EventCard({ event, featured = false }: EventCardProps) {
  const {
    title,
    location,
    dates,
    taglines,
    image,
    flagship,
    id,
  } = event;

  /* ------------------------------------------------------------------ */
  /*  Featured / horizontal layout (flagship at top)                    */
  /* ------------------------------------------------------------------ */
  if (featured) {
    return (
      <div className="group relative">
        {/* Gradient border glow for flagship */}
        {flagship && (
          <div className="absolute -inset-px z-0 rounded-2xl bg-gradient-to-r from-brand-500/60 via-brand-400/40 to-brand-600/60 opacity-70 blur-sm transition-opacity duration-500 group-hover:opacity-100" />
        )}

        <div className="relative z-10 grid overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[420px]">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent md:bg-gradient-to-r md:from-transparent md:via-black/20 md:to-black/70" />

            {/* Flagship badge */}
            {flagship && (
              <span className="absolute left-4 top-4 rounded-full bg-brand-500/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                Flagship Event
              </span>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <h3 className="font-display text-2xl font-bold leading-tight text-white lg:text-3xl">
              {title}
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="h-4 w-4 shrink-0 text-brand-400" />
                <span className="text-sm">{location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CalendarDays className="h-4 w-4 shrink-0 text-brand-400" />
                <span className="text-sm">{dates}</span>
              </div>
            </div>

            {taglines.length > 0 && (
              <div className="mt-5 space-y-2">
                {taglines.map((tagline) => (
                  <p
                    key={tagline}
                    className="text-sm italic leading-relaxed text-gray-400"
                  >
                    &ldquo;{tagline}&rdquo;
                  </p>
                ))}
              </div>
            )}

            <a
              href={`/events/${id}`}
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-400 transition-colors duration-200 hover:text-brand-300"
            >
              Learn More
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------ */
  /*  Standard / vertical card layout                                    */
  /* ------------------------------------------------------------------ */
  return (
    <div className="group relative">
      {/* Gradient border glow for flagship */}
      {flagship && (
        <div className="absolute -inset-px z-0 rounded-2xl bg-gradient-to-r from-brand-500/60 via-brand-400/40 to-brand-600/60 opacity-70 blur-sm transition-opacity duration-500 group-hover:opacity-100" />
      )}

      <div className="relative z-10 flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-[16/10]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Flagship badge */}
          {flagship && (
            <span className="absolute left-4 top-4 rounded-full bg-brand-500/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
              Flagship
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6 lg:p-8">
          <h3 className="font-display text-lg font-bold leading-tight text-white lg:text-xl">
            {title}
          </h3>

          <div className="mt-4 flex flex-col gap-2.5">
            <div className="flex items-center gap-2 text-gray-300">
              <MapPin className="h-4 w-4 shrink-0 text-brand-400" />
              <span className="text-sm">{location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <CalendarDays className="h-4 w-4 shrink-0 text-brand-400" />
              <span className="text-sm">{dates}</span>
            </div>
          </div>

          {taglines.length > 0 && (
            <div className="mt-4 space-y-1.5">
              {taglines.map((tagline) => (
                <p
                  key={tagline}
                  className="text-sm italic leading-relaxed text-gray-400"
                >
                  &ldquo;{tagline}&rdquo;
                </p>
              ))}
            </div>
          )}

          <div className="mt-auto pt-6">
            <a
              href={`/events/${id}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-400 transition-colors duration-200 hover:text-brand-300"
            >
              Learn More
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
