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
import { splitMath } from "./math-chars";
import { badge, LAYOUT, SERIES_NAME, THUMBS } from "./thumbs";

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

export const Thumbnail: React.FC<ThumbProps> = ({ ep, locale, layer }) => {
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
