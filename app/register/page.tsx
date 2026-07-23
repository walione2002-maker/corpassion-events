import { events } from '@/data/events';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarDays, MapPin, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register for an Event | Corpassion Events',
  description: 'Select an upcoming event to secure your delegate pass, exhibition booth, or sponsorship package.',
};

export default function RegisterPage() {
  const openEvents = events.filter((e) => e.registrationOpen);

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-24 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 z-[-1] bg-slate-50 dark:bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-sm tracking-widest text-brand-700 dark:text-brand-400 uppercase font-medium">
            Registration
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mt-4 tracking-tight">
            Select an Event
          </h1>
          <p className="mt-4 text-slate-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Choose from our upcoming summits to view pricing, book your tickets, or secure your sponsorship package.
          </p>
        </div>

        {openEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {openEvents.map((event) => (
              <Link 
                key={event.id}
                href={`/events/${event.id}#pricing`}
                className="group relative flex flex-col bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden hover:shadow-[0_20px_50px_rgba(167,139,250,0.15)] transition-all duration-300 hover:-translate-y-2 hover:border-brand-500/50"
              >
                {/* Event Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 bg-brand-500/90 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-full">
                    Registration Open
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-4 line-clamp-2">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-3 mb-8 flex-grow">
                    <div className="flex items-center gap-3 text-slate-600 dark:text-gray-400 text-sm">
                      <MapPin className="w-4 h-4 shrink-0 text-brand-500" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 dark:text-gray-400 text-sm">
                      <CalendarDays className="w-4 h-4 shrink-0 text-brand-500" />
                      <span>{event.dates}</span>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between text-brand-600 dark:text-brand-400 font-semibold group-hover:text-brand-500 transition-colors">
                    <span>View Pricing</span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center p-12 bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl backdrop-blur-sm">
            <p className="text-slate-600 dark:text-gray-400 text-lg">
              There are currently no events open for registration. Please check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
