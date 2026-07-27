'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Settings as SettingsIcon, Phone } from 'lucide-react';
import Link from 'next/link';
import { navLinks, INavLink } from '@/data/events';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ROUTES } from '@/config/routes';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScrolled(window.scrollY > 20);
      }, 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Lock body scroll and trap focus when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-10 left-0 right-0 z-[100] transition-all duration-300 bg-white/95 dark:bg-[#050505]/95 md:bg-white/80 md:dark:bg-black/80 md:backdrop-blur-xl border-b border-slate-200 dark:border-white/5 ${
        scrolled ? 'shadow-lg shadow-black/10 dark:shadow-black/40' : ''
      }`}
    >
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[9999] focus:p-4 focus:bg-brand-500 focus:text-slate-900 focus:font-bold">
        Skip to content
      </a>
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-500 via-violet-400 to-indigo-400 origin-left z-[101]"
        style={{ scaleX }}
      />

      <nav className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 relative z-[100]">
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
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isEventsRoute = link.href === '/events' && pathname.startsWith('/events');
              const isActive = pathname === link.href || isEventsRoute;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 relative group flex items-center gap-2 ${
                    isActive
                      ? 'text-brand-500 dark:text-brand-400'
                      : 'text-slate-600 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                  {link.isNew && (
                    <span className="px-1.5 py-0.5 rounded-full bg-brand-400/10 text-brand-400 text-[10px] font-bold tracking-wider uppercase">
                      New
                    </span>
                  )}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-brand-400 transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA & Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="tel:+971543770146"
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">+971 54 377 0146</span>
            </a>
            <Link
              href="/settings"
              className="p-2 text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white transition-colors ml-2"
              aria-label="Settings"
            >
              <SettingsIcon className="w-5 h-5" />
            </Link>
            <ThemeToggle />
            <Link
              href={ROUTES.REGISTER}
              className="rounded-full bg-brand-400 text-slate-950 px-6 py-2.5 text-sm font-semibold transition-all duration-300 hover:bg-brand-300 hover:shadow-[0_0_20px_rgba(167,139,250,0.3)] active:scale-[0.98]"
            >
              Register Now
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative z-[110] p-2.5 text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        className={`fixed inset-0 z-[90] bg-white dark:bg-black lg:hidden overflow-y-auto transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="flex flex-col items-center justify-start min-h-screen gap-6 pt-24 pb-12 px-4">
          {navLinks.map((link) => (
            link.label === 'Register' ? (
            <Link
              key={link.label}
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 text-2xl font-display font-medium text-slate-600 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              <span>{link.label}</span>
            </Link>
            ) : (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 text-2xl font-display font-medium text-slate-600 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              <span>{link.label}</span>
              {link.isNew && (
                <span className="px-2 py-1 rounded-full bg-brand-400/10 text-brand-400 text-xs font-bold tracking-wider uppercase">
                  New
                </span>
              )}
            </Link>
            )
          ))}
          <Link
            href="/settings"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 text-2xl font-display font-medium text-slate-600 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white transition-colors mt-2"
          >
            <SettingsIcon className="w-6 h-6" />
            <span>Settings</span>
          </Link>

          <Link
            href={ROUTES.REGISTER}
            onClick={() => setMobileMenuOpen(false)}
            className="mt-6 rounded-full bg-brand-400 text-slate-950 px-8 py-3 text-lg font-semibold transition-all duration-300 hover:bg-brand-300"
          >
            <span>Register Now</span>
          </Link>

          {/* Theme Toggle for Mobile */}
          <div className="mt-8 flex flex-col items-center gap-4 border-t border-slate-200 dark:border-white/10 pt-8 w-full max-w-[200px]">
            <span className="text-sm font-medium text-slate-500">Appearance</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
