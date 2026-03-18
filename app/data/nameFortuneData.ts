// 姓名判断 81画 吉凶表（流派により異なります。参考としてご利用ください）

export type FortuneLevel = "max-good" | "good" | "neutral" | "bad" | "max-bad";

export const STROKE_FORTUNE: Record<number, { level: FortuneLevel; label: string }> = {
  1: { level: "max-good", label: "最大吉" },
  2: { level: "max-bad", label: "大凶" },
  3: { level: "good", label: "大吉" },
  4: { level: "max-bad", label: "大凶" },
  5: { level: "good", label: "大吉" },
  6: { level: "good", label: "大吉" },
  7: { level: "neutral", label: "吉" },
  8: { level: "neutral", label: "吉" },
  9: { level: "max-bad", label: "大凶" },
  10: { level: "max-bad", label: "最大凶" },
  11: { level: "max-good", label: "最大吉" },
  12: { level: "bad", label: "凶" },
  13: { level: "good", label: "大吉" },
  14: { level: "max-bad", label: "大凶" },
  15: { level: "max-good", label: "最大吉" },
  16: { level: "good", label: "大吉" },
  17: { level: "neutral", label: "吉" },
  18: { level: "neutral", label: "吉" },
  19: { level: "max-bad", label: "大凶" },
  20: { level: "max-bad", label: "最大凶" },
  21: { level: "good", label: "大吉" },
  22: { level: "bad", label: "凶" },
  23: { level: "good", label: "大吉" },
  24: { level: "good", label: "大吉" },
  25: { level: "good", label: "大吉" },
  26: { level: "max-bad", label: "大凶" },
  27: { level: "bad", label: "凶" },
  28: { level: "max-bad", label: "大凶" },
  29: { level: "neutral", label: "吉" },
  30: { level: "neutral", label: "吉凶" },
  31: { level: "good", label: "大吉" },
  32: { level: "max-good", label: "最大吉" },
  33: { level: "neutral", label: "吉" },
  34: { level: "max-bad", label: "最大凶" },
  35: { level: "neutral", label: "吉" },
  36: { level: "bad", label: "凶" },
  37: { level: "good", label: "大吉" },
  38: { level: "neutral", label: "吉凶" },
  39: { level: "good", label: "大吉" },
  40: { level: "neutral", label: "吉凶" },
  41: { level: "max-good", label: "最大吉" },
  42: { level: "bad", label: "凶" },
  43: { level: "bad", label: "凶" },
  44: { level: "max-bad", label: "最大凶" },
  45: { level: "good", label: "大吉" },
  46: { level: "bad", label: "凶" },
  47: { level: "good", label: "大吉" },
  48: { level: "neutral", label: "吉" },
  49: { level: "neutral", label: "吉凶" },
  50: { level: "bad", label: "凶" },
  51: { level: "neutral", label: "吉" },
  52: { level: "good", label: "大吉" },
  53: { level: "neutral", label: "吉凶" },
  54: { level: "max-bad", label: "大凶" },
  55: { level: "neutral", label: "吉凶" },
  56: { level: "max-bad", label: "大凶" },
  57: { level: "neutral", label: "吉" },
  58: { level: "neutral", label: "吉凶" },
  59: { level: "max-bad", label: "大凶" },
  60: { level: "max-bad", label: "最大凶" },
  61: { level: "good", label: "大吉" },
  62: { level: "bad", label: "凶" },
  63: { level: "max-good", label: "最大吉" },
  64: { level: "max-bad", label: "大凶" },
  65: { level: "max-good", label: "最大吉" },
  66: { level: "max-bad", label: "大凶" },
  67: { level: "good", label: "大吉" },
  68: { level: "neutral", label: "吉" },
  69: { level: "max-bad", label: "最大凶" },
  70: { level: "max-bad", label: "最大凶" },
  71: { level: "neutral", label: "吉凶" },
  72: { level: "bad", label: "凶" },
  73: { level: "neutral", label: "吉凶" },
  74: { level: "max-bad", label: "大凶" },
  75: { level: "neutral", label: "吉凶" },
  76: { level: "max-bad", label: "大凶" },
  77: { level: "neutral", label: "吉凶" },
  78: { level: "bad", label: "凶" },
  79: { level: "max-bad", label: "大凶" },
  80: { level: "max-bad", label: "最大凶" },
  81: { level: "max-good", label: "最大吉" },
};

// 81を超える画数は 81 に還元（81画＝1画と同等）
export function normalizeStroke(n: number): number {
  if (n < 1) return 1;
  if (n > 81) {
    const r = ((n - 1) % 81) + 1;
    return r;
  }
  return n;
}

