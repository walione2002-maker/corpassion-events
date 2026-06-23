'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  GraduationCap,
  Users,
  Building2,
  Monitor,
  ArrowUpRight,
} from 'lucide-react';

const services = [
  {
    icon: GraduationCap,
    title: 'Master Classes',
    description: 'Specialized, in-depth learning for executives.',
    span: 'md:col-span-2',
    featured: true,
  },
  {
    icon: Users,
    title: 'Conferences',
    description: 'Large-scale knowledge-sharing and networking platforms.',
    span: 'md:col-span-1',
    featured: false,
  },
  {
    icon: Building2,
    title: 'In-House Corporate Trainings',
    description: 'Fully customized onsite programs for your team.',
    span: 'md:col-span-1',
    featured: false,
  },
  {
    icon: Monitor,
    title: 'Online Sessions',
    description: 'Flexible, high-impact remote learning.',
    span: 'md:col-span-2',
    featured: true,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="services"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d14] to-[#0a0a0a]"
    >
      <div ref={sectionRef} className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.p
            variants={headingVariants}
            className="text-sm uppercase tracking-widest text-brand-400 font-medium"
          >
            Our Services
          </motion.p>

          <motion.h2
            variants={headingVariants}
            className="mt-4 text-4xl md:text-5xl font-display font-bold tracking-tight text-white"
          >
            Find the right room to be in.
          </motion.h2>

          <motion.p
            variants={headingVariants}
            className="text-lg text-gray-400 max-w-2xl mt-4"
          >
            From intimate masterclasses to large-scale conferences, we deliver
            learning experiences that transform careers.
          </motion.p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:-translate-y-1 hover:border-brand-400/30 transition-all duration-300 overflow-hidden ${service.span}`}
              >
                {/* Gradient accent for featured cards */}
                {service.featured && (
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-600/10 via-transparent to-transparent pointer-events-none" />
                )}

                <div className="relative z-10">
                  <div className="rounded-xl bg-brand-600/20 p-3 w-fit">
                    <Icon className="w-6 h-6 text-brand-400" />
                  </div>

                  <h3 className="mt-5 text-xl font-display font-semibold text-white tracking-tight">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-gray-400">{service.description}</p>
                </div>

                {/* Arrow icon */}
                <div className="absolute bottom-6 right-6 opacity-0 translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 text-brand-400" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
