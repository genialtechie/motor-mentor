'use client';

import { useAtlasUser } from '@/context/UserContext';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { Menu, Settings, Logout, Send } from '@mui/icons-material';
import Sidebar from '../components/dashboard/Sidebar';
import Link from 'next/link';
import { InputBase, IconButton, Paper } from '@mui/material';

export default function Chat(): JSX.Element {
  const { user } = useAtlasUser();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!user?.isSuscribed) {
      redirect('/dashboard');
    }
  }, [user]);
  return (
    <>
      <nav className="p-6 w-full h-fit flex flex-row justify-between">
        <Menu
          className="scale-125 cursor-pointer rounded-full ring-gray-400 ring-offset-4 ring-1 transition-colors duration-300 delay-75 hover:text-primary"
          onClick={() => setOpen(!open)}
        />
        <div className="w-fit">
          <Link href="/dashboard/settings">
            <Settings className="mr-6 scale-125 cursor-pointer rounded-full ring-gray-400 ring-offset-4 ring-1 transition-colors duration-300 delay-75 hover:text-primary" />
          </Link>
          <a href="/api/auth/logout">
            <Logout className="scale-125 cursor-pointer rounded-full ring-gray-400 ring-offset-4 ring-1 transition-colors duration-300 delay-75 hover:text-primary" />
          </a>
        </div>
        <Sidebar
          openSidebar={open}
          setOpenSidebar={setOpen}
          navItems={[
            { name: 'Overview', href: '/dashboard' },
            { name: 'AI Chat', href: '/chat' },
            { name: 'Maintenance', href: '/dashboard/maint' },
          ]}
        />
      </nav>
      <div className="flex flex-col h-full w-full">
        <div className="flex flex-col h-full w-full bg-off-white p-10">
          <div className="h-full w-full flex items-center justify-center">
            <h3 className="rounded-md ring-2 ring-offset-2 ring-gray-400 ring-opacity-50 p-4">
              My car wont start, what could be the problem?
            </h3>
          </div>
        </div>
        <div className="absolute bottom-0 h-fit w-full bg-white">
          <Paper
            component="form"
            className="w-full h-16 flex flex-row items-center"
          >
            <InputBase
              className="flex-grow px-4"
              placeholder="Type here..."
              inputProps={{ 'aria-label': 'type here' }}
            />
            <IconButton
              type="submit"
              className="mr-4"
            >
              <Send />
            </IconButton>
          </Paper>
        </div>
      </div>
    </>
  );
}
