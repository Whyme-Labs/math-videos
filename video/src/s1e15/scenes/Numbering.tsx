import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, hop, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Gödel numbering, as a machine you can watch. Three tiles, 0 = 0, drop
// their code numbers (1, 3, 1), each code climbs onto a prime (2, 3, 5) as
// its exponent, the primes multiply out to 2 × 27 × 5 and squeeze into a
// single token, 270, which drops onto the number line. Then a whole proof,
// three lines on a scroll, squeezes line by line into tokens, and the
// scroll becomes one enormous number far down the line. An arrow loops from
// that number back to the scroll: arithmetic now talks about its own proofs.

const TILES = [
  { s: "0", code: 1, p: 2 },
  { s: "=", code: 3, p: 3 },
  { s: "0", code: 1, p: 5 },
];
const tileX = (k: number) => 700 + k * 260;
const LINE_Y = 760;
const SCROLL = ["0 = 0", "S0 = S0", "…"];

export const Numbering: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("numbering");
  const [c0, c1] = cues;
  const tileAt = (k: number) => c0 + 8 + k * 12;
  const codeAt = (k: number) => c0 + 50 + k * 12;
  const climbAt = (k: number) => c0 + 100 + k * 14;
  const squeeze = glide(frame, c0 + 196, fps, 16);
  const drop = glide(frame, c0 + 214, fps, 16);
  const part1 = fadeOut(frame, c1, 10);
  // the proof scroll
  const lineAt = (k: number) => c1 + 20 + k * 14;
  const roll = glide(frame, c1 + 70, fps, 20);
  const loop = glide(frame, c1 + 100, fps, 24);
  const pan = glide(frame, c1 + 70, fps, 30);

  return (
    <SceneShell id="numbering">
      {TILES.map((_, k) => (
        <Sfx key={k} name="clink" at={tileAt(k)} volume={0.16} />
      ))}
      {TILES.map((_, k) => (
        <Sfx key={`c${k}`} name={PLUCKS[k]} at={codeAt(k)} volume={0.14} />
      ))}
      {TILES.map((_, k) => (
        <Sfx key={`u${k}`} name="pop" at={climbAt(k) + 10} volume={0.14} />
      ))}
      <Sfx name="whoosh" at={c0 + 196} volume={0.16} />
      <Sfx name="thud" at={c0 + 230} volume={0.3} />
      {SCROLL.map((_, k) => (
        <Sfx key={`l${k}`} name="tick" at={lineAt(k) + 10} volume={0.14} />
      ))}
      <Sfx name="whoosh" at={c1 + 70} volume={0.16} />
      <Sfx name="chime" at={c1 + 120} />

      <Camera
        zoom={lerp(1, 0.8, pan)}
        x={lerp(0, 300, pan)}
        y={lerp(0, 60, pan)}
      >
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", overflow: "visible" }}
        >
          {/* the number line */}
          <line
            x1={100}
            y1={LINE_Y}
            x2={3400}
            y2={LINE_Y}
            stroke={colors.muted}
            strokeWidth={4}
          />
          {[0, 100, 200, 300].map((n) => (
            <g key={n}>
              <line
                x1={200 + n * 3}
                y1={LINE_Y - 14}
                x2={200 + n * 3}
                y2={LINE_Y + 14}
                stroke={colors.muted}
                strokeWidth={3}
              />
              <text
                x={200 + n * 3}
                y={LINE_Y + 56}
                fill={colors.muted}
                fontSize={30}
                textAnchor="middle"
                fontFamily={fonts.math}
              >
                {n}
              </text>
            </g>
          ))}
          <text
            x={3000}
            y={LINE_Y + 56}
            fill={colors.muted}
            fontSize={30}
            textAnchor="middle"
            fontFamily={fonts.math}
          >
            …
          </text>

          {/* part 1: 0 = 0 becomes 270 */}
          <g opacity={part1}>
            {TILES.map((t, k) => {
              const s = Math.min(1, springIn(frame, tileAt(k), fps, 10));
              const climb = glide(frame, climbAt(k), fps, 12);
              const x = lerp(tileX(k), 960, squeeze);
              return (
                <g key={k} opacity={1 - squeeze}>
                  {/* the tile */}
                  <g
                    transform={`translate(${tileX(k)} 260) scale(${s})`}
                    opacity={1 - climb * 0.6}
                  >
                    <rect
                      x={-70}
                      y={-70}
                      width={140}
                      height={140}
                      rx={18}
                      fill={colors.paper}
                      stroke={colors.ink}
                      strokeWidth={5}
                    />
                    <text
                      x={0}
                      y={30}
                      fill={colors.ink}
                      fontSize={90}
                      textAnchor="middle"
                      fontFamily={fonts.math}
                      fontWeight={700}
                    >
                      {t.s}
                    </text>
                  </g>
                  {/* its code, dropping out and climbing onto a prime */}
                  {(() => {
                    const out = glide(frame, codeAt(k), fps, 10);
                    const p = hop(
                      climb,
                      tileX(k),
                      lerp(260, 400, out),
                      x + 40,
                      480,
                      80,
                    );
                    return (
                      <text
                        x={p.x}
                        y={p.y}
                        fill={colors.primary}
                        fontSize={lerp(60, 48, climb)}
                        textAnchor="middle"
                        fontFamily={fonts.math}
                        fontWeight={800}
                        opacity={out}
                      >
                        {t.code}
                      </text>
                    );
                  })()}
                  {/* the prime it sits on */}
                  <text
                    x={x}
                    y={560}
                    fill={colors.text}
                    fontSize={110}
                    textAnchor="middle"
                    fontFamily={fonts.math}
                    fontWeight={700}
                    opacity={fadeIn(frame, climbAt(k) - 4, 8)}
                  >
                    {t.p}
                  </text>
                  {k < 2 ? (
                    <text
                      x={x + 130}
                      y={540}
                      fill={colors.muted}
                      fontSize={70}
                      textAnchor="middle"
                      fontFamily={fonts.math}
                      opacity={fadeIn(frame, climbAt(k) + 6, 8)}
                    >
                      ·
                    </text>
                  ) : null}
                </g>
              );
            })}
            <text
              x={960}
              textAnchor="middle"
              y={670}
              fill={colors.text}
              fontSize={80}
              fontFamily={fonts.math}
              fontWeight={700}
              opacity={fadeIn(frame, c0 + 150) * (1 - squeeze)}
            >
              = 2 × 27 × 5
            </text>
            {/* the single number, dropping onto the line */}
            <g
              opacity={squeeze}
              transform={`translate(${lerp(960, 200 + 270 * 3, drop)} ${lerp(500, LINE_Y - 70, drop)}) scale(${lerp(1.6, 1, drop)})`}
            >
              <rect
                x={-90}
                y={-46}
                width={180}
                height={92}
                rx={20}
                fill={colors.highlight}
                stroke={colors.ink}
                strokeWidth={5}
              />
              <text
                x={0}
                y={22}
                fill={colors.ink}
                fontSize={60}
                textAnchor="middle"
                fontFamily={fonts.mono}
                fontWeight={800}
              >
                270
              </text>
            </g>
          </g>
          <g opacity={1 - part1}>
            <rect
              x={200 + 270 * 3 - 90}
              y={LINE_Y - 116}
              width={180}
              height={92}
              rx={20}
              fill={alpha(colors.highlight, 0.4)}
              stroke={colors.ink}
              strokeWidth={3}
            />
            <text
              x={200 + 270 * 3}
              y={LINE_Y - 48}
              fill={colors.ink}
              fontSize={60}
              textAnchor="middle"
              fontFamily={fonts.mono}
              fontWeight={800}
            >
              270
            </text>
          </g>

          {/* part 2: a proof is a number too */}
          <g opacity={fadeIn(frame, c1 + 4, 10)}>
            <g
              transform={`translate(${lerp(500, 2200, roll)} ${lerp(330, LINE_Y - 90, roll)}) scale(${lerp(1, 0.5, roll)})`}
            >
              <rect
                x={-220}
                y={-170}
                width={440}
                height={340}
                rx={16}
                fill={colors.paper}
                stroke={colors.ink}
                strokeWidth={5}
                opacity={1 - roll * 0.8}
              />
              <text
                x={0}
                y={-190}
                fill={colors.primary}
                fontSize={40}
                textAnchor="middle"
                fontWeight={700}
                opacity={1 - roll}
              >
                {tx.proof}
              </text>
              {SCROLL.map((l, k) => {
                const t = glide(frame, lineAt(k), fps, 10);
                return (
                  <g key={l} opacity={1 - roll}>
                    <text
                      x={-180}
                      y={-90 + k * 100}
                      fill={colors.ink}
                      fontSize={52}
                      fontFamily={fonts.math}
                      opacity={1 - t}
                    >
                      {l}
                    </text>
                    <rect
                      x={-190}
                      y={-130 + k * 100}
                      width={380}
                      height={64}
                      rx={12}
                      fill={colors.highlight}
                      stroke={colors.ink}
                      strokeWidth={3}
                      opacity={t}
                    />
                    <text
                      x={0}
                      y={-86 + k * 100}
                      fill={colors.ink}
                      fontSize={40}
                      textAnchor="middle"
                      fontFamily={fonts.mono}
                      fontWeight={800}
                      opacity={t}
                    >
                      {["270", "808500", "…"][k]}
                    </text>
                  </g>
                );
              })}
              {/* the whole proof as one number */}
              <g opacity={roll}>
                <rect
                  x={-300}
                  y={-60}
                  width={600}
                  height={120}
                  rx={24}
                  fill={colors.highlight}
                  stroke={colors.ink}
                  strokeWidth={6}
                />
                <text
                  x={0}
                  y={24}
                  fill={colors.ink}
                  fontSize={60}
                  textAnchor="middle"
                  fontFamily={fonts.mono}
                  fontWeight={800}
                >
                  2²⁷⁰·3⁸⁰⁸⁵⁰⁰·…
                </text>
              </g>
            </g>
            {/* and arithmetic points back at it */}
            <path
              d={`M 1110 ${LINE_Y - 130} C 1300 250, 2000 250, 2180 ${LINE_Y - 160}`}
              fill="none"
              stroke={colors.primary}
              strokeWidth={8}
              strokeLinecap="round"
              strokeDasharray={2400}
              strokeDashoffset={2400 * (1 - loop)}
            />
          </g>
        </svg>
      </Camera>
    </SceneShell>
  );
};
