import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import initStripe from 'stripe';
import prisma from '@/lib/prisma/prisma';
const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

export default withApiAuthRequired(async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const session = await getSession(req, res);
      const loggedInUser = session.user;
      // find or create user in db

      const customer = await stripe.customers.create({
        email: loggedInUser.email,
      });

      const user = await prisma.user.upsert({
        where: { email: loggedInUser.email },
        update: {},
        create: {
          email: loggedInUser.email,
          name: loggedInUser.name,
          providerId: loggedInUser.sub,
          stripeId: customer.id,
        },
        include: {
          cars: {
            orderBy: {
              createdAt: 'desc',
            },
          },
        },
      });
      res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      res.status(error.status || 500).end(error.message);
    }
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
});
