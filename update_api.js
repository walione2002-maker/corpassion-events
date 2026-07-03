const fs = require('fs');

let content = fs.readFileSync('app/api/checkout/route.ts', 'utf8');

// Add DOMPurify import
if (!content.includes('isomorphic-dompurify')) {
  content = content.replace(
    "import { checkoutSchema } from '@/lib/validations';",
    "import { checkoutSchema } from '@/lib/validations';\nimport DOMPurify from 'isomorphic-dompurify';"
  );
}

// Sanitize inputs
const sanitizationLogic = `
    // Sanitize all string fields
    Object.keys(validatedData).forEach(key => {
      if (typeof validatedData[key] === 'string') {
        validatedData[key] = DOMPurify.sanitize(validatedData[key]);
      }
    });
`;

if (!content.includes('DOMPurify.sanitize')) {
  content = content.replace(
    'const validatedData = checkoutSchema.parse(body);',
    'const validatedData = checkoutSchema.parse(body);' + sanitizationLogic
  );
}

// Fix any types
content = content.replace('catch (error: any)', 'catch (error: unknown)');
content = content.replace('if (error.name === \'ZodError\')', 'if (error instanceof Error && error.name === \'ZodError\')');
content = content.replace('details: error.errors', 'details: (error as any).errors'); // Let's try not to use any, wait `z.ZodError` is better.
content = content.replace('const approveLink = orderData.links.find((link: any) => link.rel === \'approve\');', 'const approveLink = orderData.links.find((link: { rel: string, href: string }) => link.rel === \'approve\');');

fs.writeFileSync('app/api/checkout/route.ts', content, 'utf8');
console.log('API route updated');
