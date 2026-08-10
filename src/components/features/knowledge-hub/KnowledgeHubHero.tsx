import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/common/design-system/Typography';

export function KnowledgeHubHero() {
  return (
    <div className="bg-dark relative isolate overflow-hidden">
      <Image
        src="/images/knowledge-hub-hero.webp"
        alt=""
        fill
        priority
        sizes="100vw"
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
      <Container className="relative flex min-h-[28.5rem] flex-col justify-center gap-4 py-16">
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
          className="text-3xl text-white uppercase sm:text-4xl lg:text-6xl"
        >
          Knowledge Hub
        </Typography>
        <Typography as="p" size="md" color="inherit" className="max-w-xl text-white/90">
          Discover research, policy tools, and practical guides tackling plastic pollution across
          Southeast Asia.
        </Typography>
      </Container>
    </div>
  );
}
