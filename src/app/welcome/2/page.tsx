"use client";

import { useRouter } from "next/navigation";
import { OnboardingLayout } from "@/components/onboarding/onboarding-layout";
import content from "@/../content/ui/app_copy.json";

/**
 * How it works screen (Step 2/3)
 *
 * Features:
 * - 3-step process explanation
 * - Disclaimer messaging
 * - Clear visual steps
 */
export default function HowItWorksScreen() {
  const router = useRouter();
  const screen2Content = content.welcome_flow.screen_2;

  const handleNext = () => {
    router.push("/welcome/3");
  };

  return (
    <OnboardingLayout
      currentStep={2}
      onNext={handleNext}
      nextLabel={screen2Content.cta}
    >
      <div className="flex flex-col space-y-6 py-8">
        {/* Steps illustration placeholder */}
        <div
          className="w-full aspect-video rounded-2xl bg-gradient-to-br from-[var(--color-secondary)]/10 to-[var(--color-primary)]/10 flex items-center justify-center mb-4"
          role="img"
          aria-label="رسم توضيحي لخطوات العمل"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-20 h-20 text-[var(--color-secondary)]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
            />
          </svg>
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]">
            {screen2Content.title}
          </h1>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {screen2Content.steps.map((step) => (
            <div
              key={step.number}
              className="flex items-start gap-4 p-4 rounded-lg bg-white border border-gray-200"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold">
                {step.number}
              </div>
              <div className="flex-1 text-right">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-1">
                  {step.title}
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer note */}
        <div
          className="p-4 rounded-lg bg-[var(--color-warning)]/10 border border-[var(--color-warning)]/30"
          role="note"
        >
          <p className="text-sm text-[var(--color-text-primary)] text-center">
            {screen2Content.note}
          </p>
        </div>
      </div>
    </OnboardingLayout>
  );
}
