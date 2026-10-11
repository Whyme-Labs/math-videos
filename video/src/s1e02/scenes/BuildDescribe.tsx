import type React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, riseIn } from "../../shared/components/anim";
import { Sfx } from "../../shared/components/Sfx";
import {
  glide,
  lerp,
  ramp,
  springIn,
  typed,
} from "../../shared/components/motion";
import { QuestionTray } from "../../shared/components/QuestionTray";
import { SceneShell, useCues } from "../../shared/components/SceneShell";
import { alpha, colors, fonts } from "../../shared/theme";
import { useStrings } from "../i18n";

const PANEL_W = 720;
const PANEL_H = 500;
const LEFT = 180;
const RIGHT = 1920 - 180 - PANEL_W;
const PANEL_Y = 200;
const SETS = "∅,  {∅},  {∅, {∅}},  …";

export const BuildDescribe: React.FC = () => {
  const frame = useCurrentFrame();
  const tx = useStrings();
  const { fps } = useVideoConfig();
  const cues = useCues("buildDescribe");
  const [c0, c1, c2] = cues;

  // A big 0 under a magnifying glass: what is it made of? Then it shrinks
  // into the Describe panel.
  const lens = ramp(frame, c0 + 10, 50);
  const lensX = lerp(780, 1140, 0.5 - 0.5 * Math.cos(lens * Math.PI * 2));
  const shrink = glide(frame, c1 - 2, fps, 22);
  const zeroX = lerp(960, LEFT + 110, shrink);
  const zeroY = lerp(420, PANEL_Y + 90, shrink);
  const zeroSize = lerp(300, 90, shrink);

  return (
    <SceneShell id="buildDescribe">
      <Sfx name="pop" at={c0 + 4} />
      <Sfx name="whoosh" at={c0 + 10} volume={0.15} />
      <Sfx name="whoosh" at={c1 - 2} volume={0.18} />
      {tx.axioms.map((_, i) => (
        <Sfx key={i} name="tick" at={c1 + 18 + i * 9} volume={0.25} />
      ))}
      <Sfx name="ding" at={c1 + 18 + 5 * 9} volume={0.25} />
      <Sfx name="page" at={c2 + 4} />
      <Sfx name="chime" at={c2 + 50} />
      <QuestionTray />

      <AbsoluteFill>
        {/* Describe panel (lit) */}
        <div
          style={{
            position: "absolute",
            left: LEFT,
            top: PANEL_Y,
            width: PANEL_W,
            height: PANEL_H,
            borderRadius: 28,
            border: `3px solid ${colors.primary}`,
            backgroundColor: alpha(colors.primary, 0.07),
            opacity: fadeIn(frame, c1 + 2),
            scale: 0.94 + 0.06 * springIn(frame, c1 + 2, fps, 12),
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 220,
              top: 50,
              fontSize: 40,
              fontWeight: 700,
              letterSpacing: 6,
              color: colors.primary,
            }}
          >
            {tx.describe}
          </div>
          {tx.axioms.map((a, i) => (
            <div
              key={a}
              style={{
                position: "absolute",
                left: 60,
                top: 170 + i * 62,
                fontSize: 32,
                display: "flex",
                gap: 18,
                opacity: fadeIn(frame, c1 + 14 + i * 9),
                translate: riseIn(frame, c1 + 14 + i * 9, 16),
              }}
            >
              <span style={{ color: colors.green }}>✓</span>
              <span
                style={{
                  color: colors.orange,
                  fontFamily: fonts.title,
                  fontWeight: 700,
                }}
              >
                P{i + 1}
              </span>
              <span>{a}</span>
            </div>
          ))}
        </div>

        {/* Build panel (greyed: coming in E04) */}
        <div
          style={{
            position: "absolute",
            left: RIGHT,
            top: PANEL_Y,
            width: PANEL_W,
            height: PANEL_H,
            borderRadius: 28,
            border: `3px dashed ${colors.panelEdge}`,
            backgroundColor: colors.panel,
            opacity: 0.85 * fadeIn(frame, c2 + 2),
            translate: riseIn(frame, c2 + 2, 40),
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 60,
              top: 50,
              fontSize: 40,
              fontWeight: 700,
              letterSpacing: 6,
              color: colors.muted,
            }}
          >
            {tx.build}
          </div>
          <div
            style={{
              position: "absolute",
              left: 60,
              top: 200,
              fontSize: 44,
              fontFamily: fonts.math,
              color: colors.muted,
            }}
          >
            {typed(SETS, frame, c2 + 12, fps, 20)}
          </div>
          <div
            style={{
              position: "absolute",
              left: 60,
              top: 320,
              fontSize: 32,
              color: colors.muted,
              opacity: fadeIn(frame, c2 + 30),
            }}
          >
            {tx.buildNote}
          </div>
        </div>

        {/* "=" bridge: Dedekind says both give the same ℕ. */}
        <div
          style={{
            position: "absolute",
            left: LEFT + PANEL_W,
            width: RIGHT - LEFT - PANEL_W,
            top: PANEL_Y + PANEL_H / 2 - 50,
            textAlign: "center",
            fontSize: 80,
            fontFamily: fonts.math,
            color: colors.highlight,
            opacity: fadeIn(frame, c2 + 50),
            scale: springIn(frame, c2 + 50, fps, 9),
          }}
        >
          =
        </div>
        <div
          style={{
            position: "absolute",
            top: PANEL_Y + PANEL_H + 40,
            width: "100%",
            textAlign: "center",
            fontSize: 36,
            color: colors.highlight,
            opacity: fadeIn(frame, c2 + 56),
            translate: riseIn(frame, c2 + 56, 16),
          }}
        >
          {tx.sameN}
        </div>

        {/* The big zero and the lens. */}
        <div
          style={{
            position: "absolute",
            left: zeroX,
            top: zeroY,
            translate: "-50% -50%",
            fontFamily: fonts.title,
            fontWeight: 700,
            fontSize: zeroSize,
            lineHeight: 1,
            color: colors.primary,
            opacity: fadeIn(frame, c0 + 2),
            scale: springIn(frame, c0 + 2, fps, 10),
          }}
        >
          0
        </div>
        <div
          style={{
            position: "absolute",
            left: lensX,
            top: 400,
            width: 220,
            height: 220,
            marginLeft: -110,
            marginTop: -110,
            borderRadius: 110,
            border: `10px solid ${colors.muted}`,
            backgroundColor: alpha(colors.bg, 0.55),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 110,
            fontFamily: fonts.title,
            color: colors.highlight,
            opacity: fadeIn(frame, c0 + 8) * (1 - shrink),
          }}
        >
          ?
          <div
            style={{
              position: "absolute",
              left: 170,
              top: 170,
              width: 110,
              height: 22,
              borderRadius: 11,
              backgroundColor: colors.muted,
              rotate: "45deg",
              transformOrigin: "0 50%",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: 650,
            width: "100%",
            textAlign: "center",
            fontSize: 44,
            fontFamily: fonts.title,
            color: colors.highlight,
            opacity: fadeIn(frame, c0 + 20) * (1 - shrink),
          }}
        >
          {tx.madeOf}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
