 'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Settings as SettingsIcon, Monitor, Sun, Moon, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-brand-500/10 rounded-xl">
              <SettingsIcon className="w-6 h-6 text-brand-600 dark:text-brand-400" />
            </div>
            <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">
              Settings
            </h1>
          </div>
          <p className="text-slate-600 dark:text-gray-400">
            Manage your application preferences and appearance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-6 sm:p-8"
        >
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
            Appearance
          </h2>
          
          <div className="space-y-4">
            <button
              onClick={() => setTheme('system')}
              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                theme === 'system'
                  ? 'bg-brand-50 dark:bg-brand-500/10 border-brand-300 dark:border-brand-500/30'
                  : 'bg-white dark:bg-black border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-4">
                <Monitor className={`w-5 h-5 ${theme === 'system' ? 'text-brand-600 dark:text-brand-400' : 'text-slate-500 dark:text-gray-400'}`} />
                <span className={`font-medium ${theme === 'system' ? 'text-brand-900 dark:text-brand-100' : 'text-slate-700 dark:text-gray-300'}`}>
                  System Default
                </span>
              </div>
              {theme === 'system' && <Check className="w-5 h-5 text-brand-600 dark:text-brand-400" />}
            </button>

            <button
              onClick={() => setTheme('light')}
              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                theme === 'light'
                  ? 'bg-brand-50 dark:bg-brand-500/10 border-brand-300 dark:border-brand-500/30'
                  : 'bg-white dark:bg-black border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-4">
                <Sun className={`w-5 h-5 ${theme === 'light' ? 'text-brand-600 dark:text-brand-400' : 'text-slate-500 dark:text-gray-400'}`} />
                <span className={`font-medium ${theme === 'light' ? 'text-brand-900 dark:text-brand-100' : 'text-slate-700 dark:text-gray-300'}`}>
                  Light Mode
                </span>
              </div>
              {theme === 'light' && <Check className="w-5 h-5 text-brand-600 dark:text-brand-400" />}
            </button>

            <button
              onClick={() => setTheme('dark')}
              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-brand-50 dark:bg-brand-500/10 border-brand-300 dark:border-brand-500/30'
                  : 'bg-white dark:bg-black border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-4">
                <Moon className={`w-5 h-5 ${theme === 'dark' ? 'text-brand-600 dark:text-brand-400' : 'text-slate-500 dark:text-gray-400'}`} />
                <span className={`font-medium ${theme === 'dark' ? 'text-brand-900 dark:text-brand-100' : 'text-slate-700 dark:text-gray-300'}`}>
                  Dark Mode
                </span>
              </div>
              {theme === 'dark' && <Check className="w-5 h-5 text-brand-600 dark:text-brand-400" />}
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
