import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { Sfx } from "../../shared/components/Sfx";
import { glide, hop, lerp, shake } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Runner } from "../components/race";
import { useStrings } from "../i18n";

// Chinese edition only. 《庄子·齐物论》: "有始也者，有未始有始也者，有未始有夫
// 未始有始也者。" The three clauses arrive on bamboo slips. Then the regress:
// a doorway marked 始, and inside it another, and another; the camera falls
// through them forever. Last, the opposite: she walks down a short staircase
// ω → 3 → 2 → 1 → 0 and lands. Going down always ends.

const SLIP_W = 120;
const SLIP_X = (i: number) => 1500 - i * (SLIP_W + 40);
const SLIP_Y = 140;
const SLIP_H = 640;

const STAIRS = ["ω", "3", "2", "1", "0"];
const stair = (k: number) => ({ x: 560 + k * 220, y: 380 + k * 90 });

export const Zhuangzi: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("zhuangzi");
  const [c0, c1, c2] = cues;
  const slipAt = (i: number) => c0 + 8 + i * 14;
  const slips = fadeOut(frame, c1, 10);
  // the regress: depth grows steadily, the camera falls through doorways
  const depth = Math.max(0, (frame - c1 - 6) / 34);
  const regress = fadeIn(frame, c1 + 2, 10) * fadeOut(frame, c2, 10);
  // the way down
  const walk = Math.min(STAIRS.length - 1, Math.max(0, (frame - c2 - 14) / 16));
  const kk = Math.min(STAIRS.length - 2, Math.floor(walk));
  const a = stair(kk);
  const b = stair(kk + 1);
  const g = hop(walk - kk, a.x, a.y, b.x, b.y, 60);
  const landAt = c2 + 14 + 16 * (STAIRS.length - 1);
  const landed = frame >= landAt;

  return (
    <SceneShell id="zhuangzi">
      {tx.quote.map((_, i) => (
        <Sfx key={i} name="page" at={slipAt(i)} volume={0.16} />
      ))}
      <Sfx name="whoosh" at={c1 + 6} volume={0.16} />
      {[0, 1, 2, 3].map((k) => (
        <Sfx key={`d${k}`} name="tick" at={c1 + 6 + k * 34} volume={0.12} />
      ))}
      {[0, 1, 2, 3].map((k) => (
        <Sfx
          key={`s${k}`}
          name={k === 3 ? "thud" : "pop"}
          at={c2 + 30 + k * 16}
          volume={k === 3 ? 0.4 : 0.14}
        />
      ))}
      <Sfx name="chime" at={landAt + 6} />

      {/* the bamboo slips, right to left */}
      <AbsoluteFill style={{ opacity: slips }}>
        <svg width={1920} height={1080}>
          {tx.quote.map((q, i) => {
            const t = glide(frame, slipAt(i), fps, 16);
            return (
              <g
                key={q}
                opacity={t}
                transform={`translate(0 ${lerp(-60, 0, t)})`}
              >
                <rect
                  x={SLIP_X(i)}
                  y={SLIP_Y}
                  width={SLIP_W}
                  height={SLIP_H}
                  rx={14}
                  fill={colors.wood}
                  stroke={colors.ink}
                  strokeWidth={4}
                />
                {[0.12, 0.88].map((f) => (
                  <line
                    key={f}
                    x1={SLIP_X(i) - 10}
                    y1={SLIP_Y + SLIP_H * f}
                    x2={SLIP_X(i) + SLIP_W + 10}
                    y2={SLIP_Y + SLIP_H * f}
                    stroke={colors.ink}
                    strokeWidth={5}
                  />
                ))}
                {[...q].map((ch, j) => (
                  <text
                    key={j}
                    x={SLIP_X(i) + SLIP_W / 2}
                    y={SLIP_Y + 110 + j * (q.length > 8 ? 46 : 62)}
                    fill={colors.ink}
                    fontSize={q.length > 8 ? 40 : 52}
                    textAnchor="middle"
                    fontFamily={fonts.title}
                  >
                    {ch}
                  </text>
                ))}
              </g>
            );
          })}
          <text
            x={300}
            y={300}
            fill={colors.primary}
            fontSize={56}
            fontFamily={fonts.title}
            opacity={fadeIn(frame, c0 + 4)}
          >
            {tx.zhuangziSource}
          </text>
        </svg>
      </AbsoluteFill>

      {/* doorways inside doorways, forever */}
      <AbsoluteFill style={{ opacity: regress }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: 9 }).map((_, i) => {
            const d = i + Math.floor(depth);
            const s = 0.62 ** (d - depth);
            if (s > 4) return null;
            const w = 1100 * s;
            const h = 760 * s;
            return (
              <g key={d}>
                <rect
                  x={960 - w / 2}
                  y={470 - h / 2}
                  width={w}
                  height={h}
                  rx={20 * s}
                  fill={alpha(colors.violet, 0.25 + 0.06 * (d % 2))}
                  stroke={d % 2 ? colors.primary : colors.orange}
                  strokeWidth={Math.max(2, 10 * s)}
                />
                <text
                  x={960 - w / 2 + 30 * s}
                  y={470 - h / 2 + 80 * s}
                  fill={d % 2 ? colors.primary : colors.orange}
                  fontSize={64 * s}
                  fontFamily={fonts.title}
                >
                  {d === 0 ? "始" : `${"未始".repeat(Math.min(d, 3))}…`}
                </text>
              </g>
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 60,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.title,
            fontSize: 52,
            color: colors.text,
            opacity: fadeIn(frame, c1 + 20),
            translate: riseIn(frame, c1 + 20, 16),
          }}
        >
          {tx.regress}
        </div>
      </AbsoluteFill>

      {/* the opposite: going down always lands */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c2 + 2, 10) }}>
        <Camera
          zoom={lerp(1.15, 1, glide(frame, c2, fps, 40))}
          x={lerp(-200, 0, glide(frame, c2, fps, 40))}
          y={0}
        >
          <svg
            width={1920}
            height={1080}
            style={{ position: "absolute", overflow: "visible" }}
          >
            {STAIRS.map((s, k) => {
              const p = stair(k);
              const last = k === STAIRS.length - 1;
              return (
                <g
                  key={s}
                  transform={`translate(${last && landed ? shake(frame, landAt, 6) : 0} 0)`}
                >
                  <rect
                    x={p.x - 110}
                    y={p.y}
                    width={220}
                    height={last ? 120 : 1000}
                    fill={alpha(last ? colors.green : colors.violet, 0.7)}
                    stroke={last ? colors.green : colors.primary}
                    strokeWidth={4}
                  />
                  <text
                    x={p.x}
                    y={p.y + 70}
                    fill={last ? colors.ink : colors.primary}
                    fontSize={52}
                    textAnchor="middle"
                    fontFamily={fonts.math}
                    fontWeight={700}
                  >
                    {s}
                  </text>
                </g>
              );
            })}
            <Runner
              x={g.x}
              y={g.y}
              color={colors.highlight}
              size={0.9}
              phase={!landed && frame > c2 + 14 ? frame / 2.6 : undefined}
            />
          </svg>
        </Camera>
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 160,
            fontFamily: fonts.title,
            fontSize: 60,
            color: colors.green,
            opacity: fadeIn(frame, landAt + 4),
            scale: lerp(1.3, 1, glide(frame, landAt + 4, fps, 12)),
          }}
        >
          {tx.bottom}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
