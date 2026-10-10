import { Composition, Folder } from "remotion";
import { Episode } from "./s1e01/Episode";
import { withLocale } from "./s1e01/i18n";
import { episodeDuration, FPS, sceneDuration } from "./s1e01/narration";
import { BrandIntro } from "./s1e01/scenes/BrandIntro";
import { BuildDescribe } from "./s1e01/scenes/BuildDescribe";
import { ColdOpen } from "./s1e01/scenes/ColdOpen";
import { DefineThree } from "./s1e01/scenes/DefineThree";
import { EndCard } from "./s1e01/scenes/EndCard";
import { Ladder } from "./s1e01/scenes/Ladder";
import { Matching } from "./s1e01/scenes/Matching";
import { Numerals } from "./s1e01/scenes/Numerals";
import { Roadmap } from "./s1e01/scenes/Roadmap";
import { TitleCard } from "./s1e01/scenes/TitleCard";
import { TowerScene } from "./s1e01/scenes/TowerScene";
import { WhyHard } from "./s1e01/scenes/WhyHard";

const SCENES = [
  { id: "BrandIntro", scene: "brand", component: BrandIntro },
  { id: "Title", scene: "title", component: TitleCard },
  { id: "ColdOpen", scene: "coldOpen", component: ColdOpen },
  { id: "DefineThree", scene: "defineThree", component: DefineThree },
  { id: "Numerals", scene: "numerals", component: Numerals },
  { id: "Ladder", scene: "ladder", component: Ladder },
  { id: "WhyHard", scene: "whyHard", component: WhyHard },
  { id: "Matching", scene: "matching", component: Matching },
  { id: "Tower", scene: "tower", component: TowerScene },
  { id: "BuildDescribe", scene: "buildDescribe", component: BuildDescribe },
  { id: "Roadmap", scene: "roadmap", component: Roadmap },
  { id: "EndCard", scene: "endCard", component: EndCard },
] as const;

const ZH_SCENES = SCENES.map((s) => ({
  ...s,
  component: withLocale(s.component, "zh"),
}));

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="S1E01"
        component={Episode}
        durationInFrames={episodeDuration("en")}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{ locale: "en" as const }}
      />
      <Composition
        id="S1E01-ZH"
        component={Episode}
        durationInFrames={episodeDuration("zh")}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{ locale: "zh" as const }}
      />
      {/* Each scene on its own, generated from one list so English and Chinese stay in step. */}
      <Folder name="S1E01-Scenes">
        {SCENES.map((s) => (
          <Composition
            key={s.id}
            id={`S1E01-${s.id}`}
            component={s.component}
            durationInFrames={sceneDuration(s.scene, "en")}
            fps={FPS}
            width={1920}
            height={1080}
          />
        ))}
      </Folder>
      <Folder name="S1E01-ZH-Scenes">
        {ZH_SCENES.map((s) => (
          <Composition
            key={s.id}
            id={`S1E01-ZH-${s.id}`}
            component={s.component}
            durationInFrames={sceneDuration(s.scene, "zh")}
            fps={FPS}
            width={1920}
            height={1080}
          />
        ))}
      </Folder>
    </>
  );
};
