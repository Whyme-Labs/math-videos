import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Camera } from "../../shared/components/Camera";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import {
  glide,
  hop,
  lerp,
  shake,
  springIn,
  typed,
} from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Runner } from "../components/race";
import { useStrings } from "../i18n";

// Goodstein's game. Each number is a tower she climbs: 4, then 26, 41, 60,
// 83, 109, every tower taller than the last. From 19 the second tower shoots
// out of the frame and the third is a wall of 155 digits (4^256 + 3, the
// real value). Then the shadow: every 3 in 2·3² + 2·3 + 2 turns into ω, and
// beside the rising towers the same game is a staircase going down, which
// lands on 0. Last, the book of Peano's axioms gets a red stamp.

const NUMS = [4, 26, 41, 60, 83, 109];
const ORDS = ["ω^ω", "2ω²+2ω+2", "2ω²+2ω+1", "2ω²+2ω", "2ω²+ω+5", "2ω²+ω+4"];
const BASE_Y = 800;
const barX = (k: number) => 320 + k * 256;
const barH = (n: number) => 60 + n * 4.6;
// 4^(4^4) + 3 = 2^512 + 3, the third number of the game from 19
const BIG =
  "13407807929942597099574024998205846127479365820592393377723561443721764030073546976801874298166903427690031858186486050853753882811946569946433649006084099";

const sup = (b: React.ReactNode, e: React.ReactNode) => (
  <>
    {b}
    <sup style={{ fontSize: "0.6em" }}>{e}</sup>
  </>
);

