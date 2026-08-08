import { cn } from '@/utils/cn';

const SIZE_PX = {
  sm: 16,
  md: 24,
  lg: 32,
} as const;

export type CircularProgressSize = keyof typeof SIZE_PX;

type CircularProgressProps = {
  size?: CircularProgressSize;
  className?: string;
  label?: string;
};

export function CircularProgress({
  size = 'md',
  className,
  label = 'Loading',
}: CircularProgressProps) {
  const sizeInPx = SIZE_PX[size];

  return (
    <svg
      role="status"
      aria-label={label}
      width={sizeInPx}
      height={sizeInPx}
      viewBox="0 0 24 24"
      fill="none"
      className={cn('animate-spin motion-reduce:animate-none', className)}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.2" />
      <path
        d="M22 12a10 10 0 0 0-10-10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
