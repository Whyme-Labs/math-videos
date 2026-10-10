# S2E33: Season Finale: Distributions: Functionals as Generalized Functions

> **Season / Act:** Season 2, Part B, Act VIII (Hilbert Spaces and Operators), season finale · **Target runtime:** 22–25 min ·
> **Prerequisites:** covectors (↩ S2E06), evaluation functionals (↩ S2E07), continuous duals (↩ S2E24), Hahn–Banach (↩ S2E25), weak convergence (↩ S2E27), Hilbert spaces and Riesz representation (↩ S2E28), Fourier series (↩ S2E29), Green's operators (↩ S2E30), approximate eigenvectors (↩ S2E31); integration by parts, the gradient and the divergence theorem ·
> **Builds toward:** Fourier is duality and tempered distributions (↪ S3E04), differential forms and Stokes (↪ S3E07, ↪ S3E08), de Rham currents and the Hodge theory side quest (↪ S3E09), category theory's "an object is its relationships" (↪ S3E12)

## Learning objectives
By the end of this lesson the viewer can:
1. Explain why the Dirac delta cannot be a function, and define it instead as the linear functional $\delta(\varphi) = \varphi(0)$ on test functions.
2. Define test functions and distributions, embed locally integrable functions as distributions, and recognize $\delta$, $\delta'$ and measures as distributions that are not functions.
3. Differentiate any distribution using $T'(\varphi) = -T(\varphi')$, prove $H' = \delta$, and compute distributional derivatives of $|x|$ and of a periodic sawtooth.
4. Use Green's functions ($LG = \delta$) to solve linear ODEs and recognize the Green's function of S2E30.
5. Set up the weak form of Poisson's equation in the Sobolev space $H^1_0$, prove existence and uniqueness with the Riesz representation theorem (the symmetric case of Lax–Milgram), and explain how the finite element method is an orthogonal projection.

## Cold open
*Narration draft.*

Physicists have a favourite function. It's called the Dirac delta. It is zero everywhere except at one point, and at that point it is so infinitely tall that the area underneath is exactly 1. It models a point charge, an instantaneous hammer blow, a single click in an audio file. Engineers feed it into circuits to find their "impulse response." Quantum physicists use it a hundred times a day.

There's just one problem. It doesn't exist. Any honest function that is zero except at one point has integral zero, not one. Lebesgue's theory from S2E22 is perfectly clear about this: a single point has measure zero, so changing a function there changes nothing.

So for twenty years, from Dirac's book in 1930 to around 1950, the most useful object in mathematical physics was, strictly speaking, nonsense. Then Laurent Schwartz noticed that every time a physicist *uses* the delta, it's inside an integral, multiplying some nice function, and the answer is always just "the value of that function at 0." The delta never has to be evaluated at a point. It only has to be *measured against* other functions.

That's the idea this whole season has been building toward. A covector is a measuring device. Today, we let a measuring device be a function. And it turns out that's exactly what we need to differentiate anything, to solve differential equations with Hilbert space geometry, and to see what this whole season was really about.

## The story

### 1. The naive attempt: the delta as a limit of functions

Try to build $\delta$ as a limit of honest functions. Let
$$\delta_n(x) = n\,\mathbf 1_{[0, 1/n]}(x),$$
a box of width $\frac1n$ and height $n$, with $\int\delta_n = 1$. As $n \to \infty$, $\delta_n(x) \to 0$ for every $x \neq 0$ and $\delta_n(0) = n \to \infty$. The pointwise limit is "$0$ except at one point," whose integral is $0$, not $1$. In $L^1$ the sequence doesn't converge at all ($\|\delta_n - \delta_m\|_1$ stays near 2 for $m \gg n$), and in $L^2$ it blows up: $\|\delta_n\|_2^2 = n$.

Yet something does converge. For any continuous $\varphi$,
$$\int \delta_n(x)\varphi(x)\,dx = n\int_0^{1/n}\varphi(x)\,dx \longrightarrow \varphi(0).$$
The functions don't converge, but their **measurements** do (↩ S2E27: weak convergence, "every probe reads a limit"). The limit is not a function. It is the measurement $\varphi \mapsto \varphi(0)$.

### 2. The crisis: "value at 0" is not a legal measurement on the old spaces

We have met this functional three times.
- **S2E07:** on polynomials, "value at 0" is a perfectly good linear functional. We put it in our back pocket.
- **S2E24:** on $L^1$ (and $C[0,1]$ with the $L^1$ norm) it is not continuous; on $L^1$ it is not even well defined, because functions are only defined up to null sets.
- **S2E28:** on $L^2$, Riesz says every continuous functional is $\langle\cdot, y\rangle$ for some $y \in L^2$. If $\delta$ were continuous there, the representing $y$ would be "the delta function." No such $y$ exists, because $\delta$ is not continuous on $L^2$.

The lesson from S2E24 was that whether a functional is continuous depends on the space and its topology. The fix is to choose the space of *things being measured* so carefully that evaluation, and every derivative of evaluation, becomes continuous. Make the inputs very nice, and the space of measurements becomes very large.

### 3. The construction: test functions and distributions

