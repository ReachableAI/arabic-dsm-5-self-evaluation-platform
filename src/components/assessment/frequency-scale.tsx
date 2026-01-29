import * as React from "react";
import { cn } from "@/lib/utils";

export interface FrequencyOption {
  value: string | number;
  label: string;
  shortLabel?: string;
}

export interface FrequencyScaleProps {
  /**
   * Array of frequency options (typically 5: Never → Always)
   */
  options?: FrequencyOption[];
  /**
   * Currently selected value
   */
  value?: string | number;
  /**
   * Callback when option is selected
   */
  onChange?: (value: string | number) => void;
  /**
   * Accessible label
   */
  "aria-label"?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Default Arabic frequency scale (5-point Likert)
 */
const defaultOptions: FrequencyOption[] = [
  { value: "never", label: "أبداً", shortLabel: "أبداً" },
  { value: "rarely", label: "نادراً", shortLabel: "نادراً" },
  { value: "sometimes", label: "أحياناً", shortLabel: "أحياناً" },
  { value: "often", label: "غالباً", shortLabel: "غالباً" },
  { value: "always", label: "دائماً", shortLabel: "دائماً" },
];

/**
 * FrequencyScale - 5-point RTL Likert scale for frequency responses
 *
 * Features:
 * - RTL-aware layout (right = low frequency, left = high frequency)
 * - Large touch targets (minimum 48px)
 * - Keyboard navigation (Arrow keys + Enter)
 * - Accessible with ARIA labels
 * - Visual scale with gradient
 *
 * @example
 * ```tsx
 * <FrequencyScale
 *   value={frequency}
 *   onChange={setFrequency}
 *   aria-label="كم مرة تشعر بهذا؟"
 * />
 * ```
 */
export const FrequencyScale = React.forwardRef<
  HTMLDivElement,
  FrequencyScaleProps
>(
  (
    {
      options = defaultOptions,
      value,
      onChange,
      "aria-label": ariaLabel,
      className,
      ...props
    },
    ref
  ) => {
    const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);

    const handleKeyDown = (event: React.KeyboardEvent) => {
      const maxIndex = options.length - 1;

      switch (event.key) {
        case "ArrowRight": // Decrease in RTL (toward "never")
          event.preventDefault();
          setFocusedIndex((prev) => Math.max(0, prev - 1));
          break;
        case "ArrowLeft": // Increase in RTL (toward "always")
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
        aria-label={ariaLabel || "اختر التكرار"}
        className={cn("flex flex-col gap-4", className)}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {/* Visual scale indicator */}
        <div className="relative h-2 bg-gradient-to-l from-primary to-neutral-300 rounded-full" aria-hidden="true" />

        {/* Options */}
        <div className="grid grid-cols-5 gap-2">
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
                tabIndex={
                  isFocused || (focusedIndex === -1 && index === 0) ? 0 : -1
                }
            onClick={() => onChange?.(option.value)}
            onFocus={() => setFocusedIndex(index)}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 p-3 rounded-lg transition-all",
                  "min-h-[48px]", // WCAG touch target
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  "text-center",
                  isSelected
                    ? "bg-primary text-white font-semibold"
                    : "bg-surface border border-neutral-300 hover:border-primary/50 text-text-primary"
                )}
              >
                <span className="text-sm sm:text-base leading-tight">
                  {option.shortLabel || option.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Labels at extremes (optional, for clarity) */}
        <div className="flex justify-between text-xs text-text-secondary px-1">
          <span className="text-end">{options[0].label}</span>
          <span className="text-start">{options[options.length - 1].label}</span>
        </div>
      </div>
    );
  }
);

FrequencyScale.displayName = "FrequencyScale";
