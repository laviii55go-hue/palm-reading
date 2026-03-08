"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const SPECIAL_LINES = [
  {
    key: "masukake",
    name: "ますかけ線",
    image: "/lines/ますかけ線.png",
    description: "感情線と頭脳線が一本につながった希少な手相",
    meaning:
      "強運の持ち主とされる特別な線。強い意志と集中力を持ち、一度決めたことをやり遂げる力があります。波乱万丈な人生を送りやすいですが、大きな成功を掴む可能性を秘めています。",
    lucky: "強運・成功運・集中力",
  },
  {
    key: "sun",
    name: "太陽線",
    image: "/lines/太陽線.png",
    description: "薬指の下に縦に走る線",
    meaning:
      "才能・名声・成功を象徴する線。この線がある人は芸術的センスや社会的な認知を得やすい傾向があります。人から注目され、輝きを放つ存在になれるサインです。",
    lucky: "名声・才能・金運",
  },
  {
    key: "buddha",
    name: "仏眼",
    image: "/lines/仏眼.png",
    description: "親指の第一関節に現れる目のような模様",
    meaning:
      "霊的な感受性が高く、直感力や第六感に優れているとされます。予知夢を見たり、人の感情を敏感に読み取ったりする力があると言われる非常に珍しい相です。",
    lucky: "直感力・霊感・守護",
  },
  {
    key: "mystic",
    name: "神秘十字",
    image: "/lines/神秘十字.png",
    description: "感情線と頭脳線の間に現れる十字の印",
    meaning:
      "神秘的な力に守られているサインとされます。危機的状況を直感で回避できる力があり、人生の転換期に不思議な助けが入ることが多いと言われています。",
    lucky: "守護・危機回避・神秘的縁",
  },
  {
    key: "mars",
    name: "火星線",
    image: "/lines/火星線.png",
    description: "生命線の内側に沿って走る線",
    meaning:
      "生命線を補強する力強い線。体力・精神力・生命力が非常に強く、困難な状況でも諦めずに立ち向かうエネルギーを持っています。健康運が高く、長寿の相とも言われます。",
    lucky: "体力・精神力・健康運",
  },
  {
    key: "double",
    name: "二重生命線",
    image: "/lines/二重生命線.png",
    description: "生命線が二本並行して走っている状態",
    meaning:
      "生命力が二重に備わっているとされる吉相。守護霊に守られているとも言われ、病気や怪我からの回復が早く、ピンチを乗り越える強さを持ちます。",
    lucky: "生命力・守護・回復力",
  },
];

export default function SpecialPage() {
  const [selected, setSelected] = useState<string | null>(null);

  const selectedLine = SPECIAL_LINES.find((l) => l.key === selected);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col items-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-6">
          <Link href="/" className="text-purple-400 text-sm hover:underline">← 手相診断に戻る</Link>
          <h1 className="text-2xl font-bold text-purple-900 mt-2">✨ 特殊手相チェッカー</h1>
          <p className="text-gray-500 text-sm mt-1">あなたの手にある？幸運の特別な手相</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
          <p className="text-sm text-gray-500 text-center">気になる手相をタップして確認しよう</p>

          <div className="grid grid-cols-2 gap-3">
            {SPECIAL_LINES.map((line) => (
              <button
                key={line.key}
                onClick={() => setSelected(selected === line.key ? null : line.key)}
                className={`rounded-2xl border-2 p-3 text-left transition-all ${
                  selected === line.key
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 bg-white hover:border-purple-300"
                }`}
              >
                <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-2 bg-purple-50">
                  <Image
                    src={line.image}
                    alt={line.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="font-bold text-sm text-purple-800">{line.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{line.description}</div>
              </button>
            ))}
          </div>

          {selectedLine && (
            <div className="rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">✨</span>
                <h2 className="text-lg font-bold text-amber-800">{selectedLine.name}</h2>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{selectedLine.meaning}</p>
              <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-amber-200">
                <span className="text-sm">🍀</span>
                <span className="text-xs text-amber-700 font-medium">ラッキーポイント：{selectedLine.lucky}</span>
              </div>
            </div>
          )}

          <div className="pt-2">
            <Link
              href="/"
              className="block w-full py-3 rounded-xl bg-purple-600 text-white font-semibold text-sm text-center hover:bg-purple-700 transition-colors"
            >
              🔮 手相診断を始める
            </Link>
          </div>
        </div>

        <div className="text-center mt-4">
          <a href="/privacy" className="text-gray-400 text-xs hover:underline">プライバシーポリシー</a>
        </div>
      </div>
    </div>
  );
}
