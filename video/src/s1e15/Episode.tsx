import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S1E15, type SceneId } from "./narration";
import { Choice } from "./scenes/Choice";
import { ColdOpen } from "./scenes/ColdOpen";
import { Continuum } from "./scenes/Continuum";
import { EndCard } from "./scenes/EndCard";
import { Godel } from "./scenes/Godel";
import { Numbering } from "./scenes/Numbering";
import { TitleCard } from "./scenes/TitleCard";
import { Yangsheng } from "./scenes/Yangsheng";

// S1E15 "The Limits of the Axioms". Scene lengths come from the narration
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
    name: "Cold open: Königsberg, 1930",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "numbering",
    key: "Numbering",
    name: "Gödel numbering",
    component: Numbering,
  },
  { id: "godel", key: "Godel", name: "I am not provable", component: Godel },
  {
    id: "yangsheng",
    key: "Yangsheng",
    name: "庄子·养生主 (Chinese edition only)",
    component: Yangsheng,
  },
  {
    id: "continuum",
    key: "Continuum",
    name: "The continuum hypothesis",
    component: Continuum,
  },
  {
    id: "choice",
    key: "Choice",
    name: "The axiom of choice",
    component: Choice,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S1E15Compositions = makeEpisodeCompositions(
  "S1E15",
  S1E15,
  SCENES,
);
