import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { path } from "../components/draw";
import { useStrings } from "../i18n";

// Green's functions on a string [0, 1]. LG = δ: a point source at y and
// its response, a tent with its peak at y (c0). A source f drawn as a row
// of stems, point sources side by side (c1); each stem's tent appears and
// they add up into the solution u, in lemon (c2). The point y slides
// along and the tent follows it: G(x, y) = min(x, y)(1 − max(x, y)) (c3).
// In 3D: a point charge with circles of equal potential round it (c4).

const X = (t: number) => 260 + 1100 * t;
const Y = (v: number) => 640 - 1400 * v;
const G = (x: number, y: number) => Math.min(x, y) * (1 - Math.max(x, y));
const f = (y: number) => 0.6 + 0.4 * Math.sin(5 * y);
const STEMS = Array.from({ length: 11 }, (_, i) => (i + 0.5) / 11);

export const Green: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("green");
  const [c0, c1, c2, c3, c4] = cues;
  const partA = fadeIn(frame, c0 + 2, 8) * fadeOut(frame, c4, 10);
  const partB = fadeIn(frame, c4 + 4, 10);
  const y0 = frame < c3 ? 0.35 : 0.5 + 0.35 * Math.sin((frame - c3 - 6) * 0.04);
  const tents = Math.min(11, Math.max(0, Math.floor((frame - c2 - 6) / 5)));
  const u = (x: number) =>
    STEMS.slice(0, tents).reduce((s, y) => s + (f(y) / 11) * G(x, y), 0);
  const single = 1 - fadeIn(frame, c1, 8) + fadeIn(frame, c3 + 4, 8);

  return (
    <SceneShell id="green">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      {STEMS.map((_, i) => (
        <Sfx key={i} name="tick" at={c1 + 8 + i * 4} volume={0.05} />
      ))}
      {STEMS.map((_, i) => (
        <Sfx key={`t${i}`} name="pluck2" at={c2 + 6 + i * 5} volume={0.05} />
      ))}
      <Sfx name="whoosh" at={c3 + 6} volume={0.1} />
      <Sfx name="chime" at={c4 + 30} volume={0.26} />

      <div
        style={{
          position: "absolute",
          top: 120,
          left: 160,
          fontFamily: fonts.math,
          fontSize: 54,
          fontWeight: 800,
          color: colors.text,
          whiteSpace: "nowrap",
          opacity: partA,
        }}
      >
        {frame < c1 ? (
          <>
            L G = δ<sub style={{ fontSize: 32 }}>y</sub>
          </>
        ) : frame < c3 ? (
          <span style={{ color: colors.primary }}>
            u = G ∗ f = ∫ G(x, y) f(y) dy
          </span>
        ) : (
          <>G(x, y) = min(x, y)(1 − max(x, y))</>
        )}
      </div>
      <AbsoluteFill style={{ opacity: partA }}>
        <svg width={1920} height={1080}>
          <line
            x1={X(0)}
            y1={Y(0)}
            x2={X(1)}
            y2={Y(0)}
            stroke={colors.paper}
            strokeWidth={5}
          />
          {[0, 1].map((t) => (
            <circle key={t} cx={X(t)} cy={Y(0)} r={10} fill={colors.wood} />
          ))}
          <g opacity={Math.min(1, single)}>
            <line
              x1={X(y0)}
              y1={Y(0) + 6}
              x2={X(y0)}
              y2={Y(0) + 150}
              stroke={colors.highlight}
              strokeWidth={7}
            />
            <path
              d={path((x) => G(x, y0), 0, 1, X, Y, 200)}
              fill="none"
              stroke={colors.orange}
              strokeWidth={6}
            />
            <text
              x={X(y0)}
              y={Y(0) + 195}
              textAnchor="middle"
              fill={colors.highlight}
              fontSize={34}
              fontFamily={fonts.math}
              fontWeight={800}
            >
              δ
              <tspan fontSize={22} dy={8}>
                y
              </tspan>
            </text>
          </g>
          <g opacity={fadeIn(frame, c1 + 4, 8) * fadeOut(frame, c3, 8)}>
            {STEMS.map((y, i) => (
              <line
                key={i}
                x1={X(y)}
                y1={Y(0) + 6}
                x2={X(y)}
                y2={Y(0) + 6 + 120 * f(y)}
                stroke={colors.highlight}
                strokeWidth={6}
                opacity={fadeIn(frame, c1 + 8 + i * 4, 4)}
              />
            ))}
            {STEMS.slice(0, tents).map((y, i) => (
              <path
                key={i}
                d={path((x) => (f(y) / 11) * G(x, y), 0, 1, X, Y, 100)}
                fill="none"
                stroke={alpha(colors.orange, 0.6)}
                strokeWidth={3}
              />
            ))}
            <path
              d={path(u, 0, 1, X, Y, 200)}
              fill="none"
              stroke={colors.primary}
              strokeWidth={7}
              opacity={fadeIn(frame, c2 + 30, 10)}
            />
          </g>
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: partB }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: 7 }, (_, k) => {
            const r = 40 + k * 44 * progress(frame, c4 + 6, 30);
            return (
              <circle
                key={k}
                cx={960}
                cy={500}
                r={r}
                fill="none"
                stroke={alpha(colors.primary, 1 - k * 0.12)}
                strokeWidth={4}
              />
            );
          })}
          <circle cx={960} cy={500} r={22} fill={colors.highlight} />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 0,
            width: 1920,
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 54,
            fontWeight: 800,
            color: colors.text,
            whiteSpace: "nowrap",
          }}
        >
          −Δ (1/4π|x|) = δ · {tx.charge}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
