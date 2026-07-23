'use client';

import { IEvent } from '@/data/events';
import { CalendarPlus } from 'lucide-react';

interface AddToCalendarButtonProps {
  event: IEvent;
  className?: string;
}

export default function AddToCalendarButton({ event, className = '' }: AddToCalendarButtonProps) {
  const handleDownloadIcs = () => {
    // Basic .ics formatting
    const formatDate = (dateString?: string) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const start = formatDate(event.startDate);
    const end = formatDate(event.endDate) || start;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Corpassion Events//EN',
      'BEGIN:VEVENT',
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:${event.title}`,
      `LOCATION:${event.location}`,
      `DESCRIPTION:${event.description?.replace(/\n/g, '\\n') || ''}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!event.startDate) return null;

  return (
    <button
      onClick={handleDownloadIcs}
      className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-colors w-full sm:w-auto backdrop-blur ${className}`}
    >
      <CalendarPlus className="w-5 h-5" />
      <span>Add to Calendar</span>
    </button>
  );
}
