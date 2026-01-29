import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Error state for validation feedback
   */
  error?: boolean;
}

/**
 * Textarea component with RTL support and WCAG 2.2 Level AA compliance.
 *
 * Features:
 * - Minimum height for comfortable input
 * - RTL-aware text alignment
 * - Clear focus states
 * - Error state styling
 * - Automatic resize support
 *
 * @example
 * ```tsx
 * <Textarea
 *   placeholder="اكتب رسالتك هنا"
 *   aria-label="الرسالة"
 *   rows={4}
 * />
 * ```
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border bg-surface px-4 py-2 text-base",
          "text-start", // Right-aligned in RTL
          "transition-colors",
          "placeholder:text-text-secondary/60",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "resize-y", // Allow vertical resize
          error
            ? "border-danger focus-visible:ring-danger"
            : "border-neutral-300 focus-visible:ring-primary",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
