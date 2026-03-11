// ─── 16タイプ性格診断 データ ─────────────────────────────────

export type PersonalityType = {
  code: string; // INTJ, ENFP など
  nickname: string; // 建築家、広報運動家 など
  personality: string;
  love: string;
  work: string;
  strength: string;
  weakness: string;
};

export type QuizQuestion = {
  id: string;
  dimension: "EI" | "SN" | "TF" | "JP";
  text: string;
  options: { text: string; value: "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P" }[];
};

// ─── 質問（各軸2問＝計8問） ─────────────────────────────────
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // E vs I
  {
    id: "q1",
    dimension: "EI",
    text: "休日の過ごし方で近いのは？",
    options: [
      { text: "友達と会う・外出する", value: "E" },
      { text: "家でゆっくり過ごす", value: "I" },
    ],
  },
  {
    id: "q2",
    dimension: "EI",
    text: "新しい環境では？",
    options: [
      { text: "人に話しかけて場を盛り上げる", value: "E" },
      { text: "様子を見てから動く", value: "I" },
    ],
  },
  // S vs N
  {
    id: "q3",
    dimension: "SN",
    text: "物事を判断するとき重視するのは？",
    options: [
      { text: "事実やデータ、経験", value: "S" },
      { text: "直感や可能性、パターン", value: "N" },
    ],
  },
  {
    id: "q4",
    dimension: "SN",
    text: "会話の好みは？",
    options: [
      { text: "具体的でわかりやすい話", value: "S" },
      { text: "抽象的なアイデアや未来の話", value: "N" },
    ],
  },
  // T vs F
  {
    id: "q5",
    dimension: "TF",
    text: "決断するとき重視するのは？",
    options: [
      { text: "論理や公平性", value: "T" },
      { text: "相手の気持ちや調和", value: "F" },
    ],
  },
  {
    id: "q6",
    dimension: "TF",
    text: "人から相談されたら？",
    options: [
      { text: "解決策を提案する", value: "T" },
      { text: "気持ちに寄り添う", value: "F" },
    ],
  },
  // J vs P
  {
    id: "q7",
    dimension: "JP",
    text: "スケジュールの立て方は？",
    options: [
      { text: "計画的に事前に決める", value: "J" },
      { text: "その時の気分で柔軟に", value: "P" },
    ],
  },
  {
    id: "q8",
    dimension: "JP",
    text: "締め切り前は？",
    options: [
      { text: "余裕を持って早めに仕上げる", value: "J" },
      { text: "締め切り直前で集中する", value: "P" },
    ],
  },
];

