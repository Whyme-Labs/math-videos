# S2E21: Normed Spaces, Unit Balls, and Bounded Operators

> **Season / Act:** Season 2, Part B, Act VI (Norms and Completeness) · **Target runtime:** 20–25 min ·
> **Prerequisites:** ↩ S2E14 (lengths from inner products; parallelogram law; diamond, circle, square), ↩ S2E19 (operator norm $= \sigma_1$), ↩ S2E20 (the five failures, especially unbounded differentiation and the non-compact unit ball); limits, continuity, Heine–Borel in $\mathbb R^n$ ·
> **Builds toward:** ↪ S2E22 (the $L^1$ norm and the Lebesgue integral), ↪ S2E23 (completeness; Banach spaces), ↪ S2E24 (continuous duals; Hölder; dual unit balls), ↪ S2E26 (bounded operators and the Big Three), ↪ S2E27 (weak compactness), ↪ S2E30 (compact operators)

## Learning objectives
By the end of this lesson the viewer can:
1. Define a norm, work with $\ell^1$, $\ell^2$, $\ell^\infty$ and the sup, $L^1$, $L^2$ norms on $C[0,1]$, and explain why unit balls are convex.
2. Show that different norms on one space can disagree about convergence.
3. Prove that all norms on $\mathbb R^n$ are equivalent, and list its consequences.
4. Prove that a linear map is continuous if and only if it is bounded, compute operator norms, and show that differentiation is unbounded in the sup norm.
5. State and prove Riesz's lemma, and deduce that a closed unit ball is compact exactly when the space is finite-dimensional.

## Cold open
*(Narration draft.)*

Here is a sequence of spikes on the interval from 0 to 1. The first is 1 unit tall; the next is 2 tall and much thinner; the next is 3 tall and thinner still. The $n$-th spike is $n$ units tall and only $1/n^2$ wide.

Question: does this sequence go to zero?

Ask an accountant who measures a function by the area under it. The area of the $n$-th spike is one over $2n$. That goes to zero. Verdict: yes.

Ask an engineer who measures a signal by its energy, the integral of its square. The energy of every spike is exactly one third. Verdict: no, it doesn't go anywhere.

Ask a safety inspector who only cares about the biggest value. The heights are $1, 2, 3, \dots$. Verdict: it explodes.

Three judges, three verdicts: converges, stalls, explodes. Same functions.

In the plane this could never happen: arrows that go to zero do so whether you measure with a taxi meter, a ruler, or a chess king. Today we prove that, find out exactly why it fails for functions, and learn which linear maps respect a given notion of "small."

## The story

### 0. Analysis recap (60-second card)
- **Continuity:** $f$ is continuous at $a$ if for every $\varepsilon > 0$ there is $\delta > 0$ with $\lvert x - a\rvert < \delta \Rightarrow \lvert f(x) - f(a)\rvert < \varepsilon$.
- **Heine–Borel / Bolzano–Weierstrass:** in $\mathbb R^n$, a closed bounded set is compact: every sequence in it has a subsequence converging inside it.
- **Extreme value theorem:** a continuous real function on a compact set attains its minimum and maximum.

### 1. The naive attempt and the definition

In S2E14 lengths came from inner products, but we also met rulers with no protractor (taxicab and chessboard) that still behaved like lengths. So keep the properties of length and drop the angle.

> **Definition (norm).** A **norm** on a real or complex vector space $X$ is a function $\lVert\cdot\rVert : X \to [0, \infty)$ such that for all $x, y \in X$ and scalars $c$:
> 1. **definiteness:** $\lVert x\rVert = 0$ only if $x = 0$;
> 2. **homogeneity:** $\lVert cx\rVert = \lvert c\rvert\,\lVert x\rVert$;
> 3. **triangle inequality:** $\lVert x + y\rVert \le \lVert x\rVert + \lVert y\rVert$.
>
> A **normed space** is a vector space with a chosen norm. Its **distance** is $d(x, y) = \lVert x - y\rVert$, and $x_n \to x$ means $\lVert x_n - x\rVert \to 0$.

**The zoo on $\mathbb R^n$ and on sequences.** For $1 \le p < \infty$,
$$\lVert x\rVert_p = \Big(\sum_k\lvert x_k\rvert^p\Big)^{1/p}, \qquad \lVert x\rVert_\infty = \sup_k\lvert x_k\rvert .$$
On sequences, $\ell^p$ is the space of $x$ with $\lVert x\rVert_p < \infty$. The three stars are $\ell^1$ (absolutely summable), $\ell^2$ (square-summable, the inner product space of S2E20), and $\ell^\infty$ (bounded). For every sequence $\lVert x\rVert_\infty \le \lVert x\rVert_2 \le \lVert x\rVert_1$, so $\ell^1 \subset \ell^2 \subset \ell^\infty$, and both inclusions are strict: $(1/k) \in \ell^2 \setminus \ell^1$ and $(1, 1, 1, \dots) \in \ell^\infty \setminus \ell^2$.

