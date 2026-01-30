/**
 * PreAssessmentModal Component
 * 
 * Trigger warning and consent modal for sensitive assessment modules (PTSD).
 * Displays safety information, warnings, and requires explicit consent before proceeding.
 * 
 * Features:
 * - Non-dismissible modal (no backdrop click, no ESC key)
 * - Optional consent checkboxes (2 items)
 * - Skip option for users who are not ready
 * - Continue button disabled until all consents acknowledged
 * - RTL-optimized layout
 * 
 * Accessibility:
 * - Focus trap within modal
 * - Screen reader announcements for consent requirements
 * - Keyboard navigation (Tab, Enter, Space)
 * - High contrast for readability
 * 
 * @example
 * ```tsx
 * <PreAssessmentModal
 *   open={showModal}
 *   title="تحذير مهم"
 *   content={<div>يتضمن هذا القسم أسئلة عن تجارب صادمة...</div>}
 *   canSkip={true}
 *   onContinue={handleStart}
 *   onSkip={handleSkip}
 * />
 * ```
 */

'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle } from 'lucide-react';

export interface PreAssessmentModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Modal title */
  title: string;
  /** Warning content (can include formatted text) */
  content: React.ReactNode;
  /** Whether user can skip this module */
  canSkip?: boolean;
  /** Skip button text */
  skipButtonText?: string;
  /** Continue button text */
  continueButtonText?: string;
  /** Callback when user clicks Continue (after consent) */
  onContinue: () => void;
  /** Callback when user clicks Skip */
  onSkip?: () => void;
}

/**
 * PreAssessmentModal - Trigger warning and consent for sensitive modules
 */
export function PreAssessmentModal({
  open,
  title,
  content,
  canSkip = false,
  skipButtonText = 'تخطي هذا القسم',
  continueButtonText = 'أنا مستعد للمتابعة',
  onContinue,
  onSkip,
}: PreAssessmentModalProps) {
  const [consent1, setConsent1] = React.useState(false);
  const [consent2, setConsent2] = React.useState(false);

  // Reset consent state when modal closes/opens
  React.useEffect(() => {
    if (open) {
      setConsent1(false);
      setConsent2(false);
    }
  }, [open]);

  const allConsented = consent1 && consent2;

  return (
    <Dialog open={open} modal>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        hideClose
        aria-describedby="pre-assessment-description"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0" aria-hidden="true" />
            <span>{title}</span>
          </DialogTitle>
        </DialogHeader>

        <div id="pre-assessment-description" className="space-y-6">
          {/* Warning content */}
          <DialogDescription className="text-base leading-relaxed whitespace-pre-line text-text-primary">
            {content}
          </DialogDescription>

          {/* Consent checkboxes */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-4">
            <h3 className="font-semibold text-text-primary">للمتابعة، يرجى التأكيد:</h3>
            
            <div className="space-y-3">
              {/* Consent 1: Understanding */}
              <div className="flex items-start gap-3">
                <Checkbox
                  id="consent-understanding"
                  checked={consent1}
                  onCheckedChange={(checked) => setConsent1(checked === true)}
                  className="mt-0.5"
                  aria-required="true"
                />
                <label
                  htmlFor="consent-understanding"
                  className="text-sm text-text-secondary leading-relaxed cursor-pointer"
                >
                  أفهم أن هذا التقييم تعليمي وليس تشخيصاً طبياً، وقد يتضمن أسئلة عن تجارب صادمة
                </label>
              </div>

              {/* Consent 2: Readiness */}
              <div className="flex items-start gap-3">
                <Checkbox
                  id="consent-readiness"
                  checked={consent2}
                  onCheckedChange={(checked) => setConsent2(checked === true)}
                  className="mt-0.5"
                  aria-required="true"
                />
                <label
                  htmlFor="consent-readiness"
                  className="text-sm text-text-secondary leading-relaxed cursor-pointer"
                >
                  أشعر بالاستعداد للإجابة على هذه الأسئلة الآن، ويمكنني التوقف في أي وقت إذا شعرت بعدم الارتياح
                </label>
              </div>
            </div>

            {/* Consent requirement notice */}
            {!allConsented && (
              <div
                className="text-xs text-amber-700"
                role="status"
                aria-live="polite"
              >
                يجب الموافقة على جميع العناصر للمتابعة
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3">
          {/* Skip button (if allowed) */}
          {canSkip && onSkip && (
            <Button
              variant="secondary"
              size="large"
              onClick={onSkip}
              className="w-full sm:w-auto"
            >
              {skipButtonText}
            </Button>
          )}

          {/* Continue button (disabled until consented) */}
          <Button
            variant="primary"
            size="large"
            onClick={onContinue}
            disabled={!allConsented}
            className="w-full sm:w-auto"
            aria-disabled={!allConsented}
          >
            {continueButtonText}
          </Button>
        </DialogFooter>

        {/* Screen reader announcement for disabled state */}
        {!allConsented && (
          <div className="sr-only" role="status" aria-live="assertive">
            يجب الموافقة على جميع العناصر للمتابعة
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
