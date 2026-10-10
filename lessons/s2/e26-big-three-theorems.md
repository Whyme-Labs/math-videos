# S2E26: The Big Three Theorems

> **Season / Act:** Season 2, Part B, Act VII: Duality in Infinite Dimensions · **Target runtime:** 20–25 min ·
> **Prerequisites:** S2E21 (bounded operators, operator norm), S2E23 (completeness, Banach spaces), S2E24 (continuous dual), S2E25 (Hahn–Banach); S1E12 (countable vs. uncountable); Fourier series at the level of "a function as a sum of sines and cosines" ·
> **Builds toward:** S2E27 (weakly convergent sequences are bounded), S2E29 (pointwise vs. $L^2$ convergence of Fourier series), S2E30–S2E31 (Fredholm theory, Hellinger–Toeplitz, unbounded operators)

## Learning objectives
By the end of this lesson the viewer can:
1. State and prove the Baire category theorem for complete metric spaces.
2. Prove the uniform boundedness principle from Baire, and give a counterexample showing completeness is necessary.
3. State the open mapping, inverse mapping, and closed graph theorems, derive the closed graph theorem from the open mapping theorem, and recognize when each applies.
4. Use the uniform boundedness principle to prove that some continuous periodic function has a Fourier series diverging at $0$, including the estimate on the Lebesgue constants.
5. Prove that an infinite-dimensional Banach space has no countable Hamel basis.

## Cold open
*(Narration draft.)*

In 1807 Joseph Fourier claimed that every function could be written as a sum of sines and cosines. For decades, mathematicians assumed that at least for a *continuous* function, the sum would add up to the function, point by point.

In 1873 Paul du Bois-Reymond broke that hope. He built a continuous function whose Fourier series blows up at a single point. His construction is a marvel of careful engineering: layer after layer of oscillations, each one tuned to push the partial sums higher.

Now watch a different approach. Fifty years later, in 1927, Stefan Banach and Hugo Steinhaus proved the same fact in a few lines, and they never wrote down a single bad function. They didn't need to. Their argument goes like this: *if* every continuous function had a convergent Fourier series at 0, then a certain list of numbers would have to stay bounded. That list of numbers grows like a logarithm. So some continuous function must misbehave. In fact, in a precise sense, *most* of them do.

Where does a proof that powerful come from? Not from Fourier analysis. It comes from one property you met at the very start of this act: completeness. A complete space is too "thick" to be built out of countably many thin pieces. From that one fact come three theorems, the Big Three of functional analysis, and today we meet all of them.

## The story

### 1. The naive hope: pointwise bounds should be enough

Suppose $\lbrace T_\alpha\rbrace$ is a family of bounded linear operators and, for every single input $x$, the outputs $\lVert T_\alpha x\rVert$ stay bounded as $\alpha$ varies. Must the operator norms $\lVert T_\alpha\rVert$ be bounded?

For arbitrary functions, no: $f_n(x) = n^2x\,e^{-nx}$ on $[0,\infty)$ is bounded at each $x$ (for fixed $x > 0$, $f_n(x) \to 0$), but $\max_x f_n = f_n(1/n) = n/e \to \infty$. For linear maps on an *incomplete* space, also no: on $c_{00}$ with the sup norm, $f_n(x) = n x_n$ has $\sup_n\lvert f_n(x)\rvert < \infty$ for each $x$ (only finitely many $x_n \ne 0$), but $\lVert f_n\rVert = n$.

So something must be added, and the hook says what: the space must be complete.

### 2. The crisis, and the key: Baire's theorem

> **Definitions.** A subset $E$ of a metric space is **nowhere dense** if its closure has empty interior (it is "thin": it contains no ball, even after closing it up). A countable union of nowhere dense sets is **meagre** (or "of first category"). A set whose complement is meagre is **residual** ("generic").

Examples in ℝ: a point, a finite set, $\mathbb Z$, the Cantor set (closed, with no interval inside) are nowhere dense. $\mathbb Q$ is meagre (a countable union of points) even though it is dense. A proper closed subspace of a normed space is nowhere dense (if it contained a ball, it would contain a ball around $0$, hence everything).

