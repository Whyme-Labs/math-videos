# S2E28: Hilbert Spaces: Infinite-Dimensional Euclidean Geometry

> **Season / Act:** Season 2, Part B, Act VIII (Hilbert Spaces and Operators) · **Target runtime:** 20–25 min ·
> **Prerequisites:** inner products and Cauchy–Schwarz (↩ S2E14), unitary spaces (↩ S2E15), Riesz in finite dimensions (↩ S2E16), projections and Gram–Schmidt (↩ S2E17), Banach spaces and completion (↩ S2E23), continuous duals (↩ S2E24); comfort with series and integrals ·
> **Builds toward:** Fourier series (↪ S2E29), compact operators (↪ S2E30), spectrum and quantum mechanics (↪ S2E31), Koopman operators (↪ S2E32), Sobolev spaces and Lax–Milgram (↪ S2E33), Fourier is duality (↪ S3E04)

## Learning objectives
By the end of this lesson the viewer can:
1. Define a Hilbert space, give ℓ² and L² as examples, and explain why completeness is the extra ingredient beyond an inner product.
2. State and prove the projection theorem (unique closest point in a closed convex set) and use it to get $H = M \oplus M^\perp$ for closed subspaces $M$.
3. State the Riesz representation theorem, derive it from the projection theorem, and compute the representing vector of a given functional.
4. Define an orthonormal basis in the infinite-sum sense, prove Bessel's inequality, and use Parseval's identity.
5. Explain why every separable infinite-dimensional Hilbert space is unitarily isomorphic to ℓ², and why this is a "describe, don't build" result.

## Cold open
*Narration draft.*

Two episodes ago we saw a Banach space where the nearest point doesn't exist. You can get within a millimetre of a target, then within a micrometre, then a nanometre, but there is no point at which you arrive. That's a strange world to live in. In the plane, "drop a perpendicular" always works: there is one closest point on a line, and the error is at a right angle.

So here is the puzzle. Take every square-integrable function on $[0, 1]$: audio clips, temperature profiles, the wave function of an electron. That's an infinite-dimensional space. Now pick a subspace, maybe "all polynomials of degree at most 1", or something infinite-dimensional like "all functions whose average is zero." Is there always one closest point? Is the error always perpendicular? Can you still build a coordinate system out of mutually perpendicular unit vectors and read off coordinates by dot products, the way you did in high school?

The surprising answer is yes. You get all of it back, as long as you have two things together: an inner product and completeness. The spaces with both are called Hilbert spaces. And they are so rigid that, once you say "separable and infinite-dimensional", there is only one of them. Audio, heat, and quantum states all live in the same space wearing different costumes.

## The story

### 1. The naive attempt: an inner product is not enough

Part A gave us inner products (↩ S2E14) and their complex version (↩ S2E15): a map $\langle \cdot, \cdot \rangle : V \times V \to \mathbb{C}$ that is linear in the first slot, Hermitian ($\langle v, u\rangle = \overline{\langle u, v\rangle}$), and positive definite. It yields a norm $\|v\| = \sqrt{\langle v, v\rangle}$, the Cauchy–Schwarz inequality $|\langle u, v\rangle| \le \|u\|\,\|v\|$, and the **parallelogram law**
$$\|u+v\|^2 + \|u-v\|^2 = 2\|u\|^2 + 2\|v\|^2 .$$

In finite dimensions this was the whole story: Gram–Schmidt produced orthonormal bases, every subspace had an orthogonal projection (↩ S2E17), and every functional was $\langle \cdot, y\rangle$ for a unique $y$ (↩ S2E16).

The naive plan is to take any inner product space of functions and carry on. Here is where it fails. Let $c_{00}$ be the space of sequences with only finitely many nonzero terms, with the ℓ² inner product $\langle x, y\rangle = \sum_n x_n \overline{y_n}$. Put $y = (1, \tfrac12, \tfrac13, \dots)$. This $y$ is **not** in $c_{00}$, but the functional $\varphi(x) = \sum_n x_n/n$ is still perfectly well defined on $c_{00}$ and bounded by Cauchy–Schwarz: $|\varphi(x)| \le \|x\|\,\|y\| = \|x\|\,\pi/\sqrt{6}$.

