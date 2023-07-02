'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Github from '../svg/Github';
import Logo from '../svg/MotorMentor';
import ButtonPrimary from './ButtonPrimary';

export default function Nav({
  navItems,
}: {
  navItems: { href: string; name: string }[];
}) {
  // check if screen is mobile
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  function handleScreenResize() {
    window.addEventListener('resize', () => {
      window.innerWidth < 768 ? setIsMobile(true) : setIsMobile(false);
    });
  }

  useEffect(() => {
    handleScreenResize();

    return () => {
      window.removeEventListener('resize', handleScreenResize);
    };
  }, []);

  return (
    <nav className="w-full h-fit flex flex-row justify-between items-center px-4 py-2">
      <a href="/">
        <Logo />
      </a>

      {!isMobile && (
        <div className="w-fit h-fit px-1 py-1 flex flex-row items-center rounded-md border border-solid border-gray-500 bg-slate-300/30">
          {navItems.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={
                  isActive
                    ? 'text-primary mx-2'
                    : 'text-black mx-2 hover:text-primary transition-all duration-300 ease-in-out'
                }
              >
                {item.name}
              </Link>
            );
          })}
          <ButtonPrimary
            className="mx-2"
            href="/#demo"
          >
            Try It!
          </ButtonPrimary>
        </div>
      )}
      {!isMobile && (
        <div className="h-10 flex flex-row items-center">
          <a
            href="https://github.com/magpollo"
            target="_blank"
            rel="noopener noreferrer"
            className="scale-50 hover:border hover:border-solid hover:border-gray-500 hover:rounded-md hover:bg-slate-300/30 transition-all duration-300 ease-in-out hover:drop-shadow-lg"
          >
            {' '}
            <Github />
          </a>
        </div>
      )}
    </nav>
  );
}
