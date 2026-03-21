/**
 * 16タイプ相性診断データ
 * 4軸（E/I, S/N, T/F, J/P）の一致数と特性に基づき相性を算出
 */

import { PERSONALITY_TYPES, PERSONALITY_TYPE_CODES } from "./personalityData";

export type PersonalityCompatibilityEntry = {
  score: number; // 1〜5
  general: string;
  love: string;
  work: string;
  friendship: string;
};

// 軸ごとの相性傾向（一致=理解しやすい、不一致=補完 or 摩擦）
function countMatchingAxes(a: string, b: string): number {
  let count = 0;
  for (let i = 0; i < 4; i++) {
    if (a[i] === b[i]) count++;
  }
  return count;
}

// スコア算出：一致数＋補完性を考慮
// 4一致=5, 3一致=4, 2一致=3〜4, 1一致=2〜3, 0一致=2〜3（正反対は補完的）
function calcScore(a: string, b: string): number {
  const match = countMatchingAxes(a, b);
  if (match === 4) return 5;
  if (match === 3) return 4;
  if (match === 2) return 3;
  // 1一致・0一致：E-IとN-Sの組み合わせは補完的で高めに
  const eiMatch = a[0] !== b[0]; // E-I 逆 = 補完
  const snMatch = a[1] !== b[1]; // S-N 逆 = 補完
  if (eiMatch && snMatch && a[2] === b[2] && a[3] === b[3]) return 4; // ENFP-INTJ型
  if (match === 1) return 3;
  return 2;
}

// テンプレートメッセージ生成
function buildMessages(
  typeA: string,
  typeB: string,
  score: number,
  nickA: string,
  nickB: string
): PersonalityCompatibilityEntry {
  const match = countMatchingAxes(typeA, typeB);

  const templates: Record<number, { general: string; love: string; work: string; friendship: string }> = {
    5: {
      general: `${nickA}と${nickB}は同じタイプ同士。価値観や考え方が似ており、深く理解し合える関係です。お互いのペースを尊重し、一緒にいて安心できる存在になれます。`,
      love: "同じ価値観を持つため、すれ違いが少なく安定した関係を築きやすいです。ただし似すぎることで刺激が足りないと感じることも。たまに新しい体験を共有すると良いでしょう。",
      work: "考え方や進め方が似ているため、チームワークがスムーズです。役割分担が自然に決まり、効率的に成果を出せます。",
      friendship: "何を言わなくても通じ合える、居心地の良い友人関係。長く付き合える心友になれる相性です。",
    },
    4: {
      general: `${nickA}と${nickB}は相性の良い組み合わせです。似ている部分で共感し合い、違う部分で刺激を与え合えます。お互いを高め合える関係になれます。`,
      love: "理解し合いながらも、違いが新鮮さを生みます。相手の良さを認め、尊重することで、深い絆を築ける相性です。",
      work: "強みが補い合い、チームとして力を発揮しやすい組み合わせ。役割分担を意識するとさらに良い成果が期待できます。",
      friendship: "話が合い、一緒にいて楽しい関係。違いも個性として楽しめる、バランスの取れた友情です。",
    },
    3: {
      general: `${nickA}と${nickB}は、似ている部分と違う部分が混在する組み合わせです。お互いの違いを理解し尊重することで、良い関係を築けます。コミュニケーションを大切にしましょう。`,
      love: "価値観の違いでぶつかることもありますが、相手を理解しようとする気持ちがあれば深い関係に。話し合いを大切にしてください。",
      work: "アプローチの違いがあるため、役割分担や進め方のすり合わせが重要。お互いの強みを活かせば良いチームになれます。",
      friendship: "最初は戸惑うこともありますが、付き合うほどに理解が深まる関係。違いを楽しむ余裕があると良いでしょう。",
    },
    2: {
      general: `${nickA}と${nickB}は、考え方や行動パターンに違いが多い組み合わせです。その分、お互いに新しい視点を与え合える可能性も。違いを「個性」として受け止めることが鍵です。`,
      love: "すれ違いが起きやすい組み合わせですが、相手の世界観を理解しようとする姿勢があれば、刺激的で成長できる関係に。忍耐と好奇心が大切です。",
      work: "アプローチが異なるため、最初は戸惑うことも。しかし視点の違いは強みにもなります。役割を明確にし、お互いの専門性を尊重しましょう。",
      friendship: "違う世界を持つ友人として、新しい発見や刺激を与え合える関係。理解し合う努力を惜しまなければ、かけがえのない存在になれます。",
    },
  };

  const t = templates[Math.min(score, 5)] ?? templates[3];
  return { score, ...t };
}

export function getPersonalityCompatibility(typeA: string, typeB: string): PersonalityCompatibilityEntry {
  const a = typeA.toUpperCase();
  const b = typeB.toUpperCase();
  if (!PERSONALITY_TYPES[a] || !PERSONALITY_TYPES[b]) {
    return {
      score: 3,
      general: "タイプ情報を取得できませんでした。",
      love: "-",
      work: "-",
      friendship: "-",
    };
  }
  const nickA = PERSONALITY_TYPES[a].nickname;
  const nickB = PERSONALITY_TYPES[b].nickname;
  const score = calcScore(a, b);
  return buildMessages(a, b, score, nickA, nickB);
}

export { PERSONALITY_TYPE_CODES };
