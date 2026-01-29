"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CategoryCard } from "@/components/assessment/category-card";
import content from "@/../content/ui/app_copy.json";

/**
 * Home screen - Category browser
 *
 * Features:
 * - 4 category cards (Anxiety, Depression active; ADHD, OCD greyed)
 * - Hero illustrations on each card
 * - Responsive grid: 1 col mobile, 2 col tablet, 4 col desktop
 * - Navigation to assessment start
 */
export default function HomePage() {
  const router = useRouter();
  const { title, subtitle, categories, footer_note } =
    content.category_browser;

  const handleCategoryClick = (categoryId: string, isAvailable: boolean) => {
    if (isAvailable) {
      router.push(`/assessment/${categoryId}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)]">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]">
              {title}
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)]">
              {subtitle}
            </p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Category grid - responsive: 1 col mobile, 2 col tablet, 4 col desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {categories.map((category) => {
              const isAvailable = !category.status;

              return (
                <div
                  key={category.id}
                  className={!isAvailable ? "opacity-60 cursor-not-allowed" : ""}
                >
                  <CategoryCard
                    title={category.title}
                    description={category.short_description}
                    heroImage={
                      <div
                        className="w-full aspect-video rounded-t-lg bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 flex items-center justify-center"
                        role="img"
                        aria-label={`رسم توضيحي لفئة ${category.title}`}
                      >
                        {/* Hero illustration placeholder */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-16 h-16 text-[var(--color-primary)]"
                        >
                          {category.id === "anxiety" && (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                            />
                          )}
                          {category.id === "depression" && (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"
                            />
                          )}
                          {category.id === "adhd" && (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                            />
                          )}
                          {category.id === "ocd" && (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                            />
                          )}
                        </svg>
                      </div>
                    }
                    duration={category.duration}
                    questionCount={
                      category.question_count
                        ? parseInt(category.question_count.match(/\d+/)?.[0] || "0")
                        : undefined
                    }
                    onClick={
                      isAvailable
                        ? () => handleCategoryClick(category.id, isAvailable)
                        : undefined
                    }
                    className={
                      !isAvailable ? "pointer-events-none" : "cursor-pointer hover:shadow-lg transition-shadow"
                    }
                  />
                  {!isAvailable && category.status_note && (
                    <div className="mt-2 text-center">
                      <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                        {category.status_note}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="mt-8 text-center">
            <p className="text-sm text-[var(--color-text-secondary)]">
              {footer_note}
            </p>
          </div>
        </div>
      </main>

      {/* Footer navigation */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-6 text-sm">
            <button
              onClick={() => router.push("/privacy")}
              className="text-[var(--color-primary)] hover:underline"
            >
              {content.general_ui.footer.privacy_policy}
            </button>
            <button
              onClick={() => router.push("/crisis")}
              className="text-[var(--color-danger)] hover:underline font-medium"
            >
              {content.general_ui.footer.crisis_resources}
            </button>
            <button
              onClick={() => router.push("/about")}
              className="text-[var(--color-primary)] hover:underline"
            >
              {content.general_ui.footer.about}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
