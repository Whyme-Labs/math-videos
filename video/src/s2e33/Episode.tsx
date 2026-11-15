import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E33, type SceneId } from "./narration";
import { Bell } from "./scenes/Bell";
import { Boxes } from "./scenes/Boxes";
import { ColdOpen } from "./scenes/ColdOpen";
import { Derivative } from "./scenes/Derivative";
import { Distributions } from "./scenes/Distributions";
import { EndCard } from "./scenes/EndCard";
import { Green } from "./scenes/Green";
import { Montage } from "./scenes/Montage";
import { TitleCard } from "./scenes/TitleCard";
import { Weak } from "./scenes/Weak";

// S2E33 "Distributions". Scene lengths come from the narration (narration.ts), so
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
    name: "Cold open: the Dirac delta",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "boxes",
    key: "Boxes",
    name: "The delta as a limit of boxes",
    component: Boxes,
  },
  {
    id: "distributions",
    key: "Distributions",
    name: "Test functions and distributions",
    component: Distributions,
  },
  {
    id: "derivative",
    key: "Derivative",
    name: "The distributional derivative",
    component: Derivative,
  },
  {
    id: "bell",
    key: "Bell",
    name: "《礼记·学记》撞钟 (Chinese edition only)",
    component: Bell,
  },
  { id: "green", key: "Green", name: "Green's functions", component: Green },
  { id: "weak", key: "Weak", name: "The weak form and Riesz", component: Weak },
  {
    id: "montage",
    key: "Montage",
    name: "Season montage: measurement",
    component: Montage,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E33Compositions = makeEpisodeCompositions(
  "S2E33",
  S2E33,
  SCENES,
);
