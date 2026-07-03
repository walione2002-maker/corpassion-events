import { notFound } from 'next/navigation';

interface LegalPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return [
    { slug: 'terms' },
    { slug: 'privacy' },
    { slug: 'code-of-conduct' },
    { slug: 'refund' },
  ];
}

const titles: Record<string, string> = {
  'terms': 'Terms & Conditions',
  'privacy': 'Privacy Policy',
  'code-of-conduct': 'Code of Conduct',
  'refund': 'Refund Policy',
};

export default function LegalPage({ params }: LegalPageProps) {
  const title = titles[params.slug];

  if (!title) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-transparent pt-32 pb-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">
          {title}
        </h1>
        <div className="p-8 sm:p-12 rounded-3xl bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-lg">
          <p className="text-slate-600 dark:text-zinc-400 text-lg leading-relaxed mb-6">
            This document is currently being updated by our legal team.
          </p>
          <p className="text-slate-600 dark:text-zinc-400 text-lg leading-relaxed">
            Please check back soon for the complete {title.toLowerCase()}. If you have any immediate concerns, please feel free to contact our support team.
          </p>
        </div>
      </div>
    </main>
  );
}
