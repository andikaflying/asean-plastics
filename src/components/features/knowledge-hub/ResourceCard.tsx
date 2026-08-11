import Link from 'next/link';
import { Card } from '@/components/common/design-system/Card';
import { Typography } from '@/components/common/design-system/Typography';
import { Tag } from '@/components/common/design-system/Tag';
import {
  RESOURCE_TYPE_OPTIONS,
  RESOURCE_KEYWORD_TAG_LIMIT,
  getFacetLabel,
} from '@/constants/knowledge-hub';
import type { KnowledgeResource } from '@/types/knowledge-resource';
import { cn } from '@/utils/cn';

type ResourceCardProps = {
  resource: KnowledgeResource;
  isFeatured?: boolean;
  cardClassName?: string;
  containerClassName?: string;
  labelClassName?: string;
  titleClassName?: string;
};

function DownloadIcon() {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3v12m0 0-4-4m4 4 4-4M5 19h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M14 4h6v6M20 4l-9 9M9 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ResourceCard({
  resource,
  isFeatured = false,
  cardClassName,
  containerClassName,
  labelClassName,
  titleClassName,
}: ResourceCardProps) {
  const visibleKeywords = resource.keywords.slice(0, RESOURCE_KEYWORD_TAG_LIMIT);
  const overflowCount = resource.keywords.length - visibleKeywords.length;
  const typeLabel = getFacetLabel(RESOURCE_TYPE_OPTIONS, resource.type);
  const isExternal = resource.access.kind === 'external';

  return (
    <Card
      className={cn(
        'justify-between bg-transparent',
        isFeatured
          ? 'min-h-[20rem] md:h-[25.625rem] md:max-h-[25.625rem] md:px-8 md:py-10'
          : 'min-h-[18rem] gap-6 md:h-[23.125rem] md:max-h-[23.125rem] md:gap-8',
        cardClassName,
      )}
    >
      <div
        className={cn(
          'flex flex-col gap-4',
          isFeatured ? 'gap-6 md:gap-[2.75rem]' : 'gap-6 md:gap-[3.25rem]',
          containerClassName,
        )}
      >
        <div
          className={cn(
            'flex flex-wrap items-center gap-3 text-base font-bold text-white uppercase',
            labelClassName,
          )}
        >
          <span>{typeLabel}</span>
          <span aria-hidden="true" className="bg-grey-300 h-3.5 w-px" />
          <span>{resource.format}</span>
          <span aria-hidden="true" className="bg-grey-300 h-3.5 w-px" />
          <span>{resource.publicationYear}</span>
        </div>
        <div className="flex flex-col gap-4">
          <Typography
            as="h3"
            size={isFeatured ? '3xl' : 'xl'}
            weight="semibold"
            className={cn(
              'line-clamp-3 text-white',
              isFeatured ? 'text-xl md:text-3xl' : 'text-lg md:text-xl',
              titleClassName,
            )}
          >
            <Link
              href={resource.access.url}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="rounded hover:text-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              {resource.title}
              {isExternal && <span className="sr-only"> (opens in new tab)</span>}
            </Link>
          </Typography>

          <div className="flex flex-wrap items-center gap-1">
            {visibleKeywords.map((keyword) => (
              <Tag
                key={keyword}
                className={cn(
                  'text-base',
                  isFeatured ? '' : 'max-w-[10ch] overflow-hidden text-ellipsis whitespace-nowrap',
                )}
              >
                {keyword}
              </Tag>
            ))}
            {overflowCount > 0 && <Tag>{`${overflowCount}+`}</Tag>}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Typography as="span" size="base" color="inherit">
          {resource.source}
        </Typography>
        <a
          href={resource.access.url}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          aria-hidden="true"
          tabIndex={-1}
          className="inline-flex items-center gap-1 text-white"
        >
          {!isExternal && (
            <Typography as="span" size="base" weight="semibold" color="inherit">
              Download
            </Typography>
          )}
          {isExternal ? <ExternalLinkIcon /> : <DownloadIcon />}
        </a>
      </div>
    </Card>
  );
}
