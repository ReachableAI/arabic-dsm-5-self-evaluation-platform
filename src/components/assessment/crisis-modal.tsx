/**
 * Crisis Intervention Modal
 * 
 * Triggered when a user answers A9 (suicidal ideation) with any non-zero frequency.
 * Displays Arabic crisis helpline numbers and requires acknowledgement before proceeding.
 * 
 * Safety features:
 * - Cannot be dismissed without acknowledgement
 * - Prominent helpline numbers
 * - Options to exit assessment or continue with support
 * - Logs crisis event only (no user responses)
 * - Persistent helpline indicator after acknowledgement
 * 
 * Accessibility:
 * - Focus trap within modal
 * - Keyboard navigation (Tab, Enter)
 * - Screen reader announcements
 * - High contrast for readability
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Phone } from 'lucide-react';
import safetyContent from '@/../content/safety/safety_disclaimers.json';

export interface CrisisModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Callback when user chooses to continue assessment */
  onContinue?: () => void;
  /** Callback when user chooses to exit assessment */
  onExit?: () => void;
  /** Callback after acknowledgement */
  onAcknowledge?: () => void;
}

export function CrisisModal({
  open,
  onContinue,
  onExit,
  onAcknowledge,
}: CrisisModalProps) {
  const [acknowledged, setAcknowledged] = React.useState(false);
  const crisisContent = safetyContent.safety_content.crisis_intervention_modal.suicidal_ideation;

  // Log crisis event (privacy-safe: no user data)
  React.useEffect(() => {
    if (open && !acknowledged) {
      // Log to console for development; in production, this would go to analytics
      console.info('[Crisis Event] Suicidal ideation modal triggered', {
        timestamp: new Date().toISOString(),
        event: 'crisis_modal_shown',
        // NO user responses or identifying information
      });
    }
  }, [open, acknowledged]);

  const handleAcknowledge = () => {
    setAcknowledged(true);
    onAcknowledge?.();
  };

  const handleContinue = () => {
    handleAcknowledge();
    onContinue?.();
  };

  const handleExit = () => {
    handleAcknowledge();
    onExit?.();
  };

  return (
    <Dialog open={open} modal>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        hideClose
        aria-describedby="crisis-modal-description"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0" aria-hidden="true" />
            <span>{crisisContent.title}</span>
          </DialogTitle>
        </DialogHeader>

        <div id="crisis-modal-description" className="space-y-6">
          {/* Main message */}
          <DialogDescription className="text-base leading-relaxed whitespace-pre-line text-text-primary">
            {crisisContent.body}
          </DialogDescription>

          {/* Crisis helpline numbers */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-text-primary">
              أرقام المساعدة الفورية:
            </h3>
            <div className="space-y-3">
              {crisisContent.resources.map((resource, index) => (
                <Alert key={index} className="border-red-200 bg-red-50">
                  <Phone className="h-5 w-5 text-red-600 flex-shrink-0" aria-hidden="true" />
                  <AlertDescription className="space-y-1">
                    <div className="font-semibold text-text-primary">
                      {resource.region} — {resource.name}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <a
                        href={`tel:${resource.phone.replace(/[\s-]/g, '')}`}
                        className="text-2xl font-bold text-red-700 hover:text-red-800 underline"
                        dir="ltr"
                      >
                        {resource.phone}
                      </a>
                      <span className="text-sm text-text-secondary">
                        ({resource.available})
                      </span>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </div>

          {/* Additional guidance */}
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            <AlertDescription className="whitespace-pre-line">
              {crisisContent.additional_text}
            </AlertDescription>
          </Alert>

          {/* Continue option explanation */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-text-secondary leading-relaxed">
              {crisisContent.continue_option.text}
            </p>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="secondary"
            size="large"
            onClick={handleExit}
            className="w-full sm:w-auto"
          >
            خروج من التقييم
          </Button>
          <Button
            variant="primary"
            size="large"
            onClick={handleContinue}
            className="w-full sm:w-auto"
          >
            {crisisContent.continue_option.button_continue}
          </Button>
        </DialogFooter>

        {/* Screen reader announcement */}
        <div className="sr-only" role="alert" aria-live="assertive">
          تحذير: إذا كنت تفكر في إيذاء نفسك، يرجى الاتصال بأحد أرقام المساعدة المعروضة فوراً.
        </div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Persistent Crisis Indicator
 * 
 * Shows at the bottom of the screen after crisis modal acknowledgement.
 * Provides quick access to helpline numbers during remainder of assessment.
 */
export function PersistentCrisisIndicator() {
  const [expanded, setExpanded] = React.useState(false);
  const crisisContent = safetyContent.safety_content.crisis_intervention_modal.suicidal_ideation;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-red-50 border-t-2 border-red-300 shadow-lg z-40"
      role="complementary"
      aria-label="أرقام المساعدة الفورية"
    >
      <div className="max-w-4xl mx-auto px-4 py-3">
        {!expanded ? (
          <button
            onClick={() => setExpanded(true)}
            className="w-full flex items-center justify-between text-right hover:bg-red-100 rounded-lg p-2 transition-colors"
            aria-expanded={expanded}
          >
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-red-600 flex-shrink-0" aria-hidden="true" />
              <span className="font-semibold text-text-primary">
                أرقام المساعدة متاحة
              </span>
            </div>
            <span className="text-sm text-text-secondary">اضغط لعرضها</span>
          </button>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-red-600 flex-shrink-0" aria-hidden="true" />
                <span className="font-semibold text-text-primary">
                  أرقام المساعدة الفورية
                </span>
              </div>
              <button
                onClick={() => setExpanded(false)}
                className="text-sm text-text-secondary hover:text-text-primary"
                aria-expanded={expanded}
              >
                إخفاء
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-2 text-sm">
              {crisisContent.resources.slice(0, 3).map((resource, index) => (
                <div key={index} className="bg-white rounded p-2 border border-red-200">
                  <div className="font-medium">{resource.region}</div>
                  <a
                    href={`tel:${resource.phone.replace(/[\s-]/g, '')}`}
                    className="text-lg font-bold text-red-700 hover:text-red-800 underline"
                    dir="ltr"
                  >
                    {resource.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
