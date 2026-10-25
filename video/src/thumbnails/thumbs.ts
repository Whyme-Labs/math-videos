import type { Locale } from "../shared/locale";

// Text for each episode's thumbnail, in both languages. This file is the
// single source for the text: the Remotion stills (Thumbnail.tsx) and the
// editable SVGs (scripts/thumbnail-svg.py) both read it, so edit it here.
//
// Layout is on a 1920×1080 canvas (exported at 1280×720 for YouTube).
// `lines` are the big hook, one entry per line; `accent` is the index of the
// line drawn in lemon. `size` is the hook's font size in px.

export type ThumbText = {
  readonly lines: string[];
  readonly accent: number;
  readonly size: number;
};

export type Thumb = {
  readonly ep: number;
  readonly en: ThumbText;
  readonly zh: ThumbText;
};

export const THUMBS: Thumb[] = [
  {
    ep: 1,
    en: { lines: ["What is", "a number?"], accent: 1, size: 156 },
    zh: { lines: ["数，", "到底是什么？"], accent: 1, size: 140 },
  },
  {
    ep: 2,
    en: { lines: ["Only zero", "and “next”"], accent: 1, size: 150 },
    zh: { lines: ["只有零", "和“下一个”"], accent: 1, size: 140 },
  },
  {
    ep: 3,
    en: { lines: ["Prove", "2 + 2 = 4"], accent: 1, size: 156 },
    zh: { lines: ["证明", "2 + 2 = 4"], accent: 1, size: 156 },
  },
  {
    ep: 4,
    en: { lines: ["What is 2,", "really?"], accent: 1, size: 150 },
    zh: { lines: ["2", "到底是什么？"], accent: 1, size: 140 },
  },
  {
    ep: 5,
    en: { lines: ["1/2 = 2/4", "or not?"], accent: 0, size: 156 },
    zh: { lines: ["1/2 = 2/4", "算一样吗？"], accent: 0, size: 150 },
  },
  {
    ep: 6,
    en: { lines: ["Why is", "− × − = + ?"], accent: 1, size: 150 },
    zh: { lines: ["负负", "为什么得正？"], accent: 1, size: 140 },
  },
  {
    ep: 7,
    en: { lines: ["√2 is not", "a fraction"], accent: 0, size: 150 },
    zh: { lines: ["√2", "不是分数"], accent: 0, size: 160 },
  },
  {
    ep: 8,
    en: { lines: ["A hole", "with no edges"], accent: 1, size: 132 },
    zh: { lines: ["没有边的洞", "怎么填？"], accent: 0, size: 140 },
  },
  {
    ep: 9,
    en: { lines: ["0.999… = 1", "Really?"], accent: 0, size: 140 },
    zh: { lines: ["0.999… = 1", "真的吗？"], accent: 0, size: 140 },
  },
  {
    ep: 10,
    en: { lines: ["√−1 is", "a quarter turn"], accent: 1, size: 128 },
    zh: { lines: ["虚数 i", "就是转 90°"], accent: 1, size: 140 },
  },
  {
    ep: 11,
    en: { lines: ["Full hotel.", "Room for one more."], accent: 1, size: 100 },
    zh: { lines: ["客满了", "还能再住一位"], accent: 1, size: 140 },
  },
  {
    ep: 12,
    en: { lines: ["The number", "on no list"], accent: 1, size: 128 },
    zh: { lines: ["永远排不进", "名单的数"], accent: 0, size: 136 },
  },
  {
    ep: 13,
    en: { lines: ["What comes", "after infinity?"], accent: 1, size: 124 },
    zh: { lines: ["无穷之后", "排第几？"], accent: 1, size: 140 },
  },
  {
    ep: 14,
    en: {
      lines: ["The letter that", "broke arithmetic"],
      accent: 1,
      size: 116,
    },
    zh: { lines: ["一封信", "让算术摇晃"], accent: 1, size: 140 },
  },
  {
    ep: 15,
    en: { lines: ["True, but", "unprovable"], accent: 1, size: 136 },
    zh: { lines: ["是真的", "却证明不了"], accent: 1, size: 140 },
  },
  {
    ep: 16,
    en: { lines: ["Eight moves.", "One set of rules."], accent: 1, size: 120 },
    zh: { lines: ["八个动作", "同一套规则"], accent: 1, size: 140 },
  },
];

export const SERIES_NAME: Record<Locale, string> = {
  en: "WHAT IS A NUMBER?",
  zh: "数是什么？",
};

export const badge = (ep: number, locale: Locale) =>
  locale === "zh" ? `第 ${ep} 集` : `E${String(ep).padStart(2, "0")}`;

// Shared layout, used by both the stills and the SVG export.
export const LAYOUT = {
  width: 1920,
  height: 1080,
  textX: 110,
  badgeY: 96, // top of the episode badge
  badgeH: 88,
  firstBaseline: 470,
  lineGap: 1.12, // × font size
  brandY: 930, // top of the brand mark
  brandH: 70,
  stroke: 14, // dark outline around the hook text
};

// Covers for 抖音 and TikTok, stacked and centred: badge and series name,
// the hook, then the wide art scaled down under it, then the brand.
// "4x3" (1440×1080) is the cover a landscape video gets in the 抖音 editor;
// "3x4" (1080×1440) is its 竖版 cover and the TikTok profile grid.
// `hookScale` scales the wide hook's font size; `art` says where the wide
// art's centre lands and how much it shrinks.
export type CoverShape = "4x3" | "3x4";
export const COVERS: Record<
  CoverShape,
  {
    width: number;
    height: number;
    cx: number;
    badgeY: number;
    badgeH: number;
    badgeFont: number;
    seriesY: number; // baseline of the series name
    seriesFont: number;
    firstBaseline: number;
    lineGap: number;
    hookScale: number;
    art: { x: number; y: number; scale: number };
    brandY: number;
    brandH: number;
    stroke: number;
  }
> = {
  "4x3": {
    width: 1440,
    height: 1080,
    cx: 720,
    badgeY: 56,
    badgeH: 68,
    badgeFont: 46,
    seriesY: 180,
    seriesFont: 34,
    firstBaseline: 312,
    lineGap: 1.1,
    hookScale: 0.8,
    art: { x: 720, y: 740, scale: 0.56 },
    brandY: 1000,
    brandH: 46,
    stroke: 12,
  },
  "3x4": {
    width: 1080,
    height: 1440,
    cx: 540,
    badgeY: 100,
    badgeH: 72,
    badgeFont: 48,
    seriesY: 232,
    seriesFont: 36,
    firstBaseline: 392,
    lineGap: 1.1,
    hookScale: 0.8,
    art: { x: 540, y: 950, scale: 0.62 },
    brandY: 1336,
    brandH: 52,
    stroke: 12,
  },
};
