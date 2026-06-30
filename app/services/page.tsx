import WhyAttend from '@/components/WhyAttend';
import Services from '@/components/Services';

export const metadata = {
  title: 'Services & Value Proposition',
  description: 'Explore why Corpassion Events is the premier platform for enterprise AI transformation and discover the comprehensive services we offer.',
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-slate-900 dark:text-white mb-6">
          Our Value Proposition
        </h1>
        <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore why Corpassion Events is the premier platform for enterprise AI transformation and discover the comprehensive services we offer to our global partners.
        </p>
      </div>
      
      <WhyAttend />
      
      <div className="py-12" />
      
      <Services />
    </main>
  );
}
