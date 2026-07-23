'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, X } from 'lucide-react';
import { events } from '@/data/events';

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has dismissed it
    const dismissed = sessionStorage.getItem('announcement-dismissed');
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(false);
    sessionStorage.setItem('announcement-dismissed', 'true');
  };

  if (!isVisible) return null;

  // Find next upcoming event
  const now = new Date();
  const upcomingEvents = events
    .filter(e => e.registrationOpen && e.startDate && new Date(e.startDate) > now)
    .sort((a, b) => new Date(a.startDate!).getTime() - new Date(b.startDate!).getTime());
    
  const nextEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : events.find(e => e.registrationOpen);

  if (!nextEvent) return null;

  // Truncate title for banner
  const shortTitle = nextEvent.title.replace('AI FOR NON-TECHNICAL LEADERS SUMMIT & SOLUTIONS SHOWCASE', 'Dubai AI Summit').replace('Enterprise AI & Workforce Transformation Summit Europe', 'Amsterdam Enterprise AI');

  return (
    <div className="overflow-hidden border-b border-white/[0.06] bg-[#0a0a14] relative z-[110]">
      <Link
        href={`/events/${nextEvent.id}`}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 group flex h-10 items-center justify-center gap-2 text-xs font-medium text-slate-300 transition-colors hover:text-white"
      >
        <span className="hidden font-semibold uppercase tracking-[0.14em] text-brand-300 sm:inline shrink-0">
          Next summit
        </span>
        <span className="hidden h-3 w-px bg-white/15 sm:block shrink-0" aria-hidden="true" />
        <span className="truncate">
          {shortTitle} &middot; {nextEvent.location} &middot; {nextEvent.dates}
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 font-semibold text-brand-300 group-hover:text-brand-200">
          Register
          <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
      <button 
        onClick={handleClose}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-slate-500 hover:text-slate-300 transition-colors rounded-full hover:bg-white/10"
        aria-label="Dismiss announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