Now ask for the closest point to $e_1 = (1, 0, 0, \dots)$ in the closed hyperplane $M = \ker \varphi \subset c_{00}$. In finite dimensions the answer would be $e_1 - \frac{\varphi(e_1)}{\|y\|^2} y$. That vector has infinitely many nonzero entries, so it isn't in $c_{00}$. Worked Example 3 shows that the distance is approached but never attained. Worse, the only vector of $c_{00}$ orthogonal to all of $M$ is $0$, because $M^\perp$ "wants" to be spanned by $y$, which is missing. So $c_{00} \ne M \oplus M^\perp$.

### 2. The crisis, stated precisely

Two different things can go wrong.

- **Missing limits.** The minimizing sequence for the distance is Cauchy, but the space has a hole where its limit should be. That's the $\mathbb{Q} \to \mathbb{R}$ problem of Season 1 (↩ S1E07, ↩ S1E08) and the polynomial problem of S2E23.
- **The wrong shape of unit ball.** Even in a complete space (a Banach space), the closest point can fail to exist or fail to be unique if the norm doesn't come from an inner product. In ℝ² with the sup norm, the "circle" is a square, and a point can have a whole segment of closest points on a line. In infinite dimensions, existence can fail outright (Worked Example 3, part b).

So we need both repairs at once: the geometry of an inner product *and* completeness.

> **Definition (Hilbert space).** A **Hilbert space** is a complex (or real) inner product space $H$ that is complete in the norm $\|v\| = \sqrt{\langle v, v \rangle}$: every Cauchy sequence converges to an element of $H$.

**Examples.**
- $\mathbb{C}^n$ with $\langle u, v\rangle = \sum_k u_k \overline{v_k}$.
- $\ell^2 = \{ x = (x_1, x_2, \dots) : \sum_n |x_n|^2 < \infty\}$ with $\langle x, y\rangle = \sum_n x_n \overline{y_n}$. The sum converges absolutely by Cauchy–Schwarz, and completeness is the standard "converge coordinatewise, then use Fatou on the tails" argument.
- $L^2(X, \mu)$ for any measure space (↩ S2E22): equivalence classes of measurable $f$ with $\int |f|^2\,d\mu < \infty$, with $\langle f, g\rangle = \int f \overline{g}\, d\mu$. Completeness is the Riesz–Fischer theorem. In particular $L^2[0,1]$ is the completion of $C[0,1]$ under $\|f\|_2 = (\int_0^1 |f|^2)^{1/2}$ (↩ S2E23).
- Non-examples: $c_{00}$ and $C[0,1]$ with the $L^2$ inner product are inner product spaces but not complete. $\ell^p$ for $p \neq 2$ and $C[0,1]$ with the sup norm are complete but fail the parallelogram law, so no inner product gives their norm.

> **Build or Describe?** $L^2[0,1]$ can be *built* (complete $C[0,1]$ under $\|\cdot\|_2$, or take Lebesgue square-integrable functions modulo null sets). By the end of this episode we will *describe* it: "the separable infinite-dimensional Hilbert space." Same object, two doors.

### 3. The construction: the projection theorem

> **Theorem (Projection theorem).** Let $H$ be a Hilbert space and $C \subseteq H$ a nonempty, closed, convex set. For every $x \in H$ there is a unique $p \in C$ with
> $$\|x - p\| = d := \inf_{c \in C} \|x - c\|.$$

**Proof.** Choose $c_n \in C$ with $\|x - c_n\|^2 < d^2 + \tfrac1n$. Apply the parallelogram law to $u = x - c_n$ and $v = x - c_m$:
$$\|c_m - c_n\|^2 = 2\|x - c_n\|^2 + 2\|x - c_m\|^2 - 4\left\|x - \tfrac{c_n + c_m}{2}\right\|^2 .$$
By convexity, $\tfrac{c_n + c_m}{2} \in C$, so the last norm is at least $d$. Hence
$$\|c_m - c_n\|^2 \le 2\left(d^2 + \tfrac1n\right) + 2\left(d^2 + \tfrac1m\right) - 4d^2 = \tfrac2n + \tfrac2m \longrightarrow 0 .$$
So $(c_n)$ is Cauchy. **This is where completeness enters:** $c_n \to p$ for some $p \in H$, and since $C$ is closed, $p \in C$. By continuity of the norm, $\|x - p\| = d$.

For uniqueness, if $p, q \in C$ both achieve $d$, the same identity with $c_n = p$, $c_m = q$ gives $\|p - q\|^2 \le 2d^2 + 2d^2 - 4d^2 = 0$. $\blacksquare$

