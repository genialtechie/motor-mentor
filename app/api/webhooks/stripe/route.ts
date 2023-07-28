import { headers } from 'next/headers';
import { buffer } from 'micro';
import prisma from '@/lib/prisma/prisma';
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripeKey = process.env.STRIPE_SECRET_KEY || '';
const stripe = new Stripe(stripeKey, {
  apiVersion: '2022-11-15',
});

//listen for webhooks
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  const sig = headers().get('stripe-signature') || '';
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
  const body = await request.json();
  const bufferReq = await buffer(body);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    console.log('event', event);
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`, err);
    return NextResponse.json({ error: err }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      // Fulfill the purchase...
      await fulfillOrder(session);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  return NextResponse.json({ received: true }, { status: 200 });
}
