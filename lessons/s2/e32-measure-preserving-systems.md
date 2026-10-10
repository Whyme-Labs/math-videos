# S2E32: Measure-Preserving Systems: Linear Algebra Meets Chaos

> **Season / Act:** Season 2, Part B, Act VIII (Hilbert Spaces and Operators) · **Target runtime:** 22–25 min ·
> **Prerequisites:** eigenvectors (↩ S2E12), unitary maps (↩ S2E15), projections (↩ S2E17), measure spaces and integrals (↩ S2E22), Hilbert spaces and orthogonal decomposition (↩ S2E28), Fourier series on the circle (↩ S2E29), spectrum (↩ S2E31); the idea of a probability space ·
> **Builds toward:** the season finale's "know a thing by its measurements" montage (↪ S2E33), Fourier is duality (↪ S3E04), Lie groups and flows (↪ S3E11), the Entropy and information side quest, the Symplectic geometry side quest (Liouville's theorem)

## Learning objectives
By the end of this lesson the viewer can:
1. Define a measure-preserving system and verify the property for circle rotations, the doubling map, the cat map and the Bernoulli shift.
2. State and prove the Poincaré recurrence theorem.
3. Define the Koopman operator $U_T f = f \circ T$, prove that it is an isometry of $L^2$ (and unitary exactly when $T$ is invertible), and explain why the doubling map gives an isometry that is not unitary.
4. Translate dynamical properties into spectral ones: ergodic ⟺ the eigenvalue 1 is simple; irrational rotations have pure point spectrum; mixing systems have no non-constant eigenfunctions.
5. Prove von Neumann's mean ergodic theorem as a statement about orthogonal projection, state Birkhoff's pointwise theorem, and derive Weyl's equidistribution theorem for $n\alpha \bmod 1$.

## Cold open
*Narration draft.*

Pour a spoonful of cream into black coffee and give it one slow stir. The swirl that forms is chaotic: two drops of cream that start a hair's breadth apart end up on opposite sides of the cup. Predicting where any single drop goes is hopeless.

But stirring has one property you can count on. It doesn't create or destroy coffee. Every region of the cup is squeezed and stretched, but its volume is the same afterwards as before. From that single fact, mathematicians have extracted two astonishing predictions. The first, from Henri Poincaré in 1890: if you keep stirring the same way, almost every drop of cream will eventually come back arbitrarily close to where it started. The second: under the right conditions, the cream spreads out perfectly evenly, so that the fraction of time a drop spends in any region equals that region's share of the cup.

How can we prove anything about a system we can't predict? The trick, found by Bernard Koopman in 1931, is one of the most beautiful moves in mathematics. Stop following the drops. Follow *measurements* of the drops instead: functions on the cup. The stirring is nonlinear and chaotic; its action on functions is perfectly linear and preserves length. Chaos becomes a question about the spectrum of an operator on a Hilbert space, and everything from this season comes together to answer it.

## The story

### 1. The naive attempt: follow the orbits

A dynamical system is a map $T : X \to X$ applied over and over: $x, Tx, T^2x, \dots$ (the **orbit** of $x$). The naive plan is to compute orbits.

Try the **doubling map** $T(x) = 2x \bmod 1$ on $[0, 1)$. In binary, $T$ simply deletes the first digit after the point: $0.b_1b_2b_3\ldots \mapsto 0.b_2b_3b_4\ldots$ So two starting points that agree in their first 50 binary digits, differing by less than $10^{-15}$, have orbits that are completely unrelated after about 50 steps. Any rounding error in a computer doubles every step. This **sensitive dependence on initial conditions** makes individual orbits unpredictable in practice, even though $T$ is completely deterministic.

### 2. The crisis: ask statistical questions, and keep track of volume

If single orbits are hopeless, ask questions about *most* orbits and *long-run averages*: how often does an orbit visit a region? Does it come back? For that we need a notion of "most" and of "how big a region is." That's a measure (↩ S2E22).

> **Definition.** A **measure-preserving system** $(X, \Sigma, \mu, T)$ is a probability space $(X, \Sigma, \mu)$ with a measurable map $T : X \to X$ such that
> $$\mu(T^{-1}A) = \mu(A) \quad \text{for every } A \in \Sigma .$$
> It is **invertible** if $T$ is a bijection whose inverse is also measurable (then $T^{-1}$ preserves $\mu$ too).

Here $T^{-1}A = \{x : Tx \in A\}$ is "the points that land in $A$ one step from now": the probability of being in $A$ tomorrow equals that of being in $A$ today. Equivalently, $\int f\circ T\,d\mu = \int f\,d\mu$ for every $f \in L^1(\mu)$ (true for indicators $f = \mathbf 1_A$ since $\mathbf 1_A \circ T = \mathbf 1_{T^{-1}A}$, then for simple functions by linearity, then for all integrable $f$ by monotone convergence).

