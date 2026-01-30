/**
 * SafetyBadge Component
 * 
 * Visual indicator for sensitive content with 3 severity levels.
 * Used in category cards and module landing pages to signal safety considerations.
 * 
 * Variants:
 * - info: General informational safety note (blue)
 * - warning: Moderate sensitivity warning (amber)
 * - danger: High sensitivity alert (red)
 * 
 * Accessibility:
 * - role="status" for screen reader announcement
 * - Semantic color with text label
 * - Keyboard focusable when interactive
 * 
 * @example
 * ```tsx
 * <SafetyBadge variant="warning">
 *   يتضمن أسئلة حساسة
 * </SafetyBadge>
 * ```
 */

'use client';

import * as React from 'react';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SafetyBadgeVariant = 'info' | 'warning' | 'danger';

export interface SafetyBadgeProps {
  /**
   * Visual severity level
   */
  variant?: SafetyBadgeVariant;
  /**
   * Badge text content
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * SafetyBadge - Visual indicator for sensitive content
 */
export function SafetyBadge({
  variant = 'info',
  children,
  className,
}: SafetyBadgeProps) {
  const Icon = {
    info: Info,
    warning: AlertTriangle,
    danger: AlertCircle,
  }[variant];

  const variantStyles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    danger: 'bg-red-50 border-red-200 text-red-800',
  }[variant];

  return (
    <div
      role="status"
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium',
        variantStyles,
        className
      )}
      aria-label={`تنبيه السلامة: ${children}`}
    >
      <Icon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}
