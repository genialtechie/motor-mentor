export const metadata = {
  title: 'Chat | MotorMentor by Magpollo',
  description: 'Your personal car expert',
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen overflow-hidden w-full bg-white">
      {children}
    </section>
  );
}
