import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S1E07, type SceneId } from "./narration";
import { Armies } from "./scenes/Armies";
import { Babylon } from "./scenes/Babylon";
import { ColdOpen } from "./scenes/ColdOpen";
import { Density } from "./scenes/Density";
import { Descent } from "./scenes/Descent";
import { EndCard } from "./scenes/EndCard";
import { Hole } from "./scenes/Hole";
import { LiuHui } from "./scenes/LiuHui";
import { TitleCard } from "./scenes/TitleCard";
import { TowerScene } from "./scenes/TowerScene";

// S1E07 "The Holes in ℚ". Scene lengths come from the narration
// (narration.ts), so the script and the picture stay in sync.
const SCENES: SceneEntry<SceneId>[] = [
  {
    id: "brand",
    key: "BrandIntro",
    name: "Whyme Labs intro",
    component: BrandIntro,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "coldOpen",
    key: "ColdOpen",
    name: "Cold open: the diagonal",
    component: ColdOpen,
  },
  {
    id: "density",
    key: "Density",
    name: "Fractions are dense",
    component: Density,
  },
  {
    id: "descent",
    key: "Descent",
    name: "√2 is irrational (descent)",
    component: Descent,
  },
  {
    id: "liuHui",
    key: "LiuHui",
    name: "《九章算术》开方不尽 (Chinese edition only)",
    component: LiuHui,
  },
  { id: "hole", key: "Hole", name: "Zoom in: the hole at √2", component: Hole },
  {
    id: "armies",
    key: "Armies",
    name: "No least upper bound",
    component: Armies,
  },
  {
    id: "babylon",
    key: "Babylon",
    name: "A sequence with nowhere to land",
    component: Babylon,
  },
  {
    id: "tower",
    key: "Tower",
    name: "Tower: the ℝ floor needs limits",
    component: TowerScene,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S1E07Compositions = makeEpisodeCompositions(
  "S1E07",
  S1E07,
  SCENES,
);
