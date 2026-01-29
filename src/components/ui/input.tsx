import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Error state for validation feedback
   */
  error?: boolean;
  /**
   * Icon to display on the left side (end in RTL)
   */
  iconEnd?: React.ReactNode;
}

/**
 * Input component with RTL support and WCAG 2.2 Level AA compliance.
 *
 * Features:
 * - Minimum 44px height for touch targets
 * - RTL-aware text alignment
 * - Clear focus states
 * - Error state styling
 * - Optional icon support
 *
 * @example
 * ```tsx
 * <Input
 *   type="text"
 *   placeholder="أدخل اسمك"
 *   aria-label="الاسم"
 * />
 *
 * <Input
 *   type="email"
 *   error={true}
 *   aria-invalid="true"
 *   aria-describedby="email-error"
 * />
 * ```
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, iconEnd, ...props }, ref) => {
    const inputClasses = cn(
      "flex h-11 w-full rounded-md border bg-surface px-4 py-2 text-base",
      "text-start", // Right-aligned in RTL
      "transition-colors",
      "placeholder:text-text-secondary/60",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      error
        ? "border-danger focus-visible:ring-danger"
        : "border-neutral-300 focus-visible:ring-primary",
      className
    );

    if (iconEnd) {
      return (
        <div className="relative w-full">
          <input type={type} className={inputClasses} ref={ref} {...props} />
          <span
            className="absolute top-1/2 -translate-y-1/2 left-3 text-text-secondary pointer-events-none"
            aria-hidden="true"
          >
            {iconEnd}
          </span>
        </div>
      );
    }

    return <input type={type} className={inputClasses} ref={ref} {...props} />;
  }
);
Input.displayName = "Input";

export { Input };
