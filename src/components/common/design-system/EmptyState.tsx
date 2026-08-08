import { Typography } from './Typography';
import { Button } from './Button';
import { cn } from '@/utils/cn';

type EmptyStateProps = {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

export function EmptyState({
  title = 'No results found',
  message = 'Try adjusting your search or filters.',
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
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
      {onAction && actionLabel && (
        <Button type="button" variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
