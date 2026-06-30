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
  // Completed Events
  {
    id: 'tr-01',
    startDate: '2026-07-06',
    endDate: '2026-07-07',
    title: 'Commercial Contracts for Non-Lawyers: Practical Skills for Global Professionals',
    venue: 'Johannesburg - SA',
    format: 'In-Person',
    status: 'Completed',
    link: '/training-calendar/tr-01',
  },
  {
    id: 'tr-02',
    startDate: '2026-07-01',
    endDate: '2026-07-03',
    title: 'Women Leaders: AI & Personal Brand Mastery - Masterclass',
    venue: 'Johannesburg - SA',
    format: 'In-Person',
    status: 'Completed',
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
    status: 'Completed',
    link: '/training-calendar/tr-04',
  },

  // Upcoming Events
  {
    id: 'tr-05',
    startDate: '2026-11-10',
    endDate: '2026-11-12',
    title: 'Advanced AI Prompt Engineering for Business Leaders',
    venue: 'London - UK',
    format: 'In-Person',
    status: 'Upcoming',
    link: '/training-calendar/tr-05',
  },
  {
    id: 'tr-06',
    startDate: '2026-12-05',
    endDate: '2026-12-06',
    title: 'Data Privacy & Ethics in AI: A Global Perspective',
    venue: 'Online',
    format: 'Online',
    status: 'Upcoming',
    link: '/training-calendar/tr-06',
  },
  {
    id: 'tr-07',
    startDate: '2027-02-15',
    endDate: '2027-02-17',
    title: 'Next-Gen Financial Modeling with Machine Learning',
    venue: 'New York - USA',
    format: 'Hybrid',
    status: 'Upcoming',
    link: '/training-calendar/tr-07',
  },
  {
    id: 'tr-08',
    startDate: '2027-03-22',
    endDate: '2027-03-24',
    title: 'Healthcare Innovation: AI Diagnostics and Management',
    venue: 'Singapore - SG',
    format: 'In-Person',
    status: 'Upcoming',
    link: '/training-calendar/tr-08',
  }
];
