import { MetadataRoute } from 'next';

/**
 * Dynamic sitemap generation
 * 
 * Includes:
 * - Core pages (home, about, privacy)
 * - Assessment module routes (anxiety, depression)
 * - Welcome flow
 * - Crisis resources
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://dsm5-arabic.vercel.app';
  
  // Core pages
  const corePages = [
    '',
    '/home',
    '/about',
    '/privacy',
    '/crisis',
    '/mood-check',
    '/welcome',
    '/welcome/2',
    '/welcome/3',
  ];

  // Assessment modules (active only)
  const assessmentModules = [
    '/assessment/anxiety',
    '/assessment/depression',
    '/assessment/ocd',
    '/assessment/adhd',
    '/assessment/ptsd',
  ];

  // Results pages
  const resultPages = [
    '/results/anxiety',
    '/results/depression',
    '/results/ocd',
    '/results/adhd',
    '/results/ptsd',
  ];

  const pages = [...corePages, ...assessmentModules, ...resultPages];

  return pages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/home' ? 'weekly' : 'monthly',
    priority: route === '' || route === '/home' ? 1.0 : 0.8,
  }));
}
