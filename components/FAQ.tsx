'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqCategories } from '@/data/events';
import Script from 'next/script';

// Build Schema.org FAQPage JSON-LD
function buildFaqSchema() {
  const allItems = faqCategories.flatMap((cat) =>
    cat.items.map((item) => ({
      '@type': 'Question' as const,
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: item.answer,
      },
    }))
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allItems,
  };
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openItem, setOpenItem] = useState<number | null>(null);

  const handleCategoryChange = (index: number) => {
    setActiveCategory(index);
    setOpenItem(null); // Reset open item when switching categories
  };

  const handleToggle = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  const currentCategory = faqCategories[activeCategory];
  const faqSchema = buildFaqSchema();

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        strategy="afterInteractive"
      />

      <section id="faq" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent">
        {/* Background decoration */}
        <div className="hidden md:block pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-brand-600/5 blur-[150px]" />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center mb-12"
          >
            <span className="inline-block rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-medium tracking-wider text-brand-700 dark:text-brand-400 uppercase mb-4">
              Support
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-slate-900 dark:text-white">
              Frequently Asked{' '}
              <span className="gradient-text">Questions</span>
            </h2>
            <p className="mt-4 text-slate-800 dark:text-gray-400">
              Everything you need to know about attending, sponsoring, or exhibiting at our summits.
            </p>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center gap-2 mb-10"
          >
            {faqCategories.map((cat, index) => (
              <button
                key={cat.category}
                onClick={() => handleCategoryChange(index)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  activeCategory === index
                    ? 'text-white'
                    : 'text-slate-800 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-200'
                }`}
              >
                {activeCategory === index && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full bg-brand-500"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{cat.category}</span>
              </button>
            ))}
          </motion.div>

          {/* Accordion Items */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-3"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                {currentCategory.items.map((item, index) => {
                  const isOpen = openItem === index;

                  return (
                    <div
                      key={`${activeCategory}-${index}`}
                      className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-sm overflow-hidden transition-colors hover:border-slate-300 dark:hover:border-white/15"
                    >
                      <button
                        onClick={() => handleToggle(index)}
                        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                        aria-expanded={isOpen}
                      >
                        <span className="text-sm md:text-base font-medium text-slate-900 dark:text-white pr-4">
                          {item.question}
                        </span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="flex-shrink-0"
                        >
                          <ChevronDown className="h-5 w-5 text-brand-700 dark:text-brand-400" />
                        </motion.div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                              opacity: { duration: 0.25, delay: 0.05 },
                            }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-5 pt-0">
                              <div className="h-px bg-gradient-to-r from-brand-500/30 via-slate-200 dark:via-white/10 to-transparent mb-4" />
                              <p className="text-sm leading-relaxed text-slate-800 dark:text-gray-400">
                                {item.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
