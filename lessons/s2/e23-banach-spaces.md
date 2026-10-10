# S2E23: Banach Spaces: Where Limits Live

> **Season / Act:** Season 2, Part B, Act VI: Norms and Completeness · **Target runtime:** 20–25 min ·
> **Prerequisites:** S2E21 (norms, $\ell^p$, sup and $L^1$ norms on $C[0,1]$), S2E22 (Lebesgue integral, $L^p$); S1E07 (holes in ℚ), S1E08 (building ℝ from Cauchy sequences); Taylor series ·
> **Builds toward:** S2E24 (continuous duals are Banach spaces), S2E26 (Baire and the Big Three need completeness), S2E28 (Hilbert spaces), S2E30 (compact operators)

## Learning objectives
By the end of this lesson the viewer can:
1. Define Cauchy sequences, completeness, and Banach spaces, and decide whether standard examples ($\ell^p$, $C[0,1]$ with various norms, polynomials) are complete.
2. Describe the completion of a normed space and explain why $L^1[0,1]$ is the completion of $C[0,1]$ under the $L^1$ norm.
3. Use the criterion "complete ⟺ every absolutely convergent series converges," and explain why Schauder bases replace Hamel bases.
4. State and prove the Banach fixed-point theorem, and apply it to ODEs (Picard iteration), equations like $x = \cos x$, Newton's method, and PageRank.

## Cold open
*(Narration draft.)*

Here is a sequence of polynomials:
$1$, then $1 + x$, then $1 + x + \tfrac{x^2}{2}$, then $1 + x + \tfrac{x^2}{2} + \tfrac{x^3}{6}$, and so on, adding the next term $x^n/n!$ each time.

Plot them on the interval from 0 to 1. After a few steps you can't tell them apart: each new polynomial differs from the previous one by less than the thickness of the pen. They are homing in on something. By every test we have, this sequence *wants* to converge.

And it does converge, to $e^x$. But $e^x$ is not a polynomial. If your universe contains only polynomials, this sequence is crowding toward a point that doesn't exist.

You've seen this before. Take the fractions $1.4$, $1.41$, $1.414$, $1.4142$, … They crowd toward $\sqrt 2$, and in Season 1 we proved that $\sqrt 2$ is not a fraction. The rational numbers have holes. We fixed that by building the real numbers.

The space of polynomials has holes too. So do many spaces of functions. Today we fill them, the same way we did before, and then use the result to prove that a whole class of equations always has exactly one solution.

## The story

### 1. The naive attempt: polynomials, and a sequence with nowhere to go

Let $\mathcal P$ be the space of polynomials on $[0,1]$ with the sup norm $\lVert p\rVert_\infty = \max_{0 \le x \le 1} \lvert p(x)\rvert$ (↩ S2E21). Let $p_n(x) = \sum_{k=0}^n x^k/k!$. For $m > n$,
$$\lVert p_m - p_n\rVert_\infty = \max_{0\le x\le 1}\sum_{k=n+1}^m \frac{x^k}{k!} = \sum_{k=n+1}^m \frac{1}{k!} \le \sum_{k=n+1}^\infty \frac1{k!},$$
which is a tail of the convergent series for $e$, so it tends to $0$ as $n \to \infty$. The terms get arbitrarily close to *each other*.

In the bigger space $C[0,1]$, $p_n \to e^x$ uniformly. If $p_n$ converged in $\mathcal P$ to some polynomial $q$, then (because a sup-norm limit is unique in $C[0,1]$) we would have $q = e^x$ on $[0,1]$. That is impossible: differentiating a polynomial of degree $d$ a total of $d+1$ times gives $0$, while every derivative of $e^x$ is $e^x \ne 0$.

### 2. The crisis: Cauchy is not convergent

> **Definition.** A sequence $(x_n)$ in a normed space $X$ is **Cauchy** if for every $\varepsilon > 0$ there is $N$ with $\lVert x_m - x_n\rVert < \varepsilon$ for all $m, n \ge N$. The space $X$ is **complete** if every Cauchy sequence converges to a point of $X$.

