import { Typography } from './Typography';
import { Button } from './Button';
import { cn } from '@/utils/cn';

type ErrorStateProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
};

export function ErrorState({
  title = 'Something went wrong',
  message = 'We could not load this content. Please try again.',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        'border-grey-200 flex flex-col items-center gap-4 rounded-xl border bg-white px-8 py-12 text-center',
        className,
      )}
    >
      <Typography as="p" size="lg" weight="semibold">
        {title}
      </Typography>
      <Typography as="p" size="base" color="muted">
        {message}
      </Typography>
      {onRetry && (
        <Button type="button" variant="primary" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
