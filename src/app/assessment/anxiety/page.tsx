/**
 * Anxiety Disorders Selection Page
 * 
 * Displays all anxiety disorders (GAD, Panic, Social Anxiety) with:
 * - Hero illustrations for visual engagement
 * - Educational introductions before selection
 * - Navigation to individual disorder assessments
 * - RTL-optimized layout
 */

'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import anxietyModule from '@/../content/anxiety/anxiety_module.json';

export default function AnxietyModulePage() {
  const router = useRouter();
  const { module, disorders } = anxietyModule;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero section with module introduction */}
      <section className="relative bg-gradient-to-br from-amber-50 to-orange-50 border-b border-amber-100">
        {/* Hero illustration */}
        <div className="absolute inset-0 opacity-20">
          <div className="relative w-full h-full">
            <Image
              src="/images/heroes/hero_anxiety_calm-garden_1x.webp"
              alt="مشهد حديقة هادئة"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative max-w-4xl mx-auto px-4 py-12 md:py-16">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
              {module.title}
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto">
              {module.description}
            </p>
          </div>
        </div>
      </section>

      {/* Disorder cards */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="space-y-8">
          {disorders.map((disorder, index) => {
            // Select hero image for each disorder
            const heroImage = 
              disorder.id === 'gad' 
                ? '/images/heroes/hero_anxiety_calm-garden'
                : disorder.id === 'panic'
                ? '/images/heroes/hero_anxiety_serene-water'
                : '/images/heroes/hero_anxiety_calm-garden';

            return (
              <Card 
                key={disorder.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Hero illustration */}
                  <div className="relative aspect-video md:aspect-square">
                    <Image
                      src={`${heroImage}_2x.webp`}
                      alt={`رسم توضيحي لاضطراب ${disorder.name}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index === 0}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      <CardHeader className="p-0">
                        <CardTitle className="text-2xl md:text-3xl">
                          {disorder.name}
                        </CardTitle>
                        <CardDescription className="text-base text-text-secondary">
                          {disorder.name_en}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="p-0 space-y-4">
                        {/* Educational introduction */}
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold text-text-primary">
                            {disorder.educational_intro.title}
                          </h3>
                          <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                            {disorder.educational_intro.body}
                          </p>
                        </div>

                        {/* Key points */}
                        <div className="space-y-2">
                          <h4 className="font-medium text-text-primary">
                            النقاط الرئيسية:
                          </h4>
                          <ul className="space-y-2">
                            {disorder.educational_intro.key_points.map((point, idx) => (
                              <li 
                                key={idx}
                                className="flex items-start gap-2 text-sm text-text-secondary"
                              >
                                <span className="text-primary mt-1">•</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </div>

                    {/* Action button */}
                    <div className="mt-6">
                      <Button
                        onClick={() => router.push(`/assessment/anxiety/${disorder.id}`)}
                        className="w-full"
                        size="large"
                      >
                        ابدأ التقييم
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Navigation footer */}
        <div className="mt-12 flex justify-center gap-4">
          <Button
            variant="secondary"
            onClick={() => router.push('/home')}
            size="large"
          >
            العودة إلى الصفحة الرئيسية
          </Button>
        </div>
      </main>
    </div>
  );
}