export const Goodstein: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("goodstein");
  const [c0, c1, c2, c3] = cues;
  // part 1: the towers rise
  const barAt = (k: number) =>
    k === 0 ? c0 + 6 : k === 1 ? c0 + 40 : c0 + 100 + (k - 2) * 16;
  const barGrow = (k: number) => glide(frame, barAt(k), fps, 12);
  const h1 =
    frame < c0 + 70
      ? barH(27)
      : lerp(barH(27), barH(26), glide(frame, c0 + 70, fps, 8));
  const part1 = fadeOut(frame, c1, 10);
  const formulas1: { at: number; f: React.ReactNode }[] = [
    { at: c0 + 6, f: <>4 = {sup(2, 2)}</> },
    {
      at: c0 + 40,
      f: (
        <>
          {sup(2, 2)} → {sup(3, 3)} = 27
        </>
      ),
    },
    { at: c0 + 70, f: <>27 − 1 = 26 = 2·{sup(3, 2)} + 2·3 + 2</> },
    { at: c0 + 100, f: <>2·{sup(4, 2)} + 2·4 + 1 = 41</> },
    { at: c0 + 116, f: <>2·{sup(5, 2)} + 2·5 = 60</> },
    { at: c0 + 132, f: <>2·{sup(6, 2)} + 6 + 5 = 83</> },
    { at: c0 + 148, f: <>2·{sup(7, 2)} + 7 + 4 = 109</> },
  ];
  // part 2: from 19
  const part2 = fadeIn(frame, c1 + 2, 10) * fadeOut(frame, c2, 10);
  const shoot = glide(frame, c1 + 30, fps, 14);
  const wall = typed(BIG, frame, c1 + 56, fps, 70);
  const formulas2: { at: number; f: React.ReactNode }[] = [
    { at: c1 + 4, f: <>19 = {sup(2, sup(2, 2))} + 2 + 1</> },
    { at: c1 + 30, f: <>{sup(3, sup(3, 3))} + 3 = 7 625 597 484 990</> },
    { at: c1 + 56, f: <>{sup(4, sup(4, 4))} + 3 =</> },
  ];
  // part 3: the shadow in ω
  const part3 = fadeIn(frame, c2 + 2, 10);
  const swap = (i: number) => springIn(frame, c2 + 16 + i * 6, fps, 10);
  const swapOut = fadeOut(frame, c2 + 50, 10);
  const stairs = fadeIn(frame, c2 + 50, 12);
  const hopAt = (k: number) => c2 + 66 + k * 14;
  const walk = Math.min(6, Math.max(0, (frame - c2 - 66) / 14));
  const kk = Math.min(5, Math.floor(walk));
  const stair = (k: number) =>
    k < 6 ? { x: 760 + k * 175, y: 300 + k * 70 } : { x: 1840, y: 760 };
  const sa = stair(kk);
  const sb = stair(kk + 1);
  const g = hop(walk - kk, sa.x, sa.y, sb.x, sb.y, kk === 5 ? 120 : 40);
  const landAt = c2 + 66 + 14 * 6;
  const shownBars = Math.min(
    6,
    Math.max(0, Math.floor((frame - c2 - 66) / 14) + 1),
  );
  // part 4: the book
  const stamp = springIn(frame, c3 + 46, fps, 9);

  const formula = (list: { at: number; f: React.ReactNode }[]) =>
    list.reduce<React.ReactNode>((acc, x) => (frame >= x.at ? x.f : acc), null);
  const formulaAt = (list: { at: number }[]) =>
    list.reduce((acc, x) => (frame >= x.at ? x.at : acc), -100);
  const formulaBox = (
    list: { at: number; f: React.ReactNode }[],
    opacity = 1,
  ) => (
    <div
      style={{
        position: "absolute",
        top: 70,
        width: "100%",
        textAlign: "center",
        fontFamily: fonts.math,
        fontSize: 64,
        fontWeight: 700,
        color: colors.text,
        opacity,
        scale: lerp(1.08, 1, glide(frame, formulaAt(list), fps, 8)),
      }}
    >
      {formula(list)}
    </div>
  );

  return (
    <SceneShell id="goodstein">
      {NUMS.map((_, k) => (
        <Sfx key={k} name={PLUCKS[k]} at={barAt(k)} volume={0.16} />
      ))}
      <Sfx name="scratch" at={c0 + 70} volume={0.14} />
      <Sfx name="pop" at={c1 + 4} volume={0.16} />
      <Sfx name="riser" at={c1 + 20} volume={0.25} />
      <Sfx name="whoosh" at={c1 + 30} volume={0.2} />
      <Sfx name="thud" at={c1 + 120} volume={0.3} />
      {[0, 1, 2].map((i) => (
        <Sfx key={`w${i}`} name="tick" at={c2 + 16 + i * 6} volume={0.16} />
      ))}
      {[0, 1, 2, 3, 4].map((k) => (
        <Sfx
          key={`h${k}`}
          name={PLUCKS[5 - k]}
          at={hopAt(k) + 14}
          volume={0.14}
        />
      ))}
      <Sfx name="thud" at={landAt} volume={0.4} />
      <Sfx name="chime" at={landAt + 6} />
      <Sfx name="page" at={c3 + 6} volume={0.2} />
      <Sfx name="thud" at={c3 + 46} volume={0.45} />

      {/* part 1: towers rise and she climbs them */}
      <AbsoluteFill style={{ opacity: part1 }}>
        <svg width={1920} height={1080}>
          {NUMS.map((n, k) => {
            const h = (k === 1 ? h1 : barH(n)) * barGrow(k);
            const tag = k === 1 ? (frame < c0 + 70 ? "27" : "26") : String(n);
            return (
              <g key={n} opacity={fadeIn(frame, barAt(k), 6)}>
                <rect
                  x={barX(k) - 90}
                  y={BASE_Y - h}
                  width={180}
                  height={h}
                  rx={10}
                  fill={alpha(colors.violet, 0.75)}
                  stroke={colors.primary}
                  strokeWidth={5}
                />
                <text
                  x={barX(k)}
                  y={BASE_Y - h + 56}
                  fill={colors.primary}
                  fontSize={44}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={700}
                >
                  {tag}
                </text>
              </g>
            );
          })}
          {/* the tags for the moves */}
          <text
            x={barX(1)}
            y={BASE_Y + 50}
            fill={colors.orange}
            fontSize={34}
            textAnchor="middle"
            opacity={fadeIn(frame, c0 + 40) * fadeOut(frame, c0 + 70, 8)}
          >
            {tx.bump}
          </text>
          <text
            x={barX(1)}
            y={BASE_Y + 50}
            fill={colors.red}
            fontSize={34}
            textAnchor="middle"
            opacity={fadeIn(frame, c0 + 70) * fadeOut(frame, c0 + 100, 8)}
          >
            {tx.minus}
          </text>
          {(() => {
            const steps = NUMS.map((_, k) => frame >= barAt(k) + 8).filter(
              Boolean,
            ).length;
            const k = Math.max(0, steps - 1);
            const prev = Math.max(0, k - 1);
            const t = k === 0 ? 1 : Math.min(1, (frame - barAt(k) - 8) / 10);
            const top = (i: number) =>
              BASE_Y - (i === 1 ? h1 : barH(NUMS[i])) * barGrow(i);
            const p = hop(
              Math.max(0, t),
              barX(prev),
              top(prev),
              barX(k),
              top(k),
              60,
            );
            return (
              <Runner
                x={p.x}
                y={p.y}
                color={colors.highlight}
                size={0.7}
                phase={t < 1 ? frame / 2.4 : undefined}
                opacity={fadeIn(frame, c0 + 10)}
              />
            );
          })()}
        </svg>
        {formulaBox(formulas1, fadeIn(frame, c0 + 6))}
        <div
          style={{
            position: "absolute",
            top: 180,
            left: 120,
            fontFamily: fonts.title,
            fontSize: 44,
            color: colors.muted,
            opacity: fadeIn(frame, c0 + 4),
          }}
        >
          {tx.game}
        </div>
      </AbsoluteFill>

      {/* part 2: from 19 the numbers explode */}
      <AbsoluteFill style={{ opacity: part2 }}>
        <Camera zoom={1} x={shake(frame, c1 + 30, 16)} y={0}>
          <svg width={1920} height={1080} style={{ position: "absolute" }}>
            <rect
              x={barX(0) - 90}
              y={BASE_Y - barH(19)}
              width={180}
              height={barH(19)}
              rx={10}
              fill={alpha(colors.violet, 0.75)}
              stroke={colors.primary}
              strokeWidth={5}
              opacity={fadeIn(frame, c1 + 4, 6) * fadeOut(frame, c1 + 56, 10)}
            />
            <text
              x={barX(0)}
              y={BASE_Y - barH(19) + 56}
              fill={colors.primary}
              fontSize={44}
              textAnchor="middle"
              fontFamily={fonts.math}
              fontWeight={700}
              opacity={fadeIn(frame, c1 + 4, 6) * fadeOut(frame, c1 + 56, 10)}
            >
              19
            </text>
            {/* the second tower leaves the frame */}
            <rect
              x={barX(1) - 90}
              y={BASE_Y - 2400 * shoot}
              width={180}
              height={2400 * shoot}
              fill={alpha(colors.orange, 0.8)}
              stroke={colors.highlight}
              strokeWidth={5}
              opacity={fadeOut(frame, c1 + 56, 10)}
            />
          </svg>
        </Camera>
        {formulaBox(formulas2)}
        <div
          style={{
            position: "absolute",
            left: 160,
            right: 160,
            top: 210,
            fontFamily: fonts.mono,
            fontSize: 60,
            lineHeight: 1.25,
            color: colors.highlight,
            wordBreak: "break-all",
            opacity: fadeIn(frame, c1 + 56, 6),
          }}
        >
          {wall}
        </div>
        <div
          style={{
            position: "absolute",
            right: 160,
            top: 700,
            padding: "6px 26px",
            border: `6px solid ${colors.red}`,
            borderRadius: 14,
            fontSize: 52,
            fontWeight: 800,
            color: colors.red,
            rotate: "-6deg",
            backgroundColor: alpha(colors.bg, 0.85),
            opacity: fadeIn(frame, c1 + 120, 4),
            scale: lerp(1.6, 1, Math.min(1, springIn(frame, c1 + 120, fps, 9))),
          }}
        >
          {tx.digits}
        </div>
      </AbsoluteFill>

      {/* part 3: the same game in ω goes down */}
      <AbsoluteFill style={{ opacity: part3 * fadeOut(frame, c3, 12) }}>
        <div
          style={{
            position: "absolute",
            top: 260,
            width: "100%",
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 84,
            fontWeight: 700,
            color: colors.text,
            opacity: swapOut,
          }}
        >
          26 = 2·{sup(<Swap t={swap(0)} />, 2)} + 2·
          <Swap t={swap(1)} /> + 2
          <div
            style={{
              fontFamily: fonts.title,
              fontSize: 44,
              color: colors.green,
              opacity: fadeIn(frame, c2 + 34),
            }}
          >
            {tx.shadow}
          </div>
        </div>
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", opacity: stairs }}
        >
          {/* left: the numbers keep rising */}
          {NUMS.map((n, k) => {
            const h = barH(n) * 0.9;
            return (
              <g key={n} opacity={k < shownBars ? 1 : 0.15}>
                <rect
                  x={110 + k * 100 - 38}
                  y={BASE_Y - h}
                  width={76}
                  height={h}
                  rx={8}
                  fill={alpha(colors.violet, 0.75)}
                  stroke={colors.primary}
                  strokeWidth={4}
                />
                <text
                  x={110 + k * 100}
                  y={BASE_Y - h - 16}
                  fill={colors.primary}
                  fontSize={30}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={700}
                >
                  {n}
                </text>
              </g>
            );
          })}
          {/* right: the ordinals step down */}
          {ORDS.map((o, k) => {
            const p = stair(k);
            return (
              <g key={o} opacity={k < shownBars ? 1 : 0.15}>
                <rect
                  x={p.x - 87}
                  y={p.y}
                  width={175}
                  height={1000}
                  fill={alpha(colors.green, 0.25 + k * 0.05)}
                  stroke={colors.green}
                  strokeWidth={3}
                />
                <text
                  x={p.x}
                  y={p.y + 46}
                  fill={colors.text}
                  fontSize={32}
                  textAnchor="middle"
                  fontFamily={fonts.math}
                  fontWeight={700}
                >
                  {o === "ω^ω" ? (
                    <>
                      ω
                      <tspan dy={-14} fontSize={22}>
                        ω
                      </tspan>
                    </>
                  ) : (
                    o
                  )}
                </text>
              </g>
            );
          })}
          <rect
            x={1765}
            y={760}
            width={400}
            height={300}
            fill={alpha(colors.green, 0.7)}
            transform={`translate(${shake(frame, landAt, 8)} 0)`}
          />
          <text
            x={1820}
            y={830}
            fill={colors.ink}
            fontSize={56}
            textAnchor="middle"
            fontFamily={fonts.math}
            fontWeight={800}
          >
            0
          </text>
          <text
            x={1790}
            y={680}
            fill={alpha(colors.muted, 0.8)}
            fontSize={40}
            textAnchor="middle"
            fontFamily={fonts.math}
            opacity={fadeIn(frame, hopAt(5))}
          >
            …
          </text>
          <Runner
            x={g.x}
            y={g.y}
            color={colors.highlight}
            size={0.7}
            phase={walk > 0 && walk < 6 ? frame / 2.4 : undefined}
          />
        </svg>
      </AbsoluteFill>

      {/* part 4: Peano's axioms can't prove it */}
      <AbsoluteFill style={{ opacity: fadeIn(frame, c3 + 4, 10) }}>
        <svg width={1920} height={1080}>
          <g
            transform={`translate(760 ${lerp(640, 470, glide(frame, c3 + 4, fps, 18))}) rotate(-4)`}
          >
            <rect
              x={-260}
              y={-300}
              width={520}
              height={600}
              rx={18}
              fill={colors.violet}
              stroke={colors.ink}
              strokeWidth={8}
            />
            <rect
              x={-230}
              y={-270}
              width={460}
              height={540}
              rx={10}
              fill="none"
              stroke={colors.primary}
              strokeWidth={4}
            />
            <text
              x={0}
              y={-120}
              fill={colors.primary}
              fontSize={56}
              textAnchor="middle"
              fontFamily={fonts.title}
              fontWeight={800}
            >
              {tx.peano}
            </text>
            {["0 ∈ ℕ", "n ∈ ℕ ⇒ S(n) ∈ ℕ", "…"].map((l, i) => (
              <text
                key={l}
                x={0}
                y={-10 + i * 70}
                fill={colors.paper}
                fontSize={40}
                textAnchor="middle"
                fontFamily={fonts.math}
              >
                {l}
              </text>
            ))}
          </g>
          <g
            opacity={Math.min(1, stamp)}
            transform={`translate(${880 + shake(frame, c3 + 46, 10)} 560) rotate(-14) scale(${lerp(1.8, 1, Math.min(1, stamp))})`}
          >
            <rect
              x={-250}
              y={-60}
              width={500}
              height={110}
              rx={16}
              fill={alpha(colors.bg, 0.6)}
              stroke={colors.red}
              strokeWidth={10}
            />
            <text
              x={0}
              y={22}
              fill={colors.red}
              fontSize={64}
              textAnchor="middle"
              fontWeight={900}
            >
              {tx.cannotProve}
            </text>
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            top: 160,
            right: 160,
            fontFamily: fonts.title,
            fontSize: 50,
            color: colors.text,
            opacity: fadeIn(frame, c3 + 12),
            translate: riseIn(frame, c3 + 12, 16),
          }}
        >
          {tx.kirbyParis}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};

// a 3 that flips over into an ω
const Swap: React.FC<{ readonly t: number }> = ({ t }) => (
  <span
    style={{
      display: "inline-block",
      color: t > 0.5 ? colors.green : colors.text,
      scale: `${Math.abs(Math.cos(Math.PI * Math.min(1, t)))} 1`,
    }}
  >
    {t > 0.5 ? "ω" : "3"}
  </span>
);