// 総合判定：レベル→スコア（0-100）
const LEVEL_SCORE: Record<FortuneLevel, number> = {
  "max-good": 100,
  good: 80,
  neutral: 50,
  bad: 25,
  "max-bad": 0,
};

// 五格の重み（人格・総格を重視）
const GAKU_WEIGHT: Record<string, number> = {
  jinkaku: 0.3,
  soukaku: 0.3,
  chikaku: 0.2,
  tenkaku: 0.1,
  gaikaku: 0.1,
};

export type OverallAssessment = {
  score: number;
  comment: string;
};

export function getOverallAssessment(
  gaku: { key: string; fortune: { level: string } }[]
): OverallAssessment {
  let weightedSum = 0;
  let totalWeight = 0;
  for (const g of gaku) {
    const w = GAKU_WEIGHT[g.key] ?? 0.2;
    const s = LEVEL_SCORE[g.fortune.level as FortuneLevel] ?? 50;
    weightedSum += w * s;
    totalWeight += w;
  }
  const score = Math.round(
    totalWeight > 0 ? (weightedSum / totalWeight) : 50
  );
  const clampedScore = Math.max(0, Math.min(100, score));

  const comments: { min: number; comment: string }[] = [
    { min: 90, comment: "五格のバランスがとても良く、総合的に良い名前です。" },
    { min: 80, comment: "五格のバランスが良く、総合的に良い名前です。" },
    { min: 70, comment: "五格のバランスは良好です。吉のエネルギーを大切に。" },
    { min: 60, comment: "五格のバランスはおおむね良好です。" },
    { min: 50, comment: "吉凶が混在しています。努力次第で開運できます。" },
    { min: 40, comment: "凶の格がありますが、他の格が補うことができます。" },
    { min: 30, comment: "五格のバランスに注意。名前の響きや他の要素も大切に。" },
    { min: 0, comment: "五格のバランスが厳しめです。参考としてお楽しみください。" },
  ];

  const comment =
    comments.find((c) => clampedScore >= c.min)?.comment ?? comments[comments.length - 1]!.comment;

  return { score: clampedScore, comment };
}

// 人格の画数別解説（性格・才能・対人関係）
export const JINKAKU_EXPLANATIONS: Partial<Record<number, string>> = {
  1: "リーダーシップがあり、独立心が強い性格。先頭に立って物事を進める才能があります。",
  3: "明るく社交的で、人を惹きつける魅力があります。創造力豊かで、芸術や表現の才能に恵まれます。",
  5: "好奇心旺盛で、新しいことに挑戦する意欲があります。柔軟な思考で、様々な場面で活躍できます。",
  6: "温厚で人当たりが良く、周囲から信頼されやすい性格。協調性があり、チームで力を発揮します。",
  11: "穏やかで落ち着きがあり、着実に力を蓄えるタイプ。努力家で、人望を得やすい運勢です。",
  12: "意志が強く、自分の道を進む力があります。やや頑固になりやすい面があるので、柔軟さを意識すると良いでしょう。",
  15: "知性と感性のバランスが良く、教養を活かして活躍できます。誠実で、周囲からの評価も高い傾向があります。",
  21: "積極的で行動力があり、目標に向かって突き進む力があります。リーダーとして活躍する素質があります。",
  23: "頭脳明晰で、論理的に物事を考える力があります。専門分野で高い成果を上げやすい運勢です。",
  25: "感受性が豊かで、人の気持ちを汲み取る力があります。芸術や創作活動に向いた才能があります。",
  27: "意志が強く、困難にも耐え抜く力があります。やや気性が激しくなりやすいので、冷静さを保つと良いでしょう。",
  31: "誠実で努力家。コツコツと積み重ねて成功を掴むタイプです。人望があり、長期的な信頼関係を築けます。",
  32: "大器晩成型。じっくり力を蓄え、時が来れば大きく花開く運勢。忍耐強く、最終的に成功を収めやすいです。",
  36: "才能はあるが、波乱に巻き込まれやすい面があります。慎重に行動し、信頼できる人との絆を大切にすると良いでしょう。",
  41: "統率力があり、多くの人をまとめる才能があります。責任感が強く、組織で重宝されるタイプです。",
  42: "繊細で感受性が豊か。ストレスを抱え込みやすい面があるので、気分転換を心がけると良いでしょう。",
  45: "好奇心旺盛で、学ぶ意欲が高い性格。知識を活かして、専門家として活躍する素質があります。",
  50: "独立心が強く、自分の力で道を切り開くタイプ。やや孤独になりやすい面があるので、人とのつながりを大切に。",
  52: "洞察力に優れ、物事の本質を見抜く力があります。企画・戦略面で力を発揮しやすい運勢です。",
  60: "波乱に満ちた人生になりやすい画数。忍耐強く、諦めずに歩み続けることで道が開けます。",
  61: "知性と感性のバランスが良く、多方面で活躍できます。人脈を活かして、成功を掴む素質があります。",
  63: "幸運に恵まれ、努力が実りやすい運勢。誠実な人柄で、周囲からのサポートを得やすいです。",
  65: "長寿と繁栄の画数。穏やかで円満な性格で、晩年まで安定した人生を送りやすい傾向があります。",
  72: "努力はするが、なかなか報われにくい面があります。焦らず、自分のペースで進むことが大切です。",
  78: "才能はあるが、環境に左右されやすい画数。自分を信じて、着実に力を蓄えると道が開けます。",
  80: "波乱が多く、忍耐が試される運勢。困難を乗り越えることで、強い人間力が養われます。",
  81: "万物の完成を表す最大吉。総合的な運気に恵まれ、努力が実を結びやすい最高の画数です。",
};

