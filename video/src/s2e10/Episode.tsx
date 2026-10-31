import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E10, type SceneId } from "./narration";
import { ColdOpen } from "./scenes/ColdOpen";
import { EndCard } from "./scenes/EndCard";
import { Funnel } from "./scenes/Funnel";
import { Grid } from "./scenes/Grid";
import { Legs } from "./scenes/Legs";
import { Liye } from "./scenes/Liye";
import { Pure } from "./scenes/Pure";
import { TitleCard } from "./scenes/TitleCard";

// S2E10 "The Tensor Product". Scene lengths come from the narration
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
    name: "Cold open: Zurich, 1912",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "funnel",
    key: "Funnel",
    name: "The ⊗ funnel",
    component: Funnel,
  },
  { id: "grid", key: "Grid", name: "Basis and dimension", component: Grid },
  {
    id: "liye",
    key: "Liye",
    name: "里耶秦简九九表 (Chinese edition only)",
    component: Liye,
  },
  { id: "pure", key: "Pure", name: "Pure and entangled", component: Pure },
  {
    id: "legs",
    key: "Legs",
    name: "The legs decide the rules",
    component: Legs,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E10Compositions = makeEpisodeCompositions(
  "S2E10",
  S2E10,
  SCENES,
);
