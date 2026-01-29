/**
 * Assessment Page
 * 
 * Dynamic route for running assessments by module and disorder.
 * Route: /assessment/[moduleId]/[disorderId]
 */

'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { QuestionFlow } from '@/components/assessment';
import type { AssessmentModule } from '@/types/assessment';
import anxietyModule from '@/../content/anxiety/anxiety_module.json';
import depressionModule from '@/../content/depression/depression_module.json';

const moduleMap: Record<string, AssessmentModule> = {
  anxiety: anxietyModule as AssessmentModule,
  depression: depressionModule as AssessmentModule,
};

interface AssessmentPageProps {
  params: Promise<{
    moduleId: string;
    disorderId: string;
  }>;
}

export default function AssessmentPage({ params }: AssessmentPageProps) {
  const router = useRouter();
  const [resolvedParams, setResolvedParams] = React.useState<{
    moduleId: string;
    disorderId: string;
  } | null>(null);

  // Resolve params Promise
  React.useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  const moduleData = React.useMemo(() => {
    if (!resolvedParams) return null;
    return moduleMap[resolvedParams.moduleId] ?? null;
  }, [resolvedParams]);

  const disorderExists = React.useMemo(() => {
    if (!moduleData || !resolvedParams) return false;
    return moduleData.disorders.some((disorder) => disorder.id === resolvedParams.disorderId);
  }, [moduleData, resolvedParams]);

  const handleComplete = () => {
    // Navigate to results page
    if (resolvedParams) {
      router.push(`/results/${resolvedParams.moduleId}`);
    }
  };

  if (!resolvedParams) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-text-secondary">جارٍ تحميل التقييم...</div>
      </div>
    );
  }

  if (!moduleData || !disorderExists) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4">
        <div className="text-text-primary text-xl">
          لم يتم العثور على التقييم
        </div>
        <button
          onClick={() => router.push('/home')}
          className="text-primary hover:underline"
        >
          العودة إلى الصفحة الرئيسية
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <QuestionFlow
        module={moduleData}
        disorderId={resolvedParams.disorderId}
        onComplete={handleComplete}
      />
    </main>
  );
}
