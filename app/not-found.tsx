import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
      {/* Radial gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)]" />

      {/* Animated grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(129,140,248,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(129,140,248,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 text-center px-4">
        <h1 className="text-8xl md:text-9xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600 mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-white mb-6">
          Page Not Found
        </h2>
        <p className="text-gray-400 max-w-md mx-auto mb-10 text-lg">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-500 to-brand-600 text-white px-8 py-3 text-lg font-medium transition-all duration-300 hover:shadow-[0_0_24px_rgba(99,102,241,0.5)] hover:brightness-110 active:scale-[0.97]"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
