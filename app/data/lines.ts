import { LineDefinition, LineKey } from "../types";

export const LINE_DEFINITIONS: Record<LineKey, LineDefinition> = {
  lifeLine: {
    lineKey: "lifeLine",
    title: "生命線",
    description: "親指の付け根を囲むように走る線です",
    image: "/lines/生命線.png",
    questions: [
      {
        key: "lifeLine_present",
        label: "生命線はありますか？",
        options: [
          { value: "yes", label: "ある" },
          { value: "no", label: "ない・ほぼ見えない" },
        ],
      },
      {
        key: "lifeLine_length",
        label: "どこまで伸びていますか？",
        dependsOn: { key: "lifeLine_present", value: "yes" },
        options: [
          { value: "short", label: "短い（中指の下あたりまで）" },
          { value: "medium", label: "中程度（薬指の下あたりまで）" },
          { value: "long", label: "長い（小指の下・手首近くまで）" },
        ],
      },
      {
        key: "lifeLine_shape",
        label: "線の形は？",
        dependsOn: { key: "lifeLine_present", value: "yes" },
        options: [
          { value: "straight", label: "まっすぐ" },
          { value: "curved", label: "弧を描いている" },
        ],
      },
      {
        key: "lifeLine_condition",
        label: "線の状態は？",
        dependsOn: { key: "lifeLine_present", value: "yes" },
        options: [
          { value: "clear", label: "くっきりしている" },
          { value: "faint", label: "薄い" },
          { value: "broken", label: "途切れがある" },
        ],
      },
    ],
  },

  heartLine: {
    lineKey: "heartLine",
    title: "感情線",
    description: "小指側から人差し指に向かって横に走る線です",
    image: "/lines/感情線.png",
    questions: [
      {
        key: "heartLine_present",
        label: "感情線はありますか？",
        options: [
          { value: "yes", label: "ある" },
          { value: "no", label: "ない・ほぼ見えない" },
        ],
      },
      {
        key: "heartLine_length",
        label: "どこまで伸びていますか？",
        dependsOn: { key: "heartLine_present", value: "yes" },
        options: [
          { value: "short", label: "短い（中指の下あたりまで）" },
          { value: "medium", label: "中程度（人差し指と中指の間まで）" },
          { value: "long", label: "長い（人差し指の下まで）" },
        ],
      },
      {
        key: "heartLine_shape",
        label: "線の形は？",
        dependsOn: { key: "heartLine_present", value: "yes" },
        options: [
          { value: "straight", label: "まっすぐ" },
          { value: "up", label: "上向きにカーブ" },
          { value: "down", label: "下向きにカーブ" },
        ],
      },
      {
        key: "heartLine_condition",
        label: "線の状態は？",
        dependsOn: { key: "heartLine_present", value: "yes" },
        options: [
          { value: "clear", label: "くっきりしている" },
          { value: "faint", label: "薄い" },
          { value: "branched", label: "枝分かれしている" },
        ],
      },
    ],
  },

  headLine: {
    lineKey: "headLine",
    title: "頭脳線",
    description: "生命線の上から横に走る線です",
    image: "/lines/知能線.png",
    questions: [
      {
        key: "headLine_present",
        label: "頭脳線はありますか？",
        options: [
          { value: "yes", label: "ある" },
          { value: "no", label: "ない・ほぼ見えない" },
        ],
      },
      {
        key: "headLine_length",
        label: "どこまで伸びていますか？",
        dependsOn: { key: "headLine_present", value: "yes" },
        options: [
          { value: "short", label: "短い（中指の下あたりまで）" },
          { value: "medium", label: "中程度（薬指の下あたりまで）" },
          { value: "long", label: "長い（小指の下まで）" },
        ],
      },
      {
        key: "headLine_direction",
        label: "線の方向は？",
        dependsOn: { key: "headLine_present", value: "yes" },
        options: [
          { value: "straight", label: "まっすぐ横に伸びている" },
          { value: "down", label: "下向きにカーブ" },
          { value: "up", label: "上向きにカーブ" },
        ],
      },
      {
        key: "headLine_condition",
        label: "線の状態は？",
        dependsOn: { key: "headLine_present", value: "yes" },
        options: [
          { value: "clear", label: "くっきりしている" },
          { value: "faint", label: "薄い" },
          { value: "broken", label: "途切れがある" },
        ],
      },
    ],
  },

  fateLine: {
    lineKey: "fateLine",
    title: "運命線",
    description: "手首から中指に向かって縦に走る線です",
    image: "/lines/運命線.png",
    questions: [
      {
        key: "fateLine_present",
        label: "運命線はありますか？",
        options: [
          { value: "yes", label: "ある" },
          { value: "no", label: "ない・ほぼ見えない" },
        ],
      },
      {
        key: "fateLine_origin",
        label: "線はどこから始まっていますか？",
        dependsOn: { key: "fateLine_present", value: "yes" },
        options: [
          { value: "wrist", label: "手首のあたりから" },
          { value: "middle", label: "手のひらの中間から" },
          { value: "heartline", label: "感情線付近から" },
        ],
      },
      {
        key: "fateLine_condition",
        label: "線の状態は？",
        dependsOn: { key: "fateLine_present", value: "yes" },
        options: [
          { value: "straight", label: "まっすぐくっきり" },
          { value: "broken", label: "途切れがある" },
          { value: "multiple", label: "複数本ある" },
        ],
      },
    ],
  },

  marriageLine: {
    lineKey: "marriageLine",
    title: "結婚線",
    description: "小指の下・感情線の上にある短い横線です",
    image: "/lines/結婚線.png",
    questions: [
      {
        key: "marriageLine_present",
        label: "結婚線はありますか？",
        options: [
          { value: "yes", label: "ある" },
          { value: "no", label: "ない・ほぼ見えない" },
        ],
      },
      {
        key: "marriageLine_count",
        label: "何本ありますか？",
        dependsOn: { key: "marriageLine_present", value: "yes" },
        options: [
          { value: "one", label: "1本" },
          { value: "two", label: "2本" },
          { value: "many", label: "3本以上" },
        ],
      },
      {
        key: "marriageLine_length",
        label: "線の長さは？",
        dependsOn: { key: "marriageLine_present", value: "yes" },
        options: [
          { value: "short", label: "短い" },
          { value: "medium", label: "中程度" },
          { value: "long", label: "長い（薬指の下あたりまで）" },
        ],
      },
      {
        key: "marriageLine_condition",
        label: "線の状態は？",
        dependsOn: { key: "marriageLine_present", value: "yes" },
        options: [
          { value: "clear", label: "くっきりしている" },
          { value: "faint", label: "薄い" },
          { value: "forked", label: "先が二股に分かれている" },
        ],
      },
    ],
  },

  moneyLine: {
    lineKey: "moneyLine",
    title: "財運線",
    description: "小指の付け根から感情線に向かう短い縦線です（水星線）",
    image: "/lines/財運線.png",
    questions: [
      {
        key: "moneyLine_present",
        label: "財運線はありますか？",
        options: [
          { value: "yes", label: "ある" },
          { value: "no", label: "ない・ほぼ見えない" },
        ],
      },
      {
        key: "moneyLine_length",
        label: "線の長さは？",
        dependsOn: { key: "moneyLine_present", value: "yes" },
        options: [
          { value: "short", label: "短い" },
          { value: "long", label: "長い（感情線まで届く）" },
        ],
      },
      {
        key: "moneyLine_condition",
        label: "線の状態は？",
        dependsOn: { key: "moneyLine_present", value: "yes" },
        options: [
          { value: "clear", label: "くっきりしている" },
          { value: "faint", label: "薄い" },
          { value: "multiple", label: "複数本ある" },
        ],
      },
    ],
  },
};
