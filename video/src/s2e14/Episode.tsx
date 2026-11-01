import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E14, type SceneId } from "./narration";
import { Angle } from "./scenes/Angle";
import { Axioms } from "./scenes/Axioms";
import { Bowl } from "./scenes/Bowl";
import { Cauchy } from "./scenes/Cauchy";
import { ColdOpen } from "./scenes/ColdOpen";
import { Coords } from "./scenes/Coords";
import { Ellipse } from "./scenes/Ellipse";
import { EndCard } from "./scenes/EndCard";
import { Inside } from "./scenes/Inside";
import { Mojing } from "./scenes/Mojing";
import { Norms } from "./scenes/Norms";
import { TitleCard } from "./scenes/TitleCard";

// S2E14 "Length and Angle Are a Choice". Scene lengths come from the narration (narration.ts), so
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
    name: "Cold open: are 1 and x perpendicular?",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "coords",
    key: "Coords",
    name: "Dotting coordinates is not a ruler",
    component: Coords,
  },
  { id: "axioms", key: "Axioms", name: "The three rules", component: Axioms },
  {
    id: "bowl",
    key: "Bowl",
    name: "Why positive: bowl or saddle",
    component: Bowl,
  },
  {
    id: "ellipse",
    key: "Ellipse",
    name: "The unit ellipse",
    component: Ellipse,
  },
  {
    id: "inside",
    key: "Inside",
    name: "The view from inside",
    component: Inside,
  },
  {
    id: "cauchy",
    key: "Cauchy",
    name: "Cauchy–Schwarz, proved",
    component: Cauchy,
  },
  {
    id: "angle",
    key: "Angle",
    name: "Angles, and the 30° computed",
    component: Angle,
  },
  {
    id: "mojing",
    key: "Mojing",
    name: "《墨经》 (Chinese edition only)",
    component: Mojing,
  },
  {
    id: "norms",
    key: "Norms",
    name: "Rulers without protractors",
    component: Norms,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E14Compositions = makeEpisodeCompositions(
  "S2E14",
  S2E14,
  SCENES,
);
