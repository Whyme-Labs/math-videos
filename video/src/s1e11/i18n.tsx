import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 1 · Episode 11",
  title: "Hilbert's Hotel",
  subtitle: "counting without numbers",
  // Cold open
  noVacancy: "NO VACANCY",
  no: "NO",
  vacancy: "VACANCY",
  full: "full?",
  // Bus
  bus: "BUS",
  seat: (k: number) => `seat ${k}`,
  // Matching
  naturals: "whole numbers",
  evens: "even numbers",
  half: "half as many?",
  sameSize: "same size",
  squares: "squares",
  galileo: "Galileo · 1638",
  galileoVerdict: "“equal”, “greater”, “less” do not apply",
  // 列子 (Chinese edition only; kept for type parity)
  lieziSource: "Liezi · Tang Wen",
  quote: ["无极之外", "复无无极", "无尽之中", "复无无尽"],
  // Buses
  carPark: "car park",
  busN: (b: number) => `bus ${b}`,
  waiting: "waiting…",
  diagonal: (d: number) => `diagonal ${d}`,
  // Fractions
  between: "always more in between",
  // End card
  dawn: "every guest has a room",
  nextEpisode: "Next episode · ",
  nextTitle: "The Diagonal Argument",
  seriesLine: "What Is a Number? · Season 1",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第一季 · 第 11 集",
  title: "希尔伯特旅馆",
  subtitle: "不用数数的计数",
  noVacancy: "暂无空房",
  no: "暂无",
  vacancy: "空房",
  full: "满了？",
  bus: "大巴",
  seat: (k: number) => `${k} 号座`,
  naturals: "自然数",
  evens: "偶数",
  half: "只有一半？",
  sameSize: "一样多",
  squares: "平方数",
  galileo: "伽利略 · 1638",
  galileoVerdict: "“相等”“大于”“小于”都不适用",
  lieziSource: "《列子·汤问》",
  quote: ["无极之外", "复无无极", "无尽之中", "复无无尽"],
  carPark: "停车场",
  busN: (b: number) => `${b} 号车`,
  waiting: "等待中……",
  diagonal: (d: number) => `第 ${d} 条对角线`,
  between: "中间永远还有",
  dawn: "每位客人都有了房间",
  nextEpisode: "下一集 · ",
  nextTitle: "对角线论证",
  seriesLine: "数是什么？ · 第一季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
