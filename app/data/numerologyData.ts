export type NumerologyEntry = {
  number: number;
  title: string;
  emoji: string;
  keywords: string[];
  personality: string;
  strengths: string[];
  weaknesses: string[];
  love: string;
  career: string;
  compatible: number[];
  incompatible: number[];
  luckyColor: string;
  luckyItem: string;
  rakutenKeyword: string;
};

export type PersonalYearEntry = {
  year: number;
  theme: string;
  message: string;
};

export const NUMEROLOGY_DATA: Record<number, NumerologyEntry> = {
  1: {
    number: 1,
    title: "開拓者",
    emoji: "🔥",
    keywords: ["リーダーシップ", "独立心", "行動力", "創造性"],
    personality:
      "あなたは生まれながらのリーダーです。強い意志と独立心を持ち、自分の道を切り開く力があります。新しいことへの挑戦を恐れず、周囲を引っ張っていける存在です。",
    strengths: ["決断力が高い", "パイオニア精神", "自立心が強い", "目標達成への集中力"],
    weaknesses: ["頑固になりやすい", "人の意見を聞きにくい", "孤独を感じやすい"],
    love: "情熱的に愛する一方、束縛を嫌います。対等なパートナーシップを求め、相手の自立も尊重します。",
    career: "起業家・経営者・リーダー職・クリエイター・スポーツ選手に向いています。",
    compatible: [3, 5, 9],
    incompatible: [2, 8],
    luckyColor: "赤・ゴールド",
    luckyItem: "太陽モチーフのアクセサリー",
    rakutenKeyword: "開運 赤 パワーストーン",
  },
  2: {
    number: 2,
    title: "調和の人",
    emoji: "🌙",
    keywords: ["協調性", "直感力", "思いやり", "繊細さ"],
    personality:
      "あなたは周囲の感情を敏感に察知する、共感力の高い人です。争いを好まず、人と人をつなぐ橋渡し役として力を発揮します。細部への気配りと直感力が人生の武器です。",
    strengths: ["高い共感力", "細やかな気配り", "外交的センス", "忍耐力"],
    weaknesses: ["優柔不断になりやすい", "傷つきやすい", "依存しやすい"],
    love: "献身的で思いやり深い恋人です。相手の気持ちを優先しすぎて自分を犠牲にしないよう注意が必要です。",
    career: "カウンセラー・教師・看護師・外交官・調停役・サポートスタッフに向いています。",
    compatible: [4, 6, 8],
    incompatible: [1, 5],
    luckyColor: "白・シルバー",
    luckyItem: "月モチーフのアクセサリー",
    rakutenKeyword: "ムーンストーン アクセサリー",
  },
  3: {
    number: 3,
    title: "表現者",
    emoji: "✨",
    keywords: ["創造性", "表現力", "社交性", "楽観性"],
    personality:
      "あなたは明るく社交的で、周囲を笑顔にする力を持っています。創造力と表現力が豊かで、言葉・アート・音楽などで自分を表現することが得意です。",
    strengths: ["豊かな創造性", "コミュニケーション能力", "楽観的な姿勢", "エンターテイナーの才能"],
    weaknesses: ["集中力が続きにくい", "散漫になりやすい", "表面的になることも"],
    love: "明るく楽しいパートナーです。恋愛を楽しむことが上手ですが、飽きやすい面も。刺激的な関係を好みます。",
    career: "アーティスト・作家・俳優・デザイナー・教育者・PRや広報に向いています。",
    compatible: [1, 5, 9],
    incompatible: [4, 7],
    luckyColor: "黄色・オレンジ",
    luckyItem: "クリエイティブな文具・アートグッズ",
    rakutenKeyword: "シトリン パワーストーン ブレスレット",
  },
  4: {
    number: 4,
    title: "堅実な建設者",
    emoji: "🏛️",
    keywords: ["堅実さ", "忍耐力", "誠実さ", "組織力"],
    personality:
      "あなたは誠実で信頼性が高く、コツコツと物事を積み上げる力を持っています。計画性と組織力があり、しっかりとした基盤を築くことに長けています。",
    strengths: ["高い信頼性", "強い忍耐力", "計画実行能力", "細部への注意力"],
    weaknesses: ["融通が利きにくい", "変化を嫌う傾向", "完璧主義になりやすい"],
    love: "誠実で安定した恋愛をします。急な展開より、じっくりと信頼関係を築いていくスタイルを好みます。",
    career: "建築家・エンジニア・会計士・管理職・農業・研究者に向いています。",
    compatible: [2, 6, 8],
    incompatible: [3, 5],
    luckyColor: "緑・茶色",
    luckyItem: "四葉のクローバーモチーフ",
    rakutenKeyword: "翡翠 パワーストーン 開運",
  },
  5: {
    number: 5,
    title: "自由人",
    emoji: "🌟",
    keywords: ["自由", "冒険心", "変化", "多才"],
    personality:
      "あなたは自由を愛し、変化と冒険を求める行動派です。好奇心旺盛で多才、さまざまなことに挑戦します。新しい経験を通して成長し、人生を思い切り楽しみます。",
    strengths: ["適応能力の高さ", "多才さ・多面性", "行動力", "魅力的なカリスマ性"],
    weaknesses: ["飽きやすい", "不安定になりやすい", "衝動的な判断も"],
    love: "自由で刺激的な恋愛を好みます。束縛は苦手ですが、魅力的で多くの人を引きつけます。",
    career: "旅行業・マーケター・ジャーナリスト・営業職・フリーランスに向いています。",
    compatible: [1, 3, 7],
    incompatible: [2, 4],
    luckyColor: "青・ターコイズ",
    luckyItem: "旅や冒険モチーフのグッズ",
    rakutenKeyword: "ターコイズ アクセサリー 開運",
  },
  6: {
    number: 6,
    title: "愛の守護者",
    emoji: "💖",
    keywords: ["愛情", "責任感", "奉仕", "美的センス"],
    personality:
      "あなたは深い愛情と責任感を持ち、家族や周囲の人を大切にする人です。美的センスも高く、調和ある環境を作り出すことが得意です。",
    strengths: ["深い愛情と思いやり", "強い責任感", "美的センス", "家族・コミュニティへの献身"],
    weaknesses: ["干渉しすぎる傾向", "完璧主義", "自己犠牲的になりやすい"],
    love: "理想的な恋人・パートナーです。愛することに情熱を注ぎ、家庭的な幸せを大切にします。",
    career: "医療・福祉・教育・デザイナー・料理人・カウンセラーに向いています。",
    compatible: [2, 4, 9],
    incompatible: [1, 5],
    luckyColor: "ピンク・ローズ",
    luckyItem: "ローズクォーツ",
    rakutenKeyword: "ローズクォーツ ブレスレット 恋愛運",
  },
  7: {
    number: 7,
    title: "探求者",
    emoji: "🔮",
    keywords: ["知性", "内省", "霊性", "分析力"],
    personality:
      "あなたは深い知性と洞察力を持つ探求者です。表面的なことより本質を追い求め、哲学・スピリチュアル・科学などの深い世界に引き込まれます。",
    strengths: ["高い分析力と洞察力", "深い集中力", "知的探求心", "直感力"],
    weaknesses: ["人と距離を置きやすい", "孤独を好みすぎる", "完璧主義"],
    love: "感情より知性で相手を判断しがちです。心から信頼できる相手との深い絆を求めます。",
    career: "研究者・哲学者・占い師・IT専門家・作家・精神科医に向いています。",
    compatible: [5, 9, 11],
    incompatible: [2, 6],
    luckyColor: "紫・インディゴ",
    luckyItem: "アメジスト・占いグッズ",
    rakutenKeyword: "アメジスト パワーストーン 直感力",
  },
  8: {
    number: 8,
    title: "権力者",
    emoji: "💎",
    keywords: ["野心", "物質的成功", "リーダーシップ", "実行力"],
    personality:
      "あなたは強い野心と実行力を持ち、目標に向かって突き進む人です。ビジネスや組織において力を発揮し、物質的な成功を手にする潜在力があります。",
    strengths: ["高い実行力", "戦略的思考", "経営センス", "強いリーダーシップ"],
    weaknesses: ["支配的になりやすい", "仕事優先になりがち", "物質主義的傾向"],
    love: "情熱的ですが、仕事を優先しがちです。対等で野心的なパートナーと相性が良いです。",
    career: "実業家・金融・不動産・政治家・スポーツ選手・投資家に向いています。",
    compatible: [2, 4, 6],
    incompatible: [1, 7],
    luckyColor: "ブラック・ゴールド",
    luckyItem: "タイガーアイ・財布",
    rakutenKeyword: "タイガーアイ 金運 パワーストーン",
  },
  9: {
    number: 9,
    title: "人道主義者",
    emoji: "🌏",
    keywords: ["奉仕", "慈悲", "普遍的な愛", "完成"],
    personality:
      "あなたは1〜8のすべての数字のエネルギーを内包する、魂の成熟した人です。普遍的な愛と奉仕の精神を持ち、世界や人類のために貢献することに使命を感じます。",
    strengths: ["深い慈悲心", "広い視野", "芸術的才能", "精神的な強さ"],
    weaknesses: ["自己犠牲しすぎる", "感情的になりやすい", "現実逃避することも"],
    love: "深く純粋な愛を与えます。理想が高く、スピリチュアルな繋がりを求めます。",
    career: "芸術家・NGO活動家・精神的指導者・医師・教育者に向いています。",
    compatible: [1, 3, 6],
    incompatible: [4, 8],
    luckyColor: "金・白",
    luckyItem: "クリスタル・天然石",
    rakutenKeyword: "クリスタル 天然石 浄化",
  },
  11: {
    number: 11,
    title: "光の使者",
    emoji: "⚡",
    keywords: ["直感", "啓示", "霊的感受性", "インスピレーション"],
    personality:
      "11はマスターナンバーと呼ばれる特別な数字です。極めて高い直感力と霊的感受性を持ち、他者に光とインスピレーションをもたらす存在です。使命感が強く、スピリチュアルな覚醒を体験することも多いでしょう。",
    strengths: ["卓越した直感力", "霊的感受性", "カリスマ性", "人を鼓舞する力"],
    weaknesses: ["過度な緊張・不安", "現実との乖離", "エネルギーの消耗が激しい"],
    love: "深いスピリチュアルな繋がりを求めます。魂レベルで共鳴できるパートナーとの出会いが重要です。",
    career: "スピリチュアルリーダー・芸術家・教師・発明家・占い師に向いています。",
    compatible: [2, 7, 9],
    incompatible: [4, 8],
    luckyColor: "シルバー・白",
    luckyItem: "ムーンストーン・水晶",
    rakutenKeyword: "水晶 浄化 スピリチュアル",
  },
  22: {
    number: 22,
    title: "マスタービルダー",
    emoji: "🏗️",
    keywords: ["大きな夢", "実現力", "組織力", "遺産"],
    personality:
      "22はすべてのマスターナンバーの中で最も強力とされます。夢想家でありながら実行者でもあり、世界規模のビジョンを現実にする力を持っています。偉大な遺産を残す可能性を秘めた数字です。",
    strengths: ["壮大なビジョン", "強力な実行力", "リーダーシップ", "継続的な努力"],
    weaknesses: ["プレッシャーに弱くなることも", "完璧主義", "孤独感"],
    love: "使命感と愛を両立できるパートナーを求めます。深くゆっくり絆を育てるタイプです。",
    career: "建築家・政治家・起業家・社会変革者・大規模プロジェクトのリーダーに向いています。",
    compatible: [4, 6, 8],
    incompatible: [3, 5],
    luckyColor: "ゴールド・深緑",
    luckyItem: "建築・構造物モチーフ",
    rakutenKeyword: "開運 金運 お守り",
  },
  33: {
    number: 33,
    title: "奉仕の師",
    emoji: "🕊️",
    keywords: ["無条件の愛", "慈悲", "癒し", "奉仕"],
    personality:
      "33は「マスターティーチャー」とも呼ばれる最高位の数字です。無条件の愛と深い慈悲心で、多くの人を癒し、導く存在です。使命は愛によって世界を変えること。非常に稀で、特別な魂のしるしです。",
    strengths: ["深い愛と慈悲", "癒しの力", "感情的知性", "他者への奉仕"],
    weaknesses: ["自己犠牲しすぎる", "過負荷になりやすい", "理想主義的すぎることも"],
    love: "愛そのものを体現する存在です。深く純粋な愛を与えますが、自分自身を大切にすることも忘れずに。",
    career: "ヒーラー・宗教家・精神的指導者・医師・ソーシャルワーカーに向いています。",
    compatible: [6, 9, 11],
    incompatible: [1, 8],
    luckyColor: "金・白・ローズ",
    luckyItem: "ローズクォーツ・天使モチーフ",
    rakutenKeyword: "天使 アクセサリー ヒーリング",
  },
};

