const fs = require('fs');

let file = fs.readFileSync('data/events.ts', 'utf8');

const amsterdamAgenda = `    {
      day: 1,
      date: '4 Nov 2026',
      sessions: [
        { id: '1-1', time: '08:30 – 09:30', title: 'Registration & Welcome Coffee', type: 'networking' },
        { id: '1-2', time: '09:30 – 09:45', title: 'Opening Ceremony & Welcome Address', type: 'keynote' },
        { id: '1-3', time: '09:45 – 10:30', title: 'Opening Keynote: The Future of Enterprise AI in Europe', type: 'keynote' },
        { id: '1-4', time: '10:30 – 11:15', title: 'AI for CEOs, CFOs & Business Leaders', type: 'panel' },
        { id: '1-5', time: '11:15 – 11:45', title: 'Networking Coffee Break', type: 'break' },
        { id: '1-6', time: '11:45 – 12:30', title: 'AI Governance, Ethics & Compliance', type: 'panel' },
        { id: '1-7', time: '12:30 – 13:15', title: 'Digital Transformation Success Stories', type: 'panel' },
        { id: '1-8', time: '13:15 – 14:15', title: 'Networking Lunch', type: 'break' },
        { id: '1-9', time: '14:15 – 15:00', title: 'AI-Powered Business Operations', type: 'panel' },
        { id: '1-10', time: '15:00 – 15:45', title: 'Executive Panel Discussion', type: 'panel' },
        { id: '1-11', time: '15:45 – 16:15', title: 'Coffee Break', type: 'break' },
        { id: '1-12', time: '16:15 – 17:30', title: 'AI Solutions Showcase & Networking', type: 'networking' },
      ],
    },
    {
      day: 2,
      date: '5 Nov 2026',
      sessions: [
        { id: '2-1', time: '09:00 – 09:45', title: 'AI in Finance & Banking', type: 'panel' },
        { id: '2-2', time: '09:45 – 10:30', title: 'AI in Human Resources', type: 'panel' },
        { id: '2-3', time: '10:30 – 11:00', title: 'Coffee Break', type: 'break' },
        { id: '2-4', time: '11:00 – 11:45', title: 'AI in Manufacturing & Supply Chain', type: 'panel' },
        { id: '2-5', time: '11:45 – 12:30', title: 'AI in Healthcare', type: 'panel' },
        { id: '2-6', time: '12:30 – 13:30', title: 'Networking Lunch', type: 'break' },
        { id: '2-7', time: '13:30 – 14:15', title: 'Cybersecurity & AI', type: 'panel' },
        { id: '2-8', time: '14:15 – 15:00', title: 'Enterprise Automation', type: 'panel' },
        { id: '2-9', time: '15:00 – 15:30', title: 'Coffee Break', type: 'break' },
        { id: '2-10', time: '15:30 – 17:00', title: 'Solution Provider Demonstrations', type: 'workshop' },
      ],
    },
    {
      day: 3,
      date: '6 Nov 2026',
      sessions: [
        { id: '3-1', time: '09:00 – 09:45', title: 'Future of AI Technologies', type: 'panel' },
        { id: '3-2', time: '09:45 – 10:30', title: 'Building AI-Ready Organizations', type: 'panel' },
        { id: '3-3', time: '10:30 – 11:00', title: 'Coffee Break', type: 'break' },
        { id: '3-4', time: '11:00 – 12:00', title: 'Startup Innovation Showcase', type: 'keynote' },
        { id: '3-5', time: '12:00 – 13:00', title: 'Business Matchmaking Meetings', type: 'networking' },
        { id: '3-6', time: '13:00 – 14:00', title: 'Networking Lunch', type: 'break' },
        { id: '3-7', time: '14:00 – 15:30', title: 'Roundtable Discussions', type: 'workshop' },
        { id: '3-8', time: '15:30 – 16:00', title: 'Closing Keynote', type: 'keynote' },
        { id: '3-9', time: '16:00 – 16:30', title: 'Certificate Distribution & Closing Ceremony', type: 'keynote' },
      ],
    },`;

