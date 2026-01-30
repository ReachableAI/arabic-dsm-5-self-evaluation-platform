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
  title: "منصة التقييم الذاتي | Self-Evaluation Platform",
  description: "منصة التقييم الذاتي المبنية على معايير DSM-5-TR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${ibmPlexSansArabic.variable} antialiased`}>
        {/* Skip to main content link for keyboard navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:shadow-lg"
        >
          الانتقال إلى المحتوى الرئيسي
        </a>
        <MoodProvider>
          <AssessmentProvider>
            <main id="main-content">
              {children}
            </main>
          </AssessmentProvider>
        </MoodProvider>
      </body>
    </html>
  );
}
