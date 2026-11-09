import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E28, type SceneId } from "./narration";
import { Bases } from "./scenes/Bases";
import { ColdOpen } from "./scenes/ColdOpen";
import { EndCard } from "./scenes/EndCard";
import { Guiju } from "./scenes/Guiju";
import { Naive } from "./scenes/Naive";
import { OnlyOne } from "./scenes/OnlyOne";
import { Projection } from "./scenes/Projection";
import { Riesz } from "./scenes/Riesz";
import { TitleCard } from "./scenes/TitleCard";

// S2E28 "Hilbert Spaces". Scene lengths come from the narration (narration.ts), so
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
    name: "Cold open: the closest-point puzzle",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "naive",
    key: "Naive",
    name: "An inner product is not enough",
    component: Naive,
  },
  {
    id: "projection",
    key: "Projection",
    name: "The projection theorem",
    component: Projection,
  },
  {
    id: "guiju",
    key: "Guiju",
    name: "规矩 (Chinese edition only)",
    component: Guiju,
  },
  { id: "riesz", key: "Riesz", name: "Riesz representation", component: Riesz },
  {
    id: "bases",
    key: "Bases",
    name: "Orthonormal bases, Bessel and Parseval",
    component: Bases,
  },
  {
    id: "onlyOne",
    key: "OnlyOne",
    name: "There is only one ℓ²",
    component: OnlyOne,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E28Compositions = makeEpisodeCompositions(
  "S2E28",
  S2E28,
  SCENES,
);
