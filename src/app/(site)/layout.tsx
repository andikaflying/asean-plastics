import type { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query-client';

export default function SiteLayout({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </HydrationBoundary>
    </>
  );
}
