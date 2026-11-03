import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E19, type SceneId } from "./narration";
import { ColdOpen } from "./scenes/ColdOpen";
import { EndCard } from "./scenes/EndCard";
import { Example } from "./scenes/Example";
import { Layers } from "./scenes/Layers";
import { PartA } from "./scenes/PartA";
import { Pca } from "./scenes/Pca";
import { Proof } from "./scenes/Proof";
import { Rect } from "./scenes/Rect";
import { Rsr } from "./scenes/Rsr";
import { Shenkuo } from "./scenes/Shenkuo";
import { TitleCard } from "./scenes/TitleCard";
import { TwoBases } from "./scenes/TwoBases";

// S2E19 "The Singular Value Decomposition". Scene lengths come from the narration (narration.ts), so
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
    name: "Cold open: every circle becomes an ellipse",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "twoBases",
    key: "TwoBases",
    name: "Two bases, not one",
    component: TwoBases,
  },
  { id: "proof", key: "Proof", name: "The proof from AᵀA", component: Proof },
  { id: "rsr", key: "Rsr", name: "Rotate, stretch, rotate", component: Rsr },
  {
    id: "example",
    key: "Example",
    name: "A worked example",
    component: Example,
  },
  { id: "rect", key: "Rect", name: "Rectangular maps", component: Rect },
  {
    id: "shenkuo",
    key: "Shenkuo",
    name: "沈括小孔成像 (Chinese edition only)",
    component: Shenkuo,
  },
  {
    id: "layers",
    key: "Layers",
    name: "Eckart–Young, layer by layer",
    component: Layers,
  },
  {
    id: "pca",
    key: "Pca",
    name: "Principal component analysis",
    component: Pca,
  },
  { id: "partA", key: "PartA", name: "The end of Part A", component: PartA },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E19Compositions = makeEpisodeCompositions(
  "S2E19",
  S2E19,
  SCENES,
);
