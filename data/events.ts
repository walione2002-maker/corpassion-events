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

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Explore Events', href: '/#events' },
  { label: 'Speakers', href: '/events/dubai-ai-summit-2026#agenda' },
  { label: 'Sponsorship', href: '/events/dubai-ai-summit-2026#sponsorship' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '#contact' },
];

// ─── Stats ────────────────────────────────────────────────────

export const stats = [
  { value: 500, suffix: '+', label: 'Delegates' },
  { value: 30, suffix: '+', label: 'Speakers' },
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
      "You Don't Need to Be Technical to Transform Your Business.",
      'Information is Available Online. Opportunities are Created When People Meet.',
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
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=700&fit=crop',
  },
];

// ─── Ticket Tiers ─────────────────────────────────────────────

export const ticketTiers: ITicketTier[] = [
  {
    id: 'super-early-bird',
    name: 'Super Early Bird',
    price: 399,
    deadline: 'Until 31 July 2026',
  },
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
  {
    id: 'last-minute',
    name: 'Last Minute / On-site',
    price: 699,
    deadline: 'From 14 Oct 2026',
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
      'VIP networking access',
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
    title: 'Foundations & Keynotes',
    sessions: [
      { time: '08:00 – 09:00', title: 'Registration & Networking Breakfast', type: 'networking' },
      { time: '09:00 – 09:30', title: 'Opening Ceremony & Welcome Address', speaker: 'Summit Chair', type: 'keynote' },
      { time: '09:30 – 10:15', title: 'Keynote: AI Without the Jargon — What Every Leader Must Know in 2026', speaker: 'TBA', type: 'keynote' },
      { time: '10:15 – 10:45', title: 'Coffee Break & Exhibition Walk', type: 'break' },
      { time: '10:45 – 11:45', title: 'Panel: From Boardroom to Algorithm — How C-Suite Leaders Are Driving AI Adoption', type: 'panel' },
      { time: '11:45 – 12:30', title: 'Workshop: Identifying AI Opportunities in Your Organization', type: 'workshop' },
      { time: '12:30 – 13:30', title: 'Networking Lunch', type: 'networking' },
      { time: '13:30 – 14:15', title: 'Keynote: The ROI of AI — Real Case Studies from the Gulf Region', speaker: 'TBA', type: 'keynote' },
      { time: '14:15 – 15:15', title: 'Panel: Building an AI-Ready Workforce Without Hiring a Single Engineer', type: 'panel' },
      { time: '15:15 – 15:45', title: 'Afternoon Tea & Exhibition', type: 'break' },
      { time: '15:45 – 17:00', title: 'Solutions Showcase: Live Product Demonstrations', type: 'workshop' },
      { time: '17:00 – 18:30', title: 'Welcome Reception & Networking', type: 'networking' },
    ],
  },
  {
    day: 2,
    date: '15 October 2026',
    title: 'Strategy & Implementation',
    sessions: [
      { time: '08:30 – 09:00', title: 'Morning Coffee & Networking', type: 'networking' },
      { time: '09:00 – 09:45', title: 'Keynote: Responsible AI — Governance Frameworks for Non-Technical Leaders', speaker: 'TBA', type: 'keynote' },
      { time: '09:45 – 10:45', title: 'Panel: AI in Finance, Healthcare & Energy — Sector-Specific Playbooks', type: 'panel' },
      { time: '10:45 – 11:15', title: 'Coffee Break & Exhibition', type: 'break' },
      { time: '11:15 – 12:15', title: 'Workshop: Creating Your 90-Day AI Implementation Roadmap', type: 'workshop' },
      { time: '12:15 – 13:15', title: 'VIP Networking Lunch', type: 'networking' },
      { time: '13:15 – 14:00', title: 'Keynote: From Data to Decisions — AI-Powered Business Intelligence', speaker: 'TBA', type: 'keynote' },
      { time: '14:00 – 15:00', title: 'Panel: Overcoming Resistance — Change Management for AI Transformation', type: 'panel' },
      { time: '15:00 – 15:30', title: 'Afternoon Break', type: 'break' },
      { time: '15:30 – 16:30', title: 'Workshop: Evaluating AI Vendors — A Non-Technical Decision Framework', type: 'workshop' },
      { time: '16:30 – 17:00', title: 'Day 2 Wrap-Up & Key Takeaways', type: 'keynote' },
      { time: '19:00 – 22:00', title: 'Gala Dinner & Awards Ceremony', type: 'networking' },
    ],
  },
  {
    day: 3,
    date: '16 October 2026',
    title: 'Future Vision & Closing',
    sessions: [
      { time: '08:30 – 09:00', title: 'Morning Coffee & Final Networking', type: 'networking' },
      { time: '09:00 – 09:45', title: 'Keynote: The Next Frontier — Generative AI, AGI, and What Comes After', speaker: 'TBA', type: 'keynote' },
      { time: '09:45 – 10:45', title: 'Panel: Future-Proofing Your Career & Organization in the Age of AI', type: 'panel' },
      { time: '10:45 – 11:15', title: 'Coffee Break', type: 'break' },
      { time: '11:15 – 12:15', title: 'Workshop: Building Your Personal AI Leadership Brand', type: 'workshop' },
      { time: '12:15 – 13:00', title: 'Closing Keynote & Summit Takeaways', speaker: 'Summit Chair', type: 'keynote' },
      { time: '13:00 – 14:00', title: 'Farewell Lunch & Networking', type: 'networking' },
    ],
  },
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
    alt: 'VIP networking dinner',
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
