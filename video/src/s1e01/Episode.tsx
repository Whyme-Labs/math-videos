import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S1E01, type SceneId } from "./narration";
import { BuildDescribe } from "./scenes/BuildDescribe";
import { ColdOpen } from "./scenes/ColdOpen";
import { DefineThree } from "./scenes/DefineThree";
import { EndCard } from "./scenes/EndCard";
import { Ladder } from "./scenes/Ladder";
import { Matching } from "./scenes/Matching";
import { Numerals } from "./scenes/Numerals";
import { Roadmap } from "./scenes/Roadmap";
import { TitleCard } from "./scenes/TitleCard";
import { TowerScene } from "./scenes/TowerScene";
import { WhyHard } from "./scenes/WhyHard";

// S1E01 "What Do We Mean by 'Number'?". Scene lengths come from the narration
// (narration.ts), so the script and the picture stay in sync.
const SCENES: SceneEntry<SceneId>[] = [
  {
    id: "brand",
    key: "BrandIntro",
    name: "Whyme Labs intro",
    component: BrandIntro,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  { id: "coldOpen", key: "ColdOpen", name: "Cold open", component: ColdOpen },
  {
    id: "defineThree",
    key: "DefineThree",
    name: "Defining three",
    component: DefineThree,
  },
  {
    id: "numerals",
    key: "Numerals",
    name: "Numerals are names",
    component: Numerals,
  },
  { id: "ladder", key: "Ladder", name: "Division ladder", component: Ladder },
  {
    id: "whyHard",
    key: "WhyHard",
    name: "Why the questions are hard",
    component: WhyHard,
  },
  {
    id: "matching",
    key: "Matching",
    name: "Cups and saucers",
    component: Matching,
  },
  { id: "tower", key: "Tower", name: "Number tower", component: TowerScene },
  {
    id: "buildDescribe",
    key: "BuildDescribe",
    name: "Build or describe",
    component: BuildDescribe,
  },
  { id: "roadmap", key: "Roadmap", name: "Roadmap", component: Roadmap },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S1E01Compositions = makeEpisodeCompositions(
  "S1E01",
  S1E01,
  SCENES,
);
