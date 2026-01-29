"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ResultsNavigationProps {
  moduleId: string;
}

export const ResultsNavigation: React.FC<ResultsNavigationProps> = ({ moduleId }) => {
  const router = useRouter();

  const handleTryAnother = () => {
    router.push("/home");
  };

  const handleReturnHome = () => {
    router.push("/home");
  };

  return (
    <section className="flex flex-col gap-6">
      <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 text-center">
        <div className="mb-4 flex justify-center">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 flex items-center justify-center text-primary text-5xl">
              ✨
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-text-primary mb-2">
          شكراً على صراحتك
        </h2>
        <p className="text-text-secondary leading-relaxed max-w-md mx-auto">
          لقد أكملت هذا التقييم الذاتي بنجاح. الخطوة التالية هي التفكير في ما قرأته
          والنظر في طلب الدعم المهني.
        </p>
      </Card>

      {/* Navigation Actions */}
      <div className="grid gap-3 md:grid-cols-2">
        <Button
          onClick={handleTryAnother}
          variant="secondary"
          size="large"
          className="w-full justify-center h-auto py-4 text-base"
        >
          جرب فئة أخرى
        </Button>

        <Button
          onClick={handleReturnHome}
          size="large"
          className="w-full justify-center h-auto py-4 text-base"
        >
          العودة إلى الصفحة الرئيسية
        </Button>
      </div>

      {/* Additional Context */}
      <Card className="p-4 bg-neutral-50 border-neutral-200">
        <h3 className="font-semibold text-text-primary text-sm mb-3">
          ماذا يحدث الآن؟
        </h3>
        <ol className="space-y-2 text-sm text-text-secondary list-decimal list-inside leading-relaxed">
          <li>راجع النتائج أعلاه</li>
          <li>استكشف الموارد التعليمية</li>
          <li>فكر في طلب مساعدة مهنية</li>
          <li>اعتن بنفسك</li>
        </ol>
      </Card>
    </section>
  );
};

export const ResultsNavigationSkeleton: React.FC = () => (
  <section className="flex flex-col gap-6">
    <Card className="p-8 bg-neutral-100 border-neutral-200 animate-pulse">
      <div className="space-y-4 text-center">
        <div className="w-24 h-24 bg-neutral-300 rounded-full mx-auto" />
        <div className="h-8 bg-neutral-300 rounded w-1/2 mx-auto" />
        <div className="h-6 bg-neutral-300 rounded w-3/4 mx-auto" />
      </div>
    </Card>
    <div className="grid gap-3 md:grid-cols-2">
      <div className="h-16 bg-neutral-200 rounded animate-pulse" />
      <div className="h-16 bg-neutral-200 rounded animate-pulse" />
    </div>
  </section>
);
