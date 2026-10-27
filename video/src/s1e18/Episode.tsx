import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S1E18, type SceneId } from "./narration";
import { Breaks } from "./scenes/Breaks";
import { ClockScene } from "./scenes/ClockScene";
import { ColdOpen } from "./scenes/ColdOpen";
import { EndCard } from "./scenes/EndCard";
import { Glue } from "./scenes/Glue";
import { Qin } from "./scenes/Qin";
import { Rules } from "./scenes/Rules";
import { TitleCard } from "./scenes/TitleCard";

// S1E18 "Rings". Scene lengths come from the narration (narration.ts), so
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
    name: "Cold open: Paris, 1847",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  { id: "rules", key: "Rules", name: "The ring rules", component: Rules },
  {
    id: "clock",
    key: "Clock",
    name: "2 × 3 = 0, and partners",
    component: ClockScene,
  },
  {
    id: "qin",
    key: "Qin",
    name: "大衍求一术 (Chinese edition only)",
    component: Qin,
  },
  { id: "glue", key: "Glue", name: "Glue in x² + 1 = 0", component: Glue },
  {
    id: "breaks",
    key: "Breaks",
    name: "Two factorizations of 6",
    component: Breaks,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S1E18Compositions = makeEpisodeCompositions(
  "S1E18",
  S1E18,
  SCENES,
);