export const PERSONAL_YEAR_DATA: Record<number, PersonalYearEntry> = {
  1: {
    year: 1,
    theme: "新しいスタートの年",
    message:
      "9年サイクルの始まりです。新しいことを始めるのに最適な時期。勇気を持って一歩を踏み出しましょう。蒔いた種が将来の実りになります。",
  },
  2: {
    year: 2,
    theme: "関係と協力の年",
    message:
      "人との繋がりを大切にする時期。忍耐を持ってゆっくり進むことが鍵。パートナーシップや協力関係が重要になります。",
  },
  3: {
    year: 3,
    theme: "表現と創造の年",
    message:
      "自分を表現する力が高まります。創造的な活動や社交に積極的に参加しましょう。喜びと楽しみを人生に取り入れる時期です。",
  },
  4: {
    year: 4,
    theme: "基盤固めの年",
    message:
      "堅実に努力を積み重ねる時期。将来のための土台作りに集中しましょう。地道な努力が後々大きな実りになります。",
  },
  5: {
    year: 5,
    theme: "変化と自由の年",
    message:
      "大きな変化が訪れる可能性があります。新しい経験を恐れずに受け入れましょう。旅行・学習・新しい挑戦がラッキーです。",
  },
  6: {
    year: 6,
    theme: "愛と責任の年",
    message:
      "家族・愛・コミュニティに焦点が当たります。人間関係の調和を大切にしましょう。奉仕することで喜びが倍増します。",
  },
  7: {
    year: 7,
    theme: "内省と成長の年",
    message:
      "内面を見つめ直すことが大切な時期。学習・研究・スピリチュアルな探求に力を注ぎましょう。一人の時間を大切に。",
  },
  8: {
    year: 8,
    theme: "豊かさと達成の年",
    message:
      "物質的な成功と達成のエネルギーが高まります。野心を持ってビジネスや目標に取り組みましょう。努力が実を結ぶ時期です。",
  },
  9: {
    year: 9,
    theme: "完成と手放しの年",
    message:
      "9年サイクルの締めくくり。古いものを手放し、次のサイクルへの準備をする時期。感謝と奉仕の心で締めくくりましょう。",
  },
};

export function calcLifePathNumber(year: number, month: number, day: number): number {
  const digits = `${year}${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}`
    .split("")
    .map(Number);

  let sum = digits.reduce((a, b) => a + b, 0);

  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = String(sum)
      .split("")
      .map(Number)
      .reduce((a, b) => a + b, 0);
  }

  return sum;
}

export function calcPersonalYearNumber(birthMonth: number, birthDay: number, currentYear: number): number {
  const digits = `${currentYear}${String(birthMonth).padStart(2, "0")}${String(birthDay).padStart(2, "0")}`
    .split("")
    .map(Number);

  let sum = digits.reduce((a, b) => a + b, 0);

  while (sum > 9) {
    sum = String(sum)
      .split("")
      .map(Number)
      .reduce((a, b) => a + b, 0);
  }

  return sum;
}
