# S2E25 narration script

Voiceover script for *The Hahn–Banach Theorem*, generated from `src/s2e25/narration.ts`,
which is the source of truth. Each line is one caption. Condensed from
`lessons/s2/e25-hahn-banach.md`.

## Cold open: the limit of 1, 0, 1, 0, …

1. What is the limit of 1, 0, 1, 0, 1, 0, …?
2. Calculus says there isn't one. It never settles.
3. But if you had to pick one number, you'd say ½.
4. And for 1, 0, 0, 1, 0, 0, …, you'd say ⅓.
5. Can we make that official, for every bounded sequence?
6. Banach proved in 1932 that we can.
7. But nobody has ever written one down, and nobody will.
8. Today: proof that enough measurements exist.

## Title

1. Season two, episode twenty-five. The Hahn–Banach theorem.

## Extending by a basis

1. f measures a subspace M. Can we extend it to X?
2. Here M is a line, and f reads the position along it.
3. Any F(x, y) = x + c·y agrees with f on M.
4. In infinite dimensions, a Hamel basis does the same job.
5. But the extensions it builds are usually monsters.
6. We want one that stays continuous: no bigger norm.

## The one-step extension

1. Hahn–Banach: f always extends with the same norm.
2. Add one direction z. All we choose is c = F(z).
3. The rules squeeze c between a sup and an inf.
4. The triangle inequality says the gap never closes.
5. On the ℓ¹ diamond, every c from −1 to 1 works.
6. On the round disc, only c = 0. One tangent line.

## Zorn's lemma

1. One direction at a time, but X has endless directions.
2. Order the partial extensions. Each chain has a top.
3. Zorn's lemma gives a biggest one. It must be all of X.
4. Zorn is the Axiom of Choice in disguise. Remember that.

## Norming functionals

1. Now the payoff. Take any vector, say x₀ = (3, −4).
2. Some f with norm 1 reads its full length: f(x₀) = ‖x₀‖.
3. In ℓ², f = (3/5, −4/5) reads 5.
4. In ℓ¹, f = (1, −1) reads 7.
5. So the norm is the best reading: ‖x‖ = max |f(x)|.
6. And if x ≠ y, some measurement tells them apart.

## Separating convex sets, SVMs and LP

1. Geometric form: a convex set and a point outside it.
2. A hyperplane slides in between: a level set of f.
3. A closed convex set is all its half-planes put together.
4. Without convexity it fails: a circle and its centre.
5. Every line through the centre cuts the circle.
6. Support vector machines look for the widest such gap.
7. In LP, prices ⅖ and ⅕ prove that 14/5 is the best.

## The Banach limit

1. Back to 1, 0, 1, 0, … Average the first n terms.
2. Let p(x) be the top value those averages keep hitting.
3. Extend lim, staying under p: that's a Banach limit L.
4. L ignores a shift, so L(x) + L(Sx) = L(1, 1, 1, …) = 1.
5. So L(x) = ½, and 1, 0, 0, 1, 0, 0, … gets ⅓.
6. But L needs Zorn. No formula for it will ever exist.

## End card

1. There are always enough continuous measurements.
2. They extend, read the norm and separate convex sets.
3. Next: the big three theorems of Banach spaces.
