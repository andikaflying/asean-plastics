import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/common/design-system/Typography';

export function ContactHero() {
  return (
    <section className="relative isolate h-[20rem] overflow-hidden bg-[#020c12] bg-[image:var(--gradient-hero)] py-10 sm:h-[24rem] sm:py-12 lg:h-[28.625rem] lg:py-[4.375rem]">
      <div className="absolute inset-0 mix-blend-multiply" aria-hidden="true">
        <Image
          src="/images/contact/hero-marine-debris.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>
      <div
        className="pointer-events-none absolute top-[-4.875rem] right-0 hidden h-[48rem] w-[51.4375rem] rotate-180 mix-blend-screen lg:block"
        aria-hidden="true"
      >
        <Image src="/icons/hero-blocks.svg" alt="" fill />
      </div>

      <Container className="relative mt-8 flex flex-col gap-3 sm:mt-12 sm:gap-4 lg:mt-[3.75rem]">
        <div
          className="relative top-[1.375rem] left-[-1.25rem] hidden h-7 w-6 lg:block"
          aria-hidden="true"
        >
          <Image
            src="/icons/accent-1.svg"
            alt=""
            width={14}
            height={14}
            className="absolute top-[0.9rem] left-0"
          />
          <Image
            src="/icons/accent-2.svg"
            alt=""
            width={15}
            height={14}
            className="absolute top-0 left-[0.58rem]"
          />
        </div>
        <Typography
          as="h1"
          size="5xl"
          className="text-3xl tracking-[-0.05rem] text-white uppercase sm:text-4xl lg:text-5xl lg:tracking-[-0.125rem]"
        >
          Contact Us
        </Typography>
        <Typography
          as="p"
          size="base"
          className="text-base leading-[1.75rem] font-semibold text-white sm:text-[1.25rem] sm:leading-[2.125rem]"
        >
          We&apos;d love to hear from you — whether it&apos;s a question, partnership idea, or
          feedback on the platform.
        </Typography>
      </Container>
    </section>
  );
}
