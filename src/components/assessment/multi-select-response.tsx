/**
 * Multi-Select Response Component
 * 
 * Multiple choice selection component with checkboxes.
 * Features:
 * - RTL layout
 * - Keyboard navigation
 * - Accessible with ARIA
 * - Large touch targets
 */

'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

export interface MultiSelectOption {
  value: string;
  label: string;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  'aria-label'?: string;
  className?: string;
}

export const MultiSelectResponse = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  ({ options, value = [], onChange, 'aria-label': ariaLabel, className, ...props }, ref) => {
    const handleToggle = (optionValue: string) => {
      const newValue = value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue];
      onChange?.(newValue);
    };

    return (
      <div
        ref={ref}
        role="group"
        aria-label={ariaLabel || 'اختر جميع الخيارات المناسبة'}
        className={cn('flex flex-col gap-2', className)}
        {...props}
      >
        {options.map((option) => {
          const isChecked = value.includes(option.value);
          const id = `option-${option.value}`;

          return (
            <div
              key={option.value}
              className={cn(
                'flex items-start gap-3 p-3 rounded-lg border transition-all',
                'min-h-[48px]', // WCAG touch target
                'cursor-pointer hover:border-primary/50',
                isChecked
                  ? 'bg-primary/5 border-primary'
                  : 'bg-surface border-neutral-300'
              )}
              onClick={() => handleToggle(option.value)}
            >
              <Checkbox
                id={id}
                checked={isChecked}
                onCheckedChange={() => handleToggle(option.value)}
                className="mt-0.5"
                aria-label={option.label}
              />
              <label
                htmlFor={id}
                className="flex-1 text-base text-text-primary cursor-pointer leading-snug"
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
    );
  }
);

MultiSelectResponse.displayName = 'MultiSelectResponse';
