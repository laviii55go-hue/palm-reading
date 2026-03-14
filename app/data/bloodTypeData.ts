export type BloodType = "A" | "B" | "O" | "AB";

export type BloodTypeEntry = {
  type: BloodType;
  emoji: string;
  title: string;
  keywords: string[];
  personality: string;
  strengths: string[];
  weaknesses: string[];
  love: string;
  career: string;
  luckyColor: string;
  luckyItem: string;
};

export const BLOOD_TYPE_DATA: Record<BloodType, BloodTypeEntry> = {
  A: {
    type: "A",
    emoji: "🔴",
    title: "几帳面で協調性の高い完璧主義者",
    keywords: ["几帳面", "慎重", "協調性", "真面目", "繊細"],
    personality:
      "周囲の空気を読み、和を大切にするタイプ。ルールやマナーを守り、誠実に物事に取り組みます。細部へのこだわりが強く、計画を立ててから行動する慎重派です。",
    strengths: ["責任感が強い", "チームワークが得意", "丁寧で正確", "忍耐力がある"],
    weaknesses: ["心配性になりやすい", "ストレスを溜め込みやすい", "融通が利かないことも"],
    love: "一途で献身的な恋愛スタイル。相手を思いやり、長期的な関係を大切にします。本音を言いにくい面があるので、コミュニケーションを意識して。",
    career: "事務職・経理・品質管理・医療・教育・公務員・カウンセラーに向いています。",
    luckyColor: "グリーン・ベージュ・パステルカラー",
    luckyItem: "植物・アロマ・日記",
  },
  B: {
    type: "B",
    emoji: "🟡",
    title: "マイペースで創造性豊かな自由人",
    keywords: ["マイペース", "自由", "創造性", "好奇心", "楽観的"],
    personality:
      "自分のペースを大切にし、型にはまらない発想力を持っています。好奇心旺盛で、興味のあることにはとことん没頭。周囲の評価より自分の感覚を優先する傾向があります。",
    strengths: ["独創的な発想力", "集中力が高い", "柔軟な思考", "逆境に強い"],
    weaknesses: ["マイペースすぎることがある", "飽きっぽい", "協調性に欠けることも"],
    love: "恋愛は情熱的で、相手に夢中になりやすいタイプ。束縛を嫌い、自由な関係を好みます。相性が合えば長続きする関係に。",
    career: "クリエイター・アーティスト・研究者・フリーランス・営業・起業家に向いています。",
    luckyColor: "オレンジ・イエロー・ゴールド",
    luckyItem: "楽器・カメラ・旅行グッズ",
  },
  O: {
    type: "O",
    emoji: "🔵",
    title: "おおらかでリーダーシップのある楽観派",
    keywords: ["おおらか", "リーダーシップ", "楽観的", "大らか", "行動力"],
    personality:
      "明るく前向きで、周囲を元気にする存在。決断力があり、困難な状況でもリーダーとして引っ張っていけます。大らかで細かいことを気にしない反面、頑固な一面も。",
    strengths: ["決断力がある", "包容力がある", "体力・回復力", "目標に向かって突き進む"],
    weaknesses: ["大雑把になりやすい", "頑固", "負けず嫌いすぎることも"],
    love: "情熱的で一途。相手を大切にし、献身的に尽くすタイプ。恋愛には積極的で、一目惚れもしやすい。",
    career: "経営者・マネージャー・営業・スポーツ選手・医療・警察・消防に向いています。",
    luckyColor: "赤・ブルー・白",
    luckyItem: "スポーツグッズ・パワーストーン",
  },
  AB: {
    type: "AB",
    emoji: "🟣",
    title: "二面性を持つ合理主義者",
    keywords: ["二面性", "合理主義", "クール", "個性的", "分析力"],
    personality:
      "A型とB型の両方の特徴を持つ、ユニークなタイプ。合理的で冷静な判断力があり、感情より論理で動くことが多いです。社交的にもなれる一方、一人の時間も大切にします。",
    strengths: ["分析力が高い", "バランス感覚", "適応力", "ユニークな発想"],
    weaknesses: ["気分のムラがある", "冷たいと思われやすい", "決断に時間がかかることがある"],
    love: "理想が高く、相性を重視。恋愛には慎重で、心を開くまで時間がかかります。一度心を許せば深い関係を築けます。",
    career: "コンサルタント・プランナー・研究者・デザイナー・マルチタスク職に向いています。",
    luckyColor: "紫・ブラック・シルバー",
    luckyItem: "本・パズル・アート",
  },
};

// 相性マトリックス（簡易版：良い / 普通 / 注意）
export type CompatLevel = "good" | "normal" | "caution";

export const BLOOD_TYPE_COMPAT: Record<BloodType, Record<BloodType, { level: CompatLevel; message: string }>> = {
  A: {
    A: { level: "good", message: "理解し合える関係。お互いのペースを尊重すれば長続きします。" },
    B: { level: "caution", message: "価値観の違いが出やすい組み合わせ。距離感を大切に。" },
    O: { level: "good", message: "O型のリーダーシップにA型が支える、相性の良い組み合わせ。" },
    AB: { level: "normal", message: "理解し合える部分も多いが、AB型の二面性に戸惑うことも。" },
  },
  B: {
    A: { level: "caution", message: "ペースの違いが気になることも。お互いのスタイルを認め合って。" },
    B: { level: "normal", message: "同じB型同士、気が合うことも多いが、マイペース同士でズレることも。" },
    O: { level: "good", message: "O型の大らかさがB型の自由さを包み込む、相性の良い組み合わせ。" },
    AB: { level: "good", message: "お互いの個性を理解し合える、刺激的な関係になりやすい。" },
  },
  O: {
    A: { level: "good", message: "O型のリーダーシップにA型が支える、相性の良い組み合わせ。" },
    B: { level: "good", message: "O型の大らかさがB型の自由さを包み込む、相性の良い組み合わせ。" },
    O: { level: "normal", message: "気が合うことも多いが、両方リーダー気質でぶつかることも。" },
    AB: { level: "normal", message: "お互いの個性を尊重すれば良い関係に。AB型の冷静さがO型を落ち着かせる。" },
  },
  AB: {
    A: { level: "normal", message: "理解し合える部分も多いが、AB型の二面性に戸惑うことも。" },
    B: { level: "good", message: "お互いの個性を理解し合える、刺激的な関係になりやすい。" },
    O: { level: "normal", message: "お互いの個性を尊重すれば良い関係に。AB型の冷静さがO型を落ち着かせる。" },
    AB: { level: "normal", message: "同じAB型同士、理解し合えるが、クールすぎて距離ができやすいことも。" },
  },
};
