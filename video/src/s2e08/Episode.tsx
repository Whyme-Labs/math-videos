import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E08, type SceneId } from "./narration";
import { ColdOpen } from "./scenes/ColdOpen";
import { DoubleDual } from "./scenes/DoubleDual";
import { EndCard } from "./scenes/EndCard";
import { Natural } from "./scenes/Natural";
import { Pullback } from "./scenes/Pullback";
import { Rank } from "./scenes/Rank";
import { TitleCard } from "./scenes/TitleCard";
import { Transpose } from "./scenes/Transpose";
import { Xuanji } from "./scenes/Xuanji";

// S2E08 "The Transpose and the Double Dual". Scene lengths come from the
// narration (narration.ts), so the script and the picture stay in sync.
const SCENES: SceneEntry<SceneId>[] = [
  {
    id: "brand",
    key: "BrandIntro",
    name: "Whyme Labs intro",
    component: BrandIntro,
  },
  {
    id: "coldOpen",
    key: "ColdOpen",
    name: "Cold open: Ann Arbor, 1941",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "pullback",
    key: "Pullback",
    name: "Measure after mapping",
    component: Pullback,
  },
  {
    id: "transpose",
    key: "Transpose",
    name: "The matrix of T* is the transpose",
    component: Transpose,
  },
  {
    id: "xuanji",
    key: "Xuanji",
    name: "苏蕙《璇玑图》 (Chinese edition only)",
    component: Xuanji,
  },
  { id: "rank", key: "Rank", name: "Row rank = column rank", component: Rank },
  {
    id: "doubleDual",
    key: "DoubleDual",
    name: "Vectors measure measurements",
    component: DoubleDual,
  },
  {
    id: "natural",
    key: "Natural",
    name: "Natural vs chosen",
    component: Natural,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E08Compositions = makeEpisodeCompositions(
  "S2E08",
  S2E08,
  SCENES,
);
