"use client";

import { useState, KeyboardEvent } from "react";
import Link from "next/link";
import AdBanner from "../components/AdBanner";
import RakutenWidget from "../components/RakutenWidget";

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
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col items-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-6">
          <Link href="/" className="text-indigo-400 text-sm hover:underline">← トップに戻る</Link>
          <h1 className="text-2xl font-bold text-indigo-900 mt-2">🌙 夢占い</h1>
          <p className="text-gray-500 text-sm mt-1">見た夢からメッセージを読み解きます</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
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

        <div className="text-center mt-4">
          <a href="/privacy" className="text-gray-400 text-xs hover:underline">プライバシーポリシー</a>
        </div>
      </div>
    </div>
  );
}
