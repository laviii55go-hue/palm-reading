export interface MoleArea {
  number: number;
  label: string;
  description: string;
}

export const MOLE_AREAS: MoleArea[] = [
  { number: 1, label: "親指・先端側", description: "親指の上部" },
  { number: 2, label: "親指・付け根側", description: "親指の下部" },
  { number: 3, label: "人差し指・先端", description: "人差し指の上部" },
  { number: 4, label: "人差し指・中間", description: "人差し指の中間" },
  { number: 5, label: "人差し指・付け根", description: "人差し指の下部" },
  { number: 6, label: "中指・先端", description: "中指の上部" },
  { number: 7, label: "中指・中間", description: "中指の中間" },
  { number: 8, label: "中指・付け根", description: "中指の下部" },
  { number: 9, label: "薬指・先端", description: "薬指の上部" },
  { number: 10, label: "薬指・中間", description: "薬指の中間" },
  { number: 11, label: "薬指・付け根", description: "薬指の下部" },
  { number: 12, label: "小指・先端", description: "小指の上部" },
  { number: 13, label: "小指・中間", description: "小指の中間" },
  { number: 14, label: "小指・付け根", description: "小指の下部" },
  { number: 15, label: "木星丘", description: "人差し指の付け根の膨らみ" },
  { number: 16, label: "土星丘・太陽丘", description: "中指〜薬指の付け根" },
  { number: 17, label: "水星丘", description: "小指の付け根の膨らみ" },
  { number: 18, label: "金星丘", description: "親指の付け根の大きな膨らみ" },
  { number: 19, label: "火星平原", description: "手のひらの中央" },
  { number: 20, label: "月丘", description: "小指側の手首寄りの膨らみ" },
  { number: 21, label: "手首付近", description: "手首の中央付近" },
];
