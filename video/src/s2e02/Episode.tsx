import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E02, type SceneId } from "./narration";
import { ColdOpen } from "./scenes/ColdOpen";
import { EndCard } from "./scenes/EndCard";
import { Exchange } from "./scenes/Exchange";
import { Infinite } from "./scenes/Infinite";
import { Language } from "./scenes/Language";
import { Span } from "./scenes/Span";
import { TitleCard } from "./scenes/TitleCard";
import { Wuse } from "./scenes/Wuse";

// S2E02 "Basis and Dimension". Scene lengths come from the narration
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
    name: "Cold open: London, 1861",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "span",
    key: "Span",
    name: "Span, and a redundant arrow",
    component: Span,
  },
  {
    id: "wuse",
    key: "Wuse",
    name: "《考工记》五色 (Chinese edition only)",
    component: Wuse,
  },
  {
    id: "exchange",
    key: "Exchange",
    name: "The exchange: every basis the same size",
    component: Exchange,
  },
  {
    id: "language",
    key: "Language",
    name: "Coordinates are a language",
    component: Language,
  },
  {
    id: "infinite",
    key: "Infinite",
    name: "Infinite dimension",
    component: Infinite,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E02Compositions = makeEpisodeCompositions(
  "S2E02",
  S2E02,
  SCENES,
);
