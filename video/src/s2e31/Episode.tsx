import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E31, type SceneId } from "./narration";
import { ColdOpen } from "./scenes/ColdOpen";
import { Dictionary } from "./scenes/Dictionary";
import { EndCard } from "./scenes/EndCard";
import { Examples } from "./scenes/Examples";
import { Rainbow } from "./scenes/Rainbow";
import { Shift } from "./scenes/Shift";
import { Spectral } from "./scenes/Spectral";
import { Spectrum } from "./scenes/Spectrum";
import { TitleCard } from "./scenes/TitleCard";
import { Unbounded } from "./scenes/Unbounded";

// S2E31 "Spectrum and Quantum Mechanics". Scene lengths come from the narration (narration.ts), so
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
    name: "Cold open: position has no eigenvalues",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  { id: "shift", key: "Shift", name: "The right shift", component: Shift },
  {
    id: "spectrum",
    key: "Spectrum",
    name: "The spectrum",
    component: Spectrum,
  },
  {
    id: "examples",
    key: "Examples",
    name: "The two examples solved",
    component: Examples,
  },
  {
    id: "rainbow",
    key: "Rainbow",
    name: "沈括《梦溪笔谈》记虹 (Chinese edition only)",
    component: Rainbow,
  },
  {
    id: "unbounded",
    key: "Unbounded",
    name: "Why X and P are unbounded",
    component: Unbounded,
  },
  {
    id: "spectral",
    key: "Spectral",
    name: "The spectral theorem as multiplication",
    component: Spectral,
  },
  {
    id: "dictionary",
    key: "Dictionary",
    name: "The quantum mechanics dictionary",
    component: Dictionary,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E31Compositions = makeEpisodeCompositions(
  "S2E31",
  S2E31,
  SCENES,
);
