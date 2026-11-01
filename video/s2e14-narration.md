# S2E14 narration script

Voiceover script for *Length and Angle Are a Choice*, generated from `src/s2e14/narration.ts`,
which is the source of truth. Each line is one caption. Condensed from
`lessons/s2/e14-inner-products.md`.

## Cold open: are 1 and x perpendicular?

1. Göttingen, 1908. Schmidt treats functions as arrows.
2. Functions add and scale. So: are 1 and x perpendicular?
3. By coefficients, 1 is (1, 0) and x is (0, 1). Yes.
4. Or multiply them and add up the area from −1 to 1.
5. The halves cancel. Overlap zero: perpendicular again.
6. Now add up from 0 to 1. Nothing cancels.
7. Worked out, the angle is exactly 30 degrees.
8. Three honest answers. They disagree.
9. A vector space can't measure angles. You choose how.

## Title

1. Season two, episode fourteen. Length and angle are a choice.

## Dotting coordinates is not a ruler

1. First idea: pick a basis and dot the coordinates.
2. Here's a basis: b₁ along the floor, b₂ tilted up.
3. In its own coordinates, b₁ = (1, 0) and b₂ = (0, 1).
4. Dot them: zero. The coordinates say perpendicular.
5. The protractor says 45 degrees.
6. Change the basis, the answer changes. Not a real angle.

## The three rules

1. So choose the ruler on purpose. Call it ⟨u, v⟩.
2. Rule one, linear: double u and the overlap doubles.
3. Rule two, symmetric: ⟨u, v⟩ equals ⟨v, u⟩.
4. Rule three, positive: ⟨v, v⟩ > 0 unless v = 0.
5. That's an inner product. Nothing else is assumed.

## Why positive: bowl or saddle

1. Draw ⟨v, v⟩ as a height above every arrow v.
2. The dot product makes a bowl, up everywhere but 0.
3. Some symmetric forms make a saddle instead.
4. A saddle dips below zero: a negative length². Ruled out.
5. An inner product is always a bowl.

## The unit ellipse

1. Every bowl comes from a symmetric matrix G.
2. Slice the bowl at height 1.
3. The rim is G's unit circle: an ellipse.
4. Change G: the bowl tips, the ellipse turns.
5. Each ellipse brings its own right angles.

## The view from inside

1. Now live inside one of these geometries.
2. Stretch the plane until the ellipse is round.
3. Its right-angle pair becomes an ordinary right angle.
4. From inside, every inner product is the dot product.
5. What differs is which arrows count as perpendicular.

## Cauchy–Schwarz, proved

1. One inequality holds for every inner product. Why?
2. Take u and v. Slide along v: the arrow u − tv.
3. Plot its length² against t. It traces a parabola.
4. Positive rule: the parabola never goes below zero.
5. At the bottom, u − tv is perpendicular to v.
6. Never below zero means overlap² ≤ length² × length².
7. Cauchy–Schwarz. Equal only when u lies along v.

## Angles, and the 30° computed

1. So overlap ÷ (length × length) stays between −1 and 1.
2. Call it cos θ. Every inner product gets angles.
3. Back to 1 and x on [0, 1]: overlap ½.
4. Lengths²: 1 for the 1, ⅓ for the x. So cos θ = √3/2.
5. θ = 30°. A real angle between two arrows.

## Rulers without protractors

1. Some rulers measure length but hide no protractor.
2. Taxi length |x| + |y|: the unit circle is a diamond.
3. Chessboard length, the bigger of |x|, |y|: a square.
4. Taxi Pythagoras: the unit square's diagonal is 2.
5. Not √2. Pythagoras fails, so there are no angles.
6. The test: diagonals² against sides², on a balance.
7. Sweep every ruler from diamond to square.
8. Only the round one balances. Jordan–von Neumann, 1935.

## End card

1. A vector space has no ruler. You choose one.
2. Choose an inner product and Euclid comes for free.
3. Next: complex vectors break it. One bar fixes it.
