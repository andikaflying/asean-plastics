import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// `text-display` and `text-small-heading` are custom font-size tokens (src/styles/theme.css)
// that tailwind-merge's default config doesn't recognize — without this they get misclassified
// as text-color utilities and silently dropped whenever a color class like `text-white` follows.
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': ['text-display', 'text-small-heading'],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
