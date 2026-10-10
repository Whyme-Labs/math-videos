# S2E27: Weak Convergence: Getting Compactness Back

> **Season / Act:** Season 2, Part B, Act VII: Duality in Infinite Dimensions (finale) · **Target runtime:** 20–25 min ·
> **Prerequisites:** S2E20 (the unit ball is not compact), S2E22 ($L^p$, dominated convergence), S2E24 (duals of $\ell^p$, $L^p$; reflexivity), S2E25 (Hahn–Banach: functionals separate points; separation of convex sets), S2E26 (uniform boundedness); S1E12 (the diagonal argument) ·
> **Builds toward:** S2E28 (Hilbert spaces: projection onto closed convex sets), S2E29 (Fourier: Riemann–Lebesgue), S2E30 (compact operators turn weak convergence into norm convergence), S2E33 (δ as a weak* limit; weak solutions of PDEs)

## Learning objectives
By the end of this lesson the viewer can:
1. Define weak convergence $x_n \rightharpoonup x$ and weak* convergence $f_n \overset{*}{\rightharpoonup} f$, and explain why weak limits are unique and weakly convergent sequences are bounded.
2. Prove that $e_n \rightharpoonup 0$ in $\ell^2$, and decide weak convergence for travelling, concentrating, and oscillating sequences in $\ell^p$ and $L^p$.
3. State the Banach–Alaoglu theorem, and prove its sequential version for separable spaces using the diagonal argument.
4. State that bounded sequences in reflexive spaces have weakly convergent subsequences, and use this with Mazur's theorem to prove existence of minimizers (the direct method).
5. Recognize what weak limits do *not* preserve: the norm (only $\lVert x\rVert \le \liminf\lVert x_n\rVert$) and nonlinear expressions.

## Cold open
*(Narration draft.)*

Here's a bump. A little hill of height one, sitting on an infinitely long line. Now let it slide to the right. One step, two steps, a hundred, a million.

Its size never changes. Measure its total energy at any moment and you get exactly the same number. And yet, plant a sensor anywhere on the line, any fixed spot you like, and wait. The bump passes by, the sensor twitches, and then it reads zero. Forever. Plant a thousand sensors. Plant infinitely many, as long as each one stays put and their total sensitivity is finite. Eventually every one of them reads essentially zero.

So does the bump go to zero? Every measurement you can make says yes. The bump itself says no: it's as big as it ever was. It just went somewhere none of your instruments can see. It escaped to infinity.

In Episode 20 we learned the bad news: in infinite dimensions, a bounded sequence doesn't have to have a convergent subsequence. That's a disaster for anyone who wants to prove that an optimal solution exists, the best shape, the lowest energy, the closest point. Today we cheat. We'll stop asking whether the bump converges and start asking whether its *measurements* converge. That weaker question has a beautiful answer, and it gives compactness back.

## The story

### 1. The naive attempt: Bolzano–Weierstrass, and why it fails

In $\mathbb R^n$, every bounded sequence has a convergent subsequence (Bolzano–Weierstrass), and that is how we prove that continuous functions on closed bounded sets attain their minimum. In infinite dimensions this fails at the first example (↩ S2E20): in $\ell^2$, $\lVert e_n\rVert = 1$ and $\lVert e_n - e_m\rVert = \sqrt2$ for $n \ne m$, so no subsequence is Cauchy. Riesz's lemma (↩ S2E21) says this happens in *every* infinite-dimensional normed space.

