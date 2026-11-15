import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S3E03, type SceneId } from "./narration";
import { Blocks } from "./scenes/Blocks";
import { Character } from "./scenes/Character";
import { ColdOpen } from "./scenes/ColdOpen";
import { EndCard } from "./scenes/EndCard";
import { Lattice } from "./scenes/Lattice";
import { Maschke } from "./scenes/Maschke";
import { Matrices } from "./scenes/Matrices";
import { Schur } from "./scenes/Schur";
import { TitleCard } from "./scenes/TitleCard";
import { Water } from "./scenes/Water";

// S3E03 "Representations: Groups Acting by Matrices". Scene lengths come from the narration (narration.ts), so
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
    name: "Cold open: a molecule's fingerprint",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "matrices",
    key: "Matrices",
    name: "Symmetries become matrices",
    component: Matrices,
  },
  {
    id: "blocks",
    key: "Blocks",
    name: "S₃ on three axes splits 1 + 2",
    component: Blocks,
  },
  {
    id: "maschke",
    key: "Maschke",
    name: "Maschke: average the inner product",
    component: Maschke,
  },
  { id: "schur", key: "Schur", name: "Schur's lemma", component: Schur },
  {
    id: "character",
    key: "Character",
    name: "Characters and the table",
    component: Character,
  },
  {
    id: "lattice",
    key: "Lattice",
    name: "《营造法式》格子门 (Chinese edition only)",
    component: Lattice,
  },
  {
    id: "water",
    key: "Water",
    name: "Water's three vibrations",
    component: Water,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S3E03Compositions = makeEpisodeCompositions(
  "S3E03",
  S3E03,
  SCENES,
);
