/**
 * Module Registry
 * 
 * Central registry for all assessment modules, providing:
 * - Single source of truth for module metadata
 * - Content file path mapping
 * - Hero image asset keys
 * - Type-safe module loading
 * 
 * All routes should load modules via this registry to avoid duplication.
 */

import type { AssessmentModule } from '@/types/assessment';

// Static imports from /content
import anxietyModuleData from '@/../content/anxiety/anxiety_module.json';
import depressionModuleData from '@/../content/depression/depression_module.json';

/**
 * Module metadata with content paths and asset keys
 */
export interface ModuleRegistryEntry {
  id: string;
  title: string;
  title_en: string;
  description: string;
  icon: string;
  color: string;
  heroImages: {
    [key: string]: string; // disorder_id or 'module' -> asset path
  };
}

/**
 * Module registry - add new modules here
 */
export const MODULE_REGISTRY: Record<string, ModuleRegistryEntry> = {
  anxiety: {
    id: 'anxiety',
    title: 'اضطرابات القلق',
    title_en: 'Anxiety Disorders',
    description: 'استكشف أنماط القلق التي قد تؤثر على حياتك اليومية',
    icon: 'heart-pulse',
    color: 'amber',
    heroImages: {
      module: '/images/heroes/hero_anxiety_calm-garden_1x.webp',
      gad: '/images/heroes/hero_anxiety_calm-garden_1x.webp',
      panic: '/images/heroes/hero_anxiety_calm-garden_1x.webp',
      social_anxiety: '/images/heroes/hero_anxiety_calm-garden_1x.webp',
    },
  },
  depression: {
    id: 'depression',
    title: 'الاضطرابات الاكتئابية',
    title_en: 'Depressive Disorders',
    description: 'تعرف على أنماط المزاج التي قد تؤثر على يومك',
    icon: 'cloud-rain',
    color: 'blue',
    heroImages: {
      module: '/images/heroes/hero_depression_sunrise_1x.webp',
      mdd: '/images/heroes/hero_depression_sunrise_1x.webp',
      pdd: '/images/heroes/hero_depression_olive-tree_1x.webp',
    },
  },
};

/**
 * Module data map - static imports
 */
const MODULE_DATA_MAP: Record<string, AssessmentModule> = {
  anxiety: anxietyModuleData as AssessmentModule,
  depression: depressionModuleData as AssessmentModule,
};

/**
 * Get all registered module IDs
 */
export function getAllModuleIds(): string[] {
  return Object.keys(MODULE_REGISTRY);
}

/**
 * Get module metadata by ID
 */
export function getModuleMetadata(moduleId: string): ModuleRegistryEntry | null {
  return MODULE_REGISTRY[moduleId] ?? null;
}

/**
 * Load module content from registry
 * 
 * @param moduleId - Module identifier (e.g., 'anxiety', 'depression')
 * @returns Module data or null if not found
 */
export function loadModule(moduleId: string): AssessmentModule | null {
  return MODULE_DATA_MAP[moduleId] ?? null;
}

/**
 * Get hero image path for a module or disorder
 * 
 * @param moduleId - Module identifier
 * @param disorderId - Optional disorder identifier (defaults to 'module')
 * @returns Hero image path or null if not found
 */
export function getHeroImage(moduleId: string, disorderId?: string): string | null {
  const metadata = getModuleMetadata(moduleId);
  if (!metadata) {
    return null;
  }

  const key = disorderId ?? 'module';
  return metadata.heroImages[key] ?? metadata.heroImages.module ?? null;
}

/**
 * Check if a disorder exists in a module
 * 
 * @param moduleId - Module identifier
 * @param disorderId - Disorder identifier
 * @returns True if disorder exists in module
 */
export function validateDisorder(
  moduleId: string,
  disorderId: string
): boolean {
  const moduleData = loadModule(moduleId);
  if (!moduleData) {
    return false;
  }

  return moduleData.disorders.some((disorder) => disorder.id === disorderId);
}
