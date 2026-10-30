import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E07, type SceneId } from "./narration";
import { ColdOpen } from "./scenes/ColdOpen";
import { Coords } from "./scenes/Coords";
import { EndCard } from "./scenes/EndCard";
import { Lagrange } from "./scenes/Lagrange";
import { Liuzhuo } from "./scenes/Liuzhuo";
import { Probes } from "./scenes/Probes";
import { Simpson } from "./scenes/Simpson";
import { TitleCard } from "./scenes/TitleCard";

// S2E07 "Functionals Everywhere". Scene lengths come from the narration
// (narration.ts), so the script and the picture stay in sync.
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
    name: "Cold open: Linz, 1613",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "probes",
    key: "Probes",
    name: "Measurements of functions",
    component: Probes,
  },
  {
    id: "coords",
    key: "Coords",
    name: "Probes as coordinates",
    component: Coords,
  },
  {
    id: "lagrange",
    key: "Lagrange",
    name: "The Lagrange partners",
    component: Lagrange,
  },
  {
    id: "liuzhuo",
    key: "Liuzhuo",
    name: "刘焯《皇极历》 (Chinese edition only)",
    component: Liuzhuo,
  },
  {
    id: "simpson",
    key: "Simpson",
    name: "Kepler's rule is exact for cubics",
    component: Simpson,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E07Compositions = makeEpisodeCompositions(
  "S2E07",
  S2E07,
  SCENES,
);
