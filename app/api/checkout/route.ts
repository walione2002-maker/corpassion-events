import { NextResponse } from 'next/server';
import { checkoutSchema } from '@/lib/validations';
import { ticketTiers, boothOptions, sponsorshipPackages } from '@/data/events';

// PayPal Configuration
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || 'sb';
const PAYPAL_SECRET = process.env.PAYPAL_SECRET || 'secret';
const PAYPAL_API_BASE = process.env.PAYPAL_MODE === 'live' 
  ? 'https://api-m.paypal.com' 
  : 'https://api-m.sandbox.paypal.com';

async function generatePayPalAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString('base64');
  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${auth}`,
    },
    body: 'grant_type=client_credentials',
  });
  
  if (!response.ok) {
    throw new Error('Failed to generate PayPal access token');
  }
  
  const data = await response.json();
  return data.access_token;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Server-side Zod validation
    const validatedData = checkoutSchema.parse(body);

    // 2. Determine price and name based on package type
    let amountGBP = 0;
    let packageName = '';
    let summaryMessage = '';
    let buyerName = '';

    if (validatedData.type === 'ticket') {
      const tier = ticketTiers.find((t) => t.id === validatedData.packageId);
      if (!tier) throw new Error('Invalid ticket tier');
      amountGBP = tier.price;
      packageName = tier.name + ' Ticket';
      buyerName = validatedData.name;
      summaryMessage = `Name: ${validatedData.name}\nEmail: ${validatedData.email}\nCompany: ${validatedData.company}\nRole: ${validatedData.role}`;
    } else if (validatedData.type === 'booth') {
      const booth = boothOptions.find((b) => b.id === validatedData.packageId);
      if (!booth) throw new Error('Invalid booth option');
      amountGBP = booth.price;
      packageName = booth.name;
      buyerName = validatedData.company;
      summaryMessage = `Company: ${validatedData.company}\nContact: ${validatedData.contactName}\nEmail: ${validatedData.email}\nPhone: ${validatedData.phone}\nIndustry: ${validatedData.industry || 'N/A'}`;
    } else if (validatedData.type === 'sponsorship') {
      const sponsor = sponsorshipPackages.find((s) => s.id === validatedData.packageId);
      if (!sponsor) throw new Error('Invalid sponsorship package');
      amountGBP = sponsor.price;
      packageName = sponsor.tier;
      buyerName = validatedData.company;
      summaryMessage = `Company: ${validatedData.company}\nContact: ${validatedData.contactName}\nEmail: ${validatedData.email}\nPhone: ${validatedData.phone}\nWebsite: ${validatedData.website || 'N/A'}\nObjective: ${validatedData.objective || 'N/A'}`;
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // 3. Route to selected payment method
    switch (validatedData.paymentMethod) {
      case 'paypal':
        try {
          // Attempt to create a real PayPal order
          const accessToken = await generatePayPalAccessToken();
          
          const orderResponse = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              intent: 'CAPTURE',
              purchase_units: [
                {
                  reference_id: `corpassion_${Date.now()}`,
                  description: `Corpassion Events - ${packageName} for ${buyerName}`,
                  amount: {
                    currency_code: 'GBP',
                    value: amountGBP.toString(),
                  },
                },
              ],
              application_context: {
                brand_name: 'Corpassion Events',
                landing_page: 'NO_PREFERENCE',
                user_action: 'PAY_NOW',
                return_url: `${baseUrl}/success?method=paypal&session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${baseUrl}/`,
              },
            }),
          });

          if (orderResponse.ok) {
            const orderData = await orderResponse.json();
            const approveLink = orderData.links.find((link: any) => link.rel === 'approve');
            if (approveLink) {
              return NextResponse.json({ url: approveLink.href }, { status: 200 });
            }
          }
        } catch (paypalError) {
          console.warn('PayPal integration not fully configured, falling back to mock URL', paypalError);
        }
        
        // Fallback for when keys aren't set
        return NextResponse.json({ 
          url: `${baseUrl}/success?method=paypal&mock=true` 
        }, { status: 200 });

      case 'bank_transfer':
        // Generate a booking reference
        const bookingRef = `CE-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        // Redirect to a specific instructions page or success page with the method
        return NextResponse.json({ 
          url: `${baseUrl}/success?method=bank_transfer&ref=${bookingRef}&amount=${amountGBP}` 
        }, { status: 200 });

      case 'whatsapp':
        // Create a pre-filled WhatsApp URL
        const whatsappNumber = '923332230665';
        const message = `Hello Corpassion Events! I would like to book a ${packageName}.\n\n*Package:* ${packageName}\n\n*Details:*\n${summaryMessage}\n\nPlease guide me on the next steps for payment.`;
        const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        
        return NextResponse.json({ url: waUrl }, { status: 200 });

      default:
        throw new Error('Invalid payment method selected');
    }

  } catch (error: any) {
    console.error('Checkout Error:', error);
    
    // Zod Validation Error
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