> **Definition (Banach space).** A **Banach space** is a complete normed vector space.

Every convergent sequence is Cauchy. Completeness is the converse: "if the terms crowd together, there is something for them to crowd around." This is exactly the property that separates ℝ from ℚ (↩ S1E07, S1E08), stated for any space with a norm.

Why care? In infinite dimensions almost everything interesting is defined by a limit: infinite series of functions, solutions of equations by iteration, eigenfunctions as limits of approximations. In an incomplete space, every one of these constructions can fall into a hole.

### 3. The zoo: which spaces are complete?

**Complete (Banach):**
- **Every finite-dimensional normed space**, because all norms on $\mathbb R^n$ are equivalent (↩ S2E21) and ℝ is complete.
- **$\ell^p$ for $1 \le p \le \infty$.** *Proof sketch for $1 \le p < \infty$:* if $(x^{(n)})$ is Cauchy in $\ell^p$, each coordinate is Cauchy in ℝ (since $\lvert x^{(n)}_k - x^{(m)}_k\rvert \le \lVert x^{(n)} - x^{(m)}\rVert_p$), so it converges to some $x_k$. For any fixed $K$ and $m,n\ge N$, $\sum_{k\le K}\lvert x^{(n)}_k - x^{(m)}_k\rvert^p < \varepsilon^p$; let $m \to \infty$ then $K \to \infty$ to get $\lVert x^{(n)} - x\rVert_p \le \varepsilon$ for $n \ge N$. So $x \in \ell^p$ and $x^{(n)} \to x$.
- **$c_0$**, the sequences tending to $0$, with the sup norm (a closed subspace of $\ell^\infty$; closed subspaces of complete spaces are complete).
- **$C[0,1]$ with the sup norm.** A sup-norm Cauchy sequence converges uniformly, and a uniform limit of continuous functions is continuous.
- **$L^p(X,\mu)$ for $1 \le p \le \infty$** (the **Riesz–Fischer theorem**). This is where the Lebesgue integral pays off (↩ S2E22); the proof uses the series criterion below plus the monotone and dominated convergence theorems.

**Not complete:**
- **Polynomials** with the sup norm (Section 1).
- **$c_{00}$**, finitely supported sequences, in any $\ell^p$ norm: $(1, \tfrac12, \tfrac14, \dots, 2^{-n}, 0, 0, \dots)$ is Cauchy, and its limit $(2^{-k})_k$ has infinitely many nonzero terms.
- **$C[0,1]$ with the $L^1$ norm** $\lVert f\rVert_1 = \int_0^1\lvert f\rvert$ (Worked Example 1). Same vector space as the Banach space $(C[0,1], \lVert\cdot\rVert_\infty)$, different norm, different answer. Completeness is a property of the *norm*, not just of the set.

### 4. Completion: filling the holes, one level up

> **Theorem (completion).** Every normed space $X$ sits as a dense subspace of a Banach space $\widehat X$, its **completion**, which is unique up to an isometric isomorphism fixing $X$.

**Construction** (↩ S1E08, line for line): let $\widehat X$ be the set of Cauchy sequences in $X$, modulo the equivalence relation $(x_n) \sim (y_n) \iff \lVert x_n - y_n\rVert \to 0$ (↩ S1E05). Add and scale termwise, and set $\lVert [(x_n)]\rVert = \lim \lVert x_n\rVert$ (this limit exists because $\lvert\, \lVert x_n\rVert - \lVert x_m\rVert\,\rvert \le \lVert x_n - x_m\rVert$). Each $x \in X$ becomes the constant sequence $(x, x, x, \dots)$. One then checks that $\widehat X$ is complete, using a diagonal choice of representatives.

This is "build vs. describe" again. The *construction* gives formal classes of Cauchy sequences. The *description* asks: what are those new elements, concretely?

