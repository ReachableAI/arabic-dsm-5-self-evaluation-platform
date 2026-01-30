import { Metadata } from 'next';
import { generateModuleMetadata } from '@/lib/seo-metadata';

interface ModuleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    moduleId: string;
  }>;
}

export async function generateMetadata({ params }: ModuleLayoutProps): Promise<Metadata> {
  const { moduleId } = await params;
  return generateModuleMetadata(moduleId);
}

export default function ModuleLayout({ children }: ModuleLayoutProps) {
  return <>{children}</>;
}
