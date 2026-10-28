import { makeEpisodeCompositions, type SceneEntry } from "../shared/episode";
import { BrandIntro } from "../shared/scenes/BrandIntro";
import { S2E04, type SceneId } from "./narration";
import { ColdOpen } from "./scenes/ColdOpen";
import { Columns } from "./scenes/Columns";
import { Compose } from "./scenes/Compose";
import { EndCard } from "./scenes/EndCard";
import { Fangcheng } from "./scenes/Fangcheng";
import { Order } from "./scenes/Order";
import { Shadows } from "./scenes/Shadows";
import { TitleCard } from "./scenes/TitleCard";

// S2E04 "Matrices as Shadows". Scene lengths come from the narration
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
    name: "Cold open: Dublin, 1843",
    component: ColdOpen,
  },
  { id: "title", key: "Title", name: "Title", component: TitleCard },
  {
    id: "columns",
    key: "Columns",
    name: "Columns are where the basis goes",
    component: Columns,
  },
  {
    id: "fangcheng",
    key: "Fangcheng",
    name: "刘徽：并列为行 (Chinese edition only)",
    component: Fangcheng,
  },
  {
    id: "compose",
    key: "Compose",
    name: "Composition forces row × column",
    component: Compose,
  },
  { id: "order", key: "Order", name: "AB ≠ BA", component: Order },
  {
    id: "shadows",
    key: "Shadows",
    name: "One map, many shadows",
    component: Shadows,
  },
  { id: "endCard", key: "EndCard", name: "End card", component: EndCard },
];

export const S2E04Compositions = makeEpisodeCompositions(
  "S2E04",
  S2E04,
  SCENES,
);
