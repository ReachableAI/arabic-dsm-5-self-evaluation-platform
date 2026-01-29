/**
 * Duration Scale Component
 * 
 * Time period selection component for duration-based questions.
 * Features:
 * - RTL layout
 * - Keyboard navigation
 * - Accessible with ARIA
 * - Large touch targets
 */

'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface DurationOption {
  value: string | number;
  label: string;
  labelEn?: string;
}

export interface DurationScaleProps {
  options?: DurationOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  'aria-label'?: string;
  className?: string;
}

const defaultOptions: DurationOption[] = [
  { value: 'less_2_weeks', label: 'أقل من أسبوعين', labelEn: 'Less than 2 weeks' },
  { value: '2_4_weeks', label: '2-4 أسابيع', labelEn: '2-4 weeks' },
  { value: '1_3_months', label: '1-3 أشهر', labelEn: '1-3 months' },
  { value: '3_6_months', label: '3-6 أشهر', labelEn: '3-6 months' },
  { value: '6_months_plus', label: 'أكثر من 6 أشهر', labelEn: 'More than 6 months' },
];

export const DurationScale = React.forwardRef<HTMLDivElement, DurationScaleProps>(
  (
    {
      options = defaultOptions,
      value,
      onChange,
      'aria-label': ariaLabel,
      className,
      ...props
    },
    ref
  ) => {
    const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);

    const handleKeyDown = (event: React.KeyboardEvent) => {
      const maxIndex = options.length - 1;

      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowRight': // Longer duration in RTL
          event.preventDefault();
          setFocusedIndex((prev) => Math.min(maxIndex, prev + 1));
          break;
        case 'ArrowUp':
        case 'ArrowLeft': // Shorter duration in RTL
          event.preventDefault();
          setFocusedIndex((prev) => Math.max(0, prev - 1));
          break;
        case 'Enter':
        case ' ':
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
        aria-label={ariaLabel || 'اختر المدة الزمنية'}
        className={cn('flex flex-col gap-2', className)}
        onKeyDown={handleKeyDown}
        {...props}
      >
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
                'flex items-center justify-center py-3 px-4 rounded-lg transition-all',
                'min-h-[48px]', // WCAG touch target
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                'text-base font-medium text-center',
                isSelected
                  ? 'bg-primary text-white border-2 border-primary'
                  : 'bg-surface border border-neutral-300 hover:border-primary/50 text-text-primary'
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    );
  }
);

DurationScale.displayName = 'DurationScale';
