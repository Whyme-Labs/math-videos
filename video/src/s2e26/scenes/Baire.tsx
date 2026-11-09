import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, longLine, rnd } from "../components/draw";
import { useStrings } from "../i18n";

// Baire's theorem. A square stands for a complete space (c0). Thin sets
// are scattered over it: lines, a dusting of points (c1). A disc that
// misses F₁ (c2); inside it a smaller one missing F₂, then the rest,
// each half the size (c3). Their centres line up and run into one point
// (c4), which glows: no thin set touches it. On the right, nested
// intervals on the rational line close in on √2, and the point they
// close in on is missing (c5).

const P = { x: 700, y: 470 };
const R0 = 300;
const K = 6;
const ANG = [0.4, 2.3, 4.1, 5.6, 1.2, 3.3];
const disc = (k: number) => {
  const r = R0 / 2 ** k;
  const a = ANG[k];
  return {
    x: P.x + 0.25 * r * Math.cos(a + 1),
    y: P.y + 0.25 * r * Math.sin(a + 1),
    r,
  };
};
const thinLine = (k: number) => {
  const d = disc(k);
  const a = ANG[k];
  const dist = d.r * 1.3;
  return {
    x: d.x + dist * Math.cos(a),
    y: d.y + dist * Math.sin(a),
    dx: -Math.sin(a),
    dy: Math.cos(a),
  };
};
const DUST = Array.from({ length: 160 }, (_, i) => ({
  x: 290 + rnd(i) * 820,
  y: 130 + rnd(i + 500) * 680,
})).filter(
  (p) => Math.hypot(p.x - disc(2).x, p.y - disc(2).y) > disc(2).r * 1.15,
);

const NL = { x: 1220, y: 640, w: 560 };
const QX = (q: number) => NL.x + ((q - 1) / 1) * NL.w;
const BOUNDS = [
  [1, 2],
  [1.4, 1.5],
  [1.41, 1.42],
  [1.414, 1.415],
];

