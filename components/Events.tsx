'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { CalendarDays, MapPin } from 'lucide-react';

const events = [
  {
    title: 'Treasury Risk Management 4.0 (AI-Driven)',
    duration: '3-Day Course',
    tag: 'Finance & AI',
    date: 'Aug 15-17, 2026',
    location: 'Dubai, UAE',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
  },
  {
    title: 'Power BI & AI: Empowering Smarter Decisions',
    duration: 'Masterclass',
    tag: 'Data Analytics',
    date: 'Sep 5, 2026',
    location: 'Karachi, Pakistan',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
  },
  {
    title: 'Financial Modeling with AI Integration',
    duration: 'Executive Session',
    tag: 'Corporate Finance',
    date: 'Oct 10-11, 2026',
    location: 'Abu Dhabi, UAE',
    image:
      'https://images.unsplash.com/photo-1504607798333-52a30db54a5d?w=800&h=500&fit=crop',
  },
  {
    title: 'Strategic HR & Talent Management in the AI Era',
    duration: '2-Day Summit',
    tag: 'Human Resources',
    date: 'Nov 20-21, 2026',
    location: 'Doha, Qatar',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop',
  },
];

export default function Events() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="events"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]"
    >
      <div ref={sectionRef} className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16"
        >
          <span className="text-sm tracking-widest text-brand-400 uppercase font-medium">
            Upcoming
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white mt-3">
            Upcoming Masterclasses &amp; Summits
          </h2>
        </motion.div>

        {/* Event Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                ease: 'easeOut',
                delay: 0.15 * index,
              }}
            >
              <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:border-brand-400/20">
                {/* Image */}
                <div className="relative h-52">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {/* Tag pill */}
                  <span className="absolute top-4 left-4 bg-brand-600/90 text-white text-xs font-medium rounded-full px-3 py-1">
                    {event.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-sm text-brand-400 font-medium">
                    {event.duration}
                  </p>
                  <h3 className="text-xl font-display font-semibold text-white mt-1">
                    {event.title}
                  </h3>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-3">
                    <span className="flex items-center gap-1.5 text-sm text-gray-400">
                      <CalendarDays className="w-4 h-4 text-gray-500" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm text-gray-400">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      {event.location}
                    </span>
                  </div>

                  <a
                    href="#"
                    className="inline-block text-brand-400 hover:text-brand-300 text-sm font-medium mt-4 transition-colors duration-200"
                  >
                    Learn More →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
