# Math Videos

A tutorial video series that rebuilds familiar mathematics from a different
angle: instead of starting from rules to memorize, every topic starts from a
question, hits a problem, and invents the structure that solves it.

Two seasons are planned, plus a third that connects them:

| Season | Title | Core question |
|---|---|---|
| 1 | **What Is a Number?** | Where do numbers come from, how big can infinity get, and what's left when we forget what numbers *are* and keep only what they *do*? |
| 2 | **Spaces, Maps, and Measurements** | What does "linear" really mean, which facts about a linear map don't depend on coordinates, and what survives in infinite dimensions (Banach and Hilbert spaces, distributions)? |
| 3 | **Where the Roads Meet** | How groups, fields, and vector spaces turn out to be parts of one picture, and how linear algebra done at every point becomes calculus on curved spaces (manifolds, differential forms, curvature). |

## Lessons

[`lessons/`](lessons/README.md) has full notes for all 65 episodes:
- narration for the cold open
- definitions, proofs, and worked examples
- shot lists
- exercises with answers
- history and references

## Video

[`video/`](video/README.md) is the Remotion project that renders the
episodes. S1E01 to S1E05 are done, each in English and Chinese; their
narration scripts are in `video/s1e0N-narration*.md`. The official
Remotion agent skills are installed in `.claude/skills`, along with two
writing skills, `unslop` (from poteto's pstack) and `humanizer` (blader),
which are used to edit every narration script.

## Storyline documents

- [`storyline/00-big-picture.md`](storyline/00-big-picture.md): the overall
  thesis, the recurring threads, and how the seasons connect
- [`storyline/01-numbers.md`](storyline/01-numbers.md): Season 1, episode by
  episode
- [`storyline/02-linear-algebra.md`](storyline/02-linear-algebra.md): Season
  2, episode by episode (Part A: finite dimensions, including linear
  functionals and multilinear algebra; Part B: functional analysis)
- [`storyline/03-bridges-and-extensions.md`](storyline/03-bridges-and-extensions.md):
  Season 3 (algebra meets linear algebra; manifolds and differential forms;
  category theory), plus optional side quests that go further
- [`storyline/04-production-notes.md`](storyline/04-production-notes.md):
  episode template, visual language, pacing, and audience
