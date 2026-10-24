import { useLocale, type Locale } from "../shared/locale";

// On-screen text for each language. Narration lives in narration.ts.
const EN = {
  season: "Season 1 · Episode 15",
  title: "The Limits of the Axioms",
  subtitle: "what the rules can't reach",
  // Cold open
  konigsberg: "Königsberg, 7 September 1930",
  nextDay: "8 September 1930",
  godelName: "Gödel, 24",
  vonNeumann: "von Neumann",
  hilbert: "Hilbert",
  axioms: "axioms",
  trueLabel: "true",
  unprovable: "unprovable",
  hilbertQuote: "Wir müssen wissen. Wir werden wissen.",
  hilbertTr: "We must know. We will know.",
  // Numbering
  proof: "a proof",
  // Gödel
  notProvable: "I am not provable",
  provedFalse: "proved → false",
  newAxiom: "+ new axiom",
  con: "I never prove 0 = 1",
  // 庄子·养生主 (Chinese edition only; kept for type parity)
  yangshengSource: "Zhuangzi · Yang Sheng Zhu",
  quote: ["吾生也有涯", "而知也无涯", "以有涯随无涯", "殆已"],
  // Continuum
  cantor: "Cantor: nothing in between",
  godel1940: "Gödel 1940: can't disprove",
  cohen1963: "Cohen 1963: can't prove",
  silent: "the axioms don't say",
  // Choice
  shoes: "shoes: take the left one",
  socks: "socks: no rule",
  ac: "axiom of choice",
  bt: "Banach–Tarski, 1924",
  // End card
  nextEpisode: "Next episode · ",
  nextTitle: "Groups and Symmetry",
  seriesLine: "What Is a Number? · Season 1",
};

export type Strings = typeof EN;

const ZH: Strings = {
  season: "第一季 · 第 15 集",
  title: "公理的尽头",
  subtitle: "规则够不着的地方",
  konigsberg: "柯尼斯堡，1930 年 9 月 7 日",
  nextDay: "1930 年 9 月 8 日",
  godelName: "哥德尔，24 岁",
  vonNeumann: "冯·诺依曼",
  hilbert: "希尔伯特",
  axioms: "公理",
  trueLabel: "真",
  unprovable: "证明不了",
  hilbertQuote: "Wir müssen wissen. Wir werden wissen.",
  hilbertTr: "我们必须知道，我们必将知道。",
  proof: "一个证明",
  notProvable: "我不能被证明",
  provedFalse: "证出来 → 假话",
  newAxiom: "+ 新公理",
  con: "我永远不会证出 0 = 1",
  yangshengSource: "《庄子·养生主》",
  quote: ["吾生也有涯", "而知也无涯", "以有涯随无涯", "殆已"],
  cantor: "康托尔：中间没有",
  godel1940: "哥德尔 1940：推翻不了",
  cohen1963: "科恩 1963：证明不了",
  silent: "公理不表态",
  shoes: "鞋：拿左脚",
  socks: "袜子：没有规则",
  ac: "选择公理",
  bt: "巴拿赫–塔斯基，1924",
  nextEpisode: "下一集 · ",
  nextTitle: "群与对称",
  seriesLine: "数是什么？ · 第一季",
};

const STRINGS: Record<Locale, Strings> = { en: EN, zh: ZH };

export const useStrings = () => STRINGS[useLocale()];
