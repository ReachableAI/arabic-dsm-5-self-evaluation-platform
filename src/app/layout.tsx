import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { MoodProvider } from "@/contexts/mood-context";
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
        <MoodProvider>{children}</MoodProvider>
      </body>
    </html>
  );
}
