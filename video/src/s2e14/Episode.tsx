import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E14, type SceneId } from "./narration";
import { Camera } from "./scenes/Camera";
import { Cauchy } from "./scenes/Cauchy";
import { Circles } from "./scenes/Circles";
import { ColdOpen } from "./scenes/ColdOpen";
import { EndCard } from "./scenes/EndCard";
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
    name: "Cold open: Göttingen, 1908",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "camera",
    key: "Camera",
    name: "Coordinates can't give a ruler",
    component: Camera,
  },
  {
    id: "circles",
    key: "Circles",
    name: "Many unit circles",
    component: Circles,
  },
  {
    id: "mojing",
    key: "Mojing",
    name: "《墨经》 (Chinese edition only)",
    component: Mojing,
  },
  { id: "cauchy", key: "Cauchy", name: "Cauchy–Schwarz", component: Cauchy },
  { id: "norms", key: "Norms", name: "Norms without angles", component: Norms },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E14Compositions = makeEpisodeCompositions(
  "S2E14",
  S2E14,
  SCENES,
);
