'use client';

import { Search, MapPin, Calendar, Layout } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

export interface FilterState {
  month: string;
  search: string;
  venue: string;
  format: string;
}

interface FilterBarProps {
  filters: FilterState;
  setFilters: Dispatch<SetStateAction<FilterState>>;
  availableMonths: string[];
  availableVenues: string[];
  availableFormats: string[];
}

export default function FilterBar({ filters, setFilters, availableMonths, availableVenues, availableFormats }: FilterBarProps) {
  return (
    <div className="w-full max-w-6xl mx-auto relative z-20 -mt-12 px-4">
      <div className="p-4 rounded-2xl bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 shadow-2xl flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Date Dropdown */}
        <div className="relative flex items-center bg-black/50 rounded-xl border border-zinc-700/50 focus-within:border-brand-500/50 transition-colors overflow-hidden group">
          <Calendar className="absolute left-4 w-5 h-5 text-zinc-400 group-focus-within:text-brand-400 transition-colors pointer-events-none" />
          <select 
            value={filters.month}
            onChange={(e) => setFilters(prev => ({ ...prev, month: e.target.value }))}
            className="w-full bg-transparent text-white h-12 pl-12 pr-4 outline-none appearance-none cursor-pointer text-sm"
          >
            <option value="" className="bg-zinc-900">All Months</option>
            {availableMonths.map(month => (
              <option key={month} value={month} className="bg-zinc-900">{month}</option>
            ))}
          </select>
        </div>

        {/* Search Input */}
        <div className="relative flex items-center bg-black/50 rounded-xl border border-zinc-700/50 focus-within:border-brand-500/50 transition-colors overflow-hidden group">
          <Search className="absolute left-4 w-5 h-5 text-zinc-400 group-focus-within:text-brand-400 transition-colors pointer-events-none" />
          <input 
            type="text"
            placeholder="Quick search..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            className="w-full bg-transparent text-white h-12 pl-12 pr-4 outline-none placeholder:text-zinc-500 text-sm"
          />
        </div>

        {/* Venue Dropdown */}
        <div className="relative flex items-center bg-black/50 rounded-xl border border-zinc-700/50 focus-within:border-brand-500/50 transition-colors overflow-hidden group">
          <MapPin className="absolute left-4 w-5 h-5 text-zinc-400 group-focus-within:text-brand-400 transition-colors pointer-events-none" />
          <select 
            value={filters.venue}
            onChange={(e) => setFilters(prev => ({ ...prev, venue: e.target.value }))}
            className="w-full bg-transparent text-white h-12 pl-12 pr-4 outline-none appearance-none cursor-pointer text-sm"
          >
            <option value="" className="bg-zinc-900">All Locations</option>
            {availableVenues.map(venue => (
              <option key={venue} value={venue} className="bg-zinc-900">{venue}</option>
            ))}
          </select>
        </div>

        {/* Details Dropdown */}
        <div className="relative flex items-center bg-black/50 rounded-xl border border-zinc-700/50 focus-within:border-brand-500/50 transition-colors overflow-hidden group">
          <Layout className="absolute left-4 w-5 h-5 text-zinc-400 group-focus-within:text-brand-400 transition-colors pointer-events-none" />
          <select 
            value={filters.format}
            onChange={(e) => setFilters(prev => ({ ...prev, format: e.target.value }))}
            className="w-full bg-transparent text-white h-12 pl-12 pr-4 outline-none appearance-none cursor-pointer text-sm"
          >
            <option value="" className="bg-zinc-900">All Formats</option>
            {availableFormats.map(format => (
              <option key={format} value={format} className="bg-zinc-900">{format}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
