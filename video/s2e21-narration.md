# S2E21 narration script

Voiceover script for *Normed Spaces and Bounded Operators*, generated from `src/s2e21/narration.ts`,
which is the source of truth. Each line is one caption. Condensed from
`lessons/s2/e21-normed-spaces-and-bounded-operators.md`.

## Cold open: three judges, three verdicts

1. A row of spikes on [0, 1], each taller and thinner.
2. The n-th is n tall and 1/n² wide.
3. Do they shrink to zero? Ask three judges.
4. The accountant measures area: 1/(2n). Yes, to zero.
5. The engineer measures energy: always ⅓. No.
6. The inspector measures the peak: n. It explodes.
7. Same functions, three verdicts.
8. In the plane this can't happen. Today: why not.

## Title

1. Season two, episode twenty-one. Normed spaces.

## The rules of a norm

1. A norm is a length with three rules.
2. Zero only for 0. Double x, double it. Triangle rule.
3. Each norm has a unit ball: a diamond, a disc, a square.
4. The triangle rule holds exactly when the ball is convex.
5. A star-shaped ball breaks it. That's not a norm.

## ℓ¹, ℓ², ℓ∞

1. The same rules give a zoo on sequences: ℓ¹, ℓ², ℓ∞.
2. For every sequence: peak ≤ energy ≤ total.
3. (1, ½, ⅓, …) has finite energy but infinite total.
4. (1, 1, 1, …) is bounded, with infinite energy.

## Norms that don't agree

1. Spread a total of 1 evenly over n boxes.
2. The total stays 1. Energy: 1/√n. The peak: 1/n.
3. Two norms agree if each is at most C times the other.
4. For the spikes, peak ÷ area = 2n². No C works.

## In finite dimensions, all norms agree

1. In the plane, every two norms agree. Here's why.
2. Any norm is at most a constant times the usual length.
3. For the other side, look at the unit circle.
4. It's closed and bounded, so the norm has a minimum on it.
5. That value isn't 0. It's the constant we need.
6. One step used finite dimension: the circle is compact.

## Bounded operators

1. Good linear maps respect small: ‖Tx‖ ≤ C‖x‖.
2. The best C is the operator norm. For matrices, σ₁.
3. Bounded and continuous turn out to be the same thing.
4. Differentiation fails: xⁿ has peak 1 but slope n.
5. Charge for steepness too, and it's bounded again.
6. Bounded depends on the map and on both norms.

## One matrix, three norms

1. One matrix, three rulers, three operator norms.
2. A = [1 2; 3 4]. Push each unit ball through it.
3. Diamond rules: 6. Disc rules: 5.46. Square rules: 7.
4. How big a map is depends on how you measure.

## Riesz's lemma

1. Why is the unit ball never compact? Riesz, 1918.
2. Beyond any closed subspace, a unit vector lies far off.
3. At least ½ away. Add it to the subspace, and repeat.
4. Unit vectors, all at least ½ apart, forever.
5. The ball is compact only in finite dimensions.

## Holes in C[0, 1]

1. One more crack. Ramps get steeper and steeper.
2. In area, they crowd closer and closer together.
3. But where they're heading, a step, isn't continuous.
4. With the area norm, continuous functions have holes.

## End card

1. In infinite dimensions, rulers genuinely disagree.
2. Choosing a norm chooses what small means.
3. Next: measure. How big is a set?
