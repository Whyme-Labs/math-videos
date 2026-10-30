import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E06, type SceneId } from "./narration";
import { ColdOpen } from "./scenes/ColdOpen";
import { Density } from "./scenes/Density";
import { Dual } from "./scenes/Dual";
import { EndCard } from "./scenes/EndCard";
import { Gradient } from "./scenes/Gradient";
import { Liangqi } from "./scenes/Liangqi";
import { Measure } from "./scenes/Measure";
import { TitleCard } from "./scenes/TitleCard";

// S2E06 "Covectors". Scene lengths come from the narration (narration.ts),
// so the script and the picture stay in sync.
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
    name: "Cold open: Paris, 1795",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "measure",
    key: "Measure",
    name: "A covector measures",
    component: Measure,
  },
  {
    id: "density",
    key: "Density",
    name: "Bigger means denser",
    component: Density,
  },
  {
    id: "liangqi",
    key: "Liangqi",
    name: "商鞅方升 (Chinese edition only)",
    component: Liangqi,
  },
  { id: "dual", key: "Dual", name: "The dual basis", component: Dual },
  {
    id: "gradient",
    key: "Gradient",
    name: "The gradient is a covector",
    component: Gradient,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E06Compositions = makeEpisodeCompositions(
  "S2E06",
  S2E06,
  SCENES,
);
