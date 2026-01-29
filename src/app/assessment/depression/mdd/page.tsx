/**
 * Major Depressive Disorder (MDD) Assessment Page
 * 
 * Individual disorder assessment with question flow integration.
 * Includes crisis intervention for A9 (suicidal ideation) responses.
 * 
 * Features:
 * - Educational intro before questions
 * - RTL question flow
 * - Crisis modal trigger on A9 non-zero responses
 * - Progress tracking
 * - Pattern calculation on completion
 */

'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { QuestionFlow } from '@/components/assessment/question-flow';
import depressionModule from '@/../content/depression/depression_module.json';
import type { AssessmentModule } from '@/types/assessment';

const assessmentModule = depressionModule as AssessmentModule;

export default function MDDAssessmentPage() {
  const router = useRouter();
  const disorderId = 'mdd';

  const handleComplete = () => {
    // Navigate to results page (placeholder for now)
    router.push('/home');
  };

  return (
    <QuestionFlow
      module={assessmentModule}
      disorderId={disorderId}
      onComplete={handleComplete}
    />
  );
}
