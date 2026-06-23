'use client';

import { motion } from 'framer-motion';
import { Linkedin, Twitter, Instagram, MapPin, Phone, Mail } from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
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

export default function Footer() {
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
          {/* Col 1 — Brand */}
          <motion.div variants={itemVariants}>
            <div className="font-display text-xl font-bold text-white">
              Corpassion<span className="text-brand-400">.</span>{' '}
              <span className="text-gray-400">Events</span>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Transforming corporate potential through expert-led training and
              masterclasses.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          {/* Col 2 — Head Office */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Head Office
            </h3>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
              <span className="text-sm text-gray-400">
                Office no. 6 Society Building, PECHS Block-2, Karachi, Pakistan
              </span>
            </div>
          </motion.div>

          {/* Col 3 — Contact (Pakistan) */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contact (Pakistan)
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-gray-500" />
                <span className="text-sm text-gray-400">+92 309 1020225</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-gray-500" />
                <span className="text-sm text-gray-400">+92 332 4800005</span>
              </li>
            </ul>
          </motion.div>

          {/* Col 4 — Contact (Dubai) & Email */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contact (Dubai)
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-gray-500" />
                <span className="text-sm text-gray-400">+971 543770146</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-gray-500" />
                <span className="text-sm text-gray-400">+971 554738180</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-gray-500" />
                <a
                  href="mailto:training@corpassionevent.com"
                  className="text-sm text-brand-400 transition-colors hover:text-brand-300"
                >
                  training@corpassionevent.com
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <span className="text-sm text-gray-500">
            Designed &amp; Developed by Logic Box
          </span>
          <span className="text-sm text-gray-500">
            Copyright © 2026 Corpassion Events. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
