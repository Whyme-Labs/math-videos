import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E17, type SceneId } from "./narration";
import { Closest } from "./scenes/Closest";
import { ColdOpen } from "./scenes/ColdOpen";
import { EndCard } from "./scenes/EndCard";
import { Gram } from "./scenes/Gram";
import { Guishou } from "./scenes/Guishou";
import { Legendre } from "./scenes/Legendre";
import { Naive } from "./scenes/Naive";
import { Normal } from "./scenes/Normal";
import { OnLine } from "./scenes/OnLine";
import { Projector } from "./scenes/Projector";
import { Shadow } from "./scenes/Shadow";
import { TitleCard } from "./scenes/TitleCard";

// S2E17 "Projection and Least Squares". Scene lengths come from the narration (narration.ts), so
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
    name: "Cold open: Ceres lost and found",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  { id: "naive", key: "Naive", name: "Four points, no line", component: Naive },
  {
    id: "shadow",
    key: "Shadow",
    name: "The best fit is a shadow",
    component: Shadow,
  },
  {
    id: "closest",
    key: "Closest",
    name: "Why the shadow is closest",
    component: Closest,
  },
  {
    id: "onLine",
    key: "OnLine",
    name: "Projecting onto a line",
    component: OnLine,
  },
  {
    id: "normal",
    key: "Normal",
    name: "The normal equations",
    component: Normal,
  },
  {
    id: "projector",
    key: "Projector",
    name: "The projector P",
    component: Projector,
  },
  {
    id: "guishou",
    key: "Guishou",
    name: "郭守敬高表与景符 (Chinese edition only)",
    component: Guishou,
  },
  { id: "gram", key: "Gram", name: "Gram–Schmidt and QR", component: Gram },
  {
    id: "legendre",
    key: "Legendre",
    name: "Legendre polynomials",
    component: Legendre,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E17Compositions = makeEpisodeCompositions(
  "S2E17",
  S2E17,
  SCENES,
);
