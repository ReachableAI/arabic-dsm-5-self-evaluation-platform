import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  /**
   * Progress value (0-100)
   */
  value?: number;
  /**
   * Color variant for the progress indicator
   */
  variant?: "primary" | "secondary" | "success" | "warning" | "danger";
}

const variantStyles = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
};

/**
 * Progress component with RTL-aware fill direction.
 *
 * Features:
 * - RTL-aware progress fill (fills from right to left)
 * - Color variants for different states
 * - Accessible with proper ARIA attributes
 * - Smooth transitions
 *
 * @example
 * ```tsx
 * <Progress value={60} variant="primary" />
 * <Progress value={100} variant="success" aria-label="اكتمال التقييم" />
 * ```
 */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value = 0, variant = "primary", ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-3 w-full overflow-hidden rounded-full bg-neutral-300",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        "h-full w-full flex-1 transition-all duration-300 ease-in-out",
        variantStyles[variant]
      )}
      style={{
        // In RTL, transform origin should be right (start)
        transformOrigin: "right",
        transform: `translateX(${100 - (value || 0)}%)`,
      }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