**The crisis, concretely.** On $\ell^2$, let
$$F(x) = \left(\lVert x\rVert^2 - 1\right)^2 + \sum_{k=1}^\infty \frac{x_k^2}{k^2}.$$
Then $F \ge 0$, and $F(e_n) = 0 + \tfrac1{n^2} \to 0$, so $\inf F = 0$. But $F(x) = 0$ would need $\sum x_k^2/k^2 = 0$, i.e. $x = 0$, and $\lVert x\rVert = 1$: impossible. **The infimum is not attained.** The minimizing sequence $e_n$ is bounded but has no convergent subsequence, and the "limit it wants," $0$, has $F(0) = 1$. In calculus of variations, this is exactly how existence proofs fail. (Weierstrass used a similar phenomenon in 1870 to show that Dirichlet's principle, as Riemann had used it, was not justified.)

We need a weaker notion of convergence in which bounded sequences *do* have convergent subsequences, but which is still strong enough to pass to the limit in the problems we care about.

### 2. The idea: converge in every measurement

> **Definition (weak convergence).** In a normed space $X$, a sequence $x_n$ **converges weakly** to $x$, written $x_n \rightharpoonup x$, if $f(x_n) \to f(x)$ for every $f \in X^*$.

Norm convergence ("strong" convergence) implies weak convergence, since $\lvert f(x_n) - f(x)\rvert \le \lVert f\rVert\lVert x_n - x\rVert$. In finite dimensions the two coincide (take $f$ = the coordinate functionals, ↩ S2E06). Basic facts:
1. **Weak limits are unique**, because $X^*$ separates points (↩ S2E25): if $f(x) = f(y)$ for all $f$, then $x = y$.
2. **Weakly convergent sequences are bounded**, by the uniform boundedness principle applied to $Jx_n \in X^{**}$ (↩ S2E26).
3. **The norm can drop but not jump:** $\lVert x\rVert \le \liminf_n\lVert x_n\rVert$. *Proof:* choose $f$ with $\lVert f\rVert = 1$, $f(x) = \lVert x\rVert$ (Hahn–Banach); then $\lVert x\rVert = \lim f(x_n) \le \liminf\lVert x_n\rVert$. ∎

> **Theorem.** In $\ell^2$, $e_n \rightharpoonup 0$, although $\lVert e_n\rVert = 1$ for all $n$.

**Proof.** By S2E24 (with $p = q = 2$), every $f \in (\ell^2)^*$ has the form $f(x) = \sum_k x_k y_k$ for some $y \in \ell^2$. Then $f(e_n) = y_n$. Since $\sum_k y_k^2 < \infty$, the terms satisfy $y_n \to 0$. So $f(e_n) \to 0 = f(0)$ for every $f$. ∎

That is the cold open: each probe $y$ has finite total sensitivity $\sum y_k^2$, so it can only "see" a region that is essentially finite, and the unit mass escapes past it. The norm drops in the limit: $\lVert 0\rVert = 0 < 1 = \liminf\lVert e_n\rVert$. Where did the mass go? To infinity, where no single functional can see it.

The same proof (with $(\ell^p)^* = \ell^q$, $q < \infty$) gives $e_n \rightharpoonup 0$ in $\ell^p$ for $1 < p < \infty$, and in $c_0$ (dual $\ell^1$). In $\ell^1$ it fails (Worked Example 1).

### 3. Three ways for mass to escape

In function spaces there are three classic mechanisms, and each one is weakly convergent to $0$ in $L^2$ while keeping norm $1$ (or constant):
- **Travelling:** $f_n = \mathbf 1_{[n, n+1]}$ in $L^2(\mathbb R)$. Mass escapes to spatial infinity.
- **Concentrating:** $g_n = \sqrt n\,\mathbf 1_{[0, 1/n]}$ in $L^2[0,1]$. Mass escapes into a point (Worked Example 3).
- **Oscillating:** $\sin(nx)$ in $L^2(0, 2\pi)$. Mass escapes to infinite frequency (Worked Example 2).

The oscillating case is the **Riemann–Lebesgue lemma**: Fourier coefficients of an $L^1$ (in particular $L^2$) function tend to $0$ (↪ S2E29). Weak convergence is how analysts say "the oscillations average out."

### 4. Weak* convergence and Banach–Alaoglu

When the space is itself a dual $X^*$, there is an even weaker notion: test only against elements of $X$ (via $J$), not all of $X^{**}$.

> **Definition (weak\* convergence).** In $X^*$, $f_n \overset{*}{\rightharpoonup} f$ if $f_n(x) \to f(x)$ for every $x \in X$ (pointwise convergence of functionals).

Example: in $C[0,1]^*$ (signed measures, ↩ S2E24), $\delta_{1/n} \overset{*}{\rightharpoonup} \delta_0$, since $\delta_{1/n}(\varphi) = \varphi(1/n) \to \varphi(0)$ for every continuous $\varphi$. Yet $\lVert\delta_{1/n} - \delta_0\rVert = 2$: no norm convergence. Weak* convergence is the natural convergence of measures, of probability distributions (convergence in distribution, as in the central limit theorem), and of distributions (↪ S2E33).

> **Theorem (Banach–Alaoglu).** For any normed space $X$, the closed unit ball of $X^*$ is compact in the weak\* topology.

The general proof embeds the ball into the product $\prod_{x\in X}[-\lVert x\rVert, \lVert x\rVert]$ (the space of all "candidate values" $f(x)$), which is compact by **Tychonoff's theorem**, and checks that the ball is a closed subset. Tychonoff's theorem for arbitrary products is equivalent to the Axiom of Choice; the special case used here (compact Hausdorff factors) needs only the ultrafilter lemma (↩ S1E15). For separable spaces, a hands-on sequential version needs nothing but Cantor's diagonal trick:

> **Theorem (sequential Banach–Alaoglu).** If $X$ is a separable normed space, every bounded sequence in $X^*$ has a weak\*-convergent subsequence.

**Proof.** Let $\lVert f_n\rVert \le M$ and let $\lbrace x_1, x_2, \dots\rbrace$ be dense in $X$.
- The numbers $f_n(x_1)$ are bounded by $M\lVert x_1\rVert$, so (Bolzano–Weierstrass in $\mathbb R$ or $\mathbb C$) some subsequence $f_{1,1}, f_{1,2}, f_{1,3}, \dots$ has $f_{1,j}(x_1)$ convergent.
- From that subsequence extract a further subsequence $f_{2,j}$ with $f_{2,j}(x_2)$ convergent. Continue: row $k$ is a subsequence of row $k-1$ along which $f(x_k)$ converges.
- **Diagonal:** let $g_j = f_{j,j}$. For each $k$, $(g_j)_{j \ge k}$ is a subsequence of row $k$, so $g_j(x_k)$ converges, for every $k$. (↩ S1E12: the same infinite table, this time with the diagonal used to *build* something.)
- **From the dense set to everything:** for $x \in X$ and $\varepsilon > 0$, pick $x_k$ with $\lVert x - x_k\rVert < \varepsilon$. Then
  $$\lvert g_i(x) - g_j(x)\rvert \le \lvert g_i(x - x_k)\rvert + \lvert g_i(x_k) - g_j(x_k)\rvert + \lvert g_j(x_k - x)\rvert \le 2M\varepsilon + \lvert g_i(x_k) - g_j(x_k)\rvert,$$
  so $g_j(x)$ is Cauchy, hence convergent. Define $g(x) = \lim g_j(x)$; it is linear and $\lvert g(x)\rvert \le M\lVert x\rVert$, so $g \in X^*$ and $g_j \overset{*}{\rightharpoonup} g$. ∎

The bound $M$ was used crucially in the last step: boundedness is exactly what turns "convergence on a dense set" into "convergence everywhere."

### 5. Reflexive spaces: compactness regained, and the direct method

In a reflexive space $X = X^{**}$, weak and weak* convergence (viewing $X$ as the dual of $X^*$) coincide, and Banach–Alaoglu applies to $X$ itself.

> **Theorem.** If $X$ is reflexive, every bounded sequence in $X$ has a weakly convergent subsequence. (Conversely, by the Eberlein–Šmulian and Kakutani theorems, a Banach space with this property is reflexive.)

*Sketch.* Replace $X$ by the closed span $Y$ of the sequence; $Y$ is separable and (as a closed subspace of a reflexive space) reflexive, so $Y^{**} = Y$ is separable, hence $Y^*$ is separable (↩ S2E24). Apply the sequential Banach–Alaoglu theorem to the sequence $Jx_n$ in $Y^{**} = (Y^*)^*$, and then extend from $Y$ to $X$ using Hahn–Banach (restrictions of functionals on $X$ to $Y$). ∎

So in $\ell^p$ and $L^p$ with $1 < p < \infty$, and in every Hilbert space, **bounded sequences have weakly convergent subsequences**. This is the substitute for Bolzano–Weierstrass. (In $\ell^1$, $L^1$, and $C[0,1]$, it fails: Worked Examples 1 and 3.)

To use it for minimization, we need a functional that behaves well under weak limits. Norm-continuity is not enough (the $F$ of Section 1 is norm-continuous). The fix comes from geometry:

> **Theorem (Mazur).** A convex, norm-closed subset of a normed space is weakly closed: if $x_n \in C$ and $x_n \rightharpoonup x$, then $x \in C$.

**Proof.** If $x \notin C$, Hahn–Banach separation (↩ S2E25) gives $f \in X^*$ with $\sup_C f < f(x)$. But $f(x_n) \le \sup_C f$ for all $n$ and $f(x_n) \to f(x)$, a contradiction. ∎

Applying Mazur to the sublevel sets $\lbrace F \le t\rbrace$: **a convex, norm-continuous functional is weakly lower semicontinuous**, $F(x) \le \liminf F(x_n)$ whenever $x_n \rightharpoonup x$.

> **Theorem (direct method of the calculus of variations).** Let $X$ be reflexive, $C \subseteq X$ nonempty, closed, and convex, and $F : C \to \mathbb R$ convex, continuous, and **coercive** ($F(x) \to \infty$ as $\lVert x\rVert \to \infty$). Then $F$ attains its minimum on $C$.

**Proof.** Let $m = \inf_C F$ and choose $x_n \in C$ with $F(x_n) \to m$. Coercivity makes $(x_n)$ bounded (otherwise $F(x_n)$ would be unbounded along a subsequence). Reflexivity gives a subsequence $x_{n_j} \rightharpoonup x$. Mazur gives $x \in C$. Weak lower semicontinuity gives $F(x) \le \liminf F(x_{n_j}) = m$. So $F(x) = m$ (and in particular $m > -\infty$). ∎

Three ingredients: **compactness** (reflexivity), **closedness** (convexity + Mazur), and **lower semicontinuity** (convexity again). Each one was missing for the $F$ of Section 1: the term $(\lVert x\rVert^2 - 1)^2$ is not convex, and weak limits can lower $\lVert x\rVert^2$ from $1$ to $0$, which *raises* $F$.

This is how existence is proved for minimal energies in elasticity, for the Dirichlet problem (↪ S2E33: Lax–Milgram), for optimal control, and for the nearest point of a closed convex set (↪ S2E28).

## Worked examples

### Example 1: $e_n$ in four spaces
- **$\ell^2$:** $e_n \rightharpoonup 0$ (Section 2).
- **$\ell^p$, $1 < p < \infty$:** functionals are $y \in \ell^q$, $q < \infty$; $f(e_n) = y_n \to 0$ since $\sum\lvert y_k\rvert^q < \infty$. So $e_n \rightharpoonup 0$.
- **$c_0$:** functionals are $y \in \ell^1$; $y_n \to 0$. So $e_n \rightharpoonup 0$.
- **$\ell^1$:** functionals are $y \in \ell^\infty$. Take $y = (1, 1, 1, \dots)$: $f(e_n) = 1$ for all $n$, while $f(0) = 0$. So $e_n \not\rightharpoonup 0$. Could $e_n \rightharpoonup x$ for some other $x$? Testing with $y = e_k \in \ell^\infty$ gives $x_k = \lim_n (e_n)_k = 0$ for every $k$, so $x$ would be $0$: contradiction. **$(e_n)$ has no weak limit in $\ell^1$**, and the same argument applies to every subsequence.

In fact $\ell^1$ has the **Schur property**: a sequence converges weakly iff it converges in norm (proved with a Baire-category argument). In $\ell^1$, weak convergence buys no compactness at all; this is consistent with $\ell^1$ being non-reflexive (↩ S2E24).

### Example 2: Oscillation: $\sin(nx) \rightharpoonup 0$, but $\sin^2(nx) \rightharpoonup \tfrac12$
Work in $L^2(0, 2\pi)$, whose dual is $L^2(0,2\pi)$ via $g \mapsto \int f g$.

**Norm:** $\int_0^{2\pi}\sin^2(nx)\,dx = \int_0^{2\pi}\frac{1 - \cos 2nx}{2}\,dx = \pi$, so $\lVert\sin(n\cdot)\rVert_2 = \sqrt\pi$ for all $n \ge 1$.

**Weak limit, step 1 (intervals):** for $g = \mathbf 1_{[a,b]}$,
$$\int_a^b \sin(nx)\,dx = \frac{\cos(na) - \cos(nb)}{n},\qquad \text{so}\quad \left\lvert\int_a^b\sin(nx)\,dx\right\rvert \le \frac2n \to 0.$$
By linearity this holds for every step function $s$.

**Step 2 (density):** step functions are dense in $L^2(0,2\pi)$. Given $g \in L^2$ and $\varepsilon > 0$, choose a step function $s$ with $\lVert g - s\rVert_2 < \varepsilon$. By Cauchy–Schwarz,
$$\left\lvert\int\sin(nx)g\right\rvert \le \left\lvert\int\sin(nx)s\right\rvert + \sqrt\pi\,\varepsilon,$$
so $\limsup_n\lvert\int\sin(nx)g\rvert \le \sqrt\pi\,\varepsilon$ for every $\varepsilon$. Hence $\sin(nx) \rightharpoonup 0$. (The uniform bound $\sqrt\pi$ is what makes the density step work, exactly as in sequential Banach–Alaoglu.)

**Squares:** $\sin^2(nx) = \tfrac12 - \tfrac12\cos(2nx)$, and the same argument gives $\cos(2nx) \rightharpoonup 0$. So $\sin^2(nx) \rightharpoonup \tfrac12$. **But $0^2 = 0 \ne \tfrac12$.** Weak limits do not commute with nonlinear functions. Also note $\lVert 0\rVert = 0 < \sqrt\pi$: all the energy went into ever-faster oscillation. This is the mathematical root of homogenization (fine-scale microstructure has averaged effects that the weak limit of the field itself does not record).

### Example 3: Concentration: weak in $L^2$, not weak in $L^1$, weak\* as a measure
**(a) In $L^2[0,1]$:** $g_n = \sqrt n\,\mathbf 1_{[0,1/n]}$ has $\lVert g_n\rVert_2^2 = n\cdot\tfrac1n = 1$. For $h \in L^2[0,1]$, by Cauchy–Schwarz on $[0, 1/n]$,
$$\left\lvert\int_0^1 g_n h\right\rvert = \sqrt n\left\lvert\int_0^{1/n}h\right\rvert \le \sqrt n\cdot\sqrt{\tfrac1n}\left(\int_0^{1/n}\lvert h\rvert^2\right)^{1/2} = \left(\int_0^{1/n}\lvert h\rvert^2\right)^{1/2} \to 0,$$
the last step by dominated convergence (↩ S2E22). So $g_n \rightharpoonup 0$.

**(b) In $L^1[0,1]$:** $k_n = n\,\mathbf 1_{[0,1/n]}$, $\lVert k_n\rVert_1 = 1$. Suppose $k_n \rightharpoonup k$ in $L^1$ (dual $L^\infty$). Testing with $\mathbf 1_{[a,1]}$ for $0 < a < 1$: $\int_a^1 k_n = 0$ once $1/n < a$, so $\int_a^1 k = 0$ for every $a > 0$, forcing $k = 0$ a.e. But testing with $1$: $\int_0^1 k_n = 1$ for all $n$, so $\int_0^1 k = 1$. Contradiction. **No weak limit in $L^1$** (and none for any subsequence): the bounded set $\lbrace k_n\rbrace$ is not weakly sequentially compact, consistent with $L^1$ being non-reflexive.

**(c) As measures:** viewing $k_n\,dx$ in $C[0,1]^*$, for continuous $\varphi$,
$$\int_0^1 k_n\varphi = n\int_0^{1/n}\varphi(x)\,dx \to \varphi(0)$$
(it is the average of $\varphi$ over $[0,1/n]$, and $\varphi$ is continuous at $0$). So $k_n \overset{*}{\rightharpoonup} \delta_0$. The limit exists, but *outside* $L^1$: it is the Dirac measure. Banach–Alaoglu guaranteed a weak\* limit in the bigger space $C[0,1]^*$; $L^1$ was too small to hold it. This is the seed of the season finale (↪ S2E33): δ is the weak\* limit of ever-taller, ever-thinner bumps.

### Example 4: Convex vs. non-convex minimization
**Non-convex (fails):** $F(x) = (\lVert x\rVert^2 - 1)^2 + \sum_k x_k^2/k^2$ on $\ell^2$ (Section 1). Minimizing sequence $e_n$: $F(e_n) = 1/n^2 \to 0$; weak limit $0$ with $F(0) = (0 - 1)^2 + 0 = 1 > 0 = \liminf F(e_n)$. Weak lower semicontinuity fails, and the infimum $0$ is not attained.

**Convex (works):** $G(x) = \lVert x\rVert^2 - 2\sum_k\frac{x_k}{k}$ on $\ell^2$. It is convex, continuous, and coercive ($G(x) \ge \lVert x\rVert^2 - 2\lVert x\rVert\cdot\lVert(1/k)\rVert_2$ by Cauchy–Schwarz). The direct method guarantees a minimizer. Here we can find it: completing the square coordinatewise, $G(x) = \sum_k\left(x_k - \tfrac1k\right)^2 - \sum_k\tfrac1{k^2}$, minimized at $x^* = (1, \tfrac12, \tfrac13, \dots) \in \ell^2$ with
$$\min G = -\sum_{k=1}^\infty\frac1{k^2} = -\frac{\pi^2}6 \approx -1.6449.$$
The theorem guarantees existence even when no formula is available, which is the usual situation for PDEs.

### Example 5: Weak plus norm convergence gives strong convergence in Hilbert space
In a Hilbert space (↪ S2E28), if $x_n \rightharpoonup x$ and $\lVert x_n\rVert \to \lVert x\rVert$, then $x_n \to x$ in norm:
$$\lVert x_n - x\rVert^2 = \lVert x_n\rVert^2 - 2\operatorname{Re}\langle x_n, x\rangle + \lVert x\rVert^2 \to \lVert x\rVert^2 - 2\lVert x\rVert^2 + \lVert x\rVert^2 = 0,$$
using $\langle x_n, x\rangle \to \langle x, x\rangle$ (the functional $\langle\cdot, x\rangle$). For $e_n \rightharpoonup 0$ the norms do not converge to $\lVert 0\rVert$, which is precisely the escaping mass. Moral: **weak convergence fails to be strong exactly when some norm "leaks away."** (The same holds in $L^p$, $1<p<\infty$, by uniform convexity: the Radon–Riesz property.)

## Visual and animation notes
1. **Cold open (key visual):** a bump sliding along a line toward infinity; fixed "probes" (orange sensors, the covector color from S2E06) along the line, each with a readout. Each readout spikes as the bump passes and then decays to 0. A side meter labeled "energy $\lVert f_n\rVert$" stays fixed at 1.
2. **$e_n$ in $\ell^2$:** bar charts of $e_1, e_2, e_3, \dots$ (one blue bar marching right); a fixed probe $y \in \ell^2$ drawn as orange bars decaying to the right; the product readout $y_n$ shrinks.
3. **The three escapes:** a triptych: travelling bump, concentrating spike (narrower and taller in $L^2$ scaling), oscillating sine with rising frequency. Under each, a probe readout going to 0 and an energy meter stuck at a constant.
4. **$\ell^1$ contrast:** the same marching $e_n$ against the probe $(1,1,1,\dots)$ drawn as a flat orange wall; the readout stays at 1, the convergence fails.
5. **Diagonal argument:** S1E12's infinite table, rows = nested subsequences, columns = test points $x_k$; the diagonal lights up, but this time it *selects* instead of flipping (thread 4 callback stamp ↩ S1E12).
6. **Banach–Alaoglu:** a "cube of all possible readings" $\prod_x[-\lVert x\rVert,\lVert x\rVert]$ drawn as a stack of intervals; the dual ball sits inside as a closed slice; a sequence of points in the cube accumulates.
7. **Direct method:** a landscape over a (schematic) infinite-dimensional ball; a minimizing sequence descends; when the landscape is convex it settles into a valley; when it is the non-convex $F$, the sequence slides off toward the "rim at infinity" and the weak limit lands on a high plateau ($F(0) = 1$).
8. **Weak* to δ:** taller, thinner bumps $n\mathbf 1_{[0,1/n]}$ collapsing into a single vertical arrow labeled δ₀, with a probe $\varphi$ reading $\varphi(0)$ (teaser for S2E33).

## Common misconceptions
- **Misconception:** If $x_n \rightharpoonup x$, then $\lVert x_n\rVert \to \lVert x\rVert$. **Reality:** only $\lVert x\rVert \le \liminf\lVert x_n\rVert$; for $e_n \rightharpoonup 0$, the norms stay $1$.
- **Misconception:** Weak limits respect products: if $u_n \rightharpoonup u$ then $u_n^2 \rightharpoonup u^2$. **Reality:** $\sin(nx) \rightharpoonup 0$ but $\sin^2(nx) \rightharpoonup \tfrac12$.
- **Misconception:** Bounded sequences always have weakly convergent subsequences. **Reality:** this characterizes reflexive spaces. In $\ell^1$ and $L^1$ it fails ($e_n$; $n\mathbf 1_{[0,1/n]}$).
- **Misconception:** Weak and weak* convergence are the same thing. **Reality:** in $X^*$, weak* tests against $X$ and weak tests against $X^{**}$, a possibly larger set. They coincide when $X$ is reflexive. In $\ell^1 = c_0^*$, $e_n \overset{*}{\rightharpoonup} 0$ (test against $c_0$), while $e_n$ does not converge weakly (test against $\ell^\infty$).
- **Misconception:** The weak topology is just another metric. **Reality:** on an infinite-dimensional normed space, the weak topology is never metrizable (though it is metrizable on bounded sets when $X^*$ is separable). This is why one speaks of weak *sequential* compactness, and why Eberlein–Šmulian is a real theorem.

## Exercises
- **Warm-up (computational):** In $L^2(0,2\pi)$, compute $\lim_n\int_0^{2\pi}\sin(nx)\,x\,dx$ exactly (integrate by parts) and confirm it is $0$ at rate $1/n$. Then compute the weak limit of $\cos^2(nx)$ and of $\sin(nx)\cos(nx)$.
- **Core (conceptual):** Show that $x_n = e_1 + e_n$ in $\ell^2$ converges weakly, find the limit, and compute $\lim\lVert x_n\rVert$ and $\lVert\text{limit}\rVert$. Then explain why the closed unit *sphere* $\lbrace\lVert x\rVert = 1\rbrace$ of $\ell^2$ is not weakly closed, while the closed unit ball is.
- **Stretch (proof):** Prove that a compact operator turns weak convergence into norm convergence: if $T : X \to Y$ maps bounded sets to relatively compact sets and $x_n \rightharpoonup x$, then $Tx_n \to Tx$ in norm. Apply this to $T(x) = (x_1, x_2/2, x_3/3, \dots)$ on $\ell^2$ and $x_n = e_n$. (↪ S2E30)

<details><summary>Hints and answers</summary>

- **Warm-up:** $\int_0^{2\pi} x\sin(nx)\,dx = \left[-\tfrac{x\cos nx}{n}\right]_0^{2\pi} + \tfrac1n\int_0^{2\pi}\cos nx\,dx = -\tfrac{2\pi}{n} + 0 \to 0$. $\cos^2(nx) = \tfrac12 + \tfrac12\cos 2nx \rightharpoonup \tfrac12$. $\sin(nx)\cos(nx) = \tfrac12\sin(2nx) \rightharpoonup 0$.
- **Core:** $x_n \rightharpoonup e_1$ (since $e_n \rightharpoonup 0$). $\lVert x_n\rVert = \sqrt2$ for $n \ge 2$, while $\lVert e_1\rVert = 1$. The sphere contains all $e_n$ but not their weak limit $0$, so it is not weakly closed. The ball is closed and convex, hence weakly closed by Mazur.
- **Stretch:** if not, a subsequence has $\lVert Tx_{n_j} - Tx\rVert \ge \varepsilon$; by compactness a further subsequence has $Tx_{n_j} \to z$ in norm; but $Tx_n \rightharpoonup Tx$ (for $g \in Y^*$, $g\circ T \in X^*$), so $z = Tx$, contradiction. For the example, $\lVert Te_n\rVert = 1/n \to 0$. ✓

</details>

## Historical note
David Hilbert, in his work on integral equations around 1906, used a form of weak convergence for sequences in $\ell^2$, and Frigyes Riesz developed it for $L^p$ in 1910, where it fit naturally with his description of the dual. Banach's 1932 book treated weak convergence systematically and proved the sequential compactness of bounded sets in the dual of a separable space. Leonidas Alaoglu proved the general compactness theorem in 1940, using Tychonoff's theorem. Shizuo Kakutani (1939) characterized reflexivity by weak compactness of the unit ball, Vitold Šmulian (1940) and William Eberlein (1947) showed that weak compactness and weak sequential compactness agree for subsets of Banach spaces, and Stanisław Mazur (1933) proved that closed convex sets are weakly closed. The direct method has a longer story: Riemann's use of Dirichlet's principle (1851, 1857) was criticized by Weierstrass in 1870, Hilbert rehabilitated it in 1900, and Leonida Tonelli's lower-semicontinuity methods in the 1910s and 1920s laid the groundwork for the modern approach, which today rests squarely on weak compactness in reflexive Sobolev spaces.

## Connections
- **Callbacks:** ↩ S1E12 (the diagonal argument, used constructively), ↩ S1E15 (Choice behind Tychonoff), ↩ S2E06 (coordinate functionals; in finite dimensions weak = strong), ↩ S2E20 (non-compact unit ball, the problem this episode answers), ↩ S2E21 (Riesz's lemma), ↩ S2E22 (dominated convergence; escaping mass $n\mathbf 1_{(0,1/n)}$), ↩ S2E24 (duals of $\ell^p$, $L^p$, $C[0,1]$; reflexivity), ↩ S2E25 (separation ⇒ Mazur; norming functionals ⇒ lower semicontinuity of the norm), ↩ S2E26 (weakly convergent sequences are bounded)
- **Sets up:** ↪ S2E28 (nearest points in closed convex sets; weak + norm ⇒ strong), ↪ S2E29 (Riemann–Lebesgue: Fourier coefficients tend to 0), ↪ S2E30 (compact operators map weakly convergent sequences to norm-convergent ones), ↪ S2E32 (mixing in ergodic theory is a weak-convergence statement: $U^n f \rightharpoonup \int f$), ↪ S2E33 (δ as a weak\* limit; weak solutions and Lax–Milgram)
- **Side quests:** *Convex duality and optimization* (attaches at S2E25): the direct method and Fenchel duality together; *Information geometry* (S3): weak convergence of probability measures.

## References
- **Primary / historical**
  - Stefan Banach, *Théorie des opérations linéaires* (Warsaw, 1932).
  - Leonidas Alaoglu, "Weak topologies of normed linear spaces," *Annals of Mathematics* 41 (1940).
  - Frigyes Riesz, "Untersuchungen über Systeme integrierbarer Funktionen," *Mathematische Annalen* 69 (1910).
  - William F. Eberlein, "Weak compactness in Banach spaces I," *Proceedings of the National Academy of Sciences USA* 33 (1947).
- **Textbooks**
  - Haim Brezis, *Functional Analysis, Sobolev Spaces and Partial Differential Equations* (Springer, 2011), Ch. 3 (weak and weak* topologies, Banach–Alaoglu–Bourbaki, reflexive spaces, Mazur, minimization of convex functionals).
  - Walter Rudin, *Functional Analysis*, 2nd ed. (McGraw-Hill, 1991), Ch. 3 (weak topologies, Banach–Alaoglu).
  - John B. Conway, *A Course in Functional Analysis*, 2nd ed. (Springer GTM 96, 1990), Ch. V (weak topologies; Alaoglu's theorem; reflexivity).
  - Lawrence C. Evans, *Partial Differential Equations*, 2nd ed. (AMS Graduate Studies in Mathematics 19, 2010), Ch. 8 (calculus of variations: the direct method) and Appendix D (weak convergence).
- **Accessible**
  - Bernard Dacorogna, *Introduction to the Calculus of Variations* (Imperial College Press, 2004): the direct method with many examples, including non-attained infima.
  - Terence Tao, *An Epsilon of Room, I: Real Analysis* (AMS, 2010), the sections on weak and weak* topologies and the Banach–Alaoglu theorem (from his Math 245B notes).
