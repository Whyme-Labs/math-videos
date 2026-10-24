import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { Sfx } from "../../shared/components/Sfx";
import {
  glide,
  hop,
  lerp,
  shake,
  springIn,
} from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Card, Robot, Rulebook } from "../components/world";
import { useStrings } from "../i18n";

// The Gödel sentence. A robot reads the rulebook and prints theorems, a
// steady stream of ✓ cards. A small grid lights its diagonal and flips it
// (episode 12), and out of it comes the card G: "I am not provable". The
// robot tries to print G; the copy turns red ("proved → false") and burns
// up, and the real G gets its stamp: true. G goes into the rulebook as a new
// axiom, and a new G₂ appears higher up, then G₃: the camera rides up after
// them. Last, the card "I never prove 0 = 1": the robot stares at it, its
// eyes go red, and it shakes.

const ROBOT = { x: 480, y: 800 };
const BOOK = { x: 200, y: 800 };
const PILE_X = 860;

export const Godel: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("godel");
  const [c0, c1, c2, c3] = cues;
  // the steady stream of theorems
  const PERIOD = 16;
  const printed = Math.max(0, Math.floor((frame - 4) / PERIOD));
  // the diagonal grid and the card G
  const diag = (k: number) => glide(frame, c0 + 20 + k * 6, fps, 8);
  const toG = glide(frame, c0 + 60, fps, 20);
  const G = { x: 1420, y: 360 };
  // the robot tries
  const attempt = glide(frame, c1 + 6, fps, 16);
  const burn = glide(frame, c1 + 34, fps, 14);
  const stampTrue = Math.min(1, springIn(frame, c1 + 60, fps, 10));
  // new axiom, new sentence
  const intoBook = glide(frame, c2 + 6, fps, 22);
  const pages = 3 + 2 * intoBook + 2 * glide(frame, c2 + 70, fps, 14);
  const g2 = Math.min(1, springIn(frame, c2 + 34, fps, 10));
  const g3 = Math.min(1, springIn(frame, c2 + 84, fps, 10));
  const rise = glide(frame, c2 + 40, fps, 60);
  // consistency
  const con = Math.min(1, springIn(frame, c3 + 6, fps, 10));
  const stare = frame >= c3 + 24;

  return (
    <SceneShell id="godel">
      {Array.from({ length: 12 }).map((_, k) => (
        <Sfx key={k} name="tick" at={4 + k * PERIOD * 2} volume={0.06} />
      ))}
      {[0, 1, 2, 3].map((k) => (
        <Sfx key={`d${k}`} name="pop" at={c0 + 20 + k * 6} volume={0.12} />
      ))}
      <Sfx name="sparkle" at={c0 + 70} volume={0.3} />
      <Sfx name="whoosh" at={c1 + 6} volume={0.14} />
      <Sfx name="scratch" at={c1 + 34} volume={0.3} />
      <Sfx name="ding" at={c1 + 60} />
      <Sfx name="whoosh" at={c2 + 6} volume={0.16} />
      <Sfx name="thud" at={c2 + 28} volume={0.25} />
      <Sfx name="pop" at={c2 + 34} volume={0.2} />
      <Sfx name="pop" at={c2 + 84} volume={0.2} />
      <Sfx name="pop" at={c3 + 6} volume={0.2} />
      <Sfx name="thud" at={c3 + 24} volume={0.35} />

      <Camera zoom={lerp(1, 0.85, rise)} x={0} y={0}>
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", overflow: "visible" }}
        >
          <line
            x1={-400}
            y1={ROBOT.y + 24}
            x2={2400}
            y2={ROBOT.y + 24}
            stroke={alpha(colors.muted, 0.5)}
            strokeWidth={4}
          />
          <Rulebook x={BOOK.x} y={BOOK.y} pages={pages} title={tx.axioms} />
          <Robot
            x={ROBOT.x}
            y={ROBOT.y}
            s={1.1}
            work={frame / 2}
            eye={stare ? colors.red : colors.primary}
            look={stare ? 1 : 0}
          />
          {/* theorems streaming out onto the pile */}
          {Array.from({ length: Math.min(printed, 40) }).map((_, i) => {
            const n = printed - 1 - i; // newest first
            const t = Math.min(1, (frame - 4 - n * PERIOD) / 12);
            const slot = n % 12;
            const p = hop(
              t,
              ROBOT.x + 120,
              ROBOT.y - 100,
              PILE_X + (slot % 4) * 90,
              ROBOT.y - 40 - Math.floor(slot / 4) * 70,
              60,
            );
            return (
              <Card
                key={n}
                x={p.x}
                y={p.y}
                text="✓"
                w={80}
                s={0.7}
                color={alpha(colors.green, 0.6)}
                opacity={i < 12 ? 1 : 0}
              />
            );
          })}

          {/* the diagonal grid that becomes G */}
          <g
            opacity={fadeIn(frame, c0 + 6) * (1 - toG)}
            transform={`translate(${G.x - 120} ${G.y - 120})`}
          >
            {Array.from({ length: 16 }).map((_, k) => {
              const r = Math.floor(k / 4);
              const c = k % 4;
              const on = r === c ? diag(r) : 0;
              return (
                <rect
                  key={k}
                  x={c * 60}
                  y={r * 60}
                  width={54}
                  height={54}
                  rx={8}
                  fill={on ? colors.primary : alpha(colors.paper, 0.25)}
                  stroke={colors.ink}
                  strokeWidth={3}
                  transform={
                    r === c
                      ? `rotate(${on * 180} ${c * 60 + 27} ${r * 60 + 27})`
                      : undefined
                  }
                />
              );
            })}
          </g>
          <g opacity={toG * (1 - intoBook)}>
            <Card
              x={G.x}
              y={G.y}
              text={`G: ${tx.notProvable}`}
              w={520}
              glow={stampTrue}
              color={stampTrue > 0.5 ? colors.highlight : colors.paper}
              s={lerp(0.4, 1.3, toG)}
            />
          </g>
          {/* the robot's attempt: a copy that turns false and burns */}
          {frame >= c1 + 6 && frame < c1 + 50
            ? (() => {
                const p = hop(
                  attempt,
                  ROBOT.x + 120,
                  ROBOT.y - 120,
                  G.x,
                  G.y + 140,
                  80,
                );
                return (
                  <Card
                    x={p.x}
                    y={p.y}
                    text={burn > 0 ? tx.provedFalse : "G"}
                    w={lerp(120, 360, attempt)}
                    color={burn > 0 ? colors.red : colors.paper}
                    ink={burn > 0 ? colors.paper : colors.ink}
                    opacity={1 - burn}
                    rot={burn * 20}
                    s={1 + burn * 0.3}
                  />
                );
              })()
            : null}
          <text
            x={G.x}
            textAnchor="middle"
            y={G.y - 90}
            fill={colors.green}
            fontSize={60}
            fontWeight={800}
            opacity={stampTrue * (1 - intoBook)}
            transform={`rotate(-4 ${G.x} ${G.y - 90})`}
          >
            {tx.trueLabel} ✓
          </text>
          {/* G goes into the rulebook */}
          {intoBook > 0 && intoBook < 1 ? (
            <Card
              x={lerp(G.x, BOOK.x, intoBook)}
              y={lerp(G.y, BOOK.y - 120, intoBook)}
              text="G"
              w={120}
              color={colors.highlight}
            />
          ) : null}
          <text
            x={BOOK.x}
            y={BOOK.y - 240}
            fill={colors.primary}
            fontSize={40}
            textAnchor="middle"
            fontWeight={800}
            opacity={fadeIn(frame, c2 + 24) * fadeOut(frame, c3, 10)}
          >
            {tx.newAxiom}
          </text>
          {/* and new sentences appear, higher each time */}
          <g opacity={g2}>
            <Card
              x={1380}
              y={170}
              text={`G₂: ${tx.notProvable}`}
              w={520}
              glow={1}
              color={colors.highlight}
              s={1.3 * g2}
            />
          </g>
          <g opacity={g3}>
            <Card
              x={1340}
              y={-60}
              text={`G₃: ${tx.notProvable}`}
              w={520}
              glow={1}
              color={colors.highlight}
              s={1.3 * g3}
            />
          </g>
          {/* the rulebook's own consistency */}
          <g
            opacity={con}
            transform={`translate(${1200 + (stare ? shake(frame, c3 + 24, 10) : 0)} 560)`}
          >
            <Card
              x={0}
              y={0}
              text={tx.con}
              w={560}
              s={1.3 * con}
              color={colors.paper}
            />
          </g>
          <text
            x={ROBOT.x}
            y={ROBOT.y - 360}
            fill={colors.red}
            fontSize={90}
            textAnchor="middle"
            fontWeight={800}
            opacity={stare ? fadeIn(frame, c3 + 24, 6) : 0}
            fontFamily={fonts.math}
          >
            ⊬
          </text>
        </svg>
      </Camera>
    </SceneShell>
  );
};
