import type React from "react";
import { createContext, useContext } from "react";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Composition, Folder, useVideoConfig } from "remotion";
import { Music } from "./components/Music";
import { Sfx } from "./components/Sfx";
import { LOCALES, LocaleProvider, type Locale } from "./locale";
import { FPS, TRANSITION_FRAMES, type EpisodeTiming } from "./timeline";

// The episode a scene belongs to, so SceneShell and useCues can find its
// captions and cue frames.
const EpisodeContext = createContext<EpisodeTiming<string> | null>(null);

export const useEpisode = () => {
  const timing = useContext(EpisodeContext);
  if (!timing) throw new Error("Scene rendered outside an episode");
  return timing;
};

export type SceneEntry<Id extends string> = {
  readonly id: Id; // narration scene id
  readonly key: string; // composition name, e.g. "ColdOpen"
  readonly name: string; // label in the Studio timeline
  readonly component: React.FC;
};

const Providers: React.FC<{
  readonly timing: EpisodeTiming<string>;
  readonly locale: Locale;
  readonly children: React.ReactNode;
}> = ({ timing, locale, children }) => (
  <EpisodeContext.Provider value={timing}>
    <LocaleProvider locale={locale}>{children}</LocaleProvider>
  </EpisodeContext.Provider>
);

// The whole episode: music, a soft whoosh under every cut, and the scenes
// joined by 12-frame crossfades.
const Film: React.FC<{
  readonly timing: EpisodeTiming<string>;
  readonly scenes: readonly SceneEntry<string>[];
  readonly locale: Locale;
}> = ({ timing, scenes, locale }) => {
  const { fps } = useVideoConfig();
  return (
    <Providers timing={timing} locale={locale}>
      <Music segments={timing.musicSegments(locale)} />
      {scenes.slice(1).map((s) => (
        <Sfx
          key={s.id}
          name="whoosh"
          at={timing.sceneStartFrame(s.id, locale) - 2}
        />
      ))}
      <TransitionSeries>
        {scenes.flatMap((s, i) => [
          i > 0 ? (
            <TransitionSeries.Transition
              key={`fade-${s.id}`}
              presentation={fade()}
              timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
            />
          ) : null,
          <TransitionSeries.Sequence
            key={s.id}
            name={s.name}
            durationInFrames={timing.sceneDuration(s.id, locale)}
            premountFor={fps}
          >
            <s.component />
          </TransitionSeries.Sequence>,
        ])}
      </TransitionSeries>
    </Providers>
  );
};

// Compositions for one episode: the full film in each language (code, and
// code-ZH), plus every scene on its own in folders for previewing.
export const makeEpisodeCompositions = <Id extends string>(
  code: string,
  timing: EpisodeTiming<Id>,
  scenes: readonly SceneEntry<Id>[],
) => {
  // Scenes look timing up by plain string ids at runtime.
  const any = timing as unknown as EpisodeTiming<string>;
  const suffix = (l: Locale) => (l === "en" ? "" : `-${l.toUpperCase()}`);
  const films = LOCALES.map((locale) => {
    const Component: React.FC = () => (
      <Film timing={any} scenes={scenes} locale={locale} />
    );
    return { locale, Component };
  });
  const sceneSets = LOCALES.map((locale) => ({
    locale,
    scenes: scenes.map((s) => {
      const Component: React.FC = () => (
        <Providers timing={any} locale={locale}>
          <s.component />
        </Providers>
      );
      return { ...s, Component };
    }),
  }));

  const Compositions: React.FC = () => (
    <>
      {films.map(({ locale, Component }) => (
        <Composition
          key={locale}
          id={`${code}${suffix(locale)}`}
          component={Component}
          durationInFrames={timing.episodeDuration(locale)}
          fps={FPS}
          width={1920}
          height={1080}
        />
      ))}
      {sceneSets.map(({ locale, scenes: list }) => (
        <Folder key={locale} name={`${code}${suffix(locale)}-Scenes`}>
          {list.map((s) => (
            <Composition
              key={s.key}
              id={`${code}${suffix(locale)}-${s.key}`}
              component={s.Component}
              durationInFrames={any.sceneDuration(s.id, locale)}
              fps={FPS}
              width={1920}
              height={1080}
            />
          ))}
        </Folder>
      ))}
    </>
  );
  return Compositions;
};
