import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/common/design-system/Typography';
import { getButtonClassNames } from '@/components/common/design-system/Button';

export function ShareResearchCta() {
  return (
    <Container className="py-16">
      <div className="bg-grey-150 grid items-center gap-8 rounded-2xl px-6 py-10 md:grid-cols-[20rem_1fr] md:px-12 md:py-16">
        <Image
          src="/images/share-research.webp"
          alt="Researchers reviewing plastic waste samples"
          width={653}
          height={547}
          loading="lazy"
          className="h-auto w-full max-w-xs justify-self-center rounded-xl object-cover md:justify-self-start"
        />
        <div className="flex flex-col items-start gap-4">
          <Typography as="h2" size="2xl" weight="bold">
            Share Your Research
          </Typography>
          <Typography as="p" size="base" color="muted">
            Contribute to the region&rsquo;s growing evidence base — submit reports, datasets, or
            case studies from your work.
          </Typography>
          <Link href="/contact" className={getButtonClassNames('primary')}>
            Submit Now
          </Link>
        </div>
      </div>
    </Container>
  );
}
