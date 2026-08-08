import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/common/design-system/Typography';
import { ShareButtons } from './ShareButtons';
import type { NewsArticle } from '@/types/news';
import { BackButton } from '@/components/common/design-system/BackButton';
import { formatDate } from '@/utils/format-date';

export function NewsHero({ article }: { article: NewsArticle }) {
  return (
    <div className="bg-blue-100/40">
      <Container className="flex flex-col gap-8 py-8 lg:py-12">
        <BackButton href="/news" ariaLabel="Back To News" />

        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="order-2 flex flex-col items-start gap-6 lg:order-1">
            <div className="flex items-center gap-3">
              <Typography
                as="span"
                size="base"
                weight="bold"
                color="muted"
                className="tracking-[0.05em] uppercase"
              >
                {article.category}
              </Typography>
              <span aria-hidden="true" className="bg-grey-500/50 h-3.5 w-0.5 rounded-full" />
              <Typography
                as="span"
                size="base"
                weight="bold"
                color="muted"
                className="tracking-[0.05em] uppercase"
              >
                {formatDate(article.publishedAt)}
              </Typography>
            </div>

            <Typography as="h1" size="4xl">
              {article.title}
            </Typography>

            <ShareButtons title={article.title} />
          </div>

          <div className="order-1 aspect-[6/5] w-full max-w-[41rem] lg:order-2 lg:justify-self-end">
            <div
              className="relative size-full"
              style={{
                maskImage: 'url(/icons/hero-mask.svg)',
                WebkitMaskImage: 'url(/icons/hero-mask.svg)',
                maskSize: '100% 100%',
                WebkitMaskSize: '100% 100%',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
              }}
            >
              <Image
                src={article.image.src}
                alt={article.image.alt}
                fill
                sizes="(min-width: 1024px) 41rem, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
