import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import {
  ParamSurface,
  Stage3D,
  type V3,
} from "../../shared/components/three3d";
import { Ball as Bead } from "../../s2e17/components/stage";
import { Ledger } from "../components/ledger";
import { useStrings } from "../i18n";

// Loss four. A sphere in 3D with points scattered on it; one after another
// they light up, crowding towards one spot: a subsequence that converges
// (c0). Then ℓ²: unit arrows e₁, e₂, e₃, … fan out one by one (c1), and
// every pair of tips gets joined, each edge √2 (c2). A red ring hunts
// from tip to tip for a crowd and never settles (c3). Last a meter: the
// value 1 − 1/k climbs towards a dashed line at 1 and never touches it,
// k counting up (c4–c5); the fourth ledger line is crossed.

const PTS: V3[] = Array.from({ length: 36 }, (_, k) => {
  // a sequence on the sphere whose odd terms spiral into one point
  const a = k % 2 ? 0.6 + 2 / (k + 2) : k * 2.399;
  const b = k % 2 ? 0.9 + 1.5 / (k + 2) : Math.acos(1 - 2 * ((k * 0.618) % 1));
  return [Math.sin(b) * Math.cos(a), Math.sin(b) * Math.sin(a), Math.cos(b)];
});
const C = { x: 620, y: 470 };

export const Ball: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("ball");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const part0 = fadeOut(frame, c1, 10);
  const part1 = fadeIn(frame, c1 + 4, 10) * fadeOut(frame, c4, 10);
  const part2 = fadeIn(frame, c4 + 4, 10);
  const lit = Math.floor(Math.max(0, frame - c0 - 10) / 6);
  const fanN = Math.min(12, Math.floor(Math.max(0, frame - c1 - 6) / 8) + 1);
  const tips = Array.from({ length: fanN }, (_, k) => {
    const a = 0.3 + k * 0.52;
    const d = 1 / (1 + k * 0.06);
    return {
      x: C.x + 300 * d * Math.cos(a),
      y: C.y - 260 * d * Math.sin(a),
      d,
    };
  });
  const edges = glide(frame, c2 + 6, fps, 30);
  const hunt = Math.floor(Math.max(0, frame - c3 - 6) / 12);
  const ring = tips[(hunt * 5) % tips.length] ?? tips[0];
  const k = Math.max(1, Math.floor(Math.max(0, frame - c4 - 10) / 5) + 1);
  const val = 1 - 1 / k;
  const crossed = 3 + glide(frame, c5 + 60, fps, 20);

  return (
    <SceneShell id="ball">
      <Sfx name="riser" at={c0 + 10} volume={0.08} />
      {Array.from({ length: 10 }).map((_, i) => (
        <Sfx key={i} name="tick" at={c1 + 6 + i * 8} volume={0.08} />
      ))}
      <Sfx name="whoosh" at={c2 + 6} volume={0.1} />
      {Array.from({ length: 5 }).map((_, i) => (
        <Sfx key={`h${i}`} name="pop" at={c3 + 6 + i * 12} volume={0.08} />
      ))}
      <Sfx name="riser" at={c4 + 10} volume={0.08} />
      <Sfx name="thud" at={c5 + 30} volume={0.18} />
      <Sfx name="scratch" at={c5 + 60} volume={0.2} />

      <AbsoluteFill style={{ opacity: part0 }}>
        <Stage3D
          azimuth={-0.5 + (frame - c0) * 0.004}
          elevation={0.35}
          distance={5.4}
          target={[0, 0, 0]}
          style={{ left: -300, top: -40 }}
        >
          <ParamSurface
            p={(u, v) => [
              Math.sin(u * Math.PI) * Math.cos(v * Math.PI * 2),
              Math.sin(u * Math.PI) * Math.sin(v * Math.PI * 2),
              Math.cos(u * Math.PI),
            ]}
            res={40}
            color={colors.violet}
            opacity={0.3}
          />
          {PTS.map((p, i) => (
            <Bead
              key={i}
              at={p}
              r={0.045}
              color={i % 2 && i <= lit * 2 ? colors.primary : colors.text}
              opacity={fadeIn(frame, c0 + 2, 8)}
            />
          ))}
        </Stage3D>
        <div
          style={{
            position: "absolute",
            top: 110,
            left: 1000,
            fontFamily: fonts.math,
            fontSize: 56,
            fontWeight: 800,
            color: colors.text,
          }}
        >
          ℝ³
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <g opacity={edges}>
            {tips.flatMap((a, i) =>
              tips
                .slice(i + 1)
                .map((b, j) => (
                  <line
                    key={`${i}-${j}`}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke={alpha(colors.highlight, 0.25)}
                    strokeWidth={2}
                  />
                )),
            )}
          </g>
          {tips.map((t, k) => (
            <g key={k} opacity={t.d}>
              <line
                x1={C.x}
                y1={C.y}
                x2={t.x}
                y2={t.y}
                stroke={k % 2 ? colors.primary : colors.green}
                strokeWidth={6 * t.d}
                strokeLinecap="round"
              />
              <circle cx={t.x} cy={t.y} r={10 * t.d} fill={colors.text} />
            </g>
          ))}
          {frame >= c3 + 6 ? (
            <circle
              cx={ring.x}
              cy={ring.y}
              r={34}
              fill="none"
              stroke={colors.red}
              strokeWidth={5}
            />
          ) : null}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 110,
            left: 160,
            fontFamily: fonts.math,
            fontSize: 54,
            fontWeight: 800,
            color: colors.text,
          }}
        >
          ‖eₙ − eₘ‖ = √2
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: part2 }}>
        <svg width={1920} height={1080}>
          <line
            x1={400}
            y1={760}
            x2={840}
            y2={760}
            stroke={colors.text}
            strokeWidth={4}
          />
          <rect
            x={540}
            y={760 - 520 * val}
            width={160}
            height={520 * val}
            rx={10}
            fill={colors.primary}
          />
          <line
            x1={380}
            y1={240}
            x2={860}
            y2={240}
            stroke={colors.green}
            strokeWidth={5}
            strokeDasharray="14 10"
          />
          <text
            x={880}
            y={254}
            fill={colors.green}
            fontSize={48}
            fontFamily={fonts.mono}
            fontWeight={800}
          >
            1
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 110,
            left: 160,
            fontFamily: fonts.math,
            fontSize: 54,
            fontWeight: 800,
            color: colors.text,
            whiteSpace: "nowrap",
          }}
        >
          F(eₖ) = 1 − 1/k
          <span
            style={{
              fontFamily: fonts.mono,
              color: colors.primary,
              marginLeft: 30,
            }}
          >
            k = {k} · {val.toFixed(3)}
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            top: 300,
            left: 900,
            fontSize: 44,
            fontWeight: 800,
            color: colors.highlight,
            opacity: fadeIn(frame, c5 + 30),
            translate: riseIn(frame, c5 + 30, 12),
          }}
        >
          {tx.never1}
        </div>
      </AbsoluteFill>
      <Ledger crossed={crossed} active={3} opacity={part1 + part2} compact />
    </SceneShell>
  );
};