> **Theorem (Baire category theorem).** Let $X$ be a nonempty complete metric space.
> (a) If $U_1, U_2, \dots$ are open and dense, then $\bigcap_n U_n$ is dense.
> (b) Equivalently, $X$ is not meagre: if $X = \bigcup_n F_n$ with each $F_n$ closed, then some $F_n$ contains a ball.

**Proof of (a).** Let $B_0$ be any open ball; we show it meets $\bigcap U_n$. Since $U_1$ is open and dense, $B_0 \cap U_1$ is a nonempty open set, so it contains a closed ball $\overline B_1$ of radius $r_1 < 1$. Since $U_2$ is dense, $B_1 \cap U_2$ contains a closed ball $\overline B_2$ of radius $r_2 < \tfrac12$. Continue: $\overline B_n \subseteq B_{n-1} \cap U_n$ with radius $r_n < \tfrac1n$. The centers $c_n$ satisfy $d(c_m, c_n) < r_n < \tfrac1n$ for $m > n$, so they form a Cauchy sequence. **By completeness**, $c_n \to c$. For each $n$, $c_m \in \overline B_n$ for all $m \ge n$, and $\overline B_n$ is closed, so $c \in \overline B_n \subseteq U_n \cap B_0$. Thus $c \in B_0 \cap \bigcap_n U_n$. ∎

*(b) from (a):* if no $F_n$ contains a ball, then $U_n = X \setminus F_n$ is open and dense, so $\bigcap U_n$ is dense, in particular nonempty, contradicting $\bigcup F_n = X$.

This is the nested-intervals idea from building ℝ (↩ S1E08), and it fails without completeness: $\mathbb Q = \bigcup_{q}\lbrace q\rbrace$ is a countable union of nowhere dense sets.

### 3. Uniform boundedness: pointwise bounded ⟹ uniformly bounded

> **Theorem (uniform boundedness principle; Banach–Steinhaus, 1927).** Let $X$ be a Banach space, $Y$ a normed space, and $\lbrace T_\alpha\rbrace_{\alpha \in A}$ a family of bounded linear operators $X \to Y$. If $\sup_\alpha \lVert T_\alpha x\rVert < \infty$ for every $x \in X$, then $\sup_\alpha \lVert T_\alpha\rVert < \infty$.

**Proof.** For $n \in \mathbb N$ let
$$F_n = \lbrace x \in X : \lVert T_\alpha x\rVert \le n \text{ for all } \alpha\rbrace = \bigcap_\alpha \lbrace x : \lVert T_\alpha x\rVert \le n\rbrace.$$
Each set in the intersection is closed (each $T_\alpha$ is continuous), so $F_n$ is closed. The hypothesis says every $x$ lies in some $F_n$: $X = \bigcup_n F_n$. By Baire (b), some $F_N$ contains a ball $B(x_0, r)$. Now let $\lVert z\rVert < r$. Then $x_0 + z$ and $x_0$ both lie in $F_N$, so for every $\alpha$,
$$\lVert T_\alpha z\rVert = \lVert T_\alpha(x_0 + z) - T_\alpha x_0\rVert \le N + N = 2N.$$
Scaling, $\lVert T_\alpha\rVert \le 2N/r$ for every $\alpha$. ∎

**Contrapositive (the "condensation of singularities").** If $\sup_\alpha\lVert T_\alpha\rVert = \infty$, then there is an $x$ with $\sup_\alpha\lVert T_\alpha x\rVert = \infty$, and in fact the set of such $x$ is residual: generic. This is the form used in the showcase.

**Corollaries.**
- **Banach–Steinhaus:** if $T_n x$ converges for every $x$ (with $X$ Banach), then $Tx = \lim T_n x$ defines a *bounded* operator, with $\lVert T\rVert \le \liminf\lVert T_n\rVert$.
- **Weakly bounded ⟹ bounded:** if $S \subseteq X$ and $f(S)$ is bounded for every $f \in X^*$, then $S$ is norm-bounded. (Apply UBP to the functionals $Jx \in X^{**}$, $x \in S$, on the Banach space $X^*$, and use $\lVert Jx\rVert = \lVert x\rVert$ from Hahn–Banach, ↩ S2E25.) In particular **weakly convergent sequences are bounded** (↪ S2E27).

### 4. Open mapping: bounded bijections have bounded inverses

