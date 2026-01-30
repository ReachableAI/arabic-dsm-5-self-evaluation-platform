import { Metadata } from 'next';
import { STATIC_PAGE_METADATA } from '@/lib/seo-metadata';

export const metadata: Metadata = STATIC_PAGE_METADATA.about;

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
