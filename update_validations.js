const fs = require('fs');

let content = fs.readFileSync('lib/validations.ts', 'utf8');

const nameRegex = `.regex(/^[a-zA-Z\\\\s-']+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes')`;
const phoneRegex = `.regex(/^[\\\\+]?[(]?[0-9]{3}[)]?[-\\\\s\\\\.]?[0-9]{3}[-\\\\s\\\\.]?[0-9]{4,6}$/im, 'Invalid phone number format')`;

// Update ticket schema
content = content.replace(/name: z\.string\(\)\.min\(2, 'Name must be at least 2 characters'\)/, `name: z.string().min(2, 'Name must be at least 2 characters')${nameRegex}`);

// Update booth schema
content = content.replace(/contactName: z\.string\(\)\.min\(2, 'Contact name is required'\)/, `contactName: z.string().min(2, 'Contact name is required')${nameRegex}`);
content = content.replace(/phone: z\.string\(\)\.min\(5, 'Phone number is required'\)/, `phone: z.string().min(5, 'Phone number is required')${phoneRegex}`);

// Update sponsorship schema
content = content.replace(/contactName: z\.string\(\)\.min\(2, 'Contact name is required'\)/, `contactName: z.string().min(2, 'Contact name is required')${nameRegex}`);
content = content.replace(/phone: z\.string\(\)\.min\(5, 'Phone number is required'\)/, `phone: z.string().min(5, 'Phone number is required')${phoneRegex}`);

fs.writeFileSync('lib/validations.ts', content, 'utf8');