> **Theorem (open mapping; Banach 1929/1932, Schauder 1930).** Let $X, Y$ be Banach spaces and $T : X \to Y$ a bounded linear surjection. Then $T$ is **open**: it maps open sets to open sets. Equivalently, there is $\delta > 0$ such that $T(B_X(0,1)) \supseteq B_Y(0, \delta)$.

*Proof sketch.* (i) $Y = \bigcup_n \overline{T(B_X(0,n))}$, so by Baire some $\overline{T(B_X(0,n))}$ contains a ball; by linearity and symmetry, $\overline{T(B_X(0,1))} \supseteq B_Y(0, 2\delta)$ for some $\delta$. (ii) Remove the closure using completeness of $X$: given $y$ with $\lVert y\rVert < \delta$, pick $x_1$ with $\lVert x_1\rVert < \tfrac12$ and $\lVert y - Tx_1\rVert < \delta/2$, then $x_2$ with $\lVert x_2\rVert < \tfrac14$ and $\lVert y - Tx_1 - Tx_2\rVert < \delta/4$, and so on. The series $\sum x_k$ converges absolutely, hence converges in $X$ (↩ S2E23's series criterion), to some $x$ with $\lVert x\rVert < 1$ and $Tx = y$. ∎

> **Corollary (inverse mapping theorem).** A bounded linear bijection between Banach spaces has a bounded inverse.

> **Corollary (equivalent norms).** If a vector space is complete under two norms and $\lVert x\rVert_a \le C\lVert x\rVert_b$ for all $x$, then the norms are equivalent. (Apply the inverse mapping theorem to the identity $(X,\lVert\cdot\rVert_b) \to (X, \lVert\cdot\rVert_a)$.)

The corollary is useful in practice: to show a linear problem $Tx = y$ is **well posed** (unique solution depending continuously on the data), it suffices to show existence and uniqueness. Stability comes free.

### 5. Closed graph: closedness gives boundedness

The **graph** of $T : X \to Y$ is $\Gamma(T) = \lbrace (x, Tx)\rbrace \subseteq X \times Y$. "$\Gamma(T)$ is closed" means: if $x_n \to x$ **and** $Tx_n \to y$, then $y = Tx$. Continuity is stronger: it says if $x_n \to x$ then $Tx_n$ converges, and to $Tx$. The closed graph theorem says that for linear maps between Banach spaces, the weaker condition suffices.

> **Theorem (closed graph).** Let $X, Y$ be Banach spaces and $T : X \to Y$ linear. If $\Gamma(T)$ is closed in $X \times Y$, then $T$ is bounded.

**Proof.** Give $X \times Y$ the norm $\lVert (x,y)\rVert = \lVert x\rVert + \lVert y\rVert$; it is a Banach space. $\Gamma(T)$ is a closed subspace (linear because $T$ is), hence a Banach space. The projection $\pi_1 : \Gamma(T) \to X$, $(x, Tx) \mapsto x$, is linear, bounded (norm $\le 1$), and bijective. By the inverse mapping theorem, $\pi_1^{-1} : x \mapsto (x, Tx)$ is bounded: $\lVert x\rVert + \lVert Tx\rVert \le C\lVert x\rVert$. Hence $\lVert Tx\rVert \le C\lVert x\rVert$. ∎

A famous consequence is the **Hellinger–Toeplitz theorem** (1910): a symmetric operator ($\langle Ax, y\rangle = \langle x, Ay\rangle$) defined on *all* of a Hilbert space is bounded. Since quantum-mechanical position and momentum are symmetric and unbounded, they cannot be defined on the whole space (↪ S2E31).

### 6. Showcase: a continuous function whose Fourier series diverges at 0

Let $C(\mathbb T)$ be the continuous $2\pi$-periodic functions with the sup norm, a Banach space (↩ S2E23). The $N$-th partial Fourier sum is
$$S_N f(x) = \sum_{n=-N}^N \hat f(n)e^{inx} = \frac1{2\pi}\int_{-\pi}^{\pi} f(t)\,D_N(x - t)\,dt,\qquad \hat f(n) = \frac1{2\pi}\int_{-\pi}^{\pi}f(t)e^{-int}dt,$$
where the **Dirichlet kernel** is
$$D_N(t) = \sum_{n=-N}^N e^{int} = \frac{\sin\left((N+\tfrac12)t\right)}{\sin(t/2)}.$$
(Sum the geometric series and multiply top and bottom by $e^{-it/2}$.) Define the functionals $\Lambda_N f = S_N f(0) = \frac1{2\pi}\int_{-\pi}^\pi f(t)D_N(t)\,dt$ ($D_N$ is even).

**Step 1: $\lVert\Lambda_N\rVert = L_N := \frac1{2\pi}\int_{-\pi}^\pi\lvert D_N(t)\rvert\,dt$**, the **Lebesgue constant**. "$\le$" is immediate. For "$\ge$", let $g = \operatorname{sgn} D_N$; it is $\pm1$ except at finitely many zeros. Choose continuous $g_j$ with $\lvert g_j\rvert \le 1$ and $g_j \to g$ almost everywhere; by dominated convergence (↩ S2E22), $\Lambda_N g_j \to \frac1{2\pi}\int\lvert D_N\rvert = L_N$.

**Step 2: $L_N \to \infty$.** Since $\lvert\sin(t/2)\rvert \le \lvert t\rvert/2$, and substituting $u = (N + \tfrac12)t$,
$$L_N = \frac1\pi\int_0^\pi \frac{\lvert\sin((N+\tfrac12)t)\rvert}{\sin(t/2)}\,dt \ge \frac2\pi\int_0^\pi\frac{\lvert\sin((N+\tfrac12)t)\rvert}{t}\,dt = \frac2\pi\int_0^{(N+\frac12)\pi}\frac{\lvert\sin u\rvert}{u}\,du.$$
On $[(k-1)\pi, k\pi]$, $\tfrac1u \ge \tfrac1{k\pi}$ and $\int\lvert\sin u\rvert = 2$. Keeping $k = 1, \dots, N$:
$$L_N \ge \frac2\pi\sum_{k=1}^N \frac{2}{k\pi} = \frac4{\pi^2}\sum_{k=1}^N\frac1k \ge \frac{4}{\pi^2}\ln(N+1) \to \infty.$$

**Step 3: apply UBP.** $C(\mathbb T)$ is complete and $\sup_N\lVert\Lambda_N\rVert = \infty$, so by the contrapositive of UBP there is $f \in C(\mathbb T)$ with
$$\sup_N\lvert S_N f(0)\rvert = \infty.$$
The Fourier series of $f$ diverges at $0$. Moreover, the set of such $f$ is residual in $C(\mathbb T)$: divergence at $0$ is the generic behavior. ∎

We never wrote $f$ down. Existence by pure structure: completeness plus a norm estimate.

What this does *not* say: Fourier series of continuous functions do converge in $L^2$ (↪ S2E29), and by Carleson's theorem (1966) they converge almost everywhere for every $f \in L^2$. Divergence can happen only on a null set, but for continuous functions it can happen on any prescribed null set (Kahane–Katznelson, 1966). For $L^1$ functions, Kolmogorov (1926) found one whose Fourier series diverges everywhere.

## Worked examples

### Example 1: No infinite-dimensional Banach space has a countable Hamel basis
Suppose $X$ is an infinite-dimensional Banach space with a countable Hamel basis $\lbrace b_1, b_2, b_3, \dots\rbrace$ (every $x$ is a *finite* combination). Let $F_n = \operatorname{span}(b_1, \dots, b_n)$.
1. **$X = \bigcup_n F_n$**, since each $x$ uses only finitely many basis vectors.
2. **Each $F_n$ is closed**, since finite-dimensional subspaces of a normed space are complete (↩ S2E21: all norms on them are equivalent), hence closed.
3. **Each $F_n$ has empty interior**: it is a proper subspace ($X$ is infinite-dimensional), and a subspace containing a ball $B(x_0, r)$ contains $B(0,r) = B(x_0,r) - x_0$, hence every vector (scale into the ball).

This contradicts Baire (b). So every Hamel basis of an infinite-dimensional Banach space is uncountable (↩ S1E12, S2E20). In particular, the space of polynomials, which *does* have the countable basis $1, x, x^2, \dots$, cannot be complete under any norm.

### Example 2: Completeness is necessary, twice
**(a) UBP fails on $c_{00}$.** With the sup norm, $f_n(x) = n\,x_n$. For each fixed $x \in c_{00}$, say $x_k = 0$ for $k > K$: then $\lvert f_n(x)\rvert \le K\lVert x\rVert_\infty$ for all $n$, a pointwise bound. But $\lvert f_n(e_n)\rvert = n$ with $\lVert e_n\rVert_\infty = 1$, so $\lVert f_n\rVert = n \to \infty$. The proof breaks at Baire: $c_{00} = \bigcup_K \operatorname{span}(e_1, \dots, e_K)$ is meagre in itself.

**(b) The inverse mapping theorem fails without completeness of the target.** Let $X = (\ell^1, \lVert\cdot\rVert_1)$ and $Y = (\ell^1, \lVert\cdot\rVert_\infty)$, with $T$ = identity. $T$ is bounded ($\lVert x\rVert_\infty \le \lVert x\rVert_1$) and bijective. Its inverse is unbounded: $u_n = (1, 1, \dots, 1, 0, \dots)$ ($n$ ones) has $\lVert u_n\rVert_\infty = 1$ but $\lVert u_n\rVert_1 = n$. No contradiction: $Y$ is not complete (its completion is $c_0$, and $(1, \tfrac12, \tfrac13, \dots) \in c_0 \setminus \ell^1$ is a limit of finitely supported sequences).

### Example 3: Lebesgue constants, computed
**$N = 0$:** $D_0 = 1$, $L_0 = 1$.

**$N = 1$:** $D_1(t) = e^{-it} + 1 + e^{it} = 1 + 2\cos t$. It is $\ge 0$ exactly when $\cos t \ge -\tfrac12$, i.e. $\lvert t\rvert \le \tfrac{2\pi}3$. So
$$\int_{-\pi}^\pi\lvert 1 + 2\cos t\rvert\,dt = \int_{-2\pi/3}^{2\pi/3}(1 + 2\cos t)\,dt - 2\int_{2\pi/3}^{\pi}(1 + 2\cos t)\,dt.$$
First integral: $\tfrac{4\pi}{3} + 4\sin\tfrac{2\pi}3 = \tfrac{4\pi}3 + 2\sqrt3$. Second: $2\left[\tfrac\pi3 + 2\left(\sin\pi - \sin\tfrac{2\pi}3\right)\right] = \tfrac{2\pi}{3} - 2\sqrt3$. Difference: $\tfrac{2\pi}3 + 4\sqrt3$. Dividing by $2\pi$:
$$L_1 = \frac13 + \frac{2\sqrt3}{\pi} \approx 1.4360.$$

**Numerically** (midpoint rule with $2\times10^6$ points, Python):

| $N$ | 0 | 1 | 2 | 5 | 10 | 100 | 1000 |
|---|---|---|---|---|---|---|---|
| $L_N$ | 1.0000 | 1.4360 | 1.6422 | 1.9614 | 2.2234 | 3.1388 | 4.0702 |
| $\tfrac4{\pi^2}\ln N$ | — | 0 | 0.281 | 0.652 | 0.933 | 1.866 | 2.800 |

The difference $L_N - \tfrac4{\pi^2}\ln N$ settles near $1.27$, consistent with $L_N = \tfrac{4}{\pi^2}\ln N + O(1)$. The growth is painfully slow (at $N = 1000$ the norm is only about 4), which is why a divergent example has to be built from oscillations at wildly different frequencies.

### Example 4: A closed graph that is not bounded (and why it doesn't contradict anything)
Let $X = C^1[0,1]$ with the **sup norm** and $Y = C[0,1]$ with the sup norm, and $D f = f'$.
- **Unbounded:** $f_n(x) = x^n$ has $\lVert f_n\rVert_\infty = 1$ and $\lVert f_n'\rVert_\infty = \max_x n x^{n-1} = n$.
- **Closed graph:** if $f_n \to f$ uniformly and $f_n' \to g$ uniformly, then (by the fundamental theorem of calculus, $f_n(x) = f_n(0) + \int_0^x f_n'$, and passing to the limit) $f(x) = f(0) + \int_0^x g$, so $f \in C^1$ and $f' = g$. ✓

