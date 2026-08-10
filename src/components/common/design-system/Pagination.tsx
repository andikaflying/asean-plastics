import Link from 'next/link';
import { cn } from '@/utils/cn';

type PaginationProps = {
  page: number;
  totalPages: number;
  getHref: (page: number) => string;
  className?: string;
};

function getPageItems(page: number, totalPages: number): (number | 'ellipsis')[] {
  const keep = new Set<number>([
    1,
    totalPages,
    page - 1,
    page,
    page + 1,
    page - 2,
    page + 2,
    page - 3,
    page + 3,
  ]);
  const pages = [...keep]
    .filter((candidate) => candidate >= 1 && candidate <= totalPages)
    .sort((a, b) => a - b);
  console.log('Pages : ', pages, '.Keep : ', keep);
  const items: (number | 'ellipsis')[] = [];
  let previous = 0;
  for (const current of pages) {
    if (previous && current - previous > 1) items.push('ellipsis');
    items.push(current);
    previous = current;
  }
  return items;
}

function ChevronLeftIcon() {
  return (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Pagination({ page, totalPages, getHref, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  const items = getPageItems(page, totalPages);
  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  return (
    <nav
      aria-label="Pagination"
      className={cn('flex items-center justify-center gap-4', className)}
    >
      <Link
        href={getHref(Math.max(1, page - 1))}
        aria-label="Previous page"
        aria-disabled={isFirstPage}
        tabIndex={isFirstPage ? -1 : undefined}
        className={cn(
          'border-grey-300 text-text-primary flex size-12 items-center justify-center rounded-lg border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
          isFirstPage && 'pointer-events-none opacity-40',
        )}
      >
        <ChevronLeftIcon />
      </Link>

      {items.map((item, index) =>
        item === 'ellipsis' ? (
          <span
            key={`ellipsis-${index}`}
            aria-hidden="true"
            className="text-grey-500 flex size-12 items-center justify-center"
          >
            …
          </span>
        ) : (
          <Link
            key={item}
            href={getHref(item)}
            aria-current={item === page ? 'page' : undefined}
            className={cn(
              'flex size-12 items-center justify-center rounded-lg border text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
              item === page
                ? 'border-blue-500 bg-blue-500 font-semibold text-white'
                : 'text-text-primary hover:border-grey-600 border-gray-300',
            )}
          >
            {item}
          </Link>
        ),
      )}

      <Link
        href={getHref(Math.min(totalPages, page + 1))}
        aria-label="Next page"
        aria-disabled={isLastPage}
        tabIndex={isLastPage ? -1 : undefined}
        className={cn(
          'border-grey-300 text-text-primary flex size-12 items-center justify-center rounded-lg border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
          isLastPage && 'pointer-events-none opacity-40',
        )}
      >
        <ChevronRightIcon />
      </Link>
    </nav>
  );
}
