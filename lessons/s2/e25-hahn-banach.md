# S2E25: Hahn–Banach: There Are Enough Measurements

> **Season / Act:** Season 2, Part B, Act VII: Duality in Infinite Dimensions · **Target runtime:** 20–25 min ·
> **Prerequisites:** S2E06 (functionals and their level sets; kernels are hyperplanes), S2E08 (double dual), S2E21 (norms, bounded functionals), S2E24 (continuous dual, $\ell^\infty$ and $\ell^1$); S1E15 (Axiom of Choice); convexity in the plane ·
> **Builds toward:** S2E26 (Big Three), S2E27 (weak convergence; weak lower semicontinuity of the norm), S2E28 (Riesz representation), S2E33 (distributions); S3 Act III (category theory: "enough" morphisms)

## Learning objectives
By the end of this lesson the viewer can:
1. State the analytic Hahn–Banach theorem (sublinear and normed versions) and prove the one-step extension in the real case, explaining where Zorn's lemma enters.
2. Derive the corollaries: $X^*$ separates points, $\lVert x\rVert = \max_{\lVert f\rVert \le 1}\lvert f(x)\rvert$, and the canonical map $X \to X^{**}$ is an isometry.
3. State the geometric (separation) form and use it to separate a point from a closed convex set.
4. Construct a Banach limit and compute its value on periodic sequences, and connect separation to linear-programming duality and support vector machines.
5. Explain the role of the Axiom of Choice and how Hahn–Banach links back to non-measurable sets.

## Cold open
*(Narration draft.)*

What is the limit of the sequence one, zero, one, zero, one, zero, forever?

Your calculus teacher says: it doesn't have one. It bounces. Case closed.

But be honest. If someone forced you to give *one* number, you'd say one half. It spends half its time at one and half at zero. And for one, zero, zero, one, zero, zero, you'd say one third.

Can we make that official? Can we build a "limit" that works on *every* bounded sequence, agrees with the ordinary limit whenever there is one, is linear, and doesn't care if you chop off the first term?

It turns out we can. A Polish mathematician named Stefan Banach proved it in 1932. But here's the catch: nobody has ever written one down, and nobody ever will. The proof guarantees it exists without telling you what it is.

The engine behind that proof is one of the most important theorems in all of analysis. It answers a question that sounds almost too basic to ask: in an infinite-dimensional space, are there *any* continuous measurements at all? Enough to tell any two vectors apart? In finite dimensions you just read off coordinates. In infinite dimensions, coordinates are gone. Today we prove the measurements are still there.

## The story

### 1. The naive attempt: extend by a basis

Suppose we have a continuous functional $f$ on a subspace $M$ of a normed space $X$, say $f = \lim$ on the convergent sequences $c \subset \ell^\infty$. We want to extend it to all of $X$.

In Part A this was trivial: extend a basis of $M$ to a basis of $X$ (↩ S2E02) and define $f$ to be anything on the new basis vectors. In infinite dimensions you can do the same with a Hamel basis (↩ S1E15), but the extension you get is typically *discontinuous* (↩ S2E24: Hamel bases are exactly how discontinuous functionals are built). An extension that loses continuity is useless: it is not in $X^*$.

### 2. The crisis: are there enough continuous functionals?

For an infinite-dimensional normed space $X$, it is not obvious that $X^*$ contains anything except $0$. For $\ell^p$ we found $X^*$ by hand in S2E24. For $\ell^\infty$ we couldn't: the one new functional we wanted (an extension of $\lim$) we postponed to this episode. The questions are:
- Does every nonzero $x$ admit a continuous $f$ with $f(x) \ne 0$? (Do measurements *separate points*?)
- Is $\lVert x\rVert$ itself visible to measurements, so that $\lVert x\rVert = \sup_{\lVert f\rVert\le1}\lvert f(x)\rvert$?
- Can a closed convex set be separated from a point outside it by a hyperplane, i.e. by a level set of a functional (↩ S2E06)?

All three answers are yes, and all three come from one theorem.

### 3. The analytic form: extend without growing

> **Definition.** On a real vector space $X$, a function $p : X \to \mathbb R$ is **sublinear** if $p(x + y) \le p(x) + p(y)$ and $p(tx) = t\,p(x)$ for all $t \ge 0$.

