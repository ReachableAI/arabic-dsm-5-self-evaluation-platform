/**
 * Yes/No Response Component
 * 
 * Binary choice component for yes/no questions.
 * Features:
 * - RTL layout
 * - Keyboard navigation (Arrow keys + Enter)
 * - Accessible with ARIA
 * - Large touch targets (48px)
 */

'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface YesNoProps {
  value?: 'yes' | 'no';
  onChange?: (value: 'yes' | 'no') => void;
  'aria-label'?: string;
  className?: string;
}

const options = [
  { value: 'yes' as const, label: 'نعم', labelEn: 'Yes' },
  { value: 'no' as const, label: 'لا', labelEn: 'No' },
];

export const YesNoResponse = React.forwardRef<HTMLDivElement, YesNoProps>(
  ({ value, onChange, 'aria-label': ariaLabel, className, ...props }, ref) => {
    const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);

    const handleKeyDown = (event: React.KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight': // Move to "no" in RTL
          event.preventDefault();
          setFocusedIndex(1);
          break;
        case 'ArrowLeft': // Move to "yes" in RTL
          event.preventDefault();
          setFocusedIndex(0);
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < options.length) {
            onChange?.(options[focusedIndex].value);
          }
          break;
      }
    };

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-label={ariaLabel || 'اختر نعم أو لا'}
        className={cn('flex gap-3', className)}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
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
                'flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-lg transition-all',
                'min-h-[48px]', // WCAG touch target
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                'text-base sm:text-lg font-medium',
                isSelected
                  ? 'bg-primary text-white border-2 border-primary'
                  : 'bg-surface border-2 border-neutral-300 hover:border-primary/50 text-text-primary'
              )}
            >
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    );
  }
);

YesNoResponse.displayName = 'YesNoResponse';
