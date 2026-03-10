import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "夢占い【無料】夢の意味を診断",
  description: "昨日見た夢のキーワードから意味を無料で診断。夢占いの基本から詳しい解説まで。",
  openGraph: {
    title: "夢占い【無料】夢の意味を診断",
    description: "昨日見た夢のキーワードから意味を無料で診断。夢占いの基本から詳しい解説まで。",
    url: "https://jade-torte-9b5cde.netlify.app/dream",
    siteName: "手のひらの予言者",
    images: [
      {
        url: "https://jade-torte-9b5cde.netlify.app/dream-top.png",
        width: 1200,
        height: 630,
        alt: "夢占い",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "夢占い【無料】夢の意味を診断",
    description: "昨日見た夢のキーワードから意味を無料で診断。夢占いの基本から詳しい解説まで。",
    images: ["https://jade-torte-9b5cde.netlify.app/dream-top.png"],
  },
};

export default function DreamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
