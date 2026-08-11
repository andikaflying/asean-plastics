import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '@/components/common/design-system/Typography';
import { getButtonClassNames } from '@/components/common/design-system/Button';

const TRUSTED_BY_LOGOS = [
  { id: 'trusted-logo-1', src: '/images/home/partner-chulalongkorn.svg', width: 132, height: 94 },
  { id: 'trusted-logo-2', src: '/images/home/partner-chulalongkorn.svg', width: 132, height: 94 },
];

export function HomeIntro() {
  return (
    <div className="mt-16 flex flex-col gap-6 pt-6 pb-8 sm:gap-8 sm:pt-10 lg:mt-[6.25rem] lg:pt-16">
      <Typography
        as="p"
        size="xl"
        weight="semibold"
        className="text-lg tracking-[-0.3px] text-blue-500 sm:text-xl lg:pr-[9rem] lg:pl-[6rem]"
      >
        Plastic pollution threatens our oceans, coastlines, and communities across Southeast Asia —
        one of the most impacted regions on Earth. Coordinated, evidence-based action can turn the
        tide.
      </Typography>
      <Typography
        as="p"
        size="md"
        weight="medium"
        color="muted"
        className="sm:text-md text-base lg:pr-[6rem] lg:pl-[12.5rem]"
      >
        The SEA-MaP Knowledge &amp; Partnership Platform empowers ASEAN Member States to tackle
        marine debris head-on. We bring together curated research, practical training, and a growing
        network of partners — all in one place. Whether you&rsquo;re a policymaker, researcher, or
        practitioner, this is your launchpad for meaningful impact.
      </Typography>
      <Link
        href="/knowledge-hub"
        className={`${getButtonClassNames('primary')} w-fit lg:ml-[12.5rem]`}
      >
        Explore Platform
      </Link>

      <div className="border-grey-200 mt-8 flex flex-col gap-8 lg:mt-[4.25rem] lg:flex-row lg:justify-between lg:gap-6 lg:pl-[6rem]">
        <div className="flex w-fit flex-col gap-3 sm:gap-4">
          <Typography
            as="p"
            size="xl"
            weight="semibold"
            className="text-lg tracking-[-0.3px] text-blue-500 sm:text-xl"
          >
            Three interconnected pathways to accelerate change
          </Typography>
          <Typography
            as="p"
            size="md"
            weight="medium"
            color="muted"
            className="sm:text-md text-base lg:w-[43.75rem]"
          >
            Each pillar reinforces the others — knowledge informs training, training drives
            partnerships, and partnerships generate new knowledge.
          </Typography>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-center gap-8 lg:justify-start lg:gap-[4rem] lg:px-6">
          {TRUSTED_BY_LOGOS.map((logo) => (
            <Image
              key={logo.id}
              src={logo.src}
              alt="Partner organization"
              width={logo.width}
              height={logo.height}
              className="h-auto w-24 sm:w-auto"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
