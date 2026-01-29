"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAssessment } from "@/contexts/assessment-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  PatternCard,
  PatternCardSkeleton,
  calculatePatternLevel,
  ResourceLinks,
  ResourceLinksSkeleton,
  ResultsNavigation,
  ResultsNavigationSkeleton,
} from "@/components/results";
import { generateSummary } from "@/lib/pattern-calculator";
import { getResourcesForDisorder, CRISIS_RESOURCES } from "@/lib/resources";
import app_copy from "@/content/ui/app_copy.json";

interface ResultsPageProps {
  params: Promise<{
    moduleId: string;
  }>;
}

export default function ResultsPage({ params }: ResultsPageProps) {
  const router = useRouter();
  const { results } = useAssessment();
  const [resolvedParams, setResolvedParams] = React.useState<{ moduleId: string } | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    params.then((p) => {
      setResolvedParams(p);
      setIsLoading(false);
    });
  }, [params]);

  if (!isLoading && (!results || !resolvedParams)) {
    return (
      <main className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-3xl mx-auto flex flex-col items-center justify-center gap-6 py-16">
          <div className="text-6xl">📋</div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              لا توجد نتائج متاحة
            </h1>
            <p className="text-text-secondary mb-6 leading-relaxed">
              يبدو أنك لم تكمل تقييماً بعد. ابدأ تقييماً جديداً من الصفحة الرئيسية.
            </p>
          </div>
          <Button onClick={() => router.push("/home")} size="large">
            العودة إلى الصفحة الرئيسية
          </Button>
        </div>
      </main>
    );
  }

  if (isLoading || !results || !resolvedParams) {
    return (
      <main className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <div className="h-10 bg-neutral-200 rounded w-1/3 animate-pulse" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <PatternCardSkeleton key={i} />
            ))}
          </div>
          <ResourceLinksSkeleton />
          <ResultsNavigationSkeleton />
        </div>
      </main>
    );
  }

  const summary = generateSummary(results.pattern_scores);
  const copy = app_copy.results_templates;
  const patternCopy = copy.pattern_based_language;
  const specificFeedback = copy.specific_feedback as Record<string, string>;

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <header className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-text-primary">
            📊 نتائج التقييم
          </h1>
          <p className="text-lg text-text-secondary">
            {results.module_title}
          </p>
        </header>

        {/* CRITICAL: Prominent Disclaimer Banner */}
        <Alert className="border-2 border-red-300 bg-red-50">
          <AlertDescription className="text-sm text-text-primary leading-relaxed">
            <p className="font-bold mb-2">⚠️ هذه النتائج ليست تشخيصاً طبياً</p>
            <p>
              ما تراه أدناه هو ملخص لإجاباتك وأنماط محتملة. <span className="font-semibold">فقط متخصص مؤهل في الصحة النفسية</span> يمكنه تشخيص اضطراب نفسي.
            </p>
          </AlertDescription>
        </Alert>

        {/* Summary */}
        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-text-primary">
              {copy.summary_heading}
            </h2>
            <p className="text-base text-text-primary leading-relaxed">
              {summary}
            </p>
          </div>
        </Card>

        {/* Pattern Cards */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            🔍 الأنماط المُلاحظة
          </h2>
          <div className="flex flex-col gap-4">
            {results.pattern_scores.map((score) => {
              const level = calculatePatternLevel(score.percentage);
              const levelData = patternCopy[level as keyof typeof patternCopy];
              const feedbackKey = score.disorder_id.toLowerCase().replace(/[^a-z_]/g, "_") as keyof typeof specificFeedback;
              const feedback = specificFeedback[feedbackKey];

              return (
                <PatternCard
                  key={score.disorder_id}
                  pattern={score}
                  level={level}
                  description={levelData.description.replace("{disorder_name}", score.disorder_name)}
                  feedbackText={feedback}
                />
              );
            })}
          </div>
        </section>

        {/* Resources Section */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            📚 الموارد والدعم
          </h2>
          <ResourceLinks
            educationalResources={[]}
            selfHelpResources={[]}
            crisisResources={CRISIS_RESOURCES}
            professionalResources={[]}
          />
        </section>

        {/* Navigation & Next Steps */}
        <ResultsNavigation moduleId={resolvedParams.moduleId} />

        {/* Metadata Footer */}
        <footer className="text-xs text-text-tertiary text-center pt-6 border-t border-neutral-200">
          <p>
            تم إكمال التقييم في{" "}
            {new Date(results.completed_at).toLocaleDateString("ar-SA", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="mt-1">
            إجمالي الأسئلة: {results.total_questions} | الإجابات المُسجلة: {results.total_responses}
          </p>
        </footer>
      </div>
    </main>
  );
}
