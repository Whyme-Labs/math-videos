import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S1E05, type SceneId } from "./narration";
import { Blobs } from "./scenes/Blobs";
import { CloseTo } from "./scenes/CloseTo";
import { ColdOpen } from "./scenes/ColdOpen";
import { EndCard } from "./scenes/EndCard";
import { Fractions } from "./scenes/Fractions";
import { Partition } from "./scenes/Partition";
import { Relations } from "./scenes/Relations";
import { Sunzi } from "./scenes/Sunzi";
import { TitleCard } from "./scenes/TitleCard";
import { WellDefined } from "./scenes/WellDefined";
import { ZoomOut } from "./scenes/ZoomOut";

// S1E05 "The Master Tool: Equivalence Classes". Scene lengths come from the
// narration (narration.ts), so the script and the picture stay in sync.
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
    name: "Cold open: 1/2 and 2/4, 15:00 and 3",
    component: ColdOpen,
  },
  {
    id: "relations",
    key: "Relations",
    name: "Relations and the three properties",
    component: Relations,
  },
  {
    id: "closeTo",
    key: "CloseTo",
    name: "“Close to” is not transitive",
    component: CloseTo,
  },
  {
    id: "blobs",
    key: "Blobs",
    name: "Blobs: classes and the quotient",
    component: Blobs,
  },
  {
    id: "sunzi",
    key: "Sunzi",
    name: "《孙子算经》物不知数 (Chinese edition only)",
    component: Sunzi,
  },
  {
    id: "partition",
    key: "Partition",
    name: "Identical or disjoint: partitions",
    component: Partition,
  },
  {
    id: "wellDefined",
    key: "WellDefined",
    name: "Well defined: + passes, 2ⁿ fails",
    component: WellDefined,
  },
  {
    id: "fractions",
    key: "Fractions",
    name: "Fractions as classes; why not 0/0",
    component: Fractions,
  },
  { id: "zoomOut", key: "ZoomOut", name: "The recipe", component: ZoomOut },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S1E05Compositions = makeEpisodeCompositions(
  "S1E05",
  S1E05,
  SCENES,
);
