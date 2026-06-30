// ─── Interfaces ───────────────────────────────────────────────

export interface IEvent {
  id: string;
  title: string;
  location: string;
  dates: string;
  taglines: string[];
  image: string;
  flagship?: boolean;
}

export interface ITicketTier {
  id: string;
  name: string;
  price: number;
  deadline: string;
  emphasized?: boolean;
}

export interface IBoothOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface ISponsorshipPackage {
  id: string;
  tier: string;
  price: number;
  exclusive?: boolean;
  pitch: string;
  benefits: string[];
}

export interface IAgendaSession {
  time: string;
  title: string;
  speaker?: string;
  type: 'keynote' | 'panel' | 'workshop' | 'networking' | 'break';
}

export interface IAgendaDay {
  day: number;
  date: string;
  title: string;
  sessions: IAgendaSession[];
}

export interface IFaqItem {
  question: string;
  answer: string;
}

export interface IFaqCategory {
  category: string;
  items: IFaqItem[];
}

export interface IWhyAttendPillar {
  title: string;
  description: string;
  icon: string; // Lucide icon name
}

// ─── Navigation ───────────────────────────────────────────────

import { ROUTES } from '@/config/routes';

export const navLinks = [
  { label: 'Home', href: ROUTES.HOME },
  { label: 'Explore Events', href: ROUTES.EVENTS },
  { label: 'Conferences', href: '/#conferences', isNew: true },
  { label: 'Training Calendar', href: ROUTES.TRAINING_CALENDAR, isNew: true },
  { label: 'Speakers', href: '/events/dubai-ai-summit-2026#speakers' },
  { label: 'Register', href: ROUTES.REGISTER },
  { label: 'FAQ', href: ROUTES.FAQ },
  { label: 'Sponsors', href: '/events/dubai-ai-summit-2026#sponsorship' },
  { label: 'Contact', href: ROUTES.CONTACT },
];

// ─── Stats ────────────────────────────────────────────────────

export const stats = [
  { value: 100, suffix: '+', label: 'Delegates' },
  { value: 10, suffix: '+', label: 'Speakers' },
  { value: 20, suffix: '+', label: 'Sponsors' },
  { value: 15, suffix: '', label: 'Countries' },
];

// ─── Why Attend Pillars ───────────────────────────────────────

export const whyAttendPillars: IWhyAttendPillar[] = [
  {
    title: 'Frontier Insights',
    description:
      'Gain exclusive access to cutting-edge research, emerging trends, and actionable intelligence from global thought leaders shaping the future of AI.',
    icon: 'Lightbulb',
  },
  {
    title: 'Curated Networking',
    description:
      'Connect with 500+ senior executives, decision-makers, and innovators in purpose-built networking sessions designed for meaningful connections.',
    icon: 'Network',
  },
  {
    title: 'Hands-on Workshops',
    description:
      'Participate in interactive, practitioner-led workshops where you build real skills and frameworks you can deploy on Monday morning.',
    icon: 'Wrench',
  },
  {
    title: 'Trust & Governance',
    description:
      'Explore the critical frameworks for responsible AI deployment, data ethics, and corporate governance in an era of rapid technological change.',
    icon: 'ShieldCheck',
  },
];

// ─── Events ───────────────────────────────────────────────────

export const events: IEvent[] = [
  {
    id: 'dubai-ai-summit-2026',
    title: 'AI FOR NON-TECHNICAL LEADERS SUMMIT & SOLUTIONS SHOWCASE 2026',
    location: 'Dubai, UAE',
    dates: '14–16 October 2026',
    taglines: [
      'Connecting Business Leaders with Global AI Solution Providers for Practical Business Transformation'
    ],
    image:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=700&fit=crop',
    flagship: true,
  },
  {
    id: 'amsterdam-enterprise-ai-2026',
    title: 'Enterprise AI & Workforce Transformation Summit Europe 2026',
    location: 'Amsterdam, Netherlands',
    dates: 'November 4-6, 2026',
    taglines: [
      'Bridging the AI Skills Gap. Improving Productivity. Building Future-Ready Organizations.',
    ],
    image:
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&h=700&fit=crop',
  },
  {
    id: 'china-healthtech-2027',
    title: 'China HealthTech 2027',
    location: 'Baku, Azerbaijan',
    dates: '14–16 January 2027',
    taglines: [
      'Connecting Chinese Healthcare Innovation with Global Markets',
      'Meet Manufacturers. Meet Buyers. Build Partnership',
    ],
    image:
      '/chinahealth.png',
  },
];

