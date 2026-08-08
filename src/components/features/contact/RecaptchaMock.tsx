import Image from 'next/image';

/**
 * Static visual placeholder for reCAPTCHA — matches the Figma comp but is
 * inert (no click handling, no state, not part of form validation).
 */
export function RecaptchaMock() {
  return (
    <div
      aria-hidden="true"
      className="flex w-[14.875rem] items-center justify-between rounded-sm bg-[#fafafa] p-2"
    >
      <div className="flex items-center gap-2">
        <Image src="/icons/recaptcha-checkbox.svg" alt="" width={17} height={17} />
        <span className="text-sm text-black">I&apos;m not a robot</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Image src="/icons/recaptcha-logo.svg" alt="" width={39} height={37} />
        <span className="text-[0.5rem] text-[#a6a6a6]">Privacy - Terms</span>
      </div>
    </div>
  );
}
