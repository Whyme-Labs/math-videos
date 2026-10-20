import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S1E11, type SceneId } from "./narration";
import { Bus } from "./scenes/Bus";
import { Buses } from "./scenes/Buses";
import { ColdOpen } from "./scenes/ColdOpen";
import { EndCard } from "./scenes/EndCard";
import { Fractions } from "./scenes/Fractions";
import { Liezi } from "./scenes/Liezi";
import { Matching } from "./scenes/Matching";
import { TitleCard } from "./scenes/TitleCard";

// S1E11 "Hilbert's Hotel: Counting Without Numbers". Scene lengths come
// from the narration (narration.ts), so the script and the picture stay in
// sync.
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
    name: "Cold open: the traveler at midnight",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  { id: "bus", key: "Bus", name: "An infinite bus: n → 2n", component: Bus },
  {
    id: "matching",
    key: "Matching",
    name: "Same size means matchable",
    component: Matching,
  },
  {
    id: "liezi",
    key: "Liezi",
    name: "《列子·汤问》 (Chinese edition only)",
    component: Liezi,
  },
  {
    id: "buses",
    key: "Buses",
    name: "Infinitely many buses: diagonals",
    component: Buses,
  },
  {
    id: "fractions",
    key: "Fractions",
    name: "The fractions: the Calkin–Wilf tree",
    component: Fractions,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S1E11Compositions = makeEpisodeCompositions(
  "S1E11",
  S1E11,
  SCENES,
);
