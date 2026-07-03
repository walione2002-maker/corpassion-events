'use client';

import { useMemo, useState } from 'react';
import TrainingHero from '@/components/training/TrainingHero';
import FilterBar, { FilterState } from '@/components/training/FilterBar';
import EventList from '@/components/training/EventList';
import { mockTrainingEvents } from '@/data/training';
import Image from 'next/image';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function formatMonthYear(dateString: string) {
  if (!dateString) return null;
  const parts = dateString.split('-');
  if (parts.length < 2) return null;
  const year = parts[0];
  const monthIndex = parseInt(parts[1], 10) - 1;
  if (isNaN(monthIndex) || monthIndex < 0 || monthIndex > 11) return null;
  return `${MONTH_NAMES[monthIndex]} ${year}`;
}

export default function TrainingCalendarPage() {
  const [filters, setFilters] = useState<FilterState>({
    month: '',
    search: '',
    venue: '',
    format: '',
  });

  // Derived available options from mock data
  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    mockTrainingEvents.forEach(event => {
      try {
        const monthYear = formatMonthYear(event.startDate);
        if (monthYear) {
          months.add(monthYear);
        }
      } catch (e) {
        console.error("Error parsing date", e);
      }
    });
    
    return Array.from(months).sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA.getTime() - dateB.getTime();
    });
  }, []);

  const availableVenues = useMemo(() => {
    return Array.from(new Set(mockTrainingEvents.map(e => e.venue))).filter(Boolean).sort();
  }, []);

  const availableFormats = useMemo(() => {
    return Array.from(new Set(mockTrainingEvents.map(e => e.format))).filter(Boolean).sort();
  }, []);

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return mockTrainingEvents.filter(event => {
      // Month Filter
      if (filters.month) {
        try {
          const eventMonthYear = formatMonthYear(event.startDate);
          if (eventMonthYear !== filters.month) return false;
        } catch (e) {
          return false;
        }
      }
      
      // Search Filter
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesTitle = event.title.toLowerCase().includes(query);
        const matchesVenue = event.venue.toLowerCase().includes(query);
        if (!matchesTitle && !matchesVenue) return false;
      }

      // Venue Filter
      if (filters.venue && event.venue !== filters.venue) return false;

      // Format Filter
      if (filters.format && event.format !== filters.format) return false;

      return true;
    }).sort((a, b) => {
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();
      return dateA - dateB;
    });
  }, [filters]);

  return (
    <main className="min-h-screen bg-transparent flex flex-col relative">
      {/* Faded Background Image */}
      <div className="absolute inset-0 z-[-1] opacity-[0.40] dark:opacity-[0.35] pointer-events-none mix-blend-luminosity">
        <Image 
          src="https://images.unsplash.com/photo-1560439513-74b037a25d84?w=3840&h=2160&q=100&fit=crop&auto=format&fit=crop" 
          alt="Training Background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <TrainingHero />
      <FilterBar 
        filters={filters} 
        setFilters={setFilters} 
        availableMonths={availableMonths}
        availableVenues={availableVenues}
        availableFormats={availableFormats}
      />
      <div className="flex-grow">
        <EventList 
          events={filteredEvents}
          setFilters={setFilters}
        />
      </div>
    </main>
  );
}