| Space | Completion | Concretely |
|---|---|---|
| $\mathbb Q$ with $\lvert\cdot\rvert$ | $\mathbb R$ | real numbers (↩ S1E08) |
| polynomials, sup norm on $[0,1]$ | $C[0,1]$ | Weierstrass approximation theorem |
| $c_{00}$, $\ell^p$ norm ($p < \infty$) | $\ell^p$ | sequences with $\sum\lvert x_k\rvert^p < \infty$ |
| $c_{00}$, sup norm | $c_0$ | sequences tending to 0 |
| $C[0,1]$, $L^1$ norm | $L^1[0,1]$ | Lebesgue-integrable functions mod a.e. equality |

The last row is the reason S2E22 exists. Without Lebesgue, the completion of $(C[0,1], \lVert\cdot\rVert_1)$ is just a collection of abstract equivalence classes. With Lebesgue, every Cauchy sequence of continuous functions has a subsequence that converges almost everywhere to an actual integrable function, and the classes become *functions up to null sets*.

### 5. Series and bases: infinite sums need completeness

In Part A, a basis expressed every vector as a *finite* combination. In infinite dimensions that idea (a **Hamel basis**) still exists if you accept Choice (↩ S1E15), but it is unusable: no infinite-dimensional Banach space has a countable Hamel basis (proved with the Baire category theorem, ↪ S2E26). What we want instead are *infinite* sums, and infinite sums are limits.

> **Theorem (series criterion).** A normed space $X$ is complete if and only if every absolutely convergent series converges: whenever $\sum_n \lVert x_n\rVert < \infty$, the partial sums $\sum_{n=1}^N x_n$ converge in $X$.

**Proof (⇒).** Let $s_N = \sum_{n\le N} x_n$. For $M > N$, $\lVert s_M - s_N\rVert \le \sum_{n=N+1}^M \lVert x_n\rVert$, which is a tail of a convergent real series, so $(s_N)$ is Cauchy, hence convergent. *(⇐, sketch.)* Given a Cauchy sequence, pick a subsequence with $\lVert y_{k+1} - y_k\rVert < 2^{-k}$. Then $\sum (y_{k+1} - y_k)$ converges absolutely, hence converges, so the subsequence converges, and a Cauchy sequence with a convergent subsequence converges. ∎

The polynomials in Section 1 are the failure of this criterion: $\sum x^n/n!$ converges absolutely ($\sum \lVert x^n/n!\rVert_\infty = e$) but not in $\mathcal P$.

> **Definition (Schauder basis).** A sequence $(e_n)$ in a Banach space $X$ is a **Schauder basis** if every $x \in X$ has a *unique* expansion $x = \sum_{n=1}^\infty a_n e_n$, convergent in norm.

The unit vectors $e_n$ form a Schauder basis of $\ell^p$ ($1 \le p < \infty$) and of $c_0$, but not of $\ell^\infty$: for $x = (1,1,1,\dots)$, $\lVert x - \sum_{n\le N} e_n\rVert_\infty = 1$ for every $N$. (In fact $\ell^\infty$ is not separable, so it has no Schauder basis at all.) $C[0,1]$ has a Schauder basis made of "tent" functions (Faber–Schauder). Banach asked whether every separable Banach space has a Schauder basis; Per Enflo answered **no** in 1973.

### 6. Showcase: the Banach fixed-point theorem

> **Definition.** A map $T : X \to X$ on a metric space is a **contraction** if there is $q < 1$ with $d(Tx, Ty) \le q\, d(x, y)$ for all $x, y$.

> **Theorem (Banach fixed-point theorem, 1922).** Let $(X, d)$ be a nonempty **complete** metric space and $T$ a contraction with constant $q < 1$. Then $T$ has exactly one fixed point $x^*$. For any starting point $x_0$, the iterates $x_{n+1} = T x_n$ converge to $x^*$, with
> $$d(x_n, x^*) \le \frac{q^n}{1 - q}\, d(x_1, x_0).$$

**Proof.** *Uniqueness:* if $Tx = x$ and $Ty = y$, then $d(x,y) = d(Tx,Ty) \le q\, d(x,y)$, so $(1-q)d(x,y) \le 0$ and $x = y$.

