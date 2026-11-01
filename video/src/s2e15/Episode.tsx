import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E15, type SceneId } from "./narration";
import { Bar } from "./scenes/Bar";
import { ColdOpen } from "./scenes/ColdOpen";
import { EndCard } from "./scenes/EndCard";
import { Fourier } from "./scenes/Fourier";
import { Geyuan } from "./scenes/Geyuan";
import { Spectral } from "./scenes/Spectral";
import { TitleCard } from "./scenes/TitleCard";
import { Unitary } from "./scenes/Unitary";

// S2E15 "Unitary Spaces". Scene lengths come from the narration (narration.ts), so
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
    name: "Cold open: Berlin, 1932",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  { id: "bar", key: "Bar", name: "The conjugate bar", component: Bar },
  { id: "unitary", key: "Unitary", name: "Unitary maps", component: Unitary },
  {
    id: "geyuan",
    key: "Geyuan",
    name: "割圆术 (Chinese edition only)",
    component: Geyuan,
  },
  {
    id: "spectral",
    key: "Spectral",
    name: "Schur and the spectral theorem",
    component: Spectral,
  },
  {
    id: "fourier",
    key: "Fourier",
    name: "The Fourier transform is unitary",
    component: Fourier,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E15Compositions = makeEpisodeCompositions(
  "S2E15",
  S2E15,
  SCENES,
);
