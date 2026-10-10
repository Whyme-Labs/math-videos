# S2E24: The Continuous Dual

> **Season / Act:** Season 2, Part B, Act VII: Duality in Infinite Dimensions · **Target runtime:** 20–25 min ·
> **Prerequisites:** S2E06–S2E08 (covectors, functionals everywhere, the double dual), S2E21 (bounded = continuous, operator norm, $\ell^p$ unit balls), S2E22 ($L^p$), S2E23 (Banach spaces) ·
> **Builds toward:** S2E25 (Hahn–Banach), S2E26 (uniform boundedness), S2E27 (weak and weak* convergence), S2E28 (Riesz representation), S2E33 (distributions)

## Learning objectives
By the end of this lesson the viewer can:
1. Define the continuous dual $X^*$ and its norm, and prove that $X^*$ is always a Banach space.
2. State and use Hölder's inequality, and prove $(\ell^p)^* \cong \ell^q$ for $1 \le p < \infty$, $\tfrac1p + \tfrac1q = 1$.
3. Compute the norm of concrete functionals (including when the norm is not attained), and identify $c_0^* \cong \ell^1$, $(\ell^1)^* \cong \ell^\infty$, and explain why $(\ell^\infty)^*$ is strictly larger than $\ell^1$.
4. Explain why "evaluation at a point" is a legal measurement for the sup norm but not for the $L^1$ norm.
5. Define reflexivity, list which classical spaces are reflexive, and prove that $\ell^1$ is not.

## Cold open
*(Narration draft.)*

In Episode 7, we built a toolbox of measuring devices for functions: the value at a point, the slope at a point, the area under the curve. Each one is linear. Each one turns a function into a number.

Here is a function on the interval from 0 to 1. It's a narrow tent: height 1 at the origin, dropping to zero almost immediately. Its area is tiny, one two-hundredth. Now make the tent narrower. Area one two-thousandth. Narrower still. The area goes to zero. In the $L^1$ sense, where distance is measured by area, these functions are shrinking to nothing.

But ask our first measuring device, "what's the value at 0?", and it says 1. Every time. Functions that are getting arbitrarily small are being measured as "1."

That's a measuring device you can't trust. A thermometer that reads 100 degrees on a block of ice, if the ice is shaped just right, isn't a thermometer. In finite dimensions this can't happen: every linear measurement is automatically continuous. In infinite dimensions it can, and it does.

So today we keep only the trustworthy measurements, the continuous ones. They form a new space, the dual. We'll compute it for the most important spaces, and discover that the "dual of the dual brings you back" from Episode 8 survives for some spaces and dies for others.

## The story

### 1. The naive attempt: the algebraic dual is too big

In Part A, the dual $V^*$ was the space of *all* linear functionals $V \to \mathbb F$ (↩ S2E06). In finite dimensions every linear functional is continuous for every norm, so nothing more needed saying.

In infinite dimensions the algebraic dual contains monsters.
- On $c_{00}$ (finitely supported sequences) with the sup norm, $f(x) = \sum_k k\,x_k$ is linear (the sum is finite), but $f(e_n) = n$ while $\lVert e_n\rVert_\infty = 1$. It is unbounded, hence discontinuous (↩ S2E21: bounded ⟺ continuous).
- On $C[0,1]$ with the $L^1$ norm, evaluation $\delta_0(f) = f(0)$ is linear but discontinuous (Worked Example 3).
- On any infinite-dimensional normed space, a Hamel basis (↩ S1E15, S2E20) gives discontinuous linear functionals: normalize the basis vectors, pick countably many $b_1, b_2, \dots$, and declare $f(b_n) = n$, $f = 0$ on the rest.

A discontinuous functional is a measurement that can't be approximated: small errors in the input produce arbitrarily large errors in the output. Moreover, the algebraic dual is enormous (↩ S2E08: its dimension jumps), and has nothing to do with the norm. We need a dual that sees the topology.

### 2. The fix: keep only the continuous measurements