The closed graph theorem doesn't apply because $X = (C^1[0,1], \lVert\cdot\rVert_\infty)$ is not complete (uniform limits of $C^1$ functions can have corners, like smooth approximations of $\lvert x - \tfrac12\rvert$). Under the complete norm $\lVert f\rVert_{C^1} = \lVert f\rVert_\infty + \lVert f'\rVert_\infty$, $D$ is bounded with norm $\le 1$. This is the pattern of unbounded operators in physics: closed, densely defined, not everywhere defined (↪ S2E31).

### Example 5: Banach–Steinhaus for quadrature rules
A quadrature rule $Q_n(f) = \sum_{k=1}^{m_n} w_{k}^{(n)} f(x_k^{(n)})$ is a functional on $C[a,b]$ (a combination of evaluations, ↩ S2E07) with norm $\lVert Q_n\rVert = \sum_k\lvert w_k^{(n)}\rvert$ (test on a continuous $f$ with $f(x_k) = \operatorname{sgn} w_k$, $\lVert f\rVert_\infty = 1$). **Pólya's theorem** follows from Banach–Steinhaus: $Q_n(f) \to \int_a^b f$ for every $f \in C[a,b]$ iff (i) it holds for every polynomial and (ii) $\sup_n\sum_k\lvert w_k^{(n)}\rvert < \infty$.
- *Necessity of (ii):* UBP on the Banach space $C[a,b]$.
- *Sufficiency:* for $f \in C[a,b]$ and $\varepsilon > 0$, pick a polynomial $p$ with $\lVert f - p\rVert_\infty < \varepsilon$ (Weierstrass), and with $M = \sup_n\lVert Q_n\rVert$,
$$\left\lvert Q_n f - \int f\right\rvert \le \lvert Q_n(f - p)\rvert + \left\lvert Q_n p - \int p\right\rvert + \left\lvert\int(p - f)\right\rvert \le M\varepsilon + o(1) + (b-a)\varepsilon.$$
Gaussian quadrature has positive weights summing to $b - a$, so (ii) holds and it converges for every continuous function. Newton–Cotes rules with many equally spaced nodes have weights of both signs with $\sum\lvert w_k\rvert \to \infty$, so for some continuous $f$ they fail to converge.

