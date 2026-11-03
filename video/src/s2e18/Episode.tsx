import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E18, type SceneId } from "./narration";
import { Bianzhong } from "./scenes/Bianzhong";
import { ColdOpen } from "./scenes/ColdOpen";
import { Decomp } from "./scenes/Decomp";
import { Ellipse } from "./scenes/Ellipse";
import { EndCard } from "./scenes/EndCard";
import { Hessian } from "./scenes/Hessian";
import { Invariant } from "./scenes/Invariant";
import { Lemmas } from "./scenes/Lemmas";
import { Necessary } from "./scenes/Necessary";
import { Peel } from "./scenes/Peel";
import { Skewed } from "./scenes/Skewed";
import { TitleCard } from "./scenes/TitleCard";

// S2E18 "The Spectral Theorem". Scene lengths come from the narration (narration.ts), so
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
    name: "Cold open: three clean spin axes",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "skewed",
    key: "Skewed",
    name: "When eigenvectors fail",
    component: Skewed,
  },
  {
    id: "necessary",
    key: "Necessary",
    name: "Perpendicular axes force symmetry",
    component: Necessary,
  },
  {
    id: "lemmas",
    key: "Lemmas",
    name: "Real eigenvalues, perpendicular eigenvectors",
    component: Lemmas,
  },
  {
    id: "invariant",
    key: "Invariant",
    name: "The perpendicular plane stays put",
    component: Invariant,
  },
  { id: "peel", key: "Peel", name: "The proof by peeling", component: Peel },
  {
    id: "ellipse",
    key: "Ellipse",
    name: "The tilted ellipse",
    component: Ellipse,
  },
  {
    id: "bianzhong",
    key: "Bianzhong",
    name: "曾侯乙编钟一钟双音 (Chinese edition only)",
    component: Bianzhong,
  },
  {
    id: "hessian",
    key: "Hessian",
    name: "The second-derivative test",
    component: Hessian,
  },
  {
    id: "decomp",
    key: "Decomp",
    name: "A sum of stretched shadows",
    component: Decomp,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E18Compositions = makeEpisodeCompositions(
  "S2E18",
  S2E18,
  SCENES,
);
