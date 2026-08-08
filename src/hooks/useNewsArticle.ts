'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNewsArticle } from '@/services/news';
import { NEWS_KEYS } from '@/constants/query-keys';

export function useNewsArticle(slug: string) {
  return useQuery({
    queryKey: NEWS_KEYS.detail(slug),
    queryFn: () => fetchNewsArticle(slug),
  });
}
