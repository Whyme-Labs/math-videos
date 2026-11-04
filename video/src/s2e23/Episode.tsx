import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E23, type SceneId } from "./narration";
import { Cauchy } from "./scenes/Cauchy";
import { ColdOpen } from "./scenes/ColdOpen";
import { Completion } from "./scenes/Completion";
import { Contraction } from "./scenes/Contraction";
import { EndCard } from "./scenes/EndCard";
import { Lp } from "./scenes/Lp";
import { Picard } from "./scenes/Picard";
import { Series } from "./scenes/Series";
import { TitleCard } from "./scenes/TitleCard";
import { Zoo } from "./scenes/Zoo";
import { Zuchongzhi } from "./scenes/Zuchongzhi";

// S2E23 "Banach Spaces". Scene lengths come from the narration (narration.ts), so
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
    name: "Cold open: polynomials crowding towards eˣ",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "cauchy",
    key: "Cauchy",
    name: "Cauchy sequences and completeness",
    component: Cauchy,
  },
  { id: "zoo", key: "Zoo", name: "Which spaces are complete", component: Zoo },
  { id: "lp", key: "Lp", name: "Why ℓ² is complete", component: Lp },
  {
    id: "completion",
    key: "Completion",
    name: "Completion",
    component: Completion,
  },
  {
    id: "series",
    key: "Series",
    name: "Series need completeness",
    component: Series,
  },
  {
    id: "zuchongzhi",
    key: "Zuchongzhi",
    name: "祖冲之盈数朒数 (Chinese edition only)",
    component: Zuchongzhi,
  },
  {
    id: "contraction",
    key: "Contraction",
    name: "The contraction mapping theorem",
    component: Contraction,
  },
  {
    id: "picard",
    key: "Picard",
    name: "Picard iteration and PageRank",
    component: Picard,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E23Compositions = makeEpisodeCompositions(
  "S2E23",
  S2E23,
  SCENES,
);
