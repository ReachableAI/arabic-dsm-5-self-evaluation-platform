import * as React from "react";
import { cn } from "@/lib/utils";

export interface MoodOption {
  value: string;
  label: string;
  illustration: React.ReactNode;
  description?: string;
}

export interface MoodSelectorProps {
  /**
   * Array of mood options (typically 5 states)
   */
  options: MoodOption[];
  /**
   * Currently selected mood value
   */
  value?: string;
  /**
   * Callback when mood is selected
   */
  onChange?: (value: string) => void;
  /**
   * Accessible label for the mood selector
   */
  "aria-label"?: string;
}

/**
 * MoodSelector - 5-state visual mood picker with illustrations
 *
 * Features:
 * - Visual mood selection with weather/nature metaphors
 * - Large touch targets (minimum 56px)
 * - RTL-aware layout
 * - Keyboard navigation (Arrow keys + Enter)
 * - Accessible with ARIA labels
 *
 * @example
 * ```tsx
 * const moods = [
 *   { value: "very-low", label: "منخفض جداً", illustration: <CloudIcon /> },
 *   { value: "low", label: "منخفض", illustration: <RainIcon /> },
 *   { value: "moderate", label: "متوسط", illustration: <PartlyCloudyIcon /> },
 *   { value: "good", label: "جيد", illustration: <SunnyIcon /> },
 *   { value: "great", label: "ممتاز", illustration: <SunnyBrightIcon /> },
 * ];
 *
 * <MoodSelector
 *   options={moods}
 *   value={selectedMood}
 *   onChange={setSelectedMood}
 *   aria-label="اختر حالتك المزاجية"
 * />
 * ```
 */
export const MoodSelector = React.forwardRef<
  HTMLDivElement,
  MoodSelectorProps
>(({ options, value, onChange, "aria-label": ariaLabel, ...props }, ref) => {
  const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const maxIndex = options.length - 1;

    switch (event.key) {
      case "ArrowRight": // Previous in RTL
        event.preventDefault();
        setFocusedIndex((prev) => Math.max(0, prev - 1));
        break;
      case "ArrowLeft": // Next in RTL
        event.preventDefault();
        setFocusedIndex((prev) => Math.min(maxIndex, prev + 1));
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (focusedIndex >= 0 && focusedIndex <= maxIndex) {
          onChange?.(options[focusedIndex].value);
        }
        break;
    }
  };

  return (
    <div
      ref={ref}
      role="radiogroup"
      aria-label={ariaLabel || "اختر حالتك المزاجية"}
      className="flex flex-col gap-4"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      {...props}
    >
      <div className="grid grid-cols-5 gap-2 sm:gap-4">
        {options.map((option, index) => {
          const isSelected = value === option.value;
          const isFocused = focusedIndex === index;

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={option.label}
              tabIndex={isFocused || (focusedIndex === -1 && index === 0) ? 0 : -1}
              onClick={() => onChange?.(option.value)}
              onFocus={() => setFocusedIndex(index)}
              className={cn(
                "flex flex-col items-center gap-2 p-3 rounded-lg transition-all",
                "min-h-[56px] min-w-[56px]", // WCAG touch target
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                isSelected
                  ? "bg-primary/10 border-2 border-primary"
                  : "bg-surface border-2 border-neutral-300 hover:border-primary/50"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12",
                  isSelected ? "text-primary" : "text-text-secondary"
                )}
                aria-hidden="true"
              >
                {option.illustration}
              </div>
              <span
                className={cn(
                  "text-xs sm:text-sm font-medium text-center",
                  isSelected ? "text-primary" : "text-text-primary"
                )}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
});

MoodSelector.displayName = "MoodSelector";
