import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S1E03, type SceneId } from "./narration";
import { Addition } from "./scenes/Addition";
import { Cancel } from "./scenes/Cancel";
import { ColdOpen } from "./scenes/ColdOpen";
import { Commute } from "./scenes/Commute";
import { EndCard } from "./scenes/EndCard";
import { Jiujiu } from "./scenes/Jiujiu";
import { Lopsided } from "./scenes/Lopsided";
import { Order } from "./scenes/Order";
import { Payoff } from "./scenes/Payoff";
import { Times } from "./scenes/Times";
import { TitleCard } from "./scenes/TitleCard";

// S1E03 "Arithmetic from Scratch". Scene lengths come from the narration
// (narration.ts), so the script and the picture stay in sync.
const SCENES: SceneEntry<SceneId>[] = [
  {
    id: "brand",
    key: "BrandIntro",
    name: "Whyme Labs intro",
    component: BrandIntro,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "jiujiu",
    key: "Jiujiu",
    name: "九九表 (Chinese edition only)",
    component: Jiujiu,
  },
  {
    id: "coldOpen",
    key: "ColdOpen",
    name: "Cold open: no plus sign yet",
    component: ColdOpen,
  },
  {
    id: "addition",
    key: "Addition",
    name: "Defining plus: the peeling machine",
    component: Addition,
  },
  {
    id: "lopsided",
    key: "Lopsided",
    name: "3 + 0 vs 0 + 3",
    component: Lopsided,
  },
  {
    id: "commute",
    key: "Commute",
    name: "Commutativity: three inductions",
    component: Commute,
  },
  {
    id: "cancel",
    key: "Cancel",
    name: "Cancellation needs P4",
    component: Cancel,
  },
  { id: "times", key: "Times", name: "Times as rows", component: Times },
  { id: "order", key: "Order", name: "Order from plus", component: Order },
  {
    id: "payoff",
    key: "Payoff",
    name: "All theorems; 3 + x = 0",
    component: Payoff,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S1E03Compositions = makeEpisodeCompositions(
  "S1E03",
  S1E03,
  SCENES,
);
