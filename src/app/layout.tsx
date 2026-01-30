import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { MoodProvider } from "@/contexts/mood-context";
import { AssessmentProvider } from "@/contexts/assessment-context";
import "./globals.css";

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["arabic"],
  variable: "--font-ibm-plex-sans-arabic",
  display: "swap",
  fallback: ["Cairo", "Noto Sans Arabic", "Tahoma", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: "منصة التقييم الذاتي | Self-Evaluation Platform",
    template: "%s | منصة التقييم الذاتي",
  },
  description: "منصة التقييم الذاتي المبنية على معايير DSM-5-TR. استكشف أنماط القلق والاكتئاب بطريقة منظمة ومبنية على منهجيات علمية. خصوصيتك أولوية - لا حسابات، لا تتبع، كل البيانات على جهازك.",
  keywords: [
    "تقييم ذاتي",
    "صحة نفسية",
    "DSM-5-TR",
    "اضطرابات القلق",
    "الاكتئاب",
    "وعي ذاتي",
    "mental health",
    "self-evaluation",
    "Arabic mental health",
  ],
  authors: [{ name: "منصة التقييم الذاتي" }],
  creator: "منصة التقييم الذاتي",
  publisher: "منصة التقييم الذاتي",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://dsm5-arabic.vercel.app"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "/",
    title: "منصة التقييم الذاتي | Self-Evaluation Platform",
    description:
      "منصة التقييم الذاتي المبنية على معايير DSM-5-TR. استكشف أنماط القلق والاكتئاب بطريقة منظمة ومبنية على منهجيات علمية.",
    siteName: "منصة التقييم الذاتي",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "منصة التقييم الذاتي - DSM-5-TR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "منصة التقييم الذاتي | Self-Evaluation Platform",
    description:
      "منصة التقييم الذاتي المبنية على معايير DSM-5-TR. استكشف أنماط القلق والاكتئاب بطريقة منظمة.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add search console verification when available
    // google: 'verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${ibmPlexSansArabic.variable} antialiased`}>
        <MoodProvider>
          <AssessmentProvider>
            {children}
          </AssessmentProvider>
        </MoodProvider>
      </body>
    </html>
  );
}
