import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { Sfx } from "../../shared/components/Sfx";
import {
  glide,
  hop,
  lerp,
  ramp,
  shake,
  springIn,
} from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import {
  Bag,
  Cup,
  Desk,
  DESK_Y,
  Letter,
  Person,
  Shoe,
  Stack,
  Star,
} from "../components/study";
import { useStrings } from "../i18n";

// The story. Jena, 1902: Frege at his desk, the wall calendar running from
// 1879 to 1902 while the manuscript stack grows. A letter flies in through
// the window and lands on the desk. The camera pushes into it: Russell's
// question, drawn as bags. Bags that aren't in themselves hop into the big
// bag R. Then R tries to get into itself: in, out, in, out. The camera pulls
// back out to the desk, and the stack totters.

const STACK_X = 820;
const WIN = { x: 1440, y: 120, w: 340, h: 300 };

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("coldOpen");
  const [c0, c1, c2, c3, c4] = cues;
  // twenty years of work
  const years = ramp(frame, c0 + 6, 80);
  const year = Math.round(lerp(1879, 1902, years));
  const sheets = lerp(3, 24, years);
  const write = frame < c1 ? frame / 3 : 0;
  // the letter flies in through the window and lands on the desk
  const fly = glide(frame, c1 + 6, fps, 26);
  const letterPos = hop(
    fly,
    WIN.x + WIN.w / 2,
    WIN.y + WIN.h / 2,
    1180,
    DESK_Y - 70,
    120,
  );
  const landed = frame >= c1 + 32;
  // he walks to it
  const walk = glide(frame, c1 + 34, fps, 24);
  // push into the letter
  const into = glide(frame, c2, fps, 22) * (1 - glide(frame, c4, fps, 22));
  const bagHop = (k: number) => glide(frame, c2 + 26 + k * 12, fps, 14);
  // R tries to get into itself, over and over
  const tries = Math.max(0, frame - c3 - 6);
  const inside = Math.floor(tries / 22) % 2 === 0;
  const flipT = glide(frame, c3 + 6 + Math.floor(tries / 22) * 22, fps, 10);
  const rIn = frame < c3 + 6 ? 0 : inside ? flipT : 1 - flipT;
  // the stack totters
  const totter =
    frame >= c4 + 24
      ? 3 *
        Math.sin((frame - c4 - 24) / 3.5) *
        Math.min(1, (frame - c4 - 24) / 20)
      : 0;
  const fall = glide(frame, c4 + 46, fps, 20);

  return (
    <SceneShell id="coldOpen">
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <Sfx key={k} name="page" at={c0 + 8 + k * 14} volume={0.12} />
      ))}
      <Sfx name="whoosh" at={c1 + 6} volume={0.18} />
      <Sfx name="thud" at={c1 + 32} volume={0.25} />
      <Sfx name="whoosh" at={c2} volume={0.14} />
      <Sfx name="page" at={c2 + 4} volume={0.2} />
      {[0, 1, 2].map((k) => (
        <Sfx key={`b${k}`} name="pop" at={c2 + 40 + k * 12} volume={0.16} />
      ))}
      {[0, 1, 2, 3, 4].map((k) => (
        <Sfx
          key={`r${k}`}
          name={k % 2 ? "scratch" : "pop"}
          at={c3 + 6 + k * 22}
          volume={0.16}
        />
      ))}
      <Sfx name="whoosh" at={c4} volume={0.14} />
      <Sfx name="thud" at={c4 + 50} volume={0.35} />
      <Sfx name="scratch" at={c4 + 54} volume={0.2} />

      <Camera
        zoom={lerp(lerp(1.08, 1, years), 2.4, into)}
        x={lerp(0, 220, into)}
        y={lerp(0, 60, into)}
      >
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", overflow: "visible" }}
        >
          {/* the study: wall, window, calendar */}
          <rect
            x={-200}
            y={-200}
            width={2400}
            height={1500}
            fill={alpha(colors.ink, 0.3)}
          />
          <rect
            x={WIN.x}
            y={WIN.y}
            width={WIN.w}
            height={WIN.h}
            rx={10}
            fill={alpha(colors.bgGlow, 0.6)}
            stroke={colors.wood}
            strokeWidth={14}
          />
          <line
            x1={WIN.x + WIN.w / 2}
            y1={WIN.y}
            x2={WIN.x + WIN.w / 2}
            y2={WIN.y + WIN.h}
            stroke={colors.wood}
            strokeWidth={10}
          />
          <g transform="translate(560 180)">
            <rect
              x={-90}
              y={0}
              width={180}
              height={150}
              rx={8}
              fill={colors.paper}
              stroke={colors.ink}
              strokeWidth={4}
            />
            <rect
              x={-90}
              y={0}
              width={180}
              height={36}
              rx={8}
              fill={colors.red}
            />
            <text
              x={0}
              y={112}
              fill={colors.ink}
              fontSize={64}
              textAnchor="middle"
              fontFamily={fonts.mono}
              fontWeight={700}
            >
              {year}
            </text>
          </g>
          <Desk />
          <g transform={`rotate(${totter} ${STACK_X} ${DESK_Y})`}>
            <Stack x={STACK_X} n={sheets} fall={fall} />
          </g>
          {/* the letter */}
          {frame >= c1 + 4 ? (
            <Letter
              x={letterPos.x}
              y={landed ? DESK_Y - 70 : letterPos.y}
              rot={lerp(-30, -6, fly)}
              scale={0.8}
              open={glide(frame, c2, fps, 14)}
            />
          ) : null}
          <text
            x={1180}
            y={DESK_Y - 170}
            fill={colors.green}
            fontSize={34}
            textAnchor="middle"
            opacity={fadeIn(frame, c1 + 34) * fadeOut(frame, c2, 8)}
          >
            {tx.fromRussell}
          </text>
          <Person
            x={lerp(300, 980, walk)}
            color={colors.orange}
            beard
            size={1.5}
            bob={frame < c1 ? write : walk > 0 && walk < 1 ? frame / 3 : 0}
            facing={1}
          />
          {/* his reply */}
          <g
            opacity={fadeIn(frame, c4 + 20)}
            transform={`translate(1240 ${DESK_Y - 240}) rotate(4)`}
          >
            <rect
              x={-220}
              y={-70}
              width={440}
              height={130}
              rx={10}
              fill={colors.paper}
              stroke={colors.ink}
              strokeWidth={4}
            />
            <text
              x={0}
              y={16}
              fill={colors.ink}
              fontSize={46}
              textAnchor="middle"
              fontFamily={fonts.title}
              fontStyle="italic"
            >
              {tx.totters}
            </text>
          </g>
        </svg>
      </Camera>

      {/* inside the letter: Russell's question, drawn as bags */}
      <AbsoluteFill style={{ opacity: Math.min(1, into * 1.4) }}>
        <svg width={1920} height={1080}>
          <rect
            x={160}
            y={90}
            width={1600}
            height={740}
            rx={20}
            fill={colors.paper}
            stroke={colors.ink}
            strokeWidth={6}
          />
          {/* the big bag R */}
          <Bag x={1180} y={760} w={560} h={420} label="R" color={colors.violet}>
            <text
              x={0}
              y={-300}
              fill={colors.paper}
              fontSize={36}
              textAnchor="middle"
              opacity={0.85}
            >
              {tx.notInItself}
            </text>
          </Bag>
          {/* bags that aren't members of themselves hop into R */}
          {[
            { k: 0, x: 330, el: <Cup x={0} y={-30} s={0.8} /> },
            { k: 1, x: 530, el: <Star x={0} y={-20} s={0.9} /> },
            { k: 2, x: 730, el: <Shoe x={0} y={-30} s={0.8} /> },
          ].map((b) => {
            const t = bagHop(b.k);
            const p = hop(t, b.x, 700, 1040 + b.k * 140, 700, 160);
            return (
              <Bag
                key={b.k}
                x={p.x}
                y={p.y}
                w={150}
                h={130}
                s={lerp(1, 0.8, t)}
                color={colors.wood}
              >
                {b.el}
              </Bag>
            );
          })}
          {/* R trying to get into itself */}
          {frame >= c3 + 2
            ? (() => {
                const p = hop(rIn, 1180, 760, 1180, 640, 140);
                const s = lerp(1, 0.32, rIn);
                return (
                  <g
                    transform={`translate(${shake(frame, c3 + 6 + Math.floor(tries / 22) * 22 + 10, 10)} 0)`}
                  >
                    <path
                      d={`M 900 340 L 1460 340 L 1460 760 L 900 760 Z`}
                      fill="none"
                      stroke={alpha(colors.ink, 0.25)}
                      strokeWidth={4}
                      strokeDasharray="14 10"
                      opacity={rIn}
                    />
                    <Bag
                      x={p.x}
                      y={p.y}
                      w={560}
                      h={420}
                      s={s}
                      label="R"
                      color={colors.highlight}
                      opacity={0.9}
                    />
                  </g>
                );
              })()
            : null}
          {/* either way it breaks the rule */}
          {frame >= c3 + 6 ? (
            <g>
              <text
                x={560}
                y={300}
                fill={colors.ink}
                fontSize={76}
                textAnchor="middle"
                fontFamily={fonts.math}
                fontWeight={700}
              >
                {inside ? "R ∈ R ⇒ R ∉ R" : "R ∉ R ⇒ R ∈ R"}
              </text>
              <text
                x={560}
                y={460}
                fill={colors.red}
                fontSize={130}
                textAnchor="middle"
                fontWeight={800}
                opacity={lerp(1, 0.4, flipT)}
              >
                ✗
              </text>
            </g>
          ) : null}
        </svg>
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          top: 80,
          left: 120,
          fontFamily: fonts.title,
          fontSize: 60,
          fontWeight: 800,
          color: colors.primary,
          opacity: fadeIn(frame, c0 + 4) * fadeOut(frame, c1 + 20, 12),
          translate: riseIn(frame, c0 + 4, 16),
        }}
      >
        {tx.jena}
      </div>
      <div
        style={{
          position: "absolute",
          top: 170,
          left: 120,
          fontSize: 40,
          color: colors.muted,
          opacity: fadeIn(frame, c0 + 50) * fadeOut(frame, c1 + 20, 12),
          scale: lerp(1.2, 1, Math.min(1, springIn(frame, c0 + 50, fps, 10))),
        }}
      >
        {tx.twentyYears} · {tx.volume2}
      </div>
    </SceneShell>
  );
};
