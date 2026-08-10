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
    <div className="mx-[4.5rem] mx-auto mt-[6.25rem] flex flex-col gap-8 px-[4.5rem] pt-16 pb-8">
      <Typography
        as="p"
        size="xl"
        weight="semibold"
        className="pr-[10.625rem] pl-[6rem] tracking-[-0.3px] text-blue-500"
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
        className="pr-[6rem] pl-[12.75rem]"
      >
        The SEA-MaP Knowledge &amp; Partnership Platform empowers ASEAN Member States to tackle
        marine debris head-on. We bring together curated research, practical training, and a growing
        network of partners — all in one place. Whether you&rsquo;re a policymaker, researcher, or
        practitioner, this is your launchpad for meaningful impact.
      </Typography>
      <Link
        href="/knowledge-hub"
        className={`${getButtonClassNames('primary')} mt-[-0.125rem] ml-[12.75rem] w-fit`}
      >
        Explore Platform
      </Link>

      <div className="border-grey-200 mt-8 mt-[4.125rem] flex flex-row justify-between gap-6 pl-[6rem]">
        <div className="flex w-fit flex-col gap-4">
          <Typography
            as="p"
            size="xl"
            weight="semibold"
            className="tracking-[-0.3px] text-blue-500"
          >
            Three interconnected pathways to accelerate change
          </Typography>
          <Typography as="p" size="md" weight="medium" color="muted" className="w-[43.75rem]">
            Each pillar reinforces the others — knowledge informs training, training drives
            partnerships, and partnerships generate new knowledge.
          </Typography>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-center gap-[4.375rem] px-5">
          {TRUSTED_BY_LOGOS.map((logo) => (
            <Image
              key={logo.id}
              src={logo.src}
              alt="Partner organization"
              width={logo.width}
              height={logo.height}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
