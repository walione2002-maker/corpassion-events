const fs = require('fs');
const path = require('path');

const files = [
  'app/checkout/ticket/[id]/page.tsx',
  'app/checkout/booth/[id]/page.tsx',
  'app/checkout/sponsorship/[id]/page.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace the mapping of payment methods
    const oldMapping = `[
                    { id: 'paypal', title: 'Credit Card / PayPal', desc: 'Pay securely via PayPal' },
                    { id: 'bank_transfer', title: 'Bank Transfer', desc: 'Offline wire transfer instructions' },
                    { id: 'whatsapp', title: 'Talk to Representative', desc: 'Book tickets via WhatsApp' }
                  ]`;
    const newMapping = `[
                    { id: 'paypal', title: 'Credit Card / PayPal', desc: 'Pay securely via PayPal' },
                    { id: 'bank_transfer', title: 'Bank Transfer', desc: 'Offline wire transfer instructions' },
                    { id: 'whatsapp_uae', title: 'WhatsApp (UAE Office)', desc: 'Book via WhatsApp (+971 543770146)' },
                    { id: 'whatsapp_pk', title: 'WhatsApp (PK Office)', desc: 'Book via WhatsApp (+92 309 1020225)' }
                  ]`;
    
    // Fallback if the first replace fails due to whitespace differences
    content = content.replace(/\[\s*\{\s*id:\s*'paypal'[\s\S]*?'whatsapp'[\s\S]*?\}\s*\]/, newMapping);

    // Replace button text
    const oldButtonText = `paymentMethod === 'whatsapp' ? 'Continue on WhatsApp' :`;
    const newButtonText = `paymentMethod.startsWith('whatsapp') ? 'Continue on WhatsApp' :`;
    content = content.replace(oldButtonText, newButtonText);

    fs.writeFileSync(filePath, content);
  }
});

// Update API route
const apiFile = path.join(__dirname, 'app/api/checkout/route.ts');
if (fs.existsSync(apiFile)) {
  let content = fs.readFileSync(apiFile, 'utf8');
  
  // Replace the whatsapp handling in the API route
  const oldApiCode = `if (payload.paymentMethod === 'whatsapp') {
      const waNumber = '923332230665';
      const text = encodeURIComponent(
        \`Hi, I would like to book a \${payload.type} (\${payload.packageId}) for \${payload.company}.\\nName: \${payload.name || payload.contactName}\\nEmail: \${payload.email}\`
      );
      return NextResponse.json({
        url: \`https://wa.me/\${waNumber}?text=\${text}\`,
        method: 'whatsapp'
      });
    }`;

  const newApiCode = `if (payload.paymentMethod === 'whatsapp_uae' || payload.paymentMethod === 'whatsapp_pk') {
      const waNumber = payload.paymentMethod === 'whatsapp_uae' ? '971543770146' : '923091020225';
      const text = encodeURIComponent(
        \`Hi, I would like to book a \${payload.type} (\${payload.packageId}) for \${payload.company}.\\nName: \${(payload as any).name || (payload as any).contactName}\\nEmail: \${payload.email}\`
      );
      return NextResponse.json({
        url: \`https://wa.me/\${waNumber}?text=\${text}\`,
        method: 'whatsapp'
      });
    }`;

  content = content.replace(oldApiCode, newApiCode);
  fs.writeFileSync(apiFile, content);
}
