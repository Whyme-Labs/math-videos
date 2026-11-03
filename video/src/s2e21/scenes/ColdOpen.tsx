import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Three judges. Spikes hₙ(x) = n·max(0, 1 − n²x) on [0, 1], one after
// another, each taller and thinner, the earlier ones left as ghosts
// (c0–c1). Three judge cards on the right, each with a live reading as n
// climbs: the area 1/(2n) shrinks (c3), the energy stays at ⅓ (c4), the
// peak n grows (c5). The three verdicts light together (c6). Last the
// plane, where a diamond, a disc and a square nest inside each other:
// there, rulers can't disagree (c7).

const PX = 160;
const PW = 900;
const PY = 760;
const KY = 85;
// the plot shows x from 0 to 0.3, where the spikes live
const XM = 0.3;
const sx = (x: number) => PX + (PW * Math.min(x, XM)) / XM;

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, , c2, c3, c4, c5, c6, c7] = cues;
  const n = Math.min(7, Math.max(1, Math.floor((frame - c0 - 6) / 26) + 1));
  const part1 = fadeOut(frame, c7, 10);
  const vals = [1 / (2 * n), 1 / 3, n];
  const show = [c3, c4, c5];
  const plane = fadeIn(frame, c7 + 4, 10);
  const nest = glide(frame, c7 + 10, fps, 24);

  return (
    <SceneShell id="coldOpen">
      {Array.from({ length: 7 }).map((_, i) => (
        <Sfx
          key={i}
          name={i % 2 ? "pluck3" : "pluck1"}
          at={c0 + 6 + i * 26}
          volume={0.1}
        />
      ))}
      <Sfx name="pop" at={c2 + 6} volume={0.12} />
      <Sfx name="ding" at={c3 + 10} volume={0.22} />
      <Sfx name="clink" at={c4 + 10} volume={0.18} />
      <Sfx name="thud" at={c5 + 10} volume={0.22} />
      <Sfx name="chime" at={c6 + 6} volume={0.3} />
      <Sfx name="whoosh" at={c7 + 10} volume={0.1} />

      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute" }}
        opacity={part1}
      >
        <line
          x1={PX}
          y1={PY}
          x2={PX + PW}
          y2={PY}
          stroke={alpha(colors.paper, 0.5)}
          strokeWidth={3}
        />
        <line
          x1={PX}
          y1={PY}
          x2={PX}
          y2={PY - 7.4 * KY}
          stroke={alpha(colors.paper, 0.3)}
          strokeWidth={3}
        />
        {Array.from({ length: n }).map((_, i) => {
          const k = i + 1;
          const w = 1 / (k * k);
          const cur = k === n;
          return (
            <path
              key={k}
              d={`M ${sx(0)} ${PY - k * KY} L ${sx(w)} ${PY} L ${sx(0)} ${PY} Z`}
              fill={cur ? alpha(colors.primary, 0.35) : "none"}
              stroke={cur ? colors.primary : alpha(colors.primary, 0.25)}
              strokeWidth={cur ? 6 : 3}
            />
          );
        })}
        <text
          x={PX + 40}
          y={PY - n * KY - 16}
          fill={colors.text}
          fontSize={44}
          fontFamily={fonts.mono}
          fontWeight={800}
        >
          n = {n}
        </text>
        <text
          x={sx(XM)}
          y={PY + 50}
          fill={colors.muted}
          fontSize={36}
          fontFamily={fonts.mono}
          textAnchor="end"
        >
          0.3 →
        </text>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 1180,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          opacity: part1 * fadeIn(frame, c2 + 6, 10),
        }}
      >
        {tx.judges.map((j, i) => {
          const on = fadeIn(frame, show[i] + 6, 8);
          const ok = frame >= c6 + 6;
          const col = [colors.green, colors.primary, colors.red][i];
          return (
            <div
              key={j}
              style={{
                width: 600,
                padding: "16px 28px",
                borderRadius: 18,
                border: `5px solid ${ok ? col : alpha(colors.paper, 0.3)}`,
                background: alpha(colors.bg, 0.88),
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 46,
                fontWeight: 800,
              }}
            >
              <span style={{ color: colors.text }}>{j}</span>
              <span style={{ fontFamily: fonts.mono, color: col, opacity: on }}>
                {i === 1 ? "0.333" : vals[i].toFixed(i === 0 ? 3 : 0)}
              </span>
              <span
                style={{
                  color: col,
                  opacity: fadeIn(frame, c6 + 6, 8),
                  minWidth: 150,
                  textAlign: "right",
                }}
              >
                {tx.verdicts[i]}
              </span>
            </div>
          );
        })}
      </div>
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute" }}
        opacity={plane}
      >
        <g transform="translate(960 450)">
          <rect
            x={-230 * nest}
            y={-230 * nest}
            width={460 * nest}
            height={460 * nest}
            fill={alpha(colors.highlight, 0.1)}
            stroke={colors.highlight}
            strokeWidth={6}
          />
          <circle
            r={230 * nest}
            fill={alpha(colors.green, 0.1)}
            stroke={colors.green}
            strokeWidth={6}
          />
          <polygon
            points={`0,${-230 * nest} ${230 * nest},0 0,${230 * nest} ${-230 * nest},0`}
            fill={alpha(colors.primary, 0.12)}
            stroke={colors.primary}
            strokeWidth={6}
          />
        </g>
      </svg>
    </SceneShell>
  );
};
