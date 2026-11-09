import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E27, type SceneId } from "./narration";
import { Alaoglu } from "./scenes/Alaoglu";
import { ColdOpen } from "./scenes/ColdOpen";
import { Crisis } from "./scenes/Crisis";
import { Direct } from "./scenes/Direct";
import { Elephant } from "./scenes/Elephant";
import { EndCard } from "./scenes/EndCard";
import { Escapes } from "./scenes/Escapes";
import { LOne } from "./scenes/LOne";
import { TitleCard } from "./scenes/TitleCard";
import { Weak } from "./scenes/Weak";

// S2E27 "Weak Convergence". Scene lengths come from the narration (narration.ts), so
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
    name: "Cold open: the bump that escapes",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "crisis",
    key: "Crisis",
    name: "A minimum that isn't attained",
    component: Crisis,
  },
  {
    id: "weak",
    key: "Weak",
    name: "Weak convergence and eₙ ⇀ 0",
    component: Weak,
  },
  {
    id: "escapes",
    key: "Escapes",
    name: "Three ways mass escapes",
    component: Escapes,
  },
  {
    id: "elephant",
    key: "Elephant",
    name: "盲人摸象 (Chinese edition only)",
    component: Elephant,
  },
  { id: "lOne", key: "LOne", name: "ℓ¹ is different", component: LOne },
  {
    id: "alaoglu",
    key: "Alaoglu",
    name: "Weak* convergence and Banach–Alaoglu",
    component: Alaoglu,
  },
  { id: "direct", key: "Direct", name: "The direct method", component: Direct },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E27Compositions = makeEpisodeCompositions(
  "S2E27",
  S2E27,
  SCENES,
);
