'use client';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
import { useAtlasUser } from '@/context/UserContext';
import { Paper, Skeleton } from '@mui/material';
import { Suspense } from 'react';
import CarInfo from '../components/dashboard/CarInfo';

export default withPageAuthRequired(function Dashboard(): JSX.Element {
  const { user, setUser } = useAtlasUser();
  const [openCarModal, setOpenCarModal] = useState(false);
  //fetch user from api/user endpoint on page load
  useEffect(() => {
    fetch('/api/user')
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
      });
  }, []);
  //check if user has cars and open car modal if not
  useEffect(() => {
    if (user?.cars && user?.cars?.length < 1) {
      setOpenCarModal(true);
    }
  }, [user]);

  return (
    <div>
      {user?.name ? (
        <h1 className="text-xl text-left mb-10">
          Welcome, <b className="text-secondary-dark">{user?.name}</b>!
        </h1>
      ) : (
        <Skeleton
          variant="text"
          width="30%"
          height="20"
        />
      )}

      <CarInfo
        openCarModal={openCarModal}
        setOpenCarModal={setOpenCarModal}
      />
    </div>
  );
});
