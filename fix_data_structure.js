const fs = require('fs');
let file = fs.readFileSync('data/events.ts', 'utf8');

// Fix ITicketTier
file = file.replace(/('amsterdam-enterprise-ai-2026': \[)[\s\S]*?(\],\n  'china-healthtech-2027': \[)[\s\S]*?(\],\n\};\n\nexport const eventBoothOptions)/s,
`$1
    { id: 'early-bird', name: 'Early Bird', price: 449, deadline: 'Register Early' },
    { id: 'standard', name: 'Standard', price: 599, deadline: 'Standard Rate', emphasized: true },
    { id: 'late', name: 'Late', price: 699, deadline: 'Late Registration' },
$2
    { id: 'early-bird', name: 'Early Bird', price: 299, deadline: 'Register Early' },
    { id: 'standard', name: 'Standard', price: 399, deadline: 'Standard Rate', emphasized: true },
    { id: 'late', name: 'Late', price: 499, deadline: 'Late Registration' },
$3`);

// Fix IBoothOption
file = file.replace(/(export const eventBoothOptions: Record<string, IBoothOption\[\]> = \{\s*'dubai-ai-summit-2026': \[.*?\]\,\s*'amsterdam-enterprise-ai-2026': \[)(.*?)(\],\s*'china-healthtech-2027': \[)(.*?)(\],\s*\};\n\nexport const eventSponsorshipPackages)/s,
`$1
    { id: 'standard', name: 'Standard Booth (2m × 2m)', price: 1500, description: 'Standard exhibition space for promoting your brand.' },
    { id: 'premium', name: 'Premium Booth (3m × 3m)', price: 2200, description: 'Premium location with high foot traffic.' },
    { id: 'custom', name: 'Custom Booth', price: 0, description: 'Price on Request. Custom designed booth space tailored to your needs.' },
$3
    { id: 'standard', name: 'Standard Booth (2m × 2m)', price: 900, description: 'Standard exhibition space for promoting your brand.' },
    { id: 'premium', name: 'Premium Booth (3m × 3m)', price: 1400, description: 'Premium location with high foot traffic.' },
    { id: 'custom', name: 'Custom Booth', price: 0, description: 'Price on Request. Custom designed booth space tailored to your needs.' },
$5`);

// Fix ISponsorshipPackage
file = file.replace(/(export const eventSponsorshipPackages: Record<string, ISponsorshipPackage\[\]> = \{\s*'dubai-ai-summit-2026': \[.*?\]\,\s*'amsterdam-enterprise-ai-2026': \[)(.*?)(\],\s*'china-healthtech-2027': \[)(.*?)(\],\s*\};\n\n\/\/ ─── Agenda)/s,
`$1
    { id: 'event', tier: 'Event Sponsor', price: 12000, exclusive: true, pitch: 'Top-tier branding.', benefits: ['Main stage keynote', '6m x 3m booth'] },
    { id: 'platinum', tier: 'Platinum Sponsor', price: 7500, pitch: 'High visibility.', benefits: ['Panel slot', '3m x 3m booth'] },
    { id: 'gold', tier: 'Gold Sponsor', price: 4500, pitch: 'Excellent branding.', benefits: ['2m x 2m booth', '3 passes'] },
$3
    { id: 'event', tier: 'Event Sponsor', price: 8000, exclusive: true, pitch: 'Top-tier branding.', benefits: ['Main stage keynote', '6m x 3m booth'] },
    { id: 'platinum', tier: 'Platinum Sponsor', price: 5000, pitch: 'High visibility.', benefits: ['Panel slot', '3m x 3m booth'] },
    { id: 'gold', tier: 'Gold Sponsor', price: 3000, pitch: 'Excellent branding.', benefits: ['2m x 2m booth', '3 passes'] },
$5`);

fs.writeFileSync('data/events.ts', file);
