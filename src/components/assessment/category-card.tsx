import * as React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface CategoryCardProps {
  /**
   * Category title (Arabic)
   */
  title: string;
  /**
   * Brief description of the category
   */
  description: string;
  /**
   * Optional hero image or illustration
   */
  heroImage?: React.ReactNode;
  /**
   * Category icon
   */
  icon?: React.ReactNode;
  /**
   * Estimated duration (e.g., "5-10 دقائق")
   */
  duration?: string;
  /**
   * Number of questions
   */
  questionCount?: number;
  /**
   * Optional safety badge for sensitive content
   */
  safetyBadge?: React.ReactNode;
  /**
   * Click handler
   */
  onClick?: () => void;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * CategoryCard - Browse card for assessment categories with hero image
 *
 * Features:
 * - Optional hero image or illustration slot
 * - Category metadata (duration, question count)
 * - RTL-aware layout
 * - Large touch target for card action
 * - Accessible with keyboard navigation
 *
 * @example
 * ```tsx
 * <CategoryCard
 *   title="الاكتئاب"
 *   description="تقييم أعراض الاكتئاب بناءً على معايير DSM-5-TR"
 *   heroImage={<img src="/depression-hero.webp" alt="" />}
 *   icon={<CloudIcon />}
 *   duration="5-7 دقائق"
 *   questionCount={9}
 *   onClick={() => router.push('/assessment/depression')}
 * />
 * ```
 */
export const CategoryCard = React.forwardRef<HTMLDivElement, CategoryCardProps>(
  (
    {
      title,
      description,
      heroImage,
      icon,
      duration,
      questionCount,
      safetyBadge,
      onClick,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "overflow-hidden transition-all hover:shadow-lg cursor-pointer",
          className
        )}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick?.();
          }
        }}
        {...props}
      >
        {/* Hero Image */}
        {heroImage && (
          <div className="relative w-full h-48 overflow-hidden bg-neutral-100">
            {heroImage}
          </div>
        )}

        {/* Content */}
        <CardHeader>
          <div className="flex items-start gap-3">
            {icon && (
              <div
                className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary"
                aria-hidden="true"
              >
                {icon}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <CardTitle className="text-xl mb-1">{title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {description}
              </CardDescription>
              {safetyBadge && (
                <div className="mt-2">
                  {safetyBadge}
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        {/* Metadata Footer */}
        {(duration || questionCount) && (
          <CardFooter className="flex items-center gap-4 text-sm text-text-secondary border-t border-neutral-300 pt-4">
            {questionCount && (
              <div className="flex items-center gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{questionCount} سؤال</span>
              </div>
            )}
            {duration && (
              <div className="flex items-center gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M7.5 1C3.91015 1 1 3.91015 1 7.5C1 11.0899 3.91015 14 7.5 14C11.0899 14 14 11.0899 14 7.5C14 3.91015 11.0899 1 7.5 1ZM7.5 2C10.5376 2 13 4.46243 13 7.5C13 10.5376 10.5376 13 7.5 13C4.46243 13 2 10.5376 2 7.5C2 4.46243 4.46243 2 7.5 2ZM7 4.5C7 4.22386 7.22386 4 7.5 4C7.77614 4 8 4.22386 8 4.5V7.5C8 7.63261 7.94732 7.75979 7.85355 7.85355L6.35355 9.35355C6.15829 9.54882 5.84171 9.54882 5.64645 9.35355C5.45118 9.15829 5.45118 8.84171 5.64645 8.64645L7 7.29289V4.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{duration}</span>
              </div>
            )}
          </CardFooter>
        )}
      </Card>
    );
  }
);

CategoryCard.displayName = "CategoryCard";
