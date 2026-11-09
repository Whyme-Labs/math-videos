# S2E26 narration script

Voiceover script for *The Big Three Theorems*, generated from `src/s2e26/narration.ts`,
which is the source of truth. Each line is one caption. Condensed from
`lessons/s2/e26-big-three-theorems.md`.

## Cold open: a Fourier series that blows up

1. 1807: Fourier says any function is a sum of waves.
2. For a smooth function, the partial sums close in on it.
3. Surely the same holds for every continuous function?
4. 1873: du Bois-Reymond builds one that blows up at 0.
5. Layer on layer of wiggles, each tuned by hand.
6. 1927: Banach and Steinhaus prove it in a few lines.
7. They never write the bad function down.
8. The secret is completeness. Today: three theorems.

## Title

1. Season two, episode twenty-six. The big three theorems.

## Pointwise bounds aren't enough

1. A family of maps, bounded at every single point.
2. Must they be bounded all together? Not always.
3. Each bump fades at every x, yet the peaks grow like n.
4. Linear maps on finite sequences: fₙ(x) = n·xₙ.
5. Bounded at each x, but ‖fₙ‖ = n. The space has holes.

## Baire's theorem

1. Baire's theorem: a complete space isn't made of dust.
2. Take countably many thin sets: lines, points, dust.
3. Pick a disc that misses the first one.
4. Inside it, a smaller disc that misses the second.
5. The centres are Cauchy, so they land on a point.
6. That point dodges every thin set. In ℚ, it's a hole.

## Uniform boundedness

1. Uniform boundedness turns pointwise bounds into one.
2. Sort the points by bound: Fₙ is where every ‖Tx‖ ≤ n.
3. The Fₙ cover the space, so one of them holds a ball.
4. Shift and scale that ball: every ‖T‖ ≤ 2N / r.
5. Unbounded norms? Then some x is unbounded too.

## The open mapping theorem

1. Open mapping: a bounded map onto Y opens up balls.
2. The image of X's unit ball holds a whole ball of Y.
3. To hit a target y, step closer by halves.
4. The steps form a series, and completeness sums it.
5. So a bounded bijection has a bounded inverse.

## The closed graph theorem

1. Closed graph: if limits of (x, Tx) stay on the graph…
2. …then T is bounded, between Banach spaces.
3. Take d/dx with the sup norm: xⁿ stays at 1.
4. Its slope at 1 is n. Unbounded, yet the graph is closed.
5. No contradiction: C¹ with the sup norm isn't complete.

## A divergent Fourier series

1. Now the Fourier showcase. Sₙ f(0) = ∫ f·Dₙ.
2. Dₙ is the Dirichlet kernel. It grows taller as n grows.
3. The norm of f ↦ Sₙ f(0) is the area under |Dₙ|.
4. Those areas grow like (4/π²) ln n. Slowly, but forever.
5. Unbounded norms, complete space: some f diverges at 0.
6. And most continuous functions do. We never built one.

## No countable Hamel basis

1. One more: Hamel bases. Suppose b₁, b₂, … were enough.
2. Each span Fₙ is closed and paper-thin.
3. Countably many can't cover a Banach space.

## End card

1. Completeness gives three theorems for free.
2. Bounds spread, balls open, closed graphs are bounded.
3. Next: weak convergence, where only readings converge.
