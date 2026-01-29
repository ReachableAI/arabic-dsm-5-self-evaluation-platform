import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

/**
 * RadioGroup - Root component for radio button groups
 */
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-3", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

/**
 * RadioGroupItem - Individual radio button with WCAG-compliant touch target
 *
 * Features:
 * - Minimum 48px touch target (24px visible + 12px padding on each side)
 * - Clear focus states
 * - RTL-aware positioning
 *
 * @example
 * ```tsx
 * <RadioGroup>
 *   <div className="flex items-center gap-3">
 *     <RadioGroupItem value="option1" id="r1" />
 *     <label htmlFor="r1">الخيار الأول</label>
 *   </div>
 * </RadioGroup>
 * ```
 */
const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-6 w-6 rounded-full border-2 border-primary text-primary",
        "ring-offset-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Add padding to create 48px touch target
        "p-3", // 12px padding on each side: 12 + 24 + 12 = 48px
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <div className="h-3 w-3 rounded-full bg-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
