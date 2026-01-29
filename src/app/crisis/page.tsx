"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import safetyContent from "@/../content/safety/safety_disclaimers.json";

export default function CrisisResourcesPage() {
  const router = useRouter();
  const helplines = safetyContent.safety_content.regional_helplines;
  const additional = helplines.additional_resources.items;

  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary">
            {helplines.title}
          </h1>
          <p className="text-base md:text-lg text-text-secondary">
            {helplines.subtitle}
          </p>
        </header>

        <Alert variant="destructive">
          <AlertDescription className="text-sm leading-relaxed">
            إذا كنت في خطر فوري، يرجى التوجه إلى أقرب قسم طوارئ أو الاتصال بخدمات
            الطوارئ في بلدك فوراً.
          </AlertDescription>
        </Alert>

        <div className="grid gap-4">
          {helplines.regions.map((region) => (
            <Card key={region.country} className="p-6 space-y-4">
              <h2 className="text-xl font-semibold text-text-primary">
                {region.country}
              </h2>
              <div className="space-y-3">
                {region.services.map((service) => (
                  <div key={service.name} className="rounded-lg border border-neutral-200 p-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-text-primary">
                        {service.name}
                      </span>
                      <span className="text-sm text-text-secondary">{service.type}</span>
                      {"phone" in service && service.phone && (
                        <span className="text-sm text-text-primary">
                          هاتف: {service.phone}
                        </span>
                      )}
                      {"available" in service && service.available && (
                        <span className="text-sm text-text-secondary">
                          متاح: {service.available}
                        </span>
                      )}
                      {"languages" in service && service.languages && (
                        <span className="text-sm text-text-secondary">
                          اللغات: {service.languages}
                        </span>
                      )}
                      {"website" in service && service.website && (
                        <a
                          href={service.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          زيارة الموقع
                        </a>
                      )}
                      {"note" in service && service.note && (
                        <p className="text-sm text-text-secondary">{service.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-text-primary">
            {helplines.additional_resources.title}
          </h2>
          <div className="space-y-3">
            {additional.map((resource) => (
              <div key={resource.name} className="text-sm text-text-secondary">
                <span className="font-semibold text-text-primary">
                  {resource.name}
                </span>
                {resource.description && <p>{resource.description}</p>}
                {resource.website && (
                  <a
                    href={resource.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline"
                  >
                    زيارة الموقع
                  </a>
                )}
                {resource.note && <p>{resource.note}</p>}
              </div>
            ))}
          </div>
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
