import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E12, type SceneId } from "./narration";
import { Charpoly } from "./scenes/Charpoly";
import { ColdOpen } from "./scenes/ColdOpen";
import { EndCard } from "./scenes/EndCard";
import { Fibonacci } from "./scenes/Fibonacci";
import { Lines } from "./scenes/Lines";
import { Rotation } from "./scenes/Rotation";
import { TitleCard } from "./scenes/TitleCard";
import { Yanghui } from "./scenes/Yanghui";

// S2E12 "Eigenvectors". Scene lengths come from the narration (narration.ts), so
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
    name: "Cold open: Pisa, 1202",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "lines",
    key: "Lines",
    name: "Two lines that only stretch",
    component: Lines,
  },
  {
    id: "charpoly",
    key: "Charpoly",
    name: "The characteristic polynomial",
    component: Charpoly,
  },
  {
    id: "rotation",
    key: "Rotation",
    name: "A rotation, and the complex numbers",
    component: Rotation,
  },
  {
    id: "yanghui",
    key: "Yanghui",
    name: "杨辉三角 (Chinese edition only)",
    component: Yanghui,
  },
  {
    id: "fibonacci",
    key: "Fibonacci",
    name: "Fibonacci and the golden ratio",
    component: Fibonacci,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E12Compositions = makeEpisodeCompositions(
  "S2E12",
  S2E12,
  SCENES,
);
