"use client";

import { useState, KeyboardEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import AdBanner from "../components/AdBanner";
import RakutenWidget from "../components/RakutenWidget";
import FooterLinks from "../components/FooterLinks";

type Phase = "input" | "result";

const CATEGORIES = [
  { key: "love", label: "恋愛への影響", emoji: "💕" },
  { key: "career", label: "仕事への影響", emoji: "💼" },
  { key: "money", label: "金運への影響", emoji: "💰" },
  { key: "health", label: "健康への影響", emoji: "🌿" },
];

export default function DreamPage() {
  const [phase, setPhase] = useState<Phase>("input");
  const [dreamText, setDreamText] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [narrative, setNarrative] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categoryDetails, setCategoryDetails] = useState<Record<string, string>>({});
  const [categoryLoading, setCategoryLoading] = useState<Record<string, boolean>>({});
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const canSubmit = dreamText.trim().length > 0 || keywords.length > 0;

  const handleKeywordKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && keywordInput.trim()) {
      e.preventDefault();
      const word = keywordInput.trim();
      if (!keywords.includes(word)) {
        setKeywords((prev) => [...prev, word]);
      }
      setKeywordInput("");
    }
  };

  const removeKeyword = (word: string) => {
    setKeywords((prev) => prev.filter((k) => k !== word));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/dream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dreamText, keywords }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "API error");
      setNarrative(data.narrative);
      setPhase("result");
    } catch (e) {
      setError(e instanceof Error ? e.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryToggle = async (key: string) => {
    if (openCategory === key) {
      setOpenCategory(null);
      return;
    }
    setOpenCategory(key);
    if (categoryDetails[key]) return;

    setCategoryLoading((prev) => ({ ...prev, [key]: true }));
    try {
      const res = await fetch("/api/dream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dreamText, keywords, category: key }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCategoryDetails((prev) => ({ ...prev, [key]: data.detail }));
    } catch {
      setCategoryDetails((prev) => ({ ...prev, [key]: "取得できませんでした" }));
    } finally {
      setCategoryLoading((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleReset = () => {
    setPhase("input");
    setDreamText("");
    setKeywords([]);
    setKeywordInput("");
    setNarrative("");
    setError(null);
    setCategoryDetails({});
    setOpenCategory(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 flex flex-col items-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-indigo-300 text-sm hover:text-indigo-200 hover:underline">← トップに戻る</Link>
            <Link href="/dream-guide" className="text-indigo-300 text-xs hover:text-indigo-200 hover:underline border border-indigo-600 rounded-full px-3 py-1">📖 夢占いガイド</Link>
          </div>
          <div className="mt-4 rounded-2xl overflow-hidden shadow-lg shadow-black/30">
            <Image
              src="/dream-top.png"
              alt="夢占い"
              width={600}
              height={300}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold text-white mt-3">🌙 夢占い</h1>
          <p className="text-slate-400 text-sm mt-1">見た夢からメッセージを読み解きます</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-black/20 p-6">
          {loading ? (
            <div className="text-center py-12 space-y-3">
              <div className="text-5xl animate-pulse">🌙</div>
              <p className="text-indigo-700 font-medium">夢を読み解いています...</p>
              <p className="text-gray-400 text-xs">少々お待ちください</p>
            </div>
          ) : phase === "input" ? (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm">見た夢の内容を入力してください</p>
              </div>

              <div className="space-y-2">
                <label className="font-medium text-gray-700 text-sm">夢の内容</label>
                <textarea
                  value={dreamText}
                  onChange={(e) => setDreamText(e.target.value)}
                  placeholder="例：知らない場所で誰かに追いかけられていた。走っても走っても逃げられなくて、気がついたら海の前に立っていた..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-indigo-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none text-gray-700 placeholder-gray-300"
                />
              </div>

              <div className="space-y-2">
                <label className="font-medium text-gray-700 text-sm">
                  キーワード
                  <span className="text-gray-400 font-normal ml-2">（入力してEnterで追加）</span>
                </label>
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={handleKeywordKeyDown}
                  placeholder="例：蛇、水、知らない人..."
                  className="w-full px-4 py-2 rounded-xl border border-indigo-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {keywords.map((word) => (
                      <span
                        key={word}
                        className="flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                      >
                        {word}
                        <button
                          onClick={() => removeKeyword(word)}
                          className="text-indigo-400 hover:text-indigo-700 leading-none"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-lg disabled:opacity-40 hover:bg-indigo-700 transition-colors shadow-md"
              >
                夢を読み解く →
              </button>

              <AdBanner />

              <RakutenWidget />
            </div>
          ) : (
            <div className="space-y-5">
              <div className="text-center">
                <div className="text-4xl mb-1">🌙</div>
                <h2 className="text-xl font-bold text-indigo-800">夢からのメッセージ</h2>
                <p className="text-gray-400 text-xs mt-1">あなたの夢を読み解きました</p>
              </div>

              <div className="rounded-2xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🌙</span>
                  <span className="font-bold text-indigo-700">ひとつの物語として夢を読み解く</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{narrative}</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500 text-center">詳しく知りたい方へ</p>
                {CATEGORIES.map((cat) => (
                  <div key={cat.key} className="rounded-2xl border-2 border-gray-200 overflow-hidden">
                    <button
                      onClick={() => handleCategoryToggle(cat.key)}
                      className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{cat.emoji}</span>
                        <span className="font-semibold text-gray-700 text-sm">{cat.label}</span>
                      </div>
                      <span className="text-gray-400 text-sm">
                        {openCategory === cat.key ? "▲" : "▼"}
                      </span>
                    </button>
                    {openCategory === cat.key && (
                      <div className="px-4 pb-4 bg-gray-50">
                        {categoryLoading[cat.key] ? (
                          <p className="text-sm text-gray-400 animate-pulse">読み解いています...</p>
                        ) : (
                          <p className="text-gray-600 text-sm leading-relaxed">{categoryDetails[cat.key]}</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <AdBanner />

              <RakutenWidget />

              {(() => {
                const pageUrl = "https://jade-torte-9b5cde.netlify.app/dream";
                const tag = keywords.length > 0 ? `「${keywords.slice(0, 2).join("・")}」` : "";
                const shareText = `🌙 夢占い結果${tag}\n${narrative.slice(0, 60)}...\n\nあなたの夢も診断してみてください👇\n${pageUrl}\n#夢占い #夢診断 #占い好きな人と繋がりたい`;
                const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
                const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(shareText)}`;
                return (
                  <div className="rounded-2xl border-2 border-gray-200 bg-gray-50 p-4 space-y-3">
                    <p className="text-center text-sm font-medium text-gray-500">📣 結果をシェアする</p>
                    <div className="grid grid-cols-2 gap-3">
                      <a href={xUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-black text-white font-bold text-sm hover:bg-gray-800 transition-colors">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                        X でシェア
                      </a>
                      <a href={lineUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#06C755] text-white font-bold text-sm hover:bg-[#05b34c] transition-colors">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.630 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" /></svg>
                        LINE でシェア
                      </a>
                    </div>
                  </div>
                );
              })()}

              <button
                onClick={handleReset}
                className="w-full py-3 rounded-xl border-2 border-indigo-300 text-indigo-700 font-semibold hover:bg-indigo-50 transition-colors"
              >
                別の夢を占う
              </button>

              <Link
                href="/"
                className="block w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm text-center hover:bg-indigo-700 transition-colors"
              >
                🔮 手相診断を始める
              </Link>
            </div>
          )}
        </div>

        <FooterLinks className="text-center mt-4" linkClassName="text-slate-500 text-xs hover:text-slate-400 hover:underline" />
      </div>
    </div>
  );
}
