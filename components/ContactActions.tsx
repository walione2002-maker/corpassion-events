'use client';

import { useState } from 'react';
import { Phone, MessageCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactActions() {
  const [isOpen, setIsOpen] = useState(false);

  const numbers = [
    { country: 'UAE', phone: '+971543770146', display: '+971 543770146' },
    { country: 'PK', phone: '+923091020225', display: '+92 309 1020225' },
  ];

  const handleAction = (type: 'call' | 'whatsapp', phone: string) => {
    if (type === 'call') {
      window.location.href = `tel:${phone}`;
    } else {
      window.open(`https://wa.me/${phone.replace('+', '')}`, '_blank');
    }
    setIsOpen(false);
  };

  return (
    <div className="relative mt-5 w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-brand-600 hover:bg-brand-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-brand-500/20 active:scale-95"
      >
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <span>Chat or Call Now</span>
        </div>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-0 right-0 bottom-full mb-2 bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden shadow-2xl z-50"
          >
            <div className="p-2 space-y-2">
              {numbers.map((num) => (
                <div key={num.display} className="flex flex-col p-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  <span className="text-xs font-semibold text-slate-500 dark:text-gray-400 mb-2 uppercase tracking-wider">{num.country} Office</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAction('whatsapp', num.phone)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] rounded-md transition-colors text-sm font-semibold"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </button>
                    <button
                      onClick={() => handleAction('call', num.phone)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 rounded-md transition-colors text-sm font-semibold"
                    >
                      <Phone className="w-4 h-4" />
                      Call
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
