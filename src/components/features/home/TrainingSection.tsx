import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { Carousel } from '@/components/common/design-system/Carousel';
import { CourseCard } from './CourseCard';
import { TRAINING_COURSES } from '@/constants/trainings';

export function TrainingSection() {
  return (
    <Section tone="blue" isBleed>
      <Container className="flex flex-col gap-8 lg:gap-12">
        <SectionHeading
          title="Training"
          tone="light"
          description="Self-paced courses and learning modules built by leading practitioners. Develop the expertise you need to design better policies, run effective waste audits, and champion circular solutions."
          cta={{ label: 'See all courses', href: '/training' }}
          textContainerClassName="lg:gap-[6.25rem]"
          descriptionClassName="max-w-[592px] lg:mt-[-1.5rem]"
          ctaClassName="w-fit lg:absolute lg:right-0 lg:bottom-[-5.5rem]"
        />
        <Carousel ariaLabel="Featured training courses" tone="light" viewportClassName="mt-8">
          {TRAINING_COURSES.map((course) => (
            <div key={course.id} className="w-[17.625rem]">
              <CourseCard course={course} />
            </div>
          ))}
        </Carousel>
      </Container>
    </Section>
  );
}
