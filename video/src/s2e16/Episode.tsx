import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E16, type SceneId } from "./narration";
import { Adjoint } from "./scenes/Adjoint";
import { Choice } from "./scenes/Choice";
import { ColdOpen } from "./scenes/ColdOpen";
import { Delta } from "./scenes/Delta";
import { EndCard } from "./scenes/EndCard";
import { Gradient } from "./scenes/Gradient";
import { Peixiu } from "./scenes/Peixiu";
import { Riesz } from "./scenes/Riesz";
import { Steepest } from "./scenes/Steepest";
import { TitleCard } from "./scenes/TitleCard";
import { TwoKinds } from "./scenes/TwoKinds";

// S2E16 "Vectors and Covectors". Scene lengths come from the narration (narration.ts), so
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
    name: "Cold open: the hiker's squashed map",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "twoKinds",
    key: "TwoKinds",
    name: "Arrows and stacks",
    component: TwoKinds,
  },
  { id: "riesz", key: "Riesz", name: "The Riesz theorem", component: Riesz },
  {
    id: "choice",
    key: "Choice",
    name: "The stack stays, the arrow moves",
    component: Choice,
  },
  {
    id: "peixiu",
    key: "Peixiu",
    name: "裴秀制图六体 (Chinese edition only)",
    component: Peixiu,
  },
  {
    id: "gradient",
    key: "Gradient",
    name: "The gradient needs a ruler",
    component: Gradient,
  },
  {
    id: "steepest",
    key: "Steepest",
    name: "Why steepest depends on the ruler",
    component: Steepest,
  },
  { id: "adjoint", key: "Adjoint", name: "The adjoint", component: Adjoint },
  { id: "delta", key: "Delta", name: "Where Riesz runs out", component: Delta },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E16Compositions = makeEpisodeCompositions(
  "S2E16",
  S2E16,
  SCENES,
);
