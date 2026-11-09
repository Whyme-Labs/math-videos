# S2E27 narration script

Voiceover script for *Weak Convergence*, generated from `src/s2e27/narration.ts`,
which is the source of truth. Each line is one caption. Condensed from
`lessons/s2/e27-weak-convergence.md`.

## Cold open: the bump that escapes

1. A bump of height 1 sits on an endless line.
2. Let it slide right. One step, ten, a million.
3. Its energy never changes. It's as big as ever.
4. Now plant a sensor anywhere. The bump passes by…
5. …the sensor twitches, then reads 0 forever.
6. Plant a thousand sensors. Every one ends at 0.
7. Every measurement says it's gone. It isn't. It escaped.
8. Today: convergence that only asks the measurements.

## Title

1. Season two, episode twenty-seven. Weak convergence.

## A minimum that isn't attained

1. Episode 20: bounded sequences needn't converge here.
2. Take F(x) = (‖x‖² − 1)² + Σ xₖ² / k².
3. Along e₁, e₂, e₃, …, F drops: 1, ¼, ⅑, … → 0.
4. But nothing reaches 0. The lowest point is missing.
5. We need a weaker kind of convergence.

## Weak convergence and eₙ ⇀ 0

1. xₙ converges weakly to x if f(xₙ) → f(x) for every f.
2. Take eₙ in ℓ². Each f is a probe y in ℓ².
3. f(eₙ) = yₙ, and yₙ → 0 because Σ yₖ² is finite.
4. So eₙ ⇀ 0, though every ‖eₙ‖ is 1.
5. The norm can drop in the limit: ‖x‖ ≤ lim inf ‖xₙ‖.
6. Weak limits are unique. Weak sequences are bounded.

## Three ways mass escapes

1. Mass can escape in three ways.
2. Travelling: a block slides off to infinity.
3. Concentrating: it squeezes into a single point.
4. Oscillating: sin(nx) wiggles faster and faster.
5. All three keep their energy, and all three ⇀ 0.
6. But sin²(nx) ⇀ ½, not 0². Squares don't pass through.

## ℓ¹ is different

1. In ℓ¹ it fails. The probe (1, 1, 1, …) is allowed.
2. It reads every eₙ as 1. The readings never fade.
3. ℓ¹ isn't reflexive, and weak limits buy nothing there.

## Weak* convergence and Banach–Alaoglu

1. Weak*: functionals converge when they agree at each x.
2. δ at 1/n ⇀* δ at 0, though they stay 2 apart.
3. Banach–Alaoglu: the dual's unit ball is weak* compact.
4. Proof for separable X: list x₁, x₂, x₃, …
5. Pick a subsequence that settles at x₁, then x₂, …
6. The diagonal settles everywhere. Cantor's table again.

## The direct method

1. In reflexive spaces, bounded means a weak limit exists.
2. Mazur: a closed convex set keeps its weak limits.
3. So a convex F can only drop at a weak limit.
4. Direct method: slide downhill, take a weak limit, done.
5. G(x) = ‖x‖² − 2Σ xₖ / k is convex. Its minimum: −π²/6.
6. Our first F wasn't convex. Its limit landed too high.

## End card

1. Weak convergence trades the norm for compactness.
2. Mass may escape, but minimisers come back.
3. Next: Hilbert spaces. Geometry with angles again.
