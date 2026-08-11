'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import { Container } from './Container';
import { IconButton } from '@/components/common/design-system/IconButton';
import {
  ALL_NAV_ITEMS,
  PRIMARY_NAV_ITEMS,
  SECONDARY_NAV_ITEMS,
  type NavItem,
} from '@/constants/navigation';
import { cn } from '@/utils/cn';

function NavLink({
  item,
  isActive,
  isOnHero,
  className,
}: {
  item: NavItem;
  isActive: boolean;
  isOnHero: boolean;
  className?: string;
}) {
  return (
    <Link
      href={item.href}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'flex flex-col items-start text-sm tracking-[0.035em] whitespace-nowrap',
        isActive && 'mt-1 font-medium',
        isOnHero
          ? cn(isActive ? 'text-white' : 'text-white/80 hover:text-white')
          : cn(isActive ? 'text-blue-500' : 'text-grey-500 hover:text-text-primary'),
        className,
      )}
    >
      {item.label}
      {isActive && <span aria-hidden="true" className="h-1 w-5 rounded-full bg-yellow-500" />}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const isOnHero = pathname === '/';

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-blue-500 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <header
        className={cn(
          'z-40',
          isOnHero
            ? 'absolute inset-x-0 top-0 bg-transparent'
            : 'border-grey-200 border-b bg-white',
        )}
      >
        <Container className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className={cn(
              'inline-flex shrink-0 items-center rounded-lg',
              isOnHero && 'bg-transparent pt-[0.5rem] pl-0',
            )}
          >
            <Image
              src="/icons/logo.svg"
              alt="ASEAN Plastics Knowledge Platform"
              width={167}
              height={52}
              priority
            />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            <div className="mr-1 flex items-center gap-6 uppercase">
              {PRIMARY_NAV_ITEMS.map((item, index) => (
                <NavLink
                  key={`${item.label}-${index}`}
                  item={item}
                  isActive={pathname.startsWith(item.href)}
                  isOnHero={isOnHero}
                  className="font-bold tracking-[0.039em]"
                />
              ))}
            </div>
            <span
              aria-hidden="true"
              className={cn('h-4 w-0.5 rounded-full', isOnHero ? 'bg-white/40' : 'bg-grey-500/50')}
            />
            <div className="flex items-center gap-6">
              {SECONDARY_NAV_ITEMS.map((item, index) => (
                <NavLink
                  key={`${item.label}-${index}`}
                  item={item}
                  isActive={pathname.startsWith(item.href)}
                  isOnHero={isOnHero}
                />
              ))}
            </div>
          </nav>

          <Dialog.Root open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
            <Dialog.Trigger asChild>
              <IconButton
                aria-label="Open menu"
                variant="ghost"
                className={cn(
                  'lg:hidden',
                  isOnHero && 'cursor-pointer bg-transparent hover:bg-transparent',
                )}
              >
                <span className="flex flex-col gap-1.5" aria-hidden="true">
                  <span
                    className={cn('block h-0.5 w-5', isOnHero ? 'bg-white' : 'bg-text-primary')}
                  />
                  <span
                    className={cn('block h-0.5 w-5', isOnHero ? 'bg-white' : 'bg-text-primary')}
                  />
                  <span
                    className={cn('block h-0.5 w-5', isOnHero ? 'bg-white' : 'bg-text-primary')}
                  />
                </span>
              </IconButton>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="bg-dark/40 fixed inset-0 z-50" />
              <Dialog.Content className="fixed top-0 right-0 z-50 flex h-full w-[85vw] max-w-sm flex-col gap-6 bg-white px-6 py-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <Dialog.Title asChild>
                    <span className="text-base font-semibold">Menu</span>
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <IconButton aria-label="Close menu" variant="ghost">
                      <span aria-hidden="true" className="text-xl leading-none">
                        &times;
                      </span>
                    </IconButton>
                  </Dialog.Close>
                </div>
                <nav aria-label="Primary" className="flex flex-col gap-4">
                  {ALL_NAV_ITEMS.map((item, index) => (
                    <Link
                      key={`${item.label}-${index}`}
                      href={item.href}
                      onClick={() => setIsMobileNavOpen(false)}
                      aria-current={pathname.startsWith(item.href) ? 'page' : undefined}
                      className={cn(
                        'text-base font-medium',
                        pathname.startsWith(item.href) ? 'text-blue-500' : 'text-text-primary',
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </Container>
      </header>
    </>
  );
}
