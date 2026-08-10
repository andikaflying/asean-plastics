import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

const SIZE_CLASSES = {
  display: 'text-display font-bold',
  '6xl': 'text-6xl font-bold',
  '5xl': 'text-5xl font-bold',
  '4xl': 'text-4xl font-bold',
  '3xl': 'text-3xl font-bold',
  '2xl': 'text-2xl font-semibold',
  xl: 'text-xl font-semibold',
  lg: 'text-lg font-semibold',
  md: 'text-md font-normal',
  base: 'text-base font-normal',
  sm: 'text-sm font-normal',
  xs: 'text-xs font-normal',
} as const;

const WEIGHT_CLASSES = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
} as const;

const COLOR_CLASSES = {
  primary: 'text-text-primary',
  muted: 'text-text-muted',
  danger: 'text-danger',
  inherit: '',
} as const;

export type TypographySize = keyof typeof SIZE_CLASSES;
export type TypographyWeight = keyof typeof WEIGHT_CLASSES;
export type TypographyColor = keyof typeof COLOR_CLASSES;
export type TypographyElement =
  'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'figcaption';

type TypographyProps<TElement extends TypographyElement> = Omit<
  ComponentPropsWithoutRef<TElement>,
  'className' | 'children' | 'color'
> & {
  as?: TElement;
  size?: TypographySize;
  weight?: TypographyWeight;
  color?: TypographyColor;
  className?: string;
  children: ReactNode;
};

const DEFAULT_ELEMENT = 'p';

export function Typography<T extends TypographyElement>({
  as,
  size = 'base',
  weight,
  color = 'primary',
  className,
  children,
  ...rest
}: TypographyProps<T>) {
  const Component = as ?? DEFAULT_ELEMENT;

  return (
    <Component
      className={cn(
        SIZE_CLASSES[size],
        weight && WEIGHT_CLASSES[weight],
        COLOR_CLASSES[color],
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