*Existence:* by induction, $d(x_{k+1}, x_k) \le q^k d(x_1, x_0)$. For $m > n$, by the triangle inequality,
$$d(x_m, x_n) \le \sum_{k=n}^{m-1} d(x_{k+1}, x_k) \le d(x_1,x_0) \sum_{k=n}^{\infty} q^k = \frac{q^n}{1-q}\, d(x_1, x_0). \tag{$\ast$}$$
The right side tends to $0$, so $(x_n)$ is Cauchy. **Here completeness is used:** $x_n \to x^*$ for some $x^* \in X$. A contraction is continuous, so $Tx^* = \lim T x_n = \lim x_{n+1} = x^*$. Letting $m \to \infty$ in $(\ast)$ gives the error bound. ∎

Every hypothesis matters. Without completeness, the iterates can converge to a hole (Worked Example 3). With $q = 1$, translation $x \mapsto x + 1$ on ℝ satisfies $d(Tx,Ty) = d(x,y)$ and has no fixed point.

**Applications.**
- **ODEs (Picard–Lindelöf).** The initial value problem $y' = F(t, y)$, $y(0) = y_0$, is equivalent to the fixed-point equation
  $$y = Ty, \qquad (Ty)(t) = y_0 + \int_0^t F(s, y(s))\, ds.$$
  If $\lvert F(t,u) - F(t,v)\rvert \le L\lvert u - v\rvert$, then on $C[0,h]$ with the sup norm, $\lVert Ty - Tz\rVert_\infty \le Lh\, \lVert y - z\rVert_\infty$. For $h < 1/L$, $T$ is a contraction on a Banach space, so there is **exactly one** solution on $[0,h]$, and Picard's iterates converge to it. (Repeating the argument, or using a weighted norm, extends it to any interval.)
- **Newton's method.** To solve $f(x) = 0$, iterate $g(x) = x - f(x)/f'(x)$. Near a simple root $r$, $g'(r) = f(r)f''(r)/f'(r)^2 = 0$, so $\lvert g'\rvert \le q < 1$ on a small closed interval around $r$ that $g$ maps into itself, and $g$ is a contraction there (the mean value theorem converts a derivative bound into a Lipschitz bound).
- **PageRank.** With damping $d \in (0,1)$, the ranking is the fixed point of $G(x) = d\,Mx + \frac{1-d}{N}\mathbf 1$ on probability vectors, where $M$ is the column-stochastic link matrix. Since $\lVert Mv\rVert_1 \le \lVert v\rVert_1$, $\lVert G x - G y\rVert_1 \le d\lVert x - y\rVert_1$: a contraction with constant $d$ in the $\ell^1$ norm on a complete set (Worked Example 4).

## Worked examples

### Example 1: $C[0,1]$ is not complete in the $L^1$ norm
Define the ramps
$$f_n(x) = \begin{cases} 0 & 0 \le x \le \tfrac12,\\ n\left(x - \tfrac12\right) & \tfrac12 \le x \le \tfrac12 + \tfrac1n,\\ 1 & \tfrac12 + \tfrac1n \le x \le 1,\end{cases} \qquad (n \ge 2).$$
**Cauchy.** For $m > n$, $f_m \ge f_n$, and they differ only on $[\tfrac12, \tfrac12 + \tfrac1n]$. Each ramp has $\int_0^1 f_n = \tfrac12 - \tfrac{1}{2n}$ (the region under the graph is a rectangle of area $\tfrac12 - \tfrac1n$ plus a triangle of area $\tfrac1{2n}$). So
$$\lVert f_m - f_n\rVert_1 = \int_0^1 (f_m - f_n) = \left(\tfrac12 - \tfrac1{2m}\right) - \left(\tfrac12 - \tfrac1{2n}\right) = \frac12\left(\frac1n - \frac1m\right) < \frac{1}{2n},$$
which goes to $0$.

**No continuous limit.** Suppose $\lVert f_n - g\rVert_1 \to 0$ with $g \in C[0,1]$. On $[0,\tfrac12]$, $f_n = 0$, so $\int_0^{1/2}\lvert g\rvert \le \lVert f_n - g\rVert_1 \to 0$; hence $\int_0^{1/2}\lvert g\rvert = 0$ and, $g$ being continuous, $g = 0$ on $[0, \tfrac12]$. For any $\delta > 0$, $f_n = 1$ on $[\tfrac12 + \delta, 1]$ once $n > 1/\delta$, so the same argument gives $g = 1$ on $[\tfrac12 + \delta, 1]$, hence on $(\tfrac12, 1]$. Then $g(\tfrac12) = 0$ but $\lim_{x\to 1/2^+} g(x) = 1$, contradicting continuity.

