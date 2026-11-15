import type React from "react";
import { useCurrentFrame } from "remotion";
import { fadeIn, fadeOut, progress } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Chip, path } from "../components/draw";
import { Dial } from "../components/dial";
import { useStrings } from "../i18n";

// What shifts want. A bump slides by a, then by b: the same as one slide
// by a + b (c0). An exponential slid to the right lands on a rescaled copy
// of itself (c1). f(x + y) = f(x) f(y) (c2). The integers on a line, each
// sent to a point on the unit circle, steps becoming turns (c3). On ℤ/8:
// the 8th roots of unity and a pointer walking k steps at a time, with the
// row of dials χₖ(0), …, χₖ(7) (c4).

const X = (x: number) => 360 + x * 180;

export const Shifts: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const cues = useCues("shifts");
  const [c0, c1, c2, c3, c4] = cues;
  const a = 1.5 * progress(frame, c0 + 20, 30);
  const b = 1 * progress(frame, c0 + 60, 30);
  const partA = fadeIn(frame, c0 + 2, 10) * fadeOut(frame, c1, 10);
  const slide = 2 * progress(frame, c1 + 20, 40);
  const partB = fadeIn(frame, c1 + 4, 10) * fadeOut(frame, c2, 10);
  const partC = fadeIn(frame, c3 + 4, 10) * fadeOut(frame, c4, 10);
  const partD = fadeIn(frame, c4 + 4, 10);
  const th = (2 * Math.PI) / 8;
  const k = frame < c4 + 90 ? 1 : 3;
  const step = Math.max(0, Math.floor((frame - c4 - 20) / 9));
  const j = step % 8;

  return (
    <SceneShell id="shifts">
      <Sfx name="whoosh" at={c0 + 20} volume={0.1} />
      <Sfx name="whoosh" at={c0 + 60} volume={0.1} />
      <Sfx name="whoosh" at={c1 + 20} volume={0.1} />
      <Sfx name="ding" at={c1 + 60} volume={0.14} />
      <Sfx name="pop" at={c2 + 8} volume={0.12} />
      <Sfx name="pluck3" at={c3 + 20} volume={0.12} />
      {Array.from({ length: 16 }, (_, i) => (
        <Sfx key={i} name="tick" at={c4 + 20 + i * 9} volume={0.05} />
      ))}

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g opacity={partA}>
          <line
            x1={X(-1)}
            y1={560}
            x2={X(7)}
            y2={560}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={3}
          />
          <path
            d={path(
              (x) => Math.exp(-((x - 1) ** 2) * 3),
              -0.5,
              6.5,
              X,
              (v) => 560 - 200 * v,
            )}
            fill="none"
            stroke={alpha(colors.primary, 0.3)}
            strokeWidth={4}
            strokeDasharray="10 8"
          />
          <path
            d={path(
              (x) => Math.exp(-((x - 1 - a - b) ** 2) * 3),
              -0.5,
              6.5,
              X,
              (v) => 560 - 200 * v,
            )}
            fill="none"
            stroke={colors.primary}
            strokeWidth={6}
          />
          <path
            d={`M ${X(1)} 620 L ${X(1 + a)} 620`}
            stroke={colors.highlight}
            strokeWidth={6}
          />
          <path
            d={`M ${X(2.5)} 660 L ${X(2.5 + b)} 660`}
            stroke={colors.green}
            strokeWidth={6}
            opacity={b > 0 ? 1 : 0}
          />
          <path
            d={`M ${X(1)} 710 L ${X(3.5)} 710`}
            stroke={colors.orange}
            strokeWidth={6}
            opacity={fadeIn(frame, c0 + 100, 10)}
          />
          <text
            x={X(1 + a / 2)}
            y={608}
            textAnchor="middle"
            fill={colors.highlight}
            fontSize={36}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            a
          </text>
          <text
            x={X(2.5 + b / 2)}
            y={648}
            textAnchor="middle"
            fill={colors.green}
            fontSize={36}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={b > 0 ? 1 : 0}
          >
            b
          </text>
          <text
            x={X(4.1)}
            y={722}
            fill={colors.orange}
            fontSize={36}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c0 + 100, 10)}
          >
            a + b
          </text>
        </g>
        <g opacity={partB}>
          <line
            x1={X(-1)}
            y1={680}
            x2={X(7)}
            y2={680}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={3}
          />
          <path
            d={path(
              (x) => Math.exp(0.45 * x),
              -1,
              7,
              X,
              (v) => 680 - 22 * v,
            )}
            fill="none"
            stroke={alpha(colors.green, 0.35)}
            strokeWidth={5}
            strokeDasharray="10 8"
          />
          <path
            d={path(
              (x) => Math.exp(0.45 * (x - slide)),
              -1,
              7,
              X,
              (v) => 680 - 22 * v,
            )}
            fill="none"
            stroke={colors.green}
            strokeWidth={6}
          />
          <text
            x={X(5.6)}
            y={300}
            fill={colors.green}
            fontSize={48}
            fontFamily={fonts.math}
            fontWeight={800}
            opacity={fadeIn(frame, c1 + 60, 10)}
          >
            × e^(−0.9)
          </text>
        </g>
        <text
          x={960}
          y={280}
          textAnchor="middle"
          fill={colors.primary}
          fontSize={80}
          fontFamily={fonts.math}
          fontWeight={800}
          opacity={fadeIn(frame, c2 + 6, 10) * fadeOut(frame, c3, 10)}
        >
          f(x + y) = f(x) f(y)
        </text>
        <g opacity={partC}>
          <line
            x1={200}
            y1={640}
            x2={1000}
            y2={640}
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={3}
          />
          <circle
            cx={1420}
            cy={430}
            r={220}
            fill="none"
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={3}
          />
          {Array.from({ length: 7 }, (_, n) => {
            const x = 260 + n * 120;
            const ang = 0.7 * (n - 3);
            const px = 1420 + 220 * Math.cos(ang);
            const py = 430 - 220 * Math.sin(ang);
            const on = fadeIn(frame, c3 + 20 + n * 8, 8);
            return (
              <g key={n} opacity={on}>
                <circle cx={x} cy={640} r={12} fill={colors.primary} />
                <text
                  x={x}
                  y={700}
                  textAnchor="middle"
                  fill={colors.muted}
                  fontSize={32}
                  fontFamily={fonts.mono}
                >
                  {String(n - 3).replace("-", "−")}
                </text>
                <path
                  d={`M ${x} 625 Q ${(x + px) / 2} ${200} ${px} ${py}`}
                  fill="none"
                  stroke={alpha(colors.highlight, 0.4)}
                  strokeWidth={2}
                />
                <circle cx={px} cy={py} r={12} fill={colors.highlight} />
              </g>
            );
          })}
          <text
            x={1420}
            y={445}
            textAnchor="middle"
            fill={colors.muted}
            fontSize={40}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            |z| = 1
          </text>
        </g>
        <g opacity={partD}>
          <circle
            cx={560}
            cy={420}
            r={220}
            fill="none"
            stroke={alpha(colors.paper, 0.4)}
            strokeWidth={3}
          />
          {Array.from({ length: 8 }, (_, m) => (
            <circle
              key={m}
              cx={560 + 220 * Math.cos(m * th)}
              cy={420 - 220 * Math.sin(m * th)}
              r={10}
              fill={alpha(colors.paper, 0.6)}
            />
          ))}
          <line
            x1={560}
            y1={420}
            x2={560 + 220 * Math.cos(j * k * th)}
            y2={420 - 220 * Math.sin(j * k * th)}
            stroke={colors.primary}
            strokeWidth={8}
            strokeLinecap="round"
          />
          <circle
            cx={560 + 220 * Math.cos(j * k * th)}
            cy={420 - 220 * Math.sin(j * k * th)}
            r={18}
            fill={colors.primary}
          />
          <text
            x={560}
            y={720}
            textAnchor="middle"
            fill={colors.primary}
            fontSize={48}
            fontFamily={fonts.math}
            fontWeight={800}
          >
            k = {k}
          </text>
          {Array.from({ length: 8 }, (_, m) => (
            <Dial
              key={m}
              cx={1000 + m * 105}
              cy={420}
              r={42}
              angle={m * k * th}
              lit={m === j}
            />
          ))}
          {Array.from({ length: 8 }, (_, m) => (
            <text
              key={m}
              x={1000 + m * 105}
              y={510}
              textAnchor="middle"
              fill={colors.muted}
              fontSize={30}
              fontFamily={fonts.mono}
            >
              {m}
            </text>
          ))}
        </g>
      </svg>
      <div style={{ opacity: fadeOut(frame, c2, 10) }}>
        <Chip
          frame={frame}
          at={c1 + 60}
          x={300}
          y={200}
          size={40}
          color={colors.green}
        >
          {tx.rescale}
        </Chip>
      </div>
      <div style={{ opacity: fadeOut(frame, c4, 10) }}>
        <Chip
          frame={frame}
          at={c3 + 50}
          x={1260}
          y={710}
          size={40}
          color={colors.highlight}
        >
          {tx.homom}
        </Chip>
      </div>
    </SceneShell>
  );
};
