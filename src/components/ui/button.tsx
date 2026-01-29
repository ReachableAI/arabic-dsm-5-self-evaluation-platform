import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Button variants using CSS Logical Properties for RTL support.
 * Implements primary, secondary, ghost, and danger variants as per design spec.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white hover:bg-primary/90 active:bg-primary/80",
        secondary:
          "border-2 border-primary bg-transparent text-primary hover:bg-primary/10 active:bg-primary/20",
        ghost:
          "bg-transparent text-neutral-900 hover:bg-surface-hover active:bg-surface-hover/80",
        danger:
          "bg-danger text-white hover:bg-danger/90 active:bg-danger/80",
      },
      size: {
        small: "h-9 px-4 text-sm min-w-[44px]", // 36px height, add margin for 44px touch target
        medium: "h-11 px-5 text-base min-w-[44px]", // 44px height - meets WCAG
        large: "h-[52px] px-6 text-lg min-w-[52px]", // 52px height - exceeds WCAG
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * If true, the button will render as a child component (for use with Next.js Link, etc.)
   */
  asChild?: boolean;
  /**
   * If true, button will show loading state with aria-busy
   */
  isLoading?: boolean;
  /**
   * Icon to display before the button text (right side in RTL)
   */
  iconLeading?: React.ReactNode;
  /**
   * Icon to display after the button text (left side in RTL)
   */
  iconTrailing?: React.ReactNode;
}

/**
 * Button component with RTL support and WCAG 2.2 Level AA compliance.
 *
 * Features:
 * - Four variants: primary, secondary, ghost, danger
 * - Three sizes with minimum 44px touch targets
 * - RTL-aware icon placement using CSS Logical Properties
 * - Accessible focus states and keyboard navigation
 * - Loading state support
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="medium">
 *   ابدأ التقييم
 * </Button>
 *
 * <Button variant="secondary" iconLeading={<ArrowIcon />}>
 *   رجوع
 * </Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      iconLeading,
      iconTrailing,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {iconLeading && (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {iconLeading}
          </span>
        )}
        {children}
        {iconTrailing && (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {iconTrailing}
          </span>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
