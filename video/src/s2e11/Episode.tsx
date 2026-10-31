import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E11, type SceneId } from "./narration";
import { Churu } from "./scenes/Churu";
import { ColdOpen } from "./scenes/ColdOpen";
import { Det } from "./scenes/Det";
import { EndCard } from "./scenes/EndCard";
import { Product } from "./scenes/Product";
import { Rules } from "./scenes/Rules";
import { TitleCard } from "./scenes/TitleCard";
import { Wedge } from "./scenes/Wedge";

// S2E11 "Exterior Algebra and the Determinant". Scene lengths come from the narration (narration.ts), so
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
    name: "Cold open: Edo, 1683",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "rules",
    key: "Rules",
    name: "Rules for a signed area",
    component: Rules,
  },
  {
    id: "churu",
    key: "Churu",
    name: "刘徽 · 出入相补 (Chinese edition only)",
    component: Churu,
  },
  { id: "wedge", key: "Wedge", name: "The wedge", component: Wedge },
  { id: "det", key: "Det", name: "The determinant is volume", component: Det },
  {
    id: "product",
    key: "Product",
    name: "det(AB), and the formula",
    component: Product,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E11Compositions = makeEpisodeCompositions(
  "S2E11",
  S2E11,
  SCENES,
);
