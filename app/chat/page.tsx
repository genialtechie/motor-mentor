'use client';

import { useAtlasUser } from '@/context/UserContext';
import { useError } from '@/context/ErrorContext';
import { useEffect, useState, useRef } from 'react';
import { redirect } from 'next/navigation';
import { Menu, Settings, Logout, Send } from '@mui/icons-material';
import Sidebar from '../components/dashboard/Sidebar';
import Link from 'next/link';
import { InputBase, IconButton, Paper } from '@mui/material';

export default function Chat(): JSX.Element {
  const { user } = useAtlasUser();
  const { setError } = useError();
  const [open, setOpen] = useState(false); // sidebar
  // chat state
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // send message
  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (loading) return; // prevent spamming
    if (message === '') return; // prevent empty messages
    setLoading(true); // set loading
    setMessages([...messages, { message, isUser: true }]); // add message to chat
    setMessage(''); // reset message
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      setMessages([...messages, { message: data.message, isUser: false }]);
    } catch (err) {
      console.error(err);
      setError(true);
    }
    setLoading(false);
  };

  // wait for user to load
  useEffect(() => {
    // wait for user to load
    if (!user) return;
    if (user.isSuscribed === false) {
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
          {messages.length > 0 ? (
            <div className="h-full w-full">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-row p-2 m-3 mb-5 ${
                    msg.isUser ? 'justify-end' : ''
                  }`}
                >
                  <div
                    className={`rounded-lg rounded-br-none ring-1 ring-offset-2 ring-gray-400 ring-opacity-50 p-4 bg-primary text-white`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <h3 className="rounded-md ring-2 ring-offset-2 ring-gray-400 ring-opacity-50 p-4">
                My car won't start, what could be the problem?
                <IconButton
                  className="ml-4"
                  aria-label="send"
                  onClick={() => {
                    inputRef.current?.focus();
                    setMessage(
                      "My car won't start, what could be the problem?"
                    );
                  }}
                >
                  <Send />
                </IconButton>
              </h3>
            </div>
          )}
        </div>
        <div className="absolute bottom-0 h-fit w-full bg-white">
          <Paper
            component="form"
            className="w-full h-16 flex flex-row items-center"
          >
            <InputBase
              className="flex-grow px-4"
              placeholder="Type here..."
              inputProps={{ 'aria-label': 'type here', ref: inputRef }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendMessage(e);
              }}
            />
            <IconButton
              type="submit"
              className="mr-4"
              aria-label="send"
              onClick={sendMessage}
            >
              <Send />
            </IconButton>
          </Paper>
        </div>
      </div>
    </>
  );
}
