export interface MoleArea {
  number: number;
  label: string;
  description: string;
  side: "palm" | "back";
}

export const MOLE_AREAS: MoleArea[] = [
  // ── 手のひら側（1〜21） ──────────────────────────
  { number: 1,  label: "親指・先端側",     description: "親指の上部",                       side: "palm" },
  { number: 2,  label: "親指・付け根側",   description: "親指の下部",                       side: "palm" },
  { number: 3,  label: "人差し指・先端",   description: "人差し指の上部",                   side: "palm" },
  { number: 4,  label: "人差し指・中間",   description: "人差し指の中間",                   side: "palm" },
  { number: 5,  label: "人差し指・付け根", description: "人差し指の下部",                   side: "palm" },
  { number: 6,  label: "中指・先端",       description: "中指の上部",                       side: "palm" },
  { number: 7,  label: "中指・中間",       description: "中指の中間",                       side: "palm" },
  { number: 8,  label: "中指・付け根",     description: "中指の下部",                       side: "palm" },
  { number: 9,  label: "薬指・先端",       description: "薬指の上部",                       side: "palm" },
  { number: 10, label: "薬指・中間",       description: "薬指の中間",                       side: "palm" },
  { number: 11, label: "薬指・付け根",     description: "薬指の下部",                       side: "palm" },
  { number: 12, label: "小指・先端",       description: "小指の上部",                       side: "palm" },
  { number: 13, label: "小指・中間",       description: "小指の中間",                       side: "palm" },
  { number: 14, label: "小指・付け根",     description: "小指の下部",                       side: "palm" },
  { number: 15, label: "木星丘",           description: "人差し指の付け根の膨らみ",         side: "palm" },
  { number: 16, label: "土星丘・太陽丘",   description: "中指〜薬指の付け根",               side: "palm" },
  { number: 17, label: "水星丘",           description: "小指の付け根の膨らみ",             side: "palm" },
  { number: 18, label: "金星丘",           description: "親指の付け根の大きな膨らみ",       side: "palm" },
  { number: 19, label: "火星平原",         description: "手のひらの中央",                   side: "palm" },
  { number: 20, label: "月丘",             description: "小指側の手首寄りの膨らみ",         side: "palm" },
  { number: 21, label: "手首付近（ひら側）", description: "手首の中央付近（手のひら側）",   side: "palm" },

  // ── 手の甲側（22〜40） ──────────────────────────
  { number: 22, label: "親指・先端（甲）",     description: "親指の爪側・先端部",           side: "back" },
  { number: 23, label: "親指・中間（甲）",     description: "親指の甲側・中間〜付け根",     side: "back" },
  { number: 24, label: "人差し指・先端（甲）", description: "人差し指の爪側・先端部",       side: "back" },
  { number: 25, label: "人差し指・中間（甲）", description: "人差し指の甲側・中間",         side: "back" },
  { number: 26, label: "人差し指・付け根（甲）", description: "人差し指の甲側・付け根",     side: "back" },
  { number: 27, label: "中指・先端（甲）",     description: "中指の爪側・先端部",           side: "back" },
  { number: 28, label: "中指・中間（甲）",     description: "中指の甲側・中間",             side: "back" },
  { number: 29, label: "中指・付け根（甲）",   description: "中指の甲側・付け根",           side: "back" },
  { number: 30, label: "薬指・先端（甲）",     description: "薬指の爪側・先端部",           side: "back" },
  { number: 31, label: "薬指・中間（甲）",     description: "薬指の甲側・中間",             side: "back" },
  { number: 32, label: "薬指・付け根（甲）",   description: "薬指の甲側・付け根",           side: "back" },
  { number: 33, label: "小指・先端（甲）",     description: "小指の爪側・先端部",           side: "back" },
  { number: 34, label: "小指・中間（甲）",     description: "小指の甲側・中間",             side: "back" },
  { number: 35, label: "小指・付け根（甲）",   description: "小指の甲側・付け根",           side: "back" },
  { number: 36, label: "甲・親指側",           description: "手の甲の親指寄り（第一中手骨付近）", side: "back" },
  { number: 37, label: "甲・人差し指〜中指間", description: "手の甲の中央より親指側",       side: "back" },
  { number: 38, label: "甲・薬指〜小指間",     description: "手の甲の中央より小指側",       side: "back" },
  { number: 39, label: "甲・中央",             description: "手の甲のちょうど中央",         side: "back" },
  { number: 40, label: "手首付近（甲側）",     description: "手首の中央付近（手の甲側）",   side: "back" },
];
