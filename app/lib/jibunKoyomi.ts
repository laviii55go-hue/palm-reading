// ─── じぶん暦 統合鑑定ロジック（算命学 × 数秘術） ─────────────
// 算命学エンジン（lib/sanmei）と数秘術（data/numerologyData）の結果を
// 5軸写像で統合する。データは data/jibunKoyomiData.ts。

import {
  calcSanmei,
  calcFortune,
  type SanmeiResult,
  type FortuneNow,
} from "./sanmei/engine";
import { MAIN_STARS } from "../data/sanmeiTextData";
import {
  calcLifePathNumber,
  calcPersonalYearNumber,
} from "../data/numerologyData";
import {
  ELEMENT_TO_AXIS,
  LIFEPATH_TO_AXIS,
  CROSS_MATRIX,
  crossRelation,
  type AxisKey,
  type CrossRelation,
  type CrossEntry,
} from "../data/jibunKoyomiData";

export type YMD = { year: number; month: number; day: number };

export type JibunKoyomiResult = {
  sanmei: SanmeiResult;
  fortune: FortuneNow;
  lifePath: number;
  personalYear: number;
  /** 外の顔（算命学・胸の星の五行）の軸 */
  outerAxis: AxisKey;
  /** 内の原動力（数秘術・ライフパス数）の軸 */
  innerAxis: AxisKey;
  relation: CrossRelation;
  cross: CrossEntry;
  /** 今年のW暦：算命学の年運 × パーソナルイヤーの関係 */
  yearRelation: CrossRelation;
};

export function calcJibunKoyomi(birth: YMD, today: YMD): JibunKoyomiResult {
  const sanmei = calcSanmei(birth.year, birth.month, birth.day);
  const fortune = calcFortune(birth, today);
  const lifePath = calcLifePathNumber(birth.year, birth.month, birth.day);
  const personalYear = calcPersonalYearNumber(birth.month, birth.day, today.year);

  const outerAxis = ELEMENT_TO_AXIS[MAIN_STARS[sanmei.jintai.chest].element];
  const innerAxis = LIFEPATH_TO_AXIS[lifePath];
  const relation = crossRelation(outerAxis, innerAxis);
  const cross = CROSS_MATRIX[`${outerAxis}-${innerAxis}`];

  const yearOuterAxis = ELEMENT_TO_AXIS[MAIN_STARS[fortune.year.mainStar].element];
  const yearInnerAxis = LIFEPATH_TO_AXIS[personalYear];
  const yearRelation = crossRelation(yearOuterAxis, yearInnerAxis);

  return {
    sanmei,
    fortune,
    lifePath,
    personalYear,
    outerAxis,
    innerAxis,
    relation,
    cross,
    yearRelation,
  };
}
