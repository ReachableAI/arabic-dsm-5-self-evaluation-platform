"use client";

import { useRouter } from "next/navigation";
import { OnboardingLayout } from "@/components/onboarding/onboarding-layout";
import content from "@/../content/ui/app_copy.json";

/**
 * Welcome screen (Step 1/3)
 *
 * Features:
 * - Welcome message with hero illustration
 * - Privacy-first messaging
 * - CTA to start onboarding flow
 */
export default function WelcomeScreen() {
  const router = useRouter();
  const welcomeContent = content.welcome_flow.screen_1;

  const handleNext = () => {
    router.push("/welcome/2");
  };

  const handleSkip = () => {
    router.push("/home");
  };

  return (
    <OnboardingLayout
      currentStep={1}
      onNext={handleNext}
      onSkip={handleSkip}
      nextLabel={welcomeContent.cta}
    >
      <div className="flex flex-col items-center text-center space-y-6 py-8">
        {/* Hero illustration placeholder */}
        <div
          className="w-full max-w-md aspect-square rounded-2xl bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 flex items-center justify-center"
          role="img"
          aria-label="رسم توضيحي ترحيبي"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-24 h-24 text-[var(--color-primary)]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]">
            {welcomeContent.title}
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-primary)]">
            {welcomeContent.subtitle}
          </p>
        </div>

        {/* Body text */}
        <div className="space-y-4 text-base md:text-lg text-[var(--color-text-primary)] text-right max-w-lg">
          {welcomeContent.body.split("\\n\\n").map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </OnboardingLayout>
  );
}
