import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E20, type SceneId } from "./narration";
import { Ball } from "./scenes/Ball";
import { ColdOpen } from "./scenes/ColdOpen";
import { Eigen } from "./scenes/Eigen";
import { EndCard } from "./scenes/EndCard";
import { Hamel } from "./scenes/Hamel";
import { LedgerScene } from "./scenes/LedgerScene";
import { Mojing } from "./scenes/Mojing";
import { Shift } from "./scenes/Shift";
import { Spaces } from "./scenes/Spaces";
import { TitleCard } from "./scenes/TitleCard";
import { Wiggle } from "./scenes/Wiggle";

// S2E20 "What Breaks in Infinite Dimensions". Scene lengths come from the narration (narration.ts), so
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
    name: "Cold open: the free lunch and the conveyor belt",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  { id: "spaces", key: "Spaces", name: "The new spaces", component: Spaces },
  { id: "shift", key: "Shift", name: "Loss one: the shift", component: Shift },
  {
    id: "wiggle",
    key: "Wiggle",
    name: "Loss two: a wiggle whose slope explodes",
    component: Wiggle,
  },
  {
    id: "hamel",
    key: "Hamel",
    name: "Loss three: finite sums never finish",
    component: Hamel,
  },
  {
    id: "ball",
    key: "Ball",
    name: "Loss four: the ball isn't compact",
    component: Ball,
  },
  {
    id: "mojing",
    key: "Mojing",
    name: "《墨经》论穷 (Chinese edition only)",
    component: Mojing,
  },
  {
    id: "eigen",
    key: "Eigen",
    name: "Loss five: no eigenvectors",
    component: Eigen,
  },
  { id: "ledger", key: "Ledger", name: "The ledger", component: LedgerScene },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E20Compositions = makeEpisodeCompositions(
  "S2E20",
  S2E20,
  SCENES,
);