**Where it goes in the completion.** In $L^1[0,1]$, $\lVert f_n - \mathbf 1_{(1/2, 1]}\rVert_1 = \tfrac1{2n} \to 0$. The hole is filled by a step function, which is an element of $L^1$.

### Example 2: Solving $x = \cos x$ by contraction
Let $X = [0,1]$ (closed in ℝ, so complete) and $T(x) = \cos x$.
- **$T$ maps $X$ into $X$:** $\cos$ is decreasing on $[0,1]$, so $T([0,1]) = [\cos 1, 1] \approx [0.5403, 1] \subseteq [0,1]$.
- **Contraction:** by the mean value theorem, $\lvert\cos x - \cos y\rvert = \lvert\sin \xi\rvert\,\lvert x - y\rvert \le \sin(1)\,\lvert x - y\rvert$, with $q = \sin 1 \approx 0.8415 < 1$.

So there is exactly one solution in $[0,1]$. Iterating from $x_0 = 1$:

| $n$ | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| $x_n$ | 0.5403 | 0.8576 | 0.6543 | 0.7935 | 0.7014 | 0.7640 |

The iterates zig-zag toward $x^* \approx 0.7390851332$. The a priori bound with $d(x_1,x_0) = 1 - \cos 1 \approx 0.4597$ guarantees error $< 10^{-6}$ once $\frac{q^n}{1-q}(0.4597) < 10^{-6}$, i.e. $n \ge 87$. In practice $n = 32$ already suffices (checked in Python): the bound is a guarantee, not an estimate, because near $x^*$ the true rate is $\lvert\sin x^*\rvert \approx 0.674$.

### Example 3: Newton's method for $\sqrt 2$, in ℚ and in ℝ
Newton's method for $f(x) = x^2 - 2$ gives $g(x) = x - \frac{x^2 - 2}{2x} = \frac x2 + \frac1x$.
- **$g$ maps $[1,2]$ into itself:** $g'(x) = \tfrac12 - \tfrac1{x^2}$ vanishes at $x = \sqrt2$, where $g$ has its minimum $g(\sqrt 2) = \sqrt 2$; and $g(1) = g(2) = \tfrac32$. So $g([1,2]) = [\sqrt2, \tfrac32] \subseteq [1,2]$.
- **Contraction:** on $[1,2]$, $g'$ is increasing from $g'(1) = -\tfrac12$ to $g'(2) = \tfrac14$, so $\lvert g'\rvert \le \tfrac12$ and $q = \tfrac12$.

Starting at $x_0 = 1$, in exact rational arithmetic:
$$x_1 = \tfrac32,\quad x_2 = \tfrac{17}{12},\quad x_3 = \tfrac{577}{408},\quad x_4 = \tfrac{665857}{470832},$$
with $x_n^2 - 2 = 0.25,\ 0.00694,\ 6.0\times 10^{-6},\ 4.5\times 10^{-12}$ (checked with exact fractions). In $X = [1,2]$ the fixed point is $\sqrt 2$.

Now replace $X$ by $X_{\mathbb Q} = [1,2] \cap \mathbb Q$. Since $g$ sends rationals to rationals, $g$ is still a contraction of $X_{\mathbb Q}$ into itself, and the iterates are the *same* Cauchy sequence. But a fixed point would satisfy $x = \tfrac x2 + \tfrac 1x$, i.e. $x^2 = 2$, and there is no such rational (↩ S1E07). The only hypothesis that failed is completeness. This is the cold open's story with numbers instead of functions.

