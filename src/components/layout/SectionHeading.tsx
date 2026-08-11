import { type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '@/components/common/design-system/Typography';
import { getButtonClassNames, type ButtonVariant } from '@/components/common/design-system/Button';
import { cn } from '@/utils/cn';

type SectionHeadingCta = {
  label: string;
  href: string;
};

type SectionHeadingProps = {
  title: string;
  description?: ReactNode;
  tone?: 'light' | 'dark';
  cta?: SectionHeadingCta;
  className?: string;
  titleClassName?: string;
  textContainerClassName?: string;
  descriptionClassName?: string;
  ctaClassName?: string;
};

function AccentMark({ tone }: { tone: 'light' | 'dark' }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'absolute top-[0px] left-[-0.5rem] -z-10 inline-block h-7 w-6 shrink-0',
        tone === 'light' ? '-ml-6' : '-ml-6',
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
        className="absolute top-0 left-[80%]"
      />
    </span>
  );
}

export function SectionHeading({
  title,
  description,
  tone = 'dark',
  cta,
  className,
  titleClassName,
  textContainerClassName,
  descriptionClassName,
  ctaClassName,
}: SectionHeadingProps) {
  const isLight = tone === 'light';
  const ctaVariant: ButtonVariant = 'primary';

  return (
    <div
      className={cn(
        'relative flex flex-col items-start gap-6 lg:flex-row lg:items-start lg:justify-between',
        className,
      )}
    >
      <div
        className={cn(
          'flex flex-col gap-6 lg:flex-1 lg:flex-row lg:items-start lg:gap-8',
          textContainerClassName,
        )}
      >
        <Typography
          as="h2"
          size="display"
          color="inherit"
          className={cn(
            'relative shrink-0 tracking-[-0.1875rem]',
            isLight ? 'text-white' : 'text-text-primary',
            titleClassName,
          )}
        >
          <AccentMark tone={tone} />
          {title}
        </Typography>
        {description && (
          <Typography
            as="p"
            size="md"
            weight="medium"
            color="inherit"
            className={cn(
              'max-w-xl pt-4',
              isLight ? 'text-white' : 'text-text-primary',
              descriptionClassName,
            )}
          >
            {description}
          </Typography>
        )}
      </div>
      {cta && (
        <Link
          href={cta.href}
          className={cn(
            getButtonClassNames(
              ctaVariant,
              isLight ? 'border-white text-white hover:bg-white/10' : undefined,
            ),
            'absolute right-0 bottom-[-6.25rem]',
            ctaClassName,
          )}
        >
          {cta.label}
        </Link>
      )}
    </div>
  );
}
