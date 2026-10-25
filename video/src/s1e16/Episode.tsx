import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S1E16, type SceneId } from "./narration";
import { ColdOpen } from "./scenes/ColdOpen";
import { Counting } from "./scenes/Counting";
import { EndCard } from "./scenes/EndCard";
import { Fails } from "./scenes/Fails";
import { Luoshu } from "./scenes/Luoshu";
import { Order } from "./scenes/Order";
import { Rules } from "./scenes/Rules";
import { TitleCard } from "./scenes/TitleCard";

// S1E16 "Groups". Scene lengths come from the narration (narration.ts), so
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
    name: "Cold open: what did your friend do?",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  { id: "rules", key: "Rules", name: "The four rules", component: Rules },
  { id: "fails", key: "Fails", name: "What fails the rules", component: Fails },
  {
    id: "order",
    key: "Order",
    name: "Order matters: socks and shoes",
    component: Order,
  },
  {
    id: "luoshu",
    key: "Luoshu",
    name: "洛书 (Chinese edition only)",
    component: Luoshu,
  },
  {
    id: "counting",
    key: "Counting",
    name: "Counting is one move",
    component: Counting,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S1E16Compositions = makeEpisodeCompositions(
  "S1E16",
  S1E16,
  SCENES,
);
