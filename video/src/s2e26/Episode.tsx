import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E26, type SceneId } from "./narration";
import { Baire } from "./scenes/Baire";
import { ClosedGraph } from "./scenes/ClosedGraph";
import { ColdOpen } from "./scenes/ColdOpen";
import { EndCard } from "./scenes/EndCard";
import { Fourier } from "./scenes/Fourier";
import { Hamel } from "./scenes/Hamel";
import { Naive } from "./scenes/Naive";
import { OpenMap } from "./scenes/OpenMap";
import { Paoding } from "./scenes/Paoding";
import { TitleCard } from "./scenes/TitleCard";
import { Ubp } from "./scenes/Ubp";

// S2E26 "The Big Three Theorems". Scene lengths come from the narration (narration.ts), so
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
    name: "Cold open: a Fourier series that blows up",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "naive",
    key: "Naive",
    name: "Pointwise bounds aren't enough",
    component: Naive,
  },
  { id: "baire", key: "Baire", name: "Baire's theorem", component: Baire },
  {
    id: "paoding",
    key: "Paoding",
    name: "庖丁解牛 (Chinese edition only)",
    component: Paoding,
  },
  { id: "ubp", key: "Ubp", name: "Uniform boundedness", component: Ubp },
  {
    id: "openMap",
    key: "OpenMap",
    name: "The open mapping theorem",
    component: OpenMap,
  },
  {
    id: "closedGraph",
    key: "ClosedGraph",
    name: "The closed graph theorem",
    component: ClosedGraph,
  },
  {
    id: "fourier",
    key: "Fourier",
    name: "A divergent Fourier series",
    component: Fourier,
  },
  {
    id: "hamel",
    key: "Hamel",
    name: "No countable Hamel basis",
    component: Hamel,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E26Compositions = makeEpisodeCompositions(
  "S2E26",
  S2E26,
  SCENES,
);
