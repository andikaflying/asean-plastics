import { Typography } from '@/components/common/design-system/Typography';

export function ContactIntro() {
  return (
    <div className="flex flex-col gap-4 pt-2 sm:gap-6 sm:pt-8">
      <Typography as="h2" size="xl" weight="semibold" className="text-lg sm:text-xl">
        Get in Touch
      </Typography>
      <Typography as="p" size="md" className="text-grey-800">
        Have a question about the platform, a partnership proposal, or feedback on our resources?
        Reach out and our team will respond within two business days.
      </Typography>
    </div>
  );
}
