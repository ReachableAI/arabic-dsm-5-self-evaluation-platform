import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'استكشف فئات التقييم',
  description: 'اختر فئة التقييم الذاتي: اضطرابات القلق، الاضطرابات الاكتئابية، وغيرها. منصة آمنة وخاصة مبنية على معايير DSM-5-TR.',
  alternates: {
    canonical: '/home',
  },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: '/home',
    title: 'استكشف فئات التقييم | منصة التقييم الذاتي',
    description: 'اختر فئة التقييم الذاتي: اضطرابات القلق، الاضطرابات الاكتئابية. منصة آمنة وخاصة.',
    siteName: 'منصة التقييم الذاتي',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'منصة التقييم الذاتي - DSM-5-TR',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'استكشف فئات التقييم | منصة التقييم الذاتي',
    description: 'اختر فئة التقييم الذاتي: اضطرابات القلق، الاضطرابات الاكتئابية.',
    images: ['/images/og-image.png'],
  },
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
