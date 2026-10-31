import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E13, type SceneId } from "./narration";
import { Blocks } from "./scenes/Blocks";
import { ColdOpen } from "./scenes/ColdOpen";
import { Damping } from "./scenes/Damping";
import { EndCard } from "./scenes/EndCard";
import { Ladder } from "./scenes/Ladder";
import { Shear } from "./scenes/Shear";
import { TitleCard } from "./scenes/TitleCard";
import { Zugeng } from "./scenes/Zugeng";

// S2E13 "When Diagonalization Fails". Scene lengths come from the narration (narration.ts), so
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
    name: "Cold open: Paris, 1870",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "shear",
    key: "Shear",
    name: "The shear has one eigen-direction",
    component: Shear,
  },
  {
    id: "zugeng",
    key: "Zugeng",
    name: "祖暅原理 (Chinese edition only)",
    component: Zugeng,
  },
  {
    id: "ladder",
    key: "Ladder",
    name: "A generalized eigenvector",
    component: Ladder,
  },
  { id: "blocks", key: "Blocks", name: "Jordan blocks", component: Blocks },
  {
    id: "damping",
    key: "Damping",
    name: "Critical damping",
    component: Damping,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E13Compositions = makeEpisodeCompositions(
  "S2E13",
  S2E13,
  SCENES,
);
