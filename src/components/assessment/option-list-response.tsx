/**
 * Option List Response Component
 *
 * Generic radio list for variable-length option sets.
 * Features:
 * - RTL layout
 * - Keyboard navigation
 * - Accessible with ARIA
 * - Large touch targets
 */

'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface OptionListItem {
  value: string | number;
  label: string;
  description?: string;
}

export interface OptionListResponseProps {
  options: OptionListItem[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  'aria-label'?: string;
  className?: string;
}

export const OptionListResponse = React.forwardRef<
  HTMLDivElement,
  OptionListResponseProps
>(({ options, value, onChange, 'aria-label': ariaLabel, className, ...props }, ref) => {
  const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const maxIndex = options.length - 1;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight': // Move down in RTL
        event.preventDefault();
        setFocusedIndex((prev) => Math.min(maxIndex, prev + 1));
        break;
      case 'ArrowUp':
      case 'ArrowLeft': // Move up in RTL
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
      aria-label={ariaLabel || 'اختر خياراً'}
      className={cn('flex flex-col gap-2', className)}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {options.map((option, index) => {
        const isSelected = value === option.value;
        const isFocused = focusedIndex === index;

        return (
          <button
            key={`${option.value}-${index}`}
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
              'flex flex-col items-start gap-1 py-3 px-4 rounded-lg transition-all text-start',
              'min-h-[48px]', // WCAG touch target
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              isSelected
                ? 'bg-primary text-white border-2 border-primary'
                : 'bg-surface border border-neutral-300 hover:border-primary/50 text-text-primary'
            )}
          >
            <span className="text-base font-medium">{option.label}</span>
            {option.description && (
              <span className="text-sm text-text-secondary">{option.description}</span>
            )}
          </button>
        );
      })}
    </div>
  );
});

OptionListResponse.displayName = 'OptionListResponse';
