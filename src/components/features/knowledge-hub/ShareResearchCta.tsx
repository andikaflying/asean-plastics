import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/common/design-system/Typography';
import { getButtonClassNames } from '@/components/common/design-system/Button';
import { cn } from '@/utils/cn';

function AccentMark() {
  return (
    <span
      aria-hidden="true"
      className={cn('absolute top-[-0.5rem] left-[-1.875rem] inline-block h-7 w-6 shrink-0')}
    >
      <Image
        src="/icons/accent-square-1.svg"
        alt=""
        width={14}
        height={14}
        className="absolute top-[51%] right-0"
      />
      <Image
        src="/icons/accent-square-2.svg"
        alt=""
        width={15}
        height={14}
        className="absolute top-0 left-[81%]"
      />
    </span>
  );
}

export function ShareResearchCta() {
  return (
    <Container className="py-12 lg:pt-20 lg:pb-28">
      <div className="bg-grey-150 relative grid items-center rounded-2xl px-6 py-10 md:px-10 md:py-16 lg:h-[508px]">
        <Image
          src="/images/share-research.png"
          alt="Researchers reviewing plastic waste samples"
          width={559}
          height={559}
          loading="lazy"
          className="absolute h-auto w-auto max-w-[41rem] justify-self-center rounded-xl object-cover lg:top-[-10px] lg:left-[-24px] lg:h-[34.5rem] lg:justify-self-start"
        />
        <div className="mt-4 ml-132 flex flex-col items-start gap-5">
          <Typography as="h2" size="4xl" weight="bold" className="relative text-blue-500 uppercase">
            <AccentMark />
            Share Your Research
          </Typography>
          <Typography as="p" size="small-heading" className="text-blue-500">
            Have a report, case study, or dataset to share? Submit your knowledge product and help
            build the region&apos;s evidence base.
          </Typography>
          <Link href="/contact" className={`${getButtonClassNames('primary')} `}>
            Submit Now
          </Link>
        </div>
      </div>
    </Container>
  );
}
