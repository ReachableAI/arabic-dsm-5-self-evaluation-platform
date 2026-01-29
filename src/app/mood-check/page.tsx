"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MoodSelector, type MoodOption } from "@/components/assessment/mood-selector";
import { useMood, type MoodLevel } from "@/contexts/mood-context";

/**
 * Mood check-in screen (optional)
 *
 * Features:
 * - 5-state visual mood picker
 * - Optional (skip button)
 * - Stores in React Context (session-only)
 * - Mood illustrations from visual assets
 */
export default function MoodCheckScreen() {
  const router = useRouter();
  const { mood, setMood } = useMood();
  const [selectedMood, setSelectedMood] = React.useState<MoodLevel | null>(
    mood
  );

  const handleContinue = () => {
    if (selectedMood) {
      setMood(selectedMood);
    }
    router.push("/home");
  };

  const handleSkip = () => {
    router.push("/home");
  };

  const moodOptions: MoodOption[] = [
    {
      value: "very-low",
      label: "منخفض جداً",
      description: "أشعر بضيق شديد",
      illustration: (
        <div className="w-full h-full rounded-lg bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"
            />
          </svg>
        </div>
      ),
    },
    {
      value: "low",
      label: "منخفض",
      description: "أشعر ببعض الضيق",
      illustration: (
        <div className="w-full h-full rounded-lg bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"
            />
          </svg>
        </div>
      ),
    },
    {
      value: "moderate",
      label: "متوسط",
      description: "أشعر بحالة عادية",
      illustration: (
        <div className="w-full h-full rounded-lg bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"
            />
          </svg>
        </div>
      ),
    },
    {
      value: "good",
      label: "جيد",
      description: "أشعر بحالة إيجابية",
      illustration: (
        <div className="w-full h-full rounded-lg bg-gradient-to-br from-amber-300 to-amber-400 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
        </div>
      ),
    },
    {
      value: "great",
      label: "ممتاز",
      description: "أشعر بحالة رائعة",
      illustration: (
        <div className="w-full h-full rounded-lg bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)]">
      <main className="flex-1 px-4 py-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Title */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]">
              كيف تشعر اليوم؟
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)]">
              اختياري — لا يؤثر على نتائج التقييم
            </p>
          </div>

          {/* Mood selector */}
          <div className="py-4">
            <MoodSelector
              options={moodOptions}
              value={selectedMood || undefined}
              onChange={(value) => setSelectedMood(value as MoodLevel)}
              aria-label="اختر حالتك المزاجية"
            />
          </div>

          {/* Helper text */}
          <div className="text-center">
            <p className="text-sm text-[var(--color-text-secondary)]">
              هذا الاختيار مؤقت ولن يُحفظ. يساعدنا فقط على فهم سياق تقييمك.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button variant="ghost" onClick={handleSkip}>
              تخطي
            </Button>
            <Button
              onClick={handleContinue}
              disabled={!selectedMood}
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)]"
            >
              متابعة
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
