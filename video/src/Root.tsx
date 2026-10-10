import { Composition, Folder } from "remotion";
import { Episode } from "./s1e01/Episode";
import { episodeDuration, FPS, sceneDuration } from "./s1e01/narration";
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

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="S1E01" component={Episode} durationInFrames={episodeDuration} fps={FPS} width={1920} height={1080} />
      <Folder name="S1E01-Scenes">
        <Composition id="S1E01-Title" component={TitleCard} durationInFrames={sceneDuration("title")} fps={FPS} width={1920} height={1080} />
        <Composition id="S1E01-ColdOpen" component={ColdOpen} durationInFrames={sceneDuration("coldOpen")} fps={FPS} width={1920} height={1080} />
        <Composition id="S1E01-DefineThree" component={DefineThree} durationInFrames={sceneDuration("defineThree")} fps={FPS} width={1920} height={1080} />
        <Composition id="S1E01-Numerals" component={Numerals} durationInFrames={sceneDuration("numerals")} fps={FPS} width={1920} height={1080} />
        <Composition id="S1E01-Ladder" component={Ladder} durationInFrames={sceneDuration("ladder")} fps={FPS} width={1920} height={1080} />
        <Composition id="S1E01-WhyHard" component={WhyHard} durationInFrames={sceneDuration("whyHard")} fps={FPS} width={1920} height={1080} />
        <Composition id="S1E01-Matching" component={Matching} durationInFrames={sceneDuration("matching")} fps={FPS} width={1920} height={1080} />
        <Composition id="S1E01-Tower" component={TowerScene} durationInFrames={sceneDuration("tower")} fps={FPS} width={1920} height={1080} />
        <Composition id="S1E01-BuildDescribe" component={BuildDescribe} durationInFrames={sceneDuration("buildDescribe")} fps={FPS} width={1920} height={1080} />
        <Composition id="S1E01-Roadmap" component={Roadmap} durationInFrames={sceneDuration("roadmap")} fps={FPS} width={1920} height={1080} />
        <Composition id="S1E01-EndCard" component={EndCard} durationInFrames={sceneDuration("endCard")} fps={FPS} width={1920} height={1080} />
      </Folder>
    </>
  );
};
