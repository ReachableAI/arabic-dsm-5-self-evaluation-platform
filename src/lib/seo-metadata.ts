/**
 * SEO Metadata Utilities
 * 
 * Centralized metadata generation for assessment modules and routes.
 * Used by page layouts and route handlers to generate consistent SEO metadata.
 */

import { Metadata } from 'next';

interface ModuleMetadata {
  id: string;
  title: string;
  description: string;
  keywords?: string[];
}

/**
 * Module metadata registry
 */
export const MODULE_SEO_DATA: Record<string, ModuleMetadata> = {
  anxiety: {
    id: 'anxiety',
    title: 'تقييم اضطرابات القلق',
    description: 'تقييم ذاتي لاضطرابات القلق بما في ذلك القلق المعمم، نوبات الهلع، والقلق الاجتماعي. مبني على معايير DSM-5-TR. خاص وآمن بالكامل.',
    keywords: [
      'اضطرابات القلق',
      'القلق المعمم',
      'نوبات الهلع',
      'القلق الاجتماعي',
      'تقييم القلق',
      'DSM-5-TR',
      'anxiety disorders',
      'GAD assessment',
    ],
  },
  depression: {
    id: 'depression',
    title: 'تقييم الاضطرابات الاكتئابية',
    description: 'تقييم ذاتي للاضطرابات الاكتئابية بما في ذلك الاكتئاب الحاد والاكتئاب المستمر. مبني على معايير DSM-5-TR. خاص وآمن بالكامل.',
    keywords: [
      'الاكتئاب',
      'الاضطرابات الاكتئابية',
      'الاكتئاب الحاد',
      'الاكتئاب المستمر',
      'تقييم الاكتئاب',
      'DSM-5-TR',
      'depression',
      'MDD assessment',
    ],
  },
  adhd: {
    id: 'adhd',
    title: 'تقييم اضطراب نقص الانتباه / فرط الحركة',
    description: 'تقييم ذاتي لاضطراب نقص الانتباه وفرط الحركة (ADHD). مبني على معايير DSM-5-TR. خاص وآمن بالكامل.',
    keywords: [
      'ADHD',
      'نقص الانتباه',
      'فرط الحركة',
      'تقييم ADHD',
      'DSM-5-TR',
      'attention deficit',
    ],
  },
  ocd: {
    id: 'ocd',
    title: 'تقييم الوسواس القهري',
    description: 'تقييم ذاتي لاضطراب الوسواس القهري والاضطرابات ذات الصلة. مبني على معايير DSM-5-TR. خاص وآمن بالكامل.',
    keywords: [
      'الوسواس القهري',
      'OCD',
      'تقييم OCD',
      'DSM-5-TR',
      'obsessive compulsive',
    ],
  },
};

/**
 * Generate metadata for assessment module pages
 */
export function generateModuleMetadata(moduleId: string): Metadata {
  const moduleData = MODULE_SEO_DATA[moduleId];
  
  if (!moduleData) {
    return {
      title: 'تقييم ذاتي',
      description: 'منصة التقييم الذاتي المبنية على معايير DSM-5-TR',
    };
  }

  return {
    title: moduleData.title,
    description: moduleData.description,
    keywords: moduleData.keywords,
    alternates: {
      canonical: `/assessment/${moduleId}`,
    },
    openGraph: {
      type: 'website',
      locale: 'ar_SA',
      url: `/assessment/${moduleId}`,
      title: moduleData.title,
      description: moduleData.description,
      siteName: 'منصة التقييم الذاتي',
      images: [
        {
          url: '/images/og-image.png',
          width: 1200,
          height: 630,
          alt: moduleData.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: moduleData.title,
      description: moduleData.description,
      images: ['/images/og-image.png'],
    },
  };
}

/**
 * Generate metadata for results pages
 */
export function generateResultsMetadata(moduleId: string): Metadata {
  const moduleData = MODULE_SEO_DATA[moduleId];
  
  const title = moduleData 
    ? `نتائج ${moduleData.title}` 
    : 'نتائج التقييم';
    
  const description = 'ملخص نتائج التقييم الذاتي. معلوماتك خاصة ومحفوظة على جهازك فقط.';

  return {
    title,
    description,
    robots: {
      index: false, // Don't index user-specific results
      follow: true,
    },
    alternates: {
      canonical: `/results/${moduleId}`,
    },
  };
}

/**
 * Static page metadata
 */
export const STATIC_PAGE_METADATA: Record<string, Metadata> = {
  privacy: {
    title: 'سياسة الخصوصية',
    description: 'سياسة الخصوصية لمنصة التقييم الذاتي. نحن لا نجمع أي بيانات شخصية، ولا نتتبع المستخدمين، وكل البيانات محفوظة على جهازك فقط.',
    alternates: {
      canonical: '/privacy',
    },
    openGraph: {
      type: 'website',
      locale: 'ar_SA',
      url: '/privacy',
      title: 'سياسة الخصوصية | منصة التقييم الذاتي',
      description: 'خصوصيتك أولوية. لا نجمع بيانات، لا تتبع، كل شيء على جهازك.',
      siteName: 'منصة التقييم الذاتي',
    },
  },
  about: {
    title: 'عن المنصة',
    description: 'منصة التقييم الذاتي - أداة للوعي الذاتي مبنية على معايير DSM-5-TR. تساعدك على فهم أنماط صحتك النفسية بطريقة منظمة وآمنة.',
    alternates: {
      canonical: '/about',
    },
    openGraph: {
      type: 'website',
      locale: 'ar_SA',
      url: '/about',
      title: 'عن المنصة | منصة التقييم الذاتي',
      description: 'منصة التقييم الذاتي - أداة للوعي الذاتي مبنية على معايير DSM-5-TR.',
      siteName: 'منصة التقييم الذاتي',
    },
  },
  crisis: {
    title: 'موارد الأزمات',
    description: 'موارد الدعم الفوري وخطوط المساعدة في حالات الأزمات النفسية. إذا كنت في حاجة لمساعدة عاجلة، اتصل بخطوط المساعدة المتاحة 24/7.',
    alternates: {
      canonical: '/crisis',
    },
    openGraph: {
      type: 'website',
      locale: 'ar_SA',
      url: '/crisis',
      title: 'موارد الأزمات | منصة التقييم الذاتي',
      description: 'موارد الدعم الفوري وخطوط المساعدة في حالات الأزمات النفسية.',
      siteName: 'منصة التقييم الذاتي',
    },
  },
};
