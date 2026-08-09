import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { Carousel } from '@/components/common/design-system/Carousel';
import { CourseCard } from './CourseCard';
import { TRAINING_COURSES } from '@/constants/trainings';

export function TrainingSection() {
  return (
    <Section tone="blue" isBleed>
      <div className="mx-auto flex w-full max-w-[76.375rem] flex-col gap-12 px-4 sm:px-6 lg:px-[4.5rem]">
        <SectionHeading
          title="Training"
          tone="light"
          description="Self-paced courses and learning modules built by leading practitioners. Develop the expertise you need to design better policies, run effective waste audits, and champion circular solutions."
          cta={{ label: 'See all courses', href: '/training' }}
        />
        <Carousel ariaLabel="Featured training courses" tone="light">
          {TRAINING_COURSES.map((course) => (
            <div key={course.id} className="w-[17.625rem]">
              <CourseCard course={course} />
            </div>
          ))}
        </Carousel>
      </div>
    </Section>
  );
}
