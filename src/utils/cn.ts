import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// `text-display` is a custom font-size token (src/styles/theme.css) that tailwind-merge's
// default config doesn't recognize — without this it gets misclassified as a text-color
// utility and silently dropped whenever a color class like `text-white` follows it.
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': ['text-display'],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
