import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S1E13, type SceneId } from "./narration";
import { ColdOpen } from "./scenes/ColdOpen";
import { Descent } from "./scenes/Descent";
import { EndCard } from "./scenes/EndCard";
import { Goodstein } from "./scenes/Goodstein";
import { Omega } from "./scenes/Omega";
import { Order } from "./scenes/Order";
import { TitleCard } from "./scenes/TitleCard";
import { Zhuangzi } from "./scenes/Zhuangzi";

// S1E13 "Counting Past Infinity". Scene lengths come from the narration
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
    name: "Cold open: the runner after all of them",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  { id: "omega", key: "Omega", name: "ω and beyond", component: Omega },
  { id: "order", key: "Order", name: "1 + ω and ω + 1", component: Order },
  {
    id: "zhuangzi",
    key: "Zhuangzi",
    name: "庄子·齐物论 (Chinese edition only)",
    component: Zhuangzi,
  },
  {
    id: "descent",
    key: "Descent",
    name: "Every way down is finite",
    component: Descent,
  },
  {
    id: "goodstein",
    key: "Goodstein",
    name: "Goodstein's game",
    component: Goodstein,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S1E13Compositions = makeEpisodeCompositions(
  "S1E13",
  S1E13,
  SCENES,
);
