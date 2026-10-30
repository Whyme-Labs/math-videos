import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn, typed } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Chinese edition only. Qin standardises weights and measures (221 BC).
// A bronze edict plaque: the key clause of the edict types out on it. Then
// the 商鞅方升 (344 BC, Shanghai Museum): a square measuring vessel with a
// handle; beside it its base slides into view, where the 221 BC edict was
// added.
// Last, the same heap of rice measured by a small and a large vessel: the
// readings differ (2 and 1), the heap of rice doesn't change at all.

const RICE = Array.from({ length: 60 }, (_, k) => ({
  x: Math.cos(k * 2.4) * (k % 8) * 26,
  y: -Math.abs(Math.sin(k * 1.7)) * (100 - (k % 8) * 11),
}));

export const Liangqi: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("liangqi");
  const [c0, c1, c2] = cues;
  const plaque = Math.min(1, springIn(frame, c0 + 10, fps, 12));
  const edict = typed(tx.edict, frame, c0 + 40, fps, 8);
  const part1 = fadeOut(frame, c1, 10);
  const vessel = glide(frame, c1 + 6, fps, 24);
  const tip = glide(frame, c1 + 60, fps, 30);
  const part2 = fadeOut(frame, c2, 10);
  const pourA = glide(frame, c2 + 30, fps, 24);
  const pourB = glide(frame, c2 + 70, fps, 24);

  return (
    <SceneShell id="liangqi">
      <Sfx name="thud" at={c0 + 10} volume={0.3} />
      {Array.from({ length: 7 }).map((_, k) => (
        <Sfx key={k} name="tick" at={c0 + 40 + k * 12} volume={0.12} />
      ))}
      <Sfx name="whoosh" at={c1 + 6} volume={0.12} />
      <Sfx name="clink" at={c1 + 70} volume={0.2} />
      <Sfx name="ding" at={c1 + 90} />
      <Sfx name="pluck2" at={c2 + 40} volume={0.16} />
      <Sfx name="pluck5" at={c2 + 80} volume={0.16} />
      <Sfx name="chime" at={c2 + 110} />

      {/* the edict plaque */}
      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          <g opacity={plaque} transform={`translate(960 470) scale(${plaque})`}>
            <rect
              x={-560}
              y={-200}
              width={1120}
              height={400}
              rx={18}
              fill={alpha(colors.green, 0.35)}
              stroke={colors.wood}
              strokeWidth={10}
            />
            {[-500, 500].map((x) =>
              [-150, 150].map((y) => (
                <circle
                  key={`${x}${y}`}
                  cx={x}
                  cy={y}
                  r={14}
                  fill={colors.wood}
                />
              )),
            )}
            <text
              y={30}
              fill={colors.paper}
              fontSize={70}
              textAnchor="middle"
              fontWeight={900}
            >
              {edict}
            </text>
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 120,
            fontFamily: fonts.title,
            fontSize: 52,
            fontWeight: 800,
            color: colors.primary,
            opacity: fadeIn(frame, c0 + 4),
            translate: riseIn(frame, c0 + 4, 16),
          }}
        >
          {tx.qin}
        </div>
      </AbsoluteFill>

      {/* 商鞅方升, tipping over to show the edict on its base */}
      <AbsoluteFill
        style={{
          opacity: fadeIn(frame, c1 + 4, 10) * part2,
          translate: `${lerp(500, 0, vessel)}px 0px`,
        }}
      >
        <svg width={1920} height={1080}>
          <g transform="translate(640 560)">
            {/* the handle */}
            <rect
              x={160}
              y={-40}
              width={300}
              height={60}
              rx={14}
              fill={colors.wood}
            />
            {/* the box, seen from the side */}
            <rect
              x={-170}
              y={-180}
              width={340}
              height={300}
              rx={10}
              fill={alpha(colors.wood, 0.85)}
              stroke={colors.ink}
              strokeWidth={6}
            />
            <rect
              x={-170}
              y={-180}
              width={340}
              height={30}
              fill={alpha(colors.ink, 0.4)}
            />
          </g>
          {/* the base, turned to face us: the 221 BC edict */}
          <g opacity={tip} transform={`translate(${lerp(-500, 0, tip)} 0)`}>
            <rect
              x={1240}
              y={300}
              width={300}
              height={340}
              rx={10}
              fill={alpha(colors.paper, 0.9)}
              stroke={colors.ink}
              strokeWidth={5}
            />
            {Array.from({ length: 5 }).map((_, col) =>
              Array.from({ length: 8 }).map((__, row) => (
                <rect
                  key={`${col}${row}`}
                  x={1270 + col * 52}
                  y={330 + row * 36}
                  width={30}
                  height={22}
                  rx={4}
                  fill={alpha(colors.ink, 0.55)}
                />
              )),
            )}
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 0,
            width: 1920,
            textAlign: "center",
            fontSize: 48,
            fontWeight: 800,
            color: colors.primary,
            opacity: fadeIn(frame, c1 + 20),
          }}
        >
          {tx.fangsheng}
        </div>
      </AbsoluteFill>

      {/* the same rice, two vessels, two readings */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c2 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <g transform="translate(960 620)">
            {RICE.map((r, k) => (
              <circle key={k} cx={r.x} cy={r.y} r={13} fill={colors.paper} />
            ))}
            <text
              y={90}
              fill={colors.primary}
              fontSize={44}
              textAnchor="middle"
              fontWeight={800}
            >
              {tx.vector}
            </text>
          </g>
          {[
            { x: 480, w: 140, t: pourA, n: "2", at: c2 + 40 },
            { x: 1440, w: 200, t: pourB, n: "1", at: c2 + 80 },
          ].map((v) => (
            <g key={v.x} transform={`translate(${v.x} 600)`}>
              <rect
                x={-v.w / 2}
                y={-v.w}
                width={v.w}
                height={v.w}
                fill={alpha(colors.paper, 0.15 + 0.5 * v.t)}
                stroke={colors.orange}
                strokeWidth={8}
              />
              <text
                y={-v.w - 40}
                fill={colors.orange}
                fontSize={90}
                textAnchor="middle"
                fontFamily={fonts.mono}
                fontWeight={800}
                opacity={fadeIn(frame, v.at, 6)}
              >
                × {v.n}
              </text>
              <text
                y={70}
                fill={colors.orange}
                fontSize={44}
                textAnchor="middle"
                fontWeight={800}
              >
                {tx.covector}
              </text>
            </g>
          ))}
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
