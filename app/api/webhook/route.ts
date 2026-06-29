import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2026-06-24.dahlia' as any,
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder';

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature found' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('Payment was successful for session:', session.id);
      
      // TODO: Securely log or fulfill the ticket purchase in a database
      // Example DB logic:
      // await db.tickets.create({
      //   data: {
      //     email: session.customer_email,
      //     name: session.metadata?.attendeeName,
      //     company: session.metadata?.company,
      //     role: session.metadata?.role,
      //     passType: session.metadata?.passType,
      //     stripeSessionId: session.id,
      //     amountPaid: session.amount_total,
      //     status: 'CONFIRMED'
      //   }
      // });
      
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
