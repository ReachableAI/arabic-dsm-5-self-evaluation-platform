"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import type { EducationalResource, CrisisResource, ProfessionalResource, SelfHelpResource } from "@/lib/resources";

interface ResourceLinksProps {
  educationalResources: EducationalResource[];
  selfHelpResources: SelfHelpResource[];
  crisisResources: CrisisResource[];
  professionalResources: ProfessionalResource[];
}

interface ResourceLinkProps {
  resource: EducationalResource | SelfHelpResource;
}

interface CrisisCardProps {
  resource: CrisisResource;
}

const ResourceLink: React.FC<ResourceLinkProps> = ({ resource }) => (
  <a
    href={resource.url}
    target="_blank"
    rel="noopener noreferrer"
    className="block p-4 rounded-lg border border-neutral-200 hover:border-primary hover:bg-primary/5 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
  >
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1">
        <h4 className="font-semibold text-text-primary mb-1 text-sm">
          {resource.title}
        </h4>
        <p className="text-xs text-text-secondary mb-2 leading-relaxed">
          {resource.description}
        </p>
        <div className="flex flex-wrap gap-2 items-center text-xs">
          <span className="px-2 py-1 rounded bg-neutral-100 text-text-secondary">
            {resource.source}
          </span>
          {"readingTimeMinutes" in resource && (
            <span className="text-text-tertiary">
              {resource.readingTimeMinutes} دقائق
            </span>
          )}
        </div>
      </div>
    </div>
  </a>
);

const CrisisCard: React.FC<CrisisCardProps> = ({ resource }) => (
  <Card className="p-4 border-2 border-red-200 bg-red-50">
    <div className="flex flex-col gap-3">
      <div>
        <h4 className="font-semibold text-text-primary text-sm">
          {resource.organization}
        </h4>
        <p className="text-xs text-text-secondary mt-1">
          {resource.country}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <a
          href={`tel:${resource.phone.replace(/[^0-9+]/g, "")}`}
          className="inline-flex items-center gap-2 p-2 rounded bg-red-600 text-white hover:bg-red-700 transition-colors font-semibold text-sm"
        >
          <span>{resource.phone}</span>
        </a>
      </div>

      <div className="text-xs text-text-secondary pt-2 border-t border-red-200">
        <p className="font-medium mb-1">التوفر:</p>
        <p>{resource.availability}</p>
      </div>
    </div>
  </Card>
);

export const ResourceLinks: React.FC<ResourceLinksProps> = ({
  educationalResources,
  selfHelpResources,
  crisisResources,
  professionalResources,
}) => {
  return (
    <section className="flex flex-col gap-8">
      {/* Crisis Resources */}
      <div>
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          مساعدة فورية
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {crisisResources.map((resource) => (
            <CrisisCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>

      {/* Educational Resources */}
      {educationalResources.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-text-primary mb-4">
            مقالات تعليمية
          </h2>
          <div className="grid gap-3">
            {educationalResources.map((resource) => (
              <ResourceLink key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      )}

      {/* Self-Help Resources */}
      {selfHelpResources.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-text-primary mb-4">
            استراتيجيات مساعدة الذات
          </h2>
          <div className="grid gap-3">
            {selfHelpResources.map((resource) => (
              <ResourceLink key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export const ResourceLinksSkeleton: React.FC = () => (
  <section className="flex flex-col gap-8">
    <div>
      <div className="h-8 bg-neutral-200 rounded w-1/3 mb-4 animate-pulse" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="p-4 animate-pulse">
            <div className="space-y-3">
              <div className="h-4 bg-neutral-200 rounded w-2/3" />
              <div className="h-10 bg-neutral-200 rounded" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  </section>
);
