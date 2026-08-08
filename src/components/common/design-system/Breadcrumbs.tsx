import Link from 'next/link';
import { cn } from '@/utils/cn';
import { Typography } from './Typography';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn(className)}>
      <ol className="text-text-muted flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast && (
                <>
                  <Link href={item.href} className="hover:text-blue-500 hover:underline">
                    {item.label}
                  </Link>
                  <span aria-hidden="true" className="text-grey-400">
                    /
                  </span>
                </>
              )}
              {/** Last element */}
              {isLast && (
                <Typography
                  as="span"
                  aria-current={isLast ? 'page' : undefined}
                  className="text-text-primary"
                >
                  {item.label}
                </Typography>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