// ─── 質問（詳細版：各軸6問＝計24問） ─────────────────────────────
export const QUIZ_QUESTIONS_FULL: QuizQuestion[] = [
  // E vs I（6問）
  { id: "f1", dimension: "EI", text: "休日の過ごし方で近いのは？", options: [{ text: "友達と会う・外出する", value: "E" }, { text: "家でゆっくり過ごす", value: "I" }] },
  { id: "f2", dimension: "EI", text: "新しい環境では？", options: [{ text: "人に話しかけて場を盛り上げる", value: "E" }, { text: "様子を見てから動く", value: "I" }] },
  { id: "f3", dimension: "EI", text: "パーティーでは？", options: [{ text: "人と交流して楽しむ", value: "E" }, { text: "少人数で落ち着いて話す", value: "I" }] },
  { id: "f4", dimension: "EI", text: "アイデアを練るとき？", options: [{ text: "人と話しながら進める", value: "E" }, { text: "一人で考えをまとめる", value: "I" }] },
  { id: "f5", dimension: "EI", text: "疲れたとき？", options: [{ text: "誰かと話して回復", value: "E" }, { text: "一人で静かに休む", value: "I" }] },
  { id: "f6", dimension: "EI", text: "初対面の人には？", options: [{ text: "積極的に話しかける", value: "E" }, { text: "相手から話しかけられるのを待つ", value: "I" }] },
  // S vs N（6問）
  { id: "f7", dimension: "SN", text: "物事を判断するとき重視するのは？", options: [{ text: "事実やデータ、経験", value: "S" }, { text: "直感や可能性、パターン", value: "N" }] },
  { id: "f8", dimension: "SN", text: "会話の好みは？", options: [{ text: "具体的でわかりやすい話", value: "S" }, { text: "抽象的なアイデアや未来の話", value: "N" }] },
  { id: "f9", dimension: "SN", text: "未来について考えるとき？", options: [{ text: "具体的な計画を立てる", value: "S" }, { text: "いろんな可能性を想像する", value: "N" }] },
  { id: "f10", dimension: "SN", text: "新しいことを学ぶとき？", options: [{ text: "手を動かして体験したい", value: "S" }, { text: "理論や概念から理解したい", value: "N" }] },
  { id: "f11", dimension: "SN", text: "説明するとき？", options: [{ text: "事実や具体例で", value: "S" }, { text: "全体像やイメージで", value: "N" }] },
  { id: "f12", dimension: "SN", text: "決めるとき？", options: [{ text: "過去の経験を重視", value: "S" }, { text: "新しい可能性を重視", value: "N" }] },
  // T vs F（6問）
  { id: "f13", dimension: "TF", text: "決断するとき重視するのは？", options: [{ text: "論理や公平性", value: "T" }, { text: "相手の気持ちや調和", value: "F" }] },
  { id: "f14", dimension: "TF", text: "人から相談されたら？", options: [{ text: "解決策を提案する", value: "T" }, { text: "気持ちに寄り添う", value: "F" }] },
  { id: "f15", dimension: "TF", text: "批判されたとき？", options: [{ text: "論点を整理して考える", value: "T" }, { text: "相手の意図や感情を考える", value: "F" }] },
  { id: "f16", dimension: "TF", text: "チームで決めるとき？", options: [{ text: "効率や成果を優先", value: "T" }, { text: "みんなの気持ちを優先", value: "F" }] },
  { id: "f17", dimension: "TF", text: "助言するとき？", options: [{ text: "現実的な解決策を", value: "T" }, { text: "相手の気持ちに寄り添う", value: "F" }] },
  { id: "f18", dimension: "TF", text: "争いごとでは？", options: [{ text: "正しいかどうかで判断", value: "T" }, { text: "関係を重視して判断", value: "F" }] },
  // J vs P（6問）
  { id: "f19", dimension: "JP", text: "スケジュールの立て方は？", options: [{ text: "計画的に事前に決める", value: "J" }, { text: "その時の気分で柔軟に", value: "P" }] },
  { id: "f20", dimension: "JP", text: "締め切り前は？", options: [{ text: "余裕を持って早めに仕上げる", value: "J" }, { text: "締め切り直前で集中する", value: "P" }] },
  { id: "f21", dimension: "JP", text: "旅行の計画は？", options: [{ text: "事前に細かく決める", value: "J" }, { text: "現地で決める", value: "P" }] },
  { id: "f22", dimension: "JP", text: "仕事の進め方は？", options: [{ text: "To-Doリストを作る", value: "J" }, { text: "その場の流れで進める", value: "P" }] },
  { id: "f23", dimension: "JP", text: "予定が変わったとき？", options: [{ text: "ストレスを感じる", value: "J" }, { text: "柔軟に対応する", value: "P" }] },
  { id: "f24", dimension: "JP", text: "部屋の状態は？", options: [{ text: "整理整頓されている", value: "J" }, { text: "必要なものが手の届くところにあればOK", value: "P" }] },
];