Every norm is sublinear; so is $x \mapsto \limsup_n x_n$ on $\ell^\infty$, and so is the "gauge" of a convex set (Section 5).

> **Theorem (Hahn–Banach, real analytic form).** Let $X$ be a real vector space, $p$ sublinear on $X$, $M \subseteq X$ a subspace, and $f : M \to \mathbb R$ linear with $f \le p$ on $M$. Then there is a linear $F : X \to \mathbb R$ with $F = f$ on $M$ and $F \le p$ on all of $X$.

**Proof, step 1 (the one-step extension).** Let $z \notin M$ and $M_1 = M + \mathbb R z$. Any linear extension has the form $g(m + tz) = f(m) + tc$ for some number $c = g(z)$; we must choose $c$ so that $g \le p$ on $M_1$.

For $t > 0$, dividing by $t$ (and using $p(tx) = tp(x)$), the condition $f(m) + tc \le p(m + tz)$ becomes $c \le p(m' + z) - f(m')$ with $m' = m/t$. For $t < 0$, write $t = -s$; the condition becomes $c \ge f(m') - p(m' - z)$ with $m' = m/s$. So we need a number $c$ with
$$\sup_{m' \in M}\big[f(m') - p(m' - z)\big] \;\le\; c \;\le\; \inf_{m \in M}\big[p(m + z) - f(m)\big].$$
Such a $c$ exists iff every term on the left is $\le$ every term on the right. For any $m, m' \in M$,
$$f(m) + f(m') = f(m + m') \le p(m + m') = p\big((m + z) + (m' - z)\big) \le p(m + z) + p(m' - z),$$
which rearranges to $f(m') - p(m' - z) \le p(m + z) - f(m)$. ✓ Pick any $c$ in the interval.

**Step 2 (Zorn's lemma).** Consider all pairs $(N, g)$ where $N \supseteq M$ is a subspace and $g$ is a linear extension of $f$ to $N$ with $g \le p$. Order them by extension. Every chain has an upper bound (take the union of the domains and the common extension). By Zorn's lemma (equivalent to the Axiom of Choice, ↩ S1E15) there is a maximal $(N, F)$. If $N \ne X$, step 1 extends $F$ one dimension further, contradicting maximality. So $N = X$. ∎

If $X$ is separable, Zorn is unnecessary: extend one step at a time along a countable dense set and finish by continuity.

> **Theorem (normed form).** Let $X$ be a real or complex normed space, $M$ a subspace, $f \in M^*$. Then there is $F \in X^*$ extending $f$ with $\lVert F\rVert = \lVert f\rVert$.

*Proof (real case).* Apply the analytic form with $p(x) = \lVert f\rVert\,\lVert x\rVert$. Then $F(x) \le \lVert f\rVert\lVert x\rVert$ and $-F(x) = F(-x) \le \lVert f\rVert\lVert x\rVert$, so $\lvert F(x)\rvert \le \lVert f\rVert\lVert x\rVert$; and $\lVert F\rVert \ge \lVert f\rVert$ since $F$ extends $f$. *(Complex case, Bohnenblust–Sobczyk and Sukhomlinov, 1938.)* Extend the real part $u = \operatorname{Re} f$ as a real-linear functional $U$, and set $F(x) = U(x) - iU(ix)$; one checks $F$ is complex-linear, extends $f$, and has the same norm. ∎

The "without growing" part is what makes this a theorem about *continuous* functionals. Extensions are usually **not unique** (Worked Example 1).

### 4. Corollaries: measurements see everything

> **Corollary 1 (norming functionals).** For every $x_0 \ne 0$ in a normed space $X$ there is $f \in X^*$ with $\lVert f\rVert = 1$ and $f(x_0) = \lVert x_0\rVert$.

*Proof.* On $M = \mathbb F x_0$ define $f(tx_0) = t\lVert x_0\rVert$; it has norm $1$. Extend. ∎

> **Corollary 2.** $X^*$ separates points: if $x \ne y$, some $f \in X^*$ has $f(x) \ne f(y)$. (Apply Corollary 1 to $x - y$.)

> **Corollary 3 (the norm is a max of measurements).** $\displaystyle \lVert x\rVert = \max_{\lVert f\rVert \le 1}\lvert f(x)\rvert$, and the maximum is attained.

*Proof.* "$\ge$": $\lvert f(x)\rvert \le \lVert f\rVert\lVert x\rVert \le \lVert x\rVert$. "Attained": Corollary 1. ∎

Compare with the dual norm, $\lVert f\rVert = \sup_{\lVert x\rVert\le1}\lvert f(x)\rvert$, which need *not* be attained (↩ S2E24, the functional on $c_0$). The asymmetry is exactly Hahn–Banach.

> **Corollary 4.** The canonical map $J : X \to X^{**}$, $(Jx)(f) = f(x)$, is an isometry: $\lVert Jx\rVert = \sup_{\lVert f\rVert\le1}\lvert f(x)\rvert = \lVert x\rVert$. (This was the promised step in S2E24.)

> **Corollary 5 (distance to a subspace).** If $M$ is a closed subspace and $x_0 \notin M$, there is $f \in X^*$ with $f = 0$ on $M$, $\lVert f\rVert = 1$, and $f(x_0) = \operatorname{dist}(x_0, M)$. In particular, a subspace is dense iff the only functional vanishing on it is $0$.

That last sentence is a workhorse: to prove that some family (polynomials, trigonometric polynomials, finite sums) is dense, it suffices to show that nothing in $X^*$ annihilates it.

### 5. The geometric form: separating convex sets

Recall from S2E06 that a functional $f$ is a stack of parallel level sets, and $\lbrace f = \alpha\rbrace$ is a hyperplane. In a normed space, $\lbrace f = \alpha\rbrace$ is a *closed* hyperplane exactly when $f$ is continuous.

> **Theorem (Hahn–Banach, separation form).** Let $X$ be a real normed space.
> 1. If $A, B \subseteq X$ are disjoint nonempty convex sets and $A$ is open, there are $f \in X^*$ and $\alpha \in \mathbb R$ with $f(a) < \alpha \le f(b)$ for all $a \in A$, $b \in B$.
> 2. If $C$ is closed and convex and $x_0 \notin C$, there is $f \in X^*$ with $\sup_{c\in C} f(c) < f(x_0)$.

(For complex spaces, apply this to the underlying real space and use real parts.)

*Proof sketch of 2.* Translate so that some point of $C$ is $0$. Since $C$ is closed, $r = \operatorname{dist}(x_0, C) > 0$; let $U = \lbrace x : \operatorname{dist}(x, C) < r/2\rbrace$, an open convex set containing $0$ and not $x_0$. Its **Minkowski gauge** $p_U(x) = \inf\lbrace t > 0 : x/t \in U\rbrace$ is sublinear, satisfies $p_U(x) \le \tfrac{2}{r}\lVert x\rVert$, $U = \lbrace p_U < 1\rbrace$, and $p_U(x_0) \ge 1$. On $\mathbb R x_0$ set $f(tx_0) = t$; then $f \le p_U$ there. Extend by the analytic form: $F \le p_U \le \tfrac2r\lVert\cdot\rVert$ gives $F \in X^*$, $F < 1$ on $U$, and $F(x_0) = 1$. For the strict gap: $U$ contains $c + u$ for every $c \in C$ and $\lVert u\rVert < r/2$, so $F(c) + F(u) < 1$; taking the sup over such $u$ gives $F(c) + \tfrac r2\lVert F\rVert \le 1$, and $F \ne 0$, so $\sup_C F \le 1 - \tfrac r2\lVert F\rVert < 1 = F(x_0)$. ∎

Convexity is essential: the unit circle $\lbrace x^2 + y^2 = 1\rbrace$ in $\mathbb R^2$ and the point $0$ are disjoint, yet no line separates them, because $0$ lies in the convex hull of the circle (Worked Example 3).

A useful consequence: **a closed convex set is the intersection of all closed half-spaces containing it.** A convex set is completely described by the measurements that bound it, the dual description of a shape.

### 6. Applications, and the price: Choice

**Duality in optimization.** In linear programming, the primal problem "maximize $c^\top x$ subject to $Ax \le b$, $x \ge 0$" has a dual "minimize $b^\top u$ subject to $A^\top u \ge c$, $u \ge 0$." Weak duality ($c^\top x \le b^\top u$) is a one-line computation; *strong* duality (the optimal values agree) is a separation theorem in $\mathbb R^n$ (Farkas' lemma). The dual variables $u$ are prices: functionals measuring how much each constraint is worth (Worked Example 4). The same picture, with Hahn–Banach in place of finite-dimensional separation, underlies Lagrange multipliers and convex duality in infinite dimensions.

**Support vector machines.** Given two classes of data points, a (hard-margin) SVM looks for the hyperplane $\lbrace w\cdot x = b\rbrace$ separating the convex hulls of the two classes with the widest margin. It exists exactly when the convex hulls are disjoint, the finite-dimensional separation theorem.

**Banach limits.** A **Banach limit** is $L \in (\ell^\infty)^*$ (real scalars) with: (i) $L(x) = \lim x_n$ for convergent $x$; (ii) $L(Sx) = L(x)$, where $(Sx)_n = x_{n+1}$ is the left shift; (iii) $\liminf x_n \le L(x) \le \limsup x_n$. *Construction:* let
$$p(x) = \limsup_{n \to\infty} \frac{x_1 + \cdots + x_n}{n},$$
which is sublinear on $\ell^\infty$, and $\lim \le p$ on $c$ (Cesàro means of a convergent sequence converge to the same limit). Extend $\lim$ to $L \le p$. Then
$$L(x - Sx) \le p(x - Sx) = \limsup_n \frac{x_1 - x_{n+1}}{n} = 0,$$
since the sum telescopes and $x$ is bounded; applying this to $-x$ gives $L(Sx - x) \le 0$, so $L(Sx) = L(x)$. Finally $L(x) \le p(x) \le \limsup x_n$, and applying it to $-x$ gives $L(x) \ge \liminf x_n$. ∎ This is the functional promised in S2E24, Example 4, and it answers the cold open.

**The price.** The general proof uses Zorn's lemma. Hahn–Banach is strictly weaker than the full Axiom of Choice (it follows from the ultrafilter lemma, as Łoś and Ryll-Nardzewski showed in 1951), but it cannot be proved in ZF alone: Foreman and Wehrung (1991) showed that Hahn–Banach implies the existence of a non-Lebesgue-measurable set, and Solovay's model (↩ S2E22) has none. So Banach limits, Vitali sets, and Banach–Tarski all draw on the same well (↩ S1E15). This is why no Banach limit can be "written down."

## Worked examples

### Example 1: When is the extension unique? Three norms on $\mathbb R^2$
Let $M = \lbrace (t, 0)\rbrace$ (the $x$-axis), $f(t,0) = t$, so $\lVert f\rVert = 1$ for each of the norms below. Any linear extension is $F_c(x,y) = x + cy$. Use the one-step formula with $z = (0,1)$ and $p = \lVert\cdot\rVert$ (the norm of $f$ is 1), $m = (t,0)$:
$$\sup_t \big[t - \lVert (t, -1)\rVert\big] \le c \le \inf_t\big[\lVert (t,1)\rVert - t\big].$$

- **$\ell^1$ norm**, $\lVert(t,\pm1)\rVert_1 = \lvert t\rvert + 1$. Right side: $\inf_t(\lvert t\rvert + 1 - t) = 1$ (attained for every $t \ge 0$). Left side: $\sup_t(t - \lvert t\rvert - 1) = -1$. So **every $c \in [-1, 1]$ works**. Check with the dual norm (↩ S2E24, Example 5): $\lVert F_c\rVert = \max(1, \lvert c\rvert) = 1$ iff $\lvert c\rvert \le 1$. ✓ Infinitely many norm-preserving extensions.
- **$\ell^\infty$ norm**, $\lVert (t,\pm1)\rVert_\infty = \max(\lvert t\rvert, 1)$. Right: $\inf_t(\max(\lvert t\rvert,1) - t) = 0$ (at any $t \ge 1$). Left: $\sup_t(t - \max(\lvert t\rvert,1)) = 0$. So **$c = 0$ only**. Check: $\lVert F_c\rVert = 1 + \lvert c\rvert$ for this norm, which equals $1$ iff $c = 0$. ✓
- **$\ell^2$ norm.** Right: $\inf_t(\sqrt{t^2+1} - t) = 0$ (approached as $t \to \infty$, never attained); left: $\sup_t(t - \sqrt{t^2+1}) = 0$. So **$c = 0$ only**, and $\lVert F_c\rVert = \sqrt{1 + c^2}$ confirms it.

Uniqueness depends on the geometry of the dual ball: a flat face of the dual ball (the $\ell^\infty$ square, dual to $\ell^1$) gives a whole segment of extensions.

### Example 2: Norming functionals for $x_0 = (3, -4)$
In $\mathbb R^2$ with three norms, find $f = (a, b)$ (meaning $f(x,y) = ax + by$) with dual norm $1$ and $f(x_0) = \lVert x_0\rVert$.
- **$\ell^1$:** $\lVert x_0\rVert_1 = 7$. Dual norm is $\max(\lvert a\rvert,\lvert b\rvert)$. Need $3a - 4b = 7$ with $\lvert a\rvert,\lvert b\rvert\le 1$: forced $a = 1$, $b = -1$. Check: $3 + 4 = 7$. ✓
- **$\ell^2$:** $\lVert x_0\rVert_2 = 5$. $f = (\tfrac35, -\tfrac45)$, dual norm $\sqrt{\tfrac{9}{25}+\tfrac{16}{25}} = 1$, $f(x_0) = \tfrac95 + \tfrac{16}5 = 5$. ✓ (This is $x_0/\lVert x_0\rVert$, foreshadowing Riesz, ↪ S2E28.)
- **$\ell^\infty$:** $\lVert x_0\rVert_\infty = 4$. Dual norm $\lvert a\rvert + \lvert b\rvert$. Need $3a - 4b = 4$ with $\lvert a\rvert + \lvert b\rvert \le 1$: since $\lvert 3a - 4b\rvert \le 4(\lvert a\rvert + \lvert b\rvert) \le 4$ with equality only if $a = 0$, $b = -1$. Check: $f(x_0) = 4$. ✓

Non-uniqueness also happens: for $x_0 = (1,1)$ in $\ell^\infty$, every $f = (a, 1-a)$ with $0 \le a \le 1$ satisfies $\lvert a\rvert + \lvert 1-a\rvert = 1$ and $f(x_0) = 1 = \lVert x_0\rVert_\infty$. The point $(1,1)$ is a corner of the square, and a corner has many supporting lines.

### Example 3: Separating a point from a disk, and a failure without convexity
**Separation.** $C$ = closed unit disk, $x_0 = (2,2)$. Take $f(x,y) = x + y$. On $C$, by Cauchy–Schwarz, $f(x,y) \le \sqrt2\sqrt{x^2+y^2} \le \sqrt 2 \approx 1.414$, with equality at $(\tfrac1{\sqrt2}, \tfrac1{\sqrt2})$, the point of $C$ nearest to $x_0$. And $f(x_0) = 4$. Any line $x + y = \alpha$ with $\sqrt 2 < \alpha < 4$ separates, e.g. $x + y = 2.5$. The "best" separating line, halfway, is $x + y = (\sqrt2 + 4)/2 \approx 2.707$, perpendicular to the segment from $x_0$ to its nearest point (↪ S2E28: in Hilbert space, the separating functional comes from the nearest point).

**Failure.** $C'$ = the unit *circle* (not convex), $x_0 = (0,0)$. Take any nonzero functional $f(x,y) = ax + by$. Then $f(x_0) = 0$, while on the circle $f$ takes every value in $[-\sqrt{a^2+b^2}, \sqrt{a^2+b^2}]$ (it is continuous on a connected set and reaches both extremes), an interval containing $0$ in its interior. So no strict inequality $\sup_{C'} f < f(0)$ or $\inf_{C'} f > f(0)$ is possible. The convex hull of $C'$ (the disk) contains $0$, and that is the real obstruction.

### Example 4: LP duality as a separation certificate
Primal: maximize $x + y$ subject to $x + 2y \le 4$, $3x + y \le 6$, $x, y \ge 0$.
The feasible region has vertices $(0,0)$, $(2,0)$, $(0,2)$, and the intersection of $x + 2y = 4$ with $3x + y = 6$: from the second, $y = 6 - 3x$; substituting, $x + 12 - 6x = 4$, so $x = \tfrac85$, $y = \tfrac65$. Objective values: $0,\ 2,\ 2,\ \tfrac{14}5$. **Primal optimum $= \tfrac{14}{5}$** at $(\tfrac85,\tfrac65)$.

Dual: minimize $4u + 6v$ subject to $u + 3v \ge 1$, $2u + v \ge 1$, $u, v \ge 0$. At the vertex where both constraints are tight: from $u + 3v = 1$ and $2u + v = 1$, $v = 1 - 2u$, so $u + 3 - 6u = 1$, $u = \tfrac25$, $v = \tfrac15$. Value $4\cdot\tfrac25 + 6\cdot\tfrac15 = \tfrac{8}{5} + \tfrac65 = \tfrac{14}5$. **Dual optimum $= \tfrac{14}5$.** ✓

Interpretation: the functional $\tfrac25(x + 2y) + \tfrac15(3x + y) = x + y$ is exactly the objective, so for every feasible point $x + y \le \tfrac25\cdot 4 + \tfrac15\cdot 6 = \tfrac{14}5$. The dual solution is a *certificate*: a measurement that proves no feasible point does better. Strong duality says such a certificate always exists, and its existence is a separation theorem.

### Example 5: Banach limits of periodic sequences
Let $L$ be any Banach limit.
- $x = (1,0,1,0,\dots)$. Then $Sx = (0,1,0,1,\dots)$ and $x + Sx = (1,1,1,\dots)$. Linearity and (i): $L(x) + L(Sx) = 1$. Shift invariance (ii): $L(Sx) = L(x)$. So $L(x) = \tfrac12$.
- $x = (1,0,0,1,0,0,\dots)$. Then $x + Sx + S^2x = (1,1,1,\dots)$, and $L(x) = L(Sx) = L(S^2x)$, so $3L(x) = 1$ and $L(x) = \tfrac13$.
- **Not multiplicative.** For $x = (1,0,1,0,\dots)$, $x \cdot x = x$ termwise, so $L(x^2) = \tfrac12 \ne \tfrac14 = L(x)^2$. A Banach limit is linear, but it is not a "limit" in the sense of respecting products.

Every Banach limit gives the same values on periodic (indeed on all "almost convergent") sequences, but different Banach limits disagree on other sequences: they are not unique, and none is explicit.

## Visual and animation notes
1. **Cold open:** the sequence $1,0,1,0,\dots$ as dots bouncing between two horizontal lines; a ghostly horizontal line at height $\tfrac12$ fades in labeled "$L(x)$?" Then a locked box labeled "exists (Choice)" that never opens.
2. **One-step extension:** a functional's level lines (orange stack, S2E06 motif) drawn on a plane $M$; a new direction $z$ appears and the stack must be "tilted" into 3D. A slider for $c$ shows an allowed interval (green) between the sup and inf; the stack wobbles within the allowed range, never breaking the sublinear "ceiling" $p$ (drawn as a cone).
3. **Zorn:** a chain of ever-larger subspaces, each with an extended stack, stacking like nested translucent sheets; a crown labeled "maximal" on top; the S1E15 Choice stamp.
4. **Norming functionals:** the unit ball (diamond, circle, square) with a vector $x_0$ on its boundary; a supporting line touches the ball at $x_0/\lVert x_0\rVert$. At a corner, the supporting line rocks back and forth (non-uniqueness).
5. **Key visual: separation.** A convex blob and a point outside; a plane slides between them and stops. Then the blob morphs into a crescent (non-convex) wrapped around the point, and the plane can't find a gap.
6. **Convex set as intersection of half-spaces:** many supporting lines rotate around a convex shape; their half-planes shade in and their intersection carves out exactly the shape.
7. **LP duality:** the feasible polygon with the objective's level lines sweeping until they touch the vertex $(\tfrac85, \tfrac65)$; the two active constraint lines glow with weights $\tfrac25$ and $\tfrac15$ ("prices") and combine into the objective line.
8. **SVM:** two colored point clouds, their convex hulls shaded, the widest-margin separating line with its "street."

## Common misconceptions
- **Misconception:** The Hahn–Banach extension is unique. **Reality:** usually not (Example 1). It is unique, for instance, in Hilbert spaces (↪ S2E28) and whenever the dual norm is strictly convex.
- **Misconception:** Hahn–Banach is about extending linear maps into any space. **Reality:** it is about *scalar-valued* functionals. Norm-preserving extension of operators $M \to Y$ fails in general (e.g. there is no bounded projection of $\ell^\infty$ onto $c_0$, so the identity $c_0 \to c_0$ does not extend to $\ell^\infty$).
- **Misconception:** Any two disjoint convex sets can be strictly separated. **Reality:** you need hypotheses (one open; or one closed and the other compact). In $\mathbb R^2$, the closed convex sets $\lbrace y \le 0\rbrace$ and $\lbrace y \ge e^{-x}\rbrace$ are disjoint, but their distance is $0$, so no line separates them strictly (the line $y = 0$ separates them only weakly).
- **Misconception:** Since Hahn–Banach uses Zorn, it is equivalent to the Axiom of Choice. **Reality:** it is strictly weaker (it follows from the ultrafilter lemma), though not provable in ZF alone.
- **Misconception:** A Banach limit is a kind of average you can compute. **Reality:** it agrees with the Cesàro mean when that converges, but in general no explicit Banach limit exists.

## Exercises
- **Warm-up (computational):** In $(\mathbb R^3, \lVert\cdot\rVert_\infty)$, find all norming functionals for $x_0 = (2, -2, 1)$. Then find a separating functional for $x_0 = (3,0)$ and the closed $\ell^1$ unit ball in $\mathbb R^2$.
- **Core (conceptual):** Using Corollary 5, prove that a subspace $M$ of a normed space is dense iff every $f \in X^*$ that vanishes on $M$ is zero. Then explain, using Corollary 3, why $\lVert x\rVert \le \liminf\lVert x_n\rVert$ whenever $f(x_n) \to f(x)$ for every $f \in X^*$ (↪ S2E27).
- **Stretch (exploration):** Let $L$ be a Banach limit. Compute $L(x)$ for $x_n = (-1)^n + \tfrac1n$ and for $x_n = \cos(2\pi n/5)$. Then show there is a sequence of $0$s and $1$s on which two different Banach limits disagree. (Hint: use long blocks of $0$s and $1$s of rapidly increasing length.)

<details><summary>Hints and answers</summary>

- **Warm-up:** dual norm is $\ell^1$. Need $2a - 2b + c = 2$ with $\lvert a\rvert+\lvert b\rvert+\lvert c\rvert\le 1$: since $\lvert 2a - 2b + c\rvert \le 2(\lvert a\rvert + \lvert b\rvert) + \lvert c\rvert \le 2$ with equality iff $c = 0$, $a \ge 0$, $b \le 0$, $a - b = 1$: the norming functionals are $(a, a - 1, 0)$ for $0 \le a \le 1$. Separation: $f(x,y) = x$; $\max$ over the diamond is $1 < 3 = f(3,0)$.
- **Core:** if $M$ is not dense, $\overline M$ is a closed proper subspace; Corollary 5 gives $f \ne 0$ vanishing on it. Conversely, a continuous $f$ vanishing on a dense set is $0$. For the second part: take $f$ norming $x$; then $\lVert x\rVert = f(x) = \lim f(x_n) \le \liminf\lVert x_n\rVert$.
- **Stretch:** $(-1)^n \to$ Banach limit $0$ (Example 5 pattern), $\tfrac1n \to 0$, so $L(x) = 0$. For $\cos(2\pi n/5)$: the sum of the five shifts is $\sum_{k=0}^4\cos(2\pi(n+k)/5) = 0$, so $5L(x) = 0$ and $L(x) = 0$. For disagreement: let $q(x) = \lim_{n\to\infty}\sup_m \frac1n\sum_{k=m+1}^{m+n}x_k$ (the limit exists by subadditivity). It is sublinear, $q(x - Sx) = 0$, and $q(x) = \lim x_n$ on convergent sequences. Extend $g(tx) = t\,q(x)$ from $\mathbb R x$ (it satisfies $g \le q$ because $q(x) + q(-x) \ge q(0) = 0$) to $L \le q$; exactly as in the Banach-limit proof, $L$ is a Banach limit, with $L(x) = q(x)$. Doing the same with $-x$ gives a Banach limit $L'$ with $L'(x) = -q(-x)$. If $x$ consists of a block of $1$s of length $1$, a block of $0$s of length $2$, $1$s of length $3$, and so on, windows of every length fit inside a single block, so $q(x) = 1$ and $-q(-x) = 0$: $L(x) = 1 \ne 0 = L'(x)$. (Sucheston, 1967, showed every value in $[-q(-x), q(x)]$ occurs.)

</details>

## Historical note
Eduard Helly proved an extension theorem for functionals on $C[a,b]$ in 1912 and for normed sequence spaces in 1921. Hans Hahn (1927) and Stefan Banach (1929) independently proved the general real version; Banach's paper introduced the sublinear-functional form used today, and his 1932 book introduced what are now called Banach limits. Stanisław Mazur gave the geometric form for normed spaces in 1933. The complex case was settled in 1938 by H. F. Bohnenblust and A. Sobczyk, and independently by G. A. Sukhomlinov. In 1951 Jerzy Łoś and Czesław Ryll-Nardzewski showed the theorem follows from the ultrafilter lemma, and in 1991 Matthew Foreman and Friedrich Wehrung proved that it implies the existence of a non-measurable set. Meanwhile the finite-dimensional ancestor, Farkas' lemma (1902), became the foundation of linear programming duality developed by von Neumann, Gale, Kuhn, and Tucker in the 1940s and 1950s.

## Connections
- **Callbacks:** ↩ S1E15 (Choice, Zorn, Banach–Tarski), ↩ S2E02 (extending a basis), ↩ S2E06 (kernels and level sets as hyperplanes), ↩ S2E08 (the double dual), ↩ S2E21 (norms and unit balls), ↩ S2E22 (Vitali and Solovay), ↩ S2E24 (isometry of $J$; $(\ell^\infty)^* \supsetneq \ell^1$; dual unit balls)
- **Sets up:** ↪ S2E26 (combining with Baire), ↪ S2E27 (weak convergence; $X^*$ separates points so weak limits are unique; weak lower semicontinuity of the norm), ↪ S2E28 (in Hilbert space the norming functional is $\langle\cdot, x/\lVert x\rVert\rangle$ and extensions are unique), ↪ S2E33 (extending distributions); S3 Act III (category theory: "enough" functionals as a property of the dual)
- **Side quests:** *Convex duality and optimization* (attaches here): linear programming duality, Lagrange multipliers as functionals, the Legendre–Fenchel transform.

## References
- **Primary / historical**
  - Hans Hahn, "Über lineare Gleichungssysteme in linearen Räumen," *Journal für die reine und angewandte Mathematik* 157 (1927).
  - Stefan Banach, "Sur les fonctionnelles linéaires" I and II, *Studia Mathematica* 1 (1929).
  - Stefan Banach, *Théorie des opérations linéaires* (Warsaw, 1932), including Banach limits.
  - H. F. Bohnenblust and A. Sobczyk, "Extensions of functionals on complex linear spaces," *Bulletin of the American Mathematical Society* 44 (1938).
  - Matthew Foreman and Friedrich Wehrung, "The Hahn–Banach theorem implies the existence of a non-Lebesgue measurable set," *Fundamenta Mathematicae* 138 (1991).
- **Textbooks**
  - Haim Brezis, *Functional Analysis, Sobolev Spaces and Partial Differential Equations* (Springer, 2011), Ch. 1 (analytic and geometric forms of Hahn–Banach).
  - Walter Rudin, *Functional Analysis*, 2nd ed. (McGraw-Hill, 1991), Ch. 3 (Convexity: Hahn–Banach theorems).
  - John B. Conway, *A Course in Functional Analysis*, 2nd ed. (Springer GTM 96, 1990), Ch. III (Hahn–Banach) and Ch. IV (locally convex spaces and separation).
  - Stephen Boyd and Lieven Vandenberghe, *Convex Optimization* (Cambridge University Press, 2004), §2.5 (separating and supporting hyperplanes) and Ch. 5 (duality).
- **Accessible**
  - Lawrence Narici and Edward Beckenstein, "The Hahn–Banach theorem: the life and times," *Topology and its Applications* 77 (1997): a historical survey.
  - Corinna Cortes and Vladimir Vapnik, "Support-vector networks," *Machine Learning* 20 (1995): the separating-hyperplane idea in machine learning.
