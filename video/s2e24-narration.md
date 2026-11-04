# S2E24 narration script

Voiceover script for *The Continuous Dual*, generated from `src/s2e24/narration.ts`,
which is the source of truth. Each line is one caption. Condensed from
`lessons/s2/e24-continuous-dual.md`.

## Cold open: a measurement you can't trust

1. Ways to measure a function: a value, a slope, an area.
2. Each one is linear: it turns a function into a number.
3. Here's a narrow tent at 0. Its area: 1/200.
4. Narrower: 1/2000. Narrower still. The area goes to 0.
5. By area, these tents are shrinking to nothing.
6. But the value at 0 reads 1, every time.
7. A thermometer that reads 100° on ice isn't a thermometer.
8. Today: keep only the measurements we can trust.

## Title

1. Season two, episode twenty-four. The continuous dual.

## Discontinuous linear functionals

1. Part A's dual held every linear measurement.
2. In finite dimensions, every one of them is continuous.
3. In infinite dimensions, monsters appear: f(x) = Σ k·xₖ.
4. Each eₙ has length 1, but f(eₙ) = n.
5. Tiny changes in, huge changes out. Useless.

## The continuous dual and its norm

1. The continuous dual X* keeps only the bounded ones.
2. A functional's size: its top reading on the unit ball.
3. Its level lines slide outwards until they touch the ball.
4. X* is always complete, even when X isn't.
5. Its completeness comes from the numbers, not from X.

## Hölder's inequality and dual balls

1. Which measurements does ℓᵖ have? Hölder answers.
2. Σ |xₖyₖ| ≤ ‖x‖ₚ ‖y‖ᵣ, when 1/p + 1/r = 1.
3. So every y in ℓʳ measures ℓᵖ.
4. Dual balls: the diamond's partner is the square.
5. The disc is its own partner: p = r = 2.
6. p = 3 pairs with r = 3/2. One fattens as the other thins.

## The dual of ℓᵖ

1. In fact (ℓᵖ)* is exactly ℓʳ, for 1 ≤ p < ∞.
2. The proof tests f on e₁, e₂, …, then fills in by density.
3. Finite sequences are dense in ℓᵖ. That's the key.
4. In ℓ∞ they aren't: (1, 1, 1, …) stays 1 away.
5. So (ℓ∞)* is strictly bigger than ℓ¹.

## The dual of C[0, 1]

1. And the measurements of C[0, 1], with the peak norm?
2. Some read a value: δₜ(f) = f(t).
3. Some average with a weight: ∫ f g.
4. All of them are measures on [0, 1]. Riesz again.

## Is point evaluation continuous?

1. Is the value at a point trustworthy? It depends.
2. With the peak norm: |f(a)| ≤ ‖f‖∞. Yes.
3. With the area norm, the tents break it. No.
4. In L¹, a single point isn't even defined.

## The double dual and reflexivity

1. Measure the measurements: X**.
2. Each x gives one: f ↦ f(x). That's J.
3. When J hits all of X**, X is reflexive.
4. ℓᵖ for 1 < p < ∞: yes. Rounded balls.
5. ℓ¹: no. ℓ∞ holds uncountably many 0–1 sequences, 1 apart.
6. C[0, 1]: no. Its point readings are all 2 apart.

## End card

1. Only continuous measurements count.
2. They form X*, and how big it is depends on the norm.
3. Next: Hahn–Banach. Are there enough of them?
