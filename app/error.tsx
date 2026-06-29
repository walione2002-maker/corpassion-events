'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application crashed:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md w-full space-y-6">
        <div className="mx-auto w-20 h-20 bg-red-500/10 flex items-center justify-center rounded-full">
          <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h2 className="text-3xl font-display font-bold text-white tracking-tight">
          Oops, something went wrong!
        </h2>
        
        <p className="text-slate-400">
          We encountered an unexpected error. Our engineering team has been notified.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-3 bg-brand-400 text-slate-950 font-semibold rounded-lg hover:bg-brand-300 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
