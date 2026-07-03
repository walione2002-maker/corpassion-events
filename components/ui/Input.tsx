import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full relative">
        <input
          ref={ref}
          className={cn(
            "w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/20 border transition-all duration-200 outline-none backdrop-blur-md",
            error 
              ? "border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-red-900 dark:text-red-200 placeholder:text-red-500/50" 
              : "border-slate-200 dark:border-white/10 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-white/40",
            className
          )}
          {...props}
        />
        {error && (
          <p className="absolute -bottom-6 left-1 text-sm text-red-500 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