**The zoo on $C[0,1]$.**
$$\lVert f\rVert_\infty = \max_{[0,1]}\lvert f\rvert, \qquad \lVert f\rVert_1 = \int_0^1\lvert f\rvert, \qquad \lVert f\rVert_2 = \Big(\int_0^1\lvert f\rvert^2\Big)^{1/2}.$$
They are ordered too: $\lVert f\rVert_1 \le \lVert f\rVert_2 \le \lVert f\rVert_\infty$ (the first by Cauchy–Schwarz with $g = 1$, ↩ S2E14; the second because $\lvert f\rvert^2 \le \lVert f\rVert_\infty^2$ pointwise). Definiteness of $\lVert\cdot\rVert_1$ uses continuity, exactly as in S2E14.

**Pictures: unit balls.** In $\mathbb R^2$ the unit ball $\lbrace x : \lVert x\rVert_p \le 1\rbrace$ is the **diamond** for $p = 1$, the **disk** for $p = 2$, and the **square** for $p = \infty$, with rounded diamonds and rounded squares in between. A norm is determined by its unit ball ($\lVert x\rVert$ is the factor by which you must scale the ball to reach $x$). Which shapes are allowed?

> **Lemma (norms ↔ convex balls).** Let $N : X \to [0, \infty)$ satisfy definiteness and homogeneity, and let $B = \lbrace x : N(x) \le 1\rbrace$. Then $N$ satisfies the triangle inequality if and only if $B$ is convex.

*Proof.* (⇒) If $N(x), N(y) \le 1$ and $0 \le t \le 1$, then $N(tx + (1 - t)y) \le tN(x) + (1 - t)N(y) \le 1$. (⇐) Let $x, y \neq 0$ (otherwise trivial), $a = N(x)$, $b = N(y)$. Then $x/a, y/b \in B$, and by convexity
$$\frac{x + y}{a + b} = \frac{a}{a + b}\cdot\frac{x}{a} + \frac{b}{a + b}\cdot\frac{y}{b} \in B,$$
so $N(x + y) \le a + b$. $\blacksquare$

This gives a one-line proof of **Minkowski's inequality** (the triangle inequality for $\lVert\cdot\rVert_p$, $p \ge 1$): the ball $\lbrace\sum\lvert x_k\rvert^p \le 1\rbrace$ is a sublevel set of a sum of convex functions $t \mapsto \lvert t\rvert^p$, hence convex. For $p < 1$ the "ball" is a non-convex star and the formula is not a norm (Worked Example 1). Geometrically, S2E14's verdict reads: every centrally symmetric convex body is the unit ball of some norm, but only ellipses (ellipsoids) are unit balls of inner products.

### 2. The crisis: same space, different convergence

The cold open's spikes $h_n(x) = n\max(0, 1 - n^2x)$ live in $C[0,1]$, and (Worked Example 2)
$$\lVert h_n\rVert_1 = \frac1{2n} \to 0, \qquad \lVert h_n\rVert_2 = \frac1{\sqrt3}, \qquad \lVert h_n\rVert_\infty = n \to \infty .$$
So "$h_n \to 0$" is true in $L^1$ and false in $L^2$ and in sup. On sequences the same thing happens: $x^{(n)} = (\tfrac1n, \dots, \tfrac1n, 0, 0, \dots)$ ($n$ entries) has $\lVert x^{(n)}\rVert_1 = 1$, $\lVert x^{(n)}\rVert_2 = 1/\sqrt n$, $\lVert x^{(n)}\rVert_\infty = 1/n$. Spread a fixed amount of mass thinly and it vanishes in $\ell^\infty$ and $\ell^2$, but not in $\ell^1$.

> **Definition.** Two norms on $X$ are **equivalent** if there are constants $0 < c \le C$ with $c\lVert x\rVert_a \le \lVert x\rVert_b \le C\lVert x\rVert_a$ for all $x$.

Equivalent norms have the same convergent and Cauchy sequences and the same open sets. The spike shows $\lVert\cdot\rVert_1$ and $\lVert\cdot\rVert_\infty$ on $C[0,1]$ are **not** equivalent: the ratio $\lVert h_n\rVert_\infty/\lVert h_n\rVert_1 = 2n^2$ is unbounded. On a function space, choosing a norm is a real decision.

