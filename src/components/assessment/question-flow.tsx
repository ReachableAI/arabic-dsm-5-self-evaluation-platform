/**
 * Question Flow Container
 * 
 * Orchestrates the assessment question flow with:
 * - Progress tracking (counter + percentage bar)
 * - Navigation (back/next/exit)
 * - Response collection
 * - Conditional question logic
 * - Exit confirmation dialog
 * 
 * Features:
 * - Keyboard navigation (Escape to exit)
 * - Accessible progress indicators
 * - RTL-aware layout
 */

'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAssessment } from '@/contexts/assessment-context';
import type { AssessmentModule, CompositeResponseValue, ResponseValue } from '@/types/assessment';
import { getVisibleQuestions } from '@/lib/pattern-calculator';
import { QuestionRenderer } from './question-renderer';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { CrisisModal, PersistentCrisisIndicator } from './crisis-modal';

export interface QuestionFlowProps {
  module: AssessmentModule;
  disorderId: string;
  onComplete?: () => void;
}

export function QuestionFlow({ module, disorderId, onComplete }: QuestionFlowProps) {
  const router = useRouter();
  const {
    session,
    startAssessment,
    recordResponse,
    goToNextQuestion,
    goToPreviousQuestion,
    exitAssessment,
    completeAssessment,
    currentQuestionIndex,
    totalQuestions,
    progress,
    canGoBack,
    canGoNext,
  } = useAssessment();

  const [showExitDialog, setShowExitDialog] = React.useState(false);
  const [showCrisisModal, setShowCrisisModal] = React.useState(false);
  const [crisisAcknowledged, setCrisisAcknowledged] = React.useState(false);
  const [currentResponse, setCurrentResponse] = React.useState<ResponseValue | undefined>();

  // Start assessment on mount
  React.useEffect(() => {
    if (!session || session.disorder_id !== disorderId) {
      startAssessment(module, disorderId);
    }
  }, [module, disorderId, session, startAssessment]);

  // Get current disorder and questions
  const disorder = React.useMemo(
    () => module.disorders.find((d) => d.id === disorderId),
    [module.disorders, disorderId]
  );

  const visibleQuestions = React.useMemo(() => {
    if (!disorder || !session) return [];
    return getVisibleQuestions(disorder, session.responses);
  }, [disorder, session]);

  const currentQuestion = visibleQuestions[currentQuestionIndex];

  // Load current response
  React.useEffect(() => {
    if (!currentQuestion || !session) return;
    const response = session.responses.find(
      (r) => r.question_id === currentQuestion.id
    );
    setCurrentResponse(response?.value);
  }, [currentQuestion, session]);

  // Handle escape key
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowExitDialog(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleResponseChange = (value: ResponseValue) => {
    setCurrentResponse(value);
    if (currentQuestion) {
      recordResponse(currentQuestion.id, value);

      // Crisis detection: A9 suicidal ideation with any non-zero frequency
      if (currentQuestion.crisis_trigger) {
        const shouldTrigger = checkCrisisTrigger(currentQuestion.crisis_trigger, value);
        if (shouldTrigger && !crisisAcknowledged) {
          setShowCrisisModal(true);
        }
      }
    }
  };

  /**
   * Check if response meets crisis trigger criteria
   */
  const checkCrisisTrigger = (
    trigger: { show_modal_if: string; modal_type: string },
    value: ResponseValue
  ): boolean => {
    let numericValue: number | null = null;
    if (typeof value === 'number') {
      numericValue = value;
    } else if (typeof value === 'string') {
      const scores: Record<string, number> = {
        never: 0,
        rarely: 1,
        sometimes: 2,
        often: 3,
        always: 4,
      };
      numericValue = scores[value] ?? null;
    }

    if (numericValue === null) return false;

    // Parse condition (e.g., ">=1")
    const condition = trigger.show_modal_if;
    if (condition.startsWith('>=')) {
      const threshold = parseInt(condition.slice(2));
      return numericValue >= threshold;
    }
    if (condition.startsWith('>')) {
      const threshold = parseInt(condition.slice(1));
      return numericValue > threshold;
    }
    if (condition.startsWith('==')) {
      const threshold = parseInt(condition.slice(2));
      return numericValue === threshold;
    }

    return false;
  };

  const isResponseComplete = React.useMemo(() => {
    if (!currentQuestion?.required) return true;
    if (currentResponse === undefined || currentResponse === null) return false;

    if (Array.isArray(currentResponse)) {
      return currentResponse.length > 0;
    }

    if (typeof currentResponse === 'object') {
      const composite = currentResponse as CompositeResponseValue;

      if ('occurrence' in composite) {
        if (!composite.occurrence) return false;
        if (composite.occurrence === 'yes') {
          if (currentQuestion.response_type === 'yes_no_duration') {
            return typeof composite.duration === 'number';
          }
          if (currentQuestion.response_type === 'yes_no_frequency') {
            return typeof composite.frequency === 'number';
          }
        }
        return true;
      }

      if ('changed' in composite) {
        if (!composite.changed) return false;
        if (composite.changed === 'changed') {
          return Boolean(composite.direction);
        }
        return true;
      }

      return false;
    }

    return true;
  }, [currentQuestion, currentResponse]);

  const handleNext = () => {
    if (currentQuestion?.required && !isResponseComplete) {
      // Could show validation error here
      return;
    }

    if (canGoNext) {
      goToNextQuestion();
    } else {
      // Last question - complete assessment
      completeAssessment();
      onComplete?.();
    }
  };

  const handleBack = () => {
    if (canGoBack) {
      goToPreviousQuestion();
    }
  };

  const handleExit = () => {
    setShowExitDialog(true);
  };

  const confirmExit = () => {
    exitAssessment();
    router.push('/home');
  };

  const handleCrisisAcknowledge = () => {
    setCrisisAcknowledged(true);
  };

  const handleCrisisContinue = () => {
    setShowCrisisModal(false);
    // User can continue assessment; indicator will remain visible
  };

  const handleCrisisExit = () => {
    setShowCrisisModal(false);
    exitAssessment();
    router.push('/home');
  };

  if (!currentQuestion || !disorder) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-text-secondary">جارٍ التحميل...</div>
      </div>
    );
  }

  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto px-4 py-8">
      {/* Progress header */}
      <div className="flex flex-col gap-4">
        {/* Question counter and exit */}
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-text-secondary">
            سؤال {currentQuestionIndex + 1} من {totalQuestions}
          </div>
          <Button
            variant="ghost"
            size="small"
            onClick={handleExit}
            className="text-text-tertiary hover:text-text-secondary"
          >
            خروج
          </Button>
        </div>

        {/* Progress bar */}
        <div className="w-full">
          <Progress
            value={progress}
            className="h-2"
            aria-label={`التقدم: ${progress}٪`}
          />
          <div className="sr-only" role="status" aria-live="polite">
            أكملت {progress}٪ من الأسئلة
          </div>
        </div>

        {/* Disorder name */}
        <div className="text-sm text-text-tertiary">
          {disorder.name}
        </div>
      </div>

      {/* Question */}
      <QuestionRenderer
        question={currentQuestion}
        value={currentResponse}
        onChange={handleResponseChange}
        responseScales={module.response_scales}
      />

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4 pt-4">
        <Button
          variant="secondary"
          size="large"
          onClick={handleBack}
          disabled={!canGoBack}
          className="min-w-[120px]"
        >
          السابق
        </Button>

        <Button
          size="large"
          onClick={handleNext}
          disabled={currentQuestion.required && !isResponseComplete}
          className={cn(
            'min-w-[120px]',
            isLastQuestion && 'bg-green-600 hover:bg-green-700'
          )}
        >
          {isLastQuestion ? 'إنهاء' : 'التالي'}
        </Button>
      </div>

      {/* Crisis intervention modal */}
      <CrisisModal
        open={showCrisisModal}
        onContinue={handleCrisisContinue}
        onExit={handleCrisisExit}
        onAcknowledge={handleCrisisAcknowledge}
      />

      {/* Persistent crisis indicator (after acknowledgement) */}
      {crisisAcknowledged && !showCrisisModal && <PersistentCrisisIndicator />}

      {/* Exit confirmation dialog */}
      <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>هل تريد الخروج من التقييم؟</DialogTitle>
            <DialogDescription>
              سيتم فقدان تقدمك الحالي إذا خرجت الآن. لن يتم حفظ الإجابات.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-3">
            <Button
              variant="secondary"
              onClick={() => setShowExitDialog(false)}
            >
              متابعة التقييم
            </Button>
            <Button variant="danger" onClick={confirmExit}>
              خروج
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
