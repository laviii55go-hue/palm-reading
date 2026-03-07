export type Selections = Record<string, string>;

export type LineKey =
  | "lifeLine"
  | "heartLine"
  | "headLine"
  | "fateLine"
  | "marriageLine"
  | "moneyLine";

export type FortuneType =
  | "general"
  | "love"
  | "marriage"
  | "career"
  | "money"
  | "health"
  | "relationship";

export interface FortuneOption {
  id: FortuneType;
  label: string;
  emoji: string;
  description: string;
  gradient: string;
  border: string;
  text: string;
}

export interface ResultSection {
  key: string;
  title: string;
  text: string;
  score: number;
}

export interface ReadingResult {
  sections: ResultSection[];
  summary: string;
}

export interface LineDefinition {
  lineKey: LineKey;
  title: string;
  description: string;
  image: string;
  questions: Question[];
}

export interface Question {
  key: string;
  label: string;
  options: Option[];
  dependsOn?: { key: string; value: string };
}

export interface Option {
  value: string;
  label: string;
}
