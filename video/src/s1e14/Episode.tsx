import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S1E14, type SceneId } from "./narration";
import { ColdOpen } from "./scenes/ColdOpen";
import { Crack } from "./scenes/Crack";
import { Dream } from "./scenes/Dream";
import { EndCard } from "./scenes/EndCard";
import { Floors } from "./scenes/Floors";
import { Mojing } from "./scenes/Mojing";
import { Principia } from "./scenes/Principia";
import { TitleCard } from "./scenes/TitleCard";

// S1E14 "Russell's Dream". Scene lengths come from the narration
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
    name: "Cold open: the letter to Jena",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "dream",
    key: "Dream",
    name: "Frege's dream: 2 is every pair",
    component: Dream,
  },
  { id: "crack", key: "Crack", name: "The crack: the bag R", component: Crack },
  {
    id: "mojing",
    key: "Mojing",
    name: "墨经·以言为尽悖 (Chinese edition only)",
    component: Mojing,
  },
  {
    id: "floors",
    key: "Floors",
    name: "Russell's repair: floors",
    component: Floors,
  },
  {
    id: "principia",
    key: "Principia",
    name: "Principia Mathematica: 1 + 1 = 2",
    component: Principia,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S1E14Compositions = makeEpisodeCompositions(
  "S1E14",
  S1E14,
  SCENES,
);
