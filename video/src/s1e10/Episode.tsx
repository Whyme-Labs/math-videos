import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S1E10, type SceneId } from "./narration";
import { ColdOpen } from "./scenes/ColdOpen";
import { EndCard } from "./scenes/EndCard";
import { Fta } from "./scenes/Fta";
import { NoOrder } from "./scenes/NoOrder";
import { Pairs } from "./scenes/Pairs";
import { QuarterTurn } from "./scenes/QuarterTurn";
import { ScaleRotate } from "./scenes/ScaleRotate";
import { TitleCard } from "./scenes/TitleCard";
import { TowerScene } from "./scenes/TowerScene";
import { XianTu } from "./scenes/XianTu";

// S1E10 "ℂ: Numbers as Rotations". Scene lengths come from the narration
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
    id: "coldOpen",
    key: "ColdOpen",
    name: "Cold open: Bombelli's cubic",
    component: ColdOpen,
  },
  { id: "pairs", key: "Pairs", name: "ℂ as pairs of reals", component: Pairs },
  {
    id: "quarterTurn",
    key: "QuarterTurn",
    name: "× i is a quarter turn",
    component: QuarterTurn,
  },
  {
    id: "scaleRotate",
    key: "ScaleRotate",
    name: "Lengths multiply, angles add",
    component: ScaleRotate,
  },
  {
    id: "xianTu",
    key: "XianTu",
    name: "赵爽弦图 (Chinese edition only)",
    component: XianTu,
  },
  {
    id: "fta",
    key: "Fta",
    name: "The Fundamental Theorem of Algebra",
    component: Fta,
  },
  { id: "noOrder", key: "NoOrder", name: "No order on ℂ", component: NoOrder },
  {
    id: "tower",
    key: "Tower",
    name: "Tower: the ℂ floor and the ledger",
    component: TowerScene,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S1E10Compositions = makeEpisodeCompositions(
  "S1E10",
  S1E10,
  SCENES,
);
