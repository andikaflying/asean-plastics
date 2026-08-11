import Link from 'next/link';
import { Typography } from '@/components/common/design-system/Typography';
import { getButtonClassNames } from '@/components/common/design-system/Button';
import { NewsFeatureCard } from './NewsFeatureCard';
import { NewsCard } from './NewsCard';
import newsArticles from '@/mock/news.json';
import type { NewsArticle } from '@/types/news';
import Image from 'next/image';

const HOMEPAGE_NEWS_SLUGS = [
  'asean-ministers-endorse-strengthened-targets-for-marine-debris-reduction',
  'world-bank-and-asean-launch-marine-plastics-innovation-fund',
  'philippines-coastal-towns-report-drop-in-beach-waste',
  'thai-packaging-consortium',
  'highlights-2025-asean-ocean-plastics-symposium-bali',
];

function AccentMark() {
  return (
    <span
      aria-hidden="true"
      className="absolute top-[0px] left-[0.75rem] -z-10 -ml-6 hidden h-7 w-6 shrink-0 md:block"
    >
      <Image
        src="/icons/accent-square-1.svg"
        alt=""
        width={14}
        height={14}
        className="absolute top-[51%] right-[90%]"
      />
      <Image
        src="/icons/accent-square-2.svg"
        alt=""
        width={15}
        height={14}
        className="absolute top-0 left-[0%]"
      />
    </span>
  );
}

export function NewsSection() {
  const articles = HOMEPAGE_NEWS_SLUGS.map((slug) =>
    (newsArticles as NewsArticle[]).find((article) => article.slug === slug),
  ).filter((article): article is NewsArticle => Boolean(article));

  const [featuredArticle, ...gridArticles] = articles;

  if (!featuredArticle) return null;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between gap-4">
        <Typography
          as="h2"
          size="display"
          className="lg:text-display relative text-2xl tracking-[-0.05rem] sm:text-3xl sm:tracking-[-0.1rem] lg:tracking-normal"
        >
          <AccentMark />
          News
        </Typography>
        <Link href="/news" className={getButtonClassNames('primary')}>
          See all
        </Link>
      </div>
      <NewsFeatureCard article={featuredArticle} />
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:mt-16 lg:grid-cols-4">
        {gridArticles.map((article) => (
          <NewsCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
