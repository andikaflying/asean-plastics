'use client';

import { useNewsArticle } from '@/hooks/useNewsArticle';
import { Container } from '@/components/layout/Container';
import { Breadcrumbs } from '@/components/common/design-system/Breadcrumbs';
import { ErrorState } from '@/components/common/design-system/ErrorState';
import { NewsHero } from './NewsHero';
import { NewsArticleBody } from './NewsArticleBody';
import { CircularProgress } from '@/components/common/design-system/CircularProgress';

export function NewsArticleView({ slug }: { slug: string }) {
  const { data: article, isPending, isError, refetch } = useNewsArticle(slug);

  if (isPending) {
    return <CircularProgress />;
  }

  if (isError) {
    return (
      <Container className="py-12">
        <ErrorState onRetry={() => refetch()} />
      </Container>
    );
  }

  return (
    <article>
      <NewsHero article={article} />
      <Container className="py-8 lg:py-12">
        <Breadcrumbs
          className="sr-only"
          items={[
            { label: 'Home', href: '/' },
            { label: 'News', href: '/news' },
            { label: article.title },
          ]}
        />
        <div className="mx-auto max-w-[50.4375rem]">
          <NewsArticleBody blocks={article.body} />
        </div>
      </Container>
    </article>
  );
}
