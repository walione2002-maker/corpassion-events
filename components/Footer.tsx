'use client';

import { Linkedin, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/#about' },
  { label: 'Global Summits', href: '/#events' },
  { label: 'Meet the Speakers', href: '/events/dubai-ai-summit-2026#agenda' },
  { label: 'Become a Sponsor', href: '/events/dubai-ai-summit-2026#sponsorship' },
];

const legalLinks = [
  { label: 'Terms & Conditions', href: '#terms' },
  { label: 'Privacy Policy', href: '#privacy' },
  { label: 'Code of Conduct', href: '#code-of-conduct' },
  { label: 'Refund Policy', href: '#refund' },
];

const socialLinks = [
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
];

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer id="contact" className="border-t border-white/10 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {/* Column 1 — Brand */}
          <motion.div variants={itemVariants}>
            <div className="font-display text-xl font-bold text-white">
              Corpassion<span className="text-brand-400">.</span>{' '}
              {pathname !== '/' && <span className="text-gray-400">Events</span>}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray-500">
              Empowering global leaders through transformative AI summits and
              innovation conferences.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-all duration-300 hover:bg-brand-500/20 hover:text-brand-400 hover:scale-110"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Column 2 — Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors duration-200 hover:text-brand-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3 — Legal */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors duration-200 hover:text-brand-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4 — Contact Us */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
                <span className="text-sm leading-relaxed text-gray-400">
                  Office no. 6 Society Building, PECHS Block-2, Karachi, Pakistan
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-gray-500" />
                <a
                  href="mailto:info@corpassion-events.com"
                  className="text-sm text-brand-400 transition-colors duration-200 hover:text-brand-300"
                >
                  info@corpassion-events.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-gray-500" />
                <span className="text-sm text-gray-400">+971 543770146</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row"
        >
          <span className="text-sm text-gray-500 text-center sm:text-left">
            Copyright © 2026 Corpassion Events. All rights reserved.
          </span>
          <span className="text-sm text-gray-600">
            Built for global innovators.
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
