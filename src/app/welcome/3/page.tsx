"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { OnboardingLayout } from "@/components/onboarding/onboarding-layout";
import { Checkbox } from "@/components/ui/checkbox";
import content from "@/../content/ui/app_copy.json";

/**
 * Privacy & Disclaimer screen (Step 3/3)
 *
 * Features:
 * - Privacy features highlight
 * - Disclaimer acceptance checkbox (required)
 * - Can only proceed after acceptance
 */
export default function PrivacyDisclaimerScreen() {
  const router = useRouter();
  const screen3Content = content.welcome_flow.screen_3;
  const [disclaimerAccepted, setDisclaimerAccepted] = React.useState(false);

  const handleNext = () => {
    if (disclaimerAccepted) {
      router.push("/mood-check");
    }
  };

  return (
    <OnboardingLayout
      currentStep={3}
      onNext={disclaimerAccepted ? handleNext : undefined}
      nextLabel={screen3Content.cta}
      showSkip={false}
    >
      <div className="flex flex-col space-y-6 py-8">
        {/* Privacy illustration placeholder */}
        <div
          className="w-full max-w-sm mx-auto aspect-square rounded-2xl bg-gradient-to-br from-[var(--color-success)]/10 to-[var(--color-primary)]/10 flex items-center justify-center mb-4"
          role="img"
          aria-label="رسم توضيحي للخصوصية"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-24 h-24 text-[var(--color-success)]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
            />
          </svg>
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]">
            {screen3Content.title}
          </h1>
        </div>

        {/* Privacy features */}
        <div className="space-y-4">
          {screen3Content.features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-4 rounded-lg bg-white border border-gray-200"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-success)]/10 flex items-center justify-center">
                {/* Icon placeholder */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-[var(--color-success)]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
              <div className="flex-1 text-right">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer acceptance */}
        <div className="border-t pt-6 space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-[var(--color-warning)]/5 border border-[var(--color-warning)]/20">
            <Checkbox
              id="disclaimer"
              checked={disclaimerAccepted}
              onCheckedChange={(checked) =>
                setDisclaimerAccepted(checked === true)
              }
              className="mt-1"
            />
            <label
              htmlFor="disclaimer"
              className="text-sm text-[var(--color-text-primary)] cursor-pointer select-none text-right leading-relaxed"
            >
              أفهم أن هذا التطبيق هو أداة تعليمية للتوعية الذاتية وليس بديلاً عن
              التشخيص أو الاستشارة الطبية المتخصصة. أوافق على المتابعة بهذا الفهم.
            </label>
          </div>

          {/* Secondary CTA */}
          <div className="text-center">
            <button
              onClick={() => router.push("/privacy")}
              className="text-sm text-[var(--color-primary)] hover:underline"
            >
              {screen3Content.secondary_cta}
            </button>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}