### Example 4: Picard iteration for $y' = y$, $y(0) = 1$
Here $F(t,y) = y$, so $L = 1$, and $(Ty)(t) = 1 + \int_0^t y(s)\,ds$. Start from $y_0 = 1$:
$$y_1 = 1 + \int_0^t 1\,ds = 1 + t,\qquad y_2 = 1 + \int_0^t (1 + s)\,ds = 1 + t + \tfrac{t^2}2,$$
$$y_3 = 1 + \int_0^t\left(1 + s + \tfrac{s^2}{2}\right)ds = 1 + t + \tfrac{t^2}2 + \tfrac{t^3}6,$$
and by induction $y_n(t) = \sum_{k=0}^n t^k/k!$. **The Picard iterates are exactly the cold-open polynomials.** The fixed-point theorem, applied in the complete space $C[0,h]$ rather than the incomplete space of polynomials, delivers their limit $e^t$.

Quantitatively, on $C[0, \tfrac12]$: $q = Lh = \tfrac12$ and $\lVert y_1 - y_0\rVert_\infty = \max_{[0,1/2]} t = \tfrac12$, so the theorem guarantees $\lVert y_n - e^t\rVert_\infty \le \frac{(1/2)^n}{1/2}\cdot\frac12 = 2^{-n}$. For $n = 3$ the bound is $0.125$, and the true error is $e^{1/2} - y_3(\tfrac12) = 1.64872 - 1.64583 = 0.00289$. ✓

### Example 5: PageRank on a three-page web
Pages $A, B, C$ with links $A \to B$, $A \to C$, $B \to C$, $C \to A$. Column $j$ of $M$ spreads page $j$'s vote evenly over its out-links:
$$M = \begin{pmatrix} 0 & 0 & 1\\ \tfrac12 & 0 & 0\\ \tfrac12 & 1 & 0\end{pmatrix},\qquad d = 0.85,\qquad G(x) = 0.85\,Mx + 0.05\,\mathbf 1.$$
Starting from $x_0 = (\tfrac13, \tfrac13, \tfrac13)$:
- $x_1 = 0.85\,(\tfrac13, \tfrac16, \tfrac12) + 0.05 = (0.3333, 0.1917, 0.4750)$
- $x_2 = (0.4538, 0.1917, 0.3546)$, $x_3 = (0.3514, 0.2428, 0.4058)$, …

The fixed point solves $(I - 0.85M)x = 0.05\,\mathbf 1$; exactly,
$$x^* = \left(\tfrac{686}{1769},\ \tfrac{380}{1769},\ \tfrac{703}{1769}\right) \approx (0.3878,\ 0.2148,\ 0.3974),$$
and the entries sum to $1769/1769 = 1$ (checked in Python, both by iteration and by an exact linear solve). $C$ ranks first: it receives links from both other pages. The contraction constant $0.85$ in $\ell^1$ means each iteration shrinks the error by at least 15%, independent of the size of the web.

## Visual and animation notes
1. **Cold open:** Taylor polynomials of $e^x$ drawn on $[0,1]$, collapsing onto one curve; a label "polynomial?" over the limit curve flips to a red ✗. Split screen: decimals $1.4, 1.41, 1.414, \dots$ crowding a gap on the rational line (↩ S1E07 stamp).
2. **Completion (key visual):** replay S1's "zoom into ℚ and find holes" animation, but the points on the line are now thumbnails of continuous functions. Zooming in on the $L^1$ "line" reveals a gap where the step function should be; the ramps $f_n$ march toward it.
3. **Equivalence classes of Cauchy sequences:** swarms of sequences converging to the same gap blur into one glowing blob (quotient motif), which drops into the hole and becomes a new point labeled $\mathbf 1_{(1/2,1]}$.
4. **"Build or Describe?" segment:** left, "classes of Cauchy sequences"; right, "Lebesgue-integrable functions mod null sets"; a bijection-thread animation joins them.
5. **Unit balls, briefly:** the $\ell^p$ unit-ball morph from S2E21 reappears, with a caption "the norm decides which sequences are Cauchy."
6. **Fixed-point theorem:** a map of a country lying on the floor of that country; the map-of-the-map shrinks toward one point, the "you are here" point. Then a cobweb diagram for $x = \cos x$ zig-zagging inward.
7. **Failure modes:** the cobweb for Newton on $[1,2]\cap\mathbb Q$ spirals into a hole at $\sqrt2$ (a missing point drawn as a dashed circle). Then translation $x \mapsto x+1$ sliding forever.
8. **Picard iteration:** successive iterates $y_n(t)$ appear as the same Taylor polynomials from the cold open; the "aha" overlay links the two scenes.
9. **PageRank:** three nodes, arrows, and "probability fluid" redistributing each iteration; bar chart converging to $(0.388, 0.215, 0.397)$.

