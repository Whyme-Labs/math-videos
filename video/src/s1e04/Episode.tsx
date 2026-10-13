import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S1E04, type SceneId } from "./narration";
import { Benacerraf } from "./scenes/Benacerraf";
import { ColdOpen } from "./scenes/ColdOpen";
import { EndCard } from "./scenes/EndCard";
import { Mohist } from "./scenes/Mohist";
import { Russell } from "./scenes/Russell";
import { TitleCard } from "./scenes/TitleCard";
import { VonNeumann } from "./scenes/VonNeumann";
import { ZF } from "./scenes/ZF";
import { Zermelo } from "./scenes/Zermelo";

// S1E04 "Sets: The Universal Building Material". Scene lengths come from the
// narration (narration.ts), so the script and the picture stay in sync.
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
    name: "Cold open: boxes from nothing",
    component: ColdOpen,
  },
  {
    id: "russell",
    key: "Russell",
    name: "Russell's paradox",
    component: Russell,
  },
  {
    id: "mohist",
    key: "Mohist",
    name: "《墨经》 (Chinese edition only)",
    component: Mohist,
  },
  { id: "zf", key: "ZF", name: "ZF: safe building rules", component: ZF },
  {
    id: "vonNeumann",
    key: "VonNeumann",
    name: "von Neumann's numbers",
    component: VonNeumann,
  },
  {
    id: "zermelo",
    key: "Zermelo",
    name: "Zermelo's numbers; is 1 ∈ 3?",
    component: Zermelo,
  },
  {
    id: "benacerraf",
    key: "Benacerraf",
    name: "Benacerraf: which is the real 3?",
    component: Benacerraf,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S1E04Compositions = makeEpisodeCompositions(
  "S1E04",
  S1E04,
  SCENES,
);
