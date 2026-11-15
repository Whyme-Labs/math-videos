import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S3E04, type SceneId } from "./narration";
import { ColdOpen } from "./scenes/ColdOpen";
import { Dft } from "./scenes/Dft";
import { Duality } from "./scenes/Duality";
import { EndCard } from "./scenes/EndCard";
import { Fft } from "./scenes/Fft";
import { Finale } from "./scenes/Finale";
import { Orth } from "./scenes/Orth";
import { Plancherel } from "./scenes/Plancherel";
import { Resonance } from "./scenes/Resonance";
import { Shifts } from "./scenes/Shifts";
import { TitleCard } from "./scenes/TitleCard";

// S3E04 "Fourier Is Duality". Scene lengths come from the narration (narration.ts), so
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
    name: "Cold open: why waves?",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "shifts",
    key: "Shifts",
    name: "What shifts want: characters",
    component: Shifts,
  },
  {
    id: "orth",
    key: "Orth",
    name: "Orthogonality by shifting the sum",
    component: Orth,
  },
  { id: "dft", key: "Dft", name: "The DFT matrix", component: Dft },
  { id: "fft", key: "Fft", name: "The FFT butterfly", component: Fft },
  {
    id: "resonance",
    key: "Resonance",
    name: "《庄子·徐无鬼》鼓宫宫动 (Chinese edition only)",
    component: Resonance,
  },
  {
    id: "duality",
    key: "Duality",
    name: "A group and its dual",
    component: Duality,
  },
  {
    id: "plancherel",
    key: "Plancherel",
    name: "ℝ, L² and Plancherel",
    component: Plancherel,
  },
  { id: "finale", key: "Finale", name: "Act I montage", component: Finale },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S3E04Compositions = makeEpisodeCompositions(
  "S3E04",
  S3E04,
  SCENES,
);
