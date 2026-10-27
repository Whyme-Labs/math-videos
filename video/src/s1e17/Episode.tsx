import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S1E17, type SceneId } from "./narration";
import { Collapse } from "./scenes/Collapse";
import { ColdOpen } from "./scenes/ColdOpen";
import { EndCard } from "./scenes/EndCard";
import { Forget } from "./scenes/Forget";
import { Lanes } from "./scenes/Lanes";
import { Same } from "./scenes/Same";
import { Sunzi } from "./scenes/Sunzi";
import { TitleCard } from "./scenes/TitleCard";

// S1E17 "Homomorphisms". Scene lengths come from the narration
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
    name: "Cold open: three toys, one pattern",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  { id: "same", key: "Same", name: "Isomorphism", component: Same },
  {
    id: "forget",
    key: "Forget",
    name: "A map that forgets: kernel",
    component: Forget,
  },
  { id: "lanes", key: "Lanes", name: "Cosets and Lagrange", component: Lanes },
  {
    id: "collapse",
    key: "Collapse",
    name: "The first isomorphism theorem",
    component: Collapse,
  },
  {
    id: "sunzi",
    key: "Sunzi",
    name: "孙子算经 (Chinese edition only)",
    component: Sunzi,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S1E17Compositions = makeEpisodeCompositions(
  "S1E17",
  S1E17,
  SCENES,
);
