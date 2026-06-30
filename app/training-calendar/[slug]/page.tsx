import { notFound } from 'next/navigation';
import { mockTrainingEvents } from '@/data/training';
import { MapPin, CalendarDays, Layout, CheckCircle2 } from 'lucide-react';

interface TrainingEventPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return mockTrainingEvents.map((event) => ({
    slug: event.id,
  }));
}

export default function TrainingEventPage({ params }: TrainingEventPageProps) {
  const event = mockTrainingEvents.find((e) => e.id === params.slug);

  if (!event) {
    notFound();
  }

  const isCompleted = event.status === 'Completed';

  // Format Dates
  let startDay = '00', endDay = '00', monthStr = 'XXX', year = 2026;
  try {
    const start = new Date(event.startDate);
    const end = new Date(event.endDate);
    startDay = start.getDate().toString().padStart(2, '0');
    endDay = end.getDate().toString().padStart(2, '0');
    monthStr = start.toLocaleString('default', { month: 'long' });
    year = start.getFullYear();
  } catch (e) {
    console.error("Invalid date parsing", e);
  }
  const dateStr = startDay === endDay ? `${startDay} ${monthStr} ${year}` : `${startDay} - ${endDay} ${monthStr} ${year}`;

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-24 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {isCompleted ? (
              <span className="flex items-center px-4 py-1.5 text-sm font-semibold bg-zinc-800/80 text-zinc-300 rounded-full border border-zinc-700">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Completed
              </span>
            ) : (
              <span className="px-4 py-1.5 text-sm font-semibold bg-brand-500/10 text-brand-400 rounded-full border border-brand-500/20">
                Upcoming Event
              </span>
            )}
            <span className="flex items-center text-sm font-medium text-zinc-400 bg-zinc-900/50 px-4 py-1.5 rounded-full border border-zinc-800">
              <Layout className="w-4 h-4 mr-2" />
              {event.format} Training
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight leading-tight">
            {event.title}
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 text-zinc-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center border border-brand-500/20 text-brand-400">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-zinc-500 font-medium">Location</p>
                <p className="text-lg font-semibold">{event.venue}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center border border-brand-500/20 text-brand-400">
                <CalendarDays className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-zinc-500 font-medium">Date</p>
                <p className="text-lg font-semibold">{dateStr}</p>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-16 py-16 px-6 sm:px-12 bg-zinc-900/40 border border-zinc-800/60 rounded-3xl backdrop-blur-md flex flex-col items-center justify-center text-center">
          {isCompleted ? (
            <>
              <h2 className="text-3xl font-display font-bold text-white mb-4">
                Training Concluded
              </h2>
              <p className="text-zinc-400 max-w-lg mb-8">
                This training event has successfully concluded. Stay tuned for future cohorts and new training schedules.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-display font-bold text-white mb-4">
                Registration Opens Soon
              </h2>
              <p className="text-zinc-400 max-w-lg mb-8">
                The detailed syllabus, instructor profiles, and registration options for this training module will be announced shortly.
              </p>
              <button className="px-8 py-4 bg-white hover:bg-zinc-200 text-black font-semibold rounded-xl transition-all active:scale-95">
                Notify Me When Open
              </button>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
