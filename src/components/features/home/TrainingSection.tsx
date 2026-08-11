import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { Carousel } from '@/components/common/design-system/Carousel';
import { CourseCard } from './CourseCard';
import { TRAINING_COURSES } from '@/constants/trainings';

export function TrainingSection() {
  return (
    <Section tone="blue" isBleed>
      <div className="mx-auto flex w-full max-w-[76.375rem] flex-col gap-12">
        <SectionHeading
          title="Training"
          tone="light"
          description="Self-paced courses and learning modules built by leading practitioners. Develop the expertise you need to design better policies, run effective waste audits, and champion circular solutions."
          cta={{ label: 'See all courses', href: '/training' }}
          textContainerClassName="lg:gap-[6.25rem]"
          descriptionClassName="mt-[-1.5rem] max-w-[592px]"
          ctaClassName="absolute bottom-[-5.5rem] right-0"
        />
        <Carousel ariaLabel="Featured training courses" tone="light" viewportClassName="mt-8">
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
