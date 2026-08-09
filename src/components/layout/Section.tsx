import { type ComponentPropsWithoutRef } from 'react';
import { Container } from './Container';
import { cn } from '@/utils/cn';

const TONE_CLASSES = {
  cream: 'bg-surface',
  blue: 'bg-blue-500 text-white',
  white: 'bg-white',
} as const;

export type SectionTone = keyof typeof TONE_CLASSES;

type SectionProps = ComponentPropsWithoutRef<'section'> & {
  tone?: SectionTone;
  isBleed?: boolean;
  containerClassName?: string;
};

export function Section({
  tone = 'white',
  isBleed = false,
  className,
  containerClassName,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      className={cn('relative isolate overflow-hidden py-20', TONE_CLASSES[tone], className)}
      {...rest}
    >
      {isBleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}