export const ticketTiers: ITicketTier[] = [
  {
    id: 'early-bird',
    name: 'Early Bird',
    price: 499,
    deadline: '1 Aug – 15 Sep',
  },
  {
    id: 'standard',
    name: 'Standard Registration',
    price: 599,
    deadline: '16 Sep – 13 Oct',
    emphasized: true,
  },
];

// ─── Booth Options ────────────────────────────────────────────

export const boothFeatures = [
  'Booth space',
  'Table',
  '2 Chairs',
  'Power connection',
  'Company name fascia',
  '2 Exhibitor badges',
];

export const boothOptions: IBoothOption[] = [
  {
    id: 'tabletop',
    name: 'Tabletop / Mini Booth',
    price: 800,
    description: 'Perfect for startups and small teams looking for visibility.',
  },
  {
    id: 'standard-booth',
    name: 'Standard Booth',
    price: 1200,
    description: 'Our most popular option for mid-size exhibitors.',
  },
  {
    id: 'premium-booth',
    name: 'Premium Booth (Corner/Larger)',
    price: 2000,
    description:
      'Maximum visibility with corner placement and expanded floor space.',
  },
];

// ─── Sponsorship Packages ─────────────────────────────────────

export const sponsorshipPackages: ISponsorshipPackage[] = [
  {
    id: 'title-sponsor',
    tier: 'Title Sponsor',
    price: 10000,
    exclusive: true,
    pitch:
      'Be the exclusive lead sponsor of the most anticipated AI leadership summit in the Middle East.',
    benefits: [
      'Exclusive "Title Sponsor" recognition',
      'Premium logo placement on all materials',
      'Featured on website & all marketing collateral',
      'Opening ceremony recognition',
      '30-minute keynote presentation slot',
      'Premium exhibition booth (prime location)',
      '6 Delegate Passes included',
      'Executive networking access',
      'Company profile in official brochure',
      'Social media promotion before & after event',
    ],
  },
  {
    id: 'event-partner',
    tier: 'Event Partner',
    price: 5000,
    pitch:
      'Showcase your brand alongside industry leaders and gain direct access to key decision-makers.',
    benefits: [
      'Logo on website & marketing materials',
      'Standard exhibition booth',
      '4 Delegate Passes included',
      'Company profile in official brochure',
      'Recognition during event proceedings',
      'Networking opportunities with delegates',
    ],
  },
  {
    id: 'supporting-partner',
    tier: 'Supporting Partner',
    price: 2500,
    pitch:
      'A cost-effective opportunity to increase brand visibility and connect with a targeted audience.',
    benefits: [
      'Logo on event website',
      'Exhibition booth',
      '2 Delegate Passes included',
      'Company listing in official brochure',
      'Full networking access',
    ],
  },
];

// ─── Agenda ───────────────────────────────────────────────────