## Visual and animation notes
1. **Cold open:** Fourier partial sums of a "nice" function converging; then a mysterious function whose partial sums at $x = 0$ spike higher and higher. Split screen: du Bois-Reymond's elaborate construction (layers of wiggles) vs. a three-line Banach–Steinhaus proof on a chalkboard.
2. **Baire (key visual):** a square (the space) covered by thin "dust" sets $F_1, F_2, \dots$ (lines, Cantor dust). A sequence of shrinking closed disks dodges each one in turn, nesting down to a point that no $F_n$ touches. Then the same animation on ℚ: the disks shrink toward $\sqrt2$, which is missing (↩ S1E07 stamp), and the argument collapses.
3. **UBP:** a family of operators drawn as grid transformations (S2 linear-map motif); at each point, a vertical bar shows $\sup_\alpha\lVert T_\alpha x\rVert$. Regions where the bar is $\le n$ shaded in increasing colors; one region turns out to contain a whole ball, and the bound spreads to everything by translation and scaling.
4. **Open mapping:** a ball in $X$ mapped by $T$ to a blob in $Y$ containing a smaller ball. Then a successive-approximation zig-zag ($x_1, x_2, \dots$) closing in on a preimage.
5. **Closed graph:** the graph of $T$ as a sheet in $X \times Y$; for the derivative on $C^1$ with the sup norm, sequences slide along the sheet and reach its edge (closed), while their $Y$-components shoot to infinity (unbounded).
6. **Showcase:** the Dirichlet kernel $D_N$ getting taller and more oscillatory; its absolute value's area (shaded) growing like $\log N$ in a side meter with the table values.
7. **Hamel basis:** an infinite-dimensional space drawn as a ball, with nested flat subspaces $F_1 \subset F_2 \subset \cdots$ as ever-larger but paper-thin sheets that never fill it.