> **Definition (continuous dual).** For a normed space $X$ over $\mathbb F = \mathbb R$ or $\mathbb C$, the **continuous dual** $X^*$ is the space of bounded (equivalently, continuous) linear functionals $f : X \to \mathbb F$, with the **dual norm**
> $$\lVert f\rVert = \sup_{\lVert x\rVert \le 1}\lvert f(x)\rvert = \sup_{x\ne 0} \frac{\lvert f(x)\rvert}{\lVert x\rVert}.$$

This is the operator norm from S2E21 with target $\mathbb F$. From here on in Part B, "dual" means continuous dual.

> **Theorem.** $X^*$ is a Banach space, **whether or not $X$ is complete.**

**Proof.** Let $(f_n)$ be Cauchy in $X^*$. For each $x$, $\lvert f_n(x) - f_m(x)\rvert \le \lVert f_n - f_m\rVert\,\lVert x\rVert$, so $(f_n(x))$ is Cauchy in $\mathbb F$, which is complete; define $f(x) = \lim f_n(x)$. Then $f$ is linear (limits respect sums and scalar multiples). Given $\varepsilon > 0$, choose $N$ with $\lVert f_n - f_m\rVert < \varepsilon$ for $m,n\ge N$. For $\lVert x\rVert \le 1$ and $n\ge N$, $\lvert f_n(x) - f_m(x)\rvert < \varepsilon$; let $m\to\infty$: $\lvert f_n(x) - f(x)\rvert \le \varepsilon$. So $f_n - f$ is bounded, hence $f = f_n - (f_n - f)$ is bounded, and $\lVert f_n - f\rVert \le \varepsilon$ for $n \ge N$. ∎

The completeness comes from the *scalars*, not from $X$. (The same proof shows the space of bounded operators $B(X,Y)$ is Banach whenever $Y$ is.)

### 3. Computing duals: Hölder is the pairing

The key inequality says that a sequence in $\ell^q$ can always measure a sequence in $\ell^p$.

> **Hölder's inequality.** If $1 \le p \le \infty$ and $q$ is the **conjugate exponent**, $\tfrac1p + \tfrac1q = 1$ (with $q = \infty$ when $p = 1$ and vice versa), then for sequences $x, y$,
> $$\sum_k \lvert x_k y_k\rvert \le \lVert x\rVert_p\, \lVert y\rVert_q.$$
> The same holds for functions: $\int \lvert fg\rvert\,d\mu \le \lVert f\rVert_p\lVert g\rVert_q$.

