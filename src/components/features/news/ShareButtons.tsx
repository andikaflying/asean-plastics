'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const NETWORKS = [
  { label: 'Share on Facebook', icon: '/icons/share-facebook.svg' },
  { label: 'Share on X', icon: '/icons/share-x.svg' },
  { label: 'Share on LinkedIn', icon: '/icons/share-linkedin.svg' },
] as const;

type ShareButtonsProps = {
  title: string;
};

export function ShareButtons({ title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    // One-time read of a browser-only API on mount (SSR has no URL to render);
    // not a sync loop, so the set-state-in-effect rule doesn't apply here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShareUrl(window.location.href);
  }, []);

  const shareHref = (network: (typeof NETWORKS)[number]['label']) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(title);

    if (network === 'Share on Facebook') {
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    }
    if (network === 'Share on X') {
      return `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    }
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  };

  async function handleCopyLink() {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center gap-2">
      {NETWORKS.map((network) => (
        <a
          key={network.label}
          href={shareHref(network.label)}
          target="_blank"
          rel="noreferrer"
          aria-label={network.label}
          className="flex size-8 items-center justify-center"
        >
          <Image src={network.icon} alt="" width={32} height={32} aria-hidden="true" />
        </a>
      ))}
      <button
        type="button"
        onClick={handleCopyLink}
        aria-label={copied ? 'Link copied' : 'Copy link'}
        className="flex size-8 items-center justify-center"
      >
        <Image src="/icons/share-copy.svg" alt="" width={32} height={32} aria-hidden="true" />
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied && 'Link copied to clipboard'}
      </span>
    </div>
  );
}
