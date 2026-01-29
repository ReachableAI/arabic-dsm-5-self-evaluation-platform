import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface QuestionCardProps {
  /**
   * Question text (Arabic)
   */
  question: string;
  /**
   * Optional question number or category
   */
  questionNumber?: string;
  /**
   * Optional description or context
   */
  description?: string;
  /**
   * Response options (children can be RadioGroup, FrequencyScale, etc.)
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * QuestionCard - Container for assessment questions with response options
 *
 * Features:
 * - Semantic structure with question heading
 * - RTL-aware layout
 * - Flexible response slot for different question types
 * - Optional question numbering
 *
 * @example
 * ```tsx
 * <QuestionCard
 *   question="هل تشعر بالحزن معظم الوقت؟"
 *   questionNumber="1 من 9"
 *   description="اختر الإجابة الأنسب لحالتك"
 * >
 *   <FrequencyScale
 *     value={answer}
 *     onChange={setAnswer}
 *   />
 * </QuestionCard>
 * ```
 */
export const QuestionCard = React.forwardRef<
  HTMLDivElement,
  QuestionCardProps
>(
  (
    { question, questionNumber, description, children, className, ...props },
    ref
  ) => {
    return (
      <Card ref={ref} className={cn("w-full", className)} {...props}>
        <CardHeader>
          {questionNumber && (
            <div className="text-sm text-text-secondary mb-2 text-start">
              {questionNumber}
            </div>
          )}
          <CardTitle className="text-xl sm:text-2xl">{question}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    );
  }
);

QuestionCard.displayName = "QuestionCard";
