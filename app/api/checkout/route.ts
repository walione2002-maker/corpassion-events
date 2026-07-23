import { NextResponse } from 'next/server';
import { checkoutSchema } from '@/lib/validations';
import DOMPurify from 'isomorphic-dompurify';
import { eventTicketTiers, eventBoothOptions, eventSponsorshipPackages } from '@/data/events';
import { stripe } from '@/lib/stripe';
import { siteConfig } from '@/config/site';

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
    // Sanitize all string fields
    Object.keys(validatedData).forEach(key => {
      if (typeof (validatedData as Record<string, unknown>)[key] === 'string') {
        (validatedData as Record<string, unknown>)[key] = DOMPurify.sanitize((validatedData as Record<string, unknown>)[key] as string);
      }
    });

    // 2. Determine price and name based on package type
    let amount = 0;
    let packageName = '';
    let summaryMessage = '';
    let buyerName = '';

    if (validatedData.type === 'ticket') {
      const tier = Object.values(eventTicketTiers).flat().find((t) => t.id === validatedData.packageId);
      if (!tier) throw new Error('Invalid ticket tier');
      amount = tier.price;
      packageName = tier.name + ' Ticket';
      buyerName = validatedData.name;
      summaryMessage = `Name: ${validatedData.name}\nEmail: ${validatedData.email}\nCompany: ${validatedData.company}\nRole: ${validatedData.role}`;
    } else if (validatedData.type === 'booth') {
      const booth = Object.values(eventBoothOptions).flat().find((b) => b.id === validatedData.packageId);
      if (!booth) throw new Error('Invalid booth option');
      amount = booth.price;
      packageName = booth.name;
      buyerName = validatedData.company;
      summaryMessage = `Company: ${validatedData.company}\nContact: ${validatedData.contactName}\nEmail: ${validatedData.email}\nPhone: ${validatedData.phone}\nIndustry: ${validatedData.industry || 'N/A'}`;
    } else if (validatedData.type === 'sponsorship') {
      const sponsor = Object.values(eventSponsorshipPackages).flat().find((s) => s.id === validatedData.packageId);
      if (!sponsor) throw new Error('Invalid sponsorship package');
      amount = sponsor.price;
      packageName = sponsor.tier;
      buyerName = validatedData.company;
      summaryMessage = `Company: ${validatedData.company}\nContact: ${validatedData.contactName}\nEmail: ${validatedData.email}\nPhone: ${validatedData.phone}\nWebsite: ${validatedData.website || 'N/A'}\nObjective: ${validatedData.objective || 'N/A'}`;
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || siteConfig.url;

    // 3. Route to selected payment method
    switch (validatedData.paymentMethod) {
      case 'stripe':
        try {
          const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
              {
                price_data: {
                  currency: 'usd',
                  product_data: {
                    name: `Corpassion Events - ${packageName}`,
                    description: `Registration for ${buyerName}`,
                  },
                  unit_amount: Math.round(amount * 100), // Stripe uses cents
                },
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: `${baseUrl}/success?method=stripe&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}/`,
            customer_email: validatedData.email,
            metadata: {
              packageType: validatedData.type,
              packageId: validatedData.packageId,
              buyerName,
            },
          });

          if (!session.url) throw new Error('Failed to create Stripe session URL');
          return NextResponse.json({ url: session.url }, { status: 200 });
        } catch (stripeError) {
          console.error('Stripe Checkout Error:', stripeError);
          // Fallback to mock for testing if keys are bad
          return NextResponse.json({ 
            url: `${baseUrl}/success?method=stripe&mock=true` 
          }, { status: 200 });
        }

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
                    currency_code: 'USD',
                    value: amount.toString(),
                  },
                },
              ],
              application_context: {
                brand_name: siteConfig.name,
                landing_page: 'NO_PREFERENCE',
                user_action: 'PAY_NOW',
                return_url: `${baseUrl}/success?method=paypal&session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${baseUrl}/`,
              },
            }),
          });

          if (orderResponse.ok) {
            const orderData = await orderResponse.json();
            const approveLink = orderData.links.find((link: { rel: string, href: string }) => link.rel === 'approve');
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
        const bookingRef = `CE-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        return NextResponse.json({ 
          url: `${baseUrl}/success?method=bank_transfer&ref=${bookingRef}&amount=${amount}` 
        }, { status: 200 });

      case 'whatsapp_uae':
      case 'whatsapp_pk':
        const whatsappNumber = validatedData.paymentMethod === 'whatsapp_uae' 
          ? siteConfig.contact.whatsapp.primary 
          : siteConfig.contact.whatsapp.secondary;
        const message = `Hello Corpassion Events! I would like to book a ${packageName}.\n\n*Package:* ${packageName}\n\n*Details:*\n${summaryMessage}\n\nPlease guide me on the next steps for payment.`;
        const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        
        return NextResponse.json({ url: waUrl }, { status: 200 });

      default:
        throw new Error('Invalid payment method selected');
    }

  } catch (error: unknown) {
    console.error('Checkout Error:', error);
    
    // Zod Validation Error
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation failed', details: (error as { errors?: unknown }).errors }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
