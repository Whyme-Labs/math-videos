import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E32, type SceneId } from "./narration";
import { ColdOpen } from "./scenes/ColdOpen";
import { Doubling } from "./scenes/Doubling";
import { EndCard } from "./scenes/EndCard";
import { Koopman } from "./scenes/Koopman";
import { Mean } from "./scenes/Mean";
import { Metonic } from "./scenes/Metonic";
import { Preserve } from "./scenes/Preserve";
import { Recurrence } from "./scenes/Recurrence";
import { Spectrum } from "./scenes/Spectrum";
import { TitleCard } from "./scenes/TitleCard";
import { Weyl } from "./scenes/Weyl";

// S2E32 "Measure-Preserving Systems". Scene lengths come from the narration (narration.ts), so
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
    name: "Cold open: stirring coffee",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "doubling",
    key: "Doubling",
    name: "The doubling map",
    component: Doubling,
  },
  {
    id: "preserve",
    key: "Preserve",
    name: "Measure-preserving maps",
    component: Preserve,
  },
  {
    id: "recurrence",
    key: "Recurrence",
    name: "Poincaré recurrence",
    component: Recurrence,
  },
  {
    id: "metonic",
    key: "Metonic",
    name: "十九岁为一章 (Chinese edition only)",
    component: Metonic,
  },
  {
    id: "koopman",
    key: "Koopman",
    name: "The Koopman operator",
    component: Koopman,
  },
  {
    id: "spectrum",
    key: "Spectrum",
    name: "Ergodicity and mixing as spectrum",
    component: Spectrum,
  },
  {
    id: "mean",
    key: "Mean",
    name: "The mean ergodic theorem",
    component: Mean,
  },
  { id: "weyl", key: "Weyl", name: "Weyl equidistribution", component: Weyl },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E32Compositions = makeEpisodeCompositions(
  "S2E32",
  S2E32,
  SCENES,
);
