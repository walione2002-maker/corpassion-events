import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  gradient?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, gradient = false, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-3xl backdrop-blur-md border",
          gradient 
            ? "bg-gradient-to-br from-white/10 to-white/5 dark:from-black/40 dark:to-black/20 border-white/20 dark:border-white/10"
            : "bg-white/50 dark:bg-black/40 border-white/20 dark:border-white/10",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';
