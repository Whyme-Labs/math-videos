import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S3E01, type SceneId } from "./narration";
import { Bagua } from "./scenes/Bagua";
import { ColdOpen } from "./scenes/ColdOpen";
import { Construct } from "./scenes/Construct";
import { Degree } from "./scenes/Degree";
import { EndCard } from "./scenes/EndCard";
import { Finite } from "./scenes/Finite";
import { Norm } from "./scenes/Norm";
import { Ruler } from "./scenes/Ruler";
import { TitleCard } from "./scenes/TitleCard";
import { Tower } from "./scenes/Tower";

// S3E01 "Fields Are Vector Spaces". Scene lengths come from the narration (narration.ts), so
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
    name: "Cold open: a field with six elements?",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "ruler",
    key: "Ruler",
    name: "Counting is the wrong ruler",
    component: Ruler,
  },
  {
    id: "degree",
    key: "Degree",
    name: "The degree of an extension",
    component: Degree,
  },
  { id: "tower", key: "Tower", name: "The tower law", component: Tower },
  {
    id: "finite",
    key: "Finite",
    name: "Finite fields have pⁿ elements",
    component: Finite,
  },
  {
    id: "bagua",
    key: "Bagua",
    name: "《周易》八卦 (Chinese edition only)",
    component: Bagua,
  },
  {
    id: "norm",
    key: "Norm",
    name: "Multiplication as a matrix: norm and trace",
    component: Norm,
  },
  {
    id: "construct",
    key: "Construct",
    name: "The impossible trisection",
    component: Construct,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S3E01Compositions = makeEpisodeCompositions(
  "S3E01",
  S3E01,
  SCENES,
);
