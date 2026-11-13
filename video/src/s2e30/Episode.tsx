import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E30, type SceneId } from "./narration";
import { ColdOpen } from "./scenes/ColdOpen";
import { Compact } from "./scenes/Compact";
import { EndCard } from "./scenes/EndCard";
import { Fredholm } from "./scenes/Fredholm";
import { Naive } from "./scenes/Naive";
import { Spectral } from "./scenes/Spectral";
import { StringScene } from "./scenes/StringScene";
import { TitleCard } from "./scenes/TitleCard";
import { Volterra } from "./scenes/Volterra";
import { Zaiyu } from "./scenes/Zaiyu";

// S2E30 "Compact Operators". Scene lengths come from the narration (narration.ts), so
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
    name: "Cold open: a string and the spectral theorem",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "naive",
    key: "Naive",
    name: "Why the finite proof fails",
    component: Naive,
  },
  {
    id: "compact",
    key: "Compact",
    name: "Compact operators",
    component: Compact,
  },
  {
    id: "spectral",
    key: "Spectral",
    name: "The spectral theorem for compact operators",
    component: Spectral,
  },
  {
    id: "zaiyu",
    key: "Zaiyu",
    name: "朱载堉十二平均律 (Chinese edition only)",
    component: Zaiyu,
  },
  {
    id: "fredholm",
    key: "Fredholm",
    name: "The Fredholm alternative",
    component: Fredholm,
  },
  {
    id: "string",
    key: "String",
    name: "The vibrating string",
    component: StringScene,
  },
  {
    id: "volterra",
    key: "Volterra",
    name: "The Volterra operator",
    component: Volterra,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E30Compositions = makeEpisodeCompositions(
  "S2E30",
  S2E30,
  SCENES,
);
