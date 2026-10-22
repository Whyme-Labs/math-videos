import type React from "react";
import { AbsoluteFill, Img } from "remotion";
import { BRAND } from "../shared/components/Brand";
import { Domino } from "../shared/components/Domino";
import { NextArrow, NumberNode } from "../shared/components/graph";
import { Pie } from "../shared/components/pieces";
import {
  Gap,
  RationalDots,
  toX,
  type Window,
} from "../shared/components/rationals";
import { Tower } from "../shared/components/Tower";
import { LocaleProvider, type Locale } from "../shared/locale";
import { alpha, colors, fonts } from "../shared/theme";
import { SetBox } from "../s1e04/components/sets";
import { guestColor } from "../s1e11/components/hotel";
import { Runner } from "../s1e13/components/race";
import { splitMath } from "./math-chars";
import {
  badge,
  COVERS,
  type CoverShape,
  LAYOUT,
  SERIES_NAME,
  THUMBS,
} from "./thumbs";

// YouTube / bilibili thumbnail for one episode. One big hook on the left,
// one strong picture on the right, the episode badge top-left and the brand
// bottom-left (YouTube covers the bottom-right corner with the duration).
//
// layer "full" draws everything; "art" draws only the background and the
// picture, for editing the text elsewhere (see scripts/thumbnail-svg.py).

export type ThumbProps = {
  readonly ep: number;
  readonly locale: Locale;
  readonly layer: "full" | "art";
  // "wide" is 1920×1080 (YouTube, bilibili); "4x3" and "3x4" are the
  // 抖音 / TikTok covers, see CoverThumbnail below
  readonly shape?: "wide" | CoverShape;
};

const ART = { x: 1400, y: 540 };