## Common misconceptions
- **Misconception:** Completeness is a property of the set of vectors. **Reality:** it depends on the norm. $C[0,1]$ is complete in $\lVert\cdot\rVert_\infty$ and incomplete in $\lVert\cdot\rVert_1$.
- **Misconception:** If $\lVert x_{n+1} - x_n\rVert \to 0$, the sequence is Cauchy. **Reality:** the partial sums of the harmonic series in ℝ have steps $1/n \to 0$ and diverge. Cauchy requires *all* far-out pairs to be close.
- **Misconception:** The completion is "the same space with limits added," so its elements look like the old ones. **Reality:** the new elements can be quite different (step functions in the completion of continuous functions; non-polynomials in the completion of polynomials).
- **Misconception:** A Schauder basis is a basis in the Part A sense. **Reality:** it uses infinite sums and topology. A Hamel basis of an infinite-dimensional Banach space is uncountable and can't be written down.
- **Misconception:** Any map with $d(Tx, Ty) < d(x,y)$ for $x \ne y$ has a fixed point. **Reality:** you need a uniform $q < 1$ (or compactness). On $[1, \infty)$, $T(x) = x + 1/x$ strictly shrinks distances but has no fixed point.

## Exercises
- **Warm-up (computational):** Use the Banach fixed-point theorem to show that $x = \tfrac12\cos x + \tfrac14$ has exactly one real solution, and give the number of iterations from $x_0 = 0$ that guarantees an error below $10^{-3}$.
- **Core (conceptual):** Show that $c_{00}$ with the $\ell^2$ norm is not complete by exhibiting a Cauchy sequence, and identify its completion. Then explain why $\ell^\infty$ cannot have a Schauder basis (use separability).
- **Stretch (proof):** Prove that if some iterate $T^k$ of a map $T$ on a complete metric space is a contraction, then $T$ has a unique fixed point. Use this to show that Picard iteration for $y' = y$, $y(0)=1$, converges on $C[0, 10]$, even though $T$ itself is not a contraction there.

<details><summary>Hints and answers</summary>

- **Warm-up:** on ℝ, $\lvert T x - T y\rvert \le \tfrac12\lvert x - y\rvert$, so $q = \tfrac12$ and ℝ is complete. $x_1 = \tfrac12 + \tfrac14 = \tfrac34$, so $d(x_1,x_0) = 0.75$, and $\frac{(1/2)^n}{1/2}(0.75) = 1.5\cdot 2^{-n} < 10^{-3}$ needs $n \ge 11$.
- **Core:** $x^{(n)} = (1, \tfrac12, \dots, \tfrac1n, 0, \dots)$ is Cauchy in $\ell^2$ (tail of $\sum 1/k^2$); its limit $(1/k)$ has infinitely many nonzero entries. The completion is $\ell^2$. A space with a Schauder basis is separable (rational finite combinations are dense), and $\ell^\infty$ is not separable: the $0/1$-sequences are uncountably many (↩ S1E12) and pairwise at distance 1.
- **Stretch:** if $T^k$ has unique fixed point $x$, then $T^k(Tx) = T(T^k x) = Tx$, so $Tx$ is also a fixed point of $T^k$, hence $Tx = x$. For $y' = y$, induction gives $\lvert (T^k y - T^k z)(t)\rvert \le \frac{t^k}{k!}\lVert y - z\rVert_\infty$, so $T^k$ has constant $10^k/k! < 1$ for large $k$.

</details>

