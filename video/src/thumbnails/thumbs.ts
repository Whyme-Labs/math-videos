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