**Examples** (Lebesgue measure on the circle $\mathbb T = [0,1)$ or torus $\mathbb T^2$ unless stated):
- **Rotation** $R_\alpha(x) = x + \alpha \bmod 1$: preimages are translates, which have the same length. Invertible.
- **Doubling map** $T(x) = 2x \bmod 1$: $T^{-1}[a, b) = [\tfrac a2, \tfrac b2) \cup [\tfrac{a+1}2, \tfrac{b+1}2)$, total length $\tfrac{b-a}{2} + \tfrac{b-a}{2} = b - a$. Since intervals generate the Borel sets, $T$ preserves Lebesgue measure. It is **2-to-1, not invertible**. (Note that $T$ does *not* preserve the measure of forward images: $T[0, \tfrac12) = [0, 1)$ doubles length.)
- **Arnold's cat map** $T(x, y) = (2x + y,\ x + y) \bmod 1$ on $\mathbb T^2$, i.e. the matrix $A = \begin{pmatrix}2&1\\1&1\end{pmatrix}$ acting mod 1. Since $\det A = 1$ and $A^{-1} = \begin{pmatrix}1&-1\\-1&2\end{pmatrix}$ has integer entries, $T$ is a bijection of the torus, and linear maps of determinant $\pm1$ preserve area (↩ S2E11). Invertible. Its eigenvalues $\frac{3\pm\sqrt5}{2} \approx 2.618, 0.382$ stretch one direction and squeeze another: chaos with volume preserved.
- **Hamiltonian flows.** For a mechanical system with Hamiltonian $H(q, p)$, the flow $\phi_t$ of Hamilton's equations $\dot q = \partial H/\partial p$, $\dot p = -\partial H/\partial q$ preserves phase-space volume (**Liouville's theorem**): the velocity field has divergence $\frac{\partial^2 H}{\partial q\,\partial p} - \frac{\partial^2 H}{\partial p\,\partial q} = 0$. Restricted to an energy surface (with the induced measure) it is an invertible measure-preserving system.
- **Bernoulli shift.** $X = \{0,1\}^{\mathbb N}$ (infinite sequences of coin flips), $\mu$ = fair-coin product measure, $\sigma(x_1, x_2, \dots) = (x_2, x_3, \dots)$. The preimage of the cylinder set "$x_1 = a_1, \dots, x_k = a_k$" is "$x_2 = a_1, \dots, x_{k+1} = a_k$", which has the same probability $2^{-k}$. Not invertible. (The doubling map is this shift in disguise, via binary digits.) The two-sided shift on $\{0,1\}^{\mathbb Z}$ is invertible.

### 3. Recurrence: the cream comes back

> **Theorem (Poincaré recurrence, 1890).** Let $(X, \mu, T)$ be measure-preserving and $A$ measurable. Then almost every point of $A$ returns to $A$; in fact almost every point of $A$ returns to $A$ infinitely often.

**Proof.** Let $B = \{x \in A : T^n x \notin A \text{ for all } n \ge 1\} = A \setminus \bigcup_{n\ge1}T^{-n}A$, the points of $A$ that never return. $B$ is measurable. We claim the sets $B, T^{-1}B, T^{-2}B, \dots$ are pairwise disjoint. Suppose $x \in T^{-m}B \cap T^{-n}B$ with $m < n$. Then $y = T^m x \in B$ and $T^{n-m}y = T^n x \in B \subseteq A$, so $y$ returns to $A$ after $n - m \ge 1$ steps, contradicting $y \in B$. Since $T$ preserves $\mu$, all these sets have measure $\mu(B)$, and they are disjoint subsets of $X$, so
$$\sum_{n=0}^{\infty}\mu(B) = \mu\Big(\bigcup_{n\ge0}T^{-n}B\Big) \le \mu(X) = 1 .$$
An infinite sum of equal terms is finite only if the terms are 0, so $\mu(B) = 0$. For "infinitely often," apply the same result to $T^k$ (also measure-preserving) for every $k$: almost every point of $A$ returns at some time $\ge k$, for every $k$. $\blacksquare$

Applying this to balls of radius $1/m$ around a countable dense set shows that, on the torus, almost every point returns **arbitrarily close** to itself. Only finite measure and its preservation were used.

### 4. Ergodicity: time averages equal space averages

Recurrence says the cream comes back. Does it spread out? A rotation by $\alpha = \frac14$ never spreads anything: every orbit is 4 points.

> **Definition.** $(X, \mu, T)$ is **ergodic** if every measurable set $A$ with $T^{-1}A = A$ has $\mu(A) = 0$ or $\mu(A) = 1$.

An invariant set that is neither null nor full would split the system into two parts that never interact. Ergodic means "indecomposable."

