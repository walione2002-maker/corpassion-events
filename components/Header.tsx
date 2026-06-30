'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { navLinks } from '@/data/events';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 ${
        scrolled ? 'shadow-lg shadow-black/10 dark:shadow-black/40' : ''
      }`}
    >
      <nav className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-0 shrink-0">
            <span className="font-display text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Corpassion
            </span>
            <span className="font-display text-xl font-bold text-brand-500 dark:text-brand-400">
              .
            </span>
            {pathname !== '/' && (
              <span className="text-xl font-normal text-slate-500 dark:text-gray-400 ml-1">
                Events
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              link.label === 'Register' ? (
                <Link
                  key={link.label}
                  href="/events"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200 relative group flex items-center gap-2"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-400 transition-all duration-300 group-hover:w-full" />
                </Link>
              ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200 relative group flex items-center gap-2"
              >
                {link.label}
                {(link as any).isNew && (
                  <span className="px-1.5 py-0.5 rounded-full bg-brand-400/10 text-brand-400 text-[10px] font-bold tracking-wider uppercase">
                    New
                  </span>
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-400 transition-all duration-300 group-hover:w-full" />
              </Link>
              )
            ))}
          </div>

          {/* Desktop CTA & Theme Toggle */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/events"
              className="rounded-full bg-brand-400 text-slate-950 px-6 py-2.5 text-sm font-semibold transition-all duration-300 hover:bg-brand-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] active:scale-[0.98]"
            >
              Register Now
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden relative z-50 p-2 text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col items-center justify-center min-h-screen gap-6">
              {navLinks.map((link, i) => (
                link.label === 'Register' ? (
                <Link
                  key={link.label}
                  href="/events"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-2xl font-display font-medium text-slate-600 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                  >
                    {link.label}
                  </motion.span>
                </Link>
                ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-2xl font-display font-medium text-slate-600 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                  >
                    {link.label}
                  </motion.span>
                  {(link as any).isNew && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.05 * i + 0.1 }}
                      className="px-2 py-1 rounded-full bg-brand-400/10 text-brand-400 text-xs font-bold tracking-wider uppercase"
                    >
                      New
                    </motion.span>
                  )}
                </Link>
                )
              ))}
              <Link
                href="/events"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-6 rounded-full bg-brand-400 text-slate-950 px-8 py-3 text-lg font-semibold transition-all duration-300 hover:bg-brand-300"
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * navLinks.length, duration: 0.3 }}
                >
                  Register Now
                </motion.span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