file = file.replace(/('amsterdam-enterprise-ai-2026': \[)(.*?)(?=  'china-healthtech-2027': \[)/s,
"$1\n" + amsterdamAgenda + "\n  ],\n");

const chinaAgenda = `    {
      day: 1,
      date: '14 Jan 2027',
      sessions: [
        { id: '1-1', time: '08:30 – 09:30', title: 'Registration & Welcome Coffee', type: 'networking' },
        { id: '1-2', time: '09:30 – 09:45', title: 'Opening Ceremony', type: 'keynote' },
        { id: '1-3', time: '09:45 – 10:30', title: 'Opening Keynote: China\\'s Healthcare Innovation & Global Opportunities', type: 'keynote' },
        { id: '1-4', time: '10:30 – 11:15', title: 'Medical Technology Trends', type: 'panel' },
        { id: '1-5', time: '11:15 – 11:45', title: 'Coffee Break', type: 'break' },
        { id: '1-6', time: '11:45 – 12:30', title: 'Chinese Medical Device Manufacturers Presentation', type: 'panel' },
        { id: '1-7', time: '12:30 – 13:30', title: 'Networking Lunch', type: 'break' },
        { id: '1-8', time: '13:30 – 15:00', title: 'Exhibition Tour', type: 'networking' },
        { id: '1-9', time: '15:00 – 15:30', title: 'Coffee Break', type: 'break' },
        { id: '1-10', time: '15:30 – 17:30', title: 'B2B Networking Meetings', type: 'networking' },
      ],
    },
    {
      day: 2,
      date: '15 Jan 2027',
      sessions: [
        { id: '2-1', time: '09:00 – 10:00', title: 'Medical Equipment Demonstrations', type: 'workshop' },
        { id: '2-2', time: '10:00 – 10:45', title: 'Hospital Procurement Opportunities', type: 'panel' },
        { id: '2-3', time: '10:45 – 11:15', title: 'Coffee Break', type: 'break' },
        { id: '2-4', time: '11:15 – 12:15', title: 'Healthcare Investment Opportunities', type: 'panel' },
        { id: '2-5', time: '12:15 – 13:15', title: 'Networking Lunch', type: 'break' },
        { id: '2-6', time: '13:15 – 15:30', title: 'Pre-Scheduled B2B Meetings', type: 'networking' },
        { id: '2-7', time: '15:30 – 16:00', title: 'Coffee Break', type: 'break' },
        { id: '2-8', time: '16:00 – 17:30', title: 'Distributor & Buyer Meetings', type: 'networking' },
      ],
    },
    {
      day: 3,
      date: '16 Jan 2027',
      sessions: [
        { id: '3-1', time: '09:00 – 10:00', title: 'Entering European & CIS Healthcare Markets', type: 'panel' },
        { id: '3-2', time: '10:00 – 10:45', title: 'Regulatory Requirements & Market Access', type: 'panel' },
        { id: '3-3', time: '10:45 – 11:15', title: 'Coffee Break', type: 'break' },
        { id: '3-4', time: '11:15 – 12:30', title: 'International Buyer–Supplier Matchmaking', type: 'networking' },
        { id: '3-5', time: '12:30 – 13:30', title: 'Networking Lunch', type: 'break' },
        { id: '3-6', time: '13:30 – 15:00', title: 'Strategic Partnership Meetings', type: 'networking' },
        { id: '3-7', time: '15:00 – 15:30', title: 'Signing Ceremony (Optional)', type: 'networking' },
        { id: '3-8', time: '15:30 – 16:00', title: 'Closing Remarks', type: 'keynote' },
        { id: '3-9', time: '16:00 – 17:00', title: 'Farewell Networking Session', type: 'networking' },
      ],
    },`;

file = file.replace(/('china-healthtech-2027': \[)(.*?)(?=};)/s,
"$1\n" + chinaAgenda + "\n  ],\n");

const amsterdamBooths = `    {
      id: 'standard',
      name: 'Standard Booth',
      size: '2m × 2m',
      price: 1500,
      description: 'Standard exhibition space for promoting your brand.',
      features: ['2m × 2m space', '1 Table, 2 Chairs', 'Basic branding', '2 Exhibitor passes'],
    },
    {
      id: 'premium',
      name: 'Premium Booth',
      size: '3m × 3m',
      price: 2200,
      description: 'Premium location with high foot traffic.',
      features: ['3m × 3m space', '2 Tables, 4 Chairs', 'Premium branding', '4 Exhibitor passes', 'Lead retrieval scanner'],
    },
    {
      id: 'custom',
      name: 'Custom Booth',
      size: 'Custom',
      price: 0,
      description: 'Custom designed booth space tailored to your needs.',
      features: ['Custom footprint', 'Priority location', 'Dedicated account manager'],
    },`;
file = file.replace(/(export const eventBoothOptions: Record<string, IBoothOption\[\]> = \{\s*'dubai-ai-summit-2026': \[.*?\]\,\s*'amsterdam-enterprise-ai-2026': \[)(.*?)(\],\s*'china-healthtech-2027': \[)(.*?)(\],\s*\};)/s, 
"$1\n" + amsterdamBooths + "\n$3\n" + `    {
      id: 'standard',
      name: 'Standard Booth',
      size: '2m × 2m',
      price: 900,
      description: 'Standard exhibition space for promoting your brand.',
      features: ['2m × 2m space', '1 Table, 2 Chairs', 'Basic branding', '2 Exhibitor passes'],
    },
    {
      id: 'premium',
      name: 'Premium Booth',
      size: '3m × 3m',
      price: 1400,
      description: 'Premium location with high foot traffic.',
      features: ['3m × 3m space', '2 Tables, 4 Chairs', 'Premium branding', '4 Exhibitor passes', 'Lead retrieval scanner'],
    },
    {
      id: 'custom',
      name: 'Custom Booth',
      size: 'Custom',
      price: 0,
      description: 'Custom designed booth space tailored to your needs.',
      features: ['Custom footprint', 'Priority location', 'Dedicated account manager'],
    },` + "$5");

const amsterdamSponsors = `    {
      id: 'event-sponsor',
      name: 'Event Sponsor',
      price: 12000,
      description: 'Top-tier branding and speaking opportunities.',
      features: ['Main stage keynote (20 mins)', 'Premium 6m x 3m booth', 'Logo on all marketing materials', '10 VIP passes', 'Access to attendee list'],
      recommended: true,
    },
    {
      id: 'platinum',
      name: 'Platinum Sponsor',
      price: 7500,
      description: 'High visibility and thought leadership.',
      features: ['Panel discussion slot', '3m x 3m premium booth', 'Logo on website and stage', '5 VIP passes'],
      recommended: false,
    },
    {
      id: 'gold',
      name: 'Gold Sponsor',
      price: 4500,
      description: 'Excellent branding for growing companies.',
      features: ['2m x 2m booth', 'Logo on website', '3 Delegate passes'],
      recommended: false,
    },`;
file = file.replace(/(export const eventSponsorshipPackages: Record<string, ISponsorshipPackage\[\]> = \{\s*'dubai-ai-summit-2026': \[.*?\]\,\s*'amsterdam-enterprise-ai-2026': \[)(.*?)(\],\s*'china-healthtech-2027': \[)(.*?)(\],\s*\};)/s, 
"$1\n" + amsterdamSponsors + "\n$3\n" + `    {
      id: 'event-sponsor',
      name: 'Event Sponsor',
      price: 8000,
      description: 'Top-tier branding and speaking opportunities.',
      features: ['Main stage keynote (20 mins)', 'Premium 6m x 3m booth', 'Logo on all marketing materials', '10 VIP passes', 'Access to attendee list'],
      recommended: true,
    },
    {
      id: 'platinum',
      name: 'Platinum Sponsor',
      price: 5000,
      description: 'High visibility and thought leadership.',
      features: ['Panel discussion slot', '3m x 3m premium booth', 'Logo on website and stage', '5 VIP passes'],
      recommended: false,
    },
    {
      id: 'gold',
      name: 'Gold Sponsor',
      price: 3000,
      description: 'Excellent branding for growing companies.',
      features: ['2m x 2m booth', 'Logo on website', '3 Delegate passes'],
      recommended: false,
    },` + "$5");


// Ticket Tiers
file = file.replace(/('amsterdam-enterprise-ai-2026': \[)[\s\S]*?(\],\s*'china)/g, 
`$1
    {
      id: 'early-bird',
      name: 'Early Bird',
      price: 449,
      description: 'Full access to all sessions, networking events, and exhibition area.',
      features: ['Access to all keynote sessions', 'Networking lunches and coffee breaks', 'Event app access', 'Certificate of attendance'],
      recommended: false,
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 599,
      description: 'Standard access to all summit activities.',
      features: ['Access to all keynote sessions', 'Networking lunches and coffee breaks', 'Event app access', 'Certificate of attendance', 'Post-event recording access'],
      recommended: true,
    },
    {
      id: 'late',
      name: 'Late',
      price: 699,
      description: 'Late registration access.',
      features: ['Access to all keynote sessions', 'Networking lunches and coffee breaks', 'Event app access', 'Certificate of attendance', 'Post-event recording access'],
      recommended: false,
    },
  ],\n  'china`);

file = file.replace(/('china-healthtech-2027': \[)[\s\S]*?(\],\s*\};)/g, 
`$1
    {
      id: 'early-bird',
      name: 'Early Bird',
      price: 299,
      description: 'Full access to exhibition and networking events.',
      features: ['Exhibition floor access', 'B2B Matchmaking', 'Event app access', 'Welcome reception'],
      recommended: false,
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 399,
      description: 'Standard access for delegates.',
      features: ['Exhibition floor access', 'B2B Matchmaking', 'Event app access', 'Welcome reception', 'All conference tracks'],
      recommended: true,
    },
    {
      id: 'late',
      name: 'Late',
      price: 499,
      description: 'Late registration access.',
      features: ['Exhibition floor access', 'B2B Matchmaking', 'Event app access', 'Welcome reception', 'All conference tracks'],
      recommended: false,
    },
  ],
};`);

fs.writeFileSync('data/events.ts', file);
