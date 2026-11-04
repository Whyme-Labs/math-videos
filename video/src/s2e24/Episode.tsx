import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E24, type SceneId } from "./narration";
import { Bidual } from "./scenes/Bidual";
import { ColdOpen } from "./scenes/ColdOpen";
import { DualNorm } from "./scenes/DualNorm";
import { Duals } from "./scenes/Duals";
import { EndCard } from "./scenes/EndCard";
import { Evaluation } from "./scenes/Evaluation";
import { Holder } from "./scenes/Holder";
import { Kachi } from "./scenes/Kachi";
import { Measures } from "./scenes/Measures";
import { Monsters } from "./scenes/Monsters";
import { TitleCard } from "./scenes/TitleCard";

// S2E24 "The Continuous Dual". Scene lengths come from the narration (narration.ts), so
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
    name: "Cold open: tents and a measurement you can't trust",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "monsters",
    key: "Monsters",
    name: "Discontinuous linear functionals",
    component: Monsters,
  },
  {
    id: "dualNorm",
    key: "DualNorm",
    name: "The continuous dual and its norm",
    component: DualNorm,
  },
  {
    id: "holder",
    key: "Holder",
    name: "Hölder's inequality and dual balls",
    component: Holder,
  },
  { id: "duals", key: "Duals", name: "The dual of ℓᵖ", component: Duals },
  {
    id: "kachi",
    key: "Kachi",
    name: "新莽铜卡尺 (Chinese edition only)",
    component: Kachi,
  },
  {
    id: "measures",
    key: "Measures",
    name: "The dual of C[0, 1]: measures",
    component: Measures,
  },
  {
    id: "evaluation",
    key: "Evaluation",
    name: "Is point evaluation continuous?",
    component: Evaluation,
  },
  {
    id: "bidual",
    key: "Bidual",
    name: "The double dual and reflexivity",
    component: Bidual,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E24Compositions = makeEpisodeCompositions(
  "S2E24",
  S2E24,
  SCENES,
);
