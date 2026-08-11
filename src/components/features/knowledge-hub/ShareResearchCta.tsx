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
      className={cn(
        'absolute top-[-0.5rem] left-[-1.875rem] hidden h-7 w-6 shrink-0 lg:inline-block',
      )}
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
      <div className="bg-grey-150 relative grid items-center gap-6 rounded-2xl px-5 py-8 sm:px-6 sm:py-10 md:px-10 md:py-16 lg:h-[508px] lg:gap-0">
        <Image
          src="/images/share-research.png"
          alt="Researchers reviewing plastic waste samples"
          width={559}
          height={559}
          loading="lazy"
          className="relative mx-auto h-auto w-full max-w-[35rem] rounded-xl object-cover lg:absolute lg:top-[-10px] lg:left-[-24px] lg:mx-0 lg:h-[34.5rem] lg:w-auto lg:max-w-[41rem] lg:justify-self-start"
        />
        <div className="flex flex-col items-start gap-4 sm:gap-5 lg:mt-4 lg:ml-132">
          <Typography
            as="h2"
            size="4xl"
            weight="bold"
            className="relative text-2xl tracking-[-0.05rem] text-blue-500 uppercase sm:text-3xl lg:text-4xl lg:tracking-[-0.125rem]"
          >
            <AccentMark />
            Share Your Research
          </Typography>
          <Typography
            as="p"
            size="small-heading"
            className="sm:text-md lg:text-small-heading text-base text-blue-500"
          >
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
