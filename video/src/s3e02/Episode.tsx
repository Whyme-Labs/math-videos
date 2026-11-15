import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S3E02, type SceneId } from "./narration";
import { ColdOpen } from "./scenes/ColdOpen";
import { Count } from "./scenes/Count";
import { EndCard } from "./scenes/EndCard";
import { Gengxiang } from "./scenes/Gengxiang";
import { Hamming } from "./scenes/Hamming";
import { Jordan } from "./scenes/Jordan";
import { Merge } from "./scenes/Merge";
import { Module } from "./scenes/Module";
import { Smith } from "./scenes/Smith";
import { TitleCard } from "./scenes/TitleCard";
import { Torsion } from "./scenes/Torsion";

// S3E02 "Modules: One Theorem, Two Classifications". Scene lengths come from the narration (narration.ts), so
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
    name: "Cold open: two puzzles, two seasons",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "hamming",
    key: "Hamming",
    name: "Warm-up over 𝔽₂: the Hamming code",
    component: Hamming,
  },
  {
    id: "module",
    key: "Module",
    name: "Modules: scalars from a ring",
    component: Module,
  },
  {
    id: "torsion",
    key: "Torsion",
    name: "Torsion: ℤ/2 has no basis",
    component: Torsion,
  },
  { id: "smith", key: "Smith", name: "Smith normal form", component: Smith },
  {
    id: "gengxiang",
    key: "Gengxiang",
    name: "《九章算术》更相减损 (Chinese edition only)",
    component: Gengxiang,
  },
  {
    id: "count",
    key: "Count",
    name: "Over ℤ: ten groups of order 144",
    component: Count,
  },
  {
    id: "jordan",
    key: "Jordan",
    name: "Over F[x]: Jordan blocks",
    component: Jordan,
  },
  { id: "merge", key: "Merge", name: "The dictionary", component: Merge },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S3E02Compositions = makeEpisodeCompositions(
  "S3E02",
  S3E02,
  SCENES,
);
