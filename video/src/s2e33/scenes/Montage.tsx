import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { path } from "../components/draw";
import { phi, spike } from "../components/fns";
import { useStrings } from "../i18n";

// The season's story of measurement. A heading (c0). A row of five tiles
// fills in: covectors as level lines crossed by an arrow and Riesz's arrow
// (c1); Hahn–Banach, a line separating two dots (c2); Koopman, a stirred
// cup (c3); the last tile, distributions. Then the tiles step back and a
// function f is probed by three bumps, each with its reading (c4); the
// function fades and a spike answers the same probes, δ (c5).

const TILE = 300;
const TX = (i: number) => 175 + i * 320;

const Art: React.FC<{ i: number; frame: number }> = ({ i, frame }) => {
  const cx = TX(i) + TILE / 2;
  const cy = 420;
  if (i === 0)
    return (
      <g>
        {[-2, -1, 0, 1, 2].map((k) => (
          <line
            key={k}
            x1={cx - 100 + k * 30}
            y1={cy + 90}
            x2={cx - 40 + k * 30}
            y2={cy - 90}
            stroke={colors.orange}
            strokeWidth={4}
          />
        ))}
        <line
          x1={cx - 90}
          y1={cy + 40}
          x2={cx + 80}
          y2={cy - 10}
          stroke={colors.primary}
          strokeWidth={7}
        />
      </g>
    );
  if (i === 1)
    return (
      <g>
        <line
          x1={cx - 110}
          y1={cy + 60}
          x2={cx + 110}
          y2={cy + 60}
          stroke={alpha(colors.paper, 0.5)}
          strokeWidth={3}
        />
        <line
          x1={cx - 60}
          y1={cy + 60}
          x2={cx + 50}
          y2={cy - 80}
          stroke={colors.primary}
          strokeWidth={7}
        />
        <path
          d={`M ${cx + 30} ${cy - 76} L ${cx + 52} ${cy - 82} L ${cx + 50} ${cy - 58}`}
          fill="none"
          stroke={colors.primary}
          strokeWidth={6}
        />
      </g>
    );
  if (i === 2)
    return (
      <g>
        <line
          x1={cx - 100}
          y1={cy + 100}
          x2={cx + 100}
          y2={cy - 100}
          stroke={colors.green}
          strokeWidth={6}
        />
        <circle cx={cx - 50} cy={cy - 40} r={18} fill={colors.primary} />
        <circle cx={cx + 50} cy={cy + 40} r={18} fill={colors.highlight} />
      </g>
    );
  if (i === 3)
    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={100}
          fill="#3a2414"
          stroke={colors.paper}
          strokeWidth={5}
        />
        {Array.from({ length: 60 }, (_, k) => {
          const r = 30 + (k % 12) * 5;
          const a = k * 0.4 + (frame * 0.03 * (120 - r)) / 60;
          return (
            <circle
              key={k}
              cx={cx + r * Math.cos(a)}
              cy={cy - r * Math.sin(a)}
              r={3.5}
              fill={colors.paper}
            />
          );
        })}
      </g>
    );
  return (
    <path
      d={path(
        (x) => Math.min(2.2, 0.35 * spike(x, 0.05)),
        -1,
        1,
        (t) => cx + 110 * t,
        (v) => cy + 90 - 80 * v,
        400,
      )}
      fill="none"
      stroke={colors.highlight}
      strokeWidth={6}
    />
  );
};

const X = (t: number) => 960 + 600 * t;
const Y = (v: number) => 640 - 180 * v;
const f = (x: number) => 0.6 + 0.3 * Math.sin(2 * x + 1);
const PROBES = [-0.7, 0, 0.6];