### 3. In finite dimensions the choice doesn't matter

> **Theorem.** All norms on $\mathbb R^n$ (or $\mathbb C^n$, or any finite-dimensional space) are equivalent.

*Proof.* Equivalence is transitive, so it suffices to compare any norm $\lVert\cdot\rVert$ with the Euclidean norm $\lVert\cdot\rVert_2$.

*Upper bound.* Write $x = \sum_i x_ie_i$. By the triangle inequality and Cauchy–Schwarz,
$$\lVert x\rVert \le \sum_i\lvert x_i\rvert\,\lVert e_i\rVert \le \Big(\sum_i\lVert e_i\rVert^2\Big)^{1/2}\lVert x\rVert_2 = M\lVert x\rVert_2 .$$
*Continuity.* By the reverse triangle inequality, $\big\lvert\lVert x\rVert - \lVert y\rVert\big\rvert \le \lVert x - y\rVert \le M\lVert x - y\rVert_2$, so $\lVert\cdot\rVert$ is a continuous function on $(\mathbb R^n, \lVert\cdot\rVert_2)$.

*Lower bound.* The Euclidean unit sphere $S = \lbrace\lVert x\rVert_2 = 1\rbrace$ is closed and bounded, hence compact (Heine–Borel). A continuous function on a compact set attains its minimum, so $m = \min_S\lVert x\rVert$ is attained at some $x_0 \in S$, and $m = \lVert x_0\rVert > 0$ because $x_0 \neq 0$. For any $x \neq 0$, $x/\lVert x\rVert_2 \in S$, so $\lVert x\rVert \ge m\lVert x\rVert_2$.

So $m\lVert x\rVert_2 \le \lVert x\rVert \le M\lVert x\rVert_2$. A finite-dimensional space is isomorphic to $\mathbb R^n$ or $\mathbb C^n \cong \mathbb R^{2n}$ (↩ S2E02), and a norm transported along the isomorphism is still a norm. $\blacksquare$

The one step that used finite dimension: **the unit sphere is compact**, exactly item 4 on S2E20's list.

