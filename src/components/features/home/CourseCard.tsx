import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '@/components/common/design-system/Typography';
import { formatDuration } from '@/utils/format-duration';
import type { TrainingCourse } from '@/types/training';

type CourseCardProps = {
  course: TrainingCourse;
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link
      href={course.href}
      className="flex h-[440px] flex-col gap-4 border-t border-white/50 pt-4"
    >
      <Typography
        as="span"
        size="sm"
        weight="bold"
        color="inherit"
        className="tracking-[0.05em] text-white/70 uppercase"
      >
        {course.category}
      </Typography>
      <div className="relative aspect-[282/188] w-full overflow-hidden rounded-lg">
        <Image
          src={course.image.src}
          alt=""
          fill
          sizes="18rem"
          loading="lazy"
          className="object-cover"
        />
      </div>
      <Typography as="h3" size="xl" weight="semibold" color="inherit" className="mt-3 text-white">
        {course.title}
      </Typography>
      <div className="mt-auto mb-2 flex items-center gap-1 text-white/70">
        <Image src="/icons/hourglass.svg" alt="" width={16} height={16} aria-hidden="true" />
        <Typography as="span" size="base" weight="medium" color="inherit">
          {formatDuration(course.durationMinutes)}
        </Typography>
      </div>
    </Link>
  );
}
