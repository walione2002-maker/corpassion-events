const fs = require('fs');

const files = [
  'app/checkout/booth/[id]/page.tsx',
  'app/checkout/sponsorship/[id]/page.tsx',
  'app/checkout/ticket/[id]/page.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/catch \(err: any\)/g, 'catch (err: unknown)');
  content = content.replace(/err\.message/g, '(err instanceof Error ? err.message : "An unknown error occurred")');
  fs.writeFileSync(file, content, 'utf8');
});

console.log('Fixed any types in checkout pages');
