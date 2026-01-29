/**
 * Assessment Results Page (Placeholder)
 * 
 * Displays pattern scores and summary after assessment completion.
 * Full implementation will be in separate Results Display task.
 */

'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAssessment } from '@/contexts/assessment-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { generateSummary } from '@/lib/pattern-calculator';

interface ResultsPageProps {
  params: Promise<{
    moduleId: string;
  }>;
}

export default function ResultsPage({ params }: ResultsPageProps) {
  const router = useRouter();
  const { results } = useAssessment();
  const [resolvedParams, setResolvedParams] = React.useState<{
    moduleId: string;
  } | null>(null);

  React.useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  if (!results || !resolvedParams) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4">
        <div className="text-text-primary text-xl">
          لا توجد نتائج متاحة
        </div>
        <Button onClick={() => router.push('/home')}>
          العودة إلى الصفحة الرئيسية
        </Button>
      </div>
    );
  }

  const summary = generateSummary(results.pattern_scores);

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-text-primary">
            نتائج التقييم
          </h1>
          <p className="text-text-secondary">
            {results.module_title}
          </p>
        </div>

        {/* Summary */}
        <Card className="p-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-text-primary">
              ملخص الأنماط
            </h2>
            <p className="text-base text-text-primary leading-relaxed">
              {summary}
            </p>
          </div>
        </Card>

        {/* Pattern Scores */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-text-primary">
            الأنماط المُلاحظة
          </h2>
          
          {results.pattern_scores.map((score) => (
            <Card key={score.disorder_id} className="p-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-text-primary">
                    {score.disorder_name}
                  </h3>
                  <div className="text-2xl font-bold text-primary">
                    {score.percentage}%
                  </div>
                </div>
                
                <div className="text-sm text-text-secondary">
                  {score.total_symptoms} من {score.max_symptoms} أعراض مُلاحظة
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${score.percentage}%` }}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Disclaimer */}
        <Card className="p-6 bg-amber-50 border-amber-200">
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-semibold text-text-primary">
              تنويه مهم
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              هذا التقييم ليس تشخيصاً طبياً. النتائج تعكس أنماط الاستجابة فقط. 
              للحصول على تقييم دقيق ومتابعة مناسبة، يُرجى استشارة متخصص في الصحة النفسية.
            </p>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            onClick={() => router.push('/home')}
            className="flex-1"
          >
            العودة إلى الصفحة الرئيسية
          </Button>
        </div>

        {/* Metadata */}
        <div className="text-xs text-text-tertiary text-center">
          تم إكمال التقييم في {new Date(results.completed_at).toLocaleDateString('ar-SA')}
          <br />
          إجمالي الأسئلة: {results.total_questions} | الإجابات المُسجلة: {results.total_responses}
        </div>
      </div>
    </main>
  );
}
