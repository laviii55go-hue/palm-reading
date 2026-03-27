"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import type { CollectionEntry } from "../lib/collectionStorage";
import { DINOSAUR_DATA } from "../data/dinosaurData";
import { ELEMENT_DATA, mergeDinosaurStats } from "../data/dinosaurElementData";
import {
  BATTLE_FIELDS,
  BATTLE_CONTESTS,
  calculateBattleScoreDetailed,
  getWinReasonText,
  getDetailedWinReasonText,
  STAT_LABEL,
  type BattleField,
  type BattleContest,
  type BattleScoreDetail,
} from "../data/battleData";
import { getDinosaurImagePath } from "../data/dinosaurCharacterAssets";
import ConfettiEffect from "./ConfettiEffect";
import SmokeEffect from "./SmokeEffect";
import VictoryEffect from "./VictoryEffect";

type BattlePhase =
  | "select"
  | "field-roulette"
  | "contest-roulette"
  | "battle"
  | "result";

type DinosaurBattleProps = {
  collection: CollectionEntry[];
  onBack: () => void;
};

const PAGE_URL = "https://jade-torte-9b5cde.netlify.app/dinosaur-fortune";

export default function DinosaurBattle({ collection, onBack }: DinosaurBattleProps) {
  const [phase, setPhase] = useState<BattlePhase>("select");
  const [selectedDinos, setSelectedDinos] = useState<[CollectionEntry | null, CollectionEntry | null]>([null, null]);
  const [field, setField] = useState<BattleField | null>(null);
  const [contest, setContest] = useState<BattleContest | null>(null);
  const [winner, setWinner] = useState<"left" | "right" | null>(null);
  const [scores, setScores] = useState<[number, number]>([0, 0]);
  const [scoreDetails, setScoreDetails] = useState<[BattleScoreDetail | null, BattleScoreDetail | null]>([null, null]);
  const [winReason, setWinReason] = useState("");
  const [detailedWinReason, setDetailedWinReason] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [rouletteIndex, setRouletteIndex] = useState(0);
  const [rouletteStopped, setRouletteStopped] = useState(false);
  const [smokeActive, setSmokeActive] = useState(false);
  const [smokeGone, setSmokeGone] = useState(false);
  const [imgErrorMap, setImgErrorMap] = useState<Record<string, boolean>>({});
  const [fieldBgError, setFieldBgError] = useState(false);
  const rouletteInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // --- 選択 ---
  const handleSelect = useCallback((entry: CollectionEntry) => {
    setSelectedDinos((prev) => {
      if (prev[0] === null) return [entry, null];
      if (prev[1] === null) return [prev[0], entry];
      return prev;
    });
  }, []);

  const handleDeselect = useCallback((slot: 0 | 1) => {
    setSelectedDinos((prev) => {
      const next: [CollectionEntry | null, CollectionEntry | null] = [...prev];
      next[slot] = null;
      return next;
    });
  }, []);

  const canBattle = selectedDinos[0] !== null && selectedDinos[1] !== null;

  // --- バトル開始 ---
  const startBattle = useCallback(() => {
    if (!canBattle) return;
    setPhase("field-roulette");
    setWinner(null);
    setScores([0, 0]);
    setWinReason("");
    setSmokeGone(false);
    setFieldBgError(false);
  }, [canBattle]);

  // --- フィールドルーレット ---
  useEffect(() => {
    if (phase !== "field-roulette") return;
    setRouletteStopped(false);
    setShowConfetti(false);

    const targetIndex = Math.floor(Math.random() * BATTLE_FIELDS.length);
    let speed = 80;
    let tick = 0;
    const totalTicks = 14 + Math.floor(Math.random() * 6);

    const run = () => {
      rouletteInterval.current = setTimeout(() => {
        tick++;
        setRouletteIndex((prev) => (prev + 1) % BATTLE_FIELDS.length);

        if (tick >= totalTicks) {
          setRouletteIndex(targetIndex);
          setField(BATTLE_FIELDS[targetIndex]);
          setRouletteStopped(true);
          setShowConfetti(true);
          setTimeout(() => {
            setShowConfetti(false);
            setPhase("contest-roulette");
          }, 1800);
          return;
        }

        speed = 80 + (tick / totalTicks) * 200;
        run();
      }, speed);
    };
    run();

    return () => {
      if (rouletteInterval.current) clearTimeout(rouletteInterval.current);
    };
  }, [phase]);

  // --- 競技ルーレット ---
  useEffect(() => {
    if (phase !== "contest-roulette") return;
    setRouletteStopped(false);
    setShowConfetti(false);

    const targetIndex = Math.floor(Math.random() * BATTLE_CONTESTS.length);
    let speed = 80;
    let tick = 0;
    const totalTicks = 12 + Math.floor(Math.random() * 6);

    const run = () => {
      rouletteInterval.current = setTimeout(() => {
        tick++;
        setRouletteIndex((prev) => (prev + 1) % BATTLE_CONTESTS.length);

        if (tick >= totalTicks) {
          setRouletteIndex(targetIndex);
          setContest(BATTLE_CONTESTS[targetIndex]);
          setRouletteStopped(true);
          setShowConfetti(true);
          setTimeout(() => {
            setShowConfetti(false);
            setPhase("battle");
          }, 1800);
          return;
        }

        speed = 80 + (tick / totalTicks) * 200;
        run();
      }, speed);
    };
    run();

    return () => {
      if (rouletteInterval.current) clearTimeout(rouletteInterval.current);
    };
  }, [phase]);

  // --- バトル演出（phaseのみ依存 — 1回だけ実行） ---
  const battleRanRef = useRef(false);
  useEffect(() => {
    if (phase !== "battle") {
      battleRanRef.current = false;
      return;
    }
    if (battleRanRef.current) return;
    battleRanRef.current = true;

    if (!field || !contest || !selectedDinos[0] || !selectedDinos[1]) return;

    // 煙は突進がぶつかるタイミング（0.5s後）に発生
    setSmokeActive(false);
    const smokeTimer = setTimeout(() => setSmokeActive(true), 500);

    const left = selectedDinos[0];
    const right = selectedDinos[1];

    const leftDino = DINOSAUR_DATA[left.dinoNumber];
    const rightDino = DINOSAUR_DATA[right.dinoNumber];
    const leftElement = ELEMENT_DATA[left.elementNumber];
    const rightElement = ELEMENT_DATA[right.elementNumber];

    if (!leftDino || !rightDino || !leftElement || !rightElement) return;

    const leftStats = mergeDinosaurStats(leftDino.baseStats, leftElement.statBonus);
    const rightStats = mergeDinosaurStats(rightDino.baseStats, rightElement.statBonus);

    const leftDetail = calculateBattleScoreDetailed(leftStats, left.elementNumber, field, contest);
    const rightDetail = calculateBattleScoreDetailed(rightStats, right.elementNumber, field, contest);

    const w = leftDetail.totalScore >= rightDetail.totalScore ? "left" : "right";
    const winnerEntry = w === "left" ? left : right;
    const winnerDino = w === "left" ? leftDino : rightDino;
    const winnerDetail = w === "left" ? leftDetail : rightDetail;
    const loserDetail = w === "left" ? rightDetail : leftDetail;
    const wasAdvantage = field.advantageElement.includes(winnerEntry.elementNumber);
    const winnerElementName = ELEMENT_DATA[winnerEntry.elementNumber]?.name ?? "";

    const winnerDisplayName = winnerEntry.nickname
      ? `${winnerEntry.nickname}の${winnerDino.name}`
      : `${winnerElementName}の${winnerDino.name}`;

    setScores([
      Math.round(leftDetail.totalScore * 10) / 10,
      Math.round(rightDetail.totalScore * 10) / 10,
    ]);
    setScoreDetails([leftDetail, rightDetail]);
    setWinner(w);
    setWinReason(getWinReasonText(winnerDisplayName, field, contest, wasAdvantage));
    setDetailedWinReason(
      getDetailedWinReasonText(winnerDisplayName, winnerDetail, loserDetail, field, contest, winnerElementName)
    );

    const resultTimer = setTimeout(() => {
      setSmokeActive(false);
      setPhase("result");
    }, 4000);

    return () => {
      clearTimeout(smokeTimer);
      clearTimeout(resultTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // --- 結果時の紙吹雪 ---
  useEffect(() => {
    if (phase !== "result") return;
    const t = setTimeout(() => setShowConfetti(true), 800);
    return () => clearTimeout(t);
  }, [phase]);

  // --- リセット ---
  const resetBattle = useCallback(() => {
    setPhase("select");
    setSelectedDinos([null, null]);
    setField(null);
    setContest(null);
    setWinner(null);
    setScores([0, 0]);
    setScoreDetails([null, null]);
    setWinReason("");
    setDetailedWinReason("");
    setShowConfetti(false);
    setSmokeActive(false);
    setSmokeGone(false);
    setFieldBgError(false);
  }, []);

  // --- ヘルパー ---
  const getDisplayName = (entry: CollectionEntry) => {
    const dino = DINOSAUR_DATA[entry.dinoNumber];
    const element = ELEMENT_DATA[entry.elementNumber];
    if (!dino || !element) return "???";
    return entry.nickname
      ? `${entry.nickname}の${dino.name}`
      : `${element.name}の${dino.name}`;
  };

  const getShortName = (entry: CollectionEntry) => {
    const dino = DINOSAUR_DATA[entry.dinoNumber];
    const element = ELEMENT_DATA[entry.elementNumber];
    return `${element?.name ?? ""}の${dino?.name ?? "???"}`;
  };

  const handleImgError = (key: string) => {
    setImgErrorMap((prev) => ({ ...prev, [key]: true }));
  };

  const getDinoImage = (entry: CollectionEntry, emotion: "normal" | "happy" | "sad" = "normal") => {
    const emotionKey = `${entry.dinoNumber}-${emotion}`;
    if (emotion !== "normal" && imgErrorMap[emotionKey]) {
      return getDinosaurImagePath(entry.dinoNumber, "normal");
    }
    return getDinosaurImagePath(entry.dinoNumber, emotion);
  };

  // --- シェアテキスト ---
  const buildShareText = () => {
    if (!selectedDinos[0] || !selectedDinos[1] || !field || !contest) return "";
    const left = getShortName(selectedDinos[0]);
    const right = getShortName(selectedDinos[1]);
    return `【恐竜バトル】${left} vs ${right} — ${field.name}で${contest.name}！勝ったのは…！ #恐竜数秘術 #恐竜占い`;
  };

  // --- フィールド背景画像レンダー ---
  const renderFieldBg = (f: BattleField | null, fadeIn = false) => {
    if (!f || !f.bgImage || fieldBgError) return null;
    return (
      <div
        className="absolute inset-0 rounded-xl overflow-hidden z-0"
        style={fadeIn ? { animation: "fade-in 0.5s ease-out forwards" } : undefined}
      >
        <Image
          src={f.bgImage}
          alt={f.name}
          fill
          className="object-cover"
          onError={() => setFieldBgError(true)}
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
    );
  };

  // ============ RENDER ============

  // --- 選択画面 ---
  if (phase === "select") {
    return (
      <div className="space-y-4">
        <button
          onClick={onBack}
          className="text-sm text-emerald-600 font-semibold hover:underline"
        >
          ← 図鑑にもどる
        </button>

        <h2 className="text-center font-bold text-lg text-gray-800">
          ⚔ バトルする恐竜を2匹えらぼう！
        </h2>

        {/* 選択スロット: 左 — VS — 右 */}
        <div className="flex items-center justify-around gap-1">
          {/* 1匹目（左） */}
          {(() => {
            const entry = selectedDinos[0];
            const dino = entry ? DINOSAUR_DATA[entry.dinoNumber] : null;
            const element = entry ? ELEMENT_DATA[entry.elementNumber] : null;
            return (
              <div className="flex flex-col items-center flex-1 min-w-0">
                <div
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 flex items-center justify-center overflow-hidden ${
                    entry
                      ? "border-emerald-400 bg-gradient-to-br " + (element?.bgGradient ?? "from-gray-100 to-gray-200")
                      : "border-dashed border-gray-300 bg-gray-50"
                  }`}
                >
                  {entry && dino ? (
                    dino.image ? (
                      <Image src={dino.image} alt={dino.name} width={56} height={56} className="object-contain" />
                    ) : (
                      <span className="text-3xl">{dino.emoji}</span>
                    )
                  ) : (
                    <span className="text-2xl text-gray-300">？</span>
                  )}
                </div>
                {entry ? (
                  <>
                    <button
                      onClick={() => handleDeselect(0)}
                      className="mt-1 text-[10px] text-red-500 hover:underline"
                    >
                      ✕ はずす
                    </button>
                    <p className="text-[11px] font-bold text-gray-700 text-center mt-0.5 max-w-20 sm:max-w-24 truncate">
                      {getDisplayName(entry)}
                    </p>
                  </>
                ) : (
                  <p className="mt-1 text-[10px] text-gray-400 text-center">1匹目を<br />えらぼう</p>
                )}
              </div>
            );
          })()}

          {/* VS */}
          <div className="text-2xl font-black text-amber-500 shrink-0 px-1">VS</div>

          {/* 2匹目（右） */}
          {(() => {
            const entry = selectedDinos[1];
            const dino = entry ? DINOSAUR_DATA[entry.dinoNumber] : null;
            const element = entry ? ELEMENT_DATA[entry.elementNumber] : null;
            return (
              <div className="flex flex-col items-center flex-1 min-w-0">
                <div
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 flex items-center justify-center overflow-hidden ${
                    entry
                      ? "border-emerald-400 bg-gradient-to-br " + (element?.bgGradient ?? "from-gray-100 to-gray-200")
                      : "border-dashed border-gray-300 bg-gray-50"
                  }`}
                >
                  {entry && dino ? (
                    dino.image ? (
                      <Image src={dino.image} alt={dino.name} width={56} height={56} className="object-contain" />
                    ) : (
                      <span className="text-3xl">{dino.emoji}</span>
                    )
                  ) : (
                    <span className="text-2xl text-gray-300">？</span>
                  )}
                </div>
                {entry ? (
                  <>
                    <button
                      onClick={() => handleDeselect(1)}
                      className="mt-1 text-[10px] text-red-500 hover:underline"
                    >
                      ✕ はずす
                    </button>
                    <p className="text-[11px] font-bold text-gray-700 text-center mt-0.5 max-w-20 sm:max-w-24 truncate">
                      {getDisplayName(entry)}
                    </p>
                  </>
                ) : (
                  <p className="mt-1 text-[10px] text-gray-400 text-center">2匹目を<br />えらぼう</p>
                )}
              </div>
            );
          })()}
        </div>

        {/* バトル開始ボタン */}
        <button
          onClick={startBattle}
          disabled={!canBattle}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-lg disabled:opacity-40 hover:from-red-600 hover:to-orange-600 transition-all shadow-md"
        >
          ⚔ バトル開始！
        </button>

        {/* 恐竜グリッド */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
          {collection.map((entry) => {
            const dino = DINOSAUR_DATA[entry.dinoNumber];
            const element = ELEMENT_DATA[entry.elementNumber];
            if (!dino || !element) return null;

            const selectedSlot =
              selectedDinos[0] && selectedDinos[0].cardNo === entry.cardNo && selectedDinos[0].discoveredAt === entry.discoveredAt ? 0
              : selectedDinos[1] && selectedDinos[1].cardNo === entry.cardNo && selectedDinos[1].discoveredAt === entry.discoveredAt ? 1
              : null;
            const isSelected = selectedSlot !== null;
            const isFull = selectedDinos[0] !== null && selectedDinos[1] !== null;

            return (
              <button
                key={`${entry.cardNo}-${entry.discoveredAt}`}
                onClick={() => {
                  if (isSelected) {
                    handleDeselect(selectedSlot as 0 | 1);
                  } else {
                    handleSelect(entry);
                  }
                }}
                disabled={!isSelected && isFull}
                className={`rounded-xl border p-2 text-left transition-all ${
                  isSelected
                    ? "border-amber-400 bg-amber-50 ring-2 ring-amber-300"
                    : "border-cyan-200 bg-white hover:shadow-md disabled:opacity-50"
                }`}
              >
                <div className={`rounded-lg h-16 flex items-center justify-center mb-1 bg-gradient-to-br ${element.bgGradient}`}>
                  {dino.image ? (
                    <Image src={dino.image} alt={dino.name} width={44} height={44} className="object-contain" />
                  ) : (
                    <span className="text-2xl">{dino.emoji}</span>
                  )}
                </div>
                <p className="text-[10px] font-bold text-gray-700 leading-tight truncate">
                  {element.name}の{dino.name}
                </p>
                {entry.nickname && (
                  <p className="text-[9px] text-cyan-700 truncate">{entry.nickname}</p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // --- ルーレット画面 (field / contest) ---
  if (phase === "field-roulette" || phase === "contest-roulette") {
    const isField = phase === "field-roulette";
    const items = isField ? BATTLE_FIELDS : BATTLE_CONTESTS;
    const currentItem = items[rouletteIndex % items.length];
    const stoppedItem = isField ? field : contest;
    const displayItem = rouletteStopped && stoppedItem ? stoppedItem : currentItem;
    const bgColor = isField && rouletteStopped && field ? field.bgColor : undefined;

    return (
      <div
        className="min-h-[50vh] flex flex-col items-center justify-center gap-4 rounded-2xl p-6 transition-colors duration-500 overflow-hidden relative"
        style={{ backgroundColor: bgColor ?? "#f8fafc" }}
      >
        {isField && rouletteStopped && renderFieldBg(field, true)}
        <ConfettiEffect isActive={showConfetti} color={bgColor ?? "#EAB308"} />

        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">
          {isField ? "⚡ フィールド決定！" : "🎯 対決方法は…？"}
        </p>

        <div className="relative h-20 w-64 overflow-hidden rounded-xl border-2 border-gray-300 bg-white/90 shadow-inner flex items-center justify-center">
          <div
            className={`text-center transition-all duration-100 ${rouletteStopped ? "" : "blur-[1px]"}`}
          >
            <p className="text-xl font-black text-gray-800">{displayItem.name}</p>
          </div>
        </div>

        {rouletteStopped && (
          <div
            className="text-center"
            style={{ animation: "bounce-in 0.5s ease-out forwards" }}
          >
            <p className={`text-lg font-black ${bgColor ? "text-white drop-shadow-md" : "text-gray-800"}`}>
              {displayItem.description}
            </p>
          </div>
        )}
      </div>
    );
  }

  // --- バトル演出 ---
  if (phase === "battle") {
    const leftEntry = selectedDinos[0]!;
    const rightEntry = selectedDinos[1]!;
    const leftDino = DINOSAUR_DATA[leftEntry.dinoNumber];
    const rightDino = DINOSAUR_DATA[rightEntry.dinoNumber];

    return (
      <div
        className="min-h-[50vh] rounded-2xl p-4 overflow-hidden relative flex flex-col items-center justify-center gap-2"
        style={{ backgroundColor: field?.bgColor ?? "#f8fafc" }}
      >
        {renderFieldBg(field)}
        {field && (
          <p className="text-sm font-bold text-white/80 drop-shadow mb-1 relative z-10">
            📍 {field.name} — {contest?.name}
          </p>
        )}

        <div className="relative w-full flex items-center justify-center z-10" style={{ minHeight: 200 }}>
          {/* 左の恐竜: 突進 → 震え */}
          <div className="absolute left-4 z-20">
            <div style={{ animation: "charge-left 0.8s ease-out forwards" }}>
              <div style={{ animation: "battle-shake 0.3s ease-in-out 0.8s infinite" }}>
                {leftDino?.image ? (
                  <Image src={leftDino.image} alt={leftDino.name} width={90} height={90} className="object-contain drop-shadow-lg" />
                ) : (
                  <span className="text-6xl">{leftDino?.emoji}</span>
                )}
              </div>
            </div>
          </div>

          {/* 煙（衝突タイミングで発生） */}
          <SmokeEffect isActive={smokeActive} onComplete={() => setSmokeGone(true)} />

          {/* 右の恐竜: 突進 → 震え */}
          <div className="absolute right-4 z-20">
            <div style={{ animation: "charge-right 0.8s ease-out forwards" }}>
              <div style={{ animation: "battle-shake 0.3s ease-in-out 0.8s infinite" }}>
                {rightDino?.image ? (
                  <Image src={rightDino.image} alt={rightDino.name} width={90} height={90} className="object-contain drop-shadow-lg" />
                ) : (
                  <span className="text-6xl">{rightDino?.emoji}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="text-white font-bold text-sm drop-shadow animate-pulse mt-2 relative z-10">
          ⚔ バトル中…！
        </p>
      </div>
    );
  }

  // --- 結果発表 ---
  if (phase === "result") {
    const leftEntry = selectedDinos[0]!;
    const rightEntry = selectedDinos[1]!;
    const leftDino = DINOSAUR_DATA[leftEntry.dinoNumber];
    const rightDino = DINOSAUR_DATA[rightEntry.dinoNumber];
    const isLeftWinner = winner === "left";
    const isRightWinner = winner === "right";

    const leftEmotion = isLeftWinner ? "happy" : "sad";
    const rightEmotion = isRightWinner ? "happy" : "sad";
    const leftImg = getDinoImage(leftEntry, leftEmotion);
    const rightImg = getDinoImage(rightEntry, rightEmotion);

    const shareText = buildShareText();
    const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(PAGE_URL + "?tab=battle")}`;
    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(shareText + "\n" + PAGE_URL + "?tab=battle")}`;

    return (
      <div
        className="rounded-2xl p-4 overflow-hidden relative"
        style={{ backgroundColor: field?.bgColor ?? "#f8fafc" }}
      >
        {renderFieldBg(field)}
        <ConfettiEffect isActive={showConfetti} color={field?.bgColor ?? "#EAB308"} duration={3000} />

        {field && (
          <p className="text-center text-sm font-bold text-white/80 drop-shadow mb-3 relative z-10">
            📍 {field.name} — {contest?.name}
          </p>
        )}

        <div className="flex items-end justify-center gap-2 mb-4 relative z-10">
          {/* 左の恐竜 */}
          <div className="flex flex-col items-center flex-1 min-w-0">
            <div
              className={`relative ${isLeftWinner ? "" : "grayscale-[50%] opacity-70"}`}
              style={isLeftWinner
                ? { animation: "winner-bounce 2s ease-in-out infinite" }
                : { transform: "scale(0.8) translateY(4px)" }
              }
            >
              {/* 勝者キラキラエフェクト */}
              {isLeftWinner && <VictoryEffect isActive />}
              {/* 恐竜画像 */}
              <div className="relative z-10">
                {leftImg ? (
                  <Image
                    src={leftImg}
                    alt={leftDino?.name ?? ""}
                    width={isLeftWinner ? 120 : 70}
                    height={isLeftWinner ? 120 : 70}
                    className="object-contain drop-shadow-lg"
                    onError={() => handleImgError(`${leftEntry.dinoNumber}-${leftEmotion}`)}
                  />
                ) : (
                  <span className={isLeftWinner ? "text-6xl" : "text-4xl"}>{leftDino?.emoji}</span>
                )}
              </div>
            </div>
            <p className={`text-xs font-bold mt-1 drop-shadow ${isLeftWinner ? "text-yellow-300" : "text-white/60"}`}
              style={isLeftWinner ? { textShadow: "0 0 10px rgba(255,215,0,0.5)" } : undefined}
            >
              {isLeftWinner ? "🎉 勝利！" : "😢"}
            </p>
            <p className="text-[10px] text-white/90 font-bold drop-shadow max-w-24 text-center truncate">
              {getDisplayName(leftEntry)}
            </p>
            <p className="text-[10px] text-white/70 drop-shadow">{scores[0]}</p>
          </div>

          <span className="text-xl font-black text-white drop-shadow-lg mb-8 shrink-0">VS</span>

          {/* 右の恐竜 */}
          <div className="flex flex-col items-center flex-1 min-w-0">
            <div
              className={`relative ${isRightWinner ? "" : "grayscale-[50%] opacity-70"}`}
              style={isRightWinner
                ? { animation: "winner-bounce 2s ease-in-out infinite" }
                : { transform: "scale(0.8) translateY(4px)" }
              }
            >
              {/* 勝者キラキラエフェクト */}
              {isRightWinner && <VictoryEffect isActive />}
              {/* 恐竜画像 */}
              <div className="relative z-10">
                {rightImg ? (
                  <Image
                    src={rightImg}
                    alt={rightDino?.name ?? ""}
                    width={isRightWinner ? 120 : 70}
                    height={isRightWinner ? 120 : 70}
                    className="object-contain drop-shadow-lg"
                    onError={() => handleImgError(`${rightEntry.dinoNumber}-${rightEmotion}`)}
                  />
                ) : (
                  <span className={isRightWinner ? "text-6xl" : "text-4xl"}>{rightDino?.emoji}</span>
                )}
              </div>
            </div>
            <p className={`text-xs font-bold mt-1 drop-shadow ${isRightWinner ? "text-yellow-300" : "text-white/60"}`}
              style={isRightWinner ? { textShadow: "0 0 10px rgba(255,215,0,0.5)" } : undefined}
            >
              {isRightWinner ? "🎉 勝利！" : "😢"}
            </p>
            <p className="text-[10px] text-white/90 font-bold drop-shadow max-w-24 text-center truncate">
              {getDisplayName(rightEntry)}
            </p>
            <p className="text-[10px] text-white/70 drop-shadow">{scores[1]}</p>
          </div>
        </div>

        {/* 勝因テキスト */}
        <div
          className="text-center mb-4 relative z-10"
          style={{ animation: "bounce-in 0.6s ease-out forwards" }}
        >
          <p
            className="text-yellow-300 font-black text-base rounded-xl px-4 py-2 inline-block bg-black/40"
            style={{ textShadow: "0 0 10px rgba(255,215,0,0.5), 0 2px 4px rgba(0,0,0,0.5)" }}
          >
            {winReason}
          </p>
        </div>

        {/* 勝因詳細カード */}
        {scoreDetails[0] && scoreDetails[1] && contest && field && (
          <div
            className="rounded-xl bg-black/50 backdrop-blur-sm p-3 mb-3 relative z-10 text-white text-xs"
            style={{ animation: "fade-in 0.8s ease-out 0.3s both" }}
          >
            <p className="font-bold text-center text-yellow-300 mb-2">
              ⚔ バトル結果 — {contest.name}（{STAT_LABEL[contest.primaryStat]}勝負）
            </p>

            <div className="grid grid-cols-[1fr_auto_1fr] gap-x-2 gap-y-1 items-center">
              {/* ヘッダー */}
              <p className="font-bold truncate text-center">{getDisplayName(selectedDinos[0]!)}</p>
              <p className="text-white/50"></p>
              <p className="font-bold truncate text-center">{getDisplayName(selectedDinos[1]!)}</p>

              {/* ステータス */}
              <p className={`text-center ${winner === "left" && scoreDetails[0].baseStat >= scoreDetails[1].baseStat ? "text-yellow-300" : ""}`}>
                {scoreDetails[0].baseStat}
              </p>
              <p className="text-white/50 text-center">{STAT_LABEL[contest.primaryStat]}</p>
              <p className={`text-center ${winner === "right" && scoreDetails[1].baseStat >= scoreDetails[0].baseStat ? "text-yellow-300" : ""}`}>
                {scoreDetails[1].baseStat}
              </p>

              {/* フィールド補正 */}
              <p className={`text-center ${
                scoreDetails[0].fieldEffect === "advantage" ? "text-green-400" :
                scoreDetails[0].fieldEffect === "disadvantage" ? "text-red-400" : "text-white/60"
              }`}>
                x{scoreDetails[0].fieldMultiplier.toFixed(2)}
                {scoreDetails[0].fieldEffect === "advantage" ? " ▲" : scoreDetails[0].fieldEffect === "disadvantage" ? " ▼" : ""}
              </p>
              <p className="text-white/50 text-center">地形</p>
              <p className={`text-center ${
                scoreDetails[1].fieldEffect === "advantage" ? "text-green-400" :
                scoreDetails[1].fieldEffect === "disadvantage" ? "text-red-400" : "text-white/60"
              }`}>
                x{scoreDetails[1].fieldMultiplier.toFixed(2)}
                {scoreDetails[1].fieldEffect === "advantage" ? " ▲" : scoreDetails[1].fieldEffect === "disadvantage" ? " ▼" : ""}
              </p>

              {/* ランダム補正 */}
              <p className={`text-center ${scoreDetails[0].randomMultiplier >= 1.1 ? "text-cyan-300" : "text-white/60"}`}>
                x{scoreDetails[0].randomMultiplier.toFixed(2)}
                {scoreDetails[0].randomMultiplier >= 1.1 ? " !" : ""}
              </p>
              <p className="text-white/50 text-center">運</p>
              <p className={`text-center ${scoreDetails[1].randomMultiplier >= 1.1 ? "text-cyan-300" : "text-white/60"}`}>
                x{scoreDetails[1].randomMultiplier.toFixed(2)}
                {scoreDetails[1].randomMultiplier >= 1.1 ? " !" : ""}
              </p>

              {/* 区切り線 */}
              <div className="border-t border-white/20 col-span-3 my-1" />

              {/* 合計スコア */}
              <p className={`text-center font-black text-sm ${winner === "left" ? "text-yellow-300" : "text-white/50"}`}>
                {scores[0]}
              </p>
              <p className="text-white/50 text-center">合計</p>
              <p className={`text-center font-black text-sm ${winner === "right" ? "text-yellow-300" : "text-white/50"}`}>
                {scores[1]}
              </p>
            </div>

            <p className="text-center mt-2 text-[11px] text-cyan-200 leading-relaxed">
              {detailedWinReason}
            </p>
          </div>
        )}

        {/* ボタン群 */}
        <div className="space-y-2 relative z-10">
          <button
            onClick={resetBattle}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-base shadow-md hover:from-red-600 hover:to-orange-600 transition-all"
          >
            ⚔ もう1回バトル！
          </button>
          <button
            onClick={onBack}
            className="w-full py-3 rounded-xl border-2 border-white/50 text-white font-semibold hover:bg-white/20 transition-colors"
          >
            📖 図鑑にもどる
          </button>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <a
              href={xUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-black text-white font-bold text-sm hover:bg-gray-800 transition-colors"
            >
              X でシェア
            </a>
            <a
              href={lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#06C755] text-white font-bold text-sm hover:bg-[#05b34c] transition-colors"
            >
              LINE でシェア
            </a>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
