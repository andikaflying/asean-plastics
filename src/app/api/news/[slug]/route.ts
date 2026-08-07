import { NextResponse, type NextRequest } from 'next/server';
import newsFixture from '@/mock/news.json';
import type { NewsArticle } from '@/types/news';
import { applyMockRequestBehavior } from '@/lib/mock-request';

export async function GET(request: NextRequest, ctx: RouteContext<'/api/news/[slug]'>) {
  const mockResponse = await applyMockRequestBehavior(request);
  if (mockResponse) return mockResponse;

  const { slug } = await ctx.params;
  const article = (newsFixture as NewsArticle[]).find((item) => item.slug === slug);

  if (!article) {
    return NextResponse.json({ message: 'Article not found' }, { status: 404 });
  }

  return NextResponse.json(article);
}
