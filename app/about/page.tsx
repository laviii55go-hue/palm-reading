import type { Metadata } from "next";
import Link from "next/link";
import TopBannerLink from "../components/TopBannerLink";
import FooterLinks from "../components/FooterLinks";

export const metadata: Metadata = {
  title: "運営者情報｜手のひらの予言者",
  description:
    "「手のひらの予言者」の運営者情報ページ。サイト運営者・運営方針・開設経緯などをご案内します。",
  openGraph: {
    title: "運営者情報｜手のひらの予言者",
    description:
      "「手のひらの予言者」の運営者・運営方針・開設経緯についてのご案内です。",
    url: "https://uranai-tenohira.jp/about",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        <div className="mb-6">
          <TopBannerLink />
        </div>

        <h1 className="text-2xl font-bold text-purple-900 mb-6">運営者情報（About）</h1>

        <div className="space-y-8 text-gray-700 text-sm leading-relaxed">
          <section>
            <h2 className="font-bold text-purple-800 text-base mb-2">サイト名</h2>
            <p>手のひらの予言者（uranai-tenohira.jp）</p>
          </section>

          <section>
            <h2 className="font-bold text-purple-800 text-base mb-2">運営者</h2>
            <p>ハーベストラボ（Harvest Lab）</p>
            <p className="text-gray-500 text-xs mt-1">
              個人事業主として、ウェブサービスおよびコンテンツの企画・開発・運営を行っています。
            </p>
          </section>

          <section>
            <h2 className="font-bold text-purple-800 text-base mb-2">サイトの目的</h2>
            <p>
              「手のひらの予言者」は、<strong>占いを身近な自己理解の道具として楽しむ</strong>ことをテーマにしたウェブサイトです。手相・タロット・数秘術・16タイプ性格診断・動物占いなど、複数の占術を<strong>無料かつシンプルに使える形</strong>で提供しています。
            </p>
            <p className="mt-3">
              占いを「当たる／当たらない」で消費するのではなく、<strong>日々の気づきや小さな行動のきっかけ</strong>として受け取ってもらえるよう、結果の解釈や記事の書き方を工夫しています。
            </p>
          </section>

          <section>
            <h2 className="font-bold text-purple-800 text-base mb-2">運営方針</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>占い結果は<strong>エンターテインメント目的</strong>として提供し、医療・法律・金融等の専門判断の代替にはならないことを明記します。</li>
              <li>各コラムには<strong>運営者独自の視点・体験・考察</strong>を織り込み、テンプレート的な量産コンテンツにならないよう配慮しています。</li>
              <li>ユーザーの<strong>個人情報（氏名・メール等）は収集しません</strong>。生年月日や診断入力は診断結果の算出のみに使われ、サーバー保存は行いません。</li>
              <li>広告・アフィリエイトは<strong>主コンテンツの下部</strong>に配置し、ユーザー体験を損なわないよう設計しています。</li>
              <li>占いに強い不信感をお持ちの方にも、<strong>性格診断や数秘術を「自己理解のヒント」として</strong>気軽に使っていただけることを意識しています。</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-purple-800 text-base mb-2">提供している占い</h2>
            <ul className="space-y-1 list-disc list-inside">
              <li>AI手相占い／手相クイズ診断</li>
              <li>タロット占い（3択・ワンカード・大アルカナ22枚ガイド）</li>
              <li>数秘術占い（ライフパスナンバー・相性診断）</li>
              <li>16タイプ性格診断・相性診断</li>
              <li>動物占い（60種類・サブタイプ対応）</li>
              <li>血液型占い・恐竜占い・ほくろ占い・夢占い・姓名判断</li>
              <li>カレンダー占い・日運ランキング</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-purple-800 text-base mb-2">技術的な特徴</h2>
            <p>
              当サイトは、Next.js（React）をベースに、Vercel上でホスティングしています。タロット占いの解釈には生成AI（OpenAI / Google Generative AI）を組み合わせ、天体配置などの追加情報も含めて<strong>その日限定のメッセージ</strong>を生成しています。
            </p>
          </section>

          <section>
            <h2 className="font-bold text-purple-800 text-base mb-2">著者・執筆について</h2>
            <p>
              サイト内の記事・コラム・占い解釈文は、<strong>運営者（ハーベストラボ）が自ら執筆・監修</strong>しています。生成AIの補助を用いる場合もありますが、最終的な編集・推敲・事実確認はすべて運営者が行っています。
            </p>
            <p className="mt-3">
              占術の正確性については、大アルカナ22枚のライダー・ウェイト版、数秘術のピタゴラス式、16タイプ性格診断の4軸構成など、<strong>広く流通している古典的な解釈</strong>をベースにしています。
            </p>
          </section>

          <section>
            <h2 className="font-bold text-purple-800 text-base mb-2">お問い合わせ</h2>
            <p>
              サイトに関するご意見・ご感想・不具合のご報告は、
              <Link href="/contact" className="text-purple-600 hover:underline font-semibold">
                お問い合わせページ
              </Link>
              よりご連絡ください。
            </p>
          </section>

          <section>
            <h2 className="font-bold text-purple-800 text-base mb-2">関連ページ</h2>
            <ul className="space-y-1 list-disc list-inside">
              <li><Link href="/privacy" className="text-purple-600 hover:underline">プライバシーポリシー</Link></li>
              <li><Link href="/contact" className="text-purple-600 hover:underline">お問い合わせ</Link></li>
              <li><Link href="/site-map" className="text-purple-600 hover:underline">サイトマップ</Link></li>
              <li><Link href="/changelog" className="text-purple-600 hover:underline">更新履歴</Link></li>
            </ul>
          </section>

          <p className="text-gray-400 text-xs pt-4">最終更新日：2026年4月21日</p>
        </div>

        <FooterLinks className="text-center mt-8" linkClassName="text-gray-400 text-xs hover:underline" />
      </div>
    </div>
  );
}
