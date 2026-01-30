/**
 * Assessment Page
 * 
 * Dynamic route for running assessments by module and disorder.
 * Route: /assessment/[moduleId]/[disorderId]
 * 
 * Loads module data from the central registry to support extensibility.
 */

'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { QuestionFlow } from '@/components/assessment';
import { loadModule, validateDisorder } from '@/lib/module-registry';

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

  const handleComplete = React.useCallback(() => {
    // Navigate to results page for this module
    if (resolvedParams) {
      router.push(`/results/${resolvedParams.moduleId}`);
    }
  }, [resolvedParams, router]);

  if (!resolvedParams) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-text-secondary">جارٍ تحميل التقييم...</div>
      </div>
    );
  }

  // Load module from registry (synchronous)
  const moduleData = loadModule(resolvedParams.moduleId);

  // Validate disorder exists in module
  const isValid = moduleData 
    ? validateDisorder(resolvedParams.moduleId, resolvedParams.disorderId)
    : false;

  if (!moduleData || !isValid) {
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
