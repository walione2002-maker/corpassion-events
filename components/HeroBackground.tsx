'use client';

import React from 'react';

interface HeroBackgroundProps {
  image: string;
  opacity?: string; // e.g. "opacity-40"
}

export default function HeroBackground({ image, opacity = "opacity-40" }: HeroBackgroundProps) {
  return (
    <>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt="Background"
          className={`w-full h-full object-cover ${opacity} object-center`}
        />
        {/* Adjusted gradient for higher visibility: less dark at the top, fading to #0a0a0a at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-[#0a0a0a]/70 to-[#0a0a0a]" />
      </div>

      {/* Radial gradient overlays */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.2)_0%,transparent_70%)] pointer-events-none" />

      {/* Animated grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(129,140,248,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(129,140,248,0.6) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          animation: 'gridDrift 20s linear infinite',
        }}
      />
      <style jsx>{`
        @keyframes gridDrift {
          0% {
            background-position: 0px 0px;
          }
          100% {
            background-position: 60px 60px;
          }
        }
      `}</style>
    </>
  );
}