(For $p = q = 2$ this is Cauchy–Schwarz, ↩ S2E14. The general case follows from Young's inequality $ab \le \tfrac{a^p}p + \tfrac{b^q}q$, itself a consequence of the concavity of $\log$.)

> **Theorem.** Let $1 \le p < \infty$ and $\tfrac1p + \tfrac1q = 1$. The map $y \mapsto T_y$, where $T_y(x) = \sum_k x_k y_k$, is an isometric isomorphism $\ell^q \to (\ell^p)^*$. In short, $(\ell^p)^* \cong \ell^q$.

**Proof** (real scalars; for complex scalars replace $\operatorname{sgn} y_k$ by $\overline{\operatorname{sgn} y_k}$).

*Step 1: $T_y$ is bounded with $\lVert T_y\rVert \le \lVert y\rVert_q$.* By Hölder, the series converges absolutely and $\lvert T_y(x)\rvert \le \lVert x\rVert_p\lVert y\rVert_q$.

*Step 2: $\lVert T_y\rVert = \lVert y\rVert_q$.* If $p = 1$ ($q = \infty$): $\lvert T_y(e_k)\rvert = \lvert y_k\rvert$ with $\lVert e_k\rVert_1 = 1$, so $\lVert T_y\rVert \ge \sup_k \lvert y_k\rvert$. If $1 < p < \infty$ and $y \ne 0$: let $x_k = \operatorname{sgn}(y_k)\,\lvert y_k\rvert^{q-1}$. Since $(q-1)p = q$,
$$\lVert x\rVert_p^p = \sum_k \lvert y_k\rvert^{q} = \lVert y\rVert_q^q, \qquad T_y(x) = \sum_k \lvert y_k\rvert^{q} = \lVert y\rVert_q^q,$$
so $\frac{T_y(x)}{\lVert x\rVert_p} = \lVert y\rVert_q^{\,q - q/p} = \lVert y\rVert_q$. This is the **equality case of Hölder**.

*Step 3: every $f \in (\ell^p)^*$ is some $T_y$.* Set $y_k = f(e_k)$. For $1 < p < \infty$ and each $N$, let $x^{(N)} = \sum_{k\le N} \operatorname{sgn}(y_k)\lvert y_k\rvert^{q-1} e_k$. Then
$$\sum_{k\le N}\lvert y_k\rvert^q = f(x^{(N)}) \le \lVert f\rVert\, \lVert x^{(N)}\rVert_p = \lVert f\rVert\left(\sum_{k\le N}\lvert y_k\rvert^q\right)^{1/p}.$$
Dividing, $\left(\sum_{k\le N}\lvert y_k\rvert^q\right)^{1/q} \le \lVert f\rVert$ for every $N$, so $y \in \ell^q$. (For $p = 1$: $\lvert y_k\rvert = \lvert f(e_k)\rvert \le \lVert f\rVert$, so $y \in \ell^\infty$.) Now $f$ and $T_y$ are both continuous and agree on every $e_k$, hence on $c_{00}$, the finitely supported sequences. **Because $p < \infty$, $c_{00}$ is dense in $\ell^p$** (the tail $\sum_{k>N}\lvert x_k\rvert^p \to 0$). Two continuous functions that agree on a dense set agree everywhere, so $f = T_y$. ∎

The only place $p < \infty$ was used is density. For $p = \infty$ it fails: $(1,1,1,\dots)$ is at distance $1$ from $c_{00}$. That failure is real:

> **Facts.**
> - $(\ell^1)^* \cong \ell^\infty$ (the case $p = 1$ above).
> - $c_0^* \cong \ell^1$, where $c_0$ is the sequences tending to $0$ with the sup norm. (Same proof: $c_{00}$ is dense in $c_0$; test $f$ on $\sum_{k\le N}\operatorname{sgn}(y_k)e_k$.)
> - $(\ell^\infty)^*$ is **strictly larger** than $\ell^1$. It can be identified with the bounded *finitely additive* measures on ℕ. (Worked Example 4.)
> - For any measure space, $(L^p)^* \cong L^q$ for $1 < p < \infty$; $(L^1)^* \cong L^\infty$ when the measure is σ-finite (Lebesgue measure is); $(L^\infty)^*$ is strictly larger than $L^1$ in the cases of interest, such as $L^\infty[0,1]$.
> - $C[0,1]^*$ is the space of finite signed (regular Borel) measures on $[0,1]$ with the total variation norm (the **Riesz–Markov representation theorem**). It contains point masses $\delta_t$ and $L^1$ densities $g(x)\,dx$.

### 4. "The value at a point" is no longer automatic

Evaluation $\delta_a(f) = f(a)$ was the star of S2E07. Now whether it is a legal measurement depends on the norm:
- On $(C[0,1], \lVert\cdot\rVert_\infty)$: $\lvert f(a)\rvert \le \lVert f\rVert_\infty$, so $\delta_a \in X^*$ with $\lVert\delta_a\rVert = 1$.
- On $(C[0,1], \lVert\cdot\rVert_1)$: $\delta_a$ is unbounded (Worked Example 3).
- On $L^1[0,1]$ it is not even well defined: changing $f$ at one point does not change its class (↩ S2E22).

This is the seed planted in S2E07 beginning to sprout. The finale (↪ S2E33) resolves it by changing the space being measured (smooth test functions), so that δ becomes continuous again.

### 5. The double dual and reflexivity

In S2E08 we met the natural map $V \to V^{**}$, "evaluate at $x$." It works for normed spaces too:
$$J : X \to X^{**}, \qquad (Jx)(f) = f(x).$$
- $J$ is linear, and $\lvert (Jx)(f)\rvert = \lvert f(x)\rvert \le \lVert f\rVert\lVert x\rVert$, so $\lVert Jx\rVert \le \lVert x\rVert$.
- In fact $\lVert Jx\rVert = \lVert x\rVert$: $J$ is an **isometric embedding**. The reverse inequality needs a functional $f$ with $\lVert f\rVert = 1$ and $f(x) = \lVert x\rVert$, and in a general normed space only the Hahn–Banach theorem guarantees one (↪ S2E25). For the concrete spaces in this episode we can write it down.

Since $X^{**}$ is a dual, it is complete, so the closure of $J(X)$ in $X^{**}$ is a concrete model of the completion of $X$ (↩ S2E23).

> **Definition (reflexive).** A normed space $X$ is **reflexive** if the canonical map $J : X \to X^{**}$ is surjective.

A reflexive space is automatically a Banach space (it is isometric to the dual space $X^{**}$).

| Space | Dual | Bidual | Reflexive? |
|---|---|---|---|
| finite-dimensional | same dimension | $\cong X$ | yes (↩ S2E08) |
| $\ell^p$, $1 < p < \infty$ | $\ell^q$ | $\ell^p$ | **yes** |
| $L^p$, $1 < p < \infty$ | $L^q$ | $L^p$ | **yes** |
| Hilbert spaces | itself (↪ S2E28) | itself | **yes** |
| $c_0$ | $\ell^1$ | $\ell^\infty$ | no |
| $\ell^1$ | $\ell^\infty$ | $(\ell^\infty)^* \supsetneq \ell^1$ | **no** |
| $\ell^\infty$ | $(\ell^\infty)^*$ | larger still | no |
| $C[0,1]$ | signed measures | larger | **no** |
| $L^1[0,1]$ | $L^\infty[0,1]$ | $(L^\infty)^*$ | no |

For $\ell^p$, $1<p<\infty$, one checks that the composite identification $\ell^p \to (\ell^q)^* = (\ell^p)^{**}$ is exactly $J$, so $J$ is onto.

> **Theorem.** $\ell^1$ and $C[0,1]$ are not reflexive.

**Proof.** We use two facts: (i) if $X^*$ is separable, then $X$ is separable (pick a countable dense set $\lbrace f_n\rbrace$ in the unit sphere of $X^*$, choose unit vectors $x_n$ with $\lvert f_n(x_n)\rvert > \tfrac12$, and show by Hahn–Banach that their rational span is dense); (ii) if $X$ is reflexive then $X^* $ is separable whenever $X$ is: apply (i) to the space $X^*$, whose dual $X^{**} = J(X)$ is separable.

$\ell^1$ is separable (finitely supported rational sequences are dense), but $(\ell^1)^* = \ell^\infty$ is not: the uncountably many $0/1$ sequences are pairwise at distance $1$ (↩ S1E12). So $\ell^1$ is not reflexive.

$C[0,1]$ is separable (polynomials with rational coefficients are dense, by Weierstrass). Its dual contains the point masses $\delta_t$, $t \in [0,1]$, and for $s \ne t$, $\lVert \delta_s - \delta_t\rVert = 2$ (test on a continuous $f$ with $f(s) = 1$, $f(t) = -1$, $\lVert f\rVert_\infty = 1$). Uncountably many points pairwise $2$ apart: $C[0,1]^*$ is not separable. So $C[0,1]$ is not reflexive. ∎

So Ep. 8's "$V \cong V^{**}$, naturally" survives in infinite dimensions only for some spaces, and the dividing line runs between $p = 1, \infty$ and $1 < p < \infty$. A geometric explanation: for $1<p<\infty$ the $\ell^p$ and $L^p$ unit balls are *uniformly convex* ("uniformly round"), while the $\ell^1$ and $\ell^\infty$ balls have flat faces and corners, and the Milman–Pettis theorem says every uniformly convex Banach space is reflexive.

## Worked examples

### Example 1: One sequence, four spaces, four norms
Let $y = (\tfrac12, \tfrac14, \tfrac18, \dots)$, $y_k = 2^{-k}$, and $f(x) = \sum_k x_k 2^{-k}$. Compute $\lVert f\rVert$ on four spaces.

- **On $\ell^1$:** $\lVert f\rVert = \lVert y\rVert_\infty = \tfrac12$. Attained at $x = e_1$: $f(e_1) = \tfrac12$, $\lVert e_1\rVert_1 = 1$.
- **On $\ell^2$:** $\lVert f\rVert = \lVert y\rVert_2 = \left(\sum_{k\ge1} 4^{-k}\right)^{1/2} = \left(\frac{1/4}{1 - 1/4}\right)^{1/2} = \frac1{\sqrt3} \approx 0.5774$. Attained at $x = y/\lVert y\rVert_2$ (Hölder's equality case with $q - 1 = 1$).
- **On $\ell^\infty$:** $\lvert f(x)\rvert \le \sum 2^{-k}\lvert x_k\rvert \le \lVert x\rVert_\infty\sum 2^{-k} = \lVert x\rVert_\infty$, and $x = (1,1,1,\dots)$ gives $f(x) = 1$. So $\lVert f\rVert = 1 = \lVert y\rVert_1$, attained.
- **On $c_0$:** again $\lVert f\rVert = \lVert y\rVert_1 = 1$ (since $c_0^* = \ell^1$), and $x^{(N)} = (1, \dots, 1, 0, 0, \dots)$ ($N$ ones) gives $f(x^{(N)}) = 1 - 2^{-N} \to 1$. **But the norm is not attained**: if $x \in c_0$ and $\lVert x\rVert_\infty \le 1$, then $\lvert x_k\rvert < 1$ for some $k$ (because $x_k \to 0$), so $\lvert f(x)\rvert \le \sum 2^{-k}\lvert x_k\rvert < \sum 2^{-k} = 1$. The only maximizer, $(1,1,1,\dots)$, lives outside $c_0$.

The non-attainment is a fingerprint of non-reflexivity: James's theorem (1964) says a Banach space is reflexive iff every functional attains its norm on the unit ball.

### Example 2: Hölder's equality case, numerically
Take $p = 3$, $q = \tfrac32$, and $y = (4, -1, 1)$ (padded with zeros). Then
$$\lVert y\rVert_{3/2} = \left(4^{3/2} + 1 + 1\right)^{2/3} = 10^{2/3} \approx 4.6416.$$
The proof says the maximizer is $x_k = \operatorname{sgn}(y_k)\lvert y_k\rvert^{q-1} = \operatorname{sgn}(y_k)\lvert y_k\rvert^{1/2}$, i.e. $x = (2, -1, 1)$. Check:
$$T_y(x) = 8 + 1 + 1 = 10,\qquad \lVert x\rVert_3 = (8 + 1 + 1)^{1/3} = 10^{1/3},\qquad \frac{T_y(x)}{\lVert x\rVert_3} = 10^{2/3}. \ ✓$$
Compare a naive guess, $x = y$: $T_y(y) = 16 + 1 + 1 = 18$ and $\lVert y\rVert_3 = 66^{1/3} \approx 4.0412$, ratio $\approx 4.4541 < 4.6416$. A random search over 200,000 directions in Python never exceeded $4.64158$. The equality case is the best "probe": it leans toward the large coordinates, but less than proportionally.

### Example 3: Evaluation at 0, two norms
Let $\delta_0(f) = f(0)$ on $C[0,1]$, and consider the tents $f_n(x) = \max(0, 1 - nx)$.
- $f_n(0) = 1$ for all $n$.
- $\lVert f_n\rVert_\infty = 1$.
- $\lVert f_n\rVert_1 = \int_0^{1/n}(1 - nx)\,dx = \left[x - \tfrac{n x^2}{2}\right]_0^{1/n} = \tfrac1n - \tfrac1{2n} = \tfrac1{2n}$.

**Sup norm:** $\lvert f(0)\rvert \le \lVert f\rVert_\infty$ always, and $f = 1$ gives equality, so $\lVert\delta_0\rVert = 1$.

**$L^1$ norm:** $\frac{\lvert\delta_0(f_n)\rvert}{\lVert f_n\rVert_1} = 2n \to \infty$. So $\delta_0$ is unbounded: $f_n \to 0$ in $L^1$, yet $\delta_0(f_n) = 1 \not\to 0$. This is the cold open's untrustworthy thermometer, and it is why there is no "value at 0" on $L^1$.

### Example 4: A functional on $\ell^\infty$ that no $\ell^1$ sequence represents
Let $c \subset \ell^\infty$ be the subspace of convergent sequences, and $\lim : c \to \mathbb R$, $\lim(x) = \lim_k x_k$. It is linear with $\lvert \lim x\rvert \le \lVert x\rVert_\infty$, so $\lVert\lim\rVert \le 1$ (and $= 1$, using $(1,1,1,\dots)$). The Hahn–Banach theorem (↪ S2E25) extends it to $L \in (\ell^\infty)^*$ with $\lVert L\rVert = 1$.

Suppose $L = T_y$ for some $y \in \ell^1$. Then $y_k = T_y(e_k) = L(e_k) = \lim(e_k) = 0$ for every $k$ (each $e_k$ is eventually $0$). So $y = 0$ and $L = 0$. But $L(1,1,1,\dots) = \lim(1,1,1,\dots) = 1$. Contradiction. Hence $L \in (\ell^\infty)^* \setminus \ell^1$, and $\ell^1 \subsetneq (\ell^\infty)^*$.

Consequently $\ell^1$ is not reflexive by a second route: $J(\ell^1)$ is the copy of $\ell^1$ inside $(\ell^\infty)^* = (\ell^1)^{**}$, and $L$ is not in it. Note the price: the proof that $(\ell^\infty)^*$ is bigger *uses Hahn–Banach*. Nobody can write down $L$ explicitly; it "remembers" only the behavior of $x$ at infinity, something no summable weight sequence can do.

### Example 5: Dual unit balls in the plane
On $\mathbb R^2$ with the $\ell^1$ norm, the functional $f(x_1,x_2) = a x_1 + b x_2$ has
$$\lVert f\rVert = \max_{\lvert x_1\rvert + \lvert x_2\rvert \le 1}\lvert a x_1 + b x_2\rvert = \max(\lvert a\rvert, \lvert b\rvert),$$
because a linear function on the diamond is maximized at a vertex $(\pm1,0)$ or $(0,\pm1)$. So the dual unit ball $\lbrace (a,b) : \lVert f\rVert \le 1\rbrace$ is the **square**: diamond ↔ square. Similarly the dual of $(\mathbb R^2, \ell^\infty)$ has the diamond as its unit ball (maximize over the corners $(\pm1,\pm1)$: $\lvert a\rvert + \lvert b\rvert$), and $\ell^2$'s circle is self-dual. In two dimensions every one of these is reflexive. The asymmetry appears only in infinite dimensions.

## Visual and animation notes
1. **Cold open:** a thermometer labeled "value at 0" probing ever-narrower tents; a second meter labeled "area ($L^1$ size)" drains to 0 while the thermometer stays stuck at 1. The thermometer cracks.
2. **Probes on vectors:** S2E06's color code. Vectors (blue arrows, or blue sequence bar-charts) are pierced by orange level-line stacks. For $X^*$, only the stacks whose spacing has a lower bound on the unit ball are kept (bounded functionals); the others flicker and are discarded.
3. **Key visual: dual unit balls.** Left: the $\ell^p$ unit ball morphing (diamond → circle → square, from S2E21). Right, simultaneously: the $\ell^q$ unit ball morphing the opposite way (square → circle → diamond). A slider labeled $\tfrac1p + \tfrac1q = 1$ links them.
4. **Hölder's equality:** a bar chart of $y$; the optimal probe $x$ appears as $\lvert y_k\rvert^{q-1}$, bars rising and falling as $p$ slides from near $1$ (probe concentrates on the largest entry) to large $p$ (probe flattens toward sign patterns).
5. **Density argument:** finitely supported sequences shown as bar charts with a "cut-off" curtain; for $\ell^p$, $p<\infty$, the curtain moves right and the error shrinks to 0; for $\ell^\infty$ with $(1,1,1,\ldots)$ the error bar stays stuck at height 1.
6. **Double dual:** a vector $x$ "turning inside out" into the machine that eats functionals ($f \mapsto f(x)$). For reflexive spaces the machines fill $X^{**}$ exactly; for $\ell^1$ a shadowy extra machine $L$ (labelled "Banach limit / Hahn–Banach") sits outside the image.
7. **Non-separability:** point masses $\delta_t$ as uncountably many orange spikes over $[0,1]$, each pair 2 apart; a "countable net" fails to catch them.

## Common misconceptions
- **Misconception:** Every linear functional on a normed space is continuous. **Reality:** true in finite dimensions only. In every infinite-dimensional normed space, discontinuous linear functionals exist (using a Hamel basis), and natural ones like $\delta_0$ on $(C[0,1], \lVert\cdot\rVert_1)$ already fail.
- **Misconception:** $(\ell^\infty)^* = \ell^1$ "by symmetry," since $(\ell^1)^* = \ell^\infty$. **Reality:** $\ell^1$ is only the part of $(\ell^\infty)^*$ that is "countably additive"; Banach limits and other Hahn–Banach extensions lie outside it.
- **Misconception:** If $X$ is isometrically isomorphic to $X^{**}$, then $X$ is reflexive. **Reality:** reflexivity requires the *canonical* map $J$ to be onto. R. C. James (1951) built a space isometric to its bidual by some other map, yet not reflexive.
- **Misconception:** The norm of a functional is always attained. **Reality:** on $c_0$, $f(x) = \sum 2^{-k}x_k$ has norm $1$, never attained (and by James's theorem this happens in every non-reflexive Banach space).
- **Misconception:** $X^*$ is complete only if $X$ is. **Reality:** $X^*$ is always complete; completeness comes from the scalars.

## Exercises
- **Warm-up (computational):** Compute the norm of $f(x) = x_1 - 2x_2 + 3x_3$ on $\ell^1$, $\ell^2$, $\ell^3$, and $\ell^\infty$, and give a maximizing $x$ in each case.
- **Core (conceptual):** Show that $\varphi(f) = \int_0^1 f(x)\,dx$ and $\psi(f) = f(\tfrac12)$ are both bounded on $(C[0,1], \lVert\cdot\rVert_\infty)$ with norm 1, but only $\varphi$ is bounded for $\lVert\cdot\rVert_1$. Then compute $\lVert\varphi - \psi\rVert$ in $C[0,1]^*$.
- **Stretch (proof):** Prove $c_0^* \cong \ell^1$ in full, following the proof for $(\ell^p)^*$. Then show that the composite $c_0 \to c_0^{**} \cong \ell^\infty$ is the inclusion $c_0 \hookrightarrow \ell^\infty$, so $c_0$ is not reflexive.

<details><summary>Hints and answers</summary>

- **Warm-up:** $y = (1,-2,3)$. $\ell^1$: $\lVert y\rVert_\infty = 3$, at $x = e_3$. $\ell^2$: $\sqrt{14}$, at $x = y/\sqrt{14}$. $\ell^3$: $q = \tfrac32$, $\lVert y\rVert_{3/2} = (1 + 2^{3/2} + 3^{3/2})^{2/3} \approx 4.3346$, at $x \propto (1, -\sqrt2, \sqrt3)$. $\ell^\infty$: $\lVert y\rVert_1 = 6$, at $x = (1,-1,1)$.
- **Core:** $\lvert\varphi(f)\rvert \le \int\lvert f\rvert = \lVert f\rVert_1$, so $\varphi$ is bounded even for $\lVert\cdot\rVert_1$; tents centered at $\tfrac12$ kill $\psi$ as in Example 3. $\lVert\varphi - \psi\rVert = 2$: take continuous $f$ with $\lVert f\rVert_\infty = 1$, $f(\tfrac12) = -1$, and $f = 1$ outside a tiny interval around $\tfrac12$; then $\varphi(f) - \psi(f) \to 1 + 1 = 2$. (As measures, $dx - \delta_{1/2}$ has total variation $1 + 1 = 2$.)
- **Stretch:** for $f \in c_0^*$, test on $\sum_{k\le N}\operatorname{sgn}(f(e_k))e_k$ to get $\sum_{k\le N}\lvert f(e_k)\rvert \le \lVert f\rVert$. For the bidual, $(Jx)(T_y) = \sum x_k y_k$, which is the pairing of $x \in \ell^\infty$ with $y \in \ell^1$. $(1,1,1,\dots) \in \ell^\infty$ is not in the image.

</details>

## Historical note
Frigyes Riesz introduced the $L^p$ spaces in 1910 precisely to study their duals, proving that the continuous linear functionals on $L^p$ are given by integration against $L^q$ functions for $1 < p < \infty$; in 1909 he had already represented the functionals on $C[a,b]$ as Stieltjes integrals, an early form of the Riesz–Markov theorem. Eduard Helly (1912, 1921) studied extensions of functionals and norms on sequence spaces. Banach's 1932 *Théorie des opérations linéaires* made the dual space a central object, computed many duals, and introduced the canonical embedding into the bidual. Hans Hahn (1927) studied the spaces for which the canonical embedding into the bidual is onto, calling them "regular"; the name "reflexive" came later. Robert C. James's 1951 space, isometric to its bidual but not reflexive, showed how delicate the notion is, and his 1964 theorem characterized reflexivity by norm attainment.

## Connections
- **Callbacks:** ↩ S1E12 (uncountability: non-separability of $\ell^\infty$), ↩ S1E15 (Hamel bases and discontinuous functionals), ↩ S2E06 (covectors as measuring devices), ↩ S2E07 (evaluation functionals; the seed about "value at 0"), ↩ S2E08 (the double dual; reflexivity named), ↩ S2E14 (Cauchy–Schwarz as Hölder with $p=2$), ↩ S2E20 (Hamel bases), ↩ S2E21 (bounded = continuous; $\ell^p$ unit balls), ↩ S2E22 ($L^p$ as equivalence classes), ↩ S2E23 (completeness; density arguments)
- **Sets up:** ↪ S2E25 (Hahn–Banach: isometry of $J$, extensions like Example 4), ↪ S2E26 (uniform boundedness for families of functionals), ↪ S2E27 (weak convergence defined by $X^*$; weak* convergence in $X^*$; reflexivity and compactness), ↪ S2E28 (Riesz: $H^* \cong H$), ↪ S2E33 (δ made continuous on test functions)
- **Side quests:** *Kernel methods and RKHS* (attaches at S2E30): Hilbert spaces of functions where evaluation at a point *is* continuous.

## References
- **Primary / historical**
  - Frigyes Riesz, "Untersuchungen über Systeme integrierbarer Funktionen," *Mathematische Annalen* 69 (1910).
  - Stefan Banach, *Théorie des opérations linéaires* (Monografie Matematyczne 1, Warsaw, 1932).
  - Robert C. James, "A non-reflexive Banach space isometric with its second conjugate space," *Proceedings of the National Academy of Sciences USA* 37 (1951).
- **Textbooks**
  - John B. Conway, *A Course in Functional Analysis*, 2nd ed. (Springer GTM 96, 1990), Ch. III (Banach spaces and their duals) and Ch. V (weak topologies and reflexivity).
  - Haim Brezis, *Functional Analysis, Sobolev Spaces and Partial Differential Equations* (Springer, 2011), Ch. 3 (reflexive and separable spaces) and Ch. 4 (duality of $L^p$).
  - Gerald B. Folland, *Real Analysis*, 2nd ed. (Wiley, 1999), Ch. 5 (Elements of functional analysis) and Ch. 6 ($L^p$ spaces; the dual of $L^p$), Ch. 7 (Riesz representation for $C(X)$).
  - Erwin Kreyszig, *Introductory Functional Analysis with Applications* (Wiley, 1978), Ch. 2 (dual spaces of $\ell^p$) and Ch. 4 (reflexive spaces).
- **Accessible**
  - Robert E. Megginson, *An Introduction to Banach Space Theory* (Springer GTM 183, 1998), Ch. 1 (basic concepts, including duals and reflexivity): rigorous but full of examples.
  - Terence Tao, *An Epsilon of Room, I: Real Analysis* (AMS, 2010), the chapters on $L^p$ spaces and Hilbert/Banach space duality (from his Math 245B notes).
