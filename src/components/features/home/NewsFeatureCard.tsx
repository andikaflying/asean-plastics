import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '@/components/common/design-system/Typography';
import { formatDate } from '@/utils/format-date';
import type { NewsArticle } from '@/types/news';

type NewsFeatureCardProps = {
  article: NewsArticle;
};

export function NewsFeatureCard({ article }: NewsFeatureCardProps) {
  return (
    <div className="group mt-6 flex flex-col gap-6 hover:border-blue-500 hover:bg-white hover:bg-[image:url('/images/box-blocks.png')] hover:bg-bottom hover:bg-no-repeat lg:flex-row lg:items-stretch">
      <div className="relative aspect-[600/397] w-full shrink-0 overflow-hidden rounded-lg lg:w-[37.5rem]">
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          priority
          sizes="(min-width: 1024px) 37.5rem, 100vw"
          className="object-cover"
        />
      </div>
      <div className="border-grey-300 flex min-w-0 flex-1 flex-col justify-between gap-6 border-t-2 py-4">
        <div className="flex flex-col gap-4">
          <Typography
            as="span"
            size="sm"
            weight="bold"
            color="muted"
            className="tracking-[0.125em] uppercase group-hover:text-blue-500"
          >
            {article.category}
          </Typography>
          <div className="flex flex-col gap-2">
            <Typography as="h3" size="3xl" weight="bold" className="tracking-[-2px]">
              <Link
                href={`/news/turning-the-tide-asean-marine-plastic-response`}
                className="group-hover:text-blue-500"
              >
                {article.title}
              </Link>
            </Typography>
            <Typography as="p" size="md" weight="medium" className="group-hover:text-blue-500">
              {article.excerpt}
            </Typography>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Typography
            as="span"
            size="base"
            weight="medium"
            color="muted"
            className="group-hover:text-blue-500"
          >
            {formatDate(article.publishedAt)}
          </Typography>
          {article.source && (
            <a
              href={article.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-grey-500 flex items-center gap-2"
            >
              <Typography
                as="span"
                size="base"
                weight="medium"
                color="muted"
                className="group-hover:text-blue-500"
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
    </div>
  );
}
