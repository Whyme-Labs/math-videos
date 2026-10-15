import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, fadeOut, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import { glide, lerp, springIn } from "../../shared/components/motion";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

// Chinese edition only: 《九章算术》方程章 "正负术曰：同名相除，异名相益",
// and Liu Hui's commentary "正算赤，负算黑": red rods for positive, black
// for negative. Rods for +3 and −2 lie on a counting board, then turn into
// the pairs (3, 0) and (0, 2).

const BOARD = { x: 240, y: 270, w: 700, h: 380 };
const ROD_W = 18;
const ROD_H = 170;
const ROD_Y = BOARD.y + 90;
const RED_X = (i: number) => 380 + i * 44;
const BLACK_X = (i: number) => 700 + i * 44;
const SLIP_W = 110;
const SLIP_X = (i: number) => 1420 - i * (SLIP_W + 24); // read right to left
const SLIP_Y = 230;
const SLIP_H = 420;

export const Zhengfu: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("zhengfu");
  const [c0, c1, c2] = cues;
  const redAt = (i: number) => c0 + 10 + i * 6;
  const blackAt = (i: number) => c0 + 34 + i * 6;
  const slipAt = (i: number) => c0 + 60 + i * 12;
  const rodsOut = fadeOut(frame, c2 + 6, 12);
  const pairIn = (i: number) =>
    Math.min(1, springIn(frame, c2 + 14 + i * 8, fps, 11));

  // 3 − (−2): the two black rods cross over and turn red ("异名相益"),
  // then go back for the next line.
  const flip = glide(frame, c0 + 96, fps, 20) - glide(frame, c1 + 2, fps, 16);
  const rod = (x: number, start: number, fill: string, edge: string) => {
    const s = Math.min(1, springIn(frame, start, fps, 12));
    return (
      <div
        key={x}
        style={{
          position: "absolute",
          left: x - ROD_W / 2,
          top: ROD_Y,
          width: ROD_W,
          height: ROD_H,
          borderRadius: 6,
          backgroundColor: fill,
          border: `2px solid ${edge}`,
          opacity: s * rodsOut,
          translate: `0px ${(1 - s) * -80}px`,
        }}
      />
    );
  };

  return (
    <SceneShell id="zhengfu">
      {[0, 1, 2].map((i) => (
        <Sfx key={`r${i}`} name="clink" at={redAt(i) + 6} volume={0.22} />
      ))}
      {[0, 1].map((i) => (
        <Sfx key={`b${i}`} name="clink" at={blackAt(i) + 6} volume={0.22} />
      ))}
      {[0, 1].map((i) => (
        <Sfx key={`s${i}`} name="page" at={slipAt(i)} volume={0.22} />
      ))}
      <Sfx name="whoosh" at={c0 + 96} volume={0.14} />
      <Sfx name="ding" at={c0 + 114} />
      <Sfx name="chime" at={c1 + 6} />
      <Sfx name="whoosh" at={c2 + 6} volume={0.14} />
      <Sfx name="pop" at={c2 + 14} />
      <Sfx name="pop" at={c2 + 22} volume={0.3} />
      <Sfx name="sparkle" at={c2 + 40} />

      <AbsoluteFill>
        {/* counting board */}
        <div
          style={{
            position: "absolute",
            left: BOARD.x,
            top: BOARD.y,
            width: BOARD.w,
            height: BOARD.h,
            borderRadius: 24,
            backgroundColor: alpha(colors.paper, 0.85),
            border: `4px solid ${alpha(colors.wood, 0.8)}`,
            opacity: fadeIn(frame, c0 + 4) * rodsOut,
          }}
        />
        {[0, 1, 2].map((i) =>
          rod(RED_X(i), redAt(i), colors.red, alpha(colors.paper, 0.4)),
        )}
        {[0, 1].map((i) =>
          rod(
            lerp(BLACK_X(i), RED_X(3 + i), flip),
            blackAt(i),
            flip > 0.5 ? colors.red : colors.ink,
            colors.ink,
          ),
        )}
        {[
          { x: RED_X(1), t: tx.positive, c: colors.red, at: c1 + 20 },
          { x: BLACK_X(0) + 22, t: tx.negative, c: colors.ink, at: c1 + 30 },
        ].map((l) => (
          <div
            key={l.t}
            style={{
              position: "absolute",
              left: l.x - 100,
              width: 200,
              top: ROD_Y + ROD_H + 24,
              textAlign: "center",
              fontFamily: fonts.title,
              fontSize: 52,
              color: l.c,
              opacity: fadeIn(frame, l.at) * rodsOut,
              translate: riseIn(frame, l.at, 16),
            }}
          >
            {l.t}
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            left: BOARD.x,
            width: BOARD.w,
            top: BOARD.y + BOARD.h + 20,
            textAlign: "center",
            fontFamily: fonts.math,
            fontSize: 44,
            opacity: fadeIn(frame, c0 + 110) * fadeOut(frame, c1, 10),
          }}
        >
          3 − (−2) = 5
        </div>
        {/* Liu Hui */}
        <div
          style={{
            position: "absolute",
            left: BOARD.x,
            width: BOARD.w,
            top: 150,
            textAlign: "center",
            opacity: fadeIn(frame, c1 + 6) * rodsOut,
            translate: riseIn(frame, c1 + 6, 20),
          }}
        >
          <span style={{ fontSize: 32, color: colors.muted, marginRight: 20 }}>
            {tx.liuHui}
          </span>
          <span
            style={{
              fontFamily: fonts.title,
              fontSize: 56,
              color: colors.primary,
            }}
          >
            “{tx.liuQuote}”
          </span>
        </div>
        {/* the rule, on bamboo slips */}
        {tx.zfRule.map((t, i) => (
          <div
            key={t}
            style={{
              position: "absolute",
              left: SLIP_X(i),
              top: SLIP_Y,
              width: SLIP_W,
              height: SLIP_H,
              borderRadius: 14,
              backgroundColor: alpha(colors.wood, 0.3),
              border: `3px solid ${alpha(colors.wood, 0.8)}`,
              display: "flex",
              justifyContent: "center",
              paddingTop: 34,
              opacity: fadeIn(frame, slipAt(i)),
              translate: `0px ${(1 - Math.min(1, springIn(frame, slipAt(i), fps, 12))) * -60}px`,
            }}
          >
            <span
              style={{
                writingMode: "vertical-rl",
                fontFamily: fonts.title,
                fontSize: 64,
                letterSpacing: 14,
                color: colors.paper,
              }}
            >
              {t}
            </span>
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            left: SLIP_X(1) - 80,
            width: SLIP_X(0) + SLIP_W - SLIP_X(1) + 160,
            top: SLIP_Y + SLIP_H + 24,
            textAlign: "center",
            fontSize: 32,
            color: colors.muted,
            opacity: fadeIn(frame, slipAt(1) + 6),
          }}
        >
          {tx.zfSource}
        </div>

        {/* rods become pairs */}
        {[
          { x: RED_X(1), t: "(3, 0)", c: colors.primary },
          { x: BLACK_X(0) + 22, t: "(0, 2)", c: colors.highlight },
        ].map((p, i) => (
          <div
            key={p.t}
            style={{
              position: "absolute",
              left: p.x - 140,
              width: 280,
              top: ROD_Y + 30,
              textAlign: "center",
              fontFamily: fonts.math,
              fontSize: 76,
              color: p.c,
              opacity: pairIn(i),
              scale: 0.6 + 0.4 * pairIn(i),
            }}
          >
            {p.t}
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            left: BOARD.x,
            width: BOARD.w,
            top: ROD_Y + 170,
            textAlign: "center",
            fontSize: 44,
            fontFamily: fonts.title,
            opacity: fadeIn(frame, c2 + 30),
            translate: riseIn(frame, c2 + 30, 16),
          }}
        >
          <span style={{ color: colors.muted }}>{tx.rulesWritten}</span>
          <span style={{ color: colors.muted, margin: "0 20px" }}>→</span>
          <span style={{ color: colors.primary }}>{tx.rulesProved}</span>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