> **Definition (test functions).** Let $\Omega \subseteq \mathbb R^n$ be open. A **test function** is a $C^\infty$ function $\varphi : \Omega \to \mathbb C$ with compact support in $\Omega$. The space of test functions is $\mathcal D(\Omega) = C_c^\infty(\Omega)$. A sequence $\varphi_k \to \varphi$ in $\mathcal D(\Omega)$ if all supports lie in one fixed compact set $K \subset \Omega$ and every derivative converges uniformly: $\sup|\partial^\alpha\varphi_k - \partial^\alpha\varphi| \to 0$ for each multi-index $\alpha$.

Test functions exist in abundance. The standard bump
$$\psi(x) = \begin{cases} e^{-1/(1 - x^2)}, & |x| < 1,\\ 0, & |x| \ge 1,\end{cases}$$
is $C^\infty$ (every derivative tends to 0 at $\pm1$ faster than any power), and shifting and rescaling it gives smooth bumps anywhere, of any width.

> **Definition (distribution, Schwartz 1945–1950).** A **distribution** on $\Omega$ is a linear functional $T : \mathcal D(\Omega) \to \mathbb C$ that is continuous: $\varphi_k \to \varphi$ in $\mathcal D$ implies $T(\varphi_k) \to T(\varphi)$. Equivalently, for every compact $K \subset \Omega$ there are $C$ and $m$ with
> $$|T(\varphi)| \le C\sum_{|\alpha| \le m}\sup_x|\partial^\alpha\varphi(x)| \quad \text{for all } \varphi \in \mathcal D \text{ supported in } K .$$
> The space of distributions is $\mathcal D'(\Omega)$, the **dual** of $\mathcal D(\Omega)$. We write $\langle T, \varphi\rangle$ or $T(\varphi)$.

