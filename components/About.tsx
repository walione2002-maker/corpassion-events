'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Zap, Brain, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Expert Trainers',
    description: 'Industry veterans with proven track records.',
  },
  {
    icon: Zap,
    title: 'Seamless Delivery',
    description: 'Flawless execution, online or on-site.',
  },
  {
    icon: Brain,
    title: 'AI-Integrated',
    description: 'Curriculum updated for the modern technological landscape.',
  },
  {
    icon: TrendingUp,
    title: 'Proven Impact',
    description: 'Actionable insights that drive corporate ROI.',
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

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8">
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
            About Us
          </motion.p>

          <motion.h2
            variants={headingVariants}
            className="mt-4 text-4xl md:text-5xl font-display font-bold tracking-tight text-white"
          >
            Built for the people building what&apos;s next.
          </motion.h2>

          <motion.p
            variants={headingVariants}
            className="text-lg text-gray-400 max-w-3xl mt-6"
          >
            We specialize in delivering high-impact corporate training solutions
            designed for real growth. Whether in Automotive, Finance, Healthcare,
            HR, or Legal, our expert trainers ensure seamless delivery and proven
            impact for your leadership teams.
          </motion.p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="rounded-xl bg-brand-600/20 p-3 w-fit">
                  <Icon className="w-6 h-6 text-brand-400" />
                </div>
                <h3 className="mt-5 text-xl font-display font-semibold text-white tracking-tight">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-400">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
