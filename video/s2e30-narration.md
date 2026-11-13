# S2E30 narration script

Voiceover script for *Compact Operators*, generated from `src/s2e30/narration.ts`,
which is the source of truth. Each line is one caption. Condensed from
`lessons/s2/e30-compact-operators.md`.

## Cold open: a string and the spectral theorem

1. Pluck a guitar string. You hear one note.
2. It vibrates whole, in halves, thirds, quarters at once.
3. Each shape is a sine with its own pitch: 1, 2, 3, 4, …
4. Episode 18: symmetric matrices have perpendicular axes.
5. An ellipse lines up with its axes: the spectral theorem.
6. A string has infinitely many modes. Does it still work?
7. Not always: some operators have no eigenvectors at all.
8. It survives for almost-finite operators: compact ones.

## Title

1. Season two, episode thirty. Compact operators.

## Why the finite proof fails

1. The finite proof: maximise ⟨Tx, x⟩ on the unit sphere.
2. The maximiser is the top eigenvector. Peel, repeat.
3. Try multiplying by x, on L²[0, 1].
4. Bumps squeeze toward x = 1, and ⟨Mf, f⟩ climbs toward 1.
5. No function gets there. The sphere isn't compact.

## Compact operators

1. Compact: T makes bounded sequences cluster.
2. Example: diag(1, ½, ⅓, …) squashes the unit ball.
3. Its axes shrink: the image is nearly finite-dimensional.
4. The identity isn't compact: e₁, e₂, … stay √2 apart.
5. Compact operators are limits of finite-rank ones.
6. They turn weak limits into real ones: Teₙ → 0.

## The spectral theorem for compact operators

1. Spectral theorem: compact, self-adjoint ⇒ an eigenbasis.
2. Now the maximising sequence works: Txₙ has a limit.
3. So a top eigenvector exists. Peel it off and repeat.
4. The eigenvalues march toward 0 from both sides.
5. Outside any band [−ε, ε] there are only finitely many.
6. Tx = Σ λₖ ⟨x, uₖ⟩ uₖ: Episode 18, infinitely long.

## The Fredholm alternative

1. Fredholm: for compact K, solve u − λKu = f.
2. Either there's exactly one solution for every f…
3. …or u − λKu = 0 has a solution, and f must be ⟂ to it.
4. Example: K(x, y) = xy. It breaks only at λ = 3.
5. Rank–nullity, rescued in infinite dimensions.

## The vibrating string

1. Back to the string: −u″ = λu, with u(0) = u(1) = 0.
2. −d²/dx² isn't bounded, but its inverse G is compact.
3. G's eigenfunctions: sin(nπx). Its eigenvalues: 1/(n²π²).
4. Invert them: frequencies nπ, a ladder up to infinity.
5. Trace of G: ∫ x(1 − x) dx = 1/6. So Σ 1/n² = π²/6 again.

## The Volterra operator

1. Self-adjointness matters. Volterra: Vf(x) = ∫₀ˣ f.
2. V is compact, yet it has no eigenvalues at all.
3. ‖Vⁿ‖ ≤ 1/n!: it shrinks all, and fixes no direction.

## End card

1. Compact means almost finite. The spectral theorem lives.
2. Strings, drums and integral equations break into modes.
3. Next: the spectrum, and quantum mechanics.