export const agenda: IAgendaDay[] = [
  {
    day: 1,
    date: '14 October 2026',
    title: 'Understanding AI & Business Transformation',
    sessions: [
      { time: '08:00 – 09:00', title: 'Registration & Networking Breakfast', type: 'networking' },
      { time: '09:00 – 09:20', title: 'Welcome Address & Opening Ceremony', type: 'keynote' },
      { time: '09:20 – 10:00', title: 'Opening Keynote - The Future of AI for Business Leaders', type: 'keynote' },
      { time: '10:00 – 10:45', title: 'Session 1 - AI Without Technical Knowledge: What Every Executive Should Know', type: 'workshop' },
      { time: '10:45 – 11:15', title: 'Networking Coffee Break', type: 'break' },
      { time: '11:15 – 12:00', title: 'Session 2 - How Companies Are Using AI to Reduce Costs and Increase Productivity', type: 'workshop' },
      { time: '12:00 – 12:45', title: 'Panel Discussion - Is Your Business Ready for AI?', type: 'panel' },
      { time: '12:45 – 14:00', title: 'Networking Lunch & Solutions Showcase', type: 'networking' },
      { time: '14:00 – 15:00', title: 'Industry Case Studies', speaker: 'Manufacturing, Retail, Healthcare, Logistics, Finance', type: 'panel' },
      { time: '15:00 – 15:45', title: 'Live AI Solution Demonstrations', type: 'workshop' },
      { time: '15:45 – 16:30', title: 'Networking & Exhibition Visit', type: 'networking' },
    ],
  },
  {
    day: 2,
    date: '15 October 2026',
    title: 'Practical AI Applications Across Business Functions',
    sessions: [
      { time: '09:00 – 09:30', title: 'Morning Keynote - Building an AI Strategy Without a Technical Team', type: 'keynote' },
      { time: '09:30 – 10:15', title: 'AI for Finance & Decision Making', type: 'panel' },
      { time: '10:15 – 11:00', title: 'AI for Human Resources & Talent Management', type: 'panel' },
      { time: '11:00 – 11:30', title: 'Coffee Break', type: 'break' },
      { time: '11:30 – 12:15', title: 'AI for Sales, Marketing & Customer Experience', type: 'panel' },
      { time: '12:15 – 13:00', title: 'Featured Session - AI-Powered Multilingual Sales Systems', speaker: 'How AI sales agents communicate with customers 24/7 in multiple languages, qualify leads and improve sales performance', type: 'keynote' },
      { time: '13:00 – 14:00', title: 'Networking Lunch', type: 'networking' },
      { time: '14:00 – 15:00', title: 'Roundtable Discussions - Business Challenges & AI Solutions', type: 'workshop' },
      { time: '15:00 – 16:00', title: 'One-to-One Meetings - Delegates meet AI Solution Providers', type: 'networking' },
      { time: '16:00 – 17:00', title: 'Solutions Showcase & Networking', type: 'networking' },
    ],
  },
  {
    day: 3,
    date: '16 October 2026',
    title: 'Implementation, Partnerships & Future Growth',
    sessions: [
      { time: '09:00 – 09:30', title: 'Morning Keynote - Leading AI Transformation Successfully', type: 'keynote' },
      { time: '09:30 – 10:15', title: 'How to Select the Right AI Partner', type: 'panel' },
      { time: '10:15 – 11:00', title: 'ROI of AI: Measuring Business Success', type: 'panel' },
      { time: '11:00 – 11:30', title: 'Coffee Break', type: 'break' },
      { time: '11:30 – 12:30', title: 'Executive Panel - The Future of AI Across Industries', type: 'panel' },
      { time: '12:30 – 13:30', title: 'Networking Lunch', type: 'networking' },
      { time: '13:30 – 15:00', title: 'Business Matchmaking Sessions - Pre-arranged meetings between delegates and solution providers', type: 'networking' },
      { time: '15:00 – 15:45', title: 'Closing Keynote - Turning AI Ideas into Business Results', type: 'keynote' },
      { time: '15:45 – 16:15', title: 'Closing Ceremony', speaker: 'Summit Highlights, Certificate Distribution, Sponsor Recognition', type: 'keynote' },
      { time: '16:15 onwards', title: 'Final Networking & Exhibition Visit', type: 'networking' },
    ],
  },
];

export const globalFeatures = [
  'AI Solutions Showcase',
  'Live Product Demonstrations',
  'One-to-One Business Meetings',
  'Executive Networking Lounge',
  'Media Interviews',
  'Sponsor & Partner Meetings',
];

// ─── FAQ ──────────────────────────────────────────────────────

