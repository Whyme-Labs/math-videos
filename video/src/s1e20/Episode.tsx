import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S1E20, type SceneId } from "./narration";
import { ColdOpen } from "./scenes/ColdOpen";
import { EndCard } from "./scenes/EndCard";
import { Group } from "./scenes/Group";
import { Qin } from "./scenes/Qin";
import { Quintic } from "./scenes/Quintic";
import { Swap } from "./scenes/Swap";
import { TitleCard } from "./scenes/TitleCard";
import { TowerScene } from "./scenes/TowerScene";

// S1E20 "Galois", the season finale. Scene lengths come from the narration
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
    name: "Cold open: Paris, 29 May 1832",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "swap",
    key: "Swap",
    name: "The swap behind the quadratic formula",
    component: Swap,
  },
  {
    id: "qin",
    key: "Qin",
    name: "秦九韶 正负开方术 (Chinese edition only)",
    component: Qin,
  },
  {
    id: "group",
    key: "Group",
    name: "The group of an equation",
    component: Group,
  },
  {
    id: "quintic",
    key: "Quintic",
    name: "Five roots: the ladder jams",
    component: Quintic,
  },
  {
    id: "tower",
    key: "Tower",
    name: "The tower, relabeled",
    component: TowerScene,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S1E20Compositions = makeEpisodeCompositions(
  "S1E20",
  S1E20,
  SCENES,
);
