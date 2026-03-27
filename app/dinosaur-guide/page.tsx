import Link from "next/link";
import Image from "next/image";
import TopBannerLink from "../components/TopBannerLink";
import type { Metadata } from "next";
import AdBanner from "../components/AdBanner";
import RakutenWidget from "../components/RakutenWidget";
import FooterLinks from "../components/FooterLinks";
import { DINOSAUR_DATA } from "../data/dinosaurData";
import { ELEMENT_DATA, ELEMENT_NUMBERS } from "../data/dinosaurElementData";

export const metadata: Metadata = {
  title: "恐竜占い｜12種類の恐竜タイプ一覧・性格・相性",
  description:
    "数秘術ベースの恐竜占い。ティラノサウルス、マイアサウラ、トリケラトプスなど12種類の恐竜タイプの性格・強み・恋愛・相性を解説。生年月日からあなたの恐竜を診断できます。",
};

const NUMBERS = [
  { num: 1, name: "ティラノサウルス", emoji: "🦖", color: "from-red-50 to-orange-50", border: "border-red-200" },
  { num: 2, name: "マイアサウラ", emoji: "🦕", color: "from-slate-50 to-blue-50", border: "border-slate-200" },
  { num: 3, name: "プテラノドン", emoji: "🦅", color: "from-yellow-50 to-amber-50", border: "border-yellow-200" },
  { num: 4, name: "アンキロサウルス", emoji: "🦎", color: "from-green-50 to-emerald-50", border: "border-green-200" },
  { num: 5, name: "ヴェロキラプトル", emoji: "🦂", color: "from-teal-50 to-cyan-50", border: "border-teal-200" },
  { num: 6, name: "トリケラトプス", emoji: "🦏", color: "from-pink-50 to-rose-50", border: "border-pink-200" },
  { num: 7, name: "ステゴサウルス", emoji: "🦕", color: "from-purple-50 to-violet-50", border: "border-purple-200" },
  { num: 8, name: "スピノサウルス", emoji: "🐊", color: "from-gray-50 to-slate-50", border: "border-gray-200" },
  { num: 9, name: "ブラキオサウルス", emoji: "🦕", color: "from-indigo-50 to-blue-50", border: "border-indigo-200" },
];

const MASTER_NUMBERS = [
  { num: 11, name: "パラサウロロフス", emoji: "🦴" },
  { num: 22, name: "ケツァルコアトルス", emoji: "🦅" },
  { num: 33, name: "オヴィラプトル", emoji: "🥚" },
];

