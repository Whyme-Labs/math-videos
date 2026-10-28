import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E03, type SceneId } from "./narration";
import { Basis } from "./scenes/Basis";
import { ColdOpen } from "./scenes/ColdOpen";
import { EndCard } from "./scenes/EndCard";
import { Engine } from "./scenes/Engine";
import { Kernel } from "./scenes/Kernel";
import { Test } from "./scenes/Test";
import { TitleCard } from "./scenes/TitleCard";
import { Zhaocha } from "./scenes/Zhaocha";

// S2E03 "Linear Maps". Scene lengths come from the narration (narration.ts),
// so the script and the picture stay in sync.
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
    name: "Cold open: London, 1821",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  { id: "test", key: "Test", name: "The linearity test", component: Test },
  {
    id: "basis",
    key: "Basis",
    name: "A basis decides the map",
    component: Basis,
  },
  {
    id: "zhaocha",
    key: "Zhaocha",
    name: "《授时历》招差术 (Chinese edition only)",
    component: Zhaocha,
  },
  {
    id: "kernel",
    key: "Kernel",
    name: "Kernel, image, rank–nullity",
    component: Kernel,
  },
  { id: "engine", key: "Engine", name: "Babbage's engine", component: Engine },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E03Compositions = makeEpisodeCompositions(
  "S2E03",
  S2E03,
  SCENES,
);