// ─── 16タイプ定義（4文字コード＋ニックネーム） ─────────────────
export const PERSONALITY_TYPES: Record<string, PersonalityType> = {
  INTJ: {
    code: "INTJ",
    nickname: "建築家",
    personality: "論理的で戦略的な思考を持つタイプ。長期的なビジョンを描き、効率を重視して目標達成に向かいます。独立心が強く、知識欲が旺盛です。",
    love: "深い絆を大切にし、パートナーと知的に刺激し合える関係を求めます。本音を共有できる相手と長く続く関係を築きます。",
    work: "戦略立案や専門分野の深掘りで力を発揮。一人で集中して取り組む仕事や、長期的なプロジェクトが向いています。",
    strength: "論理的思考・計画性・洞察力",
    weakness: "完璧主義・融通が利きにくい",
  },
  INTP: {
    code: "INTP",
    nickname: "論理学者",
    personality: "好奇心旺盛で理論を追求するタイプ。新しいアイデアやパターンに惹かれ、物事の本質を理解することに喜びを感じます。",
    love: "知的に刺激し合える相手を求めます。同じ趣味や関心を共有できる相手が理想です。",
    work: "研究・分析・システム設計など、論理的思考が活かせる仕事で真価を発揮します。",
    strength: "分析力・創造性・客観性",
    weakness: "細かい作業が苦手・社交が苦手",
  },
  ENTJ: {
    code: "ENTJ",
    nickname: "指揮官",
    personality: "リーダーシップと決断力に優れたタイプ。目標達成のために組織を動かし、効率的に成果を出します。",
    love: "対等なパートナーシップを好みます。一緒に目標を追いかけられる相手と相性が良いです。",
    work: "経営・マネジメント・プロジェクトリーダーなど、リーダー役で力を発揮します。",
    strength: "決断力・リーダーシップ・実行力",
    weakness: "厳しくなりがち・感情的配慮が不足",
  },
  ENTP: {
    code: "ENTP",
    nickname: "討論者",
    personality: "アイデア豊富で議論を楽しむタイプ。新しい可能性を探求し、常識に疑問を投げかけることで新しい価値を生み出します。",
    love: "刺激的で飽きのこない関係を好みます。議論できる相手と相性が良いです。",
    work: "起業・コンサル・企画など、新しい挑戦やアイデアが活かせる仕事が向いています。",
    strength: "創造性・機転・説得力",
    weakness: "継続が苦手・細部を軽視",
  },
  INFJ: {
    code: "INFJ",
    nickname: "提唱者",
    personality: "理想主義的で深い洞察力を持つタイプ。人の本質を見抜き、より良い世界のために行動します。",
    love: "深い精神的なつながりを求めます。理解し合える相手と一生のパートナー関係を築きます。",
    work: "カウンセリング・教育・NPOなど、人の成長や社会貢献に関わる仕事で力を発揮します。",
    strength: "洞察力・共感力・理想追求",
    weakness: "完璧主義・疲れやすい",
  },
  INFP: {
    code: "INFP",
    nickname: "仲介者",
    personality: "感受性豊かで価値観を大切にするタイプ。自分の信念に従い、創造的な表現や人の支えになることを喜びとします。",
    love: "心の通じ合いを重視。相手を理解し、理解される関係を求めます。",
    work: "創作・カウンセリング・福祉など、価値観が活かせる仕事が向いています。",
    strength: "共感力・創造性・誠実さ",
    weakness: "現実逃避・決断が遅い",
  },
  ENFJ: {
    code: "ENFJ",
    nickname: "主人公",
    personality: "人を導き、成長させることに喜びを感じるタイプ。カリスマ性と共感力で周囲を巻き込み、チームをまとめます。",
    love: "深い絆と成長を共有できる関係を求めます。パートナーを支え、一緒に成長することを大切にします。",
    work: "教育・人事・コーチングなど、人を育てる仕事で真価を発揮します。",
    strength: "リーダーシップ・共感力・熱意",
    weakness: "他人の評価を気にしすぎ・燃え尽き",
  },
  ENFP: {
    code: "ENFP",
    nickname: "広報運動家",
    personality: "自由で創造的、人を惹きつける魅力を持つタイプ。新しい可能性にワクワクし、周囲を巻き込んで盛り上げます。",
    love: "刺激的で楽しい関係を好みます。一緒に冒険できる相手と相性が良いです。",
    work: "マーケティング・イベント・クリエイティブなど、人と関わり創造性を発揮する仕事が向いています。",
    strength: "熱意・創造性・人を惹きつける力",
    weakness: "飽きっぽい・計画が苦手",
  },
  ISTJ: {
    code: "ISTJ",
    nickname: "管理者",
    personality: "責任感が強く、ルールと事実を重視するタイプ。着実に仕事をこなし、信頼される存在です。",
    love: "安定した関係を大切にします。約束を守り、誠実にパートナーに向き合います。",
    work: "事務・経理・品質管理など、正確さと継続性が求められる仕事で力を発揮します。",
    strength: "責任感・正確さ・忍耐力",
    weakness: "融通が利きにくい・変化が苦手",
  },
  ISFJ: {
    code: "ISFJ",
    nickname: "擁護者",
    personality: "献身的で細やかな気配りができるタイプ。人のために尽くすことを喜びとし、安定した関係を大切にします。",
    love: "相手を支え、守る関係を好みます。感謝されることで満足感を得ます。",
    work: "医療・介護・事務など、人を支える仕事で真価を発揮します。",
    strength: "献身・観察力・信頼性",
    weakness: "自己犠牲になりがち・断れない",
  },
  ESTJ: {
    code: "ESTJ",
    nickname: "幹部",
    personality: "組織をまとめ、ルールに基づいて行動するタイプ。効率と秩序を重視し、確実に成果を出します。",
    love: "安定した家庭を築くことを重視。パートナーと協力して目標を達成する関係を好みます。",
    work: "管理職・経営・法務など、組織を動かす仕事で力を発揮します。",
    strength: "実行力・責任感・組織力",
    weakness: "頑固・感情的配慮が不足",
  },
  ESFJ: {
    code: "ESFJ",
    nickname: "領事",
    personality: "社交的で人の世話を焼くことが好きなタイプ。調和を大切にし、周囲を明るく盛り上げます。",
    love: "家族や友人との絆を大切にします。パートナーを支え、一緒に楽しい時間を過ごすことを好みます。",
    work: "接客・人事・教育など、人と関わる仕事で真価を発揮します。",
    strength: "社交性・献身・協調性",
    weakness: "批判に弱い・他人の評価を気にする",
  },
  ISTP: {
    code: "ISTP",
    nickname: "達人",
    personality: "冷静で実用的なタイプ。物事の仕組みを理解し、手を動かして問題を解決することを得意とします。",
    love: "干渉されない自由な関係を好みます。一緒にアクティブに過ごせる相手と相性が良いです。",
    work: "エンジニア・整備・スポーツなど、技術や実践が活かせる仕事が向いています。",
    strength: "問題解決力・冷静さ・実用性",
    weakness: "感情表現が苦手・計画が苦手",
  },
  ISFP: {
    code: "ISFP",
    nickname: "探検家",
    personality: "穏やかで美的感覚に優れたタイプ。自分のペースで創造的な活動を楽しみ、今この瞬間を大切にします。",
    love: "穏やかで温かい関係を好みます。相手を尊重し、尊重される関係を求めます。",
    work: "デザイン・アート・美容など、創造性を活かす仕事が向いています。",
    strength: "美的感覚・柔軟性・共感力",
    weakness: "衝突を避けがち・計画が苦手",
  },
  ESTP: {
    code: "ESTP",
    nickname: "起業家",
    personality: "行動力と適応力に優れたタイプ。リスクを恐れず、その場の状況に合わせて素早く動きます。",
    love: "刺激的で楽しい関係を好みます。一緒にアクティブに過ごせる相手と相性が良いです。",
    work: "営業・起業・スポーツなど、行動力が活かせる仕事が向いています。",
    strength: "行動力・適応力・観察力",
    weakness: "長期的視点が弱い・細部を軽視",
  },
  ESFP: {
    code: "ESFP",
    nickname: "エンターテイナー",
    personality: "明るく人を楽しませることが好きなタイプ。その場の空気を読んで盛り上げ、周囲に笑顔を届けます。",
    love: "楽しく刺激的な関係を好みます。一緒に遊び、笑い合える相手が理想です。",
    work: "接客・エンタメ・イベントなど、人を楽しませる仕事で真価を発揮します。",
    strength: "明るさ・適応力・観察力",
    weakness: "計画が苦手・深い議論が苦手",
  },
};

// ─── スコアからタイプコードを算出 ─────────────────────────────
export function calcPersonalityType(scores: { E: number; I: number; S: number; N: number; T: number; F: number; J: number; P: number }): string {
  const e = scores.E >= scores.I ? "E" : "I";
  const s = scores.S >= scores.N ? "S" : "N";
  const t = scores.T >= scores.F ? "T" : "F";
  const j = scores.J >= scores.P ? "J" : "P";
  return `${e}${s}${t}${j}`;
}
