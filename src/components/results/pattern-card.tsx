"use client";

import React from "react";
import { PatternScore } from "@/types/assessment";
import { Card } from "@/components/ui/card";

export type PatternLevel = "low" | "moderate" | "elevated";

interface PatternCardProps {
  pattern: PatternScore;
  level: PatternLevel;
  description: string;
  feedbackText?: string;
}

const PATTERN_LABELS: Record<PatternLevel, { ar: string; en: string }> = {
  low: { ar: "نمط منخفض", en: "Low Pattern" },
  moderate: { ar: "نمط متوسط", en: "Moderate Pattern" },
  elevated: { ar: "نمط مرتفع", en: "Elevated Pattern" },
};

const PATTERN_COLORS: Record<PatternLevel, string> = {
  low: "border-blue-200 bg-blue-50",
  moderate: "border-amber-200 bg-amber-50",
  elevated: "border-orange-200 bg-orange-50",
};

const INDICATOR_COLORS: Record<PatternLevel, string> = {
  low: "bg-blue-400",
  moderate: "bg-amber-400",
  elevated: "bg-orange-400",
};

export function calculatePatternLevel(percentage: number): PatternLevel {
  if (percentage < 30) return "low";
  if (percentage < 60) return "moderate";
  return "elevated";
}

export const PatternCard: React.FC<PatternCardProps> = ({
  pattern,
  level,
  description,
  feedbackText,
}) => {
  const percentageBars = Math.round(pattern.percentage / 20);

  return (
    <Card
      className={`p-6 border-2 transition-all ${PATTERN_COLORS[level]} focus-within:ring-2 focus-within:ring-primary`}
      role="region"
      aria-label={`${pattern.disorder_name} - ${PATTERN_LABELS[level].ar}`}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text-primary mb-1">
            {pattern.disorder_name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-text-secondary">
              {PATTERN_LABELS[level].ar}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-1 mb-4" role="progressbar" aria-valuenow={pattern.percentage} aria-valuemin={0} aria-valuemax={100}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={`flex-1 h-3 rounded-full transition-all ${
              index < percentageBars ? INDICATOR_COLORS[level] : "bg-neutral-200"
            }`}
          />
        ))}
      </div>

      <div className="mb-4 text-sm text-text-secondary">
        <p>
          من إجاباتك: <span className="font-medium">{pattern.total_symptoms}</span> من{" "}
          <span className="font-medium">{pattern.max_symptoms}</span> معايير ملاحظة
        </p>
      </div>

      <div className="mb-4 p-3 bg-white/50 rounded border border-current/10">
        <p className="text-sm text-text-primary leading-relaxed">{description}</p>
      </div>

      {feedbackText && (
        <div className="pt-3 border-t border-current/10">
          <p className="text-sm text-text-secondary italic leading-relaxed">
            {feedbackText}
          </p>
        </div>
      )}

      <div className="mt-4 p-3 bg-primary/5 rounded border border-primary/20">
        <p className="text-xs font-medium text-primary mb-1">الخطوة التالية:</p>
        <p className="text-xs text-text-secondary leading-relaxed">
          إذا كانت هذه الأنماط تؤثر على حياتك، نوصي بشدة بالتحدث إلى متخصص.
        </p>
      </div>
    </Card>
  );
};

export const PatternCardSkeleton: React.FC = () => (
  <Card className="p-6 border-2 border-neutral-200 animate-pulse">
    <div className="space-y-4">
      <div className="h-6 bg-neutral-200 rounded w-3/4" />
      <div className="h-4 bg-neutral-200 rounded w-1/2" />
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex-1 h-3 bg-neutral-200 rounded-full" />
        ))}
      </div>
      <div className="h-12 bg-neutral-200 rounded" />
    </div>
  </Card>
);
