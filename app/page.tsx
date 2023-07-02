'use client';
import Nav from './components/shared/Nav';
import Footer from './components/shared/Footer';
import ButtonInverted from './components/shared/ButtonInverted';
import Lottie from 'lottie-react';
import mechanicAnimation from '../public/lotties/motormentor.json';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Nav
        navItems={[
          { name: 'Home', href: '/' },
          { name: 'Login', href: '/api/auth/login' },
          { name: 'Pricing', href: '/pricing' },
        ]}
      />
      <div className="container mt-10 mx-auto max-w-2xl p-5">
        <h1 className="text-3xl md:text-5xl font-bold font-serif tracking-wide text-center">
          Step into the shoes of a seasoned mechanic
        </h1>
        <p className="text-center my-3 text-black/60">
          Diagnose and fix your car problems with expert guidance from our AI
          chatbot and dashboard tools.
        </p>
        <div className="mx-auto mt-8 h-fit w-fit">
          <ButtonInverted
            href="api/auth/login"
            className="px-12 py-4 font-bold text-lg"
          >
            Get Started
          </ButtonInverted>
          {/* <a href="/api/auth/login">Get Started</a> */}
        </div>
      </div>
      <div className="w-full px-5 flex-1 flex flex-col justify-center items-center">
        <Lottie animationData={mechanicAnimation} />
      </div>
      <Footer />
    </div>
  );
}
