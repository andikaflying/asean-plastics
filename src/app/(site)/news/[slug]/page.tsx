import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getQueryClient } from '@/lib/query-client';
import { NEWS_KEYS } from '@/constants/query-keys';
import { fetchNewsArticle } from '@/services/news';
import { NewsArticleView } from '@/components/features/news/NewsArticleView';

type NewsDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const article = await fetchNewsArticle(slug);

    return {
      title: `${article.title}`,
      description: article.excerpt,
      openGraph: {
        title: article.title,
        description: article.excerpt,
        images: [{ url: article.image.src }],
        type: 'article',
        publishedTime: article.publishedAt,
      },
    };
  } catch {
    return { title: 'News | ASEAN Plastics Knowledge Platform' };
  }
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const queryClient = getQueryClient();

  try {
    const article = await fetchNewsArticle(slug);
    queryClient.setQueryData(NEWS_KEYS.detail(slug), article);
  } catch (error) {
    if (error instanceof Error) {
      notFound();
    }
    throw error;
  }

  return <NewsArticleView slug={slug} />;
}
