import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { Sfx } from "../../shared/components/Sfx";
import {
  glide,
  lerp,
  ramp,
  shake,
  springIn,
} from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Desk, DESK_Y, Person } from "../components/study";
import { useStrings } from "../i18n";

// Principia Mathematica. Whitehead and Russell beside the desk; three thick
// volumes drop onto it, thud, thud, thud. The camera pushes into volume II,
// it falls open and the pages race past while the proposition counter runs
// ∗1, ∗2, … until it stops at ∗110.643: 1 + 1 = 2. Then the footnote slides
// in underneath: "The above proposition is occasionally useful."

const bookX = (k: number) => 760 + k * 200;

export const Principia: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("principia");
  const [c0, c1] = cues;
  const dropAt = (k: number) => c0 + 16 + k * 14;
  const push = glide(frame, c1, fps, 24);
  const open = fadeIn(frame, c1 + 14, 10);
  const pages = ramp(frame, c1 + 20, 60);
  const flipping = frame >= c1 + 20 && frame < c1 + 80;
  const prop = Math.floor(lerp(1, 110, pages));
  const arrived = frame >= c1 + 80;

  return (
    <SceneShell id="principia">
      {[0, 1, 2].map((k) => (
        <Sfx key={k} name="thud" at={dropAt(k) + 10} volume={0.4} />
      ))}
      <Sfx name="whoosh" at={c1} volume={0.16} />
      {Array.from({ length: 10 }).map((_, k) => (
        <Sfx key={`p${k}`} name="page" at={c1 + 20 + k * 6} volume={0.12} />
      ))}
      <Sfx name="ding" at={c1 + 82} />
      <Sfx name="chime" at={c1 + 110} />

      <Camera
        zoom={lerp(1, 2.3, push)}
        x={lerp(0, bookX(1) - 960, push)}
        y={lerp(0, DESK_Y - 80 - 540, push)}
      >
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", overflow: "visible" }}
        >
          <Desk />
          <Person
            x={230}
            y={850}
            color={colors.green}
            size={2.2}
            bob={frame / 30}
          />
          <Person
            x={1700}
            y={850}
            color={colors.highlight}
            size={2.1}
            facing={-1}
            bob={frame / 30 + 1}
          />
          {[0, 1, 2].map((k) => {
            const t = glide(frame, dropAt(k), fps, 10);
            const landed = frame >= dropAt(k) + 10;
            return (
              <g
                key={k}
                transform={`translate(${bookX(k) + (landed ? shake(frame, dropAt(k) + 10, 4) : 0)} ${lerp(-400, DESK_Y, t)})`}
                opacity={k === 1 ? 1 - open : 1}
              >
                <rect
                  x={-80}
                  y={-300}
                  width={160}
                  height={300}
                  rx={10}
                  fill={colors.violet}
                  stroke={colors.ink}
                  strokeWidth={6}
                />
                <rect
                  x={-80}
                  y={-260}
                  width={160}
                  height={14}
                  fill={colors.primary}
                />
                <rect
                  x={-80}
                  y={-60}
                  width={160}
                  height={14}
                  fill={colors.primary}
                />
                <text
                  x={0}
                  y={-190}
                  fill={colors.primary}
                  fontSize={22}
                  textAnchor="middle"
                  fontFamily={fonts.title}
                  fontWeight={800}
                >
                  PRINCIPIA
                </text>
                <text
                  x={0}
                  y={-162}
                  fill={colors.primary}
                  fontSize={18}
                  textAnchor="middle"
                  fontFamily={fonts.title}
                  fontWeight={800}
                >
                  MATHEMATICA
                </text>
                <text
                  x={0}
                  y={-100}
                  fill={colors.paper}
                  fontSize={30}
                  textAnchor="middle"
                  fontFamily={fonts.title}
                >
                  {tx.vol(k + 1)}
                </text>
              </g>
            );
          })}
          {/* volume II, open */}
          <g opacity={open} transform={`translate(${bookX(1)} ${DESK_Y})`}>
            <rect
              x={-190}
              y={-250}
              width={380}
              height={250}
              rx={8}
              fill={colors.violet}
              stroke={colors.ink}
              strokeWidth={5}
            />
            <rect
              x={-180}
              y={-240}
              width={178}
              height={232}
              fill={colors.paper}
            />
            <rect x={2} y={-240} width={178} height={232} fill={colors.paper} />
            {/* lines of symbols */}
            {Array.from({ length: 9 }).map((_, r) => (
              <g key={r}>
                <rect
                  x={-166}
                  y={-222 + r * 24}
                  width={150 - ((r * 37) % 50)}
                  height={6}
                  fill={alpha(colors.ink, 0.35)}
                />
                <rect
                  x={16}
                  y={-222 + r * 24}
                  width={150 - ((r * 53) % 60)}
                  height={6}
                  fill={alpha(colors.ink, 0.35)}
                  opacity={arrived && r > 2 && r < 6 ? 0 : 1}
                />
              </g>
            ))}
            {/* the flipping page */}
            {flipping ? (
              <rect
                x={2}
                y={-240}
                width={178}
                height={232}
                fill={colors.paper}
                stroke={alpha(colors.ink, 0.3)}
                strokeWidth={2}
                transform={`scale(${Math.cos((frame - c1 - 20) * 0.9)} 1)`}
              />
            ) : null}
            <text
              x={91}
              y={-188}
              fill={colors.ink}
              fontSize={20}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={700}
            >
              {arrived ? "∗110.643" : `∗${prop}`}
            </text>
            {arrived ? (
              <text
                x={91}
                y={-120}
                fill={colors.ink}
                fontSize={36}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={800}
                opacity={fadeIn(frame, c1 + 80, 6)}
                transform={`scale(${lerp(1.4, 1, Math.min(1, springIn(frame, c1 + 80, fps, 10)))})`}
                style={{ transformOrigin: "91px -130px" }}
              >
                1 + 1 = 2
              </text>
            ) : null}
          </g>
        </svg>
      </Camera>

      {/* the footnote */}
      <AbsoluteFill style={{ top: 760, alignItems: "center" }}>
        <div
          style={{
            padding: "14px 34px",
            borderRadius: 14,
            backgroundColor: colors.paper,
            color: colors.ink,
            fontFamily: fonts.title,
            fontStyle: "italic",
            fontSize: 44,
            opacity: fadeIn(frame, c1 + 106),
            translate: riseIn(frame, c1 + 106, 20),
          }}
        >
          {tx.useful}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
