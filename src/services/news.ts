import { getBaseUrl } from '@/lib/get-base-url';
import type { NewsArticle } from '@/types/news';

export async function fetchNewsArticle(
  slug: string,
  options?: { signal?: AbortSignal },
): Promise<NewsArticle> {
  const response = await fetch(`${getBaseUrl()}/api/news/${slug}`, {
    signal: options?.signal,
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to load news article');
  }

  return response.json() as Promise<NewsArticle>;
}
