"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: 1 | 2 | 3;
  onNext?: () => void;
  onSkip?: () => void;
  nextLabel?: string;
  skipLabel?: string;
  showSkip?: boolean;
}

/**
 * OnboardingLayout - Wrapper for welcome/onboarding screens
 *
 * Features:
 * - Progress dots indicator (3 steps)
 * - Next/Skip actions with RTL navigation
 * - Keyboard navigation (Enter = next, Esc = skip)
 * - Swipe support on touch devices
 *
 * @example
 * ```tsx
 * <OnboardingLayout currentStep={1} onNext={handleNext}>
 *   <OnboardingContent />
 * </OnboardingLayout>
 * ```
 */
export function OnboardingLayout({
  children,
  currentStep,
  onNext,
  onSkip,
  nextLabel = "التالي",
  skipLabel = "تخطي",
  showSkip = true,
}: OnboardingLayoutProps) {
  const router = useRouter();
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const handleNext = () => {
    if (onNext) onNext();
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    } else {
      router.push("/home");
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    // In RTL: swipe left = forward, swipe right = back
    if (isLeftSwipe && onNext) {
      handleNext();
    }
    if (isRightSwipe && currentStep > 1) {
      router.back();
    }
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && onNext) {
        handleNext();
      }
      if (e.key === "Escape" && showSkip) {
        handleSkip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext, showSkip]);

  return (
    <div
      className="min-h-screen flex flex-col bg-[var(--color-background)]"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Progress dots */}
      <div className="fixed top-0 inset-x-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div
          className="flex justify-center items-center gap-2 py-4"
          role="navigation"
          aria-label="تقدم الإعداد"
        >
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                step === currentStep
                  ? "bg-[var(--color-primary)] w-8"
                  : step < currentStep
                    ? "bg-[var(--color-primary)]/50"
                    : "bg-gray-300"
              )}
              aria-current={step === currentStep ? "step" : undefined}
              aria-label={`الخطوة ${step} من 3`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 pt-16 pb-24 px-4 overflow-y-auto">
        <div className="max-w-2xl mx-auto">{children}</div>
      </main>

      {/* Navigation footer */}
      <div className="fixed bottom-0 inset-x-0 z-10 bg-white border-t border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          {showSkip && (
            <Button
              variant="ghost"
              onClick={handleSkip}
              className="text-[var(--color-text-secondary)]"
            >
              {skipLabel}
            </Button>
          )}
          {onNext && (
            <Button
              onClick={handleNext}
              className={cn(
                "bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)]",
                !showSkip && "mx-auto"
              )}
            >
              {nextLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
