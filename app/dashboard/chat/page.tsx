'use client';

import { useAtlasUser } from '@/context/UserContext';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function Chat(): JSX.Element {
  const { user } = useAtlasUser();

  useEffect(() => {
    if (!user?.isSuscribed) {
      redirect('/dashboard');
    }
  }, [user]);
  return <div></div>;
}
