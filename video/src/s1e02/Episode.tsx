import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S1E02, type SceneId } from "./narration";
import { Broken } from "./scenes/Broken";
import { BuildDescribe } from "./scenes/BuildDescribe";
import { ColdOpen } from "./scenes/ColdOpen";
import { Dedekind } from "./scenes/Dedekind";
import { Dominoes } from "./scenes/Dominoes";
import { EndCard } from "./scenes/EndCard";
import { FinePrint } from "./scenes/FinePrint";
import { Peano } from "./scenes/Peano";
import { Proof } from "./scenes/Proof";
import { TitleCard } from "./scenes/TitleCard";

// S1E02 "Peano: Zero and 'Next'". Scene lengths come from the narration
// (narration.ts), so the script and the picture stay in sync.
const SCENES: SceneEntry<SceneId>[] = [
  {
    id: "brand",
    key: "BrandIntro",
    name: "Whyme Labs intro",
    component: BrandIntro,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "coldOpen",
    key: "ColdOpen",
    name: "Cold open: teach a machine to count",
    component: ColdOpen,
  },
  {
    id: "broken",
    key: "Broken",
    name: "Three broken worlds",
    component: Broken,
  },
  { id: "peano", key: "Peano", name: "Peano's five rules", component: Peano },
  {
    id: "dominoes",
    key: "Dominoes",
    name: "Induction as dominoes",
    component: Dominoes,
  },
  { id: "proof", key: "Proof", name: "First proof", component: Proof },
  {
    id: "dedekind",
    key: "Dedekind",
    name: "Dedekind: only one world",
    component: Dedekind,
  },
  {
    id: "buildDescribe",
    key: "BuildDescribe",
    name: "Build or describe",
    component: BuildDescribe,
  },
  {
    id: "finePrint",
    key: "FinePrint",
    name: "Fine print: first-order induction",
    component: FinePrint,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S1E02Compositions = makeEpisodeCompositions(
  "S1E02",
  S1E02,
  SCENES,
);
