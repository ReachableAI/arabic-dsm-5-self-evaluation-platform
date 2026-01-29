/**
 * Depression Disorders Selection Page
 * 
 * Displays depression disorders (MDD, Persistent Depressive Disorder) with:
 * - Hero illustrations for visual engagement (sunrise/hope theme)
 * - Educational introductions before selection
 * - Safety notes prominently displayed
 * - Navigation to individual disorder assessments
 * - RTL-optimized layout
 * 
 * Critical safety features:
 * - A9 (suicidal ideation) crisis intervention system
 * - Pre-assessment safety disclaimers
 * - Helpline numbers easily accessible
 */

'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import depressionModule from '@/../content/depression/depression_module.json';
import type { AssessmentModule } from '@/types/assessment';

const assessmentModule = depressionModule as AssessmentModule;

export default function DepressionModulePage() {
  const router = useRouter();
  const { module: moduleInfo, disorders } = assessmentModule;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero section with module introduction */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-blue-100">
        {/* Hero illustration - sunrise theme representing hope */}
        <div className="absolute inset-0 opacity-20">
          <div className="relative w-full h-full">
            <Image
              src="/images/heroes/hero_depression_sunrise_1x.webp"
              alt="مشهد شروق الشمس كرمز للأمل"
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
              {moduleInfo.title}
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto">
              {moduleInfo.description}
            </p>
          </div>
        </div>
      </section>

      {/* Safety notice */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Alert variant="default" className="border-amber-300 bg-amber-50">
          <AlertCircle className="h-5 w-5 text-amber-600" aria-hidden="true" />
          <AlertDescription className="text-base leading-relaxed">
            <strong>تذكير هام:</strong> هذا التقييم للتأمل الذاتي فقط وليس تشخيصاً طبياً. 
            إذا راودتك أفكار بإيذاء نفسك، يرجى التواصل مع متخصص أو الاتصال بخط مساعدة فوري.
          </AlertDescription>
        </Alert>
      </div>

      {/* Disorder cards */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="space-y-8">
          {disorders.map((disorder, index) => {
            // Select hero image for each disorder
            const heroImage = 
              disorder.id === 'mdd' 
                ? '/images/heroes/hero_depression_sunrise'
                : '/images/heroes/hero_depression_shelter-and-growth';

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

                        {/* Safety note (for MDD with A9 question) */}
                        {disorder.educational_intro.safety_note && (
                          <Alert variant="destructive" className="mt-4">
                            <AlertCircle className="h-4 w-4" aria-hidden="true" />
                            <AlertDescription className="text-sm">
                              {disorder.educational_intro.safety_note}
                            </AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </div>

                    {/* Action button */}
                    <div className="mt-6">
                      <Button
                        onClick={() => router.push(`/assessment/depression/${disorder.id}`)}
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