**Consequences** (all used later):
1. In finite dimensions, convergence in any norm is coordinatewise convergence.
2. Finite-dimensional normed spaces are **complete**, because $\mathbb R^n$ is (↪ S2E23).
3. Hence **finite-dimensional subspaces of a normed space are closed** (used in S2E20's Baire sketch and S2E26).
4. In finite dimensions, closed bounded sets are compact in any norm.
5. **Every linear map out of a finite-dimensional normed space is continuous** (Exercise 5).

### 4. Bounded operators: linear maps that respect "small"

S2E20's second failure was differentiation turning tiny functions into huge ones. Here is the precise vocabulary.

> **Definition.** A linear map $T : X \to Y$ between normed spaces is **bounded** if there is a constant $C$ with
> $$\lVert Tx\rVert_Y \le C\lVert x\rVert_X \quad\text{for all } x \in X.$$
> The smallest such $C$ is the **operator norm**
> $$\lVert T\rVert = \sup_{x \neq 0}\frac{\lVert Tx\rVert_Y}{\lVert x\rVert_X} = \sup_{\lVert x\rVert_X \le 1}\lVert Tx\rVert_Y .$$

For a matrix with Euclidean norms on both sides, $\lVert A\rVert = \sigma_1$, the largest singular value (↩ S2E19): the longest semi-axis of the ellipse that the unit circle becomes.

> **Theorem (bounded ⇔ continuous).** For a linear map $T : X \to Y$ between normed spaces, the following are equivalent:
> 1. $T$ is continuous at $0$;
> 2. $T$ is continuous everywhere;
> 3. $T$ is bounded.

*Proof.* (3 ⇒ 2) $\lVert Tx - Ty\rVert = \lVert T(x - y)\rVert \le C\lVert x - y\rVert$, so $T$ is Lipschitz, hence continuous. (2 ⇒ 1) is trivial. (1 ⇒ 3) Continuity at $0$ with $\varepsilon = 1$ gives $\delta > 0$ such that $\lVert x\rVert \le \delta$ implies $\lVert Tx\rVert \le 1$. For any $x \neq 0$, the vector $\delta x/\lVert x\rVert$ has norm $\delta$, so by linearity
$$\lVert Tx\rVert = \frac{\lVert x\rVert}{\delta}\Big\lVert T\Big(\frac{\delta x}{\lVert x\rVert}\Big)\Big\rVert \le \frac1\delta\lVert x\rVert .$$
So $T$ is bounded with $C = 1/\delta$. $\blacksquare$

For linear maps, continuity at one point means Lipschitz continuity everywhere. The **bounded operators** $X \to Y$ form a vector space $\mathcal B(X, Y)$, and the operator norm is a norm on it, with the extra property $\lVert ST\rVert \le \lVert S\rVert\,\lVert T\rVert$ (apply the bounds one after the other).

**Differentiation is unbounded in the sup norm.** On $C^1[0,1]$ with $\lVert\cdot\rVert_\infty$, $p_n(x) = x^n$ has $\lVert p_n\rVert_\infty = 1$ and $\lVert p_n'\rVert_\infty = n$. No $C$ works, so $D$ is discontinuous: this is S2E20's $\varepsilon\sin(x/\varepsilon^2)$ phenomenon, now named. But "bounded" is a property of $T$ *together with the two norms*. Give $C^1[0,1]$ the norm $\lVert f\rVert_{C^1} = \lVert f\rVert_\infty + \lVert f'\rVert_\infty$, which charges for steepness. Then $\lVert Df\rVert_\infty = \lVert f'\rVert_\infty \le \lVert f\rVert_{C^1}$, and $D$ is bounded with norm $\le 1$. Choosing the norm to fit the operator is the idea behind Sobolev spaces (↪ S2E33).

**Identity maps between norms.** On $C[0,1]$, $\lVert f\rVert_1 \le \lVert f\rVert_\infty$ says the identity $(C, \lVert\cdot\rVert_\infty) \to (C, \lVert\cdot\rVert_1)$ is bounded, with norm 1. The identity in the other direction is a discontinuous linear bijection (the spikes). "Non-equivalent norms" and "discontinuous identity" are the same statement.

### 5. Riesz's lemma: why the unit ball is never compact

S2E20 showed that $e_1, e_2, \dots$ in $\ell^2$ are pairwise $\sqrt2$ apart. Was that a special feature of $\ell^2$, with its orthogonal axes? No. In *any* normed space we can find "almost perpendicular" unit vectors to any closed proper subspace.

> **Lemma (F. Riesz, 1918).** Let $Y$ be a closed proper subspace of a normed space $X$, and let $0 < \theta < 1$. Then there is $x \in X$ with $\lVert x\rVert = 1$ and $\lVert x - y\rVert \ge \theta$ for every $y \in Y$.

*Proof.* Pick $x_0 \notin Y$ and let $d = \inf_{y \in Y}\lVert x_0 - y\rVert$. Since $Y$ is closed and $x_0 \notin Y$, $d > 0$. Since $d/\theta > d$, there is $y_0 \in Y$ with $\lVert x_0 - y_0\rVert \le d/\theta$. Put $x = (x_0 - y_0)/\lVert x_0 - y_0\rVert$, a unit vector. For any $y \in Y$, the vector $y_0 + \lVert x_0 - y_0\rVert\,y$ is in $Y$, so
$$\lVert x - y\rVert = \frac{\big\lVert x_0 - \big(y_0 + \lVert x_0 - y_0\rVert\,y\big)\big\rVert}{\lVert x_0 - y_0\rVert} \ge \frac{d}{\lVert x_0 - y_0\rVert} \ge \frac{d}{d/\theta} = \theta. \qquad\blacksquare$$

In a Hilbert space $\theta = 1$ works: take $x \perp Y$ (Exercise 6, ↪ S2E28). In general normed spaces $\theta = 1$ can fail; "almost perpendicular" is the best one can do.

> **Theorem (Riesz).** The closed unit ball of a normed space $X$ is compact if and only if $X$ is finite-dimensional.

*Proof.* (⇐) In finite dimensions the closed unit ball is closed and bounded, hence compact (Consequence 4 of Section 3). (⇒) Suppose $X$ is infinite-dimensional. Choose any unit vector $x_1$. Given unit vectors $x_1, \dots, x_n$, the subspace $Y_n = \operatorname{span}(x_1, \dots, x_n)$ is finite-dimensional, hence closed (Consequence 3), and proper (since $\dim X = \infty$). Riesz's lemma with $\theta = \tfrac12$ gives a unit vector $x_{n+1}$ with distance $\ge \tfrac12$ from $Y_n$, in particular from each of $x_1, \dots, x_n$. The resulting sequence has $\lVert x_n - x_m\rVert \ge \tfrac12$ for all $n \neq m$, so no subsequence is Cauchy and none converges. $\blacksquare$

So S2E20's item 4 is a characterization, not a quirk. This repairs nothing, but it says where to look: recover compactness in a weaker sense (↪ S2E27), or demand it of operators instead of spaces (↪ S2E30).

### 6. Payoff

The cold open's three judges were three non-equivalent norms on $C[0,1]$. In $\mathbb R^n$ they would have had to agree, because the unit sphere is compact. On function spaces it never is (Riesz), norms genuinely differ, and choosing one is choosing what "small" means. The good linear maps are then the bounded ones, which are exactly the continuous ones, sized by the operator norm we first met as $\sigma_1$.

**Zoom out (the core stance: norms are extra structure you choose to add).** In S2E14, choosing an inner product changed which vectors were perpendicular. Now choosing a norm changes which sequences converge and which linear maps are continuous. The diamond and the square, demoted in S2E14 to "rulers without protractors," are the unit balls of $\ell^1$ and $\ell^\infty$, and S2E24 will show they are each other's duals.

**Teaser.** In the accountant's norm $\lVert f\rVert_1$, continuous ramps from $0$ to $1$ over $[\tfrac12, \tfrac12 + \tfrac1n]$ crowd toward a step function, which is not continuous. $(C[0,1], \lVert\cdot\rVert_1)$ has holes, as ℚ did (↩ S1E07). Filling them needs an integral that handles limits of functions (↪ S2E22, Lebesgue), and the filled space is $L^1$ (↪ S2E23).

## Worked examples

### Example 1: One vector, three lengths; and a "norm" that isn't
Let $x = (3, -4)$. Then $\lVert x\rVert_1 = 7$, $\lVert x\rVert_2 = 5$, $\lVert x\rVert_\infty = 4$. The general inequalities in $\mathbb R^n$ are
$$\lVert x\rVert_\infty \le \lVert x\rVert_2 \le \lVert x\rVert_1 \le \sqrt n\,\lVert x\rVert_2 \le n\lVert x\rVert_\infty,$$
and here with $n = 2$: $4 \le 5 \le 7 \le 5\sqrt2 \approx 7.07 \le 8$. ✓ The constants $\sqrt n$ and $n$ are sharp (take $x = (1, \dots, 1)$), and they **grow with the dimension**: equivalence holds in each $\mathbb R^n$, but not uniformly in $n$. That is the finite-dimensional shadow of the non-equivalence in $\ell^p$.

**$p = \tfrac12$.** Define $N(x) = \big(\lvert x_1\rvert^{1/2} + \lvert x_2\rvert^{1/2}\big)^2$. It is definite and homogeneous. But $N(1, 0) = N(0, 1) = 1$ while $N(1, 1) = (1 + 1)^2 = 4 > 1 + 1$: the triangle inequality fails. Geometrically, the midpoint $(\tfrac12, \tfrac12)$ of two points of the "unit ball" has $N = (2\sqrt{1/2})^2 = 2 > 1$: the ball is a non-convex star, as the lemma predicts.

### Example 2: The spike under three norms
$h_n(x) = n\max(0, 1 - n^2x)$ on $[0, 1]$: a triangle of height $n$ over the base $[0, \tfrac1{n^2}]$.
- **Sup:** the maximum is at $x = 0$: $\lVert h_n\rVert_\infty = n$.
- **$L^1$:** area of a triangle, $\tfrac12\cdot\tfrac1{n^2}\cdot n = \tfrac1{2n}$.
- **$L^2$:** substitute $u = n^2x$: $\int_0^{1/n^2}n^2(1 - n^2x)^2\,dx = n^2\cdot\tfrac1{n^2}\int_0^1(1 - u)^2\,du = \tfrac13$, so $\lVert h_n\rVert_2 = \tfrac1{\sqrt3}$ for every $n$.

The ordering $\lVert h_n\rVert_1 \le \lVert h_n\rVert_2 \le \lVert h_n\rVert_\infty$ holds, but the ratios are unbounded: $\lVert h_n\rVert_\infty/\lVert h_n\rVert_1 = 2n^2$ and $\lVert h_n\rVert_2/\lVert h_n\rVert_1 = \tfrac{2n}{\sqrt3}$. So no two of the three norms are equivalent on $C[0,1]$. (For $L^2$ vs. sup, use the thin tents of height 1 from S2E20, which have $L^2$ norm → 0 and sup norm 1.)

### Example 3: One matrix, three operator norms
Take $A = \begin{pmatrix}3 & 0\\ 4 & 5\end{pmatrix}$ from S2E19's Example 1, and use the same $\ell^p$ norm on both sides.

- **$\ell^1 \to \ell^1$: max absolute column sum**, since $\lVert Ax\rVert_1 \le \sum_j\lvert x_j\rvert\sum_i\lvert a_{ij}\rvert$. Column sums $7$ and $5$; attained at $e_1$: $\lVert(3, 4)\rVert_1 = 7$. So $\lVert A\rVert_{1\to1} = 7$.
- **$\ell^\infty \to \ell^\infty$: max absolute row sum**, since $\lvert(Ax)_i\rvert \le \sum_j\lvert a_{ij}\rvert\lVert x\rVert_\infty$. Row sums $3$ and $9$; attained at $(1, 1)$: $\lVert(3, 9)\rVert_\infty = 9$. So $\lVert A\rVert_{\infty\to\infty} = 9$.
- **$\ell^2 \to \ell^2$: largest singular value.** From S2E19, $A^{\mathsf T}A = \begin{pmatrix}25 & 20\\ 20 & 25\end{pmatrix}$ has eigenvalues $45, 5$, so $\lVert A\rVert_{2\to2} = \sqrt{45} = 3\sqrt5 \approx 6.708$, attained at $x = (1, 1)/\sqrt2$: $Ax = (3, 9)/\sqrt2$, with $\lVert Ax\rVert_2 = \sqrt{90/2} = \sqrt{45}$. ✓

Three sizes for one map, all finite and comparable in finite dimensions; in infinite dimensions one can be finite and another infinite.

### Example 4: Two operators on $C[0,1]$
**Integration** $(Vf)(x) = \int_0^xf(t)\,dt$. In the sup norm, $\lvert Vf(x)\rvert \le \int_0^x\lvert f\rvert \le x\lVert f\rVert_\infty \le \lVert f\rVert_\infty$, so $\lVert V\rVert \le 1$; for $f = 1$, $Vf = x$ has sup norm $1$, so $\lVert V\rVert = 1$. Integration smooths, and it is bounded.

**Differentiation** on polynomials of degree $\le n$ with the sup norm on $[0,1]$: here $D$ *is* bounded (Consequence 5), and its operator norm is $2n^2$ (S2E20, Example 2: Markov's inequality, attained by the shifted Chebyshev polynomial $T_n(2x - 1)$). For $n = 1, 2, 3$: $2, 8, 18$. Each restriction is bounded, but $\sup_n\lVert D|_{\mathcal P_n}\rVert = \infty$, so on all polynomials $D$ is unbounded. Differentiation roughens.

This asymmetry ($V$ bounded, its partner $D$ unbounded) recurs in S2E30–S2E31: compact operators like $V$ have unbounded inverses.

## Visual and animation notes
1. **Analysis recap card** (60 s): an $\varepsilon$–$\delta$ window around a graph; a closed disk with a sequence and a convergent subsequence lighting up.
2. **Cold open.** Spikes growing taller and thinner at the left edge of $[0,1]$. Three judges' meters side by side: "area" draining to 0, "energy" frozen at $\tfrac13$, "height" climbing off the top of the screen.
3. **Key visual: unit balls morphing** (motif: *Norms*). In $\mathbb R^2$, the $\ell^p$ unit ball morphs from diamond ($p = 1$) through circle ($p = 2$) to square ($p = \infty$), with a slider for $p$. Below $p = 1$ it pinches into a non-convex star that flashes red: "not a norm." Callback stamp ↩ S2E14.
4. **Convexity lemma.** A segment between two points of a convex ball stays inside; in the star, it pokes out.
5. **Equivalence of norms.** Diamond inside circle inside square; blue arrows shrinking to 0 pass through all three. As $n$ grows (cube, 4D schematic) the gaps widen like $\sqrt n$ and $n$.
6. **Different convergence.** $(\tfrac1n, \dots, \tfrac1n, 0, \dots)$ as a flattening bar chart; $\ell^\infty$ and $\ell^2$ meters go to 0, the $\ell^1$ meter stays at 1.
7. **Operator norm.** A grid transformation (motif: *Linear map*) sends the diamond, circle, and square to three different parallelograms/ellipses; the "furthest point" of each image lights up with its value $7$, $3\sqrt5$, $9$ (↩ S2E19 ellipse).
8. **Bounded ⇔ continuous.** A small ball maps into a small ball; for $D$, a tiny wiggle maps to a tall one and the target ball bursts.
9. **Riesz's lemma.** A unit vector tilting away from a plane $Y$ until its distance meter reads $\ge \theta$; then $x_1, x_2, x_3, \dots$ placed one by one, each $\ge \tfrac12$ from the span of the previous ones (callback to S2E20's $\sqrt2$-apart picture).
10. **Teaser.** Ramps steepening into a step under the $L^1$ meter, the step drawn as a hollow "hole" in $C[0,1]$ (motif: *Completion*, S1's "zoom in and find holes"), stamp ↪ S2E22–S2E23.

## Common misconceptions
- **Misconception:** A bounded operator is one whose values are bounded. **Reality:** it means bounded *on the unit ball*, i.e. $\lVert Tx\rVert \le C\lVert x\rVert$. A nonzero linear map is never bounded on the whole space.
- **Misconception:** The choice of norm is cosmetic. **Reality:** in finite dimensions it is (all norms are equivalent), but on function spaces it changes which sequences converge, which spaces are complete, and which operators are continuous.
- **Misconception:** Any formula that is homogeneous and positive is a norm. **Reality:** the triangle inequality is equivalent to convexity of the unit ball; $\big(\sum\lvert x_k\rvert^p\big)^{1/p}$ with $p < 1$ fails.
- **Misconception:** The unit ball of $\ell^2$ fails to be compact because of something special about $\ell^2$. **Reality:** by Riesz's theorem, the closed unit ball of every infinite-dimensional normed space is non-compact.

## Exercises
- **Warm-up (computational).**
  1. Compute $\lVert x\rVert_1$, $\lVert x\rVert_2$, $\lVert x\rVert_\infty$ for $x = (1, -2, 2)$, and check $\lVert x\rVert_1 \le \sqrt3\lVert x\rVert_2$.
  2. For $A = \begin{pmatrix}1 & -2\\ 3 & 4\end{pmatrix}$, compute $\lVert A\rVert_{1\to1}$ and $\lVert A\rVert_{\infty\to\infty}$, and $\lVert A\rVert_{2\to2}$ from the eigenvalues of $A^{\mathsf T}A$.
- **Core (conceptual).**
  3. On $c_{00}$ (finitely supported sequences), show that $\lVert\cdot\rVert_1$ and $\lVert\cdot\rVert_\infty$ are not equivalent. Which identity map is continuous?
  4. Show that $f \mapsto f(0)$ is bounded on $(C[0,1], \lVert\cdot\rVert_\infty)$ with norm 1, but unbounded on $(C[0,1], \lVert\cdot\rVert_1)$.
- **Stretch (proof).**
  5. Prove that every linear map $T$ from a finite-dimensional normed space $X$ to any normed space $Y$ is bounded.
  6. Show that in an inner product space, Riesz's lemma holds with $\theta = 1$ when $Y$ is finite-dimensional. (Use orthogonal projection onto $Y$.)

<details><summary>Hints and answers</summary>

1. $\lVert x\rVert_1 = 5$, $\lVert x\rVert_2 = 3$, $\lVert x\rVert_\infty = 2$; $5 \le 3\sqrt3 \approx 5.196$. ✓
2. Column sums $4, 6$: $\lVert A\rVert_{1\to1} = 6$. Row sums $3, 7$: $\lVert A\rVert_{\infty\to\infty} = 7$. $A^{\mathsf T}A = \begin{pmatrix}10 & 10\\ 10 & 20\end{pmatrix}$, eigenvalues $15 \pm 5\sqrt5$, so $\lVert A\rVert_{2\to2} = \sqrt{15 + 5\sqrt5} \approx 5.117$.
3. $u_n = (1, \dots, 1, 0, \dots)$ ($n$ ones) has $\lVert u_n\rVert_1 = n$ and $\lVert u_n\rVert_\infty = 1$, so no $C$ gives $\lVert x\rVert_1 \le C\lVert x\rVert_\infty$. Since $\lVert x\rVert_\infty \le \lVert x\rVert_1$, the identity $(c_{00}, \lVert\cdot\rVert_1) \to (c_{00}, \lVert\cdot\rVert_\infty)$ is continuous (norm 1); the reverse is not.
4. $\lvert f(0)\rvert \le \lVert f\rVert_\infty$, with equality for $f = 1$. Tents $f_n(x) = \max(0, 1 - nx)$ have $f_n(0) = 1$ and $\lVert f_n\rVert_1 = \tfrac1{2n}$. (This "value at 0" functional returns in S2E24.)
5. Let $e_1, \dots, e_n$ be a basis. The map $x = \sum c_ie_i \mapsto \sum\lvert c_i\rvert$ is a norm on $X$, equivalent to the given one: $\sum\lvert c_i\rvert \le K\lVert x\rVert$. Then $\lVert Tx\rVert \le \sum\lvert c_i\rvert\lVert Te_i\rVert \le \big(\max_i\lVert Te_i\rVert\big)K\lVert x\rVert$.
6. Take $x_0 \notin Y$, let $P$ be orthogonal projection onto $Y$, and $x = (x_0 - Px_0)/\lVert x_0 - Px_0\rVert$. Then $x \perp Y$, so $\lVert x - y\rVert^2 = 1 + \lVert y\rVert^2 \ge 1$ for $y \in Y$ by Pythagoras.

</details>

## Historical note
Hermann Minkowski, working on number theory (*Geometrie der Zahlen*, 1896), studied centrally symmetric convex bodies and the "distance functions" they define: our unit balls and norms, in finite dimensions. Erhard Schmidt (1908, $\ell^2$) and Frigyes Riesz (1910, the $L^p$ spaces) studied particular infinite-dimensional examples, after Maurice Fréchet's 1906 thesis introduced abstract metric spaces. The general definition of a complete normed space appeared around 1920–1922 independently in the work of Stefan Banach (his doctoral thesis, published in *Fundamenta Mathematicae* in 1922), Hans Hahn, Eduard Helly, and Norbert Wiener. Meanwhile, Riesz's 1918 paper in *Acta Mathematica* on linear functional equations, which created the theory of compact operators, contains the lemma now named after him and the theorem that a normed space with a compact unit ball is finite-dimensional. Banach's 1932 book made bounded operators on complete normed spaces the center of the subject; his "spaces of type (B)" soon became "Banach spaces."

## Connections
- **Callbacks:** ↩ S1E07 (holes in ℚ, for the teaser), ↩ S2E02 (finite-dimensional ⇒ $\cong \mathbb R^n$ or $\mathbb C^n$), ↩ S2E14 (lengths from inner products; Cauchy–Schwarz; the parallelogram law; diamond, circle, square), ↩ S2E17 (orthogonal projection, for Riesz with $\theta = 1$), ↩ S2E19 (operator norm $= \sigma_1$; the matrix of Example 3), ↩ S2E20 (unbounded differentiation; non-compact unit ball; Markov's inequality)
- **Sets up:** ↪ S2E22 (the $L^1$ norm and the Lebesgue integral), ↪ S2E23 (completeness; $L^1$ as a completion), ↪ S2E24 (the continuous dual; Hölder; dual unit balls diamond ↔ square; evaluation at 0), ↪ S2E26 (finite-dimensional subspaces are closed), ↪ S2E27 (weak compactness instead of norm compactness), ↪ S2E28 (Riesz's lemma with $\theta = 1$ in Hilbert space), ↪ S2E30 (compact operators; Riesz's 1918 theory), ↪ S2E31 (unbounded operators), ↪ S2E33 (Sobolev norms that make differentiation bounded)
- **Side quests:** *Convex duality and optimization* (after S2E25: unit balls as convex bodies); *Linear algebra in machine learning* (after S2E19: $\ell^1$ regularization and the diamond's corners give sparse solutions)

## References
- **Primary / historical:**
  - F. Riesz, "Über lineare Funktionalgleichungen," *Acta Mathematica* 41 (1918) (Riesz's lemma; compact unit ball implies finite dimension; compact operators).
  - S. Banach, "Sur les opérations dans les ensembles abstraits et leur application aux équations intégrales," *Fundamenta Mathematicae* 3 (1922).
  - S. Banach, *Théorie des opérations linéaires*, Monografje Matematyczne, Warsaw, 1932.
  - H. Minkowski, *Geometrie der Zahlen*, Teubner, Leipzig, 1896.
- **Textbooks:**
  - E. Kreyszig, *Introductory Functional Analysis with Applications*, Wiley, 1978: Chapter 2 "Normed Spaces. Banach Spaces" (finite-dimensional normed spaces, equivalence of norms, compactness and finite dimension with Riesz's lemma, bounded linear operators).
  - J. B. Conway, *A Course in Functional Analysis*, 2nd ed., Springer, 1990: Chapter III "Banach Spaces."
  - H. Brezis, *Functional Analysis, Sobolev Spaces and Partial Differential Equations*, Springer, 2011: Chapter 6 (opens with Riesz's lemma and the compactness theorem).
- **Accessible:**
  - S. Axler, *Measure, Integration & Real Analysis*, Springer, 2020: Chapter 6 "Banach Spaces" (normed spaces, bounded linear maps), published open access.
