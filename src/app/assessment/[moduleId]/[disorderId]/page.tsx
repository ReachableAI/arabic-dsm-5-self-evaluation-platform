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

interface AssessmentPageProps {
  params: Promise<{
    moduleId: string;
    disorderId: string;
  }>;
}

export default function AssessmentPage({ params }: AssessmentPageProps) {
  const router = useRouter();
  const [moduleData, setModuleData] = React.useState<AssessmentModule | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [resolvedParams, setResolvedParams] = React.useState<{
    moduleId: string;
    disorderId: string;
  } | null>(null);

  // Resolve params Promise
  React.useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  // Load module data
  React.useEffect(() => {
    if (!resolvedParams) return;

    async function loadModule() {
      try {
        const response = await fetch(`/content/${resolvedParams!.moduleId}/${resolvedParams!.moduleId}_module.json`);
        
        if (!response.ok) {
          throw new Error('فشل تحميل بيانات التقييم');
        }

        const data = await response.json();
        setModuleData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع');
      } finally {
        setLoading(false);
      }
    }

    loadModule();
  }, [resolvedParams]);

  const handleComplete = () => {
    // Navigate to results page
    router.push(`/results/${resolvedParams!.moduleId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-text-secondary">جارٍ تحميل التقييم...</div>
      </div>
    );
  }

  if (error || !moduleData || !resolvedParams) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4">
        <div className="text-text-primary text-xl">
          {error || 'لم يتم العثور على التقييم'}
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
