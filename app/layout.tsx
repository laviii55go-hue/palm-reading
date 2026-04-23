import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import LayoutClient from "./components/LayoutClient";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://uranai-tenohira.jp";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "【無料】手のひらの予言者【総合占いで、あなたの未来を楽しく紐解く】",
  description: "手相・夢占い・動物占い・数秘術など多彩な占いが無料で楽しめる総合占いサイト。生年月日や手相から恋愛運・金運・仕事運を診断します。",
  openGraph: {
    title: "手のひらの予言者【総合占いで、あなたの未来を楽しく紐解く】",
    description: "手相・夢占い・動物占い・数秘術など多彩な占いが無料で楽しめる総合占いサイト。生年月日や手相から恋愛運・金運・仕事運を診断します。",
    url: "https://uranai-tenohira.jp/",
    siteName: "手のひらの予言者",
    images: [
      {
        url: "https://uranai-tenohira.jp/og-image-v2.webp",
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
    images: ["https://uranai-tenohira.jp/og-image-v2.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/app-icon.png",
    shortcut: "/app-icon.png",
    apple: "/app-icon.png",
  },
  manifest: "/manifest.json",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "手のひらの予言者",
  alternateName: "手相・タロット・数秘術・16タイプ性格診断の総合占いサイト",
  url: SITE_URL,
  description: "手相・タロット・数秘術・動物占い・16タイプ性格診断など多彩な占いが無料で楽しめる総合占いサイト。",
  inLanguage: "ja",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/site-map?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
  publisher: {
    "@type": "Organization",
    name: "ハーベストラボ",
    alternateName: "Harvest Lab",
    url: SITE_URL,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ハーベストラボ",
  alternateName: "Harvest Lab",
  url: SITE_URL,
  description: "モバイルアプリ及びウェブサービスの企画・開発・運営を行う個人事業主。占い・自己理解ツールを中心に無料コンテンツを提供。",
  foundingDate: "2026-02-25",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    availableLanguage: ["Japanese"],
    url: `${SITE_URL}/contact`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pb-16`}
      >
        {/* JSON-LD 構造化データ（body内配置がNext.js 16推奨・hydrationエラー回避） */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* Google AdSense: Vercel Hobby プラン 商用利用NG規約（Fair Use Guidelines で AdSense 名指しNG）対応のため無効化（2026/04/23） */}
        {/* 収益化見込み（十分な流入）が確認でき Vercel Pro に切替後、下記をコメントアウト解除して再申請 */}
        {/* <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3965931075265436"
          strategy="beforeInteractive"
          crossOrigin="anonymous"
        /> */}
        <LayoutClient>
          {children}
        </LayoutClient>
        {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
