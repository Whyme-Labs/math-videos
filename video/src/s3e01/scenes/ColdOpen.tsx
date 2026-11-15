import type React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip } from "../components/draw";
import { useStrings } from "../i18n";

// Could a field have six elements? A row of cards, sizes 2 to 12, deals in
// (c0). A six-hour clock: 2 × 3 lands on 0 (c1). The cards turn: a field
// exists (c2) for 2, 3, 4, 5, 7, 8, 9 (green ticks, c3), never for 6, 10,
// 12 (red, c4). Below, the sizes as grids of arrows' tips: 8 as a 2 × 2 × 2
// cube, 9 as a 3 × 3 square (c5). A field inside a bigger one, drawn as a
// plane over a line (c6). Chip: dimensions multiply (c7).

const SIZES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const OK = new Set([2, 3, 4, 5, 7, 8, 9, 11]);

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3, c4, c5, c6, c7] = cues;
  const clock = fadeIn(frame, c1 + 4, 8) * fadeOut(frame, c2 + 10, 8);
  const hand = progress(frame, c1 + 30, 30);
  const lower = fadeIn(frame, c5 + 4, 10);
  const verdict = (n: number) =>
    OK.has(n) ? (frame >= c3 + 6 ? 1 : 0) : frame >= c4 + 6 ? -1 : 0;

  return (
    <SceneShell id="coldOpen">
      {SIZES.map((_, i) => (
        <Sfx key={i} name="page" at={c0 + 4 + i * 4} volume={0.05} />
      ))}
      <Sfx name="tick" at={c1 + 30} volume={0.1} />
      <Sfx name="thud" at={c1 + 62} volume={0.16} />
      <Sfx name="chime" at={c3 + 10} volume={0.2} />
      <Sfx name="scratch" at={c4 + 10} volume={0.18} />
      <Sfx name="pop" at={c5 + 6} volume={0.12} />
      <Sfx name="whoosh" at={c6 + 6} volume={0.1} />
      <Sfx name="chime" at={c7 + 16} volume={0.28} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {SIZES.map((n, i) => {
          const v = verdict(n);
          const x = 160 + i * 147;
          return (
            <g
              key={n}
              opacity={fadeIn(frame, c0 + 4 + i * 4, 6)}
              transform={`translate(0 ${30 * (1 - fadeIn(frame, c0 + 4 + i * 4, 10))})`}
            >
              <rect
                x={x}
                y={150}
                width={120}
                height={170}
                rx={14}
                fill={
                  v === 1
                    ? alpha(colors.green, 0.25)
                    : v === -1
                      ? alpha(colors.red, 0.25)
                      : alpha(colors.paper, 0.08)
                }
                stroke={
                  v === 1 ? colors.green : v === -1 ? colors.red : colors.paper
                }
                strokeWidth={4}
              />
              <text
                x={x + 60}
                y={256}
                textAnchor="middle"
                fill={colors.text}
                fontSize={56}
                fontFamily={fonts.title}
                fontWeight={700}
              >
                {n}
              </text>
              <text
                x={x + 60}
                y={308}
                textAnchor="middle"
                fill={v === 1 ? colors.green : colors.red}
                fontSize={34}
                fontWeight={800}
                fontFamily={fonts.body}
                opacity={v === 0 ? 0 : 1}
              >
                {v === 1 ? "✓" : "✗"}
              </text>
            </g>
          );
        })}
      </svg>
      <AbsoluteFill style={{ opacity: clock }}>
        <svg width={1920} height={1080}>
          <circle
            cx={960}
            cy={590}
            r={190}
            fill="none"
            stroke={colors.paper}
            strokeWidth={5}
          />
          {Array.from({ length: 6 }, (_, k) => {
            const a = Math.PI / 2 - (2 * Math.PI * k) / 6;
            return (
              <text
                key={k}
                x={960 + 230 * Math.cos(a)}
                y={590 - 230 * Math.sin(a) + 14}
                textAnchor="middle"
                fill={k === 0 ? colors.red : colors.text}
                fontSize={40}
                fontFamily={fonts.mono}
                fontWeight={800}
              >
                {k}
              </text>
            );
          })}
          <line
            x1={960}
            y1={590}
            x2={960 + 160 * Math.sin(2 * Math.PI * hand)}
            y2={590 - 160 * Math.cos(2 * Math.PI * hand)}
            stroke={colors.primary}
            strokeWidth={8}
            strokeLinecap="round"
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 520,
            left: 1300,
            fontFamily: fonts.mono,
            fontSize: 54,
            fontWeight: 800,
            color: colors.red,
            whiteSpace: "nowrap",
            opacity: fadeIn(frame, c1 + 60),
          }}
        >
          2 × 3 = 0
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: lower * fadeOut(frame, c6, 10) }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: 8 }, (_, k) =>
            [1, 2, 4]
              .filter((m) => (k & m) === 0)
              .map((m) => {
                const pos = (q: number) => [
                  520 + 150 * ((q >> 2) & 1) + 70 * (q & 1),
                  700 - 150 * ((q >> 1) & 1) - 60 * (q & 1),
                ];
                const [x1, y1] = pos(k);
                const [x2, y2] = pos(k | m);
                return (
                  <line
                    key={`${k}-${m}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={alpha(colors.paper, 0.45)}
                    strokeWidth={3}
                  />
                );
              }),
          )}
          {[0, 1].flatMap((a) =>
            [0, 1].flatMap((b) =>
              [0, 1].map((c) => {
                const x = 520 + 150 * a + 70 * c;
                const y = 700 - 150 * b - 60 * c;
                return (
                  <circle
                    key={`${a}${b}${c}`}
                    cx={x}
                    cy={y}
                    r={14}
                    fill={colors.primary}
                  />
                );
              }),
            ),
          )}
          {[0, 1, 2].flatMap((a) =>
            [0, 1, 2].map((b) => (
              <circle
                key={`${a}${b}`}
                cx={1220 + 90 * a}
                cy={520 + 90 * b}
                r={14}
                fill={colors.orange}
              />
            )),
          )}
          <text
            x={560}
            y={790}
            textAnchor="middle"
            fill={colors.primary}
            fontSize={44}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            8 = 2³
          </text>
          <text
            x={1310}
            y={790}
            textAnchor="middle"
            fill={colors.orange}
            fontSize={44}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            9 = 3²
          </text>
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: fadeIn(frame, c6 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <path
            d="M 560 720 L 1160 720 L 1360 520 L 760 520 Z"
            fill={alpha(colors.violet, 0.4)}
            stroke={colors.highlight}
            strokeWidth={4}
          />
          <line
            x1={600}
            y1={680}
            x2={1100}
            y2={680}
            stroke={colors.primary}
            strokeWidth={8}
          />
          <line
            x1={760}
            y1={680}
            x2={900}
            y2={560}
            stroke={colors.orange}
            strokeWidth={8}
          />
          <text
            x={1110}
            y={665}
            fill={colors.primary}
            fontSize={38}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            K
          </text>
          <text
            x={1300}
            y={500}
            fill={colors.highlight}
            fontSize={38}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            L
          </text>
        </svg>
        <Chip
          frame={frame}
          at={c7 + 10}
          x={1420}
          y={600}
          color={colors.primary}
          size={44}
        >
          {tx.dimsMultiply}
        </Chip>
      </AbsoluteFill>
    </SceneShell>
  );
};
