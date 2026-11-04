import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// The double dual. Three boxes X → X* → X** slide in (c0). A dot x in X
// sends an arc over to X**, labelled J(x)(f) = f(x) (c1). The arc's
// image grows to fill X**: reflexive (c2). Then a table on the left,
// one row per space, with a drawing on the right: a rounded ℓ³ ball,
// tick (c3); a grid of 0–1 sequences, any two rows 1 apart, cross (c4);
// δₛ and −δₜ on [0, 1] with a function reading 2 on them, cross (c5).

const BOX = [
  { x: 260, label: "X" },
  { x: 860, label: "X*" },
  { x: 1460, label: "X**" },
];
const BY = 130;
const BW = 300;
const BH = 160;

const ROWS = ["ℓᵖ (1 < p < ∞)", "ℓ¹", "C[0, 1]"];
const RY = [420, 540, 660];

// a fixed scatter of 0/1 rows
const bits = (r: number, c: number) =>
  ((r * 7 + c * 13 + ((r * c) % 5)) * 2654435761) % 7 < 3;

export const Bidual: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("bidual");
  const [c0, c1, c2, c3, c4, c5] = cues;
  const arc = glide(frame, c1 + 8, fps, 30);
  const fill = glide(frame, c2 + 8, fps, 40);
  const ill3 = fadeIn(frame, c3 + 4, 8) * fadeOut(frame, c4, 8);
  const ill4 = fadeIn(frame, c4 + 4, 8) * fadeOut(frame, c5, 8);
  const ill5 = fadeIn(frame, c5 + 4, 8);
  const p = lerp(1.6, 4, (1 + Math.sin((frame - c3) * 0.05)) / 2);
  const ball = Array.from({ length: 121 }, (_, k) => {
    const t = (2 * Math.PI * k) / 120;
    const c = Math.cos(t);
    const s = Math.sin(t);
    const r = 1 / (Math.abs(c) ** p + Math.abs(s) ** p) ** (1 / p);
    return `${k ? "L" : "M"} ${1300 + 190 * r * c} ${560 - 190 * r * s}`;
  }).join(" ");
  const rowsShown = Math.min(6, Math.max(0, Math.floor((frame - c4 - 6) / 6)));
  const marks = [
    { at: c3, ok: true },
    { at: c4, ok: false },
    { at: c5, ok: false },
  ];
  const AX = 1000;
  const AW = 600;
  const AY = 650;
  const s = 0.3;
  const t = 0.72;
  const g = (x: number) =>
    Math.max(
      -1,
      Math.min(
        1,
        Math.max(1 - Math.abs(x - s) * 8, 0) -
          Math.max(1 - Math.abs(x - t) * 8, 0),
      ),
    );

  return (
    <SceneShell id="bidual">
      {BOX.map((b, i) => (
        <Sfx key={i} name="pop" at={c0 + 6 + i * 8} volume={0.12} />
      ))}
      <Sfx name="whoosh" at={c1 + 8} volume={0.1} />
      <Sfx name="chime" at={c2 + 20} volume={0.3} />
      <Sfx name="ding" at={c3 + 20} volume={0.24} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Sfx key={i} name="tick" at={c4 + 12 + i * 6} volume={0.1} />
      ))}
      <Sfx name="thud" at={c4 + 60} volume={0.2} />
      <Sfx name="pluck3" at={c5 + 10} volume={0.14} />
      <Sfx name="thud" at={c5 + 60} volume={0.2} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <marker
            id="bd-head"
            viewBox="0 0 10 10"
            refX={8}
            refY={5}
            markerWidth={5}
            markerHeight={5}
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 Z" fill={colors.primary} />
          </marker>
        </defs>
        {BOX.map((b, i) => (
          <g
            key={i}
            opacity={fadeIn(frame, c0 + 6 + i * 8, 8)}
            transform={`translate(0 ${(1 - glide(frame, c0 + 6 + i * 8, fps, 12)) * 30})`}
          >
            <rect
              x={b.x - BW / 2}
              y={BY}
              width={BW}
              height={BH}
              rx={22}
              fill={alpha(colors.paper, 0.06)}
              stroke={alpha(colors.paper, 0.4)}
              strokeWidth={4}
            />
            {i === 2 && (
              <rect
                x={b.x - BW / 2}
                y={BY}
                width={BW * fill}
                height={BH}
                rx={22}
                fill={alpha(colors.green, 0.25)}
              />
            )}
            <text
              x={b.x + BW / 2 - 22}
              y={BY + BH - 24}
              textAnchor="end"
              fill={colors.text}
              fontSize={48}
              fontFamily={fonts.math}
              fontWeight={800}
            >
              {b.label}
            </text>
            {i < 2 && (
              <line
                x1={b.x + BW / 2 + 20}
                y1={BY + BH / 2}
                x2={b.x + 600 - BW / 2 - 24}
                y2={BY + BH / 2}
                stroke={alpha(colors.paper, 0.5)}
                strokeWidth={4}
                markerEnd="url(#bd-head)"
              />
            )}
          </g>
        ))}
        <g opacity={fadeIn(frame, c1 + 4, 8)}>
          <circle
            cx={BOX[0].x - 60}
            cy={BY + 60}
            r={14}
            fill={colors.primary}
          />
          <path
            d={`M ${BOX[0].x - 60} ${BY + 46} Q ${(BOX[0].x + BOX[2].x) / 2} ${BY - 140} ${lerp(BOX[0].x - 60, BOX[2].x - 60, arc)} ${BY + 60 - 20 * arc}`}
            fill="none"
            stroke={colors.primary}
            strokeWidth={5}
            strokeDasharray="14 10"
            markerEnd="url(#bd-head)"
          />
          <circle
            cx={BOX[2].x - 60}
            cy={BY + 60}
            r={14}
            fill={colors.primary}
            opacity={arc}
          />
        </g>
        {ROWS.map((r, i) => (
          <line
            key={i}
            x1={160}
            y1={RY[i] + 48}
            x2={860}
            y2={RY[i] + 48}
            stroke={alpha(colors.paper, 0.15)}
            strokeWidth={2}
            opacity={fadeIn(frame, marks[i].at + 4, 8)}
          />
        ))}
        <g opacity={ill3}>
          <line
            x1={1060}
            y1={560}
            x2={1540}
            y2={560}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={2}
          />
          <line
            x1={1300}
            y1={320}
            x2={1300}
            y2={800}
            stroke={alpha(colors.paper, 0.3)}
            strokeWidth={2}
          />
          <path
            d={ball}
            fill={alpha(colors.primary, 0.2)}
            stroke={colors.primary}
            strokeWidth={6}
          />
        </g>
        <g opacity={ill4}>
          {Array.from({ length: rowsShown }, (_, r) => (
            <g key={r}>
              {Array.from({ length: 12 }, (_, c) => (
                <rect
                  key={c}
                  x={980 + c * 56}
                  y={370 + r * 64}
                  width={46}
                  height={46}
                  rx={8}
                  fill={bits(r, c) ? colors.primary : alpha(colors.paper, 0.08)}
                  stroke={alpha(colors.paper, 0.3)}
                  strokeWidth={2}
                />
              ))}
              <text
                x={980 + 12 * 56 + 10}
                y={370 + r * 64 + 36}
                fill={colors.muted}
                fontSize={34}
                fontFamily={fonts.mono}
              >
                …
              </text>
            </g>
          ))}
        </g>
        <g opacity={ill5}>
          <line
            x1={AX}
            y1={AY}
            x2={AX + AW}
            y2={AY}
            stroke={alpha(colors.paper, 0.5)}
            strokeWidth={3}
          />
          <line
            x1={AX + AW * s}
            y1={AY}
            x2={AX + AW * s}
            y2={AY - 160}
            stroke={colors.highlight}
            strokeWidth={8}
          />
          <line
            x1={AX + AW * t}
            y1={AY}
            x2={AX + AW * t}
            y2={AY + 160}
            stroke={colors.orange}
            strokeWidth={8}
          />
          <path
            d={Array.from(
              { length: 161 },
              (_, k) =>
                `${k ? "L" : "M"} ${AX + (AW * k) / 160} ${AY - 130 * g(k / 160)}`,
            ).join(" ")}
            fill="none"
            stroke={colors.primary}
            strokeWidth={5}
            opacity={fadeIn(frame, c5 + 30, 8)}
          />
          <text
            x={AX + AW * s}
            y={AY + 50}
            textAnchor="middle"
            fill={colors.highlight}
            fontSize={40}
            fontFamily={fonts.math}
          >
            δₛ
          </text>
          <text
            x={AX + AW * t}
            y={AY - 30}
            textAnchor="middle"
            fill={colors.orange}
            fontSize={40}
            fontFamily={fonts.math}
          >
            −δₜ
          </text>
        </g>
      </svg>

      <div
        style={{
          position: "absolute",
          top: BY + BH + 20,
          left: BOX[1].x - 300,
          width: 600,
          textAlign: "center",
          fontFamily: fonts.math,
          fontSize: 42,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c1 + 30),
          whiteSpace: "nowrap",
        }}
      >
        J(x)(f) = f(x)
      </div>
      <div
        style={{
          position: "absolute",
          top: BY + BH + 20,
          left: BOX[2].x - BW / 2,
          width: BW,
          textAlign: "center",
          fontSize: 40,
          fontWeight: 800,
          color: colors.green,
          opacity: fadeIn(frame, c2 + 20),
          translate: riseIn(frame, c2 + 20),
          whiteSpace: "nowrap",
        }}
      >
        J(X) = X** · {tx.reflexive}
      </div>
      {ROWS.map((r, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: RY[i] - 10,
            left: 160,
            width: 700,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: fonts.math,
            fontSize: 50,
            fontWeight: 800,
            color: colors.text,
            opacity: fadeIn(frame, marks[i].at + 4),
            translate: riseIn(frame, marks[i].at + 4),
          }}
        >
          <span style={{ whiteSpace: "nowrap" }}>{r}</span>
          <span
            style={{
              fontFamily: fonts.body,
              color: marks[i].ok ? colors.green : colors.red,
              opacity: fadeIn(frame, marks[i].at + (marks[i].ok ? 20 : 60)),
            }}
          >
            {marks[i].ok ? `✓ ${tx.yes}` : `✗ ${tx.no}`}
          </span>
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          top: 780,
          left: 980,
          fontFamily: fonts.math,
          fontSize: 38,
          fontWeight: 800,
          color: colors.text,
          opacity: ill4 * fadeIn(frame, c4 + 50),
          whiteSpace: "nowrap",
        }}
      >
        ‖a − b‖∞ = 1
      </div>
      <div
        style={{
          position: "absolute",
          top: 420,
          left: 1320,
          fontFamily: fonts.math,
          fontSize: 38,
          fontWeight: 800,
          color: colors.primary,
          opacity: ill5 * fadeIn(frame, c5 + 40),
          whiteSpace: "nowrap",
        }}
      >
        (δₛ − δₜ)(f) = 2
      </div>
    </SceneShell>
  );
};
