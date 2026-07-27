import { notFound } from 'next/navigation';
import { events } from '@/data/events';
import EventHero from '@/components/events/EventHero';
import EventStickyNav from '@/components/events/EventStickyNav';
import EventOverview from '@/components/events/EventOverview';
import EventHighlights from '@/components/events/EventHighlights';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import type { Metadata } from 'next';

const AgendaTabs = dynamic(() => import('@/components/summit/AgendaTabs'), { ssr: true });
const PricingCards = dynamic(() => import('@/components/pricing/PricingCards'), { ssr: true });
const SponsorshipHub = dynamic(() => import('@/components/pricing/SponsorshipHub'), { ssr: true });

interface EventPageProps {
  params: {
    slug: string;
  };
}

export function generateMetadata({ params }: EventPageProps): Metadata {
  const event = events.find((e) => e.id === params.slug);
  
  if (!event) return {};

  return {
    title: event.title,
    description: event.description || event.taglines[0],
    openGraph: {
      title: event.title,
      description: event.description || event.taglines[0],
      url: `https://corpassion-events.vercel.app/events/${event.id}`,
      images: [
        {
          url: event.image,
          width: 1200,
          height: 630,
        }
      ],
    }
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

  const eventJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: event.startDate,
    endDate: event.endDate,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: event.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.location.split(',')[0].trim(),
        addressCountry: event.location.split(',')[1]?.trim() || '',
      },
    },
    image: [event.image],
    description: event.description || event.taglines[0],
    offers: {
      '@type': 'Offer',
      url: `https://corpassion-events.vercel.app/events/${event.id}#pricing`,
      price: event.startingPrice,
      priceCurrency: event.currency === '€' ? 'EUR' : 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
    },
    organizer: {
      '@type': 'Organization',
      name: 'Corpassion Events',
      url: 'https://corpassion-events.vercel.app',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://corpassion-events.vercel.app/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Events',
        item: 'https://corpassion-events.vercel.app/events',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: event.title,
        item: `https://corpassion-events.vercel.app/events/${event.id}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      
      <main className="relative bg-transparent">
        {/* Faded Background Image specific to Event Detail Page */}
        <div className="absolute inset-0 z-[-1] opacity-[0.40] dark:opacity-[0.35] pointer-events-none">
          <Image 
            src={event.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=3840&h=2160&q=100&fit=crop&auto=format&fit=crop"}
            alt="Event Background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <EventHero event={event} />
        
        {isRegistrationOpen ? (
          <>
            <EventStickyNav />
            <EventOverview event={event} />
            <EventHighlights event={event} />
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
    </>
  );
}
