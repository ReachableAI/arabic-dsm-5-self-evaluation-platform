/**
 * Module Landing Page
 * 
 * Dynamic route for displaying all disorders in a module.
 * Route: /assessment/[moduleId]
 * 
 * Displays:
 * - Module hero illustration and introduction
 * - List of disorders in the module with educational content
 * - Navigation to individual disorder assessments
 * - Safety notices for sensitive modules
 * - RTL-optimized layout
 */

'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { loadModule, getHeroImage, getModuleMetadata } from '@/lib/module-registry';

interface ModulePageProps {
  params: Promise<{
    moduleId: string;
  }>;
}

export default function ModulePage({ params }: ModulePageProps) {
  const router = useRouter();
  const [resolvedParams, setResolvedParams] = React.useState<{ moduleId: string } | null>(null);

  // Resolve params Promise
  React.useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  if (!resolvedParams) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-text-secondary text-lg">جارٍ تحميل المحتوى...</div>
      </div>
    );
  }

  // Load module data from registry (synchronous)
  const moduleData = loadModule(resolvedParams.moduleId);
  const metadata = getModuleMetadata(resolvedParams.moduleId);

  if (!moduleData || !metadata) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4">
        <div className="text-text-primary text-xl">لم يتم العثور على هذا القسم</div>
        <Button onClick={() => router.push('/home')} variant="primary">
          العودة إلى الصفحة الرئيسية
        </Button>
      </div>
    );
  }

  const { module: moduleInfo, disorders } = moduleData;
  const heroImage = getHeroImage(resolvedParams.moduleId);

  // Determine if this module needs safety warnings (e.g., depression)
  const showSafetyWarning = resolvedParams.moduleId === 'depression';

  return (
    <div className="min-h-screen bg-background">
      {/* Hero section with module introduction */}
      <section 
        className={`relative bg-gradient-to-br border-b ${
          metadata.color === 'amber' 
            ? 'from-amber-50 to-orange-50 border-amber-100' 
            : 'from-blue-50 to-indigo-50 border-blue-100'
        }`}
      >
        {/* Hero illustration */}
        {heroImage && (
          <div className="absolute inset-0 opacity-20">
            <div className="relative w-full h-full">
              <Image
                src={heroImage}
                alt={`${moduleInfo.title} - صورة رئيسية`}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

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

      {/* Safety notice for depression module */}
      {showSafetyWarning && (
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Alert variant="default" className="border-amber-300 bg-amber-50">
            <AlertCircle className="h-5 w-5 text-amber-600" aria-hidden="true" />
            <AlertDescription className="text-base leading-relaxed">
              <strong>تذكير هام:</strong> هذا التقييم للتأمل الذاتي فقط وليس تشخيصاً طبياً. 
              إذا راودتك أفكار بإيذاء نفسك، يرجى التواصل مع متخصص أو الاتصال بخط مساعدة فوري.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Disorder cards */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="space-y-8">
          {disorders.map((disorder) => {
            const disorderHeroImage = getHeroImage(resolvedParams.moduleId, disorder.id);

            return (
              <Card 
                key={disorder.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="md:flex md:items-stretch">
                  {/* Disorder hero image */}
                  {disorderHeroImage && (
                    <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                      <Image
                        src={disorderHeroImage}
                        alt={disorder.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Disorder content */}
                  <div className="flex-1">
                    <CardHeader>
                      <CardTitle className="text-2xl">{disorder.name}</CardTitle>
                      <CardDescription className="text-base text-text-secondary">
                        {disorder.name_en}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Educational intro */}
                      {disorder.educational_intro && (
                        <div className="space-y-3">
                          <h3 className="font-semibold text-lg">
                            {disorder.educational_intro.title}
                          </h3>
                          <p className="text-text-secondary leading-relaxed">
                            {disorder.educational_intro.body}
                          </p>

                          {/* Key points */}
                          {disorder.educational_intro.key_points && 
                           disorder.educational_intro.key_points.length > 0 && (
                            <div className="bg-surface-secondary rounded-lg p-4 space-y-2">
                              <h4 className="font-medium text-sm">النقاط الرئيسية:</h4>
                              <ul className="space-y-1 text-sm text-text-secondary">
                                {disorder.educational_intro.key_points.map((point, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Safety note if present */}
                          {disorder.educational_intro.safety_note && (
                            <Alert variant="default" className="border-amber-300 bg-amber-50">
                              <AlertCircle className="h-4 w-4 text-amber-600" aria-hidden="true" />
                              <AlertDescription className="text-sm">
                                {disorder.educational_intro.safety_note}
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>
                      )}

                      {/* Start assessment button */}
                      <div className="pt-4">
                        <Button
                          onClick={() => router.push(`/assessment/${resolvedParams.moduleId}/${disorder.id}`)}
                          className="w-full md:w-auto"
                          size="large"
                        >
                          <span>ابدأ التقييم</span>
                          <ArrowRight className="mr-2 h-5 w-5" aria-hidden="true" />
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Back to home button */}
        <div className="mt-12 text-center">
          <Button
            onClick={() => router.push('/home')}
            variant="secondary"
            size="large"
          >
            العودة إلى الصفحة الرئيسية
          </Button>
        </div>
      </main>
    </div>
  );
}
