# S2E22: Measure Spaces: How Big Is a Set?

> **Season / Act:** Season 2, Part B, Act VI: Norms and Completeness · **Target runtime:** 20–25 min ·
> **Prerequisites:** S2E21 (normed spaces, the $L^1$ norm on $C[0,1]$); S1E05 (equivalence classes), S1E11 (countability), S1E12 (ℝ is uncountable), S1E15 (Axiom of Choice); comfort with limits, series, and the Riemann integral ·
> **Builds toward:** S2E23 (Banach spaces: $L^p$ is complete), S2E24 (duals of $L^p$), S2E28 (the Hilbert space $L^2$), S2E29 (Fourier), S2E32 (measure-preserving systems)

## Learning objectives
By the end of this lesson the viewer can:
1. State the definition of a measure space $(X, \Sigma, \mu)$ and explain why measures are required to be *countably* additive.
2. Prove that every countable subset of ℝ has Lebesgue measure zero, and show that the Cantor set is uncountable yet has measure zero.
3. Explain why not every subset of ℝ can be measured (Vitali's construction) and where the Axiom of Choice enters.
4. Compute a Lebesgue integral by "slicing the range," and apply the monotone and dominated convergence theorems (including recognizing when they do *not* apply).
5. Describe $L^p$ as a quotient space of functions modulo equality almost everywhere, and translate the basic vocabulary of probability into measure theory.

## Cold open
*(Narration draft.)*

Pick a number between zero and one, completely at random. What is the chance that you picked a fraction?

The fractions are everywhere. Between any two numbers you can name, there are infinitely many of them. Zoom in anywhere on the number line and they swarm. So surely the chance is big. Half? More?

The answer is zero. Not "very small." Zero.

Here's a stranger one. Start with the interval from 0 to 1. Delete the open middle third. From each of the two pieces that remain, delete the middle third. Keep going, forever. What's left is called the Cantor set. You have thrown away pieces whose lengths add up to exactly 1, the entire length of the interval. And yet what remains is not a handful of points. It has just as many points as the whole real line.

So a set can be as big as ℝ in the sense of counting and as small as nothing in the sense of length. Counting and measuring are different questions. Today we build the machine that answers the second one, and along the way we'll find a set so badly behaved that *no* notion of length can handle it. To build it you need the Axiom of Choice, the same axiom behind the Banach–Tarski paradox.

## The story

### 1. The naive attempt: length, and an integral that chokes

We know the length of an interval: $\ell([a,b]) = b - a$. The natural plan is to extend "length" to more complicated sets by chopping them into intervals and adding.

The Riemann integral is built on the same plan, but it chops the *domain*. To integrate $f$ on $[0,1]$, cut $[0,1]$ into small subintervals, choose a sample point in each, and add up "height × width." If all ways of sampling converge to the same number as the mesh shrinks, $f$ is Riemann integrable.

Now meet **Dirichlet's function**
$$\mathbf 1_{\mathbb Q}(x) = \begin{cases} 1 & x \in \mathbb Q,\\ 0 & x \notin \mathbb Q.\end{cases}$$
Every subinterval, however tiny, contains both rationals and irrationals (↩ S1E07: ℚ is dense, and so are the irrationals). So every upper Riemann sum is $1$ and every lower Riemann sum is $0$. The Riemann integral does not exist.

That is a problem, and not only for one odd function. Let $q_1, q_2, q_3, \dots$ be an enumeration of $\mathbb Q \cap [0,1]$ (↩ S1E11), and let $f_n = \mathbf 1_{\lbrace q_1,\dots,q_n\rbrace}$. Each $f_n$ is zero except at finitely many points, so it is Riemann integrable with $\int_0^1 f_n = 0$. The sequence increases pointwise to $\mathbf 1_{\mathbb Q}$. The integrals converge (to $0$), but the limit function has no Riemann integral at all. **The Riemann integral is not closed under limits.** That is exactly the kind of hole that S1E07 found in ℚ, now in a space of functions.

### 2. The crisis: what should "size" mean?

We want a function $\mu$ that assigns a size to subsets of ℝ, with three properties:
1. $\mu([a,b]) = b - a$ (it extends length);
2. $\mu(A + t) = \mu(A)$ (translation invariance);
3. **countable additivity:** if $A_1, A_2, \dots$ are pairwise disjoint, then $\mu\left(\bigcup_n A_n\right) = \sum_n \mu(A_n)$.

Why *countable*? Because limits are countable processes: the sequence $f_n$ above is indexed by ℕ. Finite additivity is too weak to control limits, and *uncountable* additivity is absurd: $[0,1]$ is an uncountable union of single points, each of length $0$.

Two surprises are waiting:
- Countable additivity immediately forces *every countable set* to have measure zero (Section 3).
- No function satisfying (1)–(3) can be defined on *all* subsets of ℝ (Section 4).

So we must decide in advance *which* sets get measured. That gives the definition.

> **Definition (σ-algebra).** Let $X$ be a set. A collection $\Sigma$ of subsets of $X$ is a **σ-algebra** if $X \in \Sigma$, $\Sigma$ is closed under complements ($A \in \Sigma \Rightarrow X \setminus A \in \Sigma$), and $\Sigma$ is closed under countable unions ($A_1, A_2, \ldots \in \Sigma \Rightarrow \bigcup_n A_n \in \Sigma$). Sets in $\Sigma$ are called **measurable**.

> **Definition (measure space).** A **measure** on $(X, \Sigma)$ is a function $\mu : \Sigma \to [0, \infty]$ with $\mu(\varnothing) = 0$ that is countably additive on pairwise disjoint sets. The triple $(X, \Sigma, \mu)$ is a **measure space**.

Examples to keep in mind:
- **Counting measure** on ℕ: $\Sigma$ = all subsets, $\mu(A) = $ number of elements of $A$ (possibly $\infty$). Integrals against it are sums, so sequences are functions on a measure space. This is how $\ell^p$ becomes a special case of $L^p$.
- **Dirac measure** $\delta_a(A) = 1$ if $a \in A$, else $0$ (↪ S2E33: the same δ, as a measure).
- **Lebesgue measure** $m$ on ℝ, built next.

### 3. Building Lebesgue measure, and the sets of measure zero

> **Definition (Lebesgue outer measure).** For any $A \subseteq \mathbb R$,
> $$m^*(A) = \inf\left\lbrace \sum_{k=1}^\infty (b_k - a_k) \;:\; A \subseteq \bigcup_{k=1}^\infty (a_k, b_k) \right\rbrace.$$

In words: cover $A$ by countably many open intervals as cheaply as possible. Every set has an outer measure, but $m^*$ is only countably *sub*additive in general. Carathéodory's criterion picks out the good sets: $E$ is **Lebesgue measurable** if $m^*(S) = m^*(S \cap E) + m^*(S \setminus E)$ for every $S \subseteq \mathbb R$. These sets form a σ-algebra containing all intervals (hence all open and closed sets, and all **Borel sets**), and $m^*$ restricted to it is a countably additive, translation-invariant measure with $m([a,b]) = b-a$. That is **Lebesgue measure**. (The proofs are a few pages of careful bookkeeping; see Folland Ch. 1 or Tao §1.2.)

A set $N$ is a **null set** if $m^*(N) = 0$. Null sets are automatically measurable.

> **Theorem.** Every countable subset of ℝ has Lebesgue measure $0$. In particular $m(\mathbb Q) = 0$.

**Proof.** Let $A = \lbrace a_1, a_2, a_3, \dots \rbrace$ be countable and let $\varepsilon > 0$. Cover the $k$-th point by the interval
$$I_k = \left(a_k - \frac{\varepsilon}{2^{k+1}},\; a_k + \frac{\varepsilon}{2^{k+1}}\right),\qquad \text{of length } \frac{\varepsilon}{2^k}.$$
Then $A \subseteq \bigcup_k I_k$, so
$$m^*(A) \le \sum_{k=1}^\infty \frac{\varepsilon}{2^k} = \varepsilon.$$
Since $\varepsilon > 0$ was arbitrary, $m^*(A) = 0$. ∎

The proof needs the points to be *listable* (↩ S1E11). That is the only thing it uses, which is why it fails for $[0,1]$: you cannot list the reals (↩ S1E12), and indeed $m([0,1]) = 1$.

So the answer to the cold open: the "probability of hitting a rational" is $m(\mathbb Q\cap[0,1]) = 0$. A set can be *dense* and still *negligible*.

> **Definition (almost everywhere).** A property holds **almost everywhere (a.e.)** if the set where it fails is contained in a null set.

Dirichlet's function equals $0$ almost everywhere.

### 4. Why not measure every set? Vitali and the Axiom of Choice

> **Theorem (Vitali, 1905).** Assuming the Axiom of Choice, there is a subset $V \subseteq [0,1]$ that is not Lebesgue measurable. More strongly, no function on *all* subsets of ℝ satisfies properties (1)–(3) of Section 2.

**Proof.** Define $x \sim y$ iff $x - y \in \mathbb Q$ on $[0,1]$. This is an equivalence relation (↩ S1E05), so $[0,1]$ splits into equivalence classes, each of the form $(x + \mathbb Q) \cap [0,1]$. Each class is countable, so there are uncountably many classes. **Using the Axiom of Choice** (↩ S1E15), choose exactly one representative from each class, and let $V$ be the set of representatives.

Let $r_1, r_2, \dots$ enumerate $\mathbb Q \cap [-1, 1]$ and set $V_k = V + r_k$.
- The $V_k$ are pairwise disjoint: if $v + r_j = w + r_k$ with $v, w \in V$, then $v - w \in \mathbb Q$, so $v \sim w$, so $v = w$ (one representative per class), so $r_j = r_k$.
- $[0,1] \subseteq \bigcup_k V_k$: any $x \in [0,1]$ is equivalent to its representative $v \in V$, and $r = x - v \in \mathbb Q \cap [-1,1]$.
- $\bigcup_k V_k \subseteq [-1, 2]$.

If $\mu$ had properties (1)–(3) and were defined on $V$, then $\mu(V_k) = \mu(V)$ for all $k$, and
$$1 \le \sum_{k=1}^\infty \mu(V) \le 3.$$
If $\mu(V) = 0$ the sum is $0 < 1$; if $\mu(V) > 0$ the sum is $\infty > 3$. Contradiction. ∎

Choice cannot be removed from this argument: Solovay (1970) built a model of set theory with a weaker form of choice (dependent choice) in which *every* set of reals is Lebesgue measurable (assuming the consistency of an inaccessible cardinal). Vitali's set and Banach–Tarski grow from the same root: Choice produces sets that no "size" can be assigned to. (↩ S1E15. ↪ S2E25: Hahn–Banach, also proved with Choice, turns out to be strong enough to produce a non-measurable set too.)

### 5. The Lebesgue integral: slice the range, not the domain

Lebesgue's own analogy: to count a pile of coins, you can pick them up in the order they lie on the table and add as you go (Riemann), or you can sort them by denomination, count how many of each, and multiply (Lebesgue). The second method doesn't care how scattered the coins are.

Formally, the building blocks are **simple functions** $\varphi = \sum_{i=1}^n c_i \mathbf 1_{A_i}$ with $c_i \ge 0$ and $A_i$ measurable, and we define
$$\int \varphi \, d\mu = \sum_{i=1}^n c_i\, \mu(A_i).$$

> **Definition (measurable function, Lebesgue integral).** $f : X \to [0,\infty]$ is **measurable** if $\lbrace f > t\rbrace \in \Sigma$ for every $t$. Its integral is
> $$\int f\, d\mu = \sup\left\lbrace \int \varphi\, d\mu : 0 \le \varphi \le f,\ \varphi \text{ simple}\right\rbrace.$$
> A real function $f$ is **integrable** if $\int \lvert f\rvert\, d\mu < \infty$, and then $\int f = \int f^+ - \int f^-$.

An equivalent formula makes "slice the range" literal, the **layer-cake formula**:
$$\int f\, d\mu = \int_0^\infty \mu(\lbrace f > t \rbrace)\, dt \qquad (f \ge 0).$$
For each height $t$, measure how much of the domain sits above that height, then add over heights.

Dirichlet's function is now trivial: $\mathbf 1_{\mathbb Q}$ is the simple function $1\cdot \mathbf 1_{\mathbb Q}$, so $\int_0^1 \mathbf 1_{\mathbb Q}\, dm = 1 \cdot m(\mathbb Q \cap [0,1]) = 0$.

Every Riemann-integrable function on $[a,b]$ is Lebesgue integrable with the same integral, so nothing is lost. (Lebesgue's criterion: a bounded function is Riemann integrable iff its discontinuities form a null set.) What is gained is the ability to swap limits and integrals.

> **Monotone Convergence Theorem (MCT).** If $0 \le f_1 \le f_2 \le \cdots$ are measurable and $f_n \to f$ pointwise, then $\int f_n\, d\mu \to \int f\, d\mu$.

> **Dominated Convergence Theorem (DCT).** If $f_n \to f$ almost everywhere and there is an integrable $g$ with $\lvert f_n\rvert \le g$ a.e. for all $n$, then $f$ is integrable and $\int \lvert f_n - f\rvert\, d\mu \to 0$; in particular $\int f_n \to \int f$.

*Proof sketch of MCT.* Since $f_n \le f$, $\lim \int f_n \le \int f$. For the reverse, fix a simple $\varphi \le f$ and $0 < c < 1$. The sets $E_n = \lbrace f_n \ge c\varphi \rbrace$ increase to $X$, so by countable additivity (continuity from below) $\int_{E_n} \varphi \to \int \varphi$, and $\int f_n \ge c\int_{E_n}\varphi$. Let $n \to \infty$, then $c \to 1$, then take the sup over $\varphi$. Countable additivity is doing the real work. DCT follows by applying Fatou's lemma (a consequence of MCT) to $g + f_n$ and $g - f_n$.

Back to Section 1: $f_n = \mathbf 1_{\lbrace q_1, \dots, q_n\rbrace}$ increases to $\mathbf 1_{\mathbb Q}$, and MCT says $\int \mathbf 1_{\mathbb Q} = \lim \int f_n = 0$. The hole is filled.

### 6. Payoff: $L^p$ spaces, and probability

> **Definition ($L^p$).** For $1 \le p < \infty$, let $\mathcal L^p(X,\mu)$ be the measurable $f$ with $\int \lvert f\rvert^p\, d\mu < \infty$, and set $\lVert f\rVert_p = \left(\int \lvert f\rvert^p\, d\mu\right)^{1/p}$. For $p = \infty$, $\lVert f\rVert_\infty$ is the essential supremum (the smallest $M$ with $\lvert f\rvert \le M$ a.e.).

There is a snag: $\lVert \mathbf 1_{\mathbb Q}\rVert_1 = 0$ but $\mathbf 1_{\mathbb Q} \neq 0$. So $\lVert\cdot\rVert_p$ is only a *seminorm*. The fix is the master tool (↩ S1E05): declare $f \sim g$ when $f = g$ a.e. The set $\mathcal N$ of functions that vanish a.e. is a subspace, and
$$L^p(X,\mu) = \mathcal L^p(X,\mu)\,/\,\mathcal N$$
is a genuine normed space (the triangle inequality is Minkowski's inequality). An element of $L^p$ is *not a function* but an equivalence class of functions. In particular, "the value of $f \in L^p[0,1]$ at the point $0$" is meaningless: changing a function at one point does not change its class (↪ S2E24, S2E33). With counting measure on ℕ, no nonempty set is null, so $L^p(\mathbb N, \text{counting}) = \ell^p$ exactly.

**Probability is measure theory** (Kolmogorov, 1933):

| Probability | Measure theory |
|---|---|
| sample space Ω, events, $P$ | measure space $(\Omega, \mathcal F, P)$ with $P(\Omega) = 1$ |
| random variable $X$ | measurable function $X : \Omega \to \mathbb R$ |
| expectation $\mathbb E[X]$ | integral $\int_\Omega X\, dP$ |
| "almost surely" | almost everywhere |
| variance finite | $X \in L^2(P)$ |

So the cold open, made precise: if $U$ is uniform on $[0,1]$ (Lebesgue measure as the probability), then $P(U \in \mathbb Q) = m(\mathbb Q\cap[0,1]) = 0$. Events of probability zero can happen; they are just negligible for every calculation.

## Worked examples

### Example 1: The Cantor set is uncountable and has measure zero
Let $C_0 = [0,1]$, and let $C_{n+1}$ be obtained from $C_n$ by removing the open middle third of each of its intervals. $C_n$ is a union of $2^n$ closed intervals, each of length $3^{-n}$. The Cantor set is $C = \bigcap_n C_n$.

**Measure.** Since $C \subseteq C_n$, $m(C) \le m(C_n) = 2^n \cdot 3^{-n} = (2/3)^n \to 0$. So $m(C) = 0$. Equivalently, the removed length is
$$\sum_{n=1}^\infty \frac{2^{n-1}}{3^n} = \frac13 \sum_{k=0}^\infty \left(\frac23\right)^k = \frac13 \cdot \frac{1}{1 - 2/3} = 1.$$
(At step $n$ we remove $2^{n-1}$ intervals of length $3^{-n}$: $\tfrac13 + \tfrac29 + \tfrac4{27} + \cdots = 1$. Checked numerically: the partial sum to $n=59$ is $0.99999999996$.)

**Cardinality.** Write $x \in [0,1]$ in base 3. Removing the middle third $(\tfrac13, \tfrac23)$ removes exactly the numbers whose first ternary digit must be $1$; in general, $C$ is the set of $x$ that have a ternary expansion using only the digits $0$ and $2$. (Endpoints like $\tfrac13 = 0.1_3 = 0.0222\ldots_3$ have such an expansion.) The map
$$0.d_1 d_2 d_3 \ldots{}_3 \;\longmapsto\; 0.\tfrac{d_1}{2}\tfrac{d_2}{2}\tfrac{d_3}{2}\ldots{}_2$$
sends $C$ onto $[0,1]$: every binary expansion is hit. So $\lvert C\rvert \ge \lvert [0,1]\rvert$, and $C \subseteq [0,1]$ gives the reverse. $C$ has the cardinality of the continuum (↩ S1E12). Measure zero does *not* mean countable.

### Example 2: $\int_0^1 x^2\,dx$ by slicing the range
Let $f(x) = x^2$ on $[0,1]$ with Lebesgue measure. For $0 \le t < 1$,
$$\lbrace x \in [0,1] : x^2 > t \rbrace = (\sqrt t, 1], \qquad m = 1 - \sqrt t,$$
and for $t \ge 1$ the set is empty. By the layer-cake formula,
$$\int_0^1 x^2\, dm = \int_0^1 (1 - \sqrt t)\, dt = \left[t - \tfrac23 t^{3/2}\right]_0^1 = 1 - \tfrac23 = \tfrac13.$$
This agrees with the Riemann value $\left[\tfrac{x^3}3\right]_0^1 = \tfrac13$, as it must. The point is the *method*: horizontal slices, measured by $m$.

### Example 3: When can limits and integrals be swapped?
**(a) Dominated, so it works.** $f_n(x) = x^n$ on $[0,1]$. Pointwise, $f_n(x) \to 0$ for $0 \le x < 1$ and $f_n(1) = 1$, so $f_n \to 0$ a.e. (the exceptional set $\lbrace 1\rbrace$ is null). Domination: $\lvert f_n\rvert \le 1$, and $\int_0^1 1 = 1 < \infty$. DCT gives $\int_0^1 x^n\,dx \to 0$. Check directly: $\int_0^1 x^n\, dx = \frac{1}{n+1} \to 0$. ✓

**(b) Not dominated, and it fails.** $g_n = n \cdot \mathbf 1_{(0, 1/n)}$ on $[0,1]$. For each fixed $x > 0$, $g_n(x) = 0$ once $n > 1/x$; and $g_n(0) = 0$. So $g_n \to 0$ everywhere. But
$$\int_0^1 g_n\, dm = n \cdot \frac1n = 1 \not\to 0.$$
No integrable $g$ dominates all $g_n$: the smallest candidate is $\sup_n g_n$, which satisfies $\sup_n g_n(x) \ge \tfrac1{2x}$ for $0<x<\tfrac12$ (take $n = \lceil 1/x\rceil - 1$, the largest $n$ with $x < 1/n$; then $n \ge 1/x - 1 \ge 1/(2x)$), and $\int_0^{1/2} \frac{dx}{2x} = \infty$. The mass "escapes" into a spike. (↪ S2E27: this escaping mass is the weak-convergence story.)

**(c) Monotone, so it works.** $\sum_{k=1}^\infty \int_0^1 x^{k-1}(1-x)\,dx$. The terms $h_k = x^{k-1}(1-x) \ge 0$, so the partial sums increase and MCT lets us swap sum and integral:
$$\sum_{k=1}^\infty \int_0^1 h_k = \int_0^1 \sum_{k=1}^\infty x^{k-1}(1-x)\,dx = \int_0^1 \mathbf 1_{[0,1)}(x)\, dx = 1,$$
since $\sum_{k\ge1} x^{k-1}(1-x) = (1-x)\cdot\frac{1}{1-x} = 1$ for $0\le x<1$ and $0$ at $x=1$. Check term by term: $\int_0^1 x^{k-1}(1-x)\,dx = \frac1k - \frac1{k+1}$, which telescopes to $1$. ✓

### Example 4: Two functions, one element of $L^1$
Let $f(x) = x$ and $g(x) = x + \mathbf 1_{\mathbb Q}(x)$ on $[0,1]$. They differ on $\mathbb Q \cap [0,1]$, a null set, so $\lVert f - g\rVert_1 = \int_0^1 \mathbf 1_{\mathbb Q} = 0$ and $[f] = [g]$ in $L^1[0,1]$. Note that $g$ is discontinuous at *every* point, while $f$ is continuous. "Is this element of $L^1$ continuous?" has to be read as "does its class contain a continuous function?" Here the answer is yes, because of $f$.

## Visual and animation notes
1. **Cold open:** a dart lands on a number line $[0,1]$; rationals light up as a dense glitter. Counter reads "P(rational) = ?" and snaps to 0.
2. **Riemann vs. Lebesgue (key visual):** split screen with the same graph. Left: vertical strips rise from the axis (Riemann). Right: horizontal slices at heights $t$; for each slice, the portion of the $x$-axis under the graph above height $t$ lights up and its length is read off (layer-cake). Coin-sorting cartoon in the corner: coins grouped by denomination.
3. **Dirichlet's function:** the Riemann strips flicker between height 0 and 1 and never settle; then the Lebesgue view shows the "height 1 slice" with total length 0.
4. **ε/2ᵏ cover:** the rationals in an enumerated list; around the $k$-th, an interval of length $\varepsilon/2^k$ appears. A running total in the corner climbs toward $\varepsilon$, never past it. Then $\varepsilon$ shrinks, and all intervals shrink together. Callback stamp "↩ S1E11" on the enumeration.
5. **Cantor set (key visual):** middle thirds disappear level by level; a "total length remaining" meter drains $1 \to 2/3 \to 4/9 \to \cdots \to 0$, while a second meter labeled "number of points" stays pinned at "$\lvert\mathbb R\rvert$." Then the ternary-to-binary relabeling animation (digits $0,2 \mapsto 0,1$).
6. **Vitali:** points of $[0,1]$ blur into glowing blobs (the quotient motif from S1E05), one point is plucked from each blob by a hand labeled "Choice" (S1E15 stamp). The translates $V + r_k$ stack up and the "total length" meter shows the impossible "$\ge 1$ and $\le 3$".
7. **DCT failure:** the spike $n\mathbf 1_{(0,1/n)}$ grows taller and thinner; the area stays painted at 1 while the graph pointwise collapses to 0.
8. **$L^p$ as a quotient:** $f$ and $f + \mathbf 1_{\mathbb Q}$ shown on top of each other, then blurring into one glowing blob labeled $[f]$ (quotient motif).
9. **Probability dictionary:** a two-column table slides in (Kolmogorov 1933 stamp).

## Common misconceptions
- **Misconception:** Dense sets must have positive measure. **Reality:** ℚ is dense and has measure 0. Conversely, there are nowhere dense closed sets with positive measure (the "fat" Smith–Volterra–Cantor set, which removes progressively smaller middle pieces of total length $\tfrac12$).
- **Misconception:** Measure zero means countable. **Reality:** the Cantor set has measure 0 and is uncountable.
- **Misconception:** The Lebesgue integral is just a fancier way of computing the same numbers. **Reality:** it agrees with Riemann where Riemann works, but its real value is the convergence theorems and the completeness of $L^1$ (↪ S2E23).
- **Misconception:** You can always swap $\lim$ and $\int$ for Lebesgue integrals. **Reality:** you need a hypothesis such as monotonicity or domination; $n\mathbf 1_{(0,1/n)}$ is the standard counterexample.
- **Misconception:** An element of $L^p$ is a function. **Reality:** it is an equivalence class of functions equal a.e.; point values are not defined.
- **Misconception:** Non-measurable sets show measure theory is broken. **Reality:** they show that the Axiom of Choice produces sets with no meaningful size; all sets you can explicitly describe in ordinary analysis (Borel sets, for instance) are measurable.

## Exercises
- **Warm-up (computational):** (a) Compute the Lebesgue measure of the set of $x \in [0,1]$ whose decimal expansion contains no digit 7. (b) Use the layer-cake formula to compute $\int_0^1 \sqrt x\, dx$.
- **Core (conceptual):** Explain why "Lebesgue measure on ℝ is countably additive" and "$[0,1]$ is the union of its points" do not contradict $m([0,1]) = 1$. Then explain why the proof that ℚ is null fails for $[0,1]$.
- **Stretch (proof):** Let $\varphi : [0,1] \to [0,1]$ be the Cantor function (constant on each removed interval, increasing, continuous, with $\varphi(0)=0$, $\varphi(1)=1$). Show that $\varphi' = 0$ almost everywhere, yet $\int_0^1 \varphi'(x)\,dx \neq \varphi(1) - \varphi(0)$. What does this say about the fundamental theorem of calculus for Lebesgue integrals?

<details><summary>Hints and answers</summary>

- **Warm-up (a):** at step $n$ the surviving set is a union of $9^n$ intervals of length $10^{-n}$, so the measure is $\le (9/10)^n \to 0$. Answer: $0$. **(b):** $\lbrace \sqrt x > t\rbrace = (t^2, 1]$ for $0 \le t < 1$, so $\int_0^1 (1 - t^2)\,dt = \tfrac23$.
- **Core:** countable additivity only applies to *countably* many pieces; $[0,1]$ has uncountably many points (↩ S1E12). The ε/2ᵏ cover needs an enumeration of the points, which does not exist for $[0,1]$.
- **Stretch:** $\varphi$ is constant on each removed open interval, and these have total length 1, so $\varphi' = 0$ on a set of full measure. Thus $\int_0^1 \varphi' = 0 \ne 1$. The FTC for Lebesgue integrals needs *absolute continuity*, not just continuity and a.e. differentiability.

</details>

## Historical note
In the 19th century, Riemann's integral (1854) was the standard, but Fourier series kept producing functions it could not handle well, and examples like Dirichlet's function showed its limits. Émile Borel (1898) defined measure for sets built from intervals by countable operations, insisting on countable additivity. Henri Lebesgue's 1902 doctoral thesis, *Intégrale, longueur, aire*, defined the measure and integral that bear his name and proved the convergence theorems that made them indispensable. In 1905 Giuseppe Vitali showed, using what Zermelo had just formulated as the Axiom of Choice, that some sets cannot be measured. Frigyes Riesz introduced the $L^p$ spaces in 1910, and Maurice Fréchet and others extended measures to abstract spaces. In 1933 Andrey Kolmogorov's *Grundbegriffe der Wahrscheinlichkeitsrechnung* put probability on this foundation, which is how it has been done ever since. The Cantor set itself appears in work of H. J. S. Smith (1875) and Cantor (1883).

## Connections
- **Callbacks:** ↩ S1E05 (equivalence classes: Vitali's classes, $L^p$ as a quotient), ↩ S1E07 (density of ℚ; the "hole" in Riemann integration), ↩ S1E11 (enumerating ℚ for the ε/2ᵏ cover), ↩ S1E12 (the Cantor set and $[0,1]$ are uncountable), ↩ S1E15 (Choice and Banach–Tarski; Vitali's set), ↩ S2E07 (evaluation functionals; here they lose meaning on $L^p$), ↩ S2E21 (the $L^1$ norm on $C[0,1]$)
- **Sets up:** ↪ S2E23 ($L^p$ is complete; $L^1$ is the completion of $C[0,1]$), ↪ S2E24 ($(L^p)^* = L^q$), ↪ S2E25 (Hahn–Banach and non-measurable sets), ↪ S2E27 (escaping mass and weak convergence), ↪ S2E28 ($L^2$ as a Hilbert space), ↪ S2E29 (Fourier series in $L^2$), ↪ S2E32 (measure-preserving maps), ↪ S2E33 (δ as a measure and a functional)
- **Side quests:** *Fractals and Hausdorff dimension* (attaches here): the Cantor set has Hausdorff dimension $\log 2/\log 3$.

## References
- **Primary / historical**
  - Henri Lebesgue, *Intégrale, longueur, aire*, doctoral thesis, Annali di Matematica Pura ed Applicata (3) 7 (1902).
  - Giuseppe Vitali, *Sul problema della misura dei gruppi di punti di una retta* (Bologna, 1905).
  - A. N. Kolmogorov, *Grundbegriffe der Wahrscheinlichkeitsrechnung* (Springer, 1933); English translation *Foundations of the Theory of Probability* (Chelsea, 1950; 2nd ed. 1956).
  - Robert M. Solovay, "A model of set-theory in which every set of reals is Lebesgue measurable," *Annals of Mathematics* 92 (1970).
- **Textbooks**
  - Terence Tao, *An Introduction to Measure Theory* (AMS Graduate Studies in Mathematics 126, 2011), Ch. 1 (Lebesgue measure, the Lebesgue integral, convergence theorems).
  - Gerald B. Folland, *Real Analysis: Modern Techniques and Their Applications*, 2nd ed. (Wiley, 1999), Ch. 1 (Measures) and Ch. 2 (Integration); Ch. 6 ($L^p$ spaces).
  - H. L. Royden and P. M. Fitzpatrick, *Real Analysis*, 4th ed. (Pearson, 2010), Ch. 2 (Lebesgue measure) and Ch. 4 (the Lebesgue integral).
  - Walter Rudin, *Real and Complex Analysis*, 3rd ed. (McGraw-Hill, 1987), Ch. 1 (Abstract integration) and Ch. 3 ($L^p$ spaces).
- **Accessible**
  - David M. Bressoud, *A Radical Approach to Lebesgue's Theory of Integration* (MAA / Cambridge University Press, 2008): the history-driven route from Fourier series to Lebesgue.
  - Elias M. Stein and Rami Shakarchi, *Real Analysis: Measure Theory, Integration, and Hilbert Spaces* (Princeton Lectures in Analysis III, 2005), Ch. 1–2.
