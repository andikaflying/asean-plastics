import Link from 'next/link';

interface BackButtonProps {
  href: string;
  ariaLabel?: string;
}

export function BackButton({ href, ariaLabel = '' }: BackButtonProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className="flex size-10 items-center justify-center rounded-full text-blue-500 hover:bg-blue-100"
    >
      <svg viewBox="0 0 24 24" width="36" height="36" fill="none" aria-hidden="true">
        <path
          d="M19 12H5M5 12l7-7M5 12l7 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
