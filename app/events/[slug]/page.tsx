import { notFound } from 'next/navigation';
import { events } from '@/data/events';
import EventHero from '@/components/events/EventHero';
import dynamic from 'next/dynamic';

const AgendaTabs = dynamic(() => import('@/components/summit/AgendaTabs'), { ssr: true });
const PricingCards = dynamic(() => import('@/components/pricing/PricingCards'), { ssr: true });
const SponsorshipHub = dynamic(() => import('@/components/pricing/SponsorshipHub'), { ssr: true });

interface EventPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all known events
export function generateStaticParams() {
  return events.map((event) => ({
    slug: event.id,
  }));
}

export default function EventPage({ params }: EventPageProps) {
  const event = events.find((e) => e.id === params.slug);

  if (!event) {
    notFound();
  }

  // Right now, our deep-dive data (agenda, pricing, sponsorship) is specific
  // to the flagship Dubai AI Summit. In a real app, we'd check if the event
  // has this data before rendering these sections.
  const isFlagship = event.flagship;

  return (
    <main>
      <EventHero event={event} />
      
      {isFlagship ? (
        <>
          <AgendaTabs />
          <PricingCards />
          <SponsorshipHub />
        </>
      ) : (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] min-h-[50vh] flex items-center justify-center">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Registration Opens Soon
            </h2>
            <p className="text-gray-400">
              Detailed agenda and pricing information for this event will be announced shortly. Please check back later or subscribe to our newsletter for updates.
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
