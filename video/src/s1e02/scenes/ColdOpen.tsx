import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import {
  glide,
  hop,
  lerp,
  ramp,
  springIn,
} from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import {
  NextArrow,
  NumberNode,
  Robot,
  Token,
} from "../../shared/components/graph";
import { useStrings } from "../i18n";

const ROBOT = { x: 250, y: 520 };
const LINE_Y = 700;
const node = (i: number) => ({ x: 560 + i * 200, y: LINE_Y });
const COUNT = 6; // nodes 0..5 appear while "every number has a next" plays

// Things the machine doesn't know: digits, apples, a number line.
const Unknown: React.FC<{ readonly kind: number }> = ({ kind }) => {
  if (kind === 0)
    return (
      <text
        x={0}
        y={28}
        fontSize={84}
        fontFamily={fonts.title}
        fill={colors.text}
        textAnchor="middle"
      >
        123
      </text>
    );
  if (kind === 1)
    return (
      <g>
        <circle cx={-18} cy={6} r={42} fill={colors.red} />
        <circle cx={18} cy={6} r={42} fill={colors.red} />
        <rect x={-3} y={-58} width={6} height={24} fill={colors.wood} />
        <ellipse cx={18} cy={-46} rx={18} ry={9} fill={colors.green} />
      </g>
    );
  return (
    <g stroke={colors.text} strokeWidth={5}>
      <line x1={-90} y1={0} x2={90} y2={0} />
      {[-60, -20, 20, 60].map((x) => (
        <line key={x} x1={x} y1={-14} x2={x} y2={14} />
      ))}
    </g>
  );
};

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3, c4] = cues;

  // Camera: start close on the robot, pull back to show the empty road.
  const pull = glide(frame, c1 - 6, fps, 24);
  const zoom = lerp(1.15, 1, pull);
  const camX = lerp(665 - 960, 0, pull);
  const camY = lerp(420 - 445, 0, pull);

  // The counting token hops from node to node while the chain grows.
  const k = Math.min(COUNT - 1, Math.floor((frame - c3 - 8) / 14));
  const tokenPos =
    k < 1
      ? { x: node(0).x, y: node(0).y - 52 }
      : hop(
          ramp(frame, c3 + 8 + k * 14, 12),
          node(k - 1).x,
          node(k - 1).y - 52,
          node(k).x,
          node(k).y - 52,
          70,
        );

  const question = springIn(frame, c4 + 4, fps, 9);
  const blink = [c1 + 20, c1 + 50, c4 + 30].some(
    (b) => frame >= b && frame < b + 5,
  )
    ? 1
    : 0;

  return (
    <SceneShell id="coldOpen">
      <Sfx name="pop" at={c0 + 4} />
      {[0, 1, 2].map((k) => (
        <Sfx key={k} name="scratch" at={c0 + 50 + k * 12} />
      ))}
      <Sfx name="whoosh" at={c1 - 4} />
      <Sfx name="pop" at={c1 + 8} volume={0.25} />
      <Sfx name="tick" at={c1 + 30} volume={0.2} />
      <Sfx name="tick" at={c1 + 36} volume={0.2} />
      <Sfx name="pop" at={c2 + 6} />
      <Sfx name="page" at={c3} />
      {Array.from({ length: COUNT - 1 }).map((_, k) => (
        <Sfx key={k} name={PLUCKS[k]} at={c3 + 22 + k * 14} volume={0.3} />
      ))}
      <Sfx name="chime" at={c4 + 4} />
      <QuestionTray />

      <Camera zoom={zoom} x={camX} y={camY}>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          <Robot
            x={ROBOT.x}
            y={ROBOT.y}
            scale={1.3 * springIn(frame, c0, fps, 10)}
            look={ramp(frame, c1, 10) - ramp(frame, c4, 8) * 0.4}
            tilt={12 * springIn(frame, c4 + 6, fps, 8)}
            blink={blink}
          />

          {/* A thought bubble: what should it be told? */}
          <g
            opacity={fadeIn(frame, c1 + 8, 10) * fadeOut(frame, c2, 10)}
            transform={`translate(${ROBOT.x + 120} ${ROBOT.y - 250}) scale(${springIn(frame, c1 + 8, fps, 10)})`}
          >
            <circle cx={-70} cy={120} r={10} fill={alpha(colors.text, 0.85)} />
            <circle cx={-40} cy={85} r={16} fill={alpha(colors.text, 0.85)} />
            <ellipse rx={90} ry={66} fill={alpha(colors.text, 0.9)} />
            <text
              y={36}
              fill={colors.violet}
              fontSize={100}
              fontFamily={fonts.title}
              fontWeight={700}
              textAnchor="middle"
            >
              ?
            </text>
          </g>

          {/* What it doesn't know, crossed out one by one. */}
          {[0, 1, 2].map((k) => {
            const x = 560 + k * 260;
            const y = 300;
            const cross = ramp(frame, c0 + 50 + k * 12, 8);
            return (
              <g
                key={k}
                opacity={
                  fadeIn(frame, c0 + 14 + k * 10) * fadeOut(frame, c1, 12)
                }
                transform={`translate(${x} ${y}) scale(${springIn(frame, c0 + 14 + k * 10, fps, 11)})`}
              >
                <Unknown kind={k} />
                <line
                  x1={-90}
                  y1={-70}
                  x2={-90 + 180 * cross}
                  y2={-70 + 140 * cross}
                  stroke={colors.red}
                  strokeWidth={10}
                  strokeLinecap="round"
                />
              </g>
            );
          })}

          {/* The road to "forever". */}
          <line
            x1={node(0).x - 60}
            y1={LINE_Y}
            x2={node(0).x - 60 + 1260 * ramp(frame, c1 + 4, 20)}
            y2={LINE_Y}
            stroke={alpha(colors.muted, 0.5)}
            strokeWidth={3}
            strokeDasharray="12 14"
          />
          <text
            x={1830}
            y={LINE_Y + 14}
            fill={colors.muted}
            fontSize={44}
            fontFamily={fonts.math}
            textAnchor="end"
            opacity={fadeIn(frame, c1 + 20)}
          >
            ∞
          </text>
          <text
            x={1830}
            y={LINE_Y + 70}
            fill={colors.muted}
            fontSize={28}
            textAnchor="end"
            opacity={fadeIn(frame, c1 + 24)}
          >
            {tx.forever}
          </text>

          {/* 0, then next, next, next … */}
          {Array.from({ length: COUNT }).map((_, i) => {
            const appear = i === 0 ? c2 + 4 : c3 + 18 + (i - 1) * 14;
            const s = springIn(frame, appear, fps, 10);
            return (
              <g key={i}>
                {i > 0 ? (
                  <NextArrow
                    a={node(i - 1)}
                    b={node(i)}
                    progress={ramp(frame, appear - 8, 10)}
                  />
                ) : null}
                <NumberNode
                  x={node(i).x}
                  y={node(i).y}
                  label={String(i)}
                  scale={s}
                  opacity={s > 0 ? 1 : 0}
                />
              </g>
            );
          })}
          <Token
            p={tokenPos}
            opacity={fadeIn(frame, c3 + 4, 8) * (frame < c3 ? 0 : 1)}
          />

          <g
            transform={`translate(${node(3).x - 100} ${LINE_Y - 210}) scale(${question})`}
            opacity={Math.min(1, question)}
          >
            <text
              y={50}
              fill={colors.highlight}
              fontSize={150}
              fontFamily={fonts.title}
              fontWeight={700}
              textAnchor="middle"
            >
              ?
            </text>
          </g>
        </svg>

        {/* Two empty rule slots appear, then fill in. */}
        {[tx.rule1, tx.rule2].map((r, i) => {
          const fillAt = [c2, c3][i] + 2;
          const filled = frame >= fillAt;
          return (
            <div
              key={r}
              style={{
                position: "absolute",
                left: 520,
                top: 110 + i * 92,
                width: 760,
                height: 74,
                borderRadius: 16,
                border: `3px ${filled ? "solid" : "dashed"} ${filled ? colors.primary : colors.panelEdge}`,
                backgroundColor: filled
                  ? alpha(colors.primary, 0.08)
                  : "transparent",
                display: "flex",
                alignItems: "center",
                padding: "0 26px",
                opacity: fadeIn(frame, c1 + 30 + i * 6),
                translate: riseIn(frame, c1 + 30 + i * 6, 20),
                scale: filled
                  ? 1 + 0.06 * Math.sin(Math.PI * ramp(frame, fillAt, 10))
                  : 1,
              }}
            >
              <span
                style={{
                  fontSize: 42,
                  fontFamily: fonts.title,
                  color: colors.primary,
                  opacity: fadeIn(frame, fillAt),
                }}
              >
                {r}
              </span>
            </div>
          );
        })}
      </Camera>
    </SceneShell>
  );
};
