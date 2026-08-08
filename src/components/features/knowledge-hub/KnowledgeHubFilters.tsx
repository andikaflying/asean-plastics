'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { IconButton } from '@/components/common/design-system/IconButton';
import { ResourceFilterPanel } from './ResourceFilterPanel';

function FilterIcon() {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 6h16M7 12h10M10 18h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * The Figma comp is desktop-only (1366px) — below `lg` the sidebar collapses
 * into a "Filters" trigger opening a drawer, mirroring the mobile nav
 * pattern already used by `Header`.
 */
export function KnowledgeHubFilters() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="hidden lg:block">
        <ResourceFilterPanel />
      </div>

      <div className="lg:hidden">
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
          <Dialog.Trigger asChild>
            <button
              type="button"
              className="border-grey-300 text-text-primary inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              <FilterIcon />
              Filters
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-dark/40 fixed inset-0 z-50" />
            <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-[85vw] max-w-sm flex-col gap-6 overflow-y-auto bg-white px-6 py-6 shadow-xl">
              <div className="flex items-center justify-between">
                <Dialog.Title asChild>
                  <span className="text-base font-semibold">Filters</span>
                </Dialog.Title>
                <Dialog.Close asChild>
                  <IconButton aria-label="Close filters" variant="ghost">
                    <span aria-hidden="true" className="text-xl leading-none">
                      &times;
                    </span>
                  </IconButton>
                </Dialog.Close>
              </div>
              <ResourceFilterPanel />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </>
  );
}
