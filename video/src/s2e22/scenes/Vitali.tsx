import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Vitali's set, on a circle (the interval [0, 1) with its ends joined, so
// sliding by a fraction is turning). A question chip (c0). One point and
// its friends, every point a fraction away, as dots of one colour around
// the circle (c1). Four friend groups in four colours; from each, one
// representative grows: the set V (c2). V turned by every fraction gives
// copies on rings of their own, none sharing a point (c3). Two chips: if
// m(V) = 0 the copies add to 0 < 1; if m(V) > 0 they add to ∞ > 3 (c4).

const C = { x: 620, y: 470 };
const R = 230;
const GROUPS = [0.07, 0.19, 0.33, 0.41];
const SHIFTS = [
  0,
  1 / 2,
  1 / 3,
  2 / 3,
  1 / 4,
  3 / 4,
  1 / 5,
  2 / 5,
  3 / 5,
  4 / 5,
  1 / 6,
  5 / 6,
];
const at = (t: number, r = R) => ({
  x: C.x + r * Math.cos(2 * Math.PI * t - Math.PI / 2),
  y: C.y + r * Math.sin(2 * Math.PI * t - Math.PI / 2),
});

export const Vitali: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("vitali");
  const [c0, c1, c2, c3, c4] = cues;
  const cols = [colors.primary, colors.green, colors.highlight, colors.orange];
  const groupsShown = frame < c2 + 6 ? 1 : 4;
  const pick = glide(frame, c2 + 40, fps, 16);
  const rings = Math.min(
    SHIFTS.length,
    Math.floor(Math.max(0, frame - c3 - 6) / 6) + 1,
  );

  return (
    <SceneShell id="vitali">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      <Sfx name="sparkle" at={c1 + 10} volume={0.25} />
      <Sfx name="pluck3" at={c2 + 6} volume={0.14} />
      <Sfx name="ding" at={c2 + 40} volume={0.24} />
      {Array.from({ length: 12 }).map((_, i) => (
        <Sfx key={i} name="tick" at={c3 + 6 + i * 6} volume={0.08} />
      ))}
      <Sfx name="thud" at={c4 + 10} volume={0.22} />
      <Sfx name="thud" at={c4 + 50} volume={0.22} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <circle
          cx={C.x}
          cy={C.y}
          r={R}
          fill="none"
          stroke={alpha(colors.paper, 0.6)}
          strokeWidth={4}
          opacity={fadeIn(frame, c0 + 4, 8)}
        />
        {frame < c3 + 6
          ? GROUPS.slice(0, groupsShown).map((g, gi) =>
              SHIFTS.map((s, i) => {
                const p = at((g + s) % 1);
                const rep = i === 0 && frame >= c2 + 40;
                return (
                  <circle
                    key={`${gi}-${i}`}
                    cx={p.x}
                    cy={p.y}
                    r={rep ? 10 + 8 * pick : 9}
                    fill={cols[gi]}
                    opacity={
                      fadeIn(frame, (gi === 0 ? c1 + 10 : c2 + 6) + i * 2, 6) *
                      (rep || frame < c2 + 40 ? 1 : 0.35)
                    }
                  />
                );
              }),
            )
          : SHIFTS.slice(0, rings).map((s, ri) => {
              const r = 110 + ri * 22;
              return (
                <g key={ri}>
                  <circle
                    cx={C.x}
                    cy={C.y}
                    r={r}
                    fill="none"
                    stroke={alpha(colors.paper, 0.15)}
                    strokeWidth={2}
                  />
                  {GROUPS.map((g, gi) => {
                    const p = at((g + s) % 1, r);
                    return (
                      <circle
                        key={gi}
                        cx={p.x}
                        cy={p.y}
                        r={7}
                        fill={cols[gi]}
                      />
                    );
                  })}
                </g>
              );
            })}
      </svg>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 1180,
          fontSize: 48,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c0 + 6),
          whiteSpace: "nowrap",
        }}
      >
        {tx.everySet}
      </div>
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 1180,
          fontFamily: fonts.math,
          fontSize: 48,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c1 + 10),
        }}
      >
        x ~ y ⇔ {tx.friends}
      </div>
      <div
        style={{
          position: "absolute",
          top: 290,
          left: 1180,
          fontFamily: fonts.math,
          fontSize: 48,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c2 + 40),
        }}
      >
        V = {"{"} ● ● ● ● {"}"}
      </div>
      <div
        style={{
          position: "absolute",
          top: 380,
          left: 1180,
          fontSize: 44,
          fontWeight: 800,
          color: colors.muted,
          opacity: fadeIn(frame, c3 + 6),
        }}
      >
        V + r · {tx.copies}
      </div>
      <div
        style={{
          position: "absolute",
          top: 480,
          left: 1180,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          fontFamily: fonts.math,
          fontSize: 44,
          fontWeight: 800,
          color: colors.red,
        }}
      >
        <div
          style={{
            opacity: fadeIn(frame, c4 + 10),
            translate: riseIn(frame, c4 + 10, 12),
          }}
        >
          m(V) = 0 ⇒ Σ = 0 &lt; 1
        </div>
        <div
          style={{
            opacity: fadeIn(frame, c4 + 50),
            translate: riseIn(frame, c4 + 50, 12),
          }}
        >
          m(V) &gt; 0 ⇒ Σ = ∞ &gt; 3
        </div>
      </div>
    </SceneShell>
  );
};
