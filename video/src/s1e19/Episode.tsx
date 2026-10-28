import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S1E19, type SceneId } from "./narration";
import { ColdOpen } from "./scenes/ColdOpen";
import { EndCard } from "./scenes/EndCard";
import { Field } from "./scenes/Field";
import { Guiju } from "./scenes/Guiju";
import { Moves } from "./scenes/Moves";
import { Payoff } from "./scenes/Payoff";
import { TitleCard } from "./scenes/TitleCard";
import { Tower } from "./scenes/Tower";

// S1E19 "Fields". Scene lengths come from the narration (narration.ts), so
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
    name: "Cold open: Paris, 1837",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "moves",
    key: "Moves",
    name: "What lines and circles add",
    component: Moves,
  },
  {
    id: "guiju",
    key: "Guiju",
    name: "规矩 (Chinese edition only)",
    component: Guiju,
  },
  { id: "field", key: "Field", name: "Fields and degree", component: Field },
  { id: "tower", key: "Tower", name: "The tower law", component: Tower },
  {
    id: "payoff",
    key: "Payoff",
    name: "cos 20° has degree 3",
    component: Payoff,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S1E19Compositions = makeEpisodeCompositions(
  "S1E19",
  S1E19,
  SCENES,
);
