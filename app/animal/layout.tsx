import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "動物占い 無料｜生年月日で60種類の動物キャラ診断",
  description:
    "動物占いを無料で診断。生年月日を入力するだけで、12動物×5サブタイプの60種類からあなたの動物キャラ、性格、恋愛、仕事、相性をチェックできます。",
  openGraph: {
    title: "動物占い 無料｜生年月日で60種類の動物キャラ診断",
    description:
      "生年月日でわかる無料の動物占い。60種類の動物キャラから性格・恋愛・仕事・相性を診断します。",
    url: "https://uranai-tenohira.jp/animal",
    siteName: "手のひらの予言者",
    images: [
      {
        url: "https://uranai-tenohira.jp/og-image-v2.webp",
        width: 1200,
        height: 630,
        alt: "動物占い 無料｜60種類の動物キャラ診断",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "動物占い 無料｜生年月日で60種類の動物キャラ診断",
    description:
      "12動物×5サブタイプの60種類。生年月日で性格・恋愛・仕事・相性を無料診断。",
    images: ["https://uranai-tenohira.jp/og-image-v2.webp"],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "動物占いは無料でできますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "はい。手のひらの予言者の動物占いは無料で利用できます。生年月日を入力すると、12動物×5サブタイプの60種類からあなたの動物キャラを診断できます。",
      },
    },
    {
      "@type": "Question",
      name: "生年月日だけで診断できますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "はい。動物占いの個人診断は、生まれ年・月・日を入力するだけで結果を表示します。名前やメールアドレスの入力は不要です。",
      },
    },
    {
      "@type": "Question",
      name: "大人でも楽しめる動物占いですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "大人の方にも楽しめるように、性格だけでなく恋愛傾向、仕事での強み、相性診断も用意しています。家族や友人との会話のきっかけにも使えます。",
      },
    },
    {
      "@type": "Question",
      name: "動物占いで相性診断はできますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "できます。自分と相手の生年月日を入力すると、2人の動物キャラをもとに相性スコアと関係のヒントを表示します。",
      },
    },
  ],
};

export default function AnimalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
