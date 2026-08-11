import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '@/components/common/design-system/Typography';
import { formatDate } from '@/utils/format-date';
import type { NewsArticle } from '@/types/news';

type NewsCardProps = {
  article: NewsArticle;
};

export function NewsCard({ article }: NewsCardProps) {
  return (
    <div className="group border-grey-300 flex h-full flex-col justify-between gap-6 border-t-2 pt-4 hover:border-blue-500 hover:bg-white hover:bg-[image:url('/images/box-blocks.png')] hover:bg-bottom hover:bg-no-repeat">
      <div className="flex h-[224px] flex-col gap-2">
        <Typography
          as="span"
          size="sm"
          weight="bold"
          className="text-grey-500 tracking-[0.125em] uppercase group-hover:text-blue-500"
        >
          {article.category}
        </Typography>
        <Typography as="h3" size="xl" weight="semibold" className="group-hover:text-blue-500">
          <Link
            href={`/news/turning-the-tide-asean-marine-plastic-response`}
            className="hover:underline"
          >
            {article.title}
          </Link>
        </Typography>
        <div className="mt-auto flex items-center justify-between">
          <Typography
            as="span"
            size="base"
            weight="medium"
            className="text-grey-500 group-hover:text-blue-500"
          >
            {formatDate(article.publishedAt)}
          </Typography>
          {article.source && (
            <a
              href={article.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-grey-500 flex items-center gap-2 group-hover:text-blue-500"
            >
              <Typography
                as="span"
                size="base"
                weight="medium"
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
    </div>
  );
}
