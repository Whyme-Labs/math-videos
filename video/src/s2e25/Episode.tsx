import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E25, type SceneId } from "./narration";
import { BanachLimit } from "./scenes/BanachLimit";
import { ColdOpen } from "./scenes/ColdOpen";
import { Corollaries } from "./scenes/Corollaries";
import { EndCard } from "./scenes/EndCard";
import { Extend } from "./scenes/Extend";
import { Honggou } from "./scenes/Honggou";
import { Naive } from "./scenes/Naive";
import { Separation } from "./scenes/Separation";
import { TitleCard } from "./scenes/TitleCard";
import { Zorn } from "./scenes/Zorn";

// S2E25 "The Hahn–Banach Theorem". Scene lengths come from the narration (narration.ts), so
// the script and the picture stay in sync.
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
    name: "Cold open: the limit of 1, 0, 1, 0, …",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  { id: "naive", key: "Naive", name: "Extending by a basis", component: Naive },
  {
    id: "extend",
    key: "Extend",
    name: "The one-step extension",
    component: Extend,
  },
  { id: "zorn", key: "Zorn", name: "Zorn's lemma", component: Zorn },
  {
    id: "corollaries",
    key: "Corollaries",
    name: "Norming functionals",
    component: Corollaries,
  },
  {
    id: "separation",
    key: "Separation",
    name: "Separating convex sets, SVMs and LP",
    component: Separation,
  },
  {
    id: "honggou",
    key: "Honggou",
    name: "鸿沟 (Chinese edition only)",
    component: Honggou,
  },
  {
    id: "banachLimit",
    key: "BanachLimit",
    name: "The Banach limit",
    component: BanachLimit,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E25Compositions = makeEpisodeCompositions(
  "S2E25",
  S2E25,
  SCENES,
);
