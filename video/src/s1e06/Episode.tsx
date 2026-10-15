import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S1E06, type SceneId } from "./narration";
import { ColdOpen } from "./scenes/ColdOpen";
import { EndCard } from "./scenes/EndCard";
import { Ledger } from "./scenes/Ledger";
import { Mediant } from "./scenes/Mediant";
import { MinusTimes } from "./scenes/MinusTimes";
import { QBuild } from "./scenes/QBuild";
import { TitleCard } from "./scenes/TitleCard";
import { ZArith } from "./scenes/ZArith";
import { Zhengfu } from "./scenes/Zhengfu";
import { ZPairs } from "./scenes/ZPairs";

// S1E06 "Subtraction and Division: ℤ and ℚ". Scene lengths come from the
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
    name: "Cold open: 3 − 5 in ℕ",
    component: ColdOpen,
  },
  {
    id: "zPairs",
    key: "ZPairs",
    name: "ℤ as diagonals of pairs",
    component: ZPairs,
  },
  {
    id: "zArith",
    key: "ZArith",
    name: "Adding pairs; opposites",
    component: ZArith,
  },
  {
    id: "minusTimes",
    key: "MinusTimes",
    name: "(−1)·(−1) = 1 is forced",
    component: MinusTimes,
  },
  {
    id: "zhengfu",
    key: "Zhengfu",
    name: "《九章算术》正负术 (Chinese edition only)",
    component: Zhengfu,
  },
  {
    id: "qBuild",
    key: "QBuild",
    name: "ℚ as lines through the centre",
    component: QBuild,
  },
  {
    id: "mediant",
    key: "Mediant",
    name: "The mediant is not well defined",
    component: Mediant,
  },
  {
    id: "ledger",
    key: "Ledger",
    name: "Tower: ring, field, and what we lost",
    component: Ledger,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S1E06Compositions = makeEpisodeCompositions(
  "S1E06",
  S1E06,
  SCENES,
);
