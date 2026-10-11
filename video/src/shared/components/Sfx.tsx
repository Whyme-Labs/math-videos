import type React from "react";
import { Audio } from "@remotion/media";
import { staticFile, useVideoConfig } from "remotion";

// Original sound effects synthesized by scripts/make-sfx.py (pitched ones in G minor).
const VOLUME = {
  pop: 0.4,
  tick: 0.25,
  whoosh: 0.22,
  chime: 0.35,
  ding: 0.35,
  thud: 0.5,
  scratch: 0.3,
  clink: 0.3,
  page: 0.3,
  pluck1: 0.35,
  pluck2: 0.35,
  pluck3: 0.35,
  pluck4: 0.35,
  pluck5: 0.35,
  pluck6: 0.35,
  sparkle: 0.35,
  riser: 0.3,
} as const;

export type SfxName = keyof typeof VOLUME;
export const PLUCKS: SfxName[] = [
  "pluck1",
  "pluck2",
  "pluck3",
  "pluck4",
  "pluck5",
  "pluck6",
];

// A one-shot sound at frame `at` of the current scene.
export const Sfx: React.FC<{
  readonly name: SfxName;
  readonly at: number;
  readonly volume?: number;
}> = ({ name, at, volume }) => {
  const { fps } = useVideoConfig();
  return (
    <Audio
      name={`SFX ${name}`}
      from={Math.max(0, Math.round(at))}
      src={staticFile(`sfx/${name}.wav`)}
      volume={volume ?? VOLUME[name]}
      premountFor={fps}
    />
  );
};