export default function DinosaurGuidePage() {
  return (
    <div className="relative min-h-screen">
      <div
        className="fixed inset-0 -z-10 bg-slate-100 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/dinosaur-bg.png')" }}
        aria-hidden
      />
      <div className="bg-slate-950/90 border-b border-cyan-700/40 sticky top-0 z-10 backdrop-blur">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/dinosaur-fortune" className="text-cyan-200 text-sm hover:underline">
            ← 恐竜占いへ
          </Link>
          <span className="text-xs text-cyan-200/70">恐竜図鑑</span>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8 space-y-10">
        <div className="flex justify-start">
          <TopBannerLink />
        </div>

        <div id="top" className="text-center space-y-3 rounded-2xl border border-cyan-400/40 bg-gradient-to-br from-slate-900 via-indigo-900 to-cyan-900 p-4 shadow-xl shadow-cyan-900/30">
          <div className="rounded-xl overflow-hidden border border-cyan-300/50 shadow-md shadow-cyan-500/20">
            <Image
              src="/dinosaur-top.png"
              alt="恐竜図鑑トップ"
              width={720}
              height={360}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
          <h1 className="text-2xl font-black text-cyan-50 leading-tight tracking-wide">恐竜占い 図鑑</h1>
          <p className="text-cyan-100/80 text-sm">
            12種類の恐竜タイプ一覧
          </p>
        </div>

        <section id="how" className="rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5 space-y-3">
          <h2 className="font-bold text-emerald-800 flex items-center gap-2">
            <span>🔬</span> 恐竜占いの仕組み
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            恐竜占いでは、数秘術の計算方法を使っています。生年月日のすべての数字を足し合わせ、1桁になるまで繰り返します。11・22・33が出た場合はそのまま使います。
          </p>
          <div className="rounded-xl bg-white/80 p-3 text-xs text-gray-600">
            <p className="font-semibold text-emerald-700 mb-1">計算例：1990年3月15日</p>
            <p>1+9+9+0+3+1+5 = 28 → 2+8 = 10 → 1+0 = 1</p>
            <p className="mt-1">→ ティラノサウルスタイプ</p>
          </div>
          <p className="text-gray-500 text-xs">
            この計算で出た数字（1〜9、11、22、33）が、それぞれ12種類の恐竜に対応しています。詳しくは数秘術ガイドもご覧ください。
          </p>
          <Link href="/numerology-guide" className="block text-center text-emerald-600 text-sm font-semibold hover:underline">
            🔢 数秘術の基本知識 →
          </Link>
        </section>

        <section id="elements" className="rounded-2xl border-2 border-violet-200 bg-gradient-to-br from-violet-50 to-white p-5 space-y-3">
          <h2 className="font-bold text-violet-900 flex items-center gap-2">
            <span>✨</span> バースデーナンバー（属性）
          </h2>
          <h3 className="font-bold text-violet-900 text-sm">属性（バースデーナンバー）とは？</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            恐竜占いでは、生まれた<strong>「日」</strong>の数字から<strong>バースデーナンバー</strong>を出し、炎・水・風など11種類の<strong>属性</strong>をくっつけています。恐竜タイプ12種 × 属性11種で、
            <strong>132通り</strong>の組み合わせ。キミだけのカードになるんだよ！
          </p>
          <h3 className="font-bold text-violet-900 text-sm pt-1">バースデーナンバーの出し方</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            <strong>生まれた日（1〜31）</strong>だけを使います。日が2桁なら、その桁を足して1桁（またはマスター数の11・22）になるまで繰り返します。11日・22日生まれは、その日付のままバースデーナンバーが11または22になります。
          </p>
          <div className="rounded-xl bg-white/80 p-3 text-xs text-gray-600 space-y-2">
            <div>
              <p className="font-semibold text-violet-700 mb-0.5">例：8日生まれ</p>
              <p>8 → そのまま → 鉄（属性8）</p>
            </div>
            <div>
              <p className="font-semibold text-violet-700 mb-0.5">例：17日生まれ</p>
              <p>1+7 = 8 → 鉄（属性8）</p>
            </div>
            <div>
              <p className="font-semibold text-violet-700 mb-0.5">例：11日生まれ</p>
              <p>11 → そのまま → 星（属性11）</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            ※ライフパス（恐竜タイプ）は生年月日全体の計算、属性は「日」だけの計算です。図鑑の
            <Link href="/dinosaur-guide#how" className="text-violet-700 font-medium hover:underline">
              恐竜占いの仕組み
            </Link>
            もあわせてどうぞ。
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {ELEMENT_NUMBERS.map((n) => {
              const el = ELEMENT_DATA[n];
              return (
                <li
                  key={n}
                  className="flex items-start gap-2 rounded-xl bg-white/80 border border-violet-100 px-3 py-2"
                >
                  <span className="text-lg shrink-0">{el.emoji}</span>
                  <span>
                    <span className="font-bold text-violet-900">{el.name}</span>
                    <span className="text-gray-500"> — {el.talent}</span>
                  </span>
                </li>
              );
            })}
          </ul>
          <Link
            href="/dinosaur-fortune"
            className="block text-center text-violet-700 text-sm font-semibold hover:underline"
          >
            🦖 恐竜占いで診断する →
          </Link>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 drop-shadow-md">
            <span>🦖</span> 基本の9タイプ
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {NUMBERS.map((n) => (
              <Link
                key={n.num}
                href={`/dinosaur-guide/${n.num}`}
                className={`block rounded-2xl border-2 ${n.border} bg-gradient-to-br ${n.color} p-4 hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all`}
              >
                <div className="flex items-center gap-3">
                  {DINOSAUR_DATA[n.num].image ? (
                    <Image src={DINOSAUR_DATA[n.num].image!} alt={n.name} width={48} height={48} className="object-contain" />
                  ) : (
                    <div className="text-3xl">{n.emoji}</div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-gray-800">{n.name}</p>
                  </div>
                  <span className="text-gray-400 text-sm shrink-0">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 drop-shadow-md">
            <span>⚡</span> レアタイプ（マスター恐竜）
          </h2>
          <div className="space-y-3">
            {MASTER_NUMBERS.map((m) => (
              <Link
                key={m.num}
                href={`/dinosaur-guide/${m.num}`}
                className="block rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 p-4 hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <div className="flex items-center gap-3">
                  {DINOSAUR_DATA[m.num].image ? (
                    <Image src={DINOSAUR_DATA[m.num].image!} alt={m.name} width={48} height={48} className="object-contain" />
                  ) : (
                    <div className="text-3xl">{m.emoji}</div>
                  )}
                  <div className="flex-1 min-w-0">
                    <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                      レア
                    </span>
                    <p className="font-bold text-sm text-amber-800 mt-0.5">{m.name}</p>
                  </div>
                  <span className="text-gray-400 text-sm shrink-0">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5 text-center space-y-3">
          <div className="text-3xl">🦖</div>
          <p className="font-bold text-emerald-800">あなたの恐竜タイプを診断しよう！</p>
          <p className="text-gray-600 text-sm">生年月日を入力するだけで無料で診断できます</p>
          <Link
            href="/dinosaur-fortune"
            className="block w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-colors shadow-md"
          >
            恐竜占いを始める →
          </Link>
          <Link
            href="/lucky-number"
            className="block text-sm text-emerald-600 hover:underline mt-2"
          >
            🔢 数秘術占いも試す
          </Link>
        </section>

        <AdBanner />
        <RakutenWidget />

        <FooterLinks className="text-center pt-2" />
      </div>
    </div>
  );
}
