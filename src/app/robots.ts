import { MetadataRoute } from 'next';

/**
 * Robots.txt configuration
 * 
 * Allows all crawlers access to public routes.
 * Blocks crawling of dynamic assessment routes with user-specific content.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://dsm5-arabic.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/*', // API routes
          '/assessment/*/results', // Dynamic user results (if any)
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
