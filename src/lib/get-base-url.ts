/**
 * Server-side fetches to our own Route Handlers need an absolute URL
 * (there's no browser origin to resolve against); the browser can use a
 * relative path.
 */
export function getBaseUrl(): string {
  if (typeof window !== 'undefined') return '';
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}