## Common misconceptions
- **Misconception:** "Meagre" means "small" in the sense of measure. **Reality:** the two notions are independent. ℝ is the union of a meagre set and a null set (e.g. a dense $G_\delta$ null set and its complement). The Cantor set is meagre and null; a fat Cantor set is meagre but has positive measure.
- **Misconception:** UBP says pointwise convergent families converge uniformly. **Reality:** it says pointwise *bounded* families are *uniformly bounded in operator norm*. Convergence $T_n x \to Tx$ for each $x$ does not imply $\lVert T_n - T\rVert \to 0$ (e.g. truncations $P_n x = (x_1, \dots, x_n, 0, \dots)$ on $\ell^2$ converge pointwise to the identity, but $\lVert I - P_n\rVert = 1$).
- **Misconception:** A linear map with a closed graph is always bounded. **Reality:** only between Banach spaces (Example 4).
- **Misconception:** The Fourier series of a continuous function converges, maybe slowly. **Reality:** it can diverge at points, and divergence at a given point is generic in $C(\mathbb T)$; it does converge in $L^2$ and (Carleson) almost everywhere.
- **Misconception:** The Big Three need the Axiom of Choice like Hahn–Banach. **Reality:** Baire's theorem for complete metric spaces needs only countable (dependent) choice, and for separable spaces even less; the Big Three are "constructive-flavored," unlike Hahn–Banach.

