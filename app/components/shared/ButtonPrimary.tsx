import Link from 'next/link';

export default function ButtonPrimary({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className={
        className +
        ' px-2 py-1 bg-primary border-white border-2 text-white rounded-lg hover:bg-white hover:text-primary transition-all duration-300 ease-in-out'
      }
    >
      {children}
    </Link>
  );
}