const Art: React.FC<{ readonly ep: number }> = ({ ep }) => {
  if (ep === 1)
    return (
      <div
        style={{
          position: "absolute",
          left: ART.x - 286,
          top: ART.y - 350,
          scale: 1.1,
        }}
      >
        <Tower
          appear={[1, 1, 1, 1, 1]}
          built={[1, 0, 0, 0, 0]}
          question={[0, 1, 1, 1, 1]}
        />
      </div>
    );
  if (ep === 2) {
    const pts = [0, 1, 2, 3].map((k) => ({
      x: 1080 + k * 230,
      y: 800 - k * 170,
    }));
    return (
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {pts.slice(0, 3).map((p, k) => (
          <NextArrow
            key={k}
            a={p}
            b={pts[k + 1]}
            ctrl={{
              x: (p.x + pts[k + 1].x) / 2 - 40,
              y: (p.y + pts[k + 1].y) / 2 - 70,
            }}
            r={78}
            width={9}
          />
        ))}
        {pts.map((p, k) => (
          <NumberNode
            key={k}
            x={p.x}
            y={p.y}
            label={String(k)}
            r={78}
            fontSize={84}
            ring={k === 0 ? colors.highlight : undefined}
          />
        ))}
        <text
          x={pts[3].x + 10}
          y={pts[3].y - 120}
          fill={colors.highlight}
          fontSize={96}
          textAnchor="middle"
          fontFamily={fonts.title}
        >
          …
        </text>
      </svg>
    );
  }
  if (ep === 3) {
    const floor = 820;
    const angles = [64, 64, 64, 40, 0];
    return (
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g
          transform={`translate(1380 ${floor}) scale(2.1) translate(-1380 ${-floor})`}
        >
          <line
            x1={1150}
            y1={floor}
            x2={1620}
            y2={floor}
            stroke={colors.muted}
            strokeWidth={3}
          />
          {angles.map((a, k) => (
            <Domino
              key={k}
              x={1200 + k * 82}
              floor={floor}
              label=""
              angle={a}
            />
          ))}
        </g>
      </svg>
    );
  }
  if (ep === 4)
    return (
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g
          transform={`translate(${ART.x} ${ART.y}) scale(3.8) translate(${-ART.x} ${-ART.y})`}
        >
          <SetBox n={2} kind="vn" cx={ART.x} cy={ART.y} />
        </g>
        <text
          x={ART.x}
          y={ART.y + 300}
          fill={colors.text}
          fontSize={76}
          textAnchor="middle"
          fontFamily={fonts.math}
        >
          2 = {"{0, 1}"}
        </text>
      </svg>
    );
  if (ep === 5)
    return (
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <Pie
          cx={1170}
          cy={ART.y}
          r={200}
          parts={2}
          shaded={1}
          fill={1}
          color={colors.primary}
        />
        <Pie
          cx={1640}
          cy={ART.y}
          r={200}
          parts={4}
          shaded={2}
          fill={1}
          color={colors.orange}
        />
        <text
          x={1405}
          y={ART.y + 50}
          fill={colors.highlight}
          fontSize={200}
          textAnchor="middle"
          fontFamily={fonts.math}
        >
          ~
        </text>
      </svg>
    );
  if (ep === 6) {
    const Y = 720;
    const U = 190;
    const nx = (n: number) => 1400 + n * U;
    return (
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <line
          x1={nx(-2.4)}
          y1={Y}
          x2={nx(2.4)}
          y2={Y}
          stroke={colors.muted}
          strokeWidth={5}
        />
        {[-2, -1, 0, 1, 2].map((n) => (
          <g key={n}>
            <line
              x1={nx(n)}
              y1={Y - 16}
              x2={nx(n)}
              y2={Y + 16}
              stroke={colors.muted}
              strokeWidth={5}
            />
            <text
              x={nx(n)}
              y={Y + 80}
              fill={colors.text}
              fontSize={56}
              textAnchor="middle"
              fontFamily={fonts.math}
            >
              {n < 0 ? `−${-n}` : n}
            </text>
          </g>
        ))}
        {/* −1 swings over the top to +1 */}
        <path
          d={`M ${nx(-1)} ${Y - 26} A ${U} ${U} 0 0 1 ${nx(1)} ${Y - 26}`}
          fill="none"
          stroke={colors.highlight}
          strokeWidth={9}
          strokeDasharray="20 14"
        />
        <polygon
          points={`${nx(1) + 18},${Y - 60} ${nx(1) - 22},${Y - 66} ${nx(1)},${Y - 22}`}
          fill={colors.highlight}
        />
        <circle cx={nx(-1)} cy={Y} r={26} fill={colors.highlight} />
        <circle cx={nx(1)} cy={Y} r={26} fill={colors.primary} />
        <text
          x={nx(0)}
          y={Y - U - 60}
          fill={colors.orange}
          fontSize={76}
          textAnchor="middle"
          fontFamily={fonts.math}
        >
          × (−1)
        </text>
        <text
          x={1400}
          y={300}
          fill={colors.text}
          fontSize={84}
          textAnchor="middle"
          fontFamily={fonts.math}
        >
          (−1)·(−1) = 1
        </text>
      </svg>
    );
  }
  if (ep === 7) {
    const w: Window = { lo: 1.36, hi: 1.47, x0: 1000, x1: 1800, y: 600 };
    const gx = toX(w, Math.SQRT2);
    return (
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <RationalDots w={w} target={90} r={7} />
        <circle
          cx={gx}
          cy={w.y}
          r={150}
          fill="none"
          stroke={alpha(colors.text, 0.8)}
          strokeWidth={8}
        />
        <line
          x1={gx + 106}
          y1={w.y + 106}
          x2={gx + 220}
          y2={w.y + 220}
          stroke={alpha(colors.text, 0.8)}
          strokeWidth={22}
          strokeLinecap="round"
        />
        <Gap x={gx} y={w.y} s={1} r={34} />
        <text
          x={gx}
          y={w.y - 190}
          fill={colors.highlight}
          fontSize={120}
          textAnchor="middle"
          fontFamily={fonts.math}
        >
          √2
        </text>
      </svg>
    );
  }
  if (ep === 9) {
    // the staircase 0.9, 0.99, … pressing up against the line at 1
    const base = 880;
    const top = 330;
    const gaps = [0.32, 0.14, 0.06, 0.025, 0.01, 0.004];
    const w = 118;
    return (
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <line
          x1={1020}
          y1={top}
          x2={1820}
          y2={top}
          stroke={colors.highlight}
          strokeWidth={8}
          strokeDasharray="22 16"
        />
        <text
          x={1850}
          y={top + 24}
          fill={colors.highlight}
          fontSize={80}
          fontFamily={fonts.math}
        >
          1
        </text>
        {gaps.map((g, k) => {
          const y = top + g * (base - top);
          return (
            <rect
              key={g}
              x={1060 + k * (w + 10)}
              y={y}
              width={w}
              height={base - y}
              rx={14}
              fill={k % 2 === 0 ? colors.primary : colors.orange}
            />
          );
        })}
        <text
          x={1420}
          y={top - 60}
          fill={colors.text}
          fontSize={96}
          textAnchor="middle"
          fontFamily={fonts.math}
        >
          0.999…
        </text>
      </svg>
    );
  }
  if (ep === 10) {
    // the arrow to 1 turns a quarter turn and lands on i
    const O = { x: 1300, y: 760 };
    const R = 420;
    return (
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <line
          x1={O.x - 260}
          y1={O.y}
          x2={O.x + R + 140}
          y2={O.y}
          stroke={colors.muted}
          strokeWidth={5}
        />
        <line
          x1={O.x}
          y1={O.y + 200}
          x2={O.x}
          y2={O.y - R - 120}
          stroke={colors.muted}
          strokeWidth={5}
        />
        <line
          x1={O.x}
          y1={O.y}
          x2={O.x + R}
          y2={O.y}
          stroke={alpha(colors.primary, 0.45)}
          strokeWidth={16}
          strokeLinecap="round"
        />
        <path
          d={`M ${O.x + R * 0.62} ${O.y} A ${R * 0.62} ${R * 0.62} 0 0 0 ${O.x} ${O.y - R * 0.62}`}
          fill="none"
          stroke={colors.orange}
          strokeWidth={10}
          strokeDasharray="22 16"
        />
        <line
          x1={O.x}
          y1={O.y}
          x2={O.x}
          y2={O.y - R}
          stroke={colors.primary}
          strokeWidth={18}
          strokeLinecap="round"
        />
        <polygon
          points={`${O.x - 34},${O.y - R + 40} ${O.x + 34},${O.y - R + 40} ${O.x},${O.y - R - 30}`}
          fill={colors.primary}
        />
        <text
          x={O.x + R}
          y={O.y + 90}
          fill={colors.text}
          fontSize={84}
          textAnchor="middle"
          fontFamily={fonts.math}
        >
          1
        </text>
        <text
          x={O.x + 50}
          y={O.y - R - 10}
          fill={colors.highlight}
          fontSize={110}
          fontFamily={fonts.math}
        >
          i
        </text>
        <text
          x={O.x + R * 0.55}
          y={O.y - R * 0.55}
          fill={colors.orange}
          fontSize={84}
          fontFamily={fonts.math}
        >
          × i
        </text>
      </svg>
    );
  }
  if (ep === 11) {
    // a corridor of lit doors running off to the right; everyone steps one
    // door along and the traveler takes room 0
    const doors = Array.from({ length: 9 }).map((_, k) => {
      const s = 0.84 ** k;
      return { x: 1180 + 760 * (1 - s), s, k };
    });
    return (
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {doors.map((d) => (
          <g
            key={d.k}
            transform={`translate(${d.x} ${560 - 120 * (1 - d.s)}) scale(${d.s})`}
          >
            <rect
              x={0}
              y={0}
              width={150}
              height={270}
              rx={10}
              fill={d.k === 0 ? colors.ink : colors.wood}
              stroke={colors.ink}
              strokeWidth={5}
            />
            <rect
              x={20}
              y={-40}
              width={110}
              height={24}
              rx={8}
              fill={colors.primary}
            />
            <rect
              x={31}
              y={-100}
              width={88}
              height={50}
              rx={10}
              fill={colors.paper}
            />
            <text
              x={75}
              y={-62}
              fill={colors.ink}
              fontSize={36}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={700}
            >
              {d.k}
            </text>
            {d.k > 0 ? (
              <g transform="translate(75 250)">
                <rect
                  x={-26}
                  y={-92}
                  width={52}
                  height={70}
                  rx={24}
                  fill={
                    [
                      colors.primary,
                      colors.orange,
                      colors.green,
                      colors.paper,
                      colors.red,
                    ][d.k % 5]
                  }
                  stroke={colors.ink}
                  strokeWidth={4}
                />
                <circle
                  cx={0}
                  cy={-118}
                  r={30}
                  fill={
                    [
                      colors.primary,
                      colors.orange,
                      colors.green,
                      colors.paper,
                      colors.red,
                    ][d.k % 5]
                  }
                  stroke={colors.ink}
                  strokeWidth={4}
                />
              </g>
            ) : null}
            {d.k < 6 ? (
              <path
                d="M 95 -130 Q 190 -200 285 -130"
                fill="none"
                stroke={colors.highlight}
                strokeWidth={8}
                strokeDasharray="16 12"
              />
            ) : null}
          </g>
        ))}
        <g transform="translate(1255 810) scale(1.5)">
          <rect
            x={-26}
            y={-92}
            width={52}
            height={70}
            rx={24}
            fill={colors.highlight}
            stroke={colors.ink}
            strokeWidth={4}
          />
          <circle
            cx={0}
            cy={-118}
            r={30}
            fill={colors.highlight}
            stroke={colors.ink}
            strokeWidth={4}
          />
          <rect
            x={30}
            y={-54}
            width={44}
            height={36}
            rx={6}
            fill={colors.wood}
            stroke={colors.ink}
            strokeWidth={4}
          />
        </g>
      </svg>
    );
  }
  if (ep === 12) {
    // a grid of digits with its diagonal lit, and the flipped name below
    const D = [
      [9, 1, 2, 1, 0, 4],
      [0, 5, 0, 7, 9, 7],
      [0, 4, 3, 2, 1, 2],
      [1, 5, 3, 7, 7, 1],
      [5, 6, 7, 8, 5, 3],
      [1, 0, 5, 2, 0, 0],
    ];
    const C = 108;
    const X = 1040;
    const Y = 150;
    return (
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <rect
          x={X - 30}
          y={Y - 30}
          width={6 * C + 60}
          height={6 * C + 60}
          rx={24}
          fill={colors.paper}
        />
        {D.map((row, r) =>
          row.map((d, c) => (
            <g key={`${r}-${c}`}>
              {r === c ? (
                <rect
                  x={X + c * C + 6}
                  y={Y + r * C + 6}
                  width={C - 12}
                  height={C - 12}
                  rx={14}
                  fill={colors.primary}
                />
              ) : null}
              <text
                x={X + (c + 0.5) * C}
                y={Y + (r + 0.68) * C}
                fill={colors.ink}
                fontSize={58}
                textAnchor="middle"
                fontFamily={fonts.mono}
                fontWeight={r === c ? 800 : 400}
              >
                {d}
              </text>
            </g>
          )),
        )}
        <rect
          x={X - 30}
          y={Y + 6 * C + 60}
          width={6 * C + 60}
          height={130}
          rx={24}
          fill={colors.highlight}
          stroke={colors.ink}
          strokeWidth={6}
        />
        <text
          x={X + 3 * C}
          y={Y + 6 * C + 148}
          fill={colors.ink}
          fontSize={72}
          textAnchor="middle"
          fontFamily={fonts.mono}
          fontWeight={800}
        >
          0.545545…
        </text>
      </svg>
    );
  }
  if (ep === 13) {
    // runners 0, 1, 2, … bunching to a point; past all of them, she stands
    // alone under the ω flag
    return (
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <rect
          x={1020}
          y={700}
          width={1100}
          height={200}
          fill={alpha(colors.red, 0.45)}
        />
        {Array.from({ length: 26 }).map((_, n) => (
          <Runner
            key={n}
            x={1120 + 540 * (1 - 0.8 ** n)}
            y={800}
            color={guestColor(n)}
            bib={n < 4 ? String(n) : undefined}
            size={1.3 * 0.9 ** n}
          />
        ))}
        <line
          x1={1790}
          y1={420}
          x2={1790}
          y2={800}
          stroke={colors.paper}
          strokeWidth={8}
        />
        <path d="M 1790 420 L 1910 450 L 1790 490 Z" fill={colors.highlight} />
        <Runner x={1790} y={800} color={colors.highlight} bib="ω" size={1.6} />
        <text
          x={1440}
          y={300}
          fill={colors.primary}
          fontSize={96}
          textAnchor="middle"
          fontFamily={fonts.math}
          fontWeight={700}
        >
          0, 1, 2, … ω
        </text>
      </svg>
    );
  }
  // ep 8: a knife over the hole, and a swarm closing in on it
  const Y = 640;
  return (
    <svg width={1920} height={1080} style={{ position: "absolute" }}>
      <line
        x1={1100}
        y1={Y}
        x2={1400}
        y2={Y}
        stroke={colors.primary}
        strokeWidth={12}
        strokeLinecap="round"
      />
      <line
        x1={1400}
        y1={Y}
        x2={1800}
        y2={Y}
        stroke={colors.orange}
        strokeWidth={12}
        strokeLinecap="round"
      />
      <line
        x1={1400}
        y1={Y - 330}
        x2={1400}
        y2={Y + 90}
        stroke={colors.highlight}
        strokeWidth={14}
        strokeLinecap="round"
      />
      <polygon
        points={`1364,${Y - 450} 1436,${Y - 450} 1400,${Y - 330}`}
        fill={colors.highlight}
      />
      {Array.from({ length: 16 }).map((_, k) => {
        const side = k % 2 === 0 ? -1 : 1;
        const d = 300 / (1 + Math.floor(k / 2) * 0.7);
        const lift = ((k * 53) % 80) - 40;
        return (
          <circle
            key={k}
            cx={1400 + side * d}
            cy={Y + 150 + lift * 0.6}
            r={16}
            fill={k % 2 === 0 ? colors.primary : colors.orange}
          />
        );
      })}
      <circle
        cx={1400}
        cy={Y}
        r={30}
        fill={colors.bg}
        stroke={colors.highlight}
        strokeWidth={8}
      />
    </svg>
  );
};

