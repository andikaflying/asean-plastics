import Image from 'next/image';
import { Typography } from '@/components/common/design-system/Typography';
import { Tag } from '@/components/common/design-system/Tag';
import type { Partner } from '@/types/partner';

const THEME_TAG_LIMIT = 2;

type PartnerCardProps = {
  partner: Partner;
};

export function PartnerCard({ partner }: PartnerCardProps) {
  const visibleThemes = partner.themes.slice(0, THEME_TAG_LIMIT);
  const overflowCount = partner.themes.length - visibleThemes.length;

  return (
    <div className="border-grey-300 flex h-full flex-col overflow-hidden rounded-xl border bg-white">
      <div className="bg-grey-100 flex h-[11.75rem] items-center justify-center">
        <Image
          src={partner.logo.src}
          alt={partner.name}
          width={partner.logo.width}
          height={partner.logo.height}
          className="max-h-24 w-auto max-w-[9rem] object-contain"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 px-4 py-4">
        <div className="flex flex-col gap-2">
          <Typography
            as="span"
            size="xs"
            weight="bold"
            color="muted"
            className="tracking-[0.05em] uppercase"
          >
            {partner.sector}
          </Typography>
          <Typography as="h3" size="2xl" weight="semibold">
            {partner.name}
          </Typography>
        </div>
        <div className="mt-auto flex flex-col gap-2">
          <Typography as="span" size="base" weight="medium" color="muted">
            {partner.country}
          </Typography>
          <div className="flex flex-wrap items-center gap-2">
            {visibleThemes.map((theme) => (
              <Tag key={theme}>{theme}</Tag>
            ))}
            {overflowCount > 0 && <Tag>{`${overflowCount}+`}</Tag>}
          </div>
        </div>
      </div>
    </div>
  );
}
