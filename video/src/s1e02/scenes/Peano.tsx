import type React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
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
import { World, type WorldKind } from "../components/worlds";
import { useStrings } from "../i18n";

const KINDS: WorldKind[] = ["loop", "merge", "ghosts"];
const WX = [380, 960, 1540];
const WY = 255;
const WS = 0.95;
// Where each rule's stamp lands, relative to the world centre (unscaled).
const TARGET = [
  { x: 0, y: 70 },
  { x: 80, y: -20 },
  { x: 0, y: -70 },
];

const CARD_W = 330;
const CARD_H = 190;
const CARD_Y = 520;
const cardX = (i: number) => 91 + i * 352;

const Stamp: React.FC<{ readonly label: string; readonly size?: number }> = ({
  label,
  size = 120,
}) => (
  <div
    style={{
      width: size,
      height: size,
      marginLeft: -size / 2,
      marginTop: -size / 2,
      borderRadius: size / 2,
      border: `6px solid ${colors.orange}`,
      backgroundColor: alpha(colors.orange, 0.2),
      color: colors.orange,
      fontFamily: fonts.title,
      fontWeight: 700,
      fontSize: size * 0.36,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      rotate: "-12deg",
    }}
  >
    {label}
  </div>
);

export const Peano: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("peano");
  const [c0, c1, c2, c3, c4] = cues;

  // Rule i (0-based) fills its card at fill[i]; rules 3–5 then stamp a world.
  const fill = [c1 + 4, c1 + 16, c2 + 2, c3 + 2, c4 + 2];
  const stampWorld = [-1, -1, 0, 1, 2];
  const fly = (i: number) => fill[i] + 14; // stamp leaves the card
  const land = (i: number) => fly(i) + 16; // and hits the world

  return (
    <SceneShell id="peano">
      <Sfx name="page" at={c0 + 6} />
      {fill.map((f, i) => (
        <Sfx key={i} name="pop" at={f} />
      ))}
      {[2, 3, 4].map((i) => (
        <Sfx key={`w${i}`} name="whoosh" at={fly(i)} volume={0.15} />
      ))}
      {[2, 3, 4].map((i) => (
        <Sfx key={`t${i}`} name="thud" at={land(i)} />
      ))}
      <Sfx name="chime" at={land(4) + 10} />
      {KINDS.map((k, w) => (
        <Sfx
          key={`ok${k}`}
          name="tick"
          at={fill[1] + 10 + w * 6}
          volume={0.22}
        />
      ))}
      <QuestionTray />

      <AbsoluteFill>
        <svg width={1920} height={890} style={{ position: "absolute" }}>
          {KINDS.map((kind, w) => {
            const i = w + 2; // the rule that stamps this world
            const hit = land(i);
            const breaking = w < 2 ? ramp(frame, hit + 4, 16) : 0;
            const verdict = w < 2 ? springIn(frame, hit + 18, fps, 9) : 0;
            const active =
              frame >= fill[i] - 6 && frame < (i < 4 ? fill[i + 1] - 6 : 9999);
            return (
              <g
                key={kind}
                transform={`translate(${frame >= hit && frame < hit + 18 ? shake(frame, hit, 10) : 0} 0)`}
              >
                <World
                  kind={kind}
                  x={WX[w]}
                  y={WY}
                  scale={WS}
                  title={tx.worlds[w]}
                  frame={frame}
                  opacity={fadeIn(frame, c0, 10) * (verdict > 0.5 ? 0.55 : 1)}
                  emphasis={active ? 1 : 0}
                  broken={breaking}
                  verdict={verdict}
                />
              </g>
            );
          })}
          {/* All three worlds pass rules 1 and 2. */}
          {KINDS.map((kind, w) => {
            const t = springIn(frame, fill[1] + 10 + w * 6, fps, 9);
            return (
              <text
                key={`ok-${kind}`}
                x={WX[w] + 220 * WS}
                y={WY - 110 * WS}
                fill={colors.green}
                fontSize={56}
                fontWeight={700}
                textAnchor="middle"
                opacity={Math.min(1, t) * fadeOut(frame, c2 - 4, 8)}
                transform={`translate(${WX[w] + 220 * WS} ${WY - 125 * WS}) scale(${t}) translate(${-(WX[w] + 220 * WS)} ${-(WY - 125 * WS)})`}
              >
                ✓
              </text>
            );
          })}
        </svg>

        <div
          style={{
            position: "absolute",
            top: 438,
            width: "100%",
            textAlign: "center",
            fontSize: 36,
            fontFamily: fonts.title,
            color: colors.muted,
            letterSpacing: 2,
            opacity: fadeIn(frame, c0 + 4),
            translate: riseIn(frame, c0 + 4),
          }}
        >
          {tx.peanoTag}
        </div>

        {/* Five rule cards: empty slots first, then filled in turn. */}
        {tx.axioms.map((text, i) => {
          const filled = springIn(frame, fill[i], fps, 11);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: cardX(i),
                top: CARD_Y,
                width: CARD_W,
                height: CARD_H,
                borderRadius: 18,
                border: `3px ${filled > 0.05 ? "solid" : "dashed"} ${filled > 0.05 ? colors.primary : colors.panelEdge}`,
                backgroundColor: alpha(
                  colors.primary,
                  0.08 * Math.min(1, filled),
                ),
                padding: "18px 22px",
                opacity: fadeIn(frame, c0 + 8 + i * 4),
                translate: `0px ${(1 - Math.min(1, springIn(frame, c0 + 8 + i * 4, fps, 12))) * 120}px`,
                scale: 0.92 + 0.08 * Math.min(1, filled),
              }}
            >
              <div
                style={{
                  fontFamily: fonts.title,
                  fontWeight: 700,
                  fontSize: 40,
                  color: i < 2 ? colors.primary : colors.orange,
                }}
              >
                P{i + 1}
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontSize: 34,
                  lineHeight: 1.25,
                  opacity: Math.min(1, filled),
                }}
              >
                {text}
              </div>
            </div>
          );
        })}

        {/* Rules 3, 4, 5 fly up as stamps and hit the world they rule out. */}
        {[2, 3, 4].map((i) => {
          const w = stampWorld[i];
          const t = glide(frame, fly(i), fps, 16);
          const from = { x: cardX(i) + CARD_W / 2, y: CARD_Y + CARD_H / 2 };
          const to = {
            x: WX[w] + TARGET[w].x * WS,
            y: WY + TARGET[w].y * WS,
          };
          const impact = springIn(frame, land(i), fps, 9, 260);
          const visible = frame >= fly(i);
          const leave = i < 4 ? ramp(frame, land(i) + 22, 10) : 0;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: lerp(from.x, to.x, t),
                top: lerp(from.y, to.y, t) - 60 * Math.sin(Math.PI * t),
                opacity: visible ? 1 - leave : 0,
                scale:
                  interpolate(impact, [0, 1], [1.5, 1]) * (1 - 0.3 * leave),
              }}
            >
              <Stamp label={`P${i + 1}`} />
            </div>
          );
        })}

        {/* Induction lands on the ghosts, but how it removes them comes next. */}
        <div
          style={{
            position: "absolute",
            left: WX[2] + 110,
            top: WY + 168,
            fontSize: 40,
            fontFamily: fonts.title,
            color: colors.highlight,
            opacity: fadeIn(frame, land(4) + 10),
            translate: riseIn(frame, land(4) + 10, 20),
          }}
        >
          {tx.why}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