## Historical note
The word "Banach space" honors Stefan Banach, whose 1920 doctoral thesis, published in *Fundamenta Mathematicae* in 1922, gave the axioms of a complete normed space and proved the contraction mapping theorem in that setting. Others had been working toward the idea: Fréchet introduced metric spaces in 1906, Riesz studied $L^p$ in 1910, and Hahn and Wiener considered normed spaces in the early 1920s. The method of successive approximation for ODEs goes back to Liouville and was developed systematically by Émile Picard around 1890; Banach's theorem showed that it is really a fact about complete spaces. Banach's 1932 monograph *Théorie des opérations linéaires* gathered the subject into a book and fixed much of its vocabulary. Many of its open problems were recorded in the Scottish Book at the Scottish Café in Lwów. Mazur's problem about bases and approximation (Problem 153, 1936) carried the prize of a live goose; Per Enflo solved it in 1972 and received the goose in person.

## Connections
- **Callbacks:** ↩ S1E05 (equivalence classes of Cauchy sequences), ↩ S1E07 (√2 and the holes in ℚ), ↩ S1E08 (completion by Cauchy sequences), ↩ S1E12 (uncountability; non-separability of $\ell^\infty$), ↩ S1E15 (Hamel bases need Choice), ↩ S2E02 (bases), ↩ S2E20 (Hamel bases are useless), ↩ S2E21 (norms; the spike example), ↩ S2E22 ($L^p$ and the convergence theorems)
- **Sets up:** ↪ S2E24 ($X^*$ is always a Banach space), ↪ S2E26 (Baire: completeness is the engine behind the Big Three; no countable Hamel basis), ↪ S2E28 (Hilbert spaces are complete inner product spaces; projection needs completeness), ↪ S2E29 (Fourier series converge in $L^2$ because $L^2$ is complete), ↪ S2E30 (compact operators as limits of finite-rank ones), ↪ S2E33 (Sobolev spaces as completions)
- **Side quests:** *p-adic numbers* (S1E08 side quest): completing ℚ under a different norm. The same Cauchy-sequence construction, a very different result.

## References
- **Primary / historical**
  - Stefan Banach, "Sur les opérations dans les ensembles abstraits et leur application aux équations intégrales," *Fundamenta Mathematicae* 3 (1922).
  - Stefan Banach, *Théorie des opérations linéaires* (Monografie Matematyczne 1, Warsaw, 1932).
  - R. Daniel Mauldin (ed.), *The Scottish Book: Mathematics from the Scottish Café* (Birkhäuser, 1981; 2nd ed. 2015).
  - Per Enflo, "A counterexample to the approximation problem in Banach spaces," *Acta Mathematica* 130 (1973).
  - Sergey Brin and Lawrence Page, "The anatomy of a large-scale hypertextual Web search engine," *Computer Networks and ISDN Systems* 30 (1998).
- **Textbooks**
  - Erwin Kreyszig, *Introductory Functional Analysis with Applications* (Wiley, 1978), Ch. 1–2 (metric, normed and Banach spaces; completion) and Ch. 5 (the Banach fixed-point theorem and applications to ODEs and integral equations).
  - Haim Brezis, *Functional Analysis, Sobolev Spaces and Partial Differential Equations* (Springer, 2011), Ch. 4 ($L^p$ spaces, including completeness).
  - Walter Rudin, *Real and Complex Analysis*, 3rd ed. (McGraw-Hill, 1987), Ch. 3 ($L^p$ spaces; Riesz–Fischer) and Ch. 5 (Banach space techniques).
  - John B. Conway, *A Course in Functional Analysis*, 2nd ed. (Springer GTM 96, 1990), Ch. III (Banach spaces).
- **Accessible**
  - Terence Tao, *An Epsilon of Room, I: Real Analysis* (AMS Graduate Studies in Mathematics 117, 2010), the book version of his UCLA Math 245B lecture notes (2009), which treats $L^p$ spaces and Banach spaces in a conversational style.
  - Kurt Bryan and Tanya Leise, "The \$25,000,000,000 eigenvector: the linear algebra behind Google," *SIAM Review* 48 (2006): an accessible account of PageRank, including the role of the damping factor.