Look at where each hypothesis was used. The parallelogram law (inner product geometry) turned "nearly minimizing" into "nearly equal." Completeness supplied the limit. Closedness kept the limit in $C$. Convexity kept midpoints in $C$. Remove any one and the theorem fails.

**Orthogonality of the error.** When $C = M$ is a closed *subspace*, the closest point $p = P_M x$ is characterized by
$$x - P_M x \perp M, \quad\text{i.e.}\quad \langle x - P_M x, m\rangle = 0 \ \text{for all } m \in M.$$
(Sketch: for $m \in M$ and real $t$, $t \mapsto \|x - p - t m\|^2$ has a minimum at $t = 0$, so its derivative $-2\,\mathrm{Re}\langle x - p, m\rangle$ vanishes there; replace $m$ by $im$ to kill the imaginary part.) This is S2E17's "residual is perpendicular" with no finite-dimensionality anywhere.

> **Corollary (Orthogonal decomposition).** If $M$ is a closed subspace of $H$, then $H = M \oplus M^\perp$, where $M^\perp = \{ z : \langle z, m\rangle = 0 \ \forall m \in M\}$. The map $P_M$ is linear, $P_M^2 = P_M$, $P_M^* = P_M$, and $\|P_M\| = 1$ unless $M = \{0\}$. Also $(M^\perp)^\perp = M$.

Every $x$ splits as $x = P_M x + (x - P_M x)$ with the first piece in $M$ and the second in $M^\perp$; the splitting is unique because $M \cap M^\perp = \{0\}$.

### 4. Riesz representation: H is its own dual

In S2E24 we computed continuous duals and found surprises: $(\ell^1)^* = \ell^\infty$, but $(\ell^\infty)^*$ is bigger than $\ell^1$. In a Hilbert space there are no surprises.

> **Theorem (Riesz representation, Riesz and Fréchet 1907).** For every bounded linear functional $\varphi \in H^*$ there is a unique $y \in H$ such that
> $$\varphi(x) = \langle x, y\rangle \quad \text{for all } x \in H,$$
> and $\|\varphi\| = \|y\|$. The map $y \mapsto \langle \cdot, y\rangle$ is a conjugate-linear isometric bijection $H \to H^*$.

**Proof.** If $\varphi = 0$, take $y = 0$. Otherwise $M = \ker\varphi$ is a closed subspace (closed because $\varphi$ is continuous) and $M \neq H$. By the corollary, $M^\perp \neq \{0\}$; pick $z \in M^\perp$ with $\varphi(z) = 1$. For any $x$, the vector $x - \varphi(x) z$ lies in $\ker \varphi = M$, so it is orthogonal to $z$:
$$0 = \langle x - \varphi(x) z, z\rangle = \langle x, z\rangle - \varphi(x)\|z\|^2 .$$
Thus $\varphi(x) = \langle x, z/\|z\|^2\rangle$, and $y = z/\|z\|^2$ works. Uniqueness: if $\langle x, y\rangle = \langle x, y'\rangle$ for all $x$, take $x = y - y'$. The norm equality is Cauchy–Schwarz plus testing on $x = y$. $\blacksquare$

The picture is S2E06's: a covector is a stack of level hyperplanes. The kernel is one hyperplane; the representing vector $y$ is the arrow perpendicular to the stack (↩ S2E06, ↩ S2E16). In finite dimensions this needed only linear algebra. Here it needed the projection theorem, and therefore completeness. Riesz also makes every Hilbert space reflexive (↩ S2E24).

### 5. Orthonormal bases: infinite sums replace finite ones

Hamel bases are useless here (↩ S2E20). What we want instead:

> **Definition.** An **orthonormal set** $\{e_\alpha\}$ satisfies $\langle e_\alpha, e_\beta\rangle = \delta_{\alpha\beta}$. It is an **orthonormal basis** (or complete orthonormal system) if its finite linear combinations are dense in $H$; equivalently, if the only vector orthogonal to every $e_\alpha$ is $0$.

