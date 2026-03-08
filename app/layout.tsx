import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "【無料】手のひらの予言者【1分でわかるAI手相占い】",
  description: "スマホでパッと占える！AIがあなたの手相から恋愛運・金運・仕事運を1分で無料診断します。悩める未来のヒントが見つかる本格鑑定を今すぐ体験。",
  openGraph: {
    title: "手のひらの予言者【1分でわかるAI手相占い】",
    description: "スマホでパッと占える！AIがあなたの手相から恋愛運・金運・仕事運を1分で無料診断します。悩める未来のヒントが見つかる本格鑑定を今すぐ体験。",
    url: "https://jade-torte-9b5cde.netlify.app/",
    siteName: "手のひらの予言者",
    images: [
      {
        url: "https://jade-torte-9b5cde.netlify.app/og-image.png",
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
    title: "手のひらの予言者【1分でわかるAI手相占い】",
    description: "スマホでパッと占える！AIがあなたの手相から恋愛運・金運・仕事運を1分で無料診断します。悩める未来のヒントが見つかる本格鑑定を今すぐ体験。",
    images: ["https://jade-torte-9b5cde.netlify.app/og-image.png"],
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
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3965931075265436"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
