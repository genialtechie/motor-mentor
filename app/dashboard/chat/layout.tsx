export const metadata = {
  title: 'MotorMentor by Magpollo',
  description: 'Your personal car expert',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section className="h-screen w-full bg-white">{children}</section>;
}
