const fs = require('fs');
let c = fs.readFileSync('app/api/checkout/route.ts', 'utf8');

c = c.replace(
  "if (typeof validatedData[key] === 'string') {",
  "if (typeof (validatedData as Record<string, unknown>)[key] === 'string') {"
);

c = c.replace(
  "validatedData[key] = DOMPurify.sanitize(validatedData[key]);",
  "(validatedData as Record<string, unknown>)[key] = DOMPurify.sanitize((validatedData as Record<string, unknown>)[key] as string);"
);

fs.writeFileSync('app/api/checkout/route.ts', c);
