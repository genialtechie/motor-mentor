import './globals.css';
import { Inter, Rubik } from 'next/font/google';
import AuthProvider from './providers';

const inter = Inter({ subsets: ['latin'] });
const rubik = Rubik({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-rubik',
});

export const metadata = {
  title: 'MotorMentor by Magpollo',
  description: 'Your personal car expert',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${rubik.variable} flex flex-col`}>
        <form
          name="newsletter"
          data-netlify="true"
          netlify-honeypot="bot-field"
          hidden
        >
          <input
            type="email"
            name="email"
          />
        </form>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
