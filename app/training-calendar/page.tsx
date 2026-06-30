'use client';

import { useMemo, useState } from 'react';
import TrainingHero from '@/components/training/TrainingHero';
import FilterBar, { FilterState } from '@/components/training/FilterBar';
import EventList from '@/components/training/EventList';
import { mockTrainingEvents } from '@/data/training';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
        const date = new Date(event.startDate);
        if (!isNaN(date.getTime())) {
          const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
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
          const eventDate = new Date(event.startDate);
          const eventMonthYear = eventDate.toLocaleString('default', { month: 'long', year: 'numeric' });
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
    <>
      <Header />
      <main className="min-h-screen bg-[#0a0a0a] flex flex-col">
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
      <Footer />
    </>
  );
}