export const Baire: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("baire");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const discsShown =
    frame < c2
      ? 0
      : frame < c3
        ? 1
        : Math.min(K, 2 + Math.floor((frame - c3 - 6) / 16));
  const lines = Math.min(K, Math.max(0, Math.floor((frame - c1 - 6) / 6)));
  const run = glide(frame, c4 + 6, fps, 30);
  const iv = Math.min(
    BOUNDS.length,
    Math.max(0, 1 + Math.floor((frame - c5 - 30) / 14)),
  );

  return (
    <SceneShell id="baire">
      <Sfx name="pop" at={c0 + 6} volume={0.12} />
      {Array.from({ length: K }, (_, k) => (
        <Sfx key={k} name="tick" at={c1 + 6 + k * 6} volume={0.07} />
      ))}
      <Sfx name="pluck2" at={c2 + 6} volume={0.14} />
      {Array.from({ length: K - 1 }, (_, k) => (
        <Sfx
          key={k}
          name="pluck3"
          at={c3 + 6 + k * 16}
          volume={0.08 + 0.01 * k}
        />
      ))}
      <Sfx name="ding" at={c4 + 36} volume={0.22} />
      <Sfx name="whoosh" at={c5 + 20} volume={0.1} />
      <Sfx name="thud" at={c5 + 90} volume={0.2} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="ba-clip">
            <rect x={280} y={120} width={840} height={700} rx={16} />
          </clipPath>
        </defs>
        <rect
          x={280}
          y={120}
          width={840}
          height={700}
          rx={16}
          fill={alpha(colors.paper, 0.05)}
          stroke={alpha(colors.paper, 0.35)}
          strokeWidth={4}
          opacity={fadeIn(frame, c0 + 2, 8)}
        />
        <g clipPath="url(#ba-clip)">
          {Array.from({ length: lines }, (_, k) => {
            if (k === 2) {
              return (
                <g key={k}>
                  {DUST.map((p, i) => (
                    <circle
                      key={i}
                      cx={p.x}
                      cy={p.y}
                      r={3.5}
                      fill={
                        frame >= c3 + 22 && discsShown >= 3
                          ? colors.red
                          : alpha(colors.paper, 0.7)
                      }
                    />
                  ))}
                </g>
              );
            }
            const L = thinLine(k);
            const hit = discsShown === k + 1;
            return (
              <path
                key={k}
                d={longLine(L.x, L.y, L.dx, L.dy)}
                stroke={hit ? colors.red : alpha(colors.paper, 0.7)}
                strokeWidth={hit ? 5 : 3}
              />
            );
          })}
          {Array.from({ length: discsShown }, (_, k) => {
            const d = disc(k);
            return (
              <circle
                key={k}
                cx={d.x}
                cy={d.y}
                r={d.r}
                fill={alpha(colors.primary, 0.12)}
                stroke={colors.primary}
                strokeWidth={Math.max(2, 5 - k * 0.5)}
              />
            );
          })}
          <g opacity={run}>
            <path
              d={Array.from(
                { length: K },
                (_, k) => `${k ? "L" : "M"} ${disc(k).x} ${disc(k).y}`,
              ).join(" ")}
              fill="none"
              stroke={colors.highlight}
              strokeWidth={3}
              strokeDasharray="6 5"
            />
            {Array.from({ length: K }, (_, k) => (
              <circle
                key={k}
                cx={disc(k).x}
                cy={disc(k).y}
                r={7}
                fill={colors.highlight}
              />
            ))}
          </g>
          <circle
            cx={P.x}
            cy={P.y}
            r={
              14 +
              10 *
                fadeIn(frame, c4 + 36, 10) *
                (1 + 0.15 * Math.sin(frame * 0.2))
            }
            fill="none"
            stroke={colors.green}
            strokeWidth={5}
            opacity={fadeIn(frame, c4 + 36, 8)}
          />
          <circle
            cx={P.x}
            cy={P.y}
            r={7}
            fill={colors.green}
            opacity={fadeIn(frame, c4 + 36, 8)}
          />
        </g>
        <g opacity={fadeIn(frame, c5 + 6, 10)}>
          <line
            x1={NL.x}
            y1={NL.y}
            x2={NL.x + NL.w}
            y2={NL.y}
            stroke={alpha(colors.paper, 0.6)}
            strokeWidth={4}
          />
          {[1, 1.5, 2].map((v) => (
            <text
              key={v}
              x={QX(v)}
              y={NL.y + 50}
              textAnchor="middle"
              fill={colors.muted}
              fontSize={32}
              fontFamily={fonts.mono}
            >
              {v}
            </text>
          ))}
          {BOUNDS.slice(0, iv).map(([a, b], i) => (
            <rect
              key={i}
              x={QX(a)}
              y={NL.y - 30 - i * 26}
              width={Math.max(3, QX(b) - QX(a))}
              height={16}
              rx={4}
              fill={alpha(colors.primary, 0.6 + 0.1 * i)}
            />
          ))}
          <circle
            cx={QX(Math.SQRT2)}
            cy={NL.y}
            r={12}
            fill={colors.bg}
            stroke={colors.red}
            strokeWidth={5}
            opacity={fadeIn(frame, c5 + 90, 6)}
          />
          <text
            x={QX(Math.SQRT2)}
            y={NL.y + 100}
            textAnchor="middle"
            fill={colors.red}
            fontSize={40}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c5 + 90, 6)}
          >
            √2 ∉ ℚ
          </text>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 130,
          left: 1220,
          fontSize: 44,
          fontWeight: 800,
          color: colors.text,
          opacity: fadeIn(frame, c1 + 6) * fadeOut(frame, c5, 8),
        }}
      >
        F₁, F₂, F₃, … · {tx.thin}
      </div>
      <Chip frame={frame} at={c5 + 90} x={1220} y={430} color={colors.red}>
        {tx.hole}
      </Chip>
    </SceneShell>
  );
};
