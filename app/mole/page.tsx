"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MOLE_AREAS } from "../data/moleAreas";

type Phase = "select" | "detail" | "result";

interface MoleResult {
  title: string;
  meaning: string;
  luck: string;
  advice: string;
  lucky: string;
  score: number;
}

function Stars({ score }: { score: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`text-lg ${i <= score ? "opacity-100" : "opacity-20"}`}>⭐</span>
      ))}
    </div>
  );
}

export default function MolePage() {
  const [phase, setPhase] = useState<Phase>("select");
  const [areaNumber, setAreaNumber] = useState<number | null>(null);
  const [hand, setHand] = useState("");
  const [handOther, setHandOther] = useState("");
  const [size, setSize] = useState("");
  const [sizeOther, setSizeOther] = useState("");
  const [color, setColor] = useState("");
  const [colorOther, setColorOther] = useState("");
  const [result, setResult] = useState<MoleResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedArea = MOLE_AREAS.find((a) => a.number === areaNumber);
  const isDetailComplete =
    !!hand &&
    !!size &&
    !!color &&
    (hand !== "other" || handOther.trim().length > 0) &&
    (size !== "other" || sizeOther.trim().length > 0) &&
    (color !== "other" || colorOther.trim().length > 0);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const handValue = hand === "other" ? handOther.trim() || "その他" : hand;
      const sizeValue = size === "other" ? sizeOther.trim() || "その他" : size;
      const colorValue = color === "other" ? colorOther.trim() || "その他" : color;
      const res = await fetch("/api/mole", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ areaNumber, hand: handValue, size: sizeValue, color: colorValue }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "API error");
      setResult(data.result);
      setPhase("result");
    } catch (e) {
      setError(e instanceof Error ? e.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPhase("select");
    setAreaNumber(null);
    setHand("");
    setHandOther("");
    setSize("");
    setSizeOther("");
    setColor("");
    setColorOther("");
    setResult(null);
    setError(null);
  };

  const OptionButton = ({
    value,
    current,
    label,
    onClick,
  }: {
    value: string;
    current: string;
    label: string;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full border text-sm transition-colors ${
        current === value
          ? "bg-purple-600 text-white border-purple-600"
          : "bg-white text-gray-600 border-gray-300 hover:border-purple-400"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col items-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-6">
          <Link href="/" className="text-purple-400 text-sm hover:underline">← トップに戻る</Link>
          <h1 className="text-2xl font-bold text-purple-900 mt-2">🔵 手のほくろ占い</h1>
          <p className="text-gray-500 text-sm mt-1">ほくろの位置から運勢を鑑定します</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          {loading ? (
            <div className="text-center py-12 space-y-3">
              <div className="text-5xl animate-pulse">🔵</div>
              <p className="text-purple-700 font-medium">鑑定中です...</p>
              <p className="text-gray-400 text-xs">少々お待ちください</p>
            </div>
          ) : phase === "select" ? (
            <div className="space-y-5">
              <div className="text-center">
                <p className="text-gray-600 text-sm">ほくろがある位置の番号を選んでください</p>
              </div>

              <div className="flex justify-center">
                <div className="relative w-full max-w-xs rounded-xl overflow-hidden border border-purple-100 bg-white">
                  <Image
                    src="/lines/ほくろ.png"
                    alt="手のほくろエリア図"
                    width={400}
                    height={400}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>

              <div>
                <p className="font-medium text-gray-700 mb-3">番号を選んでください</p>
                <div className="grid grid-cols-7 gap-2">
                  {MOLE_AREAS.map((area) => (
                    <button
                      key={area.number}
                      onClick={() => setAreaNumber(area.number)}
                      className={`aspect-square rounded-xl text-sm font-bold transition-colors ${
                        areaNumber === area.number
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-purple-100"
                      }`}
                    >
                      {area.number}
                    </button>
                  ))}
                </div>
              </div>

              {selectedArea && (
                <div className="bg-purple-50 rounded-xl px-4 py-3 text-sm text-purple-700">
                  <span className="font-bold">選択中：</span>{selectedArea.label}（{selectedArea.description}）
                </div>
              )}

              <button
                onClick={() => setPhase("detail")}
                disabled={!areaNumber}
                className="w-full py-3 rounded-xl bg-purple-600 text-white font-bold text-lg disabled:opacity-40 hover:bg-purple-700 transition-colors shadow-md"
              >
                次へ →
              </button>
            </div>
          ) : phase === "detail" ? (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-lg font-bold text-purple-800">ほくろの特徴を教えてください</h2>
                {selectedArea && (
                  <p className="text-sm text-purple-500 mt-1">📍 {selectedArea.label}</p>
                )}
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <p className="font-medium text-gray-700">どちらの手ですか？</p>
                  <div className="flex flex-wrap gap-2">
                    <OptionButton value="right" current={hand} label="右手" onClick={() => setHand("right")} />
                    <OptionButton value="left" current={hand} label="左手" onClick={() => setHand("left")} />
                    <OptionButton value="both" current={hand} label="両手" onClick={() => setHand("both")} />
                    <OptionButton value="other" current={hand} label="その他" onClick={() => setHand("other")} />
                  </div>
                  {hand === "other" && (
                    <input
                      type="text"
                      value={handOther}
                      onChange={(e) => setHandOther(e.target.value)}
                      placeholder="例：利き手と逆のほう など"
                      className="w-full mt-2 px-4 py-2 rounded-xl border border-purple-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <p className="font-medium text-gray-700">ほくろの大きさは？</p>
                  <div className="flex flex-wrap gap-2">
                    <OptionButton value="large" current={size} label="大きめ" onClick={() => setSize("large")} />
                    <OptionButton value="small" current={size} label="小さめ" onClick={() => setSize("small")} />
                    <OptionButton value="other" current={size} label="その他" onClick={() => setSize("other")} />
                  </div>
                  {size === "other" && (
                    <input
                      type="text"
                      value={sizeOther}
                      onChange={(e) => setSizeOther(e.target.value)}
                      placeholder="例：かなり小さい点が複数 など"
                      className="w-full mt-2 px-4 py-2 rounded-xl border border-purple-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <p className="font-medium text-gray-700">ほくろの色は？</p>
                  <div className="flex flex-wrap gap-2">
                    <OptionButton value="black" current={color} label="黒" onClick={() => setColor("black")} />
                    <OptionButton value="dark" current={color} label="濃い茶色" onClick={() => setColor("dark")} />
                    <OptionButton value="light" current={color} label="薄い茶色" onClick={() => setColor("light")} />
                    <OptionButton value="other" current={color} label="その他" onClick={() => setColor("other")} />
                  </div>
                  {color === "other" && (
                    <input
                      type="text"
                      value={colorOther}
                      onChange={(e) => setColorOther(e.target.value)}
                      placeholder="例：赤みがかった茶色 など"
                      className="w-full mt-2 px-4 py-2 rounded-xl border border-purple-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  )}
                </div>
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setPhase("select")}
                  className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  戻る
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!isDetailComplete}
                  className="px-6 py-2 rounded-lg bg-purple-600 text-white font-semibold disabled:opacity-40 hover:bg-purple-700 transition-colors"
                >
                  鑑定する
                </button>
              </div>
            </div>
          ) : phase === "result" && result ? (
            <div className="space-y-5">
              <div className="text-center">
                <div className="text-4xl mb-1">🔵</div>
                <h2 className="text-xl font-bold text-purple-800">{result.title}</h2>
                <p className="text-gray-400 text-xs mt-1">
                  {selectedArea?.label}のほくろから読み取りました
                </p>
              </div>

              <div className="flex justify-center">
                <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl px-6 py-3 flex items-center gap-3">
                  <span className="text-sm font-bold text-amber-700">吉凶度</span>
                  <Stars score={result.score} />
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🔵</span>
                    <span className="font-bold text-purple-700 text-sm">ほくろの意味</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{result.meaning}</p>
                </div>

                <div className="rounded-2xl border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-rose-50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">💫</span>
                    <span className="font-bold text-pink-700 text-sm">運勢への影響</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{result.luck}</p>
                </div>

                <div className="rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🔮</span>
                    <span className="font-bold text-amber-700 text-sm">アドバイス</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{result.advice}</p>
                </div>

                <div className="rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-4 flex items-center gap-3">
                  <span className="text-2xl">🍀</span>
                  <div>
                    <div className="font-bold text-green-700 text-sm">ラッキーポイント</div>
                    <div className="text-gray-600 text-sm mt-0.5">{result.lucky}</div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-3 rounded-xl border-2 border-purple-300 text-purple-700 font-semibold hover:bg-purple-50 transition-colors"
              >
                別のほくろを占う
              </button>

              <Link
                href="/"
                className="block w-full py-3 rounded-xl bg-purple-600 text-white font-semibold text-sm text-center hover:bg-purple-700 transition-colors"
              >
                🔮 手相診断を始める
              </Link>
            </div>
          ) : null}
        </div>

        <div className="text-center mt-4">
          <a href="/privacy" className="text-gray-400 text-xs hover:underline">プライバシーポリシー</a>
        </div>
      </div>
    </div>
  );
}
