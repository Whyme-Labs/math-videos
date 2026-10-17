import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S1E08, type SceneId } from "./narration";
import { ColdOpen } from "./scenes/ColdOpen";
import { Cut } from "./scenes/Cut";
import { EndCard } from "./scenes/EndCard";
import { LiuHui } from "./scenes/LiuHui";
import { Same } from "./scenes/Same";
import { Sup } from "./scenes/Sup";
import { Swarm } from "./scenes/Swarm";
import { TitleCard } from "./scenes/TitleCard";
import { TowerScene } from "./scenes/TowerScene";

// S1E08 "Building ℝ, Twice". Scene lengths come from the narration
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
    name: "Cold open: a hole you can't point to",
    component: ColdOpen,
  },
  { id: "cut", key: "Cut", name: "Dedekind's cut", component: Cut },
  { id: "sup", key: "Sup", name: "Cuts: the union is the sup", component: Sup },
  { id: "swarm", key: "Swarm", name: "Cantor's swarms", component: Swarm },
  {
    id: "liuHui",
    key: "LiuHui",
    name: "刘徽割圆术 (Chinese edition only)",
    component: LiuHui,
  },
  { id: "same", key: "Same", name: "Two machines, one ℝ", component: Same },
  {
    id: "tower",
    key: "Tower",
    name: "Tower: the ℝ floor",
    component: TowerScene,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S1E08Compositions = makeEpisodeCompositions(
  "S1E08",
  S1E08,
  SCENES,
);
