'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4 text-center">
          <div className="max-w-md w-full space-y-6">
            <h2 className="text-3xl font-bold text-white">Critical Error</h2>
            <p className="text-gray-400">
              The application encountered a critical error. We apologize for the inconvenience.
            </p>
            <button
              onClick={() => reset()}
              className="px-6 py-3 bg-brand-400 text-slate-950 font-semibold rounded-lg hover:bg-brand-300 transition-colors"
            >
              Restart Application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
