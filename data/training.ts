export interface TrainingEvent {
  id: string;
  startDate: string; // ISO or formatted string, e.g., '2026-07-06'
  endDate: string;
  title: string;
  venue: string;
  format: 'In-Person' | 'Online' | 'Hybrid';
  status: 'Upcoming' | 'Completed';
  link: string;
}

export const mockTrainingEvents: TrainingEvent[] = [
  {
    id: 'tr-01',
    startDate: '2026-07-06',
    endDate: '2026-07-07',
    title: 'Commercial Contracts for Non-Lawyers: Practical Skills for Global Professionals',
    venue: 'Johannesburg - SA',
    format: 'In-Person',
    status: 'Upcoming',
    link: '/training-calendar/tr-01',
  },
  {
    id: 'tr-02',
    startDate: '2026-07-01',
    endDate: '2026-07-03',
    title: 'Women Leaders: AI & Personal Brand Mastery - Masterclass',
    venue: 'Johannesburg - SA',
    format: 'In-Person',
    status: 'Upcoming',
    link: '/training-calendar/tr-02',
  },
  {
    id: 'tr-03',
    startDate: '2026-05-15',
    endDate: '2026-05-16',
    title: 'Executive AI Strategy: Implementing Generative AI in Enterprise',
    venue: 'Dubai - UAE',
    format: 'Hybrid',
    status: 'Completed',
    link: '/training-calendar/tr-03',
  },
  {
    id: 'tr-04',
    startDate: '2026-08-20',
    endDate: '2026-08-22',
    title: 'Digital Transformation & Change Management Workshop',
    venue: 'Online',
    format: 'Online',
    status: 'Upcoming',
    link: '/training-calendar/tr-04',
  }
];
