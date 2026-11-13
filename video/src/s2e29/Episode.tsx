import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E29, type SceneId } from "./narration";
import { Bases } from "./scenes/Bases";
import { ColdOpen } from "./scenes/ColdOpen";
import { Diagonal } from "./scenes/Diagonal";
import { EndCard } from "./scenes/EndCard";
import { Energy } from "./scenes/Energy";
import { Gibbs } from "./scenes/Gibbs";
import { Guqin } from "./scenes/Guqin";
import { TitleCard } from "./scenes/TitleCard";
import { Tones } from "./scenes/Tones";

// S2E29 "Fourier". Scene lengths come from the narration (narration.ts), so
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
    name: "Cold open: violin, flute and the square wave",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "tones",
    key: "Tones",
    name: "Tones are orthonormal",
    component: Tones,
  },
  {
    id: "energy",
    key: "Energy",
    name: "Convergence in energy and Parseval",
    component: Energy,
  },
  { id: "gibbs", key: "Gibbs", name: "The Gibbs overshoot", component: Gibbs },
  {
    id: "guqin",
    key: "Guqin",
    name: "古琴的徽与泛音 (Chinese edition only)",
    component: Guqin,
  },
  {
    id: "diagonal",
    key: "Diagonal",
    name: "Differentiation is diagonal",
    component: Diagonal,
  },
  {
    id: "bases",
    key: "Bases",
    name: "Other orthonormal bases",
    component: Bases,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E29Compositions = makeEpisodeCompositions(
  "S2E29",
  S2E29,
  SCENES,
);
