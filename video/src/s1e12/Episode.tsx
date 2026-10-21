import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S1E12, type SceneId } from "./narration";
import { ColdOpen } from "./scenes/ColdOpen";
import { Costumes } from "./scenes/Costumes";
import { Diagonal } from "./scenes/Diagonal";
import { EndCard } from "./scenes/EndCard";
import { Maodun } from "./scenes/Maodun";
import { Parties } from "./scenes/Parties";
import { TitleCard } from "./scenes/TitleCard";
import { Unnamed } from "./scenes/Unnamed";

// S1E12 "The Diagonal Argument". Scene lengths come from the narration
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
    name: "Cold open: the girl with no room",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "diagonal",
    key: "Diagonal",
    name: "The diagonal, close up",
    component: Diagonal,
  },
  {
    id: "parties",
    key: "Parties",
    name: "Cantor's theorem: the party nobody hosts",
    component: Parties,
  },
  {
    id: "maodun",
    key: "Maodun",
    name: "自相矛盾 (Chinese edition only)",
    component: Maodun,
  },
  {
    id: "costumes",
    key: "Costumes",
    name: "One trick, many costumes",
    component: Costumes,
  },
  {
    id: "unnamed",
    key: "Unnamed",
    name: "Most numbers can never be named",
    component: Unnamed,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S1E12Compositions = makeEpisodeCompositions(
  "S1E12",
  S1E12,
  SCENES,
);
