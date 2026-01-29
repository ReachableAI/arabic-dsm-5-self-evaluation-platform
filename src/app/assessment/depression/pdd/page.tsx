/**
 * Persistent Depressive Disorder (PDD / Dysthymia) Assessment Page
 * 
 * Individual disorder assessment with question flow integration.
 * Focuses on chronic low mood lasting 2+ years.
 * 
 * Features:
 * - Educational intro before questions
 * - RTL question flow
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

export default function PDDAssessmentPage() {
  const router = useRouter();
  const disorderId = 'pdd';

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
