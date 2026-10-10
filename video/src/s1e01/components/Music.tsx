import type React from "react";
import { Audio } from "@remotion/media";
import { interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { MUSIC_SRC, type MusicSegment } from "../music";

const MUSIC_VOLUME = 0.6; // captions only for now; drop to ~0.2 under a voiceover
const SEAM_FRAMES = 2; // tiny fades so splices don't click

const Segment: React.FC<{ readonly segment: MusicSegment; readonly isLast: boolean }> = ({ segment, isLast }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const duration = Math.round(segment.seconds * fps);
  // The song's own ending fades out; add a gentle final fade on top.
  const tail = isLast ? 3 * fps : SEAM_FRAMES;
  return (
    <Audio
      src={staticFile(MUSIC_SRC)}
      trimBefore={Math.round(segment.songStart * fps)}
      volume={interpolate(frame, [0, SEAM_FRAMES, duration - tail, duration], [0, MUSIC_VOLUME, MUSIC_VOLUME, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })}
    />
  );
};

// Bar-aligned splices of the track (see music.ts), placed on the video timeline.
export const Music: React.FC<{ readonly segments: MusicSegment[] }> = ({ segments }) => {
  const { fps } = useVideoConfig();
  return (
    <>
      {segments.map((segment, i) => (
        <Sequence
          key={i}
          name={`Music ${i + 1}`}
          from={Math.round(segment.videoStart * fps)}
          durationInFrames={Math.round(segment.seconds * fps)}
          premountFor={fps}
        >
          <Segment segment={segment} isLast={i === segments.length - 1} />
        </Sequence>
      ))}
    </>
  );
};
