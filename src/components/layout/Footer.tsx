import Image from 'next/image';
import Link from 'next/link';
import { Container } from './Container';
import { ALL_NAV_ITEMS, PRIMARY_NAV_ITEMS, SECONDARY_NAV_ITEMS } from '@/constants/navigation';
import { cn } from '@/utils/cn';

const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://facebook.com', icon: '/icons/social-facebook.svg' },
  { label: 'X (Twitter)', href: 'https://x.com', icon: '/icons/social-x.svg' },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: '/icons/social-linkedin.svg' },
];

const LEGAL_LINKS = [
  { label: 'Terms of Use', href: '/terms-of-use' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
];

export function Footer() {
  return (
    <footer className="bg-blue-500 text-white">
      <Container className="flex flex-col gap-[3.25rem] py-12">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="bg-grey-100 mb-[-0.5rem] flex h-[6.5625rem] w-[11.8125rem] items-center justify-center rounded-xl">
            <Image
              src="/icons/logo.svg"
              alt="ASEAN Plastics Knowledge Platform"
              width={167}
              height={52}
            />
          </div>
          <div className="flex flex-1 flex-col items-start gap-4 lg:items-end">
            <p className="text-sm font-semibold tracking-[0.05em] text-white/80 uppercase">
              An ASEAN initiative supported by the World Bank
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Image
                src="/images/news/world-bank-logo.webp"
                alt="The World Bank — IBRD · IDA, World Bank Group"
                width={272}
                height={54}
                loading="lazy"
              />
              <Image
                src="/icons/asean-emblem.svg"
                alt="ASEAN emblem"
                width={80}
                height={89}
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-white/20">
          <div className="flex flex-col gap-6 border-t border-white/20 pt-6 lg:flex-row lg:justify-between">
            <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <div className="flex flex-wrap items-center gap-4 uppercase">
                {PRIMARY_NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-bold tracking-[0.035em] text-white/90 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <span aria-hidden="true" className="h-4 w-0.5 rounded-full bg-white/40" />
              <div className="flex flex-wrap items-center gap-4">
                {SECONDARY_NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium tracking-[0.035em] text-white/90 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold tracking-[0.05em] text-white uppercase">
                Follow us
              </span>
              <ul className="flex items-center gap-2">
                {SOCIAL_LINKS.map((social) => {
                  const DEFAULT_SIZE = 14;
                  const size = social.label === 'Facebook' ? 7 : DEFAULT_SIZE;
                  return (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        aria-label={social.label}
                        target="_blank"
                        rel="noreferrer"
                        className="flex size-8 items-center justify-center rounded-full border border-white"
                      >
                        <Image
                          src={social.icon}
                          alt=""
                          width={size}
                          height={size}
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-start justify-between gap-3 text-sm text-white/90 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="border-b border-dashed border-white/60 text-base"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="text-base">&copy; 2026 Company Name All Rights Reserved.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
