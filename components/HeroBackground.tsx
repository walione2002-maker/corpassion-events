'use client';

import React from 'react';

interface HeroBackgroundProps {
  image?: string; // Kept for backward compatibility but ignored for cleaner design
  opacity?: string;
}

export default function HeroBackground({ image, opacity }: HeroBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-slate-50 dark:bg-[#050505] transition-colors duration-500">
      {/* Animated Glowing Orbs */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-400/30 dark:bg-brand-500/20 blur-[100px] sm:blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob" 
      />
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-300/30 dark:bg-indigo-500/20 blur-[100px] sm:blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000" 
      />
      <div 
        className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-fuchsia-300/30 dark:bg-fuchsia-500/20 blur-[100px] sm:blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000" 
      />
      
      {/* Clean Subtle Grid */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          color: 'var(--tw-text-opacity) 1 ? rgba(129, 140, 248, 1) : rgba(129, 140, 248, 0.5)'
        }}
      />
      
      {/* Vignette / Fade at bottom to blend with next section */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent dark:from-[#050505] opacity-100" />
      
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