> **Theorem (Birkhoff's pointwise ergodic theorem, 1931).** If $(X, \mu, T)$ is measure-preserving and $f \in L^1(\mu)$, then the time averages $\frac1N\sum_{n=0}^{N-1}f(T^n x)$ converge for almost every $x$. If $T$ is ergodic, the limit is the space average $\int_X f\,d\mu$ almost everywhere.

Taking $f = \mathbf 1_A$: for almost every starting point, the fraction of time spent in $A$ tends to $\mu(A)$. This is Boltzmann's **ergodic hypothesis** turned into a theorem, conditional on ergodicity, which in turn is hard to verify for realistic physical systems.

A stronger property is mixing: the cream spreads out and *stays* spread, in the sense that the cream's location after a long time becomes independent of where it started.

> **Definition.** $T$ is **mixing** if $\mu(T^{-n}A \cap B) \to \mu(A)\mu(B)$ as $n \to \infty$, for all measurable $A, B$.

Mixing implies ergodic (take $A = B$ invariant: $\mu(A) = \mu(A)^2$). Irrational rotations are ergodic but not mixing; the doubling map, the Bernoulli shift and the cat map are mixing.

### 5. The linear-algebra twist: Koopman's operator

Here's the key move. A nonlinear map $T$ on points induces a map on *functions*:

> **Definition (Koopman, 1931).** The **Koopman operator** of $T$ is $U_T f = f \circ T$, acting on functions $f : X \to \mathbb C$.

$U_T$ is **linear**, no matter how wild $T$ is: $(af + bg)\circ T = a(f\circ T) + b(g \circ T)$. If $f$ is a measurement ("the temperature at this point"), then $U_T f$ is "the same measurement, taken one step later." Studying a space through the functions on it is the theme of this whole season (↩ S2E06, ↩ S2E07).

> **Theorem.** Let $(X, \mu, T)$ be measure-preserving. Then $U_T$ is a linear **isometry** of $L^2(\mu)$: $\langle U_T f, U_T g\rangle = \langle f, g\rangle$. If $T$ is invertible, then $U_T$ is **unitary**, with $U_T^{-1} = U_{T^{-1}} = U_T^*$.

**Proof.** First, $U_T$ is well defined on equivalence classes: if $f = g$ except on a null set $N$, then $f\circ T = g \circ T$ except on $T^{-1}N$, which is null because $\mu(T^{-1}N) = \mu(N) = 0$. Next, apply $\int h\circ T\,d\mu = \int h\,d\mu$ to the integrable function $h = f\bar g$:
$$\langle U_T f, U_T g\rangle = \int (f\circ T)\,\overline{(g\circ T)}\,d\mu = \int (f\bar g)\circ T\,d\mu = \int f\bar g\,d\mu = \langle f, g\rangle .$$
So $U_T$ preserves inner products, and in particular $\|U_T f\| = \|f\|$. If $T$ is invertible with measurable, measure-preserving inverse, then $U_{T^{-1}}$ is also an isometry and $U_{T^{-1}}U_T f = f\circ T\circ T^{-1} = f$, $U_TU_{T^{-1}}f = f$. So $U_T$ is a surjective isometry, i.e. unitary (↩ S2E15), and $U_T^* = U_T^{-1}$. $\blacksquare$

**Isometry is not the same as unitary.** An isometry on an infinite-dimensional space can fail to be onto: the right shift of S2E31 is the standard example. The doubling map gives exactly this. Its Koopman operator sends $e_k(x) = e^{2\pi i k x}$ to $e_k(2x) = e_{2k}$, so it **relabels** the Fourier basis by $k \mapsto 2k$. Its range is the closed span of the even frequencies, and every odd frequency (e.g. $e_1$) is orthogonal to the range (Worked Example 1). So $U_T$ is an isometry but **not unitary**. In general, $U_T$ is unitary iff $T$ is invertible modulo null sets.

**Dictionary: dynamics ↔ spectrum.** Since $U_T 1 = 1$, the constant function is always an eigenvector with eigenvalue 1. Eigenvalues of an isometry have modulus 1, since $\|U_T f\| = \|f\|$.

> **Theorem.** $T$ is ergodic ⟺ the eigenvalue 1 of $U_T$ is simple, i.e. the only $f \in L^2$ with $f \circ T = f$ a.e. are the constants.

**Proof.** ($\Leftarrow$) If $T^{-1}A = A$ then $U_T\mathbf 1_A = \mathbf 1_{T^{-1}A} = \mathbf 1_A$, so $\mathbf 1_A$ is constant a.e., i.e. $\mu(A) \in \{0, 1\}$.
($\Rightarrow$) Let $f \circ T = f$ a.e.; treating real and imaginary parts separately we may assume $f$ is real. For each rational $c$, the set $A_c = \{f > c\}$ satisfies $T^{-1}A_c = \{f\circ T > c\}$, which equals $A_c$ up to a null set. A standard argument replaces $A_c$ by a strictly invariant set $A_c' = \bigcap_{N\ge0}\bigcup_{n\ge N}T^{-n}A_c$ differing from it by a null set. By ergodicity each $A_c$ is null or co-null. Then $f$ equals a.e. the constant $\sup\{c \in \mathbb Q : \mu(A_c) = 1\}$. $\blacksquare$

**Rotations have pure point spectrum.** For $R_\alpha$, $U e_k(x) = e^{2\pi i k(x + \alpha)} = e^{2\pi i k\alpha}e_k(x)$. Every Fourier mode is an eigenvector, and they form an orthonormal basis (↩ S2E29): $U$ is diagonal, with eigenvalues $\{e^{2\pi i k\alpha} : k \in \mathbb Z\}$. The eigenvalue 1 occurs for $e_k$ exactly when $k\alpha \in \mathbb Z$. If $\alpha$ is irrational, that happens only for $k = 0$: **irrational rotations are ergodic**. If $\alpha = p/q$ in lowest terms, $e_q$ is a non-constant invariant function: not ergodic.

**Mixing kills eigenfunctions.** In terms of $U$, mixing says $\langle U^n f, g\rangle \to \langle f, 1\rangle\langle 1, g\rangle$ for all $f, g \in L^2$ (extend from indicators by linearity and density). Suppose $U f = \lambda f$ with $f \perp 1$, $f \neq 0$. Then $|\langle U^n f, f\rangle| = |\lambda|^n\|f\|^2 = \|f\|^2 \not\to 0$, contradicting mixing. So a mixing system has **no eigenfunctions other than the constants**: on the mean-zero functions its spectrum is purely continuous. (Precisely, the absence of non-constant eigenfunctions characterizes the intermediate property called **weak mixing**.) An irrational rotation is not mixing: $\langle U^n e_1, e_1\rangle = e^{2\pi i n\alpha}$ has modulus 1 forever.

The "chaos" of the cat map or the doubling map shows up as continuous spectrum; the orderly "quasi-periodicity" of a rotation shows up as pure point spectrum. That's S2E31's distinction between eigenvalues and the rest of the spectrum, now with a physical meaning.

### 6. The mean ergodic theorem is a theorem about projections

> **Theorem (von Neumann's mean ergodic theorem, 1932).** Let $U$ be an isometry on a Hilbert space $H$, let $I = \{f : Uf = f\}$ be its invariant subspace, and let $P$ be the orthogonal projection onto $I$. Then for every $f \in H$,
> $$A_N f := \frac1N\sum_{n=0}^{N-1}U^n f \longrightarrow Pf \quad \text{in norm.}$$

**Proof.** *Step 1: $\ker(U - I) = \ker(U^* - I)$.* If $U^*f = f$, then $\|Uf - f\|^2 = \|Uf\|^2 - 2\,\mathrm{Re}\langle Uf, f\rangle + \|f\|^2 = 2\|f\|^2 - 2\,\mathrm{Re}\langle f, U^*f\rangle = 0$. Conversely, if $Uf = f$, then using $\|U^*\| \le 1$ and $\langle U^* f, f \rangle = \langle f, Uf\rangle = \|f\|^2$:
$$\|U^*f - f\|^2 = \|U^*f\|^2 - 2\,\mathrm{Re}\langle U^*f, f\rangle + \|f\|^2 \le \|f\|^2 - 2\|f\|^2 + \|f\|^2 = 0 .$$
*Step 2: orthogonal decomposition.* Let $W = \{Ug - g : g \in H\}$, the range of $U - I$. For any operator, $(\mathrm{range}\,B)^\perp = \ker B^*$, so $W^\perp = \ker(U^* - I) = I$ by Step 1. By the projection theorem (↩ S2E28), $H = I \oplus \overline W$.
*Step 3: averages on each piece.* If $f \in I$, then $A_N f = f = Pf$. If $f = Ug - g \in W$, the sum telescopes: $A_N f = \frac1N(U^N g - g)$, so $\|A_N f\| \le \frac{2\|g\|}N \to 0 = Pf$.
*Step 4: closure.* Each $A_N$ has norm $\le 1$. If $f \in \overline W$ and $\varepsilon > 0$, pick $w \in W$ with $\|f - w\| < \varepsilon$; then $\|A_N f\| \le \|A_N(f - w)\| + \|A_N w\| < \varepsilon + \|A_N w\|$, which is $< 2\varepsilon$ for large $N$. By linearity, $A_N f \to Pf$ for every $f \in H$. $\blacksquare$

For a measure-preserving system, $H = L^2(\mu)$ and $U = U_T$: the time averages of any observable converge in $L^2$ to its projection onto the invariant functions. If $T$ is ergodic, $I$ is the constants and $Pf = \langle f, 1\rangle = \int f\,d\mu$: **time average = space average** (in the mean). This is S2E17's projection, infinitely many steps in, and it was proved in a few lines using nothing but Hilbert space geometry. Birkhoff's pointwise theorem, proved weeks later, strengthens $L^2$ convergence to almost-everywhere convergence.

### 7. Payoff: Weyl equidistribution, and where this goes

> **Theorem (Weyl, 1916).** If $\alpha$ is irrational, then for **every** interval $[a, b) \subseteq [0, 1)$,
> $$\frac{\#\{0 \le n < N : \{n\alpha\} \in [a, b)\}}{N} \longrightarrow b - a,$$
> where $\{t\}$ denotes the fractional part.

*Proof sketch.* Take $f = e_k$, $k \neq 0$. With $z = e^{2\pi i k\alpha} \neq 1$ (since $\alpha$ is irrational), the geometric series gives
$$\left|\frac1N\sum_{n=0}^{N-1}e^{2\pi i k n\alpha}\right| = \frac1N\left|\frac{1 - z^N}{1 - z}\right| \le \frac{2}{N|1 - z|} = \frac{1}{N|\sin(\pi k\alpha)|} \to 0 = \int_0^1 e_k .$$
For $k = 0$ the average is $1 = \int_0^1 1$. So time averages equal space averages for every trigonometric polynomial, and at **every** starting point (here 0). Trigonometric polynomials are uniformly dense in continuous periodic functions (Fejér, ↩ S2E29), so the same holds for every continuous $f$. Finally, sandwich $\mathbf 1_{[a,b)}$ between continuous functions whose integrals differ by less than $\varepsilon$. $\blacksquare$

(This holds at *every* starting point because the rotation is *uniquely ergodic*: Lebesgue measure is its only invariant probability measure.)

**Applications.**
- **Statistical mechanics.** Replacing long-time averages of a gas by averages over the energy surface ("microcanonical ensemble") is justified exactly when the flow is ergodic, by Birkhoff's theorem.
- **Monte Carlo and Markov chains.** Markov chain Monte Carlo estimates $\int f\,d\pi$ by a time average along a chain whose stationary distribution is $\pi$. Its correctness is an ergodic theorem for the chain's (Markov) transition operator, and the rate of convergence ("mixing time") is governed by its spectral gap.
- **Arithmetic progressions.** Furstenberg (1977) gave an ergodic-theoretic proof of Szemerédi's theorem (dense sets of integers contain arbitrarily long arithmetic progressions) via multiple recurrence, a far-reaching extension of Poincaré's theorem. Green and Tao's 2008 proof that the primes contain arbitrarily long arithmetic progressions uses ideas from this ergodic approach.

**Answer to the cold open.** Will the cream come back? Almost every drop returns arbitrarily close to its start (Poincaré), though the waiting time can be astronomically long. Will it spread evenly? If the stirring is ergodic, every drop's long-run time spent in a region equals the region's volume fraction (Birkhoff); if it's mixing, the cream's distribution actually converges to uniform. And all of this is a statement about one linear operator: an isometry of $L^2$, which is unitary when the stirring is reversible.

**Zoom out (thread 6, duality; thread 5, symmetry).** Koopman's move is "measure it with functionals" applied to dynamics: replace a space by the functions on it, and a nonlinear map by the linear operator it induces on those functions. The invariant functions are the "symmetries that stay fixed," and the projection onto them is the long-time average.

## Worked examples

### Example 1: The doubling map: measure-preserving, mixing, and an isometry that isn't unitary

**Measure preservation, concretely.** $T^{-1}[0.2, 0.5) = [0.1, 0.25) \cup [0.6, 0.75)$, of total length $0.15 + 0.15 = 0.3 = 0.5 - 0.2$. ✓

**Action on the Fourier basis.** $U_T e_k(x) = e^{2\pi i k (2x \bmod 1)} = e^{2\pi i (2k)x} = e_{2k}(x)$ (reducing mod 1 doesn't change $e^{2\pi i\,\cdot}$). So for $f = \sum_k c_k e_k$,
$$U_T f = \sum_k c_k e_{2k}, \qquad \|U_T f\|^2 = \sum_k |c_k|^2 = \|f\|^2 .$$
This confirms the isometry directly by Parseval: $U_T$ just moves the coefficient $c_k$ to position $2k$, never colliding two coefficients because $k \mapsto 2k$ is injective.

**Not unitary.** The range of $U_T$ is $\overline{\mathrm{span}}\{e_{2k}\}$: the functions with period $\frac12$. Every odd frequency is orthogonal to it; e.g. for any $f$, $\langle U_T f, e_1\rangle = \sum_k c_k\langle e_{2k}, e_1\rangle = 0$, since $2k \neq 1$. So $e_1$ is not in the (closed) range, and $U_T$ is not surjective. On mean-zero functions $U_T$ splits into infinitely many copies of the unilateral shift of S2E31, one along each chain $m \to 2m \to 4m \to \cdots$ with $m$ odd. Its adjoint is the "transfer operator" $U_T^*f(x) = \frac12\big(f(\tfrac x2) + f(\tfrac{x+1}2)\big)$, which averages over the two preimages.

**Mixing.** For $k \neq 0$, $\langle U_T^n e_k, e_l\rangle = \langle e_{2^n k}, e_l\rangle = 0$ as soon as $|2^n k| > |l|$. So $\langle U_T^n f, g\rangle \to \langle f, 1\rangle\langle 1, g\rangle$ for trigonometric polynomials, hence for all $f, g \in L^2$ by density and the uniform bound $\|U_T^n\| = 1$. The doubling map is mixing, so its only eigenfunctions are constants: $U_T e_k = e_{2k}$ is never a multiple of $e_k$ for $k \neq 0$, as expected.

### Example 2: Rotations: ergodic or not, and equidistribution of $n\sqrt2$

**Rational rotation, $\alpha = \frac12$.** $U e_k = e^{\pi i k}e_k = (-1)^k e_k$. The invariant subspace $I$ is spanned by the even modes, i.e. the functions with $f(x + \tfrac12) = f(x)$, so the system is **not ergodic** (e.g. $A = [0, \tfrac14) \cup [\tfrac12, \tfrac34)$ is invariant with measure $\tfrac12$). The mean ergodic theorem predicts $A_N f \to Pf$ where $P$ kills odd modes: $Pf(x) = \frac{f(x) + f(x + \frac12)}{2}$. Check directly: $U^n f(x) = f(x + \tfrac n2)$ alternates between $f(x)$ and $f(x + \tfrac12)$, so $A_N f \to \frac{f(x) + f(x+\frac12)}2$. ✓

**Irrational rotation, $\alpha = \sqrt2$.** The fractional parts $\{n\sqrt2\}$ for $n = 1, \dots, 10$ are
$$0.4142,\ 0.8284,\ 0.2426,\ 0.6569,\ 0.0711,\ 0.4853,\ 0.8995,\ 0.3137,\ 0.7279,\ 0.1421 .$$
Six of these ten lie in $[0, \tfrac12)$. Computing with python3 for larger $N$ ($n = 1, \dots, N$):

| $N$ | 10 | 100 | 1,000 | 10,000 | 100,000 |
|---|---|---|---|---|---|
| fraction in $[0, \tfrac12)$ | 0.6 | 0.51 | 0.501 | 0.5002 | 0.50001 |

The Weyl sum for $k = 1$ obeys $\left|\frac1N\sum_{n=1}^N e^{2\pi i n\sqrt2}\right| \le \frac{1}{N|\sin(\pi\sqrt2)|} \approx \frac{1.0374}{N}$; numerically the left side is $0.0448$, $0.0101$, $0.00064$ for $N = 10, 100, 1000$, all below the bounds $0.104$, $0.0104$, $0.00104$. ✓

### Example 3: The cat map on a $5 \times 5$ grid: the cat comes back

Restrict the cat map to the grid of points $(\frac i N, \frac j N)$; it permutes them via $(i, j) \mapsto (2i + j,\ i + j) \bmod N$. A permutation of a finite set always returns to the identity: this is recurrence in its purest form.

**Computing the period for $N = 5$.** Powers of $A = \begin{pmatrix}2&1\\1&1\end{pmatrix}$ are Fibonacci numbers: $A^k = \begin{pmatrix}F_{2k+1} & F_{2k}\\ F_{2k} & F_{2k-1}\end{pmatrix}$ (true for $k = 1$ since $F_3 = 2, F_2 = 1, F_1 = 1$; induct using $A^{k+1} = A^kA$). With $F_9 = 34$, $F_{10} = 55$, $F_{11} = 89$:
$$A^5 = \begin{pmatrix}89 & 55\\ 55 & 34\end{pmatrix} \equiv \begin{pmatrix}4 & 0\\ 0 & 4\end{pmatrix} = -I \pmod 5 .$$
So after 5 steps every pixel is reflected through the origin, and $A^{10} = (A^5)^2 \equiv I \pmod 5$. Checking $k = 1, \dots, 9$ shows none gives the identity, so the period is exactly 10. The orbit of the pixel $(1, 0)$:
$$(1,0) \to (2,1) \to (0,3) \to (3,3) \to (4,1) \to (4,0) \to (3,4) \to (0,2) \to (2,2) \to (1,4) \to (1,0),$$
with $(4, 0) = -(1, 0)$ at step 5, as predicted.

**Other grid sizes** (computed with python3): the period is 3 for $N = 2$, 4 for $N = 3$, 10 for $N = 5$, 25 for $N = 101$, 15 for $N = 124$, 150 for $N = 100$, and 300 for $N = 150$. Dyson and Falk proved the period never exceeds $3N$. A $124 \times 124$ picture of a cat dissolves into noise and reassembles after just 15 steps.

**Koopman view.** On $\mathbb T^2$, $U_T e_{(m,n)}(x,y) = e^{2\pi i(m(2x+y) + n(x+y))} = e_{(2m+n,\ m+n)} = e_{A^{\mathsf T}(m,n)}$ (here $A^{\mathsf T} = A$). Since $A$ is invertible over $\mathbb Z$, $U_T$ permutes the Fourier basis bijectively: unitary. Every nonzero frequency $(m, n)$ has an infinite orbit under $A$ (its norm grows like $2.618^k$), so as in Example 1, $\langle U^k e_{(m,n)}, e_{(m',n')}\rangle$ is eventually 0: the continuous cat map is **mixing**, and its only eigenfunctions are constants. The finite-grid recurrence is an artifact of discretization; the continuum system recurs only in Poincaré's approximate, almost-every-point sense.

## Visual and animation notes
1. **Cold open:** cream swirling in a cup (fluid sim or stylized), two nearby droplets highlighted in different colours diverging. Caption: "Volume in = volume out."
2. **Doubling map:** the interval stretched and folded back onto itself, binary digits sliding off a ticker tape; then a set $A$ and its preimage $T^{-1}A$ with equal "area" meters, while the forward image $TA$'s meter doubles.
3. **Poincaré proof:** the "never-return" set $B$ and its preimages $T^{-1}B, T^{-2}B, \dots$ stacking as disjoint slabs inside a container of volume 1; the stack overflows unless the slabs are empty.
4. **Key visual (storyline):** the cat map scrambling a $124\times124$ cat picture into noise and, at step 15, the cat reappearing. Side panel: step counter and the matrix $A^k \bmod N$.
5. **Key visual (storyline):** a single orbit $\{n\sqrt2\}$ dropping points on a circle, slowly filling it evenly; a histogram underneath flattens toward uniform (numbers from Example 2's table).
6. **Koopman move:** split screen: left, points moving chaotically under $T$; right, a function's graph transforming linearly, with the Fourier basis as arrows (blue) being permuted. For the doubling map, odd-frequency arrows light up as "never hit" (isometry, not unitary).
7. **Mean ergodic theorem:** S2E17's shadow motif: the running average $A_N f$ dropping onto the invariant subspace $I$; the component in $\overline{(U - I)H}$ shrinks like $1/N$.
8. **Spectrum motif:** unit circle with eigenvalues $e^{2\pi i k\alpha}$ for a rotation lighting up as a dense set of dots (pure point spectrum), versus a uniformly glowing arc for the cat map (continuous spectrum).

## Common misconceptions
- **Misconception:** The Koopman operator of any measure-preserving map is unitary. **Reality:** it is always an isometry; it is unitary iff $T$ is invertible (mod null sets). The doubling map's Koopman operator is a non-surjective isometry.
- **Misconception:** Measure-preserving means $\mu(TA) = \mu(A)$. **Reality:** the definition uses preimages. The doubling map preserves Lebesgue measure but doubles the length of $[0, \tfrac12)$ under forward images.
- **Misconception:** Poincaré recurrence means the system returns exactly to its initial state. **Reality:** almost every point returns arbitrarily *close*, and the return times can be enormous. Exact return happens in finite discretizations (the pixel cat map) because a permutation of a finite set has finite order.
- **Misconception:** Ergodic means "chaotic" or "mixing." **Reality:** an irrational rotation is ergodic yet completely orderly (pure point spectrum, zero entropy). Mixing is strictly stronger.
- **Misconception:** Birkhoff's theorem says time averages equal space averages for every starting point. **Reality:** only for almost every point. (Rotations are special: unique ergodicity gives every point.) For the doubling map, $x = 0$ is a fixed point whose time average of $\mathbf 1_{[1/2, 1)}$ is 0, not $\frac12$.

## Exercises
- **Warm-up (computational).** Compute the period of the cat map on the $N \times N$ grid for $N = 3$ by hand using Fibonacci numbers mod 3. Then show that the tent map $T(x) = 1 - |2x - 1|$ preserves Lebesgue measure on $[0, 1]$.
- **Core (conceptual).** Show that $R_\alpha$ is mixing for no $\alpha$, by exhibiting $f, g$ with $\langle U^n f, g\rangle \not\to \langle f, 1\rangle\langle 1, g\rangle$. Then show that the product $R_\alpha \times R_\beta$ on $\mathbb T^2$ is ergodic iff $1, \alpha, \beta$ are linearly independent over $\mathbb Q$.
- **Stretch (exploration).** Prove the **Kac lemma** numerically and conceptually: for an ergodic invertible $T$ and a set $A$ with $\mu(A) > 0$, the average return time to $A$ (averaged over $A$) is $1/\mu(A)$. Test it on $R_{\sqrt2}$ with $A = [0, 0.1)$ by computer.

<details><summary>Hints and answers</summary>

- **Warm-up.** Fibonacci mod 3: $0, 1, 1, 2, 0, 2, 2, 1, 0, 1, \dots$ $A^4 = \begin{pmatrix}F_9 & F_8\\F_8&F_7\end{pmatrix} = \begin{pmatrix}34&21\\21&13\end{pmatrix} \equiv I \pmod 3$, and $A^2 = \begin{pmatrix}5&3\\3&2\end{pmatrix} \equiv \begin{pmatrix}2&0\\0&2\end{pmatrix} = -I$, so the period is 4. Tent map: $T^{-1}[a,b)$ is two intervals of length $\frac{b-a}2$ each.
- **Core.** Take $f = g = e_1$: $|\langle U^n e_1, e_1\rangle| = 1$ for all $n$, but $\langle e_1, 1\rangle = 0$. For the product, $U e_{(m,n)} = e^{2\pi i(m\alpha + n\beta)}e_{(m,n)}$; eigenvalue 1 is simple iff $m\alpha + n\beta \notin \mathbb Z$ for $(m,n) \ne 0$.
- **Stretch.** Kac's lemma follows from decomposing $X$ (up to a null set) into the "towers" $\{T^j x : x \in A,\ 0 \le j < r_A(x)\}$, where $r_A$ is the first return time; summing over the tower gives $\int_A r_A\,d\mu = 1$. Numerically, the mean gap between visits of $\{n\sqrt2\}$ to $[0, 0.1)$ is 10.

</details>

## Historical note
Poincaré proved the recurrence theorem in his 1890 prize memoir on the three-body problem, where he also glimpsed chaos for the first time. Boltzmann's "ergodic hypothesis" in the kinetic theory of gases asked whether time averages equal phase-space averages, but for decades there was no theorem. In 1931 Bernard Koopman, then at Columbia, observed that Hamiltonian flows act on $L^2$ of phase space by unitary operators, and suggested studying them with the brand-new spectral theory of Hilbert space. John von Neumann used this idea to prove the mean ergodic theorem, and George David Birkhoff, hearing of it, proved the stronger pointwise theorem; Birkhoff's paper appeared in December 1931 and von Neumann's in January 1932, and a 1932 note by Birkhoff and Koopman set out the order of events. Hermann Weyl's equidistribution theorem (1916) predates all of this and was proved with exponential sums. Vladimir Arnold and André Avez popularized the cat map in their 1968 book on ergodic problems of classical mechanics, illustrated with a cat.

## Connections
- **Callbacks:** ↩ S2E06 and ↩ S2E07 (functions as measurements), ↩ S2E11 (determinant as volume scaling), ↩ S2E12 (eigenvectors), ↩ S2E15 (unitary operators), ↩ S2E17 (orthogonal projection), ↩ S2E22 (measure spaces, probability as measure theory), ↩ S2E28 (projection theorem, $H = M \oplus M^\perp$), ↩ S2E29 (Fourier basis, Fejér density), ↩ S2E31 (isometries vs. unitaries, the right shift, point vs. continuous spectrum)
- **Sets up:** ↪ S2E33 (Koopman in the "measurement" montage: study a system through the functions on it), ↪ S3E04 (characters $e^{2\pi i k x}$ as eigenfunctions of every rotation; Pontryagin duality), ↪ S3E11 (flows as one-parameter groups, Stone's theorem)
- **Side quests:** Entropy and information (Kolmogorov–Sinai entropy distinguishes Bernoulli shifts that share the same Koopman spectrum); Symplectic geometry (Liouville's theorem); Fractals and Hausdorff dimension (invariant measures on Cantor-like sets).

## References
- **Primary / historical**
  - B. O. Koopman, "Hamiltonian systems and transformations in Hilbert space," *Proceedings of the National Academy of Sciences USA* 17 (1931).
  - J. von Neumann, "Proof of the quasi-ergodic hypothesis," *Proceedings of the National Academy of Sciences USA* 18 (1932).
  - G. D. Birkhoff, "Proof of the ergodic theorem," *Proceedings of the National Academy of Sciences USA* 17 (1931).
  - H. Poincaré, "Sur le problème des trois corps et les équations de la dynamique," *Acta Mathematica* 13 (1890).
  - H. Weyl, "Über die Gleichverteilung von Zahlen mod. Eins," *Mathematische Annalen* 77 (1916).
  - H. Furstenberg, "Ergodic behavior of diagonal measures and a theorem of Szemerédi on arithmetic progressions," *Journal d'Analyse Mathématique* 31 (1977); B. Green and T. Tao, "The primes contain arbitrarily long arithmetic progressions," *Annals of Mathematics* 167 (2008).
- **Textbooks**
  - M. Einsiedler and T. Ward, *Ergodic Theory with a view towards Number Theory*, Graduate Texts in Mathematics 259, Springer, 2011, Ch. 2 (ergodicity, recurrence, the mean and pointwise ergodic theorems), Ch. 4 (equidistribution).
  - P. Walters, *An Introduction to Ergodic Theory*, Graduate Texts in Mathematics 79, Springer, 1982, Ch. 1 (measure-preserving transformations, ergodicity, mixing) and Ch. 2 (spectral invariants).
  - V. I. Arnold and A. Avez, *Ergodic Problems of Classical Mechanics*, Benjamin, 1968 (the cat map).
  - E. M. Stein and R. Shakarchi, *Fourier Analysis: An Introduction*, 2003, Ch. 4 (Weyl's equidistribution theorem); *Real Analysis*, 2005, Ch. 6 (ergodic theorems).
- **Accessible**
  - F. J. Dyson and H. Falk, "Period of a discrete cat mapping," *American Mathematical Monthly* 99 (1992).
  - K. Petersen, *Ergodic Theory*, Cambridge University Press, 1983.