**Examples.**
- **Functions are distributions.** Every locally integrable $f$ defines $T_f(\varphi) = \int f\varphi\,dx$. Continuity: $|T_f(\varphi)| \le \left(\int_K|f|\right)\sup|\varphi|$. Two functions give the same distribution iff they agree almost everywhere (du Bois-Reymond's lemma), so $L^1_{\mathrm{loc}}$ sits inside $\mathcal D'$ and we may write $f$ for $T_f$. **This is the "extend to repair a defect" move:** $\mathcal D'$ is to functions as $\mathbb R$ is to $\mathbb Q$ (↩ S1E08).
- **The delta.** $\delta_a(\varphi) = \varphi(a)$, with $|\delta_a(\varphi)| \le \sup|\varphi|$ (take $m = 0$, $C = 1$). The evaluation functional of S2E07, finally legal.
- **Measures.** Any locally finite measure $\mu$ gives $\varphi \mapsto \int\varphi\,d\mu$; $\delta_a$ is the point mass at $a$.
- **Derivatives of the delta.** $\delta'(\varphi) := -\varphi'(0)$ (the sign is explained next), with $m = 1$.
- **Principal value.** $\mathrm{p.v.}\frac1x(\varphi) = \lim_{\varepsilon\to0}\int_{|x|>\varepsilon}\frac{\varphi(x)}{x}\,dx$ is a distribution, though $1/x$ is not locally integrable.

**Convergence of distributions** is pointwise on test functions: $T_k \to T$ in $\mathcal D'$ if $T_k(\varphi) \to T(\varphi)$ for every $\varphi$. That's the weak* convergence of S2E27. The boxes $\delta_n$ converge to $\delta$ in this sense (Worked Example 2).

> **Build or Describe?** Build: $\delta$ as a limit of tall thin boxes, which fails as functions. Describe: $\delta$ is the functional $\varphi \mapsto \varphi(0)$. The description is the rigorous object, and the boxes are just one way to approximate it.

### 4. Differentiate anything

For a $C^1$ function $f$ and a test function $\varphi$, integration by parts gives, with no boundary terms because $\varphi$ vanishes outside a compact set,
$$\int f'\varphi\,dx = -\int f\varphi'\,dx .$$
The right side makes sense for any distribution. So we turn the formula into a definition.

> **Definition (distributional derivative).** For $T \in \mathcal D'(\Omega)$, define $\partial_j T$ by
> $$(\partial_j T)(\varphi) = -T(\partial_j\varphi).$$

This is again a distribution (if $T$ satisfies the bound with order $m$, $\partial_jT$ satisfies it with order $m + 1$). Consequences:
- **Every distribution is infinitely differentiable**, including every $L^1_{\mathrm{loc}}$ function, however rough.
- For $C^1$ functions the new derivative agrees with the old one (that's the integration by parts above).
- **Differentiation is continuous on $\mathcal D'$:** if $T_k \to T$ then $T_k' \to T'$, since $T_k'(\varphi) = -T_k(\varphi') \to -T(\varphi') = T'(\varphi)$. Limits and derivatives commute, which is false for functions (↩ S2E20: $\varepsilon\sin(x/\varepsilon^2) \to 0$ uniformly, but its derivatives explode). In $\mathcal D'$, the derivatives $\frac1\varepsilon\cos(x/\varepsilon^2)$ do converge to 0.

This is the dual map of S2E08 in action: $\frac{d}{dx}$ acts on test functions, and its transpose (with a sign) acts on distributions.

> **Theorem.** Let $H = \mathbf 1_{[0,\infty)}$ be the Heaviside step function. Then $H' = \delta$ in $\mathcal D'(\mathbb R)$.

**Proof.** Let $\varphi \in \mathcal D(\mathbb R)$, with support in $[-R, R]$. By definition,
$$H'(\varphi) = -H(\varphi') = -\int_{-\infty}^{\infty}H(x)\varphi'(x)\,dx = -\int_0^{R}\varphi'(x)\,dx = -\big(\varphi(R) - \varphi(0)\big) = \varphi(0) = \delta(\varphi),$$
using the fundamental theorem of calculus and $\varphi(R) = 0$. Since this holds for every test function, $H' = \delta$. $\blacksquare$

So the step that jumps by 1 at the origin has derivative "an infinite spike of area 1 at the origin," exactly as engineers always said, and now it's a theorem. More generally, a function with a jump of size $J$ at $a$ (and otherwise $C^1$) has distributional derivative "classical derivative $+\ J\,\delta_a$."

### 5. Green's functions: solve once, superpose forever

Let $L$ be a linear differential operator with constant coefficients. A **fundamental solution** is a distribution $G$ with
$$LG = \delta .$$
Then for a source $f$ (say continuous with compact support), $u = G * f$, i.e. $u(x) = \int G(x - y)f(y)\,dy$, solves $Lu = f$. The reason is linearity and translation invariance: $f = \int f(y)\,\delta_y\,dy$ is a superposition of point sources, each point source $\delta_y$ produces the response $G(\cdot - y)$, and responses superpose. With boundary conditions, one uses a Green's function $G(x, y)$ with $L_xG(\cdot, y) = \delta_y$ and the boundary conditions in $x$.

Examples:
- $-\frac{d^2}{dx^2}$ on $\mathbb R$: $G(x) = -\frac{|x|}2$ (Worked Example 1).
- $-\frac{d^2}{dx^2}$ on $(0,1)$ with $u(0) = u(1) = 0$: $G(x, y) = \min(x,y)\big(1 - \max(x,y)\big)$, the kernel of S2E30's compact operator (Worked Example 4).
- $-\Delta$ on $\mathbb R^3$: $G(x) = \frac{1}{4\pi|x|}$, the Coulomb potential of a point charge. The statement $-\Delta\frac{1}{4\pi|x|} = \delta$ in $\mathcal D'(\mathbb R^3)$ is Gauss's law for a point charge, proved by Green's identity on the region $|x| > \varepsilon$ and letting $\varepsilon \to 0$.

### 6. Closing the loop: Sobolev spaces, and the Riesz theorem solves PDEs

Distributional derivatives let us define spaces of functions with "derivatives in $L^2$," even when the functions aren't classically differentiable.

> **Definition (Sobolev spaces).** For a bounded open $\Omega \subseteq \mathbb R^n$,
> $$H^1(\Omega) = \{u \in L^2(\Omega) : \partial_j u \in L^2(\Omega) \text{ for } j = 1, \dots, n\},$$
> where $\partial_j u$ is the distributional derivative, with inner product $\langle u, v\rangle_{H^1} = \int_\Omega\big(u\bar v + \nabla u\cdot\overline{\nabla v}\big)\,dx$. $H^1_0(\Omega)$ is the closure of $C_c^\infty(\Omega)$ in $H^1(\Omega)$: the functions that "vanish on the boundary."

$H^1(\Omega)$ is a Hilbert space. (If $u_k$ is Cauchy in $H^1$, then $u_k \to u$ and $\partial_j u_k \to g_j$ in $L^2$; passing to the limit in $\int u_k\,\partial_j\varphi = -\int\partial_ju_k\,\varphi$ shows $\partial_ju = g_j$.) By S2E28 it's "just ℓ²," but its inner product is the one adapted to differential equations.

**The Poisson problem.** Given $f \in L^2(\Omega)$, find $u$ with $-\Delta u = f$ in $\Omega$ and $u = 0$ on $\partial\Omega$. Multiply by a test function $v$ and integrate by parts (divergence theorem; no boundary term since $v = 0$ on $\partial\Omega$):
$$\int_\Omega\nabla u\cdot\nabla v\,dx = \int_\Omega f v\,dx .$$

> **Weak formulation.** Find $u \in H^1_0(\Omega)$ such that $a(u, v) = \ell(v)$ for all $v \in H^1_0(\Omega)$, where $a(u,v) = \int_\Omega\nabla u\cdot\overline{\nabla v}\,dx$ and $\ell(v) = \int_\Omega f\bar v\,dx$.

The key analytic input:

> **Poincaré inequality.** For bounded $\Omega$ there is $C_\Omega$ with $\|u\|_{L^2} \le C_\Omega\|\nabla u\|_{L^2}$ for all $u \in H^1_0(\Omega)$.

*Proof in one dimension, $\Omega = (0,1)$.* For $u \in C_c^\infty(0,1)$, $u(x) = \int_0^x u'(t)\,dt$, so by Cauchy–Schwarz $|u(x)|^2 \le x\int_0^1|u'|^2$. Integrating over $x \in (0,1)$: $\|u\|^2 \le \frac12\|u'\|^2$. Extend to $H^1_0$ by density. $\blacksquare$

> **Theorem (existence and uniqueness of weak solutions).** For every $f \in L^2(\Omega)$ there is exactly one $u \in H^1_0(\Omega)$ with $a(u,v) = \ell(v)$ for all $v \in H^1_0(\Omega)$.

**Proof.** The form $a$ is an inner product on $H^1_0(\Omega)$: it is sesquilinear and Hermitian, and $a(u,u) = \|\nabla u\|^2 = 0$ forces $u = 0$ by Poincaré. Its norm is equivalent to the $H^1$ norm, since
$$\|\nabla u\|^2 \le \|u\|_{H^1}^2 = \|u\|^2 + \|\nabla u\|^2 \le (C_\Omega^2 + 1)\|\nabla u\|^2 .$$
So $\big(H^1_0(\Omega), a\big)$ is complete, i.e. a **Hilbert space**. The functional $\ell$ is bounded on it: $|\ell(v)| \le \|f\|\,\|v\| \le C_\Omega\|f\|\,\|\nabla v\|$. By the **Riesz representation theorem** (↩ S2E28) there is a unique $u$ with $\ell(v) = a(v, u)$ for all $v$; taking complex conjugates, $a(u, v) = \overline{a(v,u)} = \overline{\ell(v)} = \int\bar f v$. Running the same argument with $\bar f$ in place of $f$ gives $a(u,v) = \ell(v)$ for all $v$. $\blacksquare$

(For real-valued $f$ and real spaces the conjugations disappear and the proof is one line: Riesz.)

> **Theorem (Lax–Milgram, 1954).** Let $V$ be a Hilbert space, $a : V \times V \to \mathbb C$ sesquilinear, **bounded** ($|a(u,v)| \le M\|u\|\|v\|$) and **coercive** ($\mathrm{Re}\,a(u,u) \ge \alpha\|u\|^2$ with $\alpha > 0$), and $\ell \in V^*$. Then there is exactly one $u \in V$ with $a(u, v) = \ell(v)$ for all $v$, and $\|u\| \le \|\ell\|/\alpha$.

Lax–Milgram drops symmetry, so it covers equations such as $-\Delta u + b\cdot\nabla u + cu = f$ with $c$ large enough. *Proof sketch:* by Riesz, $a(u, v) = \langle Au, v\rangle$ for a bounded operator $A$; coercivity gives $\|Au\| \ge \alpha\|u\|$, so $A$ is injective with closed range; if the range were not everything, a nonzero $w$ orthogonal to it would give $\alpha\|w\|^2 \le \mathrm{Re}\,\langle Aw, w\rangle = 0$; so $A$ is bijective, and $u = A^{-1}y$, where $y$ represents $\ell$.

If $f$ and $\partial\Omega$ are smooth, **elliptic regularity** upgrades the weak solution to a classical $C^2$ solution. The road to solving a PDE is now: (1) weaken the equation using test functions, (2) solve the weak problem with Hilbert-space geometry, (3) recover smoothness.

**Finite elements.** Pick a finite-dimensional subspace $V_h \subset H^1_0$ (e.g. continuous piecewise-linear "hat" functions on a mesh) and solve $a(u_h, v) = \ell(v)$ for all $v \in V_h$. Subtracting from the exact equation, $a(u - u_h, v) = 0$ for all $v \in V_h$: **the error is $a$-orthogonal to $V_h$**. So $u_h$ is the orthogonal projection of the unknown exact solution onto $V_h$, in the energy inner product (↩ S2E17, ↩ S2E28), and it is the best approximation from $V_h$ in that norm (Céa's lemma). That is how finite element software designs bridges and aircraft (Worked Example 4).

### 7. Season montage: the arc of measurement

The season has been telling one story about measurement, and the delta is its last chapter.

- **S2E06, covectors:** a linear functional is a measuring device, a stack of level lines that counts how many an arrow crosses. (↩ S2E06)
- **S2E07, functionals everywhere:** "value at 0", "area under the curve", "the 5th Fourier coefficient" are all functionals. The value at 0 goes into the back pocket. (↩ S2E07)
- **S2E10, tensor slots:** multilinear maps measure several vectors at once; vector slots and covector slots. (↩ S2E10)
- **S2E16, Riesz in finite dimensions:** an inner product turns every measurement into an arrow. (↩ S2E16)
- **S2E24, continuous duals:** in infinite dimensions, only continuous measurements count, and "value at 0" fails the test on $L^1$. (↩ S2E24)
- **S2E25, Hahn–Banach:** there are always enough continuous measurements to tell vectors apart. (↩ S2E25)
- **S2E28, Riesz in Hilbert space:** completeness restores "every measurement is an inner product." (↩ S2E28)
- **S2E32, Koopman:** to study a chaotic system, study the functions (measurements) on it and the linear operator they feel. (↩ S2E32)
- **S2E33, distributions:** shrink the inputs to test functions, and the measurements become a space big enough to contain every function, every measure, the delta and all their derivatives.

**A function can be thought of as nothing more than the way it responds to measurements.** That is Season 1's thesis ("a mathematical object is defined by what you can do with it, not by what it is made of," ↩ S1E01) now applied to functions themselves: $f$ is determined by the numbers $\int f\varphi$, and once we accept that, objects that respond to measurements *like* a function, such as $\delta$, earn the right to be called generalized functions.

**Answer to the cold open.** Is the delta a function? No. It's a linear functional on test functions, $\delta(\varphi) = \varphi(0)$. Every physicist's calculation with $\delta$ that only ever integrates it against nice functions is a correct calculation in $\mathcal D'$.

**Zoom out (thread 6, duality, and thread 1, extend to repair a defect).** $L^2$ couldn't contain the delta, so we enlarged it, the way $\mathbb Q$ was enlarged to $\mathbb R$: $\mathcal D \subset L^2 \subset \mathcal D'$, smaller inputs and larger duals.

**Teaser.** Fourier analysis wants to transform $\delta$ (answer: the constant function 1) and the constant function 1 (answer: $2\pi\delta$). That requires the tempered distributions $\mathcal S'$, the dual of the rapidly decreasing functions, where the Fourier transform is an isomorphism. Why is the Fourier transform such a perfect duality? Because it is the duality between a group and its characters (↪ S3E04). And in Season 3 the measuring devices go curved: differential forms are the things you integrate over curves and surfaces, and the duals of forms (de Rham's *currents*) are distributions on manifolds (↪ S3E07, ↪ S3E09).

## Worked examples

### Example 1: Derivatives of $|x|$, the delta's derivative, and a Green's function on the line

**$|x|' = \mathrm{sgn}(x)$.** For $\varphi \in \mathcal D(\mathbb R)$,
$$|x|'(\varphi) = -\int_{-\infty}^\infty|x|\varphi'(x)\,dx = \int_{-\infty}^0 x\varphi'\,dx - \int_0^\infty x\varphi'\,dx .$$
Integrate by parts: $\int_{-\infty}^0 x\varphi'\,dx = [x\varphi]_{-\infty}^0 - \int_{-\infty}^0\varphi = -\int_{-\infty}^0\varphi$, and $\int_0^\infty x\varphi'\,dx = -\int_0^\infty\varphi$. So
$$|x|'(\varphi) = -\int_{-\infty}^0\varphi + \int_0^\infty\varphi = \int\mathrm{sgn}(x)\varphi(x)\,dx .$$
No delta appears, because $|x|$ is continuous (no jump).

**$|x|'' = 2\delta$.** $\mathrm{sgn}(x) = 2H(x) - 1$ almost everywhere, so $\mathrm{sgn}' = 2H' - 0 = 2\delta$. Directly: $\mathrm{sgn}'(\varphi) = -\int_0^\infty\varphi' + \int_{-\infty}^0\varphi' = \varphi(0) + \varphi(0) = 2\varphi(0)$. ✓

**Green's function.** Hence $G(x) = -\frac{|x|}{2}$ satisfies $-G'' = -(-\frac12)\cdot2\delta = \delta$. For a source $f$ with compact support, $u(x) = -\frac12\int|x - y|f(y)\,dy$ solves $-u'' = f$. Check with $f = \mathbf 1_{[-1,1]}$ at $|x| \le 1$: $u(x) = -\frac12\left(\int_{-1}^x(x - y)\,dy + \int_x^1(y - x)\,dy\right) = -\frac12\left(\frac{(x+1)^2}{2} + \frac{(1-x)^2}{2}\right) = -\frac{x^2 + 1}{2}$, and indeed $-u'' = 1 = f$ there. ✓

**The delta's derivative and multiplication.** $\delta'(\varphi) = -\delta(\varphi') = -\varphi'(0)$. Multiplying a distribution by a smooth function $g$ is defined by $(gT)(\varphi) = T(g\varphi)$. Then $(x\delta)(\varphi) = \delta(x\varphi) = 0\cdot\varphi(0) = 0$, so $x\delta = 0$; and $(x\delta')(\varphi) = \delta'(x\varphi) = -(x\varphi)'(0) = -\big(\varphi(0) + 0\cdot\varphi'(0)\big) = -\varphi(0)$, so $x\delta' = -\delta$.

### Example 2: Approximate identities converge to $\delta$

Let $\delta_n = n\mathbf 1_{[0,1/n]}$ and $\varphi \in \mathcal D(\mathbb R)$. By the mean value theorem $|\varphi(x) - \varphi(0)| \le \|\varphi'\|_\infty|x|$, so
$$\left|\int\delta_n\varphi\,dx - \varphi(0)\right| = \left|n\int_0^{1/n}\big(\varphi(x) - \varphi(0)\big)\,dx\right| \le n\int_0^{1/n}\|\varphi'\|_\infty x\,dx = \frac{\|\varphi'\|_\infty}{2n} \to 0 .$$
So $\delta_n \to \delta$ in $\mathcal D'$, with an explicit rate. The same argument works for any family $\rho_\varepsilon(x) = \varepsilon^{-1}\rho(x/\varepsilon)$ with $\rho \ge 0$, $\int\rho = 1$ (e.g. Gaussians $\frac{1}{\sqrt{2\pi}\varepsilon}e^{-x^2/(2\varepsilon^2)}$), and it explains the Fejér kernel of S2E29: the Fejér kernels form an approximate identity on the circle.

Differentiating, $\delta_n' \to \delta'$ in $\mathcal D'$ as well: $\delta_n' = n(\delta_0 - \delta_{1/n})$ (the box has jumps $+n$ at 0 and $-n$ at $\frac1n$), and $n\big(\varphi(0) - \varphi(\tfrac1n)\big) \to -\varphi'(0) = \delta'(\varphi)$. ✓

### Example 3: Differentiating a Fourier series term by term

From S2E29, the $2\pi$-periodic sawtooth $f$ with $f(x) = x$ on $(-\pi, \pi)$ has $f = 2\sum_{n\ge1}\frac{(-1)^{n+1}}{n}\sin nx$ in $L^2$, hence in $\mathcal D'(\mathbb R)$ (convergence in $L^2$ on bounded sets implies convergence against test functions). Differentiation is continuous on $\mathcal D'$, so we may differentiate term by term:
$$f' = 2\sum_{n\ge1}(-1)^{n+1}\cos nx \quad\text{in } \mathcal D' ,$$
even though this series diverges at every point.

**What is $f'$ directly?** $f$ has slope 1 everywhere except at the odd multiples of $\pi$, where it jumps from $\pi$ down to $-\pi$, a jump of $-2\pi$. By the jump rule from Section 4,
$$f' = 1 - 2\pi\sum_{k\in\mathbb Z}\delta_{(2k+1)\pi} .$$
**Consistency check.** The Fourier coefficients of the comb $\sum_k\delta_{(2k+1)\pi}$ (one delta per period, at $x = \pi$) are $\frac{1}{2\pi}e^{-in\pi} = \frac{(-1)^n}{2\pi}$, so $2\pi\sum_k\delta_{(2k+1)\pi} = \sum_{n\in\mathbb Z}(-1)^ne^{inx} = 1 + 2\sum_{n\ge1}(-1)^n\cos nx$. Then
$$1 - 2\pi\sum_k\delta_{(2k+1)\pi} = -2\sum_{n\ge1}(-1)^n\cos nx = 2\sum_{n\ge1}(-1)^{n+1}\cos nx . \ ✓$$
Both computations agree. Rearranging gives the **Dirac comb** identity $\sum_{n\in\mathbb Z}e^{inx} = 2\pi\sum_k\delta_{2\pi k}$ (shift $x$ by $\pi$), the Fourier series of the delta on the circle: all coefficients equal $\frac1{2\pi}$, which is why $\delta$ can't be in $L^2(\mathbb T)$ (Parseval would give infinite energy).

### Example 4: Poisson in one dimension: weak solution, Green's function and finite elements

**Problem.** $-u'' = 1$ on $(0,1)$, $u(0) = u(1) = 0$.

**Weak solution.** We need $u \in H^1_0(0,1)$ with $\int_0^1 u'v'\,dx = \int_0^1 v\,dx$ for all $v \in H^1_0$. Try $u = \frac{x(1-x)}{2}$, so $u' = \frac12 - x$. Then
$$\int_0^1\left(\tfrac12 - x\right)v'\,dx = \Big[\left(\tfrac12 - x\right)v\Big]_0^1 + \int_0^1 v\,dx = 0 + \int_0^1 v\,dx,$$
since $v(0) = v(1) = 0$. ✓ By the uniqueness theorem this is *the* solution.

**Green's function.** For fixed $y$, $G(x, y) = \min(x,y)(1 - \max(x,y))$ is piecewise linear in $x$, with slope $1 - y$ for $x < y$ and slope $-y$ for $x > y$. The slope jumps by $-y - (1 - y) = -1$ at $x = y$, so $\partial_x^2G(\cdot, y) = -\delta_y$, i.e. $-\partial_x^2 G(\cdot,y) = \delta_y$, with $G(0,y) = G(1,y) = 0$. Thus $u(x) = \int_0^1G(x,y)\cdot1\,dy = \frac{x(1-x)}2$ (computed in S2E30). ✓ S2E30's compact operator is the inverse of $-d^2/dx^2$ precisely because its kernel solves the equation with a delta source.

**Finite elements with $h = \frac14$.** Nodes $x_i = \frac i4$, $i = 1,2,3$, with hat functions $\phi_i$ (1 at $x_i$, 0 at other nodes, linear in between). On each element $\phi_i' = \pm\frac1h = \pm4$, so
$$a(\phi_i,\phi_i) = \int(\phi_i')^2 = 2h\cdot\frac{1}{h^2} = \frac2h = 8, \qquad a(\phi_i, \phi_{i\pm1}) = h\cdot\left(\tfrac1h\right)\left(-\tfrac1h\right) = -\frac1h = -4,$$
and $\ell(\phi_i) = \int\phi_i = h = \frac14$. Writing $u_h = \sum U_i\phi_i$, the Galerkin equations $a(u_h,\phi_j) = \ell(\phi_j)$ read
$$\begin{pmatrix}8&-4&0\\-4&8&-4\\0&-4&8\end{pmatrix}\begin{pmatrix}U_1\\U_2\\U_3\end{pmatrix} = \begin{pmatrix}\tfrac14\\\tfrac14\\\tfrac14\end{pmatrix}.$$
By symmetry $U_1 = U_3$. The first equation gives $8U_1 - 4U_2 = \frac14$; the second gives $-8U_1 + 8U_2 = \frac14$. Adding: $4U_2 = \frac12$, so $U_2 = \frac18$, and then $8U_1 = \frac14 + \frac12 = \frac34$, so $U_1 = \frac3{32}$. The exact solution gives $u(\frac14) = \frac{\frac14\cdot\frac34}{2} = \frac{3}{32}$ and $u(\frac12) = \frac18$. The finite element solution is **exact at the nodes** (a special feature of this 1D problem: the nodal error is governed by $G(x_i, \cdot)$, which is itself piecewise linear on the mesh). Verified with numpy: $(0.09375, 0.125, 0.09375)$. Between nodes, $u_h$ is the piecewise-linear interpolant, the $a$-orthogonal projection of $u$ onto $V_h$.

## Visual and animation notes
1. **Cold open:** a tall thin box narrowing and growing, area meter fixed at 1, while a pointwise "value" readout flips to "0 except ∞ at one point," and a Lebesgue integral meter reads 0. Then the box becomes a probe: smooth test functions slide underneath, and the readout shows $\varphi(0)$.
2. **Test functions:** the bump $e^{-1/(1-x^2)}$ drawn with its derivatives stacked below, all fading smoothly to zero at $\pm1$.
3. **Distributions as measurements:** reuse S2E06's **covector** motif (orange level stacks) and S2E27's **weak convergence** motif (fixed probes). A row of test-function probes measures $f$, then $\delta$, then $\delta'$; only the readouts matter.
4. **$H' = \delta$:** the step function; a test function's slope integrated over $[0,\infty)$ shaded, collapsing to the single number $\varphi(0)$.
5. **Green's functions:** a string with a point force pushing it into a "tent" ($G(\cdot,y)$); then many forces of strength $f(y)$ along the string, tents adding up to a smooth curve.
6. **Weak formulation and Riesz:** the Hilbert space $H^1_0$ as a plane; the functional $\ell$ as an orange stack; the representing vector $u$ as the blue arrow perpendicular to it (S2E28's Riesz visual reused verbatim).
7. **Finite elements:** hat functions on a mesh; the exact solution's shadow onto their span (S2E17 projection motif), with nodal values matching.
8. **Season montage (storyline):** a timeline of the measurement arc, each stop showing its icon: S2E06 level lines, S2E07 probes on a polynomial, S2E10 multi-slot machine, S2E16 arrow ↔ level stack, S2E24 unit balls diamond ↔ square, S2E25 separating plane, S2E28 Riesz arrow, S2E32 cat map with functions flowing over it, S2E33 delta probe. Final card: "A function is the way it responds to measurements."
9. **Teaser:** the delta's Fourier transform as a flat line, the circle group with its characters spinning, captioned "↪ S3E04."

## Common misconceptions
- **Misconception:** $\delta(x)$ is a function that is infinite at 0. **Reality:** $\delta$ has no values at points; it is the functional $\varphi \mapsto \varphi(0)$. Expressions like "$\delta(0) = \infty$" have no meaning.
- **Misconception:** Distributions can be multiplied like functions. **Reality:** there is no reasonable associative product on all of $\mathcal D'$ extending the product of continuous functions (Schwartz, 1954); e.g. $\delta^2$ is undefined. You can multiply a distribution by a smooth function.
- **Misconception:** The distributional derivative is a weaker, approximate notion. **Reality:** it agrees with the classical derivative whenever the latter exists and is continuous, and it captures jumps exactly ($H' = \delta$).
- **Misconception:** A weak solution is an approximate solution. **Reality:** it is an exact solution of the integrated equation for every test function; with smooth data, elliptic regularity shows it is a classical solution.
- **Misconception:** Lax–Milgram is needed for $-\Delta u = f$. **Reality:** for this symmetric problem the Riesz representation theorem in $H^1_0$ with the energy inner product suffices; Lax–Milgram is the extension to non-symmetric coercive forms.

## Exercises
- **Warm-up (computational).** Compute in $\mathcal D'(\mathbb R)$: (a) $(x^2 H)''$; (b) $\big(\mathbf 1_{[a,b]}\big)'$; (c) the second derivative of $\max(0, x)$ (the ReLU function).
- **Core (conceptual).** Show that $T(\varphi) = \sum_{n\ge1}\varphi^{(n)}(n)$ is a distribution on $\mathbb R$, but that there is no single $m$ that works for all compact sets $K$ ("infinite order"). Why doesn't that contradict the definition?
- **Stretch (proof).** Prove that if $T \in \mathcal D'(\mathbb R)$ and $T' = 0$, then $T$ is a constant function. (Hint: fix $\theta \in \mathcal D$ with $\int\theta = 1$; every $\varphi$ can be written $\varphi = \left(\int\varphi\right)\theta + \psi'$ with $\psi \in \mathcal D$.) Deduce that if $T' = \delta$ then $T = H + c$.

<details><summary>Hints and answers</summary>

- **Warm-up.** (a) $x^2H$ is $C^1$ with $(x^2H)' = 2xH$, which is continuous, so $(x^2H)'' = 2H$ (no delta). (b) $\delta_a - \delta_b$. (c) $\max(0,x)' = H$, so $\max(0,x)'' = \delta$: a ReLU's "curvature" is concentrated at the kink.
- **Core.** On a compact $K \subseteq [-R, R]$ only the finitely many terms with $n \le R$ are nonzero, so $|T(\varphi)| \le \sum_{k \le R}\sup|\varphi^{(k)}|$: the order $m = \lfloor R\rfloor$ depends on $K$, which the definition allows.
- **Stretch.** Given $\varphi$, the function $\varphi - (\int\varphi)\theta$ has integral 0, so its antiderivative $\psi$ has compact support. Then $T(\varphi) = (\int\varphi)T(\theta) + T(\psi') = (\int\varphi)T(\theta) - T'(\psi) = c\int\varphi$ with $c = T(\theta)$. If $T' = \delta = H'$ then $(T - H)' = 0$.

</details>

## Historical note
Oliver Heaviside used the step function and its "derivative" in his operational calculus for telegraph equations in the 1880s and 1890s, to the horror of mathematicians. Paul Dirac introduced $\delta(x)$ in quantum mechanics (1927, and in *The Principles of Quantum Mechanics*, 1930), explicitly noting it was "not a function according to the usual mathematical definition." Sergei Sobolev, studying hyperbolic equations in 1935–1936, defined generalized derivatives through integration by parts and introduced the spaces now named after him. Laurent Schwartz unified everything into the theory of distributions (first announced in 1945, then the two-volume *Théorie des distributions*, 1950–1951), for which he received the Fields Medal in 1950. Peter Lax and Arthur Milgram published their lemma in 1954, and the finite element method, anticipated by Richard Courant in 1943, became the engineering workhorse of the 1960s once computers could solve the large linear systems it produces.

## Connections
- **Callbacks:** ↩ S1E01 (an object is what you can do with it), ↩ S1E08 (enlarge a space to repair a defect), ↩ S2E06 (covectors as measurements), ↩ S2E07 (evaluation functional, the delta's seed), ↩ S2E08 (dual maps and transposes), ↩ S2E10 (tensor slots), ↩ S2E16 (finite-dimensional Riesz), ↩ S2E17 (projection and least squares), ↩ S2E20 (derivatives of small functions can be huge), ↩ S2E22 (measure zero sets), ↩ S2E24 (continuous duals), ↩ S2E25 (Hahn–Banach), ↩ S2E27 (weak* convergence), ↩ S2E28 (Riesz representation, projection), ↩ S2E29 (Fourier series, Fejér kernel), ↩ S2E30 (Green's operator), ↩ S2E31 (approximate eigenvectors as would-be deltas), ↩ S2E32 (Koopman: measure a system by functions)
- **Sets up:** ↪ S3E04 (tempered distributions and the Fourier transform; Pontryagin duality), ↪ S3E07 and ↪ S3E08 (differential forms and Stokes' theorem, integration by parts in its final form), ↪ S3E09 (de Rham cohomology; currents as distributional forms), ↪ S3E12 (Yoneda: an object is determined by its relationships, the categorical version of this episode's thesis)
- **Side quests:** Hodge theory (Hilbert spaces of forms, Sobolev estimates); Kernel methods and RKHS (spaces where evaluation is continuous); Convex duality and optimization (variational problems and weak solutions).

## References
- **Primary / historical**
  - L. Schwartz, *Théorie des distributions*, 2 vols., Hermann, Paris, 1950–1951.
  - P. A. M. Dirac, *The Principles of Quantum Mechanics*, Oxford, 1930 (the $\delta$ function).
  - S. L. Sobolev, "Méthode nouvelle à résoudre le problème de Cauchy pour les équations linéaires hyperboliques normales," *Matematicheskii Sbornik* 1(43) (1936).
  - P. D. Lax and A. N. Milgram, "Parabolic equations," in *Contributions to the Theory of Partial Differential Equations*, Annals of Mathematics Studies 33, Princeton University Press, 1954.
  - R. Courant, "Variational methods for the solution of problems of equilibrium and vibrations," *Bulletin of the AMS* 49 (1943).
  - L. Schwartz, "Sur l'impossibilité de la multiplication des distributions," *Comptes Rendus de l'Académie des Sciences* 239 (1954).
- **Textbooks**
  - R. S. Strichartz, *A Guide to Distribution Theory and Fourier Transforms*, CRC Press, 1994 (reprinted World Scientific, 2003), Chs. 1–2 (distributions, derivatives, Green's functions).
  - L. C. Evans, *Partial Differential Equations*, 2nd ed., AMS Graduate Studies in Mathematics 19, 2010, Ch. 5 (Sobolev spaces) and §6.2 (existence of weak solutions; the Lax–Milgram theorem).
  - H. Brezis, *Functional Analysis, Sobolev Spaces and Partial Differential Equations*, Springer, 2011, Ch. 5 (Lax–Milgram), Chs. 8–9 (Sobolev spaces and weak formulations).
  - F. G. Friedlander and M. Joshi, *Introduction to the Theory of Distributions*, 2nd ed., Cambridge University Press, 1998.
  - L. Hörmander, *The Analysis of Linear Partial Differential Operators I*, Springer, 1983 (2nd ed. 1990), Chs. 2–3.
- **Accessible**
  - E. M. Stein and R. Shakarchi, *Functional Analysis: Introduction to Further Topics in Analysis* (Princeton Lectures in Analysis IV), 2011, Ch. 3 (distributions: generalized functions).
  - M. J. Lighthill, *An Introduction to Fourier Analysis and Generalised Functions*, Cambridge University Press, 1958.