## Exercises
- **Warm-up (computational):** Compute $L_2 = \frac1{2\pi}\int_{-\pi}^\pi\lvert 1 + 2\cos t + 2\cos 2t\rvert\,dt$ numerically, and check it against the table. Then verify the identity $1 + 2\sum_{n=1}^N\cos nt = \frac{\sin((N + \frac12)t)}{\sin(t/2)}$ at $t = \pi/2$, $N = 2$.
- **Core (conceptual):** Let $X$ be a Banach space and $x_n \in X$ with $\sum_n\lvert f(x_n)\rvert < \infty$ for every $f \in X^*$. Show that $\sup_N\lVert\sum_{n\le N}\varepsilon_n x_n\rVert < \infty$ for every choice of signs $\varepsilon_n = \pm1$. (Use UBP.) Then explain why the closed graph theorem implies: if a Banach space is the direct sum of two closed subspaces $M \oplus N$, the projection onto $M$ along $N$ is bounded.
- **Stretch (proof):** Prove that the set of continuous functions on $[0,1]$ that are differentiable at *some* point is meagre in $(C[0,1], \lVert\cdot\rVert_\infty)$. (Hint: $E_n = \lbrace f : \exists x,\ \lvert f(y) - f(x)\rvert \le n\lvert y - x\rvert\ \forall y\rbrace$ is closed and nowhere dense; approximate any $f$ by a sawtooth-perturbed polynomial.) Conclude that continuous nowhere-differentiable functions exist.

<details><summary>Hints and answers</summary>

- **Warm-up:** $L_2 \approx 1.6422$ (matches the table). At $t = \pi/2$: left side $1 + 2\cos\tfrac\pi2 + 2\cos\pi = 1 + 0 - 2 = -1$; right side $\sin(5\pi/4)/\sin(\pi/4) = (-\tfrac{\sqrt2}2)/(\tfrac{\sqrt2}{2}) = -1$. ✓
- **Core:** for each $f$, $\lvert f(\sum_{n\le N}\varepsilon_n x_n)\rvert \le \sum_n\lvert f(x_n)\rvert$, so the set $\lbrace\sum_{n\le N}\varepsilon_nx_n\rbrace$ is weakly bounded, hence bounded (Section 3 corollary). For the projection $P$: if $x_k \to x$ and $Px_k \to y$, then $y \in M$ (closed) and $x_k - Px_k \to x - y \in N$ (closed), so $x = y + (x - y)$ is the $M \oplus N$ decomposition and $Px = y$: closed graph.
- **Stretch:** this is Banach's 1931 argument. Closedness of $E_n$ uses compactness of $[0,1]$ (limit points $x$). Nowhere density: near any $f$, a polynomial plus a tiny sawtooth with huge slopes is in no $E_n$ ball. The complement of $\bigcup_n E_n$ is residual, hence nonempty, and its members are nowhere differentiable.

</details>

