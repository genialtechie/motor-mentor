'use client';
import Paper from '@mui/material/Paper';
import DashNav from '../components/dashboard/DashNav';

export const metadata = {
  title: 'Dashboard | MotorMentor by Magpollo',
  description: 'Your personal car expert',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col w-full lg:p-10">
      <DashNav
        navItems={[
          { name: 'Overview', href: '/dashboard' },
          { name: 'AI Chat', href: '/dashboard/chat' },
          { name: 'Manage Cars', href: '/dashboard/cars' },
        ]}
      />
      <Paper
        className="p-7 min-h-screen h-full w-full max-w-6xl mx-auto"
        elevation={6}
      >
        {children}
      </Paper>
    </section>
  );
}
