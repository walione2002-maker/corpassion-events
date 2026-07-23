'use client';

import { useState, useRef, useEffect } from 'react';
import { Share2, Link, Twitter, Linkedin, MessageCircle, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareButtonProps {
  className?: string;
}

export default function ShareButton({ className = '' }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsOpen(false);
  };

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(document.title);
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${text}%20${url}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${text}&body=Check out this event: ${url}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-colors w-full sm:w-auto backdrop-blur ${className}`}
      >
        <Share2 className="w-5 h-5" />
        <span>Share</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-48 rounded-xl bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 shadow-xl overflow-hidden z-50 origin-top"
          >
            <div className="p-1 flex flex-col">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors w-full text-left"
              >
                <Link className="w-4 h-4" />
                Copy Link
              </button>
              <div className="h-px bg-slate-200 dark:bg-white/10 my-1 mx-2" />
              <button
                onClick={() => handleShare('twitter')}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors w-full text-left"
              >
                <Twitter className="w-4 h-4" />
                X / Twitter
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors w-full text-left"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </button>
              <button
                onClick={() => handleShare('whatsapp')}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors w-full text-left"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </button>
              <button
                onClick={() => handleShare('email')}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors w-full text-left"
              >
                <Mail className="w-4 h-4" />
                Email
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
