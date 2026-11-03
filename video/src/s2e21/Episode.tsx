import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E21, type SceneId } from "./narration";
import { Bounded } from "./scenes/Bounded";
import { ColdOpen } from "./scenes/ColdOpen";
import { EndCard } from "./scenes/EndCard";
import { Finite } from "./scenes/Finite";
import { Holes } from "./scenes/Holes";
import { Kaogong } from "./scenes/Kaogong";
import { MatrixNorms } from "./scenes/MatrixNorms";
import { Norm } from "./scenes/Norm";
import { Riesz } from "./scenes/Riesz";
import { Spread } from "./scenes/Spread";
import { TitleCard } from "./scenes/TitleCard";
import { Zoo } from "./scenes/Zoo";

// S2E21 "Normed Spaces and Bounded Operators". Scene lengths come from the narration (narration.ts), so
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
    name: "Cold open: three judges, three verdicts",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  { id: "norm", key: "Norm", name: "The rules of a norm", component: Norm },
  { id: "zoo", key: "Zoo", name: "ℓ¹, ℓ², ℓ∞", component: Zoo },
  {
    id: "spread",
    key: "Spread",
    name: "Norms that don't agree",
    component: Spread,
  },
  {
    id: "finite",
    key: "Finite",
    name: "In finite dimensions, all norms agree",
    component: Finite,
  },
  {
    id: "kaogong",
    key: "Kaogong",
    name: "《考工记·轮人》 (Chinese edition only)",
    component: Kaogong,
  },
  {
    id: "bounded",
    key: "Bounded",
    name: "Bounded operators",
    component: Bounded,
  },
  {
    id: "matrix",
    key: "Matrix",
    name: "One matrix, three norms",
    component: MatrixNorms,
  },
  { id: "riesz", key: "Riesz", name: "Riesz's lemma", component: Riesz },
  { id: "holes", key: "Holes", name: "Holes in C[0, 1]", component: Holes },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E21Compositions = makeEpisodeCompositions(
  "S2E21",
  S2E21,
  SCENES,
);
