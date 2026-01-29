"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import safetyContent from "@/../content/safety/safety_disclaimers.json";

export default function PrivacyPage() {
  const router = useRouter();
  const sections = safetyContent.safety_content.pre_assessment_disclaimer.sections;

  const privacyHighlights = [
    "لا نجمع أي بيانات شخصية مثل الاسم أو البريد الإلكتروني أو رقم الهاتف.",
    "لا نخزن إجاباتك ولا نرسلها إلى أي خادم.",
    "لا نستخدم ملفات تعريف الارتباط لأغراض التتبع.",
    "لا نسجل عنوان IP أو بيانات الموقع الجغرافي.",
  ];

  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary">
            سياسة الخصوصية
          </h1>
          <p className="text-base md:text-lg text-text-secondary">
            خصوصيتك أولوية. التطبيق يعمل بطريقة مجهولة بالكامل ولا يجمع أي بيانات
            تعريفية.
          </p>
        </header>

        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-text-primary">مبدأ الخصوصية</h2>
          <p className="text-text-secondary leading-relaxed">
            هذا التطبيق مصمم وفق نهج الخصوصية أولاً. لا توجد حسابات، ولا نحتفظ بأي
            بيانات على الخادم. كل ما تقوم به يبقى على جهازك فقط.
          </p>
          <ul className="space-y-2 text-sm text-text-secondary">
            {privacyHighlights.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {sections.map((section, index) => (
            <Card key={index} className="p-6 space-y-3">
              <h3 className="text-lg font-semibold text-text-primary">
                {section.heading}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
                {section.body}
              </p>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="secondary" size="large" onClick={() => router.push("/home")}>
            العودة إلى الصفحة الرئيسية
          </Button>
        </div>
      </div>
    </main>
  );
}
