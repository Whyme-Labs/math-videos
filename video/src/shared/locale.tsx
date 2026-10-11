import type React from "react";
import { createContext, useContext } from "react";

// Every episode renders in English and Simplified Chinese from the same scenes.
export type Locale = "en" | "zh";
export const LOCALES: Locale[] = ["en", "zh"];

const LocaleContext = createContext<Locale>("en");

export const LocaleProvider: React.FC<{
  readonly locale: Locale;
  readonly children: React.ReactNode;
}> = ({ locale, children }) => (
  <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
);

export const useLocale = () => useContext(LocaleContext);

// Strings shared by the whole series (brand sting, season-long motifs).
const SERIES = {
  en: {
    presents: "presents",
    // The season's open questions (QuestionTray), from S1E01's cold open.
    tray: ["0.999… = 1 ?", "√2 a number?", "more fractions?"],
    floors: [
      "natural numbers",
      "integers",
      "rationals",
      "reals",
      "complex numbers",
    ],
  },
  zh: {
    presents: "出品",
    tray: ["0.999… = 1 ?", "√2 是数吗？", "分数更多吗？"],
    floors: ["自然数", "整数", "有理数", "实数", "复数"],
  },
} satisfies Record<Locale, unknown>;

export const useSeries = () => SERIES[useLocale()];
