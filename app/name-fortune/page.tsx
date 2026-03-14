"use client";

import { useState } from "react";
import Link from "next/link";
import AdBanner from "../components/AdBanner";
import RakutenWidget from "../components/RakutenWidget";
import FooterLinks from "../components/FooterLinks";
import { GAKU_LABELS } from "../data/nameFortuneData";

type Phase = "input" | "result";

type GakuResult = {
  key: string;
  name: string;
  value: number;
  fortune: { level: string; label: string };
};

type ApiResult = {
  input: { surname: string; givenName: string };
  strokes: { surname: number[]; givenName: number[] };
  gaku: GakuResult[];
};

const ROW_H = 48;
const CHAR_W = 44;

function NameDiagramResult({ result }: { result: ApiResult }) {
  const chars = [...result.input.surname, ...result.input.givenName];
  const strokes = [...result.strokes.surname, ...result.strokes.givenName];
  const n = chars.length;
  const surnameLen = result.input.surname.length;

  const soukaku = result.gaku.find((g) => g.key === "soukaku");
  const tenkaku = result.gaku.find((g) => g.key === "tenkaku");
  const jinkaku = result.gaku.find((g) => g.key === "jinkaku");
  const chikaku = result.gaku.find((g) => g.key === "chikaku");
  const gaikaku = result.gaku.find((g) => g.key === "gaikaku");

  const totalH = n * ROW_H;
  const pad = 8;
  const lineX = 100;

  // 各格の縦位置（行の中心）
  const tenkakuY = pad + ROW_H * (surnameLen - 1) / 2 + ROW_H / 2;
  const boundaryY = pad + ROW_H * surnameLen;
  const chikakuY = pad + ROW_H * (surnameLen + (n - surnameLen - 1) / 2) + ROW_H / 2;
  const gaikakuY = n === 1 ? pad + totalH / 2 : boundaryY;

  return (
    <div className="flex justify-center overflow-x-auto py-4">
      <div
        className="relative flex items-start"
        style={{ minWidth: 240 }}
      >
        {/* 左：総格＋縦線 */}
        <div
          className="flex flex-col justify-center shrink-0 pr-2"
          style={{ height: totalH + pad * 2 }}
        >
          <span className="text-sm font-bold text-cyan-700">
            総格 {soukaku?.value}
          </span>
        </div>

        {/* 中央：SVG線＋名前 */}
        <div className="relative shrink-0" style={{ width: lineX + 90 }}>
          <svg
            width={lineX + 90}
            height={totalH + pad * 2}
            className="absolute left-0 top-0 pointer-events-none"
          >
            {/* 総格の縦線（全文字を囲む） */}
            <line
              x1={lineX - 4}
              y1={pad}
              x2={lineX - 4}
              y2={totalH + pad}
              stroke="#94a3b8"
              strokeWidth="1"
            />
            <line
              x1={lineX - 4}
              y1={pad}
              x2={lineX}
              y2={pad}
              stroke="#94a3b8"
              strokeWidth="1"
            />
            <line
              x1={lineX - 4}
              y1={totalH + pad}
              x2={lineX}
              y2={totalH + pad}
              stroke="#94a3b8"
              strokeWidth="1"
            />

            {/* 天格の括弧（姓の範囲） */}
            {surnameLen >= 1 && (
              <>
                <line
                  x1={lineX + 20}
                  y1={pad + ROW_H * 0.5}
                  x2={lineX + 20}
                  y2={pad + ROW_H * (surnameLen - 0.5)}
                  stroke="#94a3b8"
                  strokeWidth="1"
                />
                <line
                  x1={lineX + 20}
                  y1={pad + ROW_H * 0.5}
                  x2={lineX + 24}
                  y2={pad + ROW_H * 0.5}
                  stroke="#94a3b8"
                  strokeWidth="1"
                />
                <line
                  x1={lineX + 20}
                  y1={pad + ROW_H * (surnameLen - 0.5)}
                  x2={lineX + 24}
                  y2={pad + ROW_H * (surnameLen - 0.5)}
                  stroke="#94a3b8"
                  strokeWidth="1"
                />
              </>
            )}

            {/* 人格の括弧（姓の最後＋名の最初） */}
            {surnameLen >= 1 && n >= 2 && (
              <>
                <line
                  x1={lineX + 20}
                  y1={pad + ROW_H * (surnameLen - 0.5)}
                  x2={lineX + 20}
                  y2={pad + ROW_H * (surnameLen + 0.5)}
                  stroke="#94a3b8"
                  strokeWidth="1"
                />
                <line
                  x1={lineX + 20}
                  y1={pad + ROW_H * (surnameLen - 0.5)}
                  x2={lineX + 24}
                  y2={pad + ROW_H * (surnameLen - 0.5)}
                  stroke="#94a3b8"
                  strokeWidth="1"
                />
                <line
                  x1={lineX + 20}
                  y1={pad + ROW_H * (surnameLen + 0.5)}
                  x2={lineX + 24}
                  y2={pad + ROW_H * (surnameLen + 0.5)}
                  stroke="#94a3b8"
                  strokeWidth="1"
                />
              </>
            )}

            {/* 地格の括弧（名の範囲） */}
            {surnameLen < n && (
              <>
                <line
                  x1={lineX + 20}
                  y1={pad + ROW_H * (surnameLen + 0.5)}
                  x2={lineX + 20}
                  y2={pad + ROW_H * (n - 0.5)}
                  stroke="#94a3b8"
                  strokeWidth="1"
                />
                <line
                  x1={lineX + 20}
                  y1={pad + ROW_H * (surnameLen + 0.5)}
                  x2={lineX + 24}
                  y2={pad + ROW_H * (surnameLen + 0.5)}
                  stroke="#94a3b8"
                  strokeWidth="1"
                />
                <line
                  x1={lineX + 20}
                  y1={pad + ROW_H * (n - 0.5)}
                  x2={lineX + 24}
                  y2={pad + ROW_H * (n - 0.5)}
                  stroke="#94a3b8"
                  strokeWidth="1"
                />
              </>
            )}
          </svg>

          <div
            className="flex flex-col pl-4"
            style={{ paddingTop: pad, paddingBottom: pad }}
          >
            {chars.map((char, i) => (
              <div
                key={i}
                className="flex items-center gap-2 shrink-0"
                style={{ height: ROW_H, minHeight: ROW_H }}
              >
                <span
                  className="text-xl font-bold text-cyan-800 text-center"
                  style={{ width: CHAR_W }}
                >
                  {char}
                </span>
                <span className="text-xs text-gray-500 tabular-nums">
                  {strokes[i]}画
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 右：天格・外格・人格・地格（括弧の横に配置、外格は強調） */}
        <div
          className="relative shrink-0 pl-1"
          style={{ width: 72, height: totalH + pad * 2 }}
        >
          {surnameLen >= 1 && (
            <div
              className="absolute text-xs font-medium text-gray-500"
              style={{ left: 0, top: tenkakuY - 7 }}
            >
              天格 {tenkaku?.value}
            </div>
          )}
          <div
            className="absolute text-xs font-bold text-cyan-600"
            style={{ left: 0, top: gaikakuY - 14 }}
          >
            外格 {gaikaku?.value}
          </div>
          {surnameLen >= 1 && n >= 2 && (
            <div
              className="absolute text-xs font-medium text-gray-500"
              style={{ left: 0, top: boundaryY + 10 }}
            >
              人格 {jinkaku?.value}
            </div>
          )}
          {surnameLen < n && (
            <div
              className="absolute text-xs font-medium text-gray-500"
              style={{ left: 0, top: chikakuY - 7 }}
            >
              地格 {chikaku?.value}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const FORTUNE_COLORS: Record<string, string> = {
  "max-good": "border-emerald-400 bg-emerald-50 text-emerald-800",
  good: "border-green-400 bg-green-50 text-green-800",
  neutral: "border-sky-400 bg-sky-50 text-sky-800",
  bad: "border-amber-400 bg-amber-50 text-amber-800",
  "max-bad": "border-red-400 bg-red-50 text-red-800",
};

export default function NameFortunePage() {
  const [phase, setPhase] = useState<Phase>("input");
  const [surname, setSurname] = useState("");
  const [givenName, setGivenName] = useState("");
  const [result, setResult] = useState<ApiResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/name-fortune", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          surname: surname.trim(),
          givenName: givenName.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "エラーが発生しました");
        return;
      }
      setResult(data);
      setPhase("result");
    } catch {
      setError("エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPhase("input");
    setSurname("");
    setGivenName("");
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-cyan-600 text-sm hover:underline">
            ← トップに戻る
          </Link>
          <Link
            href="/name-fortune-guide"
            className="text-cyan-600 text-xs hover:underline border border-cyan-300 rounded-full px-3 py-1"
          >
            📖 ガイド
          </Link>
        </div>

        <div className="text-center space-y-2">
          <div className="text-5xl">✍️</div>
          <h1 className="text-2xl font-bold text-cyan-800">姓名判断</h1>
          <p className="text-gray-500 text-sm">
            名前の画数から五格・運勢を診断
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-cyan-100 p-6">
          {phase === "input" ? (
            <div className="space-y-6">
              <p className="text-center text-gray-600 text-sm">
                姓と名を漢字またはひらがなで入力してください
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    姓（苗字）
                  </label>
                  <input
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder="例：山田"
                    className="w-full px-4 py-3 rounded-xl border-2 border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    名
                  </label>
                  <input
                    type="text"
                    value={givenName}
                    onChange={(e) => setGivenName(e.target.value)}
                    placeholder="例：太郎"
                    className="w-full px-4 py-3 rounded-xl border-2 border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-800"
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                onClick={handleSubmit}
                disabled={!surname.trim() || !givenName.trim() || loading}
                className="w-full py-3 rounded-xl bg-cyan-600 text-white font-bold text-lg disabled:opacity-40 hover:bg-cyan-700 transition-colors"
              >
                {loading ? "診断中..." : "姓名判断する →"}
              </button>

              <p className="text-xs text-gray-400 text-center">
                漢字・ひらがな・カタカナに対応。約13,000字の漢字データベースを使用しています。
              </p>
            </div>
          ) : result ? (
            <div className="space-y-6">
              {/* 図解版：縦書き＋括弧で五格を視覚化 */}
              <NameDiagramResult result={result} />

              {/* 五格の運勢（詳細） */}
              <div className="space-y-3">
                <p className="font-bold text-cyan-700 text-sm">五格の運勢</p>
                {result.gaku.map((g) => {
                  const info = GAKU_LABELS[g.key as keyof typeof GAKU_LABELS];
                  const colorClass =
                    FORTUNE_COLORS[g.fortune.level] || "border-gray-200 bg-gray-50";
                  return (
                    <div
                      key={g.key}
                      className={`rounded-2xl border-2 p-4 ${colorClass}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold">{g.name}</span>
                        <span className="text-lg font-black">
                          {g.value}画　{g.fortune.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">{info?.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* 注釈 */}
              <div className="space-y-2">
                <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-800">
                  💡 姓名判断には流派があります。本サイトは康熙字典式の画数に基づく一般的な判定です。参考としてお楽しみください。
                </div>
                <p className="text-xs text-gray-500 text-center">
                  外格は「総格 − 人格 ＋ 1」で算出しています。（流派により計算方法が異なります）
                </p>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-3 rounded-xl border-2 border-cyan-200 text-cyan-600 font-semibold hover:bg-cyan-50 transition-colors"
              >
                別の名前で診断する
              </button>

              <Link
                href="/name-fortune-guide"
                className="block w-full py-3 rounded-xl bg-cyan-600 text-white font-semibold text-center hover:bg-cyan-700 transition-colors"
              >
                📖 姓名判断の基本知識を読む
              </Link>
            </div>
          ) : null}
        </div>

        <AdBanner />
        <RakutenWidget />
        <FooterLinks className="text-center" />
      </div>
    </div>
  );
}