export const Montage: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("montage");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const tilesOn = [c1, c1 + 30, c2, c3, c3 + 40];
  const tilesOp = fadeIn(frame, c1, 8) * fadeOut(frame, c4, 10);
  const probe = fadeIn(frame, c4 + 4, 10);
  const isDelta = frame >= c5 + 6;
  const read = (p: number) => {
    let s = 0;
    for (let i = 0; i < 600; i++) {
      const x = -1 + (2 * (i + 0.5)) / 600;
      const g = isDelta ? spike(x, 0.02) : f(x);
      s += (g * phi((x - p) / 0.35) * 2) / 600;
    }
    return s;
  };

  return (
    <SceneShell id="montage">
      <Sfx name="riser" at={c0 + 4} volume={0.1} />
      {tilesOn.map((at, i) => (
        <Sfx key={i} name="pop" at={at + 6} volume={0.12} />
      ))}
      <Sfx name="whoosh" at={c4 + 4} volume={0.1} />
      <Sfx name="pluck3" at={c4 + 20} volume={0.12} />
      <Sfx name="sparkle" at={c5 + 20} volume={0.4} />

      <div
        style={{
          position: "absolute",
          top: 140,
          left: 0,
          width: 1920,
          textAlign: "center",
          fontFamily: fonts.title,
          fontSize: 60,
          fontWeight: 700,
          color: colors.text,
          opacity: fadeIn(frame, c0 + 4) * fadeOut(frame, c4, 10),
          translate: riseIn(frame, c0 + 4),
        }}
      >
        {tx.seasonStory}
      </div>
      <AbsoluteFill style={{ opacity: tilesOp }}>
        <svg width={1920} height={1080}>
          {tx.tiles.map((_, i) => (
            <g key={i} opacity={fadeIn(frame, tilesOn[i] + 6, 8)}>
              <rect
                x={TX(i)}
                y={270}
                width={TILE}
                height={300}
                rx={24}
                fill={alpha(colors.paper, 0.05)}
                stroke={alpha(colors.paper, 0.35)}
                strokeWidth={3}
              />
              <Art i={i} frame={frame} />
            </g>
          ))}
        </svg>
        {tx.tiles.map(([ep, name], i) => (
          <div
            key={ep}
            style={{
              position: "absolute",
              top: 590,
              left: TX(i),
              width: TILE,
              textAlign: "center",
              opacity: fadeIn(frame, tilesOn[i] + 6),
            }}
          >
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 28,
                color: colors.muted,
              }}
            >
              {ep}
            </div>
            <div style={{ fontSize: 36, fontWeight: 800, color: colors.text }}>
              {name}
            </div>
          </div>
        ))}
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: probe }}>
        <svg width={1920} height={1080}>
          <line
            x1={X(-1)}
            y1={Y(0)}
            x2={X(1)}
            y2={Y(0)}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={2}
          />
          <path
            d={path(f, -1, 1, X, Y, 200)}
            fill="none"
            stroke={colors.primary}
            strokeWidth={6}
            opacity={1 - fadeIn(frame, c5 + 6, 10)}
          />
          <path
            d={path(
              (x) => Math.min(2.4, 0.06 * spike(x, 0.02)),
              -1,
              1,
              X,
              Y,
              1500,
            )}
            fill="none"
            stroke={colors.highlight}
            strokeWidth={6}
            opacity={fadeIn(frame, c5 + 6, 10)}
          />
          {PROBES.map((p, i) => (
            <g key={p} opacity={fadeIn(frame, c4 + 14 + i * 8, 8)}>
              <path
                d={path((x) => 0.5 * phi((x - p) / 0.35), -1, 1, X, Y, 300)}
                fill={alpha(colors.green, 0.18)}
                stroke={colors.green}
                strokeWidth={3}
              />
              <text
                x={X(p)}
                y={Y(0) + 60}
                textAnchor="middle"
                fill={colors.green}
                fontSize={36}
                fontFamily={fonts.mono}
                fontWeight={800}
              >
                {read(p).toFixed(2)}
              </text>
            </g>
          ))}
        </svg>
      </AbsoluteFill>
    </SceneShell>
  );
};
