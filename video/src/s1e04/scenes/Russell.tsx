import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import {
  glide,
  lerp,
  ramp,
  shake,
  springIn,
} from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { SetBox } from "../components/sets";
import { useStrings } from "../i18n";

// Naive comprehension: a property card fills a box. "Is even" works; "all
// sets" gives a box that holds itself; "doesn't contain itself" gives R,
// which can neither be inside itself nor outside, so the box cracks.

const EVEN_BOX = { x: 1240, y: 250, w: 520, h: 230 };
const tokenX = (i: number) => 260 + i * 120;
const TOKEN_Y = 640;
const R = { x: 960, y: 470, w: 600, h: 330 };

// A box drawn inside itself, smaller and smaller.
const SelfBox: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
  readonly depth: number;
}> = ({ x, y, w, h, depth }) => (
  <g>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={16}
      fill={alpha(colors.highlight, 0.06)}
      stroke={colors.highlight}
      strokeWidth={3}
    />
    {depth > 0 ? (
      <SelfBox
        x={x + w * 0.5}
        y={y + h * 0.42}
        w={w * 0.42}
        h={h * 0.48}
        depth={depth - 1}
      />
    ) : null}
  </g>
);

export const Russell: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("russell");
  const [c0, c1, c2, c3, c4] = cues;
  const props = [tx.isEven, tx.allSets, tx.notSelf];
  const phase = frame < c1 ? 0 : frame < c2 ? 1 : 2;

  // R tries to go in, out, in … then the box cracks.
  const swing = [c3 + 8, c3 + 40, c3 + 72];
  const crack = c3 + 102;
  const inside = { x: R.x + 140, y: R.y + 60 };
  const outside = { x: R.x + R.w / 2 + 150, y: R.y + 60 };
  let tagPos = outside;
  swing.forEach((t, i) => {
    const p = glide(frame, t, fps, 16);
    if (frame >= t) {
      const from = i % 2 === 0 ? outside : inside;
      const to = i % 2 === 0 ? inside : outside;
      tagPos = {
        x: lerp(from.x, to.x, p),
        y: lerp(from.y, to.y, p) - 60 * Math.sin(Math.PI * p),
      };
    }
  });
  const swingIdx = swing.filter((t) => frame >= t).length - 1;
  const claim =
    swingIdx < 0
      ? ""
      : swingIdx % 2 === 0
        ? "R ∈ R  ⇒  R ∉ R"
        : "R ∉ R  ⇒  R ∈ R";
  const broken = ramp(frame, crack, 24);

  return (
    <SceneShell id="russell">
      <Sfx name="page" at={c0 + 4} />
      {[0, 2, 4, 6, 8].map((i) => (
        <Sfx key={i} name="tick" at={c0 + 30 + i * 4 + 14} volume={0.18} />
      ))}
      <Sfx name="page" at={c1 + 2} />
      <Sfx name="pop" at={c1 + 10} />
      <Sfx name="page" at={c2 + 2} />
      {[0, 1, 2].map((i) => (
        <Sfx key={`m${i}`} name="pop" at={c2 + 20 + i * 8} volume={0.2} />
      ))}
      {swing.map((t, i) => (
        <Sfx
          key={`s${i}`}
          name={i % 2 === 0 ? "whoosh" : "thud"}
          at={t + 14}
          volume={0.25}
        />
      ))}
      <Sfx name="thud" at={crack} />
      <Sfx name="scratch" at={crack + 2} volume={0.3} />
      <Sfx name="page" at={c4 + 6} />
      <Sfx name="whoosh" at={c4 + 14} volume={0.2} />
      <Sfx name="thud" at={c4 + 42} />
      <Sfx name="scratch" at={c4 + 42} volume={0.25} />
      <QuestionTray />

      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            top: 110,
            width: "100%",
            textAlign: "center",
            fontSize: 48,
            fontFamily: fonts.title,
            opacity: fadeIn(frame, c0 + 2),
            translate: riseIn(frame, c0 + 2),
          }}
        >
          {tx.anyProperty}
        </div>
        {/* The property card, rewritten for each example */}
        <div
          key={phase}
          style={{
            position: "absolute",
            left: 140,
            top: 220,
            padding: "12px 28px",
            borderRadius: 999,
            border: `3px solid ${colors.highlight}`,
            color: colors.highlight,
            fontSize: 38,
            opacity:
              fadeIn(frame, [c0 + 8, c1 + 2, c2 + 2][phase]) * (1 - broken),
            scale: springIn(frame, [c0 + 8, c1 + 2, c2 + 2][phase], fps, 10),
          }}
        >
          P(x): {props[phase]}
        </div>

        <svg width={1920} height={890} style={{ position: "absolute" }}>
          {/* 1. Even numbers fly into their box */}
          <g opacity={fadeIn(frame, c0 + 10) * fadeOut(frame, c1 - 4, 10)}>
            <rect
              x={EVEN_BOX.x}
              y={EVEN_BOX.y}
              width={EVEN_BOX.w}
              height={EVEN_BOX.h}
              rx={20}
              fill={alpha(colors.primary, 0.06)}
              stroke={colors.primary}
              strokeWidth={3}
            />
            {Array.from({ length: 10 }).map((_, i) => {
              const even = i % 2 === 0;
              const p = even ? glide(frame, c0 + 30 + i * 4, fps, 16) : 0;
              const tx2 = EVEN_BOX.x + 70 + (i / 2) * 95;
              const x = lerp(tokenX(i), tx2, p);
              const y =
                lerp(TOKEN_Y, EVEN_BOX.y + EVEN_BOX.h / 2, p) -
                80 * Math.sin(Math.PI * p);
              return (
                <g key={i} opacity={fadeIn(frame, c0 + 14 + i * 2)}>
                  <circle
                    cx={x}
                    cy={y}
                    r={34}
                    fill={alpha(even ? colors.primary : colors.muted, 0.18)}
                    stroke={even ? colors.primary : colors.muted}
                    strokeWidth={3}
                  />
                  <text
                    x={x}
                    y={y + 13}
                    fill={even ? colors.primary : colors.muted}
                    fontSize={36}
                    textAnchor="middle"
                    fontFamily={fonts.math}
                  >
                    {i}
                  </text>
                </g>
              );
            })}
          </g>

          {/* 2. The set of all sets: a box that holds itself */}
          <g opacity={fadeIn(frame, c1 + 8) * fadeOut(frame, c2 - 4, 10)}>
            <SelfBox x={R.x - 300} y={R.y - 190} w={600} h={380} depth={3} />
            <g
              transform={`translate(${R.x - 180} ${R.y - 40}) scale(1.4) translate(${-(R.x - 180)} ${-(R.y - 40)})`}
            >
              <SetBox n={0} kind="vn" cx={R.x - 180} cy={R.y - 40} />
            </g>
            <g
              transform={`translate(${R.x - 70} ${R.y - 40}) scale(1.4) translate(${-(R.x - 70)} ${-(R.y - 40)})`}
            >
              <SetBox n={1} kind="vn" cx={R.x - 70} cy={R.y - 40} />
            </g>
            <text
              x={R.x - 280}
              y={R.y - 140}
              fill={colors.highlight}
              fontSize={34}
              fontFamily={fonts.math}
            >
              {"{ " + tx.allSets + " }"}
            </text>
          </g>

          {/* 3. R: everything that doesn't contain itself. Then it cracks. */}
          <g opacity={fadeIn(frame, c2 + 6) * (1 - broken)}>
            {[0, 1, 2, 3].map((q) => {
              const dx = (q % 2 === 0 ? -1 : 1) * 160 * broken;
              const dy = 260 * broken * broken + (q < 2 ? -40 : 40) * broken;
              const rot = (q % 2 === 0 ? -1 : 1) * 25 * broken;
              const qx = R.x - R.w / 2 + (q % 2) * (R.w / 2);
              const qy = R.y - R.h / 2 + Math.floor(q / 2) * (R.h / 2);
              return (
                <g
                  key={q}
                  transform={`translate(${dx + (frame >= crack ? 0 : shake(frame, swing[2] + 14, 6))} ${dy}) rotate(${rot} ${qx + R.w / 4} ${qy + R.h / 4})`}
                >
                  <rect
                    x={qx}
                    y={qy}
                    width={R.w / 2}
                    height={R.h / 2}
                    fill={alpha(colors.highlight, 0.07)}
                    stroke={colors.highlight}
                    strokeWidth={3}
                  />
                </g>
              );
            })}
            <text
              x={R.x}
              y={R.y - R.h / 2 + 50}
              fill={colors.text}
              fontSize={40}
              textAnchor="middle"
              fontFamily={fonts.math}
            >
              R = {"{ x : x ∉ x }"}
            </text>
            {[0, 1, 2].map((k) => {
              const p = glide(frame, c2 + 14 + k * 8, fps, 16);
              const x = lerp(R.x - R.w / 2 - 300, R.x - 190 + k * 110, p);
              return (
                <g
                  key={k}
                  transform={`translate(${x} ${R.y + 20}) scale(1.2) translate(${-x} ${-(R.y + 20)})`}
                >
                  <SetBox n={k} kind="vn" cx={x} cy={R.y + 20} />
                </g>
              );
            })}
          </g>
          {/* R itself, trying to decide where it belongs */}
          <g
            opacity={fadeIn(frame, c3 + 2) * (1 - broken)}
            transform={`translate(${frame >= swing[2] + 14 && frame < crack ? shake(frame, swing[2] + 14, 10) : 0} 0)`}
          >
            <rect
              x={tagPos.x - 46}
              y={tagPos.y - 34}
              width={92}
              height={68}
              rx={14}
              fill={alpha(colors.highlight, 0.25)}
              stroke={colors.highlight}
              strokeWidth={4}
            />
            <text
              x={tagPos.x}
              y={tagPos.y + 14}
              fill={colors.text}
              fontSize={40}
              textAnchor="middle"
              fontFamily={fonts.math}
            >
              R
            </text>
          </g>
        </svg>

        <div
          key={`claim${swingIdx}`}
          style={{
            position: "absolute",
            top: 700,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 52,
            color: colors.red,
            opacity:
              swingIdx >= 0
                ? fadeIn(frame, swing[Math.max(0, swingIdx)] + 10, 8) *
                  (1 - broken)
                : 0,
          }}
        >
          {claim}
        </div>

        {/* The letter travels to Frege, and his book cracks */}
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          {(() => {
            const fly = glide(frame, c4 + 14, fps, 26);
            const ex = lerp(640, 1180, fly);
            const ey = 560 - 90 * Math.sin(Math.PI * fly);
            return (
              <g
                opacity={fadeIn(frame, c4 + 10) * (1 - ramp(frame, c4 + 40, 8))}
              >
                <rect
                  x={ex - 40}
                  y={ey - 28}
                  width={80}
                  height={56}
                  rx={6}
                  fill={colors.paper}
                />
                <path
                  d={`M ${ex - 40} ${ey - 26} L ${ex} ${ey + 4} L ${ex + 40} ${ey - 26}`}
                  fill="none"
                  stroke={colors.ink}
                  strokeWidth={3}
                />
              </g>
            );
          })()}
          <g
            opacity={fadeIn(frame, c4 + 8)}
            transform={`translate(${frame >= c4 + 42 ? shake(frame, c4 + 42, 10) : 0} 0)`}
          >
            <rect
              x={1220}
              y={480}
              width={240}
              height={170}
              rx={10}
              fill={alpha(colors.wood, 0.35)}
              stroke={colors.wood}
              strokeWidth={4}
            />
            <text
              x={1340}
              y={555}
              fill={colors.paper}
              fontSize={26}
              textAnchor="middle"
              fontFamily={fonts.title}
            >
              Grundgesetze
            </text>
            <text
              x={1340}
              y={592}
              fill={colors.paper}
              fontSize={22}
              textAnchor="middle"
              fontFamily={fonts.title}
            >
              der Arithmetik
            </text>
            <path
              d="M 1300 480 L 1325 530 L 1305 570 L 1340 610 L 1320 650"
              fill="none"
              stroke={colors.red}
              strokeWidth={6}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1 1"
              strokeDashoffset={1 - ramp(frame, c4 + 42, 10)}
            />
          </g>
        </svg>
        {/* Russell, and the letter to Frege */}
        <div
          style={{
            position: "absolute",
            top: 380,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: 80,
            fontSize: 46,
            fontFamily: fonts.title,
          }}
        >
          <span
            style={{
              opacity: fadeIn(frame, crack + 16),
              translate: riseIn(frame, crack + 16, 20),
            }}
          >
            {tx.russellTag}
          </span>
          <span
            style={{
              color: colors.muted,
              display: "flex",
              alignItems: "center",
              gap: 18,
              opacity: fadeIn(frame, c4 + 6),
              translate: riseIn(frame, c4 + 6, 20),
            }}
          >
            <svg width={64} height={46} viewBox="0 0 64 46">
              <rect
                x={2}
                y={2}
                width={60}
                height={42}
                rx={4}
                fill={colors.paper}
              />
              <path
                d="M 2 4 L 32 26 L 62 4"
                fill="none"
                stroke={colors.ink}
                strokeWidth={3}
              />
            </svg>
            {tx.fregeTag}
          </span>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
