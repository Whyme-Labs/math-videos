import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E01, type SceneId } from "./narration";
import { ColdOpen } from "./scenes/ColdOpen";
import { EndCard } from "./scenes/EndCard";
import { Fangcheng } from "./scenes/Fangcheng";
import { Four } from "./scenes/Four";
import { Rules } from "./scenes/Rules";
import { Superpose } from "./scenes/Superpose";
import { TitleCard } from "./scenes/TitleCard";
import { Zoo } from "./scenes/Zoo";

// S2E01 "Anything You Can Add and Scale", the first episode of Season 2.
// Scene lengths come from the narration (narration.ts), so the script and
// the picture stay in sync.
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
    name: "Cold open: Stettin, 1844",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  { id: "four", key: "Four", name: "Four things that add", component: Four },
  {
    id: "rules",
    key: "Rules",
    name: "The rules, and the scalars",
    component: Rules,
  },
  {
    id: "fangcheng",
    key: "Fangcheng",
    name: "九章算术·方程 (Chinese edition only)",
    component: Fangcheng,
  },
  {
    id: "zoo",
    key: "Zoo",
    name: "The stamp takes, and bounces",
    component: Zoo,
  },
  {
    id: "superpose",
    key: "Superpose",
    name: "Superposition and zooming in",
    component: Superpose,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E01Compositions = makeEpisodeCompositions(
  "S2E01",
  S2E01,
  SCENES,
);
