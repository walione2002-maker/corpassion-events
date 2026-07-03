import { notFound } from 'next/navigation';
import { events } from '@/data/events';
import EventHero from '@/components/events/EventHero';
import dynamic from 'next/dynamic';
import Image from 'next/image';

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

  // Render these sections if the event is set to have registration open (all current events do)
  const isRegistrationOpen = event.registrationOpen !== false;

  return (
    <main className="relative bg-transparent">
      {/* Faded Background Image specific to Event Detail Page */}
      <div className="absolute inset-0 z-[-1] opacity-[0.20] dark:opacity-[0.35] pointer-events-none mix-blend-luminosity">
        <Image 
          src={event.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=2000&auto=format&fit=crop"}
          alt="Event Background"
          fill
          className="object-cover"
        />
      </div>

      <EventHero event={event} />
      
      {isRegistrationOpen ? (
        <>
          <AgendaTabs eventId={event.id} />
          <PricingCards eventId={event.id} currency={event.currency} />
          <SponsorshipHub eventId={event.id} currency={event.currency} />
        </>
      ) : (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-transparent min-h-[50vh] flex items-center justify-center">
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
