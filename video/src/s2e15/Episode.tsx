import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E15, type SceneId } from "./narration";
import { Bar } from "./scenes/Bar";
import { ColdOpen } from "./scenes/ColdOpen";
import { Define } from "./scenes/Define";
import { Eigen } from "./scenes/Eigen";
import { EndCard } from "./scenes/EndCard";
import { Fourier } from "./scenes/Fourier";
import { Geyuan } from "./scenes/Geyuan";
import { MatrixLand } from "./scenes/MatrixLand";
import { NoBilinear } from "./scenes/NoBilinear";
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
    name: "Cold open: (1, i) has length zero",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "noBilinear",
    key: "NoBilinear",
    name: "No bilinear form works over ℂ",
    component: NoBilinear,
  },
  { id: "bar", key: "Bar", name: "Why the bar", component: Bar },
  {
    id: "define",
    key: "Define",
    name: "The complex inner product",
    component: Define,
  },
  { id: "unitary", key: "Unitary", name: "Unitary maps", component: Unitary },
  {
    id: "eigen",
    key: "Eigen",
    name: "Eigenvalues on the unit circle",
    component: Eigen,
  },
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
    id: "matrixLand",
    key: "MatrixLand",
    name: "Matrix land",
    component: MatrixLand,
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
