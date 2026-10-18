import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S1E09, type SceneId } from "./narration";
import { Archimedes } from "./scenes/Archimedes";
import { Ceiling } from "./scenes/Ceiling";
import { ColdOpen } from "./scenes/ColdOpen";
import { EndCard } from "./scenes/EndCard";
import { NoRoom } from "./scenes/NoRoom";
import { Staircase } from "./scenes/Staircase";
import { TitleCard } from "./scenes/TitleCard";
import { Trick } from "./scenes/Trick";
import { Twins } from "./scenes/Twins";
import { Zhuangzi } from "./scenes/Zhuangzi";

// S1E09 "0.999… = 1, and What Decimals Really Are". Scene lengths come from
// the narration (narration.ts), so the script and the picture stay in sync.
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
    name: "Cold open: the internet's favourite argument",
    component: ColdOpen,
  },
  {
    id: "staircase",
    key: "Staircase",
    name: "The staircase of truncations",
    component: Staircase,
  },
  {
    id: "ceiling",
    key: "Ceiling",
    name: "A decimal names a least upper bound",
    component: Ceiling,
  },
  { id: "noRoom", key: "NoRoom", name: "No room below 1", component: NoRoom },
  {
    id: "archimedes",
    key: "Archimedes",
    name: "No infinitesimals in ℝ",
    component: Archimedes,
  },
  {
    id: "zhuangzi",
    key: "Zhuangzi",
    name: "一尺之棰 (Chinese edition only)",
    component: Zhuangzi,
  },
  { id: "twins", key: "Twins", name: "Two names, one point", component: Twins },
  { id: "trick", key: "Trick", name: "What the tricks need", component: Trick },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S1E09Compositions = makeEpisodeCompositions(
  "S1E09",
  S1E09,
  SCENES,
);
