import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '@/components/common/design-system/Typography';
import { formatDate } from '@/utils/format-date';
import type { NewsArticle } from '@/types/news';
import { cn } from '@/utils/cn';

type NewsCardProps = {
  article: NewsArticle;
  isHighlighted?: boolean;
};

export function NewsCard({ article, isHighlighted = false }: NewsCardProps) {
  return (
    <div
      className={cn(
        'flex h-full flex-col justify-between gap-6 border-t-2 pt-4',
        isHighlighted ? 'border-blue-500' : 'border-grey-300',
      )}
    >
      <div className="flex flex-col gap-2">
        <Typography
          as="span"
          size="sm"
          weight="bold"
          className={cn(
            'tracking-[0.05em] uppercase',
            isHighlighted ? 'text-blue-500' : 'text-grey-500',
          )}
        >
          {article.category}
        </Typography>
        <Typography
          as="h3"
          size="2xl"
          weight="semibold"
          className={cn(isHighlighted && 'text-blue-500')}
        >
          <Link href={`/news/${article.slug}`} className="hover:underline">
            {article.title}
          </Link>
        </Typography>
      </div>
      <div className="relative aspect-[282/188] w-full overflow-hidden rounded-lg">
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          sizes="18rem"
          loading="lazy"
          className="object-cover"
        />
      </div>
      <div className="flex items-center justify-between">
        <Typography
          as="span"
          size="base"
          weight="medium"
          className={cn(isHighlighted ? 'text-blue-500' : 'text-grey-500')}
        >
          {formatDate(article.publishedAt)}
        </Typography>
        {article.source && (
          <a
            href={article.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex items-center gap-2',
              isHighlighted ? 'text-blue-500' : 'text-grey-500',
            )}
          >
            <Typography
              as="span"
              size="base"
              weight="medium"
              className={cn(isHighlighted && 'text-blue-500')}
            >
              {article.source.label}
            </Typography>
            <Image
              src="/icons/external-link.svg"
              alt=""
              width={20}
              height={20}
              aria-hidden="true"
            />
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        )}
      </div>
    </div>
  );
}
