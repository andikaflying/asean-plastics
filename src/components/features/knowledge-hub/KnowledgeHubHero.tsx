import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/common/design-system/Typography';

export function KnowledgeHubHero() {
  return (
    <div className="bg-dark relative isolate -z-10 h-[26rem] overflow-hidden sm:h-[32rem] lg:h-[688px]">
      <Image
        src="/images/knowledge-hub-hero.webp"
        alt=""
        fill
        priority
        style={{ top: '-2.625rem' }}
        className="object-cover opacity-70"
      />
      <Image
        src="/icons/hero-blocks.svg"
        alt=""
        width={823}
        height={768}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 hidden select-none lg:block"
      />
      <Container className="relative flex min-h-[16rem] flex-col justify-center gap-3 py-10 sm:min-h-[20rem] sm:gap-4 sm:py-12 lg:min-h-[28.5rem] lg:py-16">
        <Image
          src="/icons/accent-1.svg"
          alt=""
          width={24}
          height={28}
          aria-hidden="true"
          className="hidden lg:block"
        />
        <Typography
          as="h1"
          weight="bold"
          color="inherit"
          size="6xl"
          className="text-3xl tracking-[-0.05rem] text-white uppercase lg:text-6xl lg:tracking-[-0.1875rem]"
        >
          Knowledge Hub
        </Typography>
        <Typography
          as="p"
          size="small-heading"
          color="inherit"
          className="sm:text-md lg:text-small-heading max-w-[830px] text-base text-white/90"
        >
          Discover research, policy tools, and practical guides tackling plastic pollution across
          Southeast Asia.
        </Typography>
      </Container>
    </div>
  );
}
