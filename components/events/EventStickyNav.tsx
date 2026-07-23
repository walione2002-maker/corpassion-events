'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'agenda', label: 'Agenda' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'sponsorship', label: 'Exhibit & Sponsor' },
];

export default function EventStickyNav() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  useEffect(() => {
    const handleScroll = () => {
      let current = '';
      for (const tab of tabs) {
        const element = document.getElementById(tab.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust threshold based on layout (e.g. sticky header height)
          if (rect.top <= 100) {
            current = tab.id;
          }
        }
      }
      if (current) {
        setActiveTab(current);
      } else if (window.scrollY < 200) {
        setActiveTab(tabs[0].id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="sticky top-[64px] z-50 bg-white/80 dark:bg-[#050505]/80 backdrop-blur border-b border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-8 overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              className={`relative py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-brand-600 dark:text-brand-400'
                  : 'text-slate-500 hover:text-slate-800 dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-600 dark:bg-brand-400"
                />
              )}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
