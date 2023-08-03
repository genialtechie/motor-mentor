# MotorMentor - AI Powered Car Diagnosis

This is an Ai app that tells you what could be wrong with your car based on the symptoms you provide. You can also get possible maintenance updates and recall information directly to your email.

## Features

- [x] Diagnosis
- [x] Maintenance Updates
- [x] Recall Information
- [x] Email Notifications

## Requirements

To run the example locally you need to:

1. Sign up at [OpenAI's Developer Platform](https://platform.openai.com/signup).
2. Go to [OpenAI's dashboard](https://platform.openai.com/account/api-keys) and create an API KEY.
3. Sign up at [Stripe](https://stripe.com) and get your API keys.
4. Sign up at [Auth0](https://auth0.com) and get your API keys.
5. Sign up at [CarMD](https://www.carmd.com/) and get your API keys.
6. Sign up at [MongoDB](https://www.mongodb.com/) and get your DB URI.
7. Set the required environment variables as the token value as shown [the example env file](./.env.local.example) but in a new file called `.env.local`
8. `pnpm install` or `npm install` to install the required dependencies.
9. Run `npx prisma generate` to generate the Prisma client.
10. Run `npx prisma db push` to create the database tables.
11. `pnpm dev` or `npm run dev` to start the development server.

## Resources

- [Magpollo](https://magpollo.com/) - learn about Magpollo.
- [Stripe API docs](https://stripe.com/docs/api) - learn about the Stripe API.
- [Auth0 Next.js SDK docs](https://auth0.com/docs/quickstart/webapp/nextjs) - learn about the Auth0 Next.js SDK.
- [Prisma docs](https://www.prisma.io/docs/) - learn about Prisma.
- [Material UI](https://material-ui.com/) - learn about Material UI.
- [CarMd API docs](https://api.carmd.com/member/docs) - learn about the CarMD API.
- [Vercel AI SDK docs](https://sdk.vercel.ai/docs) - learn about the Vercel AI SDK.
- [OpenAI Documentation](https://platform.openai.com/docs) - learn about OpenAI features and API.
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

## TODO

- [x] stripe webhook
- [] homepage features section
- [] ai chatbot
- [] maintenance page
- [] settings page
- [] track multiple cars for suscribers
