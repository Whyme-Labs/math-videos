import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, shake } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// A measurement you can't trust. A function with three gauges on it: a
// probe at a point, a tangent, a shaded area (c0), each feeding a number
// into a readout (c1). Then a tent at 0 on a zoomed-in axis, width 1/100
// and area 1/200 (c2); it narrows to 1/1000 and beyond (c3) while the
// area readout falls to 0 (c4), but the readout "value at 0" stays at 1
// and turns red (c5). A thermometer stuck in an ice cube reads 100° and
// shakes (c6). Chip: only continuous measurements (c7).

const PX = 200;
const PW = 960;
const PY = 720;
const PH = 420;
const XM = 0.02;
const sx = (x: number) => PX + (PW * x) / XM;
const f = (x: number) => 0.45 + 0.25 * Math.sin(6 * x) + 0.1 * x;
const df = (x: number) => 1.5 * Math.cos(6 * x) + 0.1;

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3, c4, c5, c6, c7] = cues;
  const part1 = fadeOut(frame, c2, 10);
  const part2 = fadeIn(frame, c2 + 4, 10) * fadeOut(frame, c6, 10);
  const part3 = fadeIn(frame, c6 + 4, 10);
  const narrow = glide(frame, c3 + 6, fps, 90);
  const w = lerp(0.01, 0.0008, narrow);
  const shk = shake(frame, c6 + 30, 12);
  const G = { x: 160, y: 720, w: 900, h: 420 };
  const gx = (x: number) => G.x + G.w * x;
  const gy = (y: number) => G.y - G.h * y;

  return (
    <SceneShell id="coldOpen">
      {[0, 1, 2].map((i) => (
        <Sfx key={i} name="pop" at={c0 + 8 + i * 12} volume={0.12} />
      ))}
      <Sfx name="pluck3" at={c1 + 6} volume={0.14} />
      <Sfx name="pop" at={c2 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c3 + 6} volume={0.1} />
      <Sfx name="pluck2" at={c4 + 6} volume={0.12} />
      <Sfx name="thud" at={c5 + 10} volume={0.22} />
      <Sfx name="thud" at={c6 + 30} volume={0.22} />
      <Sfx name="chime" at={c7 + 6} volume={0.3} />

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <line
            x1={G.x}
            y1={G.y}
            x2={G.x + G.w}
            y2={G.y}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          <path
            d={`${Array.from({ length: 101 }, (_, i) => `${i ? "L" : "M"} ${gx(i / 100)} ${gy(f(i / 100))}`).join(" ")} L ${gx(1)} ${G.y} L ${gx(0)} ${G.y} Z`}
            fill={alpha(colors.orange, 0.25 * fadeIn(frame, c0 + 32, 8))}
          />
          <path
            d={Array.from(
              { length: 101 },
              (_, i) => `${i ? "L" : "M"} ${gx(i / 100)} ${gy(f(i / 100))}`,
            ).join(" ")}
            fill="none"
            stroke={colors.primary}
            strokeWidth={6}
          />
          <g opacity={fadeIn(frame, c0 + 8, 8)}>
            <line
              x1={gx(0.3)}
              y1={G.y}
              x2={gx(0.3)}
              y2={gy(f(0.3))}
              stroke={colors.highlight}
              strokeWidth={4}
              strokeDasharray="8 6"
            />
            <circle
              cx={gx(0.3)}
              cy={gy(f(0.3))}
              r={12}
              fill={colors.highlight}
            />
          </g>
          <line
            x1={gx(0.58)}
            y1={gy(f(0.7) - 0.12 * df(0.7))}
            x2={gx(0.82)}
            y2={gy(f(0.7) + 0.12 * df(0.7))}
            stroke={colors.green}
            strokeWidth={5}
            opacity={fadeIn(frame, c0 + 20, 8)}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 200,
            left: 1180,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {tx.devices.map((d, i) => (
            <div
              key={d}
              style={{
                width: 560,
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 26px",
                borderRadius: 16,
                border: `4px solid ${[colors.highlight, colors.green, colors.orange][i]}`,
                background: alpha(colors.bg, 0.85),
                fontSize: 44,
                fontWeight: 800,
                color: [colors.highlight, colors.green, colors.orange][i],
                opacity: fadeIn(frame, c0 + 8 + i * 12, 8),
              }}
            >
              <span>{d}</span>
              <span
                style={{
                  fontFamily: fonts.mono,
                  opacity: fadeIn(frame, c1 + 6 + i * 6, 6),
                }}
              >
                {["0.70", "0.83", "0.53"][i]}
              </span>
            </div>
          ))}
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: part2 }}>
        <svg width={1920} height={1080}>
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
            y2={PY - PH - 40}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={3}
          />
          <path
            d={`M ${sx(0)} ${PY - PH} L ${sx(w)} ${PY} L ${sx(0)} ${PY} Z`}
            fill={alpha(colors.primary, 0.3)}
            stroke={colors.primary}
            strokeWidth={5}
          />
          <circle
            cx={sx(0)}
            cy={PY - PH}
            r={14}
            fill={frame >= c5 + 10 ? colors.red : colors.highlight}
          />
          <text
            x={sx(XM)}
            y={PY + 50}
            fill={colors.muted}
            fontSize={34}
            fontFamily={fonts.mono}
            textAnchor="end"
          >
            0.02 →
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 200,
            left: 1220,
            display: "flex",
            flexDirection: "column",
            gap: 24,
            fontSize: 48,
            fontWeight: 800,
          }}
        >
          <div style={{ color: colors.orange, whiteSpace: "nowrap" }}>
            {tx.area}{" "}
            <span style={{ fontFamily: fonts.mono }}>{(w / 2).toFixed(5)}</span>
          </div>
          <div
            style={{
              color: frame >= c5 + 10 ? colors.red : colors.highlight,
              opacity: fadeIn(frame, c5 + 6),
              whiteSpace: "nowrap",
            }}
          >
            {tx.valueAt0} <span style={{ fontFamily: fonts.mono }}>1</span>
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: part3 }}>
        <svg width={1920} height={1080}>
          <g transform={`translate(${760 + shk} 0)`}>
            <rect
              x={-200}
              y={480}
              width={400}
              height={240}
              rx={30}
              fill={alpha("#cfefff", 0.5)}
              stroke="#cfefff"
              strokeWidth={5}
            />
            <rect
              x={-18}
              y={180}
              width={36}
              height={420}
              rx={18}
              fill={alpha(colors.paper, 0.2)}
              stroke={colors.paper}
              strokeWidth={4}
            />
            <rect
              x={-10}
              y={200}
              width={20}
              height={390}
              rx={10}
              fill={colors.red}
            />
            <circle cx={0} cy={610} r={34} fill={colors.red} />
          </g>
          <text
            x={1000}
            y={260}
            fill={colors.red}
            fontSize={88}
            fontFamily={fonts.mono}
            fontWeight={800}
          >
            100°
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 400,
            left: 1000,
            padding: "10px 26px",
            borderRadius: 16,
            border: `5px solid ${colors.green}`,
            background: alpha(colors.bg, 0.85),
            fontSize: 46,
            fontWeight: 800,
            color: colors.green,
            opacity: fadeIn(frame, c7 + 6),
            translate: riseIn(frame, c7 + 6, 12),
            whiteSpace: "nowrap",
          }}
        >
          {tx.trust}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
