import Image from 'next/image';
import Link from 'next/link';
import { Container } from './Container';
import { ALL_NAV } from '@/constants/navigation';

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
      <Container className="flex flex-col gap-12 py-12">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="bg-grey-100 flex h-[6.5625rem] w-[11.8125rem] items-center justify-center rounded-xl">
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
                width={84}
                height={89}
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-white/20 pt-8">
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {ALL_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium tracking-[0.035em] text-white/90 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold tracking-[0.05em] text-white uppercase">
              Follow us
            </span>
            <ul className="flex items-center gap-2">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noreferrer"
                    className="flex size-8 items-center justify-center rounded-full border border-white"
                  >
                    <Image src={social.icon} alt="" width={14} height={14} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/20 pt-6 text-sm text-white/90 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-b border-dashed border-white/60"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p>&copy; 2026 ASEAN Plastics Knowledge Platform. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
