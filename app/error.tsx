'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 relative z-10">
      <GlassCard className="max-w-md w-full p-8 text-center space-y-6">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
          <RefreshCcw className="w-8 h-8 text-red-500" />
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-2">Something went wrong!</h2>
          <p className="text-slate-500 dark:text-slate-400">
            An unexpected error occurred while loading this page. Our team has been notified.
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <Button onClick={() => reset()} className="w-full">
            Try again
          </Button>
          <Link href="/">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return Home
            </Button>
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}
