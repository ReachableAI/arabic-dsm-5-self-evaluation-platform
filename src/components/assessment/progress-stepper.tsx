import * as React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export interface ProgressStepperProps {
  /**
   * Current step (1-indexed)
   */
  currentStep: number;
  /**
   * Total number of steps
   */
  totalSteps: number;
  /**
   * Optional step labels
   */
  stepLabels?: string[];
  /**
   * Show progress percentage
   */
  showPercentage?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * ProgressStepper - Question/section progress navigation component
 *
 * Features:
 * - RTL-aware progress bar (fills right to left)
 * - Current step indicator
 * - Optional step labels
 * - Percentage display
 * - Accessible with ARIA labels
 *
 * @example
 * ```tsx
 * <ProgressStepper
 *   currentStep={3}
 *   totalSteps={9}
 *   stepLabels={["البداية", "المنتصف", "النهاية"]}
 *   showPercentage
 * />
 * ```
 */
export const ProgressStepper = React.forwardRef<
  HTMLDivElement,
  ProgressStepperProps
>(
  (
    {
      currentStep,
      totalSteps,
      stepLabels,
      showPercentage = false,
      className,
      ...props
    },
    ref
  ) => {
    const percentage = Math.round((currentStep / totalSteps) * 100);

    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-3", className)}
        role="progressbar"
        aria-valuenow={currentStep}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-label={`السؤال ${currentStep} من ${totalSteps}`}
        {...props}
      >
        {/* Step counter and percentage */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-start">
            <span className="font-semibold text-primary">
              {currentStep}
            </span>
            <span className="text-text-secondary">من</span>
            <span className="text-text-secondary">{totalSteps}</span>
          </div>
          {showPercentage && (
            <span className="text-text-secondary text-end">
              {percentage}%
            </span>
          )}
        </div>

        {/* Progress bar */}
        <Progress value={percentage} variant="primary" />

        {/* Optional step labels */}
        {stepLabels && stepLabels.length > 0 && (
          <div className="flex justify-between text-xs text-text-secondary">
            {stepLabels.map((label, index) => {
              const stepNumber = Math.floor(
                (index / (stepLabels.length - 1)) * totalSteps
              ) + 1;
              const isActive = currentStep >= stepNumber;

              return (
                <span
                  key={index}
                  className={cn(
                    "transition-colors",
                    isActive ? "text-primary font-medium" : "text-text-secondary"
                  )}
                >
                  {label}
                </span>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

ProgressStepper.displayName = "ProgressStepper";
