'use client';

import React from 'react';

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-50] transition-colors duration-500 bg-white dark:bg-[#050505]">
      {/* 
        Background colors, orbs, grid lines, and bottom edge fades 
        have been removed per user request. 
        Only the solid background color remains.
      */}
    </div>
  );
}
