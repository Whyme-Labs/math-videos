import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E09, type SceneId } from "./narration";
import { ColdOpen } from "./scenes/ColdOpen";
import { EndCard } from "./scenes/EndCard";
import { Gougu } from "./scenes/Gougu";
import { Machine } from "./scenes/Machine";
import { Signature } from "./scenes/Signature";
import { Squares } from "./scenes/Squares";
import { TitleCard } from "./scenes/TitleCard";
import { TwoObjects } from "./scenes/TwoObjects";

// S2E09 "Bilinear Forms". Scene lengths come from the narration
// (narration.ts), so the script and the picture stay in sync.
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
    name: "Cold open: Cologne, 1908",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "twoObjects",
    key: "TwoObjects",
    name: "One grid, two objects",
    component: TwoObjects,
  },
  {
    id: "machine",
    key: "Machine",
    name: "A form is a map V → V*",
    component: Machine,
  },
  {
    id: "gougu",
    key: "Gougu",
    name: "勾三股四弦五 (Chinese edition only)",
    component: Gougu,
  },
  {
    id: "squares",
    key: "Squares",
    name: "Completing squares, Sylvester's law",
    component: Squares,
  },
  {
    id: "signature",
    key: "Signature",
    name: "Signatures, and Minkowski's spacetime",
    component: Signature,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E09Compositions = makeEpisodeCompositions(
  "S2E09",
  S2E09,
  SCENES,
);
