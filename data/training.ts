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
    id: 'dubai-ai-summit-2026',
    startDate: '2026-10-14',
    endDate: '2026-10-16',
    title: 'AI FOR NON-TECHNICAL LEADERS SUMMIT & SOLUTIONS SHOWCASE 2026',
    venue: 'Dubai, UAE',
    format: 'In-Person',
    status: 'Upcoming',
    link: '/events/dubai-ai-summit-2026',
  },
  {
    id: 'amsterdam-enterprise-ai-2026',
    startDate: '2026-11-04',
    endDate: '2026-11-06',
    title: 'Enterprise AI & Workforce Transformation Summit Europe 2026',
    venue: 'Amsterdam, Netherlands',
    format: 'In-Person',
    status: 'Upcoming',
    link: '/events/amsterdam-enterprise-ai-2026',
  },
  {
    id: 'china-healthtech-2027',
    startDate: '2027-01-14',
    endDate: '2027-01-16',
    title: 'China HealthTech 2027',
    venue: 'Baku, Azerbaijan',
    format: 'In-Person',
    status: 'Upcoming',
    link: '/events/china-healthtech-2027',
  }
];
