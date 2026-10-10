import type React from "react";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { useVideoConfig } from "remotion";
import { Music } from "./components/Music";
import { Sfx } from "./components/Sfx";
import {
  musicSegments,
  sceneDuration,
  sceneOrder,
  sceneStartFrame,
  TRANSITION_FRAMES,
} from "./narration";
import { BrandIntro } from "./scenes/BrandIntro";
import { BuildDescribe } from "./scenes/BuildDescribe";
import { ColdOpen } from "./scenes/ColdOpen";
import { DefineThree } from "./scenes/DefineThree";
import { EndCard } from "./scenes/EndCard";
import { Ladder } from "./scenes/Ladder";
import { Matching } from "./scenes/Matching";
import { Numerals } from "./scenes/Numerals";
import { Roadmap } from "./scenes/Roadmap";
import { TitleCard } from "./scenes/TitleCard";
import { TowerScene } from "./scenes/TowerScene";
import { WhyHard } from "./scenes/WhyHard";

// S1E01 "What Do We Mean by 'Number'?". Scene lengths come from the narration
// (narration.ts), so the script and the picture stay in sync.
export const Episode: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <>
      <Music segments={musicSegments} />
      {/* A soft whoosh under every crossfade between scenes. */}
      {sceneOrder.slice(1).map((id) => (
        <Sfx key={id} name="whoosh" at={sceneStartFrame(id) - 2} />
      ))}
      <TransitionSeries>
        <TransitionSeries.Sequence
          name="Whyme Labs intro"
          durationInFrames={sceneDuration("brand")}
          premountFor={fps}
        >
          <BrandIntro />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />
        <TransitionSeries.Sequence
          name="Title"
          durationInFrames={sceneDuration("title")}
          premountFor={fps}
        >
          <TitleCard />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />
        <TransitionSeries.Sequence
          name="Cold open"
          durationInFrames={sceneDuration("coldOpen")}
          premountFor={fps}
        >
          <ColdOpen />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />
        <TransitionSeries.Sequence
          name="Defining three"
          durationInFrames={sceneDuration("defineThree")}
          premountFor={fps}
        >
          <DefineThree />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />
        <TransitionSeries.Sequence
          name="Numerals are names"
          durationInFrames={sceneDuration("numerals")}
          premountFor={fps}
        >
          <Numerals />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />
        <TransitionSeries.Sequence
          name="Division ladder"
          durationInFrames={sceneDuration("ladder")}
          premountFor={fps}
        >
          <Ladder />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />
        <TransitionSeries.Sequence
          name="Why the questions are hard"
          durationInFrames={sceneDuration("whyHard")}
          premountFor={fps}
        >
          <WhyHard />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />
        <TransitionSeries.Sequence
          name="Cups and saucers"
          durationInFrames={sceneDuration("matching")}
          premountFor={fps}
        >
          <Matching />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />
        <TransitionSeries.Sequence
          name="Number tower"
          durationInFrames={sceneDuration("tower")}
          premountFor={fps}
        >
          <TowerScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />
        <TransitionSeries.Sequence
          name="Build or describe"
          durationInFrames={sceneDuration("buildDescribe")}
          premountFor={fps}
        >
          <BuildDescribe />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />
        <TransitionSeries.Sequence
          name="Roadmap"
          durationInFrames={sceneDuration("roadmap")}
          premountFor={fps}
        >
          <Roadmap />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />
        <TransitionSeries.Sequence
          name="End card"
          durationInFrames={sceneDuration("endCard")}
          premountFor={fps}
        >
          <EndCard />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </>
  );
};
