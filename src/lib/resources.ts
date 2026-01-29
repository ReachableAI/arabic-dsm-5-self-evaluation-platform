/**
 * Mental Health Resources Database
 */

export type DisorderId = 'anxiety-gad' | 'anxiety-panic' | 'anxiety-social' | 'depression-mdd' | 'depression-pdd';
export type ResourceType = 'educational' | 'crisis' | 'professional-referral' | 'self-help';

export interface EducationalResource {
  id: string;
  type: 'educational';
  title: string;
  description: string;
  url: string;
  source: string;
  language: 'ar' | 'en';
  readingTimeMinutes: number;
  tags: string[];
}

export interface CrisisResource {
  id: string;
  type: 'crisis';
  country: string;
  organization: string;
  service: string;
  phone: string;
  website?: string;
  email?: string;
  availability: string;
  languages: string[];
  notes?: string;
}

export interface ProfessionalResource {
  id: string;
  type: 'professional-referral';
  title: string;
  description: string;
  url: string;
  organization: string;
  language: 'ar' | 'en';
  tags: string[];
}

export interface SelfHelpResource {
  id: string;
  type: 'self-help';
  title: string;
  description: string;
  url: string;
  source: string;
  language: 'ar' | 'en';
  readingTimeMinutes?: number;
  tags: string[];
}

export type Resource = EducationalResource | CrisisResource | ProfessionalResource | SelfHelpResource;

export const CRISIS_RESOURCES: CrisisResource[] = [
  {
    id: 'crisis-uae-befrienders',
    type: 'crisis',
    country: 'الإمارات العربية المتحدة',
    organization: 'Befrienders UAE',
    service: 'خط دعم عاطفي',
    phone: '04-6575555',
    availability: 'على مدار الساعة',
    languages: ['العربية', 'الإنجليزية'],
  },
  {
    id: 'crisis-saudi-national',
    type: 'crisis',
    country: 'المملكة العربية السعودية',
    organization: 'الخط الوطني للصحة النفسية',
    service: 'دعم نفسي وإرشاد',
    phone: '920033360',
    availability: 'على مدار الساعة',
    languages: ['العربية'],
  },
];

export const EDUCATIONAL_RESOURCES: EducationalResource[] = [
  {
    id: 'edu-anxiety-who',
    type: 'educational',
    title: 'منظمة الصحة العالمية - اضطرابات القلق',
    description: 'معلومات علمية موثوقة حول أنواع اضطرابات القلق',
    url: 'https://www.who.int/ar/news-room/fact-sheets/detail/anxiety-disorders',
    source: 'منظمة الصحة العالمية',
    language: 'ar',
    readingTimeMinutes: 8,
    tags: ['anxiety', 'general', 'education'],
  },
];

export const PROFESSIONAL_RESOURCES: ProfessionalResource[] = [];

export const SELF_HELP_RESOURCES: SelfHelpResource[] = [];

export const DISORDER_RESOURCE_MAP: Record<DisorderId, {
  educationalIds: string[];
  selfHelpIds: string[];
}> = {
  'anxiety-gad': {
    educationalIds: ['edu-anxiety-who'],
    selfHelpIds: [],
  },
  'anxiety-panic': {
    educationalIds: ['edu-anxiety-who'],
    selfHelpIds: [],
  },
  'anxiety-social': {
    educationalIds: ['edu-anxiety-who'],
    selfHelpIds: [],
  },
  'depression-mdd': {
    educationalIds: ['edu-anxiety-who'],
    selfHelpIds: [],
  },
  'depression-pdd': {
    educationalIds: ['edu-anxiety-who'],
    selfHelpIds: [],
  },
};

export function getResourcesForDisorder(disorderId: DisorderId) {
  const mapping = DISORDER_RESOURCE_MAP[disorderId] || {
    educationalIds: [],
    selfHelpIds: [],
  };

  const educationalResources = mapping.educationalIds
    .map((id) => EDUCATIONAL_RESOURCES.find((r) => r.id === id))
    .filter(Boolean) as EducationalResource[];

  const selfHelpResources = mapping.selfHelpIds
    .map((id) => SELF_HELP_RESOURCES.find((r) => r.id === id))
    .filter(Boolean) as SelfHelpResource[];

  return {
    educational: educationalResources,
    selfHelp: selfHelpResources,
    crisis: CRISIS_RESOURCES,
    professional: PROFESSIONAL_RESOURCES,
  };
}

export function getCrisisResourcesByCountry(country: string) {
  return CRISIS_RESOURCES.filter((r) => r.country === country);
}
