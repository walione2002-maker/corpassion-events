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
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
        >
          {/* Column 1 — Brand (3 cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <div className="font-display text-xl font-bold text-white">
              Corpassion<span className="text-brand-400">.</span>{' '}
              {pathname !== '/' && <span className="text-gray-400">Events</span>}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray-500 max-w-sm">
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

          {/* Column 2 — Quick Links (2 cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
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

          {/* Column 3 — Legal (2 cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
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

          {/* Column 4 — Contact Us Glass Card (4 cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <div className="bg-white/5 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 relative overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_40px_rgba(34,211,238,0.1)] transition-all duration-500 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-brand-400 relative z-10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
                Contact Us
              </h3>
              
              <ul className="space-y-5 relative z-10">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-brand-500/70" />
                  <div>
                    <span className="block text-xs font-semibold text-gray-400 uppercase mb-1">Primary Office</span>
                    <span className="text-sm leading-snug text-gray-300 block">
                      Office No1 Mezzanine floor Siddiqui Bridge View plot no 3 Main Road Nazimabad no 3 Karachi 74600 Pakistan
                    </span>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-brand-500/70" />
                  <div>
                    <span className="block text-xs font-semibold text-gray-400 uppercase mb-1">Regional Office</span>
                    <span className="text-sm leading-snug text-gray-300 block">
                      Office 22 Hashtag Business Center Bin Ham Diera Dubai UAE
                    </span>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <Phone className="mt-1 h-4 w-4 shrink-0 text-brand-500/70" />
                  <div>
                    <span className="block text-xs font-semibold text-gray-400 uppercase mb-1">Phone & WhatsApp</span>
                    <span className="text-sm text-gray-300 block">+92 309 1020225</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Mail className="mt-1 h-4 w-4 shrink-0 text-brand-500/70" />
                  <div>
                    <span className="block text-xs font-semibold text-gray-400 uppercase mb-1">Emails</span>
                    <div className="flex flex-col gap-1">
                      <a href="mailto:training@corpassionevent.com" className="text-sm text-brand-400 hover:text-brand-300 transition-colors">
                        training@corpassionevent.com
                      </a>
                      <a href="mailto:info@corpassionevent.com" className="text-sm text-brand-400 hover:text-brand-300 transition-colors">
                        info@corpassionevent.com
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
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