## Historical note
René Baire proved his category theorem for the real line and $\mathbb R^n$ in his 1899 thesis, *Sur les fonctions de variables réelles*, while classifying limits of continuous functions. Paul du Bois-Reymond published his continuous function with a divergent Fourier series in 1876 (announced in 1873). Henri Lebesgue estimated the constants $L_N$ that now bear his name. In 1927 Banach and Hugo Steinhaus published "Sur le principe de la condensation de singularités" in *Fundamenta Mathematicae*, turning many ad hoc constructions of "bad" functions into one principle; Steinhaus had famously "discovered" Banach in 1916, overhearing him discuss the Lebesgue integral on a park bench in Kraków. The open mapping theorem is due to Banach (1929) and Juliusz Schauder (1930), and the closed graph theorem appears in Banach's 1932 book. In 1931 Banach and Stefan Mazurkiewicz independently used Baire's theorem to show that "most" continuous functions are nowhere differentiable, a striking reversal of 19th-century intuition. Andrey Kolmogorov's everywhere-divergent $L^1$ Fourier series (1926) and Lennart Carleson's almost-everywhere convergence theorem for $L^2$ (1966) bracket the story.

## Connections
- **Callbacks:** ↩ S1E07 (ℚ is meagre in itself; holes), ↩ S1E08 (nested intervals; completeness), ↩ S1E12 (countable vs. uncountable; Hamel bases), ↩ S2E07 (evaluations and quadrature as functionals), ↩ S2E20 (no countable Hamel basis: now proved), ↩ S2E21 (bounded operators; finite-dimensional subspaces are closed), ↩ S2E22 (dominated convergence in the Lebesgue-constant argument), ↩ S2E23 (completeness; series criterion), ↩ S2E25 (Hahn–Banach for "weakly bounded ⟹ bounded")
- **Sets up:** ↪ S2E27 (weakly convergent sequences are bounded), ↪ S2E29 (Fourier: $L^2$ convergence vs. pointwise divergence; Carleson), ↪ S2E30 (Fredholm alternative uses open mapping), ↪ S2E31 (Hellinger–Toeplitz; unbounded, closed, densely defined operators)
- **Side quests:** *Wavelets* (attaches at S2E29): bases whose partial sums do converge uniformly for continuous functions, unlike Fourier.

## References
- **Primary / historical**
  - René Baire, *Sur les fonctions de variables réelles*, thesis, *Annali di Matematica Pura ed Applicata* (3) 3 (1899).
  - Stefan Banach and Hugo Steinhaus, "Sur le principe de la condensation de singularités," *Fundamenta Mathematicae* 9 (1927).
  - Stefan Banach, *Théorie des opérations linéaires* (Warsaw, 1932).
  - Stefan Banach, "Über die Baire'sche Kategorie gewisser Funktionenmengen," *Studia Mathematica* 3 (1931).
  - Lennart Carleson, "On convergence and growth of partial sums of Fourier series," *Acta Mathematica* 116 (1966).
- **Textbooks**
  - Walter Rudin, *Real and Complex Analysis*, 3rd ed. (McGraw-Hill, 1987), Ch. 5 (Baire, Banach–Steinhaus, open mapping, closed graph; the divergent Fourier series example).
  - Walter Rudin, *Functional Analysis*, 2nd ed. (McGraw-Hill, 1991), Ch. 2 (Completeness).
  - Haim Brezis, *Functional Analysis, Sobolev Spaces and Partial Differential Equations* (Springer, 2011), Ch. 2 (uniform boundedness, open mapping, closed graph).
  - Erwin Kreyszig, *Introductory Functional Analysis with Applications* (Wiley, 1978), Ch. 4 (uniform boundedness, open mapping, closed graph; applications to Fourier series and numerical integration).
- **Accessible**
  - T. W. Körner, *Fourier Analysis* (Cambridge University Press, 1988): short chapters on du Bois-Reymond's example, Kolmogorov's example, and Carleson's theorem.
  - Yitzhak Katznelson, *An Introduction to Harmonic Analysis*, 3rd ed. (Cambridge University Press, 2004), Ch. II (convergence and divergence of Fourier series).
  - R. Daniel Mauldin (ed.), *The Scottish Book: Mathematics from the Scottish Café* (Birkhäuser, 1981; 2nd ed. 2015), for the Lwów school's culture and problems.
