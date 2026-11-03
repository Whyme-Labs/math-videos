import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E22, type SceneId } from "./narration";
import { Ae } from "./scenes/Ae";
import { Cantor } from "./scenes/Cantor";
import { Caochong } from "./scenes/Caochong";
import { ColdOpen } from "./scenes/ColdOpen";
import { Dirichlet } from "./scenes/Dirichlet";
import { EndCard } from "./scenes/EndCard";
import { Lebesgue } from "./scenes/Lebesgue";
import { NullQ } from "./scenes/NullQ";
import { Probability } from "./scenes/Probability";
import { Rules } from "./scenes/Rules";
import { TitleCard } from "./scenes/TitleCard";
import { Vitali } from "./scenes/Vitali";

// S2E22 "Measure: How Big Is a Set?". Scene lengths come from the narration (narration.ts), so
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
    name: "Cold open: a random fraction, and the Cantor set",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "dirichlet",
    key: "Dirichlet",
    name: "Dirichlet's function breaks Riemann",
    component: Dirichlet,
  },
  {
    id: "rules",
    key: "Rules",
    name: "What size should mean",
    component: Rules,
  },
  {
    id: "nullQ",
    key: "NullQ",
    name: "The fractions have size zero",
    component: NullQ,
  },
  { id: "cantor", key: "Cantor", name: "The Cantor set", component: Cantor },
  {
    id: "vitali",
    key: "Vitali",
    name: "A set with no size",
    component: Vitali,
  },
  {
    id: "caochong",
    key: "Caochong",
    name: "曹冲称象 (Chinese edition only)",
    component: Caochong,
  },
  {
    id: "lebesgue",
    key: "Lebesgue",
    name: "Slice the heights",
    component: Lebesgue,
  },
  { id: "ae", key: "Ae", name: "Almost everywhere", component: Ae },
  {
    id: "probability",
    key: "Probability",
    name: "Probability is measure",
    component: Probability,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E22Compositions = makeEpisodeCompositions(
  "S2E22",
  S2E22,
  SCENES,
);
