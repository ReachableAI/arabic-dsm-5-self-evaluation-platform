"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import appCopy from "@/../content/ui/app_copy.json";

export default function AboutPage() {
  const router = useRouter();
  const { meta } = appCopy;

  const highlights = [
    "أداة للتأمل الذاتي والتوعية — ليست تشخيصاً طبياً.",
    "مبنية على منهجيات علمية مستوحاة من معايير DSM-5-TR.",
    "مصممة بالعربية وباتجاه RTL مع تجربة سهلة وواضحة.",
    "خصوصية كاملة بدون حسابات أو تتبع.",
  ];

  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary">
            عن التطبيق
          </h1>
          <p className="text-base md:text-lg text-text-secondary">
            {meta.app_title} — {meta.app_tagline}
          </p>
        </header>

        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-text-primary">هدف المنصة</h2>
          <p className="text-text-secondary leading-relaxed">
            هذه المنصة تساعدك على فهم مشاعرك وأنماط تفكيرك بطريقة منظمة
            ولطيفة. الهدف هو تعزيز الوعي الذاتي وتقديم موارد دعم موثوقة،
            مع احترام كامل للخصوصية.
          </p>
        </Card>

        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-text-primary">مبادئ أساسية</h2>
          <ul className="space-y-2 text-sm text-text-secondary">
            {highlights.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-text-primary">تنويه مهم</h2>
          <p className="text-text-secondary leading-relaxed">
            إذا كنت تمر بضائقة نفسية شديدة أو تحتاج إلى مساعدة فورية،
            يرجى التواصل مع مختص أو استخدام موارد الأزمات المتاحة.
          </p>
          <Button variant="secondary" onClick={() => router.push("/crisis")}>
            عرض موارد الأزمات
          </Button>
        </Card>

        <div className="flex justify-center">
          <Button variant="secondary" size="large" onClick={() => router.push("/home")}>
            العودة إلى الصفحة الرئيسية
          </Button>
        </div>
      </div>
    </main>
  );
}
