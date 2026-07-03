const fs = require('fs');

let file = fs.readFileSync('data/events.ts', 'utf8');

const amsterdamAgenda = `    {
      day: 1,
      date: '4 Nov 2026',
      title: 'AI Strategy & Business Transformation',
      sessions: [
        { time: '08:30 – 09:30', title: 'Registration & Welcome Coffee', type: 'networking' },
        { time: '09:30 – 09:45', title: 'Opening Ceremony & Welcome Address', type: 'keynote' },
        { time: '09:45 – 10:30', title: 'Opening Keynote: The Future of Enterprise AI in Europe', type: 'keynote' },
        { time: '10:30 – 11:15', title: 'AI for CEOs, CFOs & Business Leaders', type: 'panel' },
        { time: '11:15 – 11:45', title: 'Networking Coffee Break', type: 'break' },
        { time: '11:45 – 12:30', title: 'AI Governance, Ethics & Compliance', type: 'panel' },
        { time: '12:30 – 13:15', title: 'Digital Transformation Success Stories', type: 'panel' },
        { time: '13:15 – 14:15', title: 'Networking Lunch', type: 'break' },
        { time: '14:15 – 15:00', title: 'AI-Powered Business Operations', type: 'panel' },
        { time: '15:00 – 15:45', title: 'Executive Panel Discussion', type: 'panel' },
        { time: '15:45 – 16:15', title: 'Coffee Break', type: 'break' },
        { time: '16:15 – 17:30', title: 'AI Solutions Showcase & Networking', type: 'networking' },
      ],
    },
    {
      day: 2,
      date: '5 Nov 2026',
      title: 'AI Applications Across Industries',
      sessions: [
        { time: '09:00 – 09:45', title: 'AI in Finance & Banking', type: 'panel' },
        { time: '09:45 – 10:30', title: 'AI in Human Resources', type: 'panel' },
        { time: '10:30 – 11:00', title: 'Coffee Break', type: 'break' },
        { time: '11:00 – 11:45', title: 'AI in Manufacturing & Supply Chain', type: 'panel' },
        { time: '11:45 – 12:30', title: 'AI in Healthcare', type: 'panel' },
        { time: '12:30 – 13:30', title: 'Networking Lunch', type: 'break' },
        { time: '13:30 – 14:15', title: 'Cybersecurity & AI', type: 'panel' },
        { time: '14:15 – 15:00', title: 'Enterprise Automation', type: 'panel' },
        { time: '15:00 – 15:30', title: 'Coffee Break', type: 'break' },
        { time: '15:30 – 17:00', title: 'Solution Provider Demonstrations', type: 'workshop' },
      ],
    },
    {
      day: 3,
      date: '6 Nov 2026',
      title: 'Innovation, Partnerships & Future Growth',
      sessions: [
        { time: '09:00 – 09:45', title: 'Future of AI Technologies', type: 'panel' },
        { time: '09:45 – 10:30', title: 'Building AI-Ready Organizations', type: 'panel' },
        { time: '10:30 – 11:00', title: 'Coffee Break', type: 'break' },
        { time: '11:00 – 12:00', title: 'Startup Innovation Showcase', type: 'keynote' },
        { time: '12:00 – 13:00', title: 'Business Matchmaking Meetings', type: 'networking' },
        { time: '13:00 – 14:00', title: 'Networking Lunch', type: 'break' },
        { time: '14:00 – 15:30', title: 'Roundtable Discussions', type: 'workshop' },
        { time: '15:30 – 16:00', title: 'Closing Keynote', type: 'keynote' },
        { time: '16:00 – 16:30', title: 'Certificate Distribution & Closing Ceremony', type: 'keynote' },
      ],
    }`;

const chinaAgenda = `    {
      day: 1,
      date: '14 Jan 2027',
      title: 'Opening & China HealthTech Innovation',
      sessions: [
        { time: '08:30 – 09:30', title: 'Registration & Welcome Coffee', type: 'networking' },
        { time: '09:30 – 09:45', title: 'Opening Ceremony', type: 'keynote' },
        { time: '09:45 – 10:30', title: 'Opening Keynote: China\\'s Healthcare Innovation & Global Opportunities', type: 'keynote' },
        { time: '10:30 – 11:15', title: 'Medical Technology Trends', type: 'panel' },
        { time: '11:15 – 11:45', title: 'Coffee Break', type: 'break' },
        { time: '11:45 – 12:30', title: 'Chinese Medical Device Manufacturers Presentation', type: 'panel' },
        { time: '12:30 – 13:30', title: 'Networking Lunch', type: 'break' },
        { time: '13:30 – 15:00', title: 'Exhibition Tour', type: 'networking' },
        { time: '15:00 – 15:30', title: 'Coffee Break', type: 'break' },
        { time: '15:30 – 17:30', title: 'B2B Networking Meetings', type: 'networking' },
      ],
    },
    {
      day: 2,
      date: '15 Jan 2027',
      title: 'Business Development & Product Showcase',
      sessions: [
        { time: '09:00 – 10:00', title: 'Medical Equipment Demonstrations', type: 'workshop' },
        { time: '10:00 – 10:45', title: 'Hospital Procurement Opportunities', type: 'panel' },
        { time: '10:45 – 11:15', title: 'Coffee Break', type: 'break' },
        { time: '11:15 – 12:15', title: 'Healthcare Investment Opportunities', type: 'panel' },
        { time: '12:15 – 13:15', title: 'Networking Lunch', type: 'break' },
        { time: '13:15 – 15:30', title: 'Pre-Scheduled B2B Meetings', type: 'networking' },
        { time: '15:30 – 16:00', title: 'Coffee Break', type: 'break' },
        { time: '16:00 – 17:30', title: 'Distributor & Buyer Meetings', type: 'networking' },
      ],
    },
    {
      day: 3,
      date: '16 Jan 2027',
      title: 'International Partnerships & Market Expansion',
      sessions: [
        { time: '09:00 – 10:00', title: 'Entering European & CIS Healthcare Markets', type: 'panel' },
        { time: '10:00 – 10:45', title: 'Regulatory Requirements & Market Access', type: 'panel' },
        { time: '10:45 – 11:15', title: 'Coffee Break', type: 'break' },
        { time: '11:15 – 12:30', title: 'International Buyer–Supplier Matchmaking', type: 'networking' },
        { time: '12:30 – 13:30', title: 'Networking Lunch', type: 'break' },
        { time: '13:30 – 15:00', title: 'Strategic Partnership Meetings', type: 'networking' },
        { time: '15:00 – 15:30', title: 'Signing Ceremony (Optional)', type: 'networking' },
        { time: '15:30 – 16:00', title: 'Closing Remarks', type: 'keynote' },
        { time: '16:00 – 17:00', title: 'Farewell Networking Session', type: 'networking' },
      ],
    }`;

// Let's accurately find and replace inside eventAgendas
file = file.replace(/(export const eventAgendas: Record<string, IAgendaDay\[\]> = \{\s*'dubai-ai-summit-2026': \[.*?\]\,\s*'amsterdam-enterprise-ai-2026': \[)(.*?)(\],\s*'china-healthtech-2027': \[)(.*?)(\],\s*\};)/s, 
"$1\n" + amsterdamAgenda + "\n$3\n" + chinaAgenda + "\n$5");

fs.writeFileSync('data/events.ts', file);
