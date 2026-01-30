import { Metadata } from 'next';
import { generateResultsMetadata } from '@/lib/seo-metadata';

interface ResultsLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    moduleId: string;
  }>;
}

export async function generateMetadata({ params }: ResultsLayoutProps): Promise<Metadata> {
  const { moduleId } = await params;
  return generateResultsMetadata(moduleId);
}

export default function ResultsLayout({ children }: ResultsLayoutProps) {
  return <>{children}</>;
}
