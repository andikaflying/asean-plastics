'use client';

import { useNewsArticle } from '@/hooks/useNewsArticle';
import { Container } from '@/components/layout/Container';
import { Breadcrumbs } from '@/components/common/design-system/Breadcrumbs';
import { ErrorState } from '@/components/common/design-system/ErrorState';
import { NewsHero } from './NewsHero';
import { NewsArticleBody } from './NewsArticleBody';
import { CircularProgress } from '@/components/common/design-system/CircularProgress';
import { Typography } from '@/components/common/design-system/Typography';

export function NewsArticleView({ slug }: { slug: string }) {
  const { data: article, isPending, isError, refetch } = useNewsArticle(slug);

  if (isPending) {
    return (
      <Container>
        <div
          aria-busy="true"
          className="flex min-h-[28.5rem] flex-col items-center justify-center gap-4"
        >
          <CircularProgress size="lg" label="Loading article" />
          <Typography as="p" size="base" color="muted">
            Loading article…
          </Typography>
        </div>
      </Container>
    );
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
      <Container className="py-8 lg:py-14">
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
