// ─── 手相タイプ診断クイズ データ ─────────────────────────────────

export const QUIZ_QUESTIONS = [
  {
    id: "heart",
    emoji: "💕",
    lineName: "感情線",
    image: "/lines/感情線.png",
    question: "感情線の長さは？",
    options: [
      { value: "short", label: "短い（中指の下あたりまで）", type: "practical" },
      { value: "medium", label: "普通", type: "balance" },
      { value: "long", label: "長い（人差し指の下まで伸びている）", type: "romantic" },
    ],
  },
  {
    id: "life",
    emoji: "💚",
    lineName: "生命線",
    image: "/lines/生命線.png",
    question: "生命線の弧の大きさは？",
    options: [
      { value: "large", label: "大きい（手のひらを広く囲む）", type: "active" },
      { value: "medium", label: "普通", type: "balance" },
      { value: "small", label: "小さい（親指の付け根付近）", type: "cautious" },
    ],
  },
  {
    id: "head",
    emoji: "🧠",
    lineName: "頭脳線",
    image: "/lines/知能線.png",
    question: "頭脳線の向きは？",
    options: [
      { value: "straight", label: "まっすぐ横に伸びる", type: "logical" },
      { value: "down", label: "下向きにカーブ", type: "creative" },
      { value: "up", label: "上向き気味", type: "ambitious" },
    ],
  },
  {
    id: "fate",
    emoji: "⭐",
    lineName: "運命線",
    image: "/lines/運命線.png",
    question: "運命線の状態は？",
    options: [
      { value: "clear", label: "くっきりはっきりある", type: "career" },
      { value: "faint", label: "薄い・短い", type: "free" },
      { value: "none", label: "ない・ほとんど見えない", type: "free" },
    ],
  },
  {
    id: "start",
    emoji: "✋",
    lineName: "生命線・頭脳線",
    image: "/lines/基本4線.png",
    question: "生命線と頭脳線の始まりは？",
    options: [
      { value: "connected", label: "くっついている", type: "cautious" },
      { value: "separate", label: "離れている", type: "active" },
    ],
  },
  {
    id: "heart_shape",
    emoji: "💗",
    lineName: "感情線",
    image: "/lines/感情線.png",
    question: "感情線の形は？",
    options: [
      { value: "curve_up", label: "先端が上向きにカーブ", type: "romantic" },
      { value: "straight", label: "まっすぐ", type: "practical" },
      { value: "wavy", label: "波打っている・鎖状", type: "sensitive" },
    ],
  },
];

export const QUIZ_RESULTS: Record<
  string,
  { emoji: string; name: string; description: string; keywords: string[]; advice: string }
> = {
  romantic: {
    emoji: "💕",
    name: "恋愛重視型",
    description: "感情線が発達した、感受性豊かで情熱的なタイプ。恋愛や人間関係を大切にし、相手の気持ちに寄り添える力があります。",
    keywords: ["感受性豊か", "情熱的", "ロマンチック", "共感力"],
    advice: "あなたの愛情表現は周囲を温かくします。ただし、相手に依存しすぎないよう、自分らしさも大切に。",
  },
  career: {
    emoji: "💼",
    name: "キャリア重視型",
    description: "運命線や頭脳線が明確な、目標に向かって進む力強いタイプ。仕事や社会的成功への意欲が高く、努力を惜しみません。",
    keywords: ["目標志向", "努力家", "決断力", "リーダーシップ"],
    advice: "あなたの集中力は大きな成果を生みます。時には息抜きも忘れず、心身のバランスを。",
  },
  creative: {
    emoji: "🎨",
    name: "クリエイティブ型",
    description: "頭脳線が下向きの、芸術的センスと想像力が豊かなタイプ。独自のアイデアで新しい価値を生み出すのが得意です。",
    keywords: ["想像力", "芸術性", "独自性", "発想力"],
    advice: "あなたの感性は唯一無二の財産。周りに合わせすぎず、自分の感性を信じて表現してみて。",
  },
  logical: {
    emoji: "📐",
    name: "論理思考型",
    description: "頭脳線がまっすぐな、論理的で現実的な思考のタイプ。分析力に優れ、ビジネスや計画立案で力を発揮します。",
    keywords: ["論理的", "分析的", "現実的", "計画的"],
    advice: "あなたの冷静な判断は信頼を集めます。時には直感を頼りに、新しい挑戦にも目を向けて。",
  },
  free: {
    emoji: "🦋",
    name: "自由人型",
    description: "運命線が薄い・ない、自由な生き方を選ぶタイプ。型にはまらず、自分らしい道を切り開く力があります。",
    keywords: ["自由奔放", "マイペース", "独自性", "柔軟性"],
    advice: "あなたの自由さは周囲を惹きつけます。大切な人との約束は守りつつ、自分らしさを大切に。",
  },
  active: {
    emoji: "🔥",
    name: "行動派型",
    description: "生命線の弧が大きく、行動力にあふれたタイプ。好奇心旺盛で、新しいことへの挑戦を恐れません。",
    keywords: ["行動力", "好奇心", "外交的", "チャレンジ精神"],
    advice: "あなたのエネルギーは人を巻き込みます。時には一呼吸置いて、周囲のペースにも合わせて。",
  },
  cautious: {
    emoji: "🛡️",
    name: "慎重堅実型",
    description: "生命線と頭脳線がくっついた、慎重で堅実なタイプ。石橋を叩いて渡る姿勢で、着実に成果を積み上げます。",
    keywords: ["慎重", "堅実", "準備万端", "信頼"],
    advice: "あなたの丁寧さは確かな信頼を生みます。たまには小さな冒険も、成長のチャンスに。",
  },
  sensitive: {
    emoji: "🌸",
    name: "繊細感受型",
    description: "感情線が波打つ、繊細で感受性の高いタイプ。人の気持ちに敏感で、深い共感力を持っています。",
    keywords: ["繊細", "感受性", "共感力", "思いやり"],
    advice: "あなたの優しさは多くの人を支えます。自分を労わる時間も忘れずに。",
  },
  balance: {
    emoji: "⚖️",
    name: "バランス型",
    description: "各線がバランス良くある、穏やかで安定したタイプ。恋愛も仕事も、ほどよいバランスで人生を歩みます。",
    keywords: ["バランス", "安定", "穏やか", "適応力"],
    advice: "あなたの安定感は周囲の安心感。無理をせず、自分のペースを大切に。",
  },
  practical: {
    emoji: "📋",
    name: "現実主義型",
    description: "感情線が短めなど、現実的で合理的な判断をするタイプ。ドライに見られがちですが、的確な判断力が強みです。",
    keywords: ["現実的", "合理的", "的確", "効率重視"],
    advice: "あなたの冷静さは的確な判断を生みます。時には感情に従う選択も、人生を豊かにします。",
  },
  ambitious: {
    emoji: "🚀",
    name: "野心家型",
    description: "頭脳線が上向きなど、上昇志向の強いタイプ。目標を高く掲げ、努力で実現しようとする力があります。",
    keywords: ["野心", "上昇志向", "目標達成", "向上心"],
    advice: "あなたの情熱は夢を実現させます。達成の喜びを味わう余裕も忘れずに。",
  },
};