export const Thumbnail: React.FC<ThumbProps> = ({
  ep,
  locale,
  layer,
  shape = "wide",
}) => {
  if (shape !== "wide")
    return (
      <CoverThumbnail ep={ep} locale={locale} layer={layer} shape={shape} />
    );
  const t = THUMBS.find((x) => x.ep === ep)!;
  const tx = t[locale];
  const L = LAYOUT;
  const zh = locale === "zh";
  return (
    <LocaleProvider locale={locale}>
      <AbsoluteFill
        style={{
          backgroundColor: colors.bg,
          backgroundImage: [
            `radial-gradient(circle at ${ART.x}px ${ART.y}px, ${alpha(colors.primary, 0.22)} 0%, transparent 34%)`,
            `radial-gradient(ellipse 60% 80% at 75% 60%, ${colors.bgGlow} 0%, ${colors.bgMid} 50%, ${colors.bg} 100%)`,
          ].join(", "),
          color: colors.text,
          fontFamily: fonts.body,
        }}
      >
        <Art ep={ep} />
        {layer === "full" ? (
          <svg
            width={L.width}
            height={L.height}
            style={{ position: "absolute" }}
          >
            {/* episode badge and series name */}
            <rect
              x={L.textX}
              y={L.badgeY}
              width={zh ? 230 : 190}
              height={L.badgeH}
              rx={20}
              fill={colors.primary}
            />
            <text
              x={L.textX + (zh ? 115 : 95)}
              y={L.badgeY + L.badgeH * 0.72}
              fill={colors.ink}
              fontSize={60}
              fontWeight={800}
              textAnchor="middle"
              fontFamily={zh ? fonts.body : fonts.title}
            >
              {badge(ep, locale)}
            </text>
            <text
              x={L.textX + (zh ? 260 : 220)}
              y={L.badgeY + L.badgeH * 0.68}
              fill={colors.muted}
              fontSize={46}
              fontWeight={700}
              letterSpacing={zh ? 2 : 6}
              fontFamily={fonts.body}
            >
              {SERIES_NAME[locale]}
            </text>
            {/* the hook */}
            {tx.lines.map((line, i) => (
              <text
                key={i}
                x={L.textX}
                y={L.firstBaseline + i * tx.size * L.lineGap}
                fill={i === tx.accent ? colors.primary : colors.text}
                fontSize={tx.size}
                fontWeight={zh ? 900 : 800}
                fontFamily={zh ? fonts.body : fonts.title}
                stroke={colors.bg}
                strokeWidth={L.stroke}
                strokeLinejoin="round"
                paintOrder="stroke"
              >
                {splitMath(line).map((part, k) =>
                  part.math ? (
                    <tspan key={k} fontFamily={fonts.math} fontWeight={700}>
                      {part.text}
                    </tspan>
                  ) : (
                    <tspan key={k}>{part.text}</tspan>
                  ),
                )}
              </text>
            ))}
          </svg>
        ) : null}
        {layer === "full" ? (
          <div
            style={{
              position: "absolute",
              left: L.textX,
              top: L.brandY,
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <Img
              src={BRAND.mark}
              style={{ height: L.brandH, width: L.brandH * (2000 / 1801) }}
            />
            <Img
              src={BRAND.wordmarkWhite}
              style={{
                height: L.brandH * 0.42,
                width: L.brandH * 0.42 * (2000 / 252),
              }}
            />
          </div>
        ) : null}
      </AbsoluteFill>
    </LocaleProvider>
  );
};

// The hook's lines, with math characters set in the math font.
const HookLine: React.FC<{ readonly line: string }> = ({ line }) => (
  <>
    {splitMath(line).map((part, k) =>
      part.math ? (
        <tspan key={k} fontFamily={fonts.math} fontWeight={700}>
          {part.text}
        </tspan>
      ) : (
        <tspan key={k}>{part.text}</tspan>
      ),
    )}
  </>
);

// 抖音 / TikTok cover: badge and series name on top, the hook under them,
// the wide art scaled into the lower part, the brand at the bottom, all
// centred (layouts in COVERS).
const CoverThumbnail: React.FC<{
  readonly ep: number;
  readonly locale: Locale;
  readonly layer: "full" | "art";
  readonly shape: CoverShape;
}> = ({ ep, locale, layer, shape }) => {
  const t = THUMBS.find((x) => x.ep === ep)!;
  const tx = t[locale];
  const Q = COVERS[shape];
  const zh = locale === "zh";
  const size = tx.size * Q.hookScale;
  const bw = zh ? 200 : 160;
  return (
    <LocaleProvider locale={locale}>
      <AbsoluteFill
        style={{
          backgroundColor: colors.bg,
          backgroundImage: [
            `radial-gradient(circle at ${Q.art.x}px ${Q.art.y}px, ${alpha(colors.primary, 0.22)} 0%, transparent 34%)`,
            `radial-gradient(ellipse 80% 70% at 50% 62%, ${colors.bgGlow} 0%, ${colors.bgMid} 50%, ${colors.bg} 100%)`,
          ].join(", "),
          color: colors.text,
          fontFamily: fonts.body,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 1920,
            height: 1080,
            transformOrigin: "0 0",
            transform: `translate(${Q.art.x - ART.x * Q.art.scale}px, ${Q.art.y - ART.y * Q.art.scale}px) scale(${Q.art.scale})`,
          }}
        >
          <Art ep={ep} />
        </div>
        {layer === "full" ? (
          <svg
            width={Q.width}
            height={Q.height}
            style={{ position: "absolute" }}
          >
            <rect
              x={Q.cx - bw / 2}
              y={Q.badgeY}
              width={bw}
              height={Q.badgeH}
              rx={18}
              fill={colors.primary}
            />
            <text
              x={Q.cx}
              y={Q.badgeY + Q.badgeH * 0.72}
              fill={colors.ink}
              fontSize={Q.badgeFont}
              fontWeight={800}
              textAnchor="middle"
              fontFamily={zh ? fonts.body : fonts.title}
            >
              {badge(ep, locale)}
            </text>
            <text
              x={Q.cx}
              y={Q.seriesY}
              fill={colors.muted}
              fontSize={Q.seriesFont}
              fontWeight={700}
              letterSpacing={zh ? 2 : 5}
              textAnchor="middle"
              fontFamily={fonts.body}
            >
              {SERIES_NAME[locale]}
            </text>
            {tx.lines.map((line, i) => (
              <text
                key={i}
                x={Q.cx}
                y={Q.firstBaseline + i * size * Q.lineGap}
                fill={i === tx.accent ? colors.primary : colors.text}
                fontSize={size}
                fontWeight={zh ? 900 : 800}
                textAnchor="middle"
                fontFamily={zh ? fonts.body : fonts.title}
                stroke={colors.bg}
                strokeWidth={Q.stroke}
                strokeLinejoin="round"
                paintOrder="stroke"
              >
                <HookLine line={line} />
              </text>
            ))}
          </svg>
        ) : null}
        {layer === "full" ? (
          <div
            style={{
              position: "absolute",
              top: Q.brandY,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 14,
            }}
          >
            <Img
              src={BRAND.mark}
              style={{ height: Q.brandH, width: Q.brandH * (2000 / 1801) }}
            />
            <Img
              src={BRAND.wordmarkWhite}
              style={{
                height: Q.brandH * 0.42,
                width: Q.brandH * 0.42 * (2000 / 252),
              }}
            />
          </div>
        ) : null}
      </AbsoluteFill>
    </LocaleProvider>
  );
};
