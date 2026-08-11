import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Next 16 requires an explicit allowlist; 90 is for full-bleed hero art where
    // the default 75 shows visible compression artefacts in flat sky/water areas.
    qualities: [75, 90],
  },
};

export default nextConfig;
