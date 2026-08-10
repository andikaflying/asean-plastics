import Link from 'next/link';
import { Typography } from '@/components/common/design-system/Typography';
import { getButtonClassNames } from '@/components/common/design-system/Button';
import { NewsFeatureCard } from './NewsFeatureCard';
import { NewsCard } from './NewsCard';
import newsArticles from '@/mock/news.json';
import type { NewsArticle } from '@/types/news';

const HOMEPAGE_NEWS_SLUGS = [
  'asean-ministers-endorse-strengthened-targets-for-marine-debris-reduction',
  'world-bank-and-asean-launch-marine-plastics-innovation-fund',
  'philippines-coastal-towns-report-drop-in-beach-waste',
  'thai-packaging-consortium',
  'highlights-2025-asean-ocean-plastics-symposium-bali',
];

export function NewsSection() {
  const articles = HOMEPAGE_NEWS_SLUGS.map((slug) =>
    (newsArticles as NewsArticle[]).find((article) => article.slug === slug),
  ).filter((article): article is NewsArticle => Boolean(article));

  const [featuredArticle, ...gridArticles] = articles;

  if (!featuredArticle) return null;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <Typography as="h2" size="display">
          News
        </Typography>
        <Link href="/news" className={getButtonClassNames('primary')}>
          See all
        </Link>
      </div>
      <NewsFeatureCard article={featuredArticle} />
      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {gridArticles.map((article, index) => (
          <NewsCard key={article.slug} article={article} isHighlighted={index === 0} />
        ))}
      </div>
    </div>
  );
}
