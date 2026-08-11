import Image from 'next/image';
import { Typography } from '@/components/common/design-system/Typography';
import type { NewsBodyBlock } from '@/types/news';

function ArticleBlock({ block }: { block: NewsBodyBlock }) {
  switch (block.type) {
    case 'lede':
      return (
        <Typography as="p" size="xl" weight="semibold" className="text-lg text-blue-500 sm:text-xl">
          {block.text}
        </Typography>
      );

    case 'heading':
      return (
        <Typography as="h2" size="2xl" className="text-xl sm:text-2xl">
          {block.text}
        </Typography>
      );

    case 'paragraph':
      return (
        <Typography as="p" size="md">
          {block.text}
        </Typography>
      );

    case 'list':
      return (
        <ul className="flex flex-col gap-1">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Image
                src="/icons/bullet.svg"
                alt=""
                width={12}
                height={15}
                aria-hidden="true"
                className="mt-2 shrink-0"
              />
              <Typography as="span" size="md" className="flex-1">
                {item}
              </Typography>
            </li>
          ))}
        </ul>
      );

    case 'quote':
      return (
        <blockquote className="flex items-stretch gap-2.5 px-0 sm:px-18">
          <span aria-hidden="true" className="w-2 shrink-0 rounded-full bg-blue-100" />
          <Typography
            as="p"
            size="xl"
            weight="semibold"
            className="flex-1 text-lg text-blue-500 sm:text-xl"
          >
            {block.text}
          </Typography>
        </blockquote>
      );

    case 'figure':
      return (
        <figure className="flex flex-col gap-2">
          <div
            className="relative mx-auto max-h-[28.375rem] w-full overflow-hidden rounded-xl bg-white"
            style={{ aspectRatio: block.width / block.height }}
          >
            <Image
              src={block.src}
              alt={block.alt}
              fill
              sizes="(min-width: 1024px) 53.875rem, 100vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
          {block.caption && (
            <Typography as="figcaption" size="base" color="muted">
              {block.caption}
            </Typography>
          )}
        </figure>
      );

    default:
      return null;
  }
}

export function NewsArticleBody({ blocks }: { blocks: NewsBodyBlock[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, index) => (
        <ArticleBlock key={`${index}-${block.type}`} block={block} />
      ))}
    </div>
  );
}
