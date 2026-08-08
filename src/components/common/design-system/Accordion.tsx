'use client';

import { type ReactNode } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '@/utils/cn';

type AccordionProps = {
  value: string[];
  onValueChange: (value: string[]) => void;
  children: ReactNode;
  className?: string;
};

export function Accordion({ value, onValueChange, children, className }: AccordionProps) {
  return (
    <AccordionPrimitive.Root
      type="multiple"
      value={value}
      onValueChange={onValueChange}
      className={cn('flex flex-col', className)}
    >
      {children}
    </AccordionPrimitive.Root>
  );
}

type AccordionItemProps = {
  value: string;
  title: string;
  children: ReactNode;
  className?: string;
};

export function AccordionItem({ value, title, children, className }: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      value={value}
      className={cn('border-grey-200 border-b py-4 first:pt-0', className)}
    >
      <AccordionPrimitive.Header>
        <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">
          <span className="text-text-primary text-sm font-semibold tracking-wide uppercase">
            {title}
          </span>
          <svg
            aria-hidden="true"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-grey-500 shrink-0 transition-transform group-data-[state=open]:rotate-180"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content className="overflow-hidden">
        <div className="flex flex-col gap-4 pt-4">{children}</div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  );
}
