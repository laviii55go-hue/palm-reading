import { FortuneType, LineKey } from "../types";

export const FORTUNE_LINE_KEYS: Record<FortuneType, LineKey[]> = {
  general:      ["lifeLine", "heartLine", "headLine", "fateLine"],
  love:         ["heartLine", "lifeLine", "marriageLine"],
  marriage:     ["marriageLine", "heartLine", "fateLine"],
  career:       ["fateLine", "headLine"],
  money:        ["moneyLine", "fateLine"],
  health:       ["lifeLine", "headLine"],
  relationship: ["heartLine", "headLine", "lifeLine"],
};