> **Theorem (Bessel's inequality).** If $(e_n)_{n \ge 1}$ is orthonormal in an inner product space and $x$ is any vector, then
> $$\sum_{n=1}^\infty |\langle x, e_n\rangle|^2 \le \|x\|^2 .$$

**Proof.** Fix $N$ and put $s_N = \sum_{n=1}^N \langle x, e_n\rangle e_n$. For $k \le N$, $\langle x - s_N, e_k\rangle = \langle x, e_k\rangle - \langle x, e_k\rangle = 0$, so $x - s_N \perp s_N$. By Pythagoras,
$$\|x\|^2 = \|s_N\|^2 + \|x - s_N\|^2 \ \ge\ \|s_N\|^2 = \sum_{n=1}^N |\langle x, e_n\rangle|^2 .$$
Let $N \to \infty$. $\blacksquare$

Note that $s_N$ is exactly the orthogonal projection of $x$ onto $\mathrm{span}\{e_1, \dots, e_N\}$, and $\|x - s_N\|$ is the error. As $N$ grows, the error shrinks term by term. That's the key visual of this episode.

> **Theorem (Parseval / orthonormal expansion).** For an orthonormal sequence $(e_n)$ in a Hilbert space $H$, the following are equivalent:
> 1. $(e_n)$ is an orthonormal basis;
> 2. $x = \sum_n \langle x, e_n\rangle e_n$ for every $x$ (convergence in norm);
> 3. **Parseval:** $\|x\|^2 = \sum_n |\langle x, e_n\rangle|^2$ for every $x$;
> 4. $\langle x, e_n\rangle = 0$ for all $n$ implies $x = 0$.

*Proof sketch.* By Bessel, the partial sums $s_N$ are Cauchy: $\|s_M - s_N\|^2 = \sum_{N < n \le M} |\langle x, e_n\rangle|^2 \to 0$. **Completeness** gives a limit $s$. Then $x - s \perp e_n$ for all $n$; under (4) this forces $x = s$. The other implications are short.

Every Hilbert space has an orthonormal basis (Zorn's lemma in general, ↩ S1E15; Gram–Schmidt on a countable dense set if $H$ is separable).

### 6. Payoff: there is only one (separable) Hilbert space

> **Theorem.** Every separable infinite-dimensional Hilbert space $H$ is unitarily isomorphic to $\ell^2$. If $(e_n)$ is an orthonormal basis, then
> $$U : H \to \ell^2, \qquad U x = \big(\langle x, e_1\rangle, \langle x, e_2\rangle, \dots\big)$$
> is a linear bijection with $\langle Ux, Uy\rangle_{\ell^2} = \langle x, y\rangle_H$.

*Proof sketch.* $U$ is well defined and isometric by Parseval (and polarization turns norm-preserving into inner-product-preserving). It is onto because for any $(a_n) \in \ell^2$ the series $\sum a_n e_n$ has Cauchy partial sums, so it converges in $H$ (completeness, one more time), and its coefficients are $a_n$. This last step is the abstract **Riesz–Fischer theorem**.

So $L^2[0,1]$, $L^2(\mathbb{R})$, $L^2(\text{sphere})$, the Sobolev space $H^1_0(0,1)$ of S2E33 and the state space of a quantum particle are all **the same space**, in the sense of S1's bijections that keep the structure (↩ S1E11). What distinguishes them in practice is not the Hilbert space but the *operators* we care about on it: differentiation, multiplication by $x$, the Hamiltonian. That's where the next three episodes go.

**Answer to the cold open.** Yes: in $L^2[0,1]$, every closed subspace (closed convex set, even) has a unique closest point, the error is perpendicular, and coordinates in an orthonormal basis are read off by inner products, with Pythagoras holding for infinitely many terms.

**Zoom out (thread 6, duality).** S2E06 introduced covectors as measuring devices; S2E16 showed that an inner product turns them into vectors. Banach spaces broke that symmetry (S2E24). Hilbert spaces restore it fully: $H \cong H^*$. The season finale (↪ S2E33) will exploit exactly this to solve differential equations.

## Worked examples

### Example 1: Best linear approximation to $x^2$ in $L^2[0,1]$

**Problem.** Find the closest function of the form $a + bx$ to $f(x) = x^2$ in $L^2[0,1]$, and the error.

**Solution.** $M = \mathrm{span}\{1, x\}$ is finite-dimensional, hence closed. The projection $p = a + bx$ is characterized by $f - p \perp 1$ and $f - p \perp x$:
$$\int_0^1 (x^2 - a - bx)\,dx = \tfrac13 - a - \tfrac b2 = 0, \qquad \int_0^1 (x^2 - a - bx)\,x\,dx = \tfrac14 - \tfrac a2 - \tfrac b3 = 0 .$$
From the first, $a = \tfrac13 - \tfrac b2$. Substituting: $\tfrac14 - \tfrac16 + \tfrac b4 - \tfrac b3 = 0$, so $\tfrac1{12} = \tfrac{b}{12}$, giving $b = 1$ and $a = -\tfrac16$. So
$$P_M f = x - \tfrac16 .$$
**Error:** the residual is $r(x) = x^2 - x + \tfrac16$. Expand: $(x^2 - x + \tfrac16)^2 = x^4 - 2x^3 + \tfrac43 x^2 - \tfrac13 x + \tfrac1{36}$. Integrating term by term over $[0,1]$:
$$\|r\|_2^2 = \tfrac15 - \tfrac24 + \tfrac49 - \tfrac16 + \tfrac1{36} = \tfrac{36 - 90 + 80 - 30 + 5}{180} = \tfrac{1}{180}.$$

**Check (Pythagoras).** $\|f\|^2 = \int_0^1 x^4 = \tfrac15$ and $\|P_M f\|^2 = \int_0^1 (x - \tfrac16)^2 dx = \tfrac13 - \tfrac16 + \tfrac1{36} = \tfrac{7}{36}$. Then $\tfrac{7}{36} + \tfrac1{180} = \tfrac{35 + 1}{180} = \tfrac15$. ✓ (Also verified symbolically with sympy: residual orthogonal to $1$ and $x$, squared error $1/180$.)

This is S2E17's least squares, now with an integral instead of a sum: the "best-fit line" through the continuum of data points $(x, x^2)$.

### Example 2: Representing a functional, and a distance in ℓ²

**(a)** Let $\varphi(f) = \int_0^{1/2} f(t)\,dt$ on $L^2[0,1]$. Then $\varphi(f) = \int_0^1 f(t)\,\overline{\mathbf 1_{[0,1/2]}(t)}\,dt = \langle f, \mathbf 1_{[0,1/2]}\rangle$. So the Riesz vector is $y = \mathbf 1_{[0,1/2]}$ and $\|\varphi\| = \|y\|_2 = \sqrt{1/2}$. Check the norm directly: Cauchy–Schwarz gives $|\varphi(f)| \le \sqrt{1/2}\,\|f\|$, with equality at $f = y$, where $\varphi(y) = 1/2 = \sqrt{1/2}\cdot\sqrt{1/2}$. ✓

**(b) Not every "functional" is representable, because not every functional is continuous.** Evaluation $f \mapsto f(0)$ is not even well defined on $L^2$ (functions are only defined up to null sets), and on $C[0,1]$ with the $L^2$ norm it is unbounded: $f_n(t) = \max(0, 1 - nt)$ has $f_n(0) = 1$ but $\|f_n\|_2^2 = \int_0^{1/n}(1-nt)^2 dt = \tfrac{1}{3n} \to 0$. No $y$ can represent it. This is the "value at a point" problem planted in S2E07; the finale fixes it by changing the space of test functions (↪ S2E33).

**(c) Distance to a hyperplane in ℓ².** Let $y = (1, \tfrac12, \tfrac13, \dots) \in \ell^2$, with $\|y\|^2 = \sum 1/n^2 = \pi^2/6$ (proved in ↪ S2E29). Let $M = \{x \in \ell^2 : \langle x, y\rangle = 0\}$. Since $M^\perp = \mathrm{span}\{y\}$, the projection of $e_1$ onto $M^\perp$ is $\frac{\langle e_1, y\rangle}{\|y\|^2} y = \frac{6}{\pi^2} y$, and
$$\mathrm{dist}(e_1, M) = \frac{|\langle e_1, y\rangle|}{\|y\|} = \frac{1}{\pi/\sqrt6} = \frac{\sqrt6}{\pi} \approx 0.7797 .$$
The closest point is $p = e_1 - \frac{6}{\pi^2} y = \left(1 - \tfrac{6}{\pi^2}, -\tfrac{6}{2\pi^2}, -\tfrac{6}{3\pi^2}, \dots\right)$, which has **infinitely many** nonzero entries.

### Example 3: Two ways the projection theorem fails

**(a) No completeness.** Work in $c_{00}$ with the same $y$ and $M_0 = M \cap c_{00}$. The infimum $\inf_{m \in M_0}\|e_1 - m\|$ is still $\sqrt6/\pi$: truncate $p$ from Example 2(c) to its first $N$ entries and correct one coordinate to restore $\langle \cdot, y\rangle = 0$; the error tends to 0 as $N \to \infty$. But the only candidate minimizer is $p$, by uniqueness in $\ell^2$, and $p \notin c_{00}$. So the infimum is not attained. Also $M_0^\perp$ (inside $c_{00}$) is $\{0\}$: anything in $c_{00}$ orthogonal to $M_0$ is orthogonal to its $\ell^2$-closure $M$, hence a multiple of $y$, hence $0$. So $c_{00} \neq M_0 \oplus M_0^\perp$.

**(b) No inner product.** Let $X = \{f \in C[0,1] : f(0) = 0\}$ with the sup norm (a Banach space), and $\varphi(f) = \int_0^1 f$. Then $|\varphi(f)| \le \|f\|_\infty$, and $\|\varphi\| = 1$ (use $f_n(t) = \min(nt, 1)$, with $\varphi(f_n) = 1 - \tfrac{1}{2n} \to 1$). But no $f$ with $\|f\|_\infty \le 1$ achieves $\varphi(f) = 1$: that needs $f \equiv 1$ almost everywhere, hence everywhere by continuity, contradicting $f(0) = 0$. For $g \in X$ with $\varphi(g) = 1$, the distance from $g$ to the closed hyperplane $\ker\varphi$ is $|\varphi(g)|/\|\varphi\| = 1$, but a closest point $m$ would give $h = g - m$ with $\|h\|_\infty = 1$ and $\varphi(h) = 1$, which we just saw is impossible. Complete, closed, convex, and still no closest point.

### Example 4: The isomorphism with ℓ² in action

Take $H = L^2[0,1]$ with the orthonormal basis $e_n(t) = e^{2\pi i n t}$, $n \in \mathbb{Z}$ (completeness of this basis is proved in ↪ S2E29). For $f(t) = t$:
$$\langle f, e_0\rangle = \int_0^1 t\,dt = \tfrac12, \qquad \langle f, e_n\rangle = \int_0^1 t e^{-2\pi i n t}\,dt = \frac{i}{2\pi n} \ (n \neq 0),$$
the second by integrating by parts: $\left[\frac{t e^{-2\pi i n t}}{-2\pi i n}\right]_0^1 + \frac{1}{2\pi i n}\int_0^1 e^{-2\pi i n t} dt = \frac{1}{-2\pi i n} + 0 = \frac{i}{2\pi n}$. So $U f = (\dots, \tfrac{-i}{4\pi}, \tfrac{-i}{2\pi}, \tfrac12, \tfrac{i}{2\pi}, \tfrac{i}{4\pi}, \dots)$, a vector in $\ell^2(\mathbb{Z})$. Parseval predicts
$$\tfrac13 = \int_0^1 t^2\,dt = \tfrac14 + 2\sum_{n \ge 1}\frac{1}{4\pi^2 n^2} = \tfrac14 + \frac{1}{2\pi^2}\sum_{n\ge1}\frac1{n^2},$$
which rearranges to $\sum 1/n^2 = 2\pi^2(\tfrac13 - \tfrac14) = \pi^2/6$. The function "$t$" and the sequence of its coefficients are the same vector seen in two coordinate systems (↩ S2E04, "matrices as shadows").

## Visual and animation notes
1. **Cold open:** a target point floating above a dotted "subspace" surface in a stylized infinite-dimensional space (render as a translucent sheet with receding copies). Arrows from the target get shorter and shorter but never touch, accompanied by the text "within 10⁻³… 10⁻⁶… 10⁻⁹…" Then the scene "completes" and a single perpendicular arrow snaps into place.
2. **Naive attempt (c₀₀):** a bar chart of $p = e_1 - \frac{6}{\pi^2}y$ with infinitely many bars; the bars past position $N$ are greyed out as "not allowed in $c_{00}$". Reuse the **Completion** motif (S1's zoom-into-holes) to show the missing vector as a hole.
3. **Projection theorem proof:** two near-minimizers $c_n, c_m$ and their midpoint inside a convex blob; the parallelogram drawn from $x$ with diagonals labelled. As $n, m$ grow the parallelogram flattens to a segment.
4. **Key visual (from storyline):** S2E17's "drop a shadow onto a plane," now onto $\mathrm{span}\{e_1, \dots, e_N\}$ for $N = 1, 2, 3, \dots$. Show the residual vector (perpendicular, red) and a bar on the side showing $\|x - s_N\|^2$ shrinking term by term while the Bessel sum climbs toward $\|x\|^2$.
5. **Riesz:** an orange stack of level hyperplanes (covector motif) with one blue arrow perpendicular to it (vector motif); the arrow and stack fuse, showing $H \cong H^*$.
6. **Isomorphism to ℓ²:** **Bijection** motif. $L^2[0,1]$ (a function graph), $L^2(\mathbb R)$ (a Gaussian), a quantum wave packet and an infinite column vector are connected by threads, then slide onto one another.
7. **"Build or Describe?"** card: "complete $C[0,1]$ under $\|\cdot\|_2$" vs. "the separable infinite-dimensional Hilbert space."

## Common misconceptions
- **Misconception:** Any inner product space is a Hilbert space. **Reality:** completeness is an extra requirement. $C[0,1]$ with $\int f\bar g$ and $c_{00}$ are inner product spaces that are not complete, and the projection theorem fails in them.
- **Misconception:** An orthonormal basis spans $H$ in the algebraic sense. **Reality:** it spans a *dense* subspace; general vectors are *infinite* sums converging in norm. A Hamel basis of $\ell^2$ is uncountable.
- **Misconception:** Every subspace has a complement $M^\perp$ with $H = M \oplus M^\perp$. **Reality:** this needs $M$ closed. For a dense proper subspace (e.g. $c_{00} \subset \ell^2$), $M^\perp = \{0\}$ and $M \oplus M^\perp = M \neq H$.
- **Misconception:** Riesz says every linear functional is an inner product. **Reality:** only *continuous* ones. Discontinuous linear functionals on $H$ exist (via a Hamel basis and Choice), and they are not representable.
- **Misconception:** "$L^2[0,1]$ is isomorphic to $\ell^2$, so the two are interchangeable for everything." **Reality:** they are isomorphic *as Hilbert spaces*. Extra structure, such as pointwise multiplication of functions or the derivative, is not preserved by an arbitrary unitary map.

## Exercises
- **Warm-up (computational).** In $L^2[-1,1]$, find the orthogonal projection of $f(x) = |x|$ onto $\mathrm{span}\{1, x, x^2\}$, and the squared error.
- **Core (conceptual).** Show that if $M$ is a (not necessarily closed) subspace of $H$, then $(M^\perp)^\perp = \overline{M}$. Deduce that $M$ is dense iff $M^\perp = \{0\}$.
- **Stretch (proof).** Prove the converse of the parallelogram law (Jordan–von Neumann): if a norm on a complex vector space satisfies the parallelogram law, then $\langle u, v\rangle = \frac14\sum_{k=0}^3 i^k \|u + i^k v\|^2$ is an inner product inducing it. Then use it to show that $\ell^p$ is a Hilbert space only for $p = 2$.

<details><summary>Hints and answers</summary>

- **Warm-up.** $|x|$ is even, so its projection onto $x$ is 0. Use the orthogonal basis $1, x^2 - \tfrac13$ (Legendre, ↪ S2E29). $\langle |x|, 1\rangle = 1$, $\|1\|^2 = 2$; $\langle |x|, x^2 - \tfrac13\rangle = 2(\tfrac14 - \tfrac16) = \tfrac16$, $\|x^2 - \tfrac13\|^2 = \tfrac{8}{45}$. Projection: $\tfrac12 + \tfrac{15}{16}(x^2 - \tfrac13) = \tfrac{15}{16}x^2 + \tfrac{3}{16}$. Squared error: $\|f\|^2 - \|Pf\|^2 = \tfrac23 - (\tfrac12 + \tfrac{(1/6)^2}{8/45}) = \tfrac23 - \tfrac12 - \tfrac{5}{32} = \tfrac{1}{96}$.
- **Core.** $M \subseteq (M^\perp)^\perp$ and the latter is closed, so $\overline M \subseteq (M^\perp)^\perp$. Conversely, $M^\perp = (\overline M)^\perp$ and apply $H = \overline M \oplus \overline M^\perp$ to $x \in (M^\perp)^\perp$.
- **Stretch.** Additivity in the first slot is the hard part: use the parallelogram law to show $\langle u + u', v\rangle = \langle u, v\rangle + \langle u', v\rangle$, then get rational, then real homogeneity by continuity. For $\ell^p$, test $u = e_1$, $v = e_2$: $\|u+v\|^2 + \|u - v\|^2 = 2\cdot 2^{2/p}$, which equals $4$ only for $p = 2$.

</details>

## Historical note
David Hilbert met these spaces while studying integral equations between 1904 and 1910, working concretely with square-summable sequences of coefficients; his papers were collected in the 1912 book *Grundzüge einer allgemeinen Theorie der linearen Integralgleichungen*. In 1907 Frigyes Riesz and Ernst Fischer independently proved that $L^2$ is complete and that square-summable coefficient sequences come from $L^2$ functions, which showed that Hilbert's sequences and Lebesgue's functions were two views of one thing. In the same year Riesz and Maurice Fréchet independently found the representation theorem for functionals on $L^2$. The abstract, axiomatic definition of a Hilbert space came from John von Neumann in 1927–1929, who needed a single arena for both Heisenberg's matrix mechanics (sequences) and Schrödinger's wave mechanics (functions). The isomorphism $L^2 \cong \ell^2$ is precisely why those two theories turned out to be the same (↪ S2E31).

## Connections
- **Callbacks:** ↩ S1E07 and ↩ S1E08 (holes and completion), ↩ S1E11 (bijections), ↩ S1E15 (Choice/Zorn for bases), ↩ S2E04 (coordinates as shadows), ↩ S2E06 (covectors as level sets), ↩ S2E07 (the evaluation functional), ↩ S2E14 (inner products, parallelogram law), ↩ S2E15 (unitary spaces), ↩ S2E16 (finite-dimensional Riesz), ↩ S2E17 (projection and least squares), ↩ S2E20 (Hamel bases fail), ↩ S2E22 (measure spaces and $L^2$), ↩ S2E23 (completeness), ↩ S2E24 (continuous duals, reflexivity)
- **Sets up:** ↪ S2E29 (Fourier as an orthonormal basis), ↪ S2E30 (compact self-adjoint operators), ↪ S2E31 (quantum states as unit vectors), ↪ S2E32 (Koopman operators, mean ergodic theorem as a projection), ↪ S2E33 (Sobolev spaces and Riesz/Lax–Milgram for PDEs), ↪ S3E04 (Plancherel), Hodge theory side quest (harmonic representatives via orthogonal projection)
- **Side quests:** Kernel methods and RKHS (Hilbert spaces where evaluation *is* continuous, so Riesz gives a reproducing kernel); Wavelets.

## References
- **Primary / historical**
  - D. Hilbert, *Grundzüge einer allgemeinen Theorie der linearen Integralgleichungen*, Teubner, 1912 (collects the 1904–1910 papers).
  - F. Riesz, "Sur les systèmes orthogonaux de fonctions," *Comptes Rendus de l'Académie des Sciences* 144 (1907), and E. Fischer, "Sur la convergence en moyenne," *Comptes Rendus* 144 (1907). (The Riesz–Fischer theorem.)
  - F. Riesz, "Sur une espèce de géométrie analytique des systèmes de fonctions sommables," *Comptes Rendus* 144 (1907), and M. Fréchet, "Sur les ensembles de fonctions et les opérations linéaires," *Comptes Rendus* 144 (1907). (The representation theorem.)
  - J. von Neumann, "Allgemeine Eigenwerttheorie Hermitescher Funktionaloperatoren," *Mathematische Annalen* 102 (1929/1930). (Axiomatic Hilbert space.)
- **Textbooks**
  - E. Kreyszig, *Introductory Functional Analysis with Applications*, Wiley, 1978, Ch. 3 (Inner product spaces, Hilbert spaces).
  - H. Brezis, *Functional Analysis, Sobolev Spaces and Partial Differential Equations*, Springer, 2011, Ch. 5 (Hilbert spaces: projection theorem, Riesz–Fréchet, Lax–Milgram, Hilbert bases).
  - E. M. Stein and R. Shakarchi, *Real Analysis: Measure Theory, Integration, and Hilbert Spaces* (Princeton Lectures in Analysis III), 2005, Ch. 4.
  - M. Reed and B. Simon, *Methods of Modern Mathematical Physics I: Functional Analysis*, Academic Press, 1972 (rev. 1980), Ch. II (Hilbert spaces).
- **Accessible**
  - N. Young, *An Introduction to Hilbert Space*, Cambridge University Press, 1988.
  - P. R. Halmos, *A Hilbert Space Problem Book*, Springer (2nd ed. 1982), the opening problems on geometry and bases.
