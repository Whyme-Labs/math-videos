import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut } from "../../shared/components/anim";
import { PLUCKS, Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { Clock, CubeFace, Tile } from "../components/props";
import { useStrings } from "../i18n";

// The four rules, each shown on the tile as it's named, each leaving a badge
// in the row along the top. 1: a quarter turn followed by a flip is itself
// one of the eight moves. 2: the "do nothing" card; the tile sits still.
// 3: a turn and its undo bring the tile home. 4: three move cards, regrouped
// with brackets, give the same tile. Then the badges merge into one word,
// "group", and the clock and the cube step up beside the tile wearing it.

const badgeX = (k: number) => (k % 2 ? 1400 : 520);
const badgeY = (k: number) => (k < 2 ? 100 : 196);
const BADGE_Y = 130;
const CARD_Y = 790;

const MoveCard: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly label: string;
  readonly s?: number;
  readonly lit?: boolean;
}> = ({ x, y, label, s = 1, lit = false }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect
      x={-60}
      y={-50}
      width={120}
      height={100}
      rx={18}
      fill={lit ? colors.highlight : colors.paper}
      stroke={colors.ink}
      strokeWidth={5}
    />
    <text
      x={0}
      y={20}
      fill={colors.ink}
      fontSize={56}
      textAnchor="middle"
      fontFamily={fonts.math}
      fontWeight={800}
    >
      {label}
    </text>
  </g>
);

