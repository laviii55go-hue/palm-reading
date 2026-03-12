import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "【無料】手のひらの予言者【総合占いで、あなたの未来を楽しく紐解く】",
  description: "手相・夢占い・動物占い・数秘術など多彩な占いが無料で楽しめる総合占いサイト。生年月日や手相から恋愛運・金運・仕事運を診断します。",
  openGraph: {
    title: "手のひらの予言者【総合占いで、あなたの未来を楽しく紐解く】",
    description: "手相・夢占い・動物占い・数秘術など多彩な占いが無料で楽しめる総合占いサイト。生年月日や手相から恋愛運・金運・仕事運を診断します。",
    url: "https://jade-torte-9b5cde.netlify.app/",
    siteName: "手のひらの予言者",
    images: [
      {
        url: "https://jade-torte-9b5cde.netlify.app/og-image-v2.png",
        width: 1200,
        height: 630,
        alt: "手のひらの予言者 AI手相占い",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "手のひらの予言者【総合占いで、あなたの未来を楽しく紐解く】",
    description: "手相・夢占い・動物占い・数秘術など多彩な占いが無料で楽しめる総合占いサイト。生年月日や手相から恋愛運・金運・仕事運を診断します。",
    images: ["https://jade-torte-9b5cde.netlify.app/og-image-v2.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google AdSense: beforeInteractive で初期HTMLに含め審査対応 */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3965931075265436"
          strategy="beforeInteractive"
          crossOrigin="anonymous"
        />
        {children}
        {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