// 総格の画数別解説（人生の流れ・晩年運）
export const SOUKAKU_EXPLANATIONS: Partial<Record<number, string>> = {
  1: "人生のスタートに恵まれ、新しい道を切り開く力があります。晩年まで活力を保ちやすい運勢です。",
  3: "明るく前向きな人生の流れ。人との出会いが多く、楽しい経験に恵まれやすいです。",
  5: "変化に富んだ人生。新しい環境や挑戦を通じて、成長と成功を掴む可能性があります。",
  6: "家庭運・人間関係に恵まれる傾向。穏やかで充実した人生を送りやすい運勢です。",
  11: "着実に力をつけ、晩年に向けて運気が上昇する流れ。努力が報われ、安定した晩年を迎えやすいです。",
  12: "人生に波があるが、強い意志で乗り越えられます。中年以降、運気が開く可能性があります。",
  15: "知性と教養を活かした人生。学び続けることで、晩年まで充実した日々を送れます。",
  21: "積極的に動くことで、成功のチャンスが巡ってきます。行動力が人生を切り開く鍵になります。",
  23: "専門性を高めることで、社会的な地位を築きやすい運勢。晩年まで現役で活躍する可能性があります。",
  25: "感性豊かな人生。芸術・文化・人との交流を通じて、心豊かな晩年を迎えやすいです。",
  27: "困難があっても、それを乗り越える力があります。人生の後半、努力が実を結ぶ傾向があります。",
  31: "コツコツ積み重ねた努力が、晩年に実を結ぶ運勢。安定した老後を迎えやすいです。",
  32: "大器晩成型の人生。中年以降、運気が上昇し、晩年に大きな成功を収める可能性があります。",
  34: "人生に試練が多い画数。忍耐強く歩み続けることで、強い人間力が養われます。",
  36: "波乱はあるが、人との縁に救われることが多い運勢。信頼できる人を大切にすると道が開けます。",
  41: "リーダーとしての人生。責任ある立場で活躍し、晩年まで影響力を持ち続けやすいです。",
  42: "繊細な人生の流れ。ストレスを溜め込まないよう、心身のケアを心がけると良いでしょう。",
  44: "人生に大きな試練がある画数。乗り越えた先に、深い充実感と成長が待っています。",
  45: "学びと成長の人生。知識を活かして、晩年まで現役で活躍する可能性があります。",
  50: "独立独歩の人生。自分の力で道を切り開き、晩年に至るまで自立した生き方ができます。",
  52: "企画力・洞察力を活かした人生。戦略的に動くことで、成功を掴みやすい運勢です。",
  60: "波乱の人生になりやすいが、乗り越えるたびに強くなります。晩年は穏やかになる傾向があります。",
  61: "人脈に恵まれた人生。多くの人との出会いが、成功や幸せにつながりやすいです。",
  63: "幸運に恵まれた人生の流れ。努力が実り、晩年まで安定した日々を送りやすい運勢です。",
  65: "長寿・繁栄の画数。穏やかで円満な人生を送り、晩年は平穏に過ごしやすいです。",
  69: "人生に厳しい試練がある画数。諦めずに歩み続けることで、道が開ける可能性があります。",
  70: "波乱が多く、忍耐が試される人生。困難を乗り越えることで、深い人間力が養われます。",
  72: "努力が報われにくい面があるが、諦めず続けることで道が開けます。晩年に花開く可能性も。",
  78: "環境に左右されやすい人生。自分を信じ、着実に力を蓄えると、晩年に実りが訪れます。",
  80: "人生に大きな試練がある画数。乗り越えた先に、深い充実と成長が待っています。",
  81: "万物の完成を表す最大吉。人生全体に恵まれ、晩年まで安定した幸せを享受しやすい最高の画数です。",
};

