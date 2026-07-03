import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = "relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-brand-600 hover:bg-brand-500 text-white shadow-lg hover:shadow-brand-500/25 focus:ring-brand-500 py-3 px-6",
      secondary: "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm focus:ring-white/50 py-3 px-6",
      outline: "border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-900 dark:text-white py-3 px-6",
      ghost: "hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 py-2 px-4",
    };

    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        <span className={cn(isLoading && "opacity-0")}>{children}</span>
        {isLoading && <span className="absolute inset-0 flex items-center justify-center">{children}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
