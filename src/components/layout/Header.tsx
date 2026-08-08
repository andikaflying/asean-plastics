'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import { Container } from './Container';
import { IconButton } from '@/components/common/design-system/IconButton';
import { ALL_NAV, LEFT_NAV, RIGHT_NAV, type NavItem } from '@/constants/navigation';
import { cn } from '@/utils/cn';

function NavLink({ item, isActive }: { item: NavItem; isActive: boolean }) {
  return (
    <Link
      href={item.href}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'flex flex-col items-start gap-1 text-sm tracking-[0.035em] whitespace-nowrap',
        isActive ? 'font-medium text-blue-500' : 'text-grey-500 hover:text-text-primary',
      )}
    >
      {item.label}
      {isActive && <span aria-hidden="true" className="h-1 w-5 rounded-full bg-yellow-500" />}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-blue-500 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <header className="border-grey-200 sticky top-0 z-40 border-b bg-white">
        <Container as="div" className="flex h-20 items-center justify-between">
          <Link href="/" className="shrink-0">
            <Image
              src="/icons/logo.svg"
              alt="ASEAN Plastics Knowledge Platform"
              width={167}
              height={52}
              priority
            />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            <div className="flex items-center gap-6">
              {LEFT_NAV.map((item) => (
                <NavLink key={item.href} item={item} isActive={pathname.startsWith(item.href)} />
              ))}
            </div>
            <span aria-hidden="true" className="bg-grey-500/50 h-4 w-0.5 rounded-full" />
            <div className="flex items-center gap-6">
              {RIGHT_NAV.map((item) => (
                <NavLink key={item.href} item={item} isActive={pathname.startsWith(item.href)} />
              ))}
            </div>
          </nav>

          <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
            <Dialog.Trigger asChild>
              <IconButton aria-label="Open menu" variant="ghost" className="lg:hidden">
                <span className="flex flex-col gap-1.5" aria-hidden="true">
                  <span className="bg-text-primary block h-0.5 w-5" />
                  <span className="bg-text-primary block h-0.5 w-5" />
                  <span className="bg-text-primary block h-0.5 w-5" />
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
                  {ALL_NAV.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
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