export const faqCategories: IFaqCategory[] = [
  {
    category: 'Ticketing',
    items: [
      {
        question: 'What is included in the registration fee?',
        answer:
          'Your registration includes full access to all three days of the summit, keynote sessions, panel discussions, hands-on workshops, exhibition access, networking lunches, coffee breaks, and the welcome reception. Gala dinner tickets are included for Standard and above tiers.',
      },
      {
        question: 'Are group discounts available?',
        answer:
          'Yes! We offer 10% to 20% group discounts depending on the number of delegates. Contact our team at training@corpassionevent.com for a custom quote for groups of 3 or more.',
      },
      {
        question: 'What is the cancellation and refund policy?',
        answer:
          'Full refunds are available up to 60 days before the event. 50% refunds are available 30-60 days before the event. Within 30 days, substitutions are welcome but refunds are not available. All cancellation requests must be made in writing.',
      },
      {
        question: 'Can I transfer my ticket to a colleague?',
        answer:
          'Yes, ticket transfers are permitted at any time before the event at no additional charge. Simply email us with the details of the replacement delegate.',
      },
    ],
  },
  {
    category: 'Accommodation',
    items: [
      {
        question: 'Does the registration include accommodation?',
        answer:
          'No, accommodation is not included in the registration fee. However, we have negotiated special rates with partner hotels near the venue. Details will be shared upon registration confirmation.',
      },
      {
        question: 'Which hotels are recommended near the venue?',
        answer:
          'We have partnered with several 4-star and 5-star hotels within walking distance of the venue in Dubai. Registered delegates will receive a list of recommended hotels with exclusive discount codes.',
      },
      {
        question: 'Is there a shuttle service from recommended hotels?',
        answer:
          'Yes, complimentary shuttle services will operate from our partner hotels to the venue each morning and evening throughout the summit.',
      },
    ],
  },
  {
    category: 'Sponsorship',
    items: [
      {
        question: 'What sponsorship packages are available?',
        answer:
          'We offer three sponsorship tiers: Title Sponsor ($10,000 — exclusive), Event Partner ($5,000), and Supporting Partner ($2,500). Each tier includes different levels of brand visibility, exhibition space, and delegate passes.',
      },
      {
        question: 'Can I customize a sponsorship package?',
        answer:
          'Absolutely! We understand that every brand has unique objectives. Contact our sponsorship team to discuss bespoke packages tailored to your marketing goals and budget.',
      },
      {
        question: 'What is included with the exhibition booth?',
        answer:
          'All booth options include booth space, a table, 2 chairs, power connection, company name fascia, and 2 exhibitor badges. Premium booths offer corner placement and expanded floor space for maximum visibility.',
      },
      {
        question: 'When is the deadline for sponsorship applications?',
        answer:
          'We recommend applying at least 8 weeks before the event to ensure full inclusion in all marketing materials. However, last-minute sponsorship opportunities may be available — contact us to check availability.',
      },
    ],
  },
];

// ─── Gallery Images ───────────────────────────────────────────

export const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
    alt: 'Conference keynote stage',
    span: 'col-span-2 row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop',
    alt: 'Speaker presenting',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=400&fit=crop',
    alt: 'Networking session',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1591115765373-5f9cf1da3607?w=600&h=400&fit=crop',
    alt: 'Exhibition booth area',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop',
    alt: 'Panel discussion',
    span: 'col-span-1 row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1560439513-74b037a25d84?w=600&h=400&fit=crop',
    alt: 'Hands-on workshop',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=400&fit=crop',
    alt: 'Conference audience',
    span: 'col-span-2 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=600&h=400&fit=crop',
    alt: 'Executive networking dinner',
    span: 'col-span-1 row-span-1',
  },
];

// ─── Partner Logos (Placeholder) ──────────────────────────────

export const partnerLogos = [
  { name: 'Microsoft', domain: 'microsoft.com' },
  { name: 'Google Cloud', domain: 'cloud.google.com' },
  { name: 'AWS', domain: 'aws.amazon.com' },
  { name: 'IBM', domain: 'ibm.com' },
  { name: 'Salesforce', domain: 'salesforce.com' },
  { name: 'SAP', domain: 'sap.com' },
  { name: 'Oracle', domain: 'oracle.com' },
  { name: 'Accenture', domain: 'accenture.com' },
  { name: 'Deloitte', domain: 'deloitte.com' },
  { name: 'McKinsey', domain: 'mckinsey.com' },
];


// ─── Services ───────────────────────────────────────────────────

export const services = [
  { icon: 'Building', title: 'Conference Management', description: 'End-to-end planning and execution of world-class conferences.' },
  { icon: 'Presentation', title: 'Exhibition Management', description: 'Comprehensive design and logistics for impactful exhibitions.' },
  { icon: 'GraduationCap', title: 'Corporate Training', description: 'Tailored training programs to upskill your teams.' },
  { icon: 'Handshake', title: 'Sponsorship Facilitation', description: 'Connecting brands with strategic sponsorship opportunities.' },
  { icon: 'Mic', title: 'Speaker Curation', description: 'Sourcing industry leaders to deliver inspiring keynotes.' },
  { icon: 'Megaphone', title: 'Event Marketing', description: 'Targeted marketing strategies to maximize event attendance.' },
];
