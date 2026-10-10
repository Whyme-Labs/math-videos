# S2E20: What Breaks in Infinite Dimensions

> **Season / Act:** Season 2, Part B, Act VI (Norms and Completeness) · **Target runtime:** 18–22 min ·
> **Prerequisites:** ↩ S2E02 (bases; Hamel bases via Zorn), ↩ S2E03 (the right shift; rank–nullity), ↩ S2E12 (eigenvalues exist over ℂ), ↩ S2E14 (inner products, Cauchy–Schwarz), ↩ S2E18 (spectral theorem, variational proof), ↩ S2E19 (operator norm $\sigma_1$); ↩ S1E11 (Hilbert's Hotel), ↩ S1E15 (Axiom of Choice); limits, convergent series, Bolzano–Weierstrass ·
> **Builds toward:** ↪ S2E21 (norms, bounded operators, Riesz's lemma), ↪ S2E23 (completeness, Schauder bases), ↪ S2E26 (Baire; no countable Hamel basis), ↪ S2E27 (weak compactness), ↪ S2E28–S2E29 (orthonormal bases, Fourier), ↪ S2E30 (compact operators, Fredholm alternative), ↪ S2E31 (spectrum, unbounded operators), ↪ S2E33 (distributions)

## Learning objectives
By the end of this lesson the viewer can:
1. Prove that the right shift is injective but not surjective, and say which step of rank–nullity needs finite dimension.
2. Show that differentiation can turn uniformly tiny functions into huge ones, while every linear map on a finite-dimensional space is "Lipschitz" with a single constant.
3. Explain why a Hamel basis of $\ell^2$ is useless in practice, and state the Baire-category fact that an infinite-dimensional Banach space has no countable Hamel basis.
4. Prove that the closed unit ball of $\ell^2$ is not compact, and give a continuous function on it with no maximum.
5. Prove that "multiply by $x$" on $C[0,1]$ has no eigenvalues, build approximate eigenvectors for it, and name the episode that repairs each failure.

## Cold open
*(Narration draft.)*

Here's the best free lunch in linear algebra. You have a square system of equations, as many equations as unknowns. You check one thing: the only solution of the homogeneous system is zero. Then, for free, every right-hand side has a solution. Uniqueness buys existence. Engineers use this every day without knowing it has a name.

Now take an infinite row of boxes, each holding a number, and a machine that slides every number one box to the right and puts a zero in the first box. Nothing is ever lost: from the output you can read off the input exactly. Uniqueness, check. So every sequence should be an output. But the sequence $1, 0, 0, 0, \dots$ never comes out, because every output starts with zero.

That's one theorem from Part A, broken by a conveyor belt. It's not the only one. For nineteen episodes, every proof quietly used the fact that our spaces had finitely many dimensions. Today we take that training wheel off and watch five of our favorite facts fall over: the free lunch, the niceness of linear maps, the usefulness of bases, the compactness of spheres, and the existence of eigenvectors.

This isn't a disaster. It's a to-do list. Every remaining episode of this season fixes one item on it.

## The story

### 0. Analysis recap (60-second card)
- A sequence $a_n \to a$ if for every $\varepsilon > 0$, eventually $\lvert a_n - a\rvert < \varepsilon$.
- **Bolzano–Weierstrass:** every bounded sequence in $\mathbb R^n$ has a convergent subsequence.
- $\sum_k a_k$ converges if its partial sums converge; for example $\sum 1/k^2 = \pi^2/6$, while $\sum 1/k$ diverges.
- $\sup$ is the least upper bound; a supremum need not be attained ($\sup_{n} (1 - 1/n) = 1$).

### 1. The new spaces

Part A's examples were $\mathbb R^n$, $\mathbb C^n$, and polynomials of bounded degree. Part B lives in spaces like these:
- $\mathbb R^{\mathbb N}$, all real sequences $(x_1, x_2, \dots)$;
- **$\ell^2$**, the square-summable sequences, $\sum_k x_k^2 < \infty$, with the inner product $\langle x, y\rangle = \sum_k x_ky_k$ and length $\lVert x\rVert_2 = \big(\sum_k x_k^2\big)^{1/2}$. (Cauchy–Schwarz from ↩ S2E14, applied to partial sums, shows the series for $\langle x, y\rangle$ converges and $\ell^2$ is closed under addition.)
- $C[0,1]$, continuous functions, measured with the **sup length** $\lVert f\rVert_\infty = \max_{[0,1]}\lvert f\rvert$ (the biggest height of the graph).

$\ell^2$ is "$\mathbb R^n$ with $n = \infty$," and its unit vectors $e_1 = (1, 0, 0, \dots)$, $e_2 = (0, 1, 0, \dots)$, … look like the familiar axes. The naive attempt is to carry Part A over wholesale. Here's what happens.

### 2. Failure 1: injective does not imply surjective

In finite dimensions, rank–nullity (↩ S2E03) says $\dim V = \dim\ker T + \dim\operatorname{im} T$ for $T: V \to V$. So $\ker T = 0$ forces $\dim\operatorname{im} T = \dim V$, and $T$ is onto. That's the free lunch.

> **Proposition.** The right shift $S(x_1, x_2, x_3, \dots) = (0, x_1, x_2, \dots)$ on $\mathbb R^{\mathbb N}$ (or on $\ell^2$) is linear and injective but not surjective. The left shift $L(x_1, x_2, x_3, \dots) = (x_2, x_3, \dots)$ is surjective but not injective. Moreover $LS = I$ but $SL \neq I$.

*Proof.* Linearity is clear: shifting a sum is summing the shifts. *Injective:* if $Sx = 0$ then $(0, x_1, x_2, \dots) = (0, 0, 0, \dots)$, so every $x_k = 0$. *Not surjective:* every output of $S$ has first entry $0$, so $e_1 = (1, 0, 0, \dots)$ is not an output. *$L$ is surjective:* any $y$ equals $L(0, y_1, y_2, \dots)$. *$L$ is not injective:* $Le_1 = 0$. Finally $LSx = L(0, x_1, x_2, \dots) = x$, while $SLx = (0, x_2, x_3, \dots)$, which differs from $x$ when $x_1 \neq 0$. (On $\ell^2$, both maps send $\ell^2$ to itself, since $\lVert Sx\rVert_2 = \lVert x\rVert_2$ and $\lVert Lx\rVert_2 \le \lVert x\rVert_2$.) $\blacksquare$

This is Hilbert's Hotel (↩ S1E11) as a linear map. Which step of rank–nullity broke? "$\dim\operatorname{im}T = \dim V$, so $\operatorname{im}T = V$": a proper subspace can have the same infinite dimension as the whole space. And a one-sided inverse is no longer two-sided: $L$ is a left inverse of $S$ but not a right inverse.

**Repair:** ↪ S2E30. The **Fredholm alternative** says that for $I - K$ with $K$ *compact*, injective ⇔ surjective again. ↪ S2E31 explains what kind of non-invertibility $S$ has: no eigenvalues, yet a whole disk of spectrum.

### 3. Failure 2: linear maps need not be "nice"

In finite dimensions every linear map is tame: $\lVert Ax\rVert \le \sigma_1\lVert x\rVert$ (↩ S2E19), one constant for all inputs.

Now take differentiation $D f = f'$ on continuously differentiable functions on $[0,1]$, with the sup length. Let
$$f_\varepsilon(x) = \varepsilon\sin(x/\varepsilon^2).$$
Then $\lVert f_\varepsilon\rVert_\infty = \varepsilon \to 0$: the functions flatten onto the axis. But
$$f_\varepsilon'(x) = \frac1\varepsilon\cos(x/\varepsilon^2), \qquad \lVert f_\varepsilon'\rVert_\infty = \frac1\varepsilon \to \infty .$$
A linear map took a sequence of functions converging to $0$ and produced a sequence that explodes. No constant $C$ with $\lVert Df\rVert_\infty \le C\lVert f\rVert_\infty$ can exist. In calculus language: **$f_n \to f$ uniformly does not imply $f_n' \to f'$**. Limits and derivatives don't commute.

Restricted to polynomials of degree $\le n$, $D$ *does* have such a constant, but it grows with $n$ (Worked Example 2: the best constant on $[0,1]$ is $2n^2$). Finite-dimensional niceness was real, but it didn't survive $n \to \infty$.

**Repair:** ↪ S2E21 gives this a name (**unbounded**, equivalently **discontinuous**) and shows that boundedness depends on the choice of norm. ↪ S2E26 (closed graph theorem) and ↪ S2E31 (densely defined unbounded operators) show how to live with $D$ anyway. ↪ S2E29 diagonalizes it with Fourier series; ↪ S2E33 makes it continuous on distributions.

### 4. Failure 3: Hamel bases are useless

> **Definition.** A **Hamel basis** of a vector space $V$ is a linearly independent set $B$ such that every $v \in V$ is a *finite* linear combination of elements of $B$.

This is S2E02's definition of a basis, and with the Axiom of Choice every vector space has one (Zorn's lemma, ↩ S1E15). So $\ell^2$ has a Hamel basis. Can you name one?

The obvious candidate fails. The span of $e_1, e_2, e_3, \dots$ (finite combinations only) is $c_{00}$, the sequences with finitely many nonzero entries. But
$$x = \big(1, \tfrac12, \tfrac13, \tfrac14, \dots\big) \in \ell^2 \quad\text{since}\quad \sum 1/k^2 = \pi^2/6 < \infty,$$
and $x$ has infinitely many nonzero entries, so it is not a finite combination of the $e_k$. We *want* to write $x = \sum_k \tfrac1k e_k$: the truncations $x^{(N)} = (1, \dots, \tfrac1N, 0, \dots)$ are finite combinations with $\lVert x - x^{(N)}\rVert_2 = (\sum_{k>N}k^{-2})^{1/2} \approx 0.308$ for $N = 10$ and $\approx 0.0316$ for $N = 1000$. But an infinite sum is a limit, and the algebra of Part A has no limits.

Any Hamel basis of $\ell^2$ is a non-constructive object that no one can write down. Worse, it is necessarily enormous:

> **Theorem (via Baire).** An infinite-dimensional Banach space (a complete normed space, ↪ S2E23) has no countable Hamel basis. In particular $\ell^2$ does not.

*Sketch (full proof in ↪ S2E26).* Suppose $b_1, b_2, \dots$ were a countable Hamel basis. Then the space is the union of the finite-dimensional subspaces $F_n = \operatorname{span}(b_1, \dots, b_n)$. Each $F_n$ is closed (↪ S2E21) and contains no ball (a ball around a point of $F_n$ contains points off $F_n$, e.g. the point plus a small multiple of $b_{n+1}$). The **Baire category theorem** says a complete space is never a countable union of closed sets with empty interior. Contradiction. $\blacksquare$

So in the spaces that matter, a Hamel basis is uncountable and invisible, and coordinates with respect to it are useless. (They are worse than useless: S2E24 uses one to build discontinuous linear functionals.) The fix is to allow **infinite sums** $\sum_k c_kb_k$, which means we need a notion of distance (S2E21) and a guarantee that limits exist (S2E23).

**Repair:** ↪ S2E23 (Schauder bases), ↪ S2E28 (orthonormal bases of Hilbert spaces), ↪ S2E29 (Fourier series: $e^{inx}$ as a basis in the infinite-sum sense).

### 5. Failure 4: the unit ball is not compact

In $\mathbb R^n$ the closed unit ball is compact: by Bolzano–Weierstrass every sequence in it has a convergent subsequence. This is the engine behind "a continuous function on the sphere attains its maximum," which S2E18 used to find the top eigenvalue of a symmetric matrix as the maximum of $\langle Ax, x\rangle$ on the unit sphere.

> **Theorem.** The closed unit ball $B = \lbrace x \in \ell^2 : \lVert x\rVert_2 \le 1\rbrace$ is not (sequentially) compact: the sequence $e_1, e_2, e_3, \dots$ in $B$ has no convergent subsequence.

*Proof.* Each $e_n$ has $\lVert e_n\rVert_2 = 1$, so it lies in $B$. For $n \neq m$, $e_n - e_m$ has one entry $1$, one entry $-1$, and zeros elsewhere, so
$$\lVert e_n - e_m\rVert_2 = \sqrt{1^2 + (-1)^2} = \sqrt2 .$$
Suppose a subsequence $e_{n_1}, e_{n_2}, \dots$ converged to some $y$. Then for large $j$, $\lVert e_{n_j} - y\rVert_2 < \tfrac{\sqrt2}{2}$, and for two such indices $j \neq k$ the triangle inequality gives
$$\sqrt2 = \lVert e_{n_j} - e_{n_k}\rVert_2 \le \lVert e_{n_j} - y\rVert_2 + \lVert y - e_{n_k}\rVert_2 < \sqrt2,$$
a contradiction. $\blacksquare$

Infinitely many points on the unit sphere, pairwise $\sqrt2$ apart, never crowding together. The consequence for optimization is real: Worked Example 3 gives a continuous function on $B$, of the form $\langle Ax, x\rangle$ with a diagonal "matrix" $A$, whose supremum is never attained. S2E18's variational proof of the spectral theorem breaks at the first step.

**Repair:** ↪ S2E21 (Riesz's lemma: this is not a quirk of $\ell^2$; *every* infinite-dimensional normed space has a non-compact unit ball), ↪ S2E27 (weak convergence: $e_n \rightharpoonup 0$, and compactness returns in a weaker sense), ↪ S2E30 (compact operators, for which the spectral theorem survives).

### 6. Failure 5: eigenvalues can vanish

Over ℂ every linear map on a finite-dimensional space has an eigenvalue (↩ S2E12): $\det(T - \lambda I)$ is a polynomial, and polynomials have roots. In infinite dimensions there is no determinant, and the guarantee disappears, even for the nicest possible operator.

> **Proposition.** The operator $(Mf)(x) = x f(x)$ on $C[0,1]$ (real or complex valued) has no eigenvalues.

*Proof.* Suppose $Mf = \lambda f$, i.e. $(x - \lambda)f(x) = 0$ for all $x \in [0,1]$. For every $x \neq \lambda$ we can divide by $x - \lambda$, so $f(x) = 0$. Thus $f$ vanishes on $[0,1]$ except possibly at the single point $\lambda$. Since $f$ is continuous and $[0,1] \setminus \lbrace\lambda\rbrace$ is dense in $[0,1]$, $f(\lambda) = \lim_{x \to \lambda} f(x) = 0$ too. So $f = 0$, and $\lambda$ is not an eigenvalue. $\blacksquare$

Complex $\lambda$ fail too, so this isn't a field problem. And $M$ is as "symmetric" as an operator can be: $\int_0^1 (xf)g = \int_0^1 f(xg)$, so $\langle Mf, g\rangle = \langle f, Mg\rangle$ for $\langle f, g\rangle = \int_0^1 fg$ (↩ S2E14). A symmetric operator with *no* eigenvectors: S2E18's spectral theorem fails in its naive form.

The discrete picture explains why. Sample $[0,1]$ at $n$ points $x_1, \dots, x_n$; then $M$ becomes the diagonal matrix $\operatorname{diag}(x_1, \dots, x_n)$, whose eigenvectors are the spikes $e_k$ (a 1 at the point $x_k$, zero elsewhere). As $n \to \infty$, the would-be eigenvectors become infinitely thin spikes at a point: not continuous functions, not even honest functions. But *approximate* eigenvectors exist (Worked Example 4): narrow tents at $\lambda$ with $\lVert(M - \lambda)f\rVert_\infty$ as small as you like.

**Repair:** ↪ S2E31 replaces eigenvalues by the **spectrum** $\sigma(M) = [0,1]$, every point of it an approximate eigenvalue, and proves the spectral theorem in "multiplication operator" form. ↪ S2E33 gives the infinitely thin spike a home: it's the Dirac delta, a distribution.

### 7. Payoff: the to-do list

| # | Part A fact | Infinite-dimensional failure | Repaired in |
|---|---|---|---|
| 1 | injective ⇔ surjective | right shift $S$ | S2E30 (Fredholm alternative), S2E31 (spectrum of $S$) |
| 2 | every linear map is bounded | $D(\varepsilon\sin(x/\varepsilon^2))$ explodes | S2E21 (bounded ⇔ continuous), S2E26, S2E31 (unbounded operators), S2E33 |
| 3 | bases give coordinates | Hamel bases are uncountable and unconstructible | S2E23 (Schauder bases), S2E28 (orthonormal bases), S2E29 (Fourier) |
| 4 | the unit ball is compact | $e_n$ pairwise $\sqrt2$ apart | S2E21 (Riesz's lemma), S2E27 (weak compactness), S2E30 (compact operators) |
| 5 | eigenvalues exist over ℂ | $Mf = xf$ has none | S2E31 (spectrum), S2E33 (δ as a generalized eigenvector) |

That answers the cold open: the free lunch was rank–nullity, a statement about *finite* numbers. Every item fails for the same reason: Part A's algebra did all the work, and in infinite dimensions algebra alone is too weak.

**Zoom out (thread 1, extend to repair a defect).** What's missing is **topology**: a notion of closeness, so that infinite sums and approximate eigenvectors make sense, and a guarantee that limits exist. That is the Season 1 story ℚ → ℝ (↩ S1E07–S1E08), one level up. Part B is the construction of those two repairs and everything they buy.

**Teaser.** We called $\varepsilon\sin(x/\varepsilon^2)$ "small" because its graph is low; measured by its slope it's huge. Which ruler is right? Next episode: a function space carries many rulers that, unlike in $\mathbb R^n$, genuinely disagree, and S2E14's diamond and square come back as main characters.

## Worked examples

### Example 1: The shift, its truncations, and a lost first box
Take $x = (1, 2, 3, 4, \dots)$ in $\mathbb R^{\mathbb N}$.
- $Sx = (0, 1, 2, 3, \dots)$ and $LSx = (1, 2, 3, \dots) = x$. ✓
- $Lx = (2, 3, 4, \dots)$ and $SLx = (0, 2, 3, 4, \dots) \neq x$: the first entry is lost. $SL$ is the projection that zeroes the first coordinate, and its image, $\operatorname{im}S = \lbrace x : x_1 = 0\rbrace$, is a proper subspace "as big as" the whole space.

**Truncations.** Cut the shift down to $\mathbb R^n$: $S_n(x_1, \dots, x_n) = (0, x_1, \dots, x_{n-1})$. Its matrix has 1's just *below* the diagonal; it is the transpose of the Jordan block $J_n(0)$ from ↩ S2E13. $S_n$ pushes $x_n$ off the end, so $S_ne_n = 0$: $S_n$ is not injective, and indeed $S_n^n = 0$ (nilpotent). Every truncation loses information off the far end; the infinite shift has no far end.

**On $\ell^2$.** For $y = (1, \tfrac12, \tfrac14, \tfrac18, \dots)$, $\lVert y\rVert_2^2 = \sum_{k\ge0}4^{-k} = \tfrac43$, and $\lVert Sy\rVert_2^2 = 0 + \tfrac43$. ✓ So $S$ is an **isometry** of $\ell^2$ (it preserves lengths and inner products) that is not onto. In finite dimensions an isometry from a space to itself is automatically onto (unitary, ↩ S2E15).

### Example 2: How fast does the "constant" for $D$ grow?
**The wiggle.** For $\varepsilon = 0.1$: $f(x) = 0.1\sin(100x)$, $\lVert f\rVert_\infty = 0.1$, $\lVert f'\rVert_\infty = \lVert 10\cos(100x)\rVert_\infty = 10$. For $\varepsilon = 0.01$: $\lVert f\rVert_\infty = 0.01$ and $\lVert f'\rVert_\infty = 100$. The ratio $\lVert f'\rVert/\lVert f\rVert = 1/\varepsilon^2$ goes $100, 10^4, \dots$ (Both suprema are attained on $[0,1]$, since $x/\varepsilon^2$ sweeps through more than a full period.)

**Polynomials.** On $\mathcal P_n$ (degree $\le n$) with the sup length on $[0,1]$, $D$ is a linear map of a finite-dimensional space, so some constant works. A first lower bound: $p(x) = x^n$ has $\lVert p\rVert_\infty = 1$ and $\lVert p'\rVert_\infty = \lVert nx^{n-1}\rVert_\infty = n$. Better: the shifted Chebyshev polynomial $p(x) = T_n(2x - 1)$ satisfies $\lvert p\rvert \le 1$ on $[0,1]$, while $p'(1) = 2T_n'(1) = 2n^2$. For $n = 3$: $p(x) = 4(2x-1)^3 - 3(2x-1)$, so $p'(x) = 24(2x-1)^2 - 6$, and $p'(1) = 18 = 2\cdot 3^2$ while $\max_{[0,1]}\lvert p\rvert = 1$. Markov's inequality (1889) says $2n^2$ is the best constant on $[0,1]$. The constant exists in each $\mathcal P_n$ but grows without bound, so on all polynomials there is none.

### Example 3: A continuous function on the unit ball with no maximum
On $\ell^2$, let
$$F(x) = \sum_{k=1}^\infty\Big(1 - \frac1k\Big)x_k^2 = \langle Ax, x\rangle, \qquad A = \operatorname{diag}\big(0, \tfrac12, \tfrac23, \tfrac34, \dots\big).$$
**Continuity.** $\lvert F(x) - F(y)\rvert \le \sum_k\lvert x_k^2 - y_k^2\rvert = \sum_k\lvert x_k - y_k\rvert\lvert x_k + y_k\rvert \le \lVert x - y\rVert_2\lVert x + y\rVert_2$ by Cauchy–Schwarz.

**Supremum.** For $\lVert x\rVert_2 \le 1$ and $x \neq 0$, some $x_k \neq 0$, and since every weight is $< 1$, $F(x) < \sum_k x_k^2 \le 1$. Also $F(0) = 0 < 1$. But $F(e_k) = 1 - \tfrac1k \to 1$. So $\sup_B F = 1$ and **no point attains it**.

In S2E18 language: the "top eigenvalue" of $A$ should be $\max_{\lVert x\rVert = 1}\langle Ax, x\rangle$, but the maximizing sequence $e_k$ escapes to infinity instead of converging. The candidate eigenvalue $1$ is not an eigenvalue ($Ax = x$ forces $(1 - \tfrac1k - 1)x_k = 0$ for all $k$, so $x = 0$). It will be in the *spectrum* (↪ S2E31).

### Example 4: Approximate eigenvectors of "multiply by $x$"
Fix $\lambda = 0.3$ and let $f_n(x) = \max\big(0,\ 1 - n\lvert x - 0.3\rvert\big)$, a tent of height 1 on $[0.3 - \tfrac1n, 0.3 + \tfrac1n]$ (inside $[0,1]$ for $n \ge 4$).

Then $\lVert f_n\rVert_\infty = 1$, and $(M - 0.3)f_n(x) = (x - 0.3)f_n(x)$. On the tent, with $t = \lvert x - 0.3\rvert \in [0, \tfrac1n]$, its absolute value is $t(1 - nt)$, a downward parabola maximized at $t = \tfrac1{2n}$ with value $\tfrac1{2n}\cdot\tfrac12 = \tfrac1{4n}$. So
$$\lVert(M - 0.3)f_n\rVert_\infty = \frac1{4n}: \quad 0.025,\ 0.0025,\ 0.00025\ \text{ for } n = 10, 100, 1000 .$$
The equation $Mf = 0.3f$ has no nonzero solution, but it has solutions up to any error you like. The tents converge to nothing in $C[0,1]$; they are trying to become a spike at $0.3$.

## Visual and animation notes
1. **Analysis recap card** (60 s): an $\varepsilon$-band around a limit; a bounded sequence in a disk with a convergent subsequence lighting up.
2. **Cold open.** An infinite conveyor of boxes (motif: *Linear map* as a machine); every number slides right, the first box stays empty forever. Hilbert's Hotel stamp ↩ S1E11. A "free lunch" card for rank–nullity cracks.
3. **The ledger.** A "What did we lose?" ledger with five empty lines, filling in one per section; it stays on screen through the episode.
4. **Truncation vs. infinity.** The finite shift $S_n$ drawn as $n$ boxes with the last number falling off the end into a bin (↩ S2E13 Jordan ladder); then $n$ grows and the end recedes off-screen, the bin vanishes, nothing is lost.
5. **The wiggle.** $\varepsilon\sin(x/\varepsilon^2)$ flattening toward the axis while, in a second panel, its derivative grows taller and denser. Meters: "size" → 0, "size of derivative" → ∞.
6. **Hamel vs. infinite sums.** $(1, \tfrac12, \tfrac13, \dots)$ as a bar chart that finite combinations fill from the left but never finish.
7. **Non-compact ball (key visual).** In 3D, points on a sphere with a subsequence circling in. Then $e_1, e_2, e_3, \dots$ appear one by one, each joined to all previous ones by edges labelled $\sqrt2$; a "subsequence detector" never locks on.
8. **Missing maximum.** A height meter for $F(e_k) = 1 - \tfrac1k$ creeping toward a dashed line at 1 that it never touches; ↩ S2E18 stamp on "maximize on the sphere."
9. **Multiply by $x$.** $\operatorname{diag}(x_1, \dots, x_n)$ with spike eigenvectors thinning to nothing as $n$ grows; then a tent at $0.3$ narrowing, meter $\lVert(M - 0.3)f_n\rVert \to 0$. Preview of the *Spectrum* motif: $[0,1]$ lights up (↪ S2E31).
10. **Payoff.** The completed ledger; each line sprouts an arrow to its repair episode (↪ S2E21, S2E23, S2E26, S2E27, S2E30, S2E31, S2E33).

## Common misconceptions
- **Misconception:** Infinite-dimensional linear algebra is linear algebra with bigger matrices. **Reality:** the theorems that used counting (rank–nullity, determinants, compact spheres) fail, and new structure (norms, completeness) must replace them.
- **Misconception:** $e_1, e_2, e_3, \dots$ is a basis of $\ell^2$. **Reality:** not in the Hamel sense: its span is $c_{00}$. It is a basis in the infinite-sum (Schauder / orthonormal) sense, which requires limits (↪ S2E23, S2E28).
- **Misconception:** Every linear map is continuous. **Reality:** true in finite dimensions; differentiation is a linear map under which uniformly tiny functions have huge images.
- **Misconception:** A bounded sequence always has a convergent subsequence. **Reality:** Bolzano–Weierstrass is a finite-dimensional theorem; $(e_n)$ in $\ell^2$ is bounded with no convergent subsequence.
- **Misconception:** Operators without eigenvalues must be pathological. **Reality:** "multiply by $x$" is symmetric and as simple as an operator gets. The notion of eigenvalue is what's too narrow (↪ S2E31).

## Exercises
- **Warm-up (computational).**
  1. Compute $S^2L^2x$ and $L^2S^2x$ for $x = (1, 2, 3, \dots)$. Which one is $x$?
  2. Decide which sequences lie in $\ell^2$: $(1/k)$, $(1/\sqrt k)$, $(2^{-k})$, $(k\,2^{-k})$.
- **Core (conceptual).**
  3. Show that every $\lambda$ with $\lvert\lambda\rvert < 1$ is an eigenvalue of the left shift $L$ on $\ell^2$. Contrast with $S$, which has none.
  4. Show that the unit ball of $C[0,1]$ (sup length) is not compact, using tents with disjoint supports.
- **Stretch (proof or exploration).**
  5. Show that the closed unit ball of $\ell^2$ cannot be covered by finitely many balls of radius $\tfrac12$. (So it is not *totally bounded*.)

<details><summary>Hints and answers</summary>

1. $L^2x = (3, 4, 5, \dots)$, $S^2L^2x = (0, 0, 3, 4, \dots) \neq x$. $S^2x = (0, 0, 1, 2, \dots)$, $L^2S^2x = x$. ✓
2. $(1/k)$: yes ($\pi^2/6$). $(1/\sqrt k)$: no ($\sum 1/k$ diverges). $(2^{-k})$: yes. $(k2^{-k})$: yes ($k^2 4^{-k}$ is summable, e.g. by the ratio test).
3. $L(1, \lambda, \lambda^2, \dots) = (\lambda, \lambda^2, \dots) = \lambda(1, \lambda, \dots)$, and $\sum\lvert\lambda\rvert^{2k} < \infty$. For $S$: $Sx = \lambda x$ gives $0 = \lambda x_1$ and $x_{k} = \lambda x_{k+1}$; if $\lambda = 0$ then $Sx = 0$ so $x = 0$; if $\lambda \neq 0$ then $x_1 = 0$, then $x_2 = 0$, and so on.
4. Tents $g_n$ of height 1 supported on $[2^{-n}, 2^{-n+1}]$ have disjoint supports, so $\lVert g_n - g_m\rVert_\infty = 1$ for $n \ne m$; no subsequence is Cauchy.
5. A ball of radius $\tfrac12$ contains at most one $e_n$, since two would be at distance $\le 1 < \sqrt2$. Infinitely many $e_n$ need infinitely many balls.
</details>

## Historical note
Around 1900, Ivar Fredholm solved integral equations $f(x) - \int K(x,y)f(y)\,dy = g(x)$ by treating them as limits of finite linear systems, and found that for these operators the finite-dimensional "uniqueness ⇔ existence" survives (his 1903 paper in *Acta Mathematica*). David Hilbert, inspired by Fredholm, developed between 1904 and 1910 a theory of quadratic forms in infinitely many variables, and found that besides discrete eigenvalues there can be a continuous part of the spectrum, the phenomenon behind failure 5. Erhard Schmidt in 1908 gave the sequence space we now call $\ell^2$ its Euclidean geometry. Georg Hamel in 1905 used a well-ordering (the Axiom of Choice) to build a basis of ℝ over ℚ, and with it a discontinuous solution of $f(x + y) = f(x) + f(y)$. The Baire category theorem goes back to René Baire's 1899 thesis. Frigyes Riesz proved in 1918 that the unit ball is compact only in finite dimensions, and Stefan Banach's 1932 book collected the subject into the theory of complete normed spaces, much of it worked out in conversation in the Scottish Café in Lwów, where open problems went into a notebook kept at the café, with prizes such as a live goose.

## Connections
- **Callbacks:** ↩ S1E07–S1E08 (holes in ℚ; completion), ↩ S1E11 (Hilbert's Hotel), ↩ S1E15 (Axiom of Choice, Zorn), ↩ S2E02 (bases, Hamel bases), ↩ S2E03 (the shift; rank–nullity), ↩ S2E12 (eigenvalues exist over ℂ), ↩ S2E13 (truncated shift is a Jordan block), ↩ S2E14 (inner products, Cauchy–Schwarz), ↩ S2E18 (spectral theorem; maximizing on the sphere), ↩ S2E19 (operator norm; the Part A cliffhanger)
- **Sets up:** ↪ S2E21 (norms; bounded ⇔ continuous; Riesz's lemma), ↪ S2E23 (completeness; Schauder bases), ↪ S2E24 (discontinuous functionals from Hamel bases), ↪ S2E26 (Baire: no countable Hamel basis; open mapping, closed graph), ↪ S2E27 (weak convergence; $e_n \rightharpoonup 0$), ↪ S2E28–S2E29 (orthonormal bases; Fourier), ↪ S2E30 (compact operators; Fredholm alternative), ↪ S2E31 (spectrum of $S$ and of $M$; unbounded operators), ↪ S2E33 (δ as the missing eigenvector)
- **Side quests:** *Operator algebras* (attaches after S2E31: the shift generates the Toeplitz algebra, a starting point of index theory); *Kernel methods and RKHS* (attaches after S2E30: Hilbert spaces where point evaluation is continuous)

## References
- **Primary / historical:**
  - I. Fredholm, "Sur une classe d'équations fonctionnelles," *Acta Mathematica* 27 (1903).
  - D. Hilbert, *Grundzüge einer allgemeinen Theorie der linearen Integralgleichungen*, Teubner, Leipzig, 1912 (collecting his six communications of 1904–1910).
  - E. Schmidt, "Über die Auflösung linearer Gleichungen mit unendlich vielen Unbekannten," *Rendiconti del Circolo Matematico di Palermo* 25 (1908).
  - G. Hamel, "Eine Basis aller Zahlen und die unstetigen Lösungen der Funktionalgleichung: f(x + y) = f(x) + f(y)," *Mathematische Annalen* 60 (1905).
  - S. Banach, *Théorie des opérations linéaires*, Monografje Matematyczne, Warsaw, 1932.
- **Textbooks:**
  - E. Kreyszig, *Introductory Functional Analysis with Applications*, Wiley, 1978: Chapter 2 "Normed Spaces. Banach Spaces" (finite-dimensional subspaces, compactness and finite dimension, bounded linear operators).
  - H. Brezis, *Functional Analysis, Sobolev Spaces and Partial Differential Equations*, Springer, 2011: Chapter 2 (Baire category and its consequences) and Chapter 6 (compact operators, Riesz–Fredholm theory).
  - W. Rudin, *Functional Analysis*, 2nd ed., McGraw-Hill, 1991: Chapter 1 (finite-dimensional spaces and local compactness) and Chapter 2 (Baire category).
- **Accessible:**
  - P. R. Halmos, *A Hilbert Space Problem Book*, 2nd ed., Springer, 1982 (many problems on the shift and on multiplication operators).
  - R. D. Mauldin (ed.), *The Scottish Book: Mathematics from the Scottish Café*, Birkhäuser, 1981 (2nd ed. 2015).
