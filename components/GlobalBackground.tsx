'use client';

import React from 'react';

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-50] transition-colors duration-500">
      {/* High-Performance Glowing Orbs (using radial gradients instead of heavy CSS blur/mix-blend) */}
      <div 
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.15)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.12)_0%,transparent_70%)] md:animate-blob" 
      />
      <div 
        className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-[radial-gradient(circle_at_center,rgba(165,180,252,0.15)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12)_0%,transparent_70%)] md:animate-blob animation-delay-2000" 
      />
      <div 
        className="absolute top-[10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle_at_center,rgba(240,171,252,0.15)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.12)_0%,transparent_70%)] md:animate-blob animation-delay-4000" 
      />
      
      {/* Clean Subtle Grid */}
      <div
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          color: 'var(--tw-text-opacity) 1 ? rgba(129, 140, 248, 1) : rgba(129, 140, 248, 0.8)'
        }}
      />
      
      {/* Fade at bottom edges to keep it from feeling bounded */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-transparent to-transparent dark:from-black opacity-100" />
      
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
          animation: blob 15s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 5s;
        }
        .animation-delay-4000 {
          animation-delay: 10s;
        }
      `}</style>
    </div>
  );
}
