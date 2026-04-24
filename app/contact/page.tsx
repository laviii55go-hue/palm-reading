import type { Metadata } from "next";
import Link from "next/link";
import TopBannerLink from "../components/TopBannerLink";
import FooterLinks from "../components/FooterLinks";

export const metadata: Metadata = {
  title: "お問い合わせ｜手のひらの予言者",
  description:
    "「手のひらの予言者」へのお問い合わせ窓口。サイトへのご意見・ご感想・不具合のご報告はこちらから。",
  openGraph: {
    title: "お問い合わせ｜手のひらの予言者",
    description:
      "「手のひらの予言者」へのお問い合わせページ。ご意見・ご感想・不具合のご報告を受け付けています。",
    url: "https://uranai-tenohira.jp/contact",
  },
};

const CONTACT_EMAIL = "harvest.lab.kei2026@gmail.com";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        <div className="mb-6">
          <TopBannerLink />
        </div>

        <h1 className="text-2xl font-bold text-purple-900 mb-6">お問い合わせ</h1>

        <div className="space-y-8 text-gray-700 text-sm leading-relaxed">
          <section>
            <p>
              「手のひらの予言者」をご利用いただき、ありがとうございます。
              サイトへのご意見・ご感想・不具合のご報告・広告掲載のご相談などは、下記の方法でお寄せください。
            </p>
          </section>

          <section>
            <h2 className="font-bold text-purple-800 text-base mb-3">📧 メールでのお問い合わせ</h2>
            <div className="rounded-2xl bg-purple-50 border border-purple-200 p-5">
              <p className="text-gray-700 mb-3">
                以下のメールアドレス宛にご連絡ください。
              </p>
              <p className="text-center">
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=%E3%81%8A%E5%95%8F%E3%81%84%E5%90%88%E3%82%8F%E3%81%9B%EF%BC%88%E6%89%8B%E3%81%AE%E3%81%B2%E3%82%89%E3%81%AE%E4%BA%88%E8%A8%80%E8%80%85%EF%BC%89`}
                  className="inline-block px-6 py-3 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
              <p className="text-xs text-gray-500 mt-3 text-center">
                クリックするとメールアプリが起動します
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-bold text-purple-800 text-base mb-3">📝 ご連絡の際にお書き添えください</h2>
            <ul className="space-y-1 list-disc list-inside">
              <li>お問い合わせの種類（ご意見／不具合報告／広告掲載／取材／その他）</li>
              <li>具体的な内容</li>
              <li>不具合のご報告の場合：お使いの端末・ブラウザ・発生した画面のURL</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-purple-800 text-base mb-3">⏱ 返信について</h2>
            <p>
              個人運営のため、返信までに<strong>数日〜1週間ほど</strong>お時間をいただく場合があります。
              内容によっては返信を差し控えさせていただく場合もありますので、あらかじめご了承ください。
            </p>
          </section>

          <section>
            <h2 className="font-bold text-purple-800 text-base mb-3">🚫 対応いたしかねるお問い合わせ</h2>
            <ul className="space-y-1 list-disc list-inside">
              <li>個別の占い鑑定依頼（当サイトは無料占いツールの提供のみ）</li>
              <li>特定の個人・団体を鑑定するご依頼</li>
              <li>医療・法律・投資判断に関するご相談</li>
              <li>営業目的・勧誘目的のご連絡</li>
              <li>誹謗中傷・差別的・違法性のある内容のご連絡</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-purple-800 text-base mb-3">🔐 個人情報の取扱いについて</h2>
            <p>
              お問い合わせでいただいた個人情報は、返信・対応の目的のみに使用し、第三者への提供は行いません。詳しくは
              <Link href="/privacy" className="text-purple-600 hover:underline font-semibold">
                プライバシーポリシー
              </Link>
              をご確認ください。
            </p>
          </section>

          <section>
            <h2 className="font-bold text-purple-800 text-base mb-3">関連ページ</h2>
            <ul className="space-y-1 list-disc list-inside">
              <li><Link href="/about" className="text-purple-600 hover:underline">運営者情報</Link></li>
              <li><Link href="/privacy" className="text-purple-600 hover:underline">プライバシーポリシー</Link></li>
              <li><Link href="/site-map" className="text-purple-600 hover:underline">サイトマップ</Link></li>
            </ul>
          </section>

          <p className="text-gray-400 text-xs pt-4">最終更新日：2026年4月21日</p>
        </div>

        <FooterLinks className="text-center mt-8" linkClassName="text-gray-400 text-xs hover:underline" />
      </div>
    </div>
  );
}
