# S2E33 narration script

Voiceover script for *Distributions*, generated from `src/s2e33/narration.ts`,
which is the source of truth. Each line is one caption. Condensed from
`lessons/s2/e33-distributions.md`.

## Cold open: the Dirac delta

1. Physicists love the Dirac delta, δ(x).
2. Zero everywhere, except one infinitely tall spike.
3. Its area is exactly 1: a point charge, a hammer blow.
4. One problem: no such function exists.
5. Zero except at one point means area 0, not 1.
6. Schwartz noticed δ is only ever used inside integrals.
7. And ∫ δ(x) φ(x) dx is always just φ(0).
8. So let δ be a measurement, not a function.

## Title

1. Season two, episode thirty-three. Distributions.

## The delta as a limit of boxes

1. Try boxes: width 1/n, height n, area 1.
2. Pointwise, they tend to 0 everywhere but one point.
3. In L² they blow up: ‖δₙ‖² = n.
4. But measured against any smooth φ, they settle.
5. ∫ δₙ φ → φ(0). The measurements converge.

## Test functions and distributions

1. Test functions: smooth bumps that vanish outside a box.
2. A distribution: a continuous linear functional on them.
3. Every function f is one: φ ↦ ∫ f φ.
4. The delta is one too: δ(φ) = φ(0).
5. So are measures, and their point masses.
6. Tiny inputs, huge dual: D ⊂ L² ⊂ D′.

## The distributional derivative

1. Integration by parts: ∫ f′φ = −∫ f φ′.
2. Make it the definition: T′(φ) = −T(φ′).
3. Now every distribution has every derivative.
4. The step H: H′(φ) = −∫ φ′ over [0, ∞) = φ(0).
5. So H′ = δ. A jump differentiates into a spike.
6. And limits commute with derivatives, at last.

## Green's functions

1. Green's function: solve LG = δ once.
2. Any source f is a sum of shifted point sources.
3. So u = G ∗ f: add up the responses.
4. On a string: G(x, y) = min(x, y)(1 − max(x, y)).
5. In 3D, G = 1/(4π|x|): a point charge's potential.

## The weak form and Riesz

1. Poisson: −u″ = f, with u = 0 at both ends.
2. Multiply by a test v, integrate: ∫ u′v′ = ∫ f v.
3. a(u, v) = ∫ u′v′ is an inner product on H¹₀.
4. v ↦ ∫ f v is bounded, so Riesz gives exactly one u.
5. Finite elements: solve the same thing on hat functions.
6. The error is ⟂ to the hats: a projection, again.

## Season montage: measurement

1. This season was one story about measurement.
2. Covectors measured arrows. Riesz turned them back.
3. Hahn–Banach: enough measurements to tell things apart.
4. Koopman: study chaos through what you can measure.
5. A function is the way it answers measurements.
6. Answer like a function, and you are one: δ.

## End card

1. Distributions: functions, extended by duality.
2. That's Season 2: spaces, maps, and measurements.
3. Next season: algebra meets linear algebra.
