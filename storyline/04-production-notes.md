# Production Notes

## Audience and prerequisites
- **Target viewer:** a curious learner who has seen high-school algebra and
  maybe a first calculus or matrix course, and who wants to know *why*.
  Undergrads revisiting material "the right way" are the second audience.
- **S2 Part B (functional analysis)** assumes comfort with limits,
  series, and integrals. Open each of its episodes with a 60-second "analysis
  recap" card so it stays accessible.
- **S3 Act II (manifolds)** assumes multivariable calculus (partial
  derivatives, line and surface integrals). Ep. 8 re-derives the classical
  theorems, so viewers who half-remember them are fine.
- **No proofs are required to follow along**, but each episode shows at
  least one complete short proof. That way viewers see that the ideas are
  actually earned.

## Episode template (about 15–25 min)
1. **Cold open (≤ 60 s):** a concrete puzzle or paradox. Never a definition.
2. **Naive attempt:** try the obvious thing and watch it fail or get
   strange.
3. **The crisis:** state precisely what's missing.
4. **The construction / idea:** build the fix, with one visual metaphor.
5. **Payoff:** answer the cold-open question.
6. **Zoom out:** connect to one recurring thread (see `00-big-picture.md`).
7. **Teaser:** one unresolved question that a later episode answers.

Optional end card: 3 exercises (one computational, one conceptual, one
"stretch") and a short "common misconceptions" list.

## Brand: Whyme Labs

Every episode is a Whyme Labs production:
- **Opening:** a 4-second sting, where the gradient mark blooms out of a lemon
  glow, the wordmark rises, and "presents" appears.
- **Title card:** the mark above the episode title.
- **Content scenes:** a small mark-and-wordmark watermark in the top-left.
- **End card:** a "Whyme Labs · series name" sign-off.

Logo cut-outs live in `video/public/brand/`.

**Palette:** violet and lemon yellow, like a violet stage lit by a warm
lemon-orange light column. These values are in `video/src/s1e01/theme.ts`.

| Role | Colour |
|---|---|
| Stage background | violet `#16052f` → `#2b0a5a` → `#4a1491` |
| Brand purple | `#613896` |
| Primary (objects, vectors, "built") | lemon `#ffd102` |
| Measurements, remainders, covectors | orange `#ff9702` |
| Open questions, key verdicts | lilac-pink `#f29ad8` |
| Text / muted text | `#fff8ec` / `#c8b6e6` |

## Visual language (keep it consistent across all seasons)
| Concept | Visual motif |
|---|---|
| Equivalence class / quotient | Points blurring into a single glowing blob |
| Bijection / isomorphism | Two objects connected by "threads," then sliding onto each other |
| The number tower | A building that gains a floor per extension; the "what we lost" ledger appears on the side |
| Vectors | Arrows (one consistent colour: lemon) |
| Covectors | Stacks of parallel level lines/planes (contrasting colour: orange) |
| Linear map | A grid transforming smoothly, with gridlines staying straight and parallel |
| Basis / coordinates | A "camera" or "language" overlay that can change while the object stays fixed |
| Diagonal argument | An infinite table with the diagonal lighting up and flipping |
| Invariants | A badge that stays put on screen while the coordinates churn underneath |
| Multilinear map | A machine with several input slots, color-coded vector/covector |
| Norms | Unit balls (diamond / circle / square) morphing as p changes |
| Completion | S1's "zoom in and find holes" animation, replayed with functions |
| Weak convergence | A bump escaping to infinity while fixed probes read 0 |
| Spectrum | Points/regions in the complex plane lighting up as T − λI fails to invert |
| Manifold / charts | Overlapping curved patches peeling off onto flat sheets |
| Tangent spaces | Small translucent planes attached to points, carrying S2's vector/covector colors |
| Differential forms | Fields of level-line stacks (1-forms) and oriented cells (2-forms) |
| Cohomology | A loop snagging on a hole, with its integral stuck at a nonzero value |

## Recurring segments
- **"Build or Describe?"**: a 30-second segment comparing a construction
  with a characterization of the same object.
- **"What did we lose?"**: after each extension (ℕ→ℤ→ℚ→ℝ→ℂ→ℍ→𝕆), and after
  generalizations (field → ring loses bases).
- **Callback stamp:** a small on-screen tag (e.g. "↩ S1E5") whenever an old
  idea comes back, which rewards binge watchers and sends new viewers back.

## Tooling suggestions
- **Animation:** [Manim Community](https://www.manim.community/) is well
  suited to this style (grid transforms, number lines, LaTeX).
  Alternatives: Motion Canvas (TypeScript), or Blender for 3D scenes.
- **Repo layout (proposed):**
  ```
  storyline/          # this plan
  scripts/s1e01/      # narration script + shot list per episode
  scenes/s1e01/       # Manim scene files per episode
  assets/             # shared styles, color palette, fonts
  ```
- Put the shared color palette and the motifs above in one Manim style
  module so every episode looks the same.

## Production order suggestion
1. Make **S1 Ep. 11 (Hilbert's Hotel)** or **S2 Ep. 4 (Matrices as
   shadows)** first. Both are self-contained, very visual, and strong hooks
   for testing the style and audience.
2. Then produce S1 Acts I–II in order, since they set up most callbacks.
3. Side quests make good filler between larger episodes.
