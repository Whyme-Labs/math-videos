import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E16, type SceneId } from "./narration";
import { Adjoint } from "./scenes/Adjoint";
import { Choice } from "./scenes/Choice";
import { ColdOpen } from "./scenes/ColdOpen";
import { EndCard } from "./scenes/EndCard";
import { Gradient } from "./scenes/Gradient";
import { Peixiu } from "./scenes/Peixiu";
import { Riesz } from "./scenes/Riesz";
import { TitleCard } from "./scenes/TitleCard";

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
    name: "Cold open: 1907",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  { id: "riesz", key: "Riesz", name: "Arrows become stacks", component: Riesz },
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
  { id: "adjoint", key: "Adjoint", name: "The adjoint", component: Adjoint },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E16Compositions = makeEpisodeCompositions(
  "S2E16",
  S2E16,
  SCENES,
);
