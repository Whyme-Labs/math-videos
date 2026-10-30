import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E05, type SceneId } from "./narration";
import { ColdOpen } from "./scenes/ColdOpen";
import { Complement } from "./scenes/Complement";
import { EndCard } from "./scenes/EndCard";
import { Ganzhi } from "./scenes/Ganzhi";
import { Hom } from "./scenes/Hom";
import { PlusC } from "./scenes/PlusC";
import { Quotient } from "./scenes/Quotient";
import { Sum } from "./scenes/Sum";
import { TitleCard } from "./scenes/TitleCard";

// S2E05 "Building New Spaces". Scene lengths come from the narration
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
    name: "Cold open: you forgot + C",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  { id: "sum", key: "Sum", name: "Union vs sum", component: Sum },
  {
    id: "complement",
    key: "Complement",
    name: "Complements are not unique",
    component: Complement,
  },
  {
    id: "quotient",
    key: "Quotient",
    name: "The quotient: glue, don't choose",
    component: Quotient,
  },
  {
    id: "ganzhi",
    key: "Ganzhi",
    name: "干支纪年 (Chinese edition only)",
    component: Ganzhi,
  },
  { id: "plusC", key: "PlusC", name: "+ C is a point", component: PlusC },
  { id: "hom", key: "Hom", name: "Maps form a space", component: Hom },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E05Compositions = makeEpisodeCompositions(
  "S2E05",
  S2E05,
  SCENES,
);