// 解説がない画数用の汎用メッセージ（吉凶レベル別）
const GENERIC_JINKAKU: Record<FortuneLevel, string> = {
  "max-good": "人格の最大吉の画数。誠実で人望があり、才能を発揮しやすい運勢です。",
  good: "人格の大吉の画数。明るく積極的で、人間関係に恵まれやすい傾向があります。",
  neutral: "人格の吉の画数。穏やかでバランスの取れた性格で、周囲と調和しながら力を発揮できます。",
  bad: "人格の凶の画数。やや波乱がありやすい面がありますが、努力と心がけで開運できます。",
  "max-bad": "人格の凶の画数。忍耐強く、自分を信じて歩むことで道が開けます。参考としてお楽しみください。",
};

const GENERIC_SOUKAKU: Record<FortuneLevel, string> = {
  "max-good": "総格の最大吉の画数。人生全体に恵まれ、努力が実を結びやすい運勢です。",
  good: "総格の大吉の画数。前向きな人生の流れで、成功のチャンスに恵まれやすい傾向があります。",
  neutral: "総格の吉の画数。穏やかな人生の流れで、着実に力を蓄えていける運勢です。",
  bad: "総格の凶の画数。波はありますが、努力次第で開運できます。諦めずに歩み続けることが大切です。",
  "max-bad": "総格の凶の画数。試練はありますが、乗り越えることで強くなれます。参考としてお楽しみください。",
};

export function getJinkakuExplanation(
  stroke: number,
  fortune: { level: string; label: string }
): string {
  const level = fortune.level as FortuneLevel;
  return (
    JINKAKU_EXPLANATIONS[stroke] ??
    GENERIC_JINKAKU[level] ??
    `人格${stroke}画（${fortune.label}）の運勢です。`
  );
}

export function getSoukakuExplanation(
  stroke: number,
  fortune: { level: string; label: string }
): string {
  const level = fortune.level as FortuneLevel;
  return (
    SOUKAKU_EXPLANATIONS[stroke] ??
    GENERIC_SOUKAKU[level] ??
    `総格${stroke}画（${fortune.label}）の運勢です。`
  );
}

// 五格の説明
export const GAKU_LABELS = {
  tenkaku: { name: "天格", desc: "先祖・家系の運。姓の画数で決まります。" },
  jinkaku: { name: "人格", desc: "本人の性格・才能。姓の下の字＋名の上の字。" },
  chikaku: { name: "地格", desc: "基礎運・幼少期。名の画数で決まります。" },
  gaikaku: { name: "外格", desc: "対人関係・社会運。総格－人格＋1。" },
  soukaku: { name: "総格", desc: "人生全体の運勢。姓＋名の総画数。" },
} as const;

// ひらがなの画数（フォールバック用）
export const HIRAGANA_STROKES: Record<string, number> = {
  あ: 3, い: 2, う: 2, え: 2, お: 3,
  か: 2, き: 4, く: 1, け: 2, こ: 2,
  さ: 3, し: 1, す: 2, せ: 2, そ: 1,
  た: 2, ち: 2, つ: 1, て: 1, と: 2,
  な: 2, に: 2, ぬ: 2, ね: 2, の: 1,
  は: 3, ひ: 1, ふ: 2, へ: 1, ほ: 4,
  ま: 3, み: 2, む: 3, め: 2, も: 3,
  や: 2, ゆ: 2, よ: 2,
  ら: 2, り: 2, る: 1, れ: 2, ろ: 2,
  わ: 2, を: 3, ん: 1,
  が: 2, ぎ: 4, ぐ: 1, げ: 2, ご: 2,
  ざ: 3, じ: 1, ず: 2, ぜ: 2, ぞ: 1,
  だ: 2, ぢ: 2, づ: 1, で: 1, ど: 2,
  ば: 3, び: 1, ぶ: 2, べ: 1, ぼ: 4,
  ぱ: 3, ぴ: 1, ぷ: 2, ぺ: 1, ぽ: 4,
};