export const Rules: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("rules");
  const [c0, c1, c2] = cues;
  const badgeAt = [c0 + 10, c0 + 100, c1 + 6, c1 + 66];
  // demo 1: turn, then flip, is one move
  const d1turn = glide(frame, c0 + 16, fps, 14);
  const d1flip = glide(frame, c0 + 44, fps, 14);
  const d1merge = glide(frame, c0 + 72, fps, 12);
  // demo 2: do nothing
  const d2 = frame >= c0 + 100 && frame < c1;
  // demo 3: turn and undo
  const d3 = glide(frame, c1 + 10, fps, 14) - glide(frame, c1 + 30, fps, 14);
  // demo 4: regroup
  const d4 = frame >= c1 + 66 ? Math.floor((frame - c1 - 66) / 24) % 2 : 0;
  const d4t = glide(
    frame,
    c1 + 66 + Math.floor(Math.max(0, frame - c1 - 66) / 24) * 24,
    fps,
    10,
  );
  // the payoff
  const merge = glide(frame, c2 + 6, fps, 20);
  const worlds = glide(frame, c2 + 30, fps, 20);
  const tileRot = 90 * d1turn + 90 * d3;
  const tileFlip = d1flip;

  return (
    <SceneShell id="rules">
      {badgeAt.map((t, k) => (
        <Sfx key={k} name="pop" at={t} volume={0.18} />
      ))}
      <Sfx name={PLUCKS[0]} at={c0 + 16} volume={0.14} />
      <Sfx name={PLUCKS[2]} at={c0 + 44} volume={0.14} />
      <Sfx name="ding" at={c0 + 74} volume={0.18} />
      <Sfx name={PLUCKS[1]} at={c1 + 10} volume={0.14} />
      <Sfx name={PLUCKS[4]} at={c1 + 30} volume={0.14} />
      {[0, 1, 2, 3].map((k) => (
        <Sfx key={`g${k}`} name="tick" at={c1 + 66 + k * 24} volume={0.12} />
      ))}
      <Sfx name="whoosh" at={c2 + 6} volume={0.16} />
      <Sfx name="chime" at={c2 + 30} />

      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {/* the badges, collecting along the top; then merging into one */}
        {tx.ruleNames.map((r, k) => {
          const s = Math.min(1, springIn(frame, badgeAt[k], fps, 10));
          return (
            <g
              key={r}
              opacity={s * (1 - merge)}
              transform={`translate(${lerp(badgeX(k), 960, merge)} ${lerp(badgeY(k), BADGE_Y, merge)}) scale(${s * lerp(1, 0.6, merge)})`}
            >
              <rect
                x={-380}
                y={-44}
                width={760}
                height={88}
                rx={20}
                fill={colors.violet}
                stroke={colors.primary}
                strokeWidth={4}
              />
              <circle cx={-340} cy={0} r={22} fill={colors.primary} />
              <text
                x={-340}
                y={10}
                fill={colors.ink}
                fontSize={30}
                textAnchor="middle"
                fontWeight={800}
              >
                {k + 1}
              </text>
              <text
                x={20}
                y={10}
                fill={colors.text}
                fontSize={36}
                textAnchor="middle"
                fontWeight={700}
              >
                {r}
              </text>
            </g>
          );
        })}
        <g
          opacity={merge}
          transform={`translate(960 ${BADGE_Y}) scale(${lerp(0.6, 1, merge)})`}
        >
          <rect
            x={-220}
            y={-56}
            width={440}
            height={112}
            rx={28}
            fill={colors.highlight}
            stroke={colors.ink}
            strokeWidth={6}
          />
          <text
            x={0}
            y={22}
            fill={colors.ink}
            fontSize={66}
            textAnchor="middle"
            fontFamily={fonts.title}
            fontWeight={800}
          >
            {tx.group}
          </text>
        </g>

        {/* the tile and its demos */}
        <Tile
          x={lerp(960, 520, worlds)}
          y={480}
          size={lerp(320, 260, worlds)}
          rot={tileRot}
          flip={tileFlip}
          axis={45}
          outline={worlds < 0.5}
        />
        {/* do nothing: a soft pulse around the still tile */}
        {d2 ? (
          <rect
            x={960 - 200}
            y={480 - 200}
            width={400}
            height={400}
            rx={30}
            fill="none"
            stroke={alpha(colors.green, 0.6)}
            strokeWidth={6}
            opacity={0.5 + 0.5 * Math.sin(frame / 5)}
          />
        ) : null}

        {/* the move cards underneath */}
        <g opacity={fadeIn(frame, c0 + 12, 6) * fadeOut(frame, c0 + 96, 6)}>
          <MoveCard
            x={lerp(800, 960, d1merge)}
            y={CARD_Y}
            label="↻"
            lit={d1turn > 0 && d1turn < 1}
            s={1 - d1merge}
          />
          <MoveCard
            x={lerp(960, 960, d1merge)}
            y={CARD_Y}
            label="⇋"
            lit={d1flip > 0 && d1flip < 1}
            s={1 - d1merge}
          />
          <text
            x={1060}
            y={CARD_Y + 18}
            fill={colors.text}
            fontSize={56}
            fontFamily={fonts.math}
            opacity={1 - d1merge}
          >
            =
          </text>
          <MoveCard
            x={lerp(1180, 960, d1merge)}
            y={CARD_Y}
            label="⤡"
            lit
            s={Math.max(d1merge, fadeIn(frame, c0 + 64, 6))}
          />
        </g>
        <g opacity={d2 ? fadeIn(frame, c0 + 102, 6) : 0}>
          <MoveCard x={960} y={CARD_Y} label="·" lit />
        </g>
        <g opacity={fadeIn(frame, c1 + 8, 6) * fadeOut(frame, c1 + 60, 6)}>
          <MoveCard
            x={880}
            y={CARD_Y}
            label="↻"
            lit={frame >= c1 + 10 && frame < c1 + 30}
          />
          <MoveCard
            x={1040}
            y={CARD_Y}
            label="↺"
            lit={frame >= c1 + 30 && frame < c1 + 50}
          />
        </g>
        <g opacity={fadeIn(frame, c1 + 64, 6) * fadeOut(frame, c2 + 4, 6)}>
          {["a", "b", "c"].map((l, k) => (
            <MoveCard key={l} x={820 + k * 140} y={CARD_Y} label={l} s={0.9} />
          ))}
          {/* the brackets slide from (ab)c to a(bc) and back */}
          {(() => {
            const t = d4 ? d4t : 1 - d4t;
            const left = lerp(760, 900, t);
            const right = lerp(1020, 1160, t);
            return (
              <g stroke={colors.primary} strokeWidth={6} fill="none">
                <path
                  d={`M ${left + 16} ${CARD_Y - 60} Q ${left - 10} ${CARD_Y} ${left + 16} ${CARD_Y + 60}`}
                />
                <path
                  d={`M ${right - 16} ${CARD_Y - 60} Q ${right + 10} ${CARD_Y} ${right - 16} ${CARD_Y + 60}`}
                />
              </g>
            );
          })()}
        </g>

        {/* the other worlds join */}
        <g opacity={worlds}>
          <Clock
            x={1000}
            y={480}
            r={150}
            pos={4 + 3 * Math.max(0, Math.min(1, (frame - c2 - 50) / 20))}
          />
          <CubeFace
            x={1440}
            y={480}
            s={1}
            twist={Math.max(0, (frame - c2 - 50) / 16)}
          />
          {[520, 1000, 1440].map((x) => (
            <g
              key={x}
              transform={`translate(${x} 700) scale(${Math.min(1, springIn(frame, c2 + 40, fps, 10))})`}
            >
              <rect
                x={-90}
                y={-30}
                width={180}
                height={60}
                rx={16}
                fill={colors.highlight}
                stroke={colors.ink}
                strokeWidth={4}
              />
              <text
                x={0}
                y={14}
                fill={colors.ink}
                fontSize={36}
                textAnchor="middle"
                fontFamily={fonts.title}
                fontWeight={800}
              >
                {tx.group}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </SceneShell>
  );
};
