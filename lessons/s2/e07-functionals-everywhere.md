# S2E07: Functionals Everywhere

> **Season / Act:** Season 2, Part A, Act II: Linear Functionals and Duality · **Target runtime:** 20–25 min ·
> **Prerequisites:** S2E02 (bases, coordinates), S2E03 (rank–nullity), S2E04 (change of basis), S2E06 (dual space, dual basis, kernels of functionals); basic integrals and derivatives of polynomials ·
> **Builds toward:** S2E08 (transpose, double dual), S2E24 (continuity of evaluation depends on the norm), S2E29 (Fourier coefficients), S2E33 (the Dirac delta as $\delta_0$), side quests on RKHS and convex duality

## Learning objectives
By the end of this lesson the viewer can:
1. Recognize evaluation, differentiation-at-a-point, integration, Taylor coefficients, and Fourier coefficients as linear functionals on function spaces.
2. Prove that evaluations at $n$ distinct points form a basis of $\mathcal{P}_{n-1}^*$, identify the Lagrange polynomials as the basis of $\mathcal{P}_{n-1}$ to which they are dual, and interpolate data with them.
3. Rewrite any functional (a derivative, an integral) as a combination of evaluations, deriving finite-difference formulas and Simpson's rule, and explain why Simpson's rule is exact for cubics.
4. Explain why Gaussian quadrature with $n$ nodes is exact up to degree $2n - 1$, and prove that no $n$-node rule can do better.
5. Describe solution sets of linear constraints as intersections of kernels and compute their dimension.

## Cold open
"Here's a function: a smooth curve on the interval from 0 to 1. I'll ask you four questions about it. What's its value at 0? What's the area under it? What's its slope at 1? How much of the frequency-5 wave is in it?

"Four very different questions. But each one takes a function and returns a number, and each one respects adding and scaling: the area under $f + g$ is the area under $f$ plus the area under $g$. All four are *covectors*, measuring devices, just like the price list from last episode. Only now the 'vectors' being measured are functions.

"And here's a puzzle that will be our payoff. In 1743, Thomas Simpson popularized a rule: to estimate the area under a curve from 0 to 1, sample it at just three points, the two ends and the middle, and compute one-sixth of the first, plus two-thirds of the middle, plus one-sixth of the last. For a parabola, the rule is exact. That's believable: three samples, three coefficients.

"But the rule is also exact for every *cubic*. A cubic has four coefficients. How can three samples know the exact area of something that has four degrees of freedom? Today we'll see that interpolation, numerical differentiation, and numerical integration are all the same idea: **writing one measurement as a combination of other measurements**, which is change of basis in the dual space. And Simpson's bonus accuracy will turn out to be a free gift from symmetry."

## The story

### 1. A menagerie of measurements

Let $V$ be a space of real functions on an interval, for now $\mathcal{P}_{n-1}$, polynomials of degree $< n$ (dimension $n$, basis $1, x, \dots, x^{n-1}$). Each of the following is a linear functional $V \to \mathbb{R}$ (↩ S2E06):

| Functional | Formula | Why linear |
|---|---|---|
| Evaluation at $a$ | $\delta_a(p) = p(a)$ | $(p+q)(a) = p(a) + q(a)$ |
| Slope at $a$ | $p \mapsto p'(a)$ | derivative is linear, then evaluate |
| Taylor coefficient | $\tau_k(p) = p^{(k)}(0)/k!$ | same |
| Integral | $I(p) = \int_0^1 p(x)\,dx$ | integral is linear |
| Weighted average | $p \mapsto \int_0^1 p(x)w(x)\,dx$ | same |
| Fourier coefficient | $c_m(f) = \frac{1}{2\pi}\int_0^{2\pi} f(x)e^{-imx}\,dx$ | same (on complex-valued $2\pi$-periodic functions) |

We name evaluation $\delta_a$ deliberately: in the season finale this same functional, on a much larger space, becomes the Dirac delta (↪ S2E33).

Since $\dim\mathcal{P}_{n-1}^* = n$ (↩ S2E06), any $n+1$ of these functionals are linearly dependent. On $\mathcal{P}_2$ (dimension 3), the integral $I$ must be a combination of any three independent functionals, for example of $\delta_0, \delta_{1/2}, \delta_1$. Finding that combination is Simpson's rule. Let's build the machinery.

### 2. Taylor coefficients: the dual basis of the monomials

> **Proposition.** On $\mathcal{P}_{n-1}$ (over $\mathbb{R}$, or any field where $k!$ is invertible for $k < n$), the functionals $\tau_0, \dots, \tau_{n-1}$, $\tau_k(p) = p^{(k)}(0)/k!$, form the dual basis of $1, x, \dots, x^{n-1}$.

*Proof.* $\frac{d^k}{dx^k}x^j\big|_{x=0}$ is $k!$ if $j = k$ and $0$ otherwise (for $j < k$ the derivative vanishes identically; for $j > k$ it is a multiple of $x^{j-k}$, which vanishes at $0$). So $\tau_k(x^j) = \delta_{kj}$. $\blacksquare$

So "the $k$-th coefficient of $p$" *is* the measurement $\tau_k$, and Taylor's formula $p = \sum_k \tau_k(p)\,x^k$ is the general identity $v = \sum_i \beta^i(v)\,b_i$ from S2E06. For a polynomial, Taylor's theorem is not an approximation; it's coordinates.

Similarly, on trigonometric polynomials $\sum_{k=-N}^{N} a_k e^{ikx}$, the Fourier coefficient functionals $c_m$ are the dual basis of the exponentials $e^{ikx}$, because $\frac{1}{2\pi}\int_0^{2\pi} e^{i(k - m)x}\,dx = \delta_{km}$. Fourier analysis begins as a dual-basis statement (↪ S2E29).

*Infinite-dimensional caution:* on all of $\mathcal{P}(\mathbb{R})$, the $\tau_k$ still satisfy $\tau_k(x^j) = \delta_{kj}$, but they no longer span the dual: $\delta_1 = \sum_k \tau_k$ is an infinite sum (↩ S2E06, ↪ S2E08).

### 3. Evaluations as a basis of the dual, and Lagrange interpolation

> **Theorem (evaluations form a dual basis).** Let $a_1, \dots, a_n$ be distinct numbers. Then $\delta_{a_1}, \dots, \delta_{a_n}$ is a basis of $\mathcal{P}_{n-1}^*$. The basis of $\mathcal{P}_{n-1}$ to which it is dual consists of the **Lagrange polynomials**
> $$L_i(x) = \prod_{j \ne i}\frac{x - a_j}{a_i - a_j}, \qquad \text{so that}\quad \delta_{a_j}(L_i) = L_i(a_j) = \delta_{ij}.$$

*Proof.* Each $L_i$ is a product of $n - 1$ linear factors, so $L_i \in \mathcal{P}_{n-1}$. At $x = a_i$ every factor equals $1$, so $L_i(a_i) = 1$; at $x = a_j$ with $j \ne i$, the factor $(x - a_j)$ vanishes, so $L_i(a_j) = 0$. (Distinctness of the $a$'s makes the denominators nonzero.)

*Independence of the evaluations:* if $\sum_i c_i\delta_{a_i} = 0$, apply both sides to $L_j$: $\sum_i c_i L_j(a_i) = c_j = 0$. So the $n$ evaluations are independent in the $n$-dimensional space $\mathcal{P}_{n-1}^*$, hence a basis (↩ S2E02).

*Independence of the $L_i$:* if $\sum_i c_i L_i = 0$, evaluate at $a_j$: $c_j = 0$. So the $L_i$ are $n$ independent vectors in $\mathcal{P}_{n-1}$, a basis, and $\delta_{a_j}(L_i) = \delta_{ij}$ says the two bases are dual. $\blacksquare$

A note on wording: the storyline slogan "the dual basis is the Lagrange basis" should be read in this direction. The evaluations live in $V^*$; the Lagrange polynomials live in $V$; each basis is dual to the other.

> **Corollary (Lagrange interpolation).** For any data $y_1, \dots, y_n$ there is exactly one $p \in \mathcal{P}_{n-1}$ with $p(a_i) = y_i$ for all $i$, namely
> $$p = \sum_{i=1}^n y_i\,L_i.$$

*Proof.* Coordinates in a basis are unique, and the $\delta_{a_i}$-readings of $\sum y_i L_i$ are exactly the $y_i$. $\blacksquare$

**Interpolation is change of basis.** A polynomial $p \in \mathcal{P}_{n-1}$ has two coordinate systems: monomial coordinates (its coefficients, read by $\tau_0, \dots, \tau_{n-1}$) and **value coordinates** (its values, read by $\delta_{a_1}, \dots, \delta_{a_n}$). Converting between them is a change of basis. Since $\delta_{a_i}(p) = \sum_k a_i^k\,\tau_k(p)$, the conversion "coefficients → values" is the **Vandermonde matrix** $V_{ik} = a_i^k$. Interpolation, "values → coefficients," is $V^{-1}$. Its columns are the monomial coefficients of the Lagrange polynomials, and its rows express each Taylor functional $\tau_k$ as a combination of evaluations. Every formula in this episode is a row of some such inverse.

**Rewriting any functional in the evaluation basis.** By S2E06, every $\varphi \in V^*$ equals $\sum_i \varphi(b_i)\beta^i$. Here the basis is $L_i$ and the dual basis is $\delta_{a_i}$, so
$$\boxed{\ \varphi = \sum_{i=1}^n \varphi(L_i)\,\delta_{a_i}\quad\text{on } \mathcal{P}_{n-1}.\ }$$
Every linear measurement of a polynomial of degree $< n$ is a weighted combination of its values at any $n$ distinct points, with weights $\varphi(L_i)$. Choose $\varphi = $ "derivative at $a$" and you get **finite-difference formulas** (Example 3). Choose $\varphi = \int_0^1$ and you get **quadrature rules**: $\int_0^1 p = \sum_i w_i\,p(a_i)$ with $w_i = \int_0^1 L_i$, exact on $\mathcal{P}_{n-1}$.

### 4. Quadrature: Simpson's rule and Gauss's improvement

**Simpson's rule.** With nodes $0, \tfrac12, 1$ on $\mathcal{P}_2$, the weights are $w_i = \int_0^1 L_i$, which come out to $\tfrac16, \tfrac23, \tfrac16$ (computed in Example 2). So on $\mathcal{P}_2$,
$$\int_0^1 = \tfrac16\,\delta_0 + \tfrac23\,\delta_{1/2} + \tfrac16\,\delta_1.$$
On a general interval $[a, b]$, a change of variables gives $\int_a^b f \approx \frac{b - a}{6}\big(f(a) + 4f(\tfrac{a+b}{2}) + f(b)\big)$.

> **Theorem (Simpson's bonus).** Simpson's rule is exact on $\mathcal{P}_3$ (all cubics), but not on $\mathcal{P}_4$.

*Proof.* Both sides are linear functionals on $\mathcal{P}_3$, so it suffices to check a basis. Use the basis $1, x, x^2, (x - \tfrac12)^3$ (independent since the degrees are $0,1,2,3$). The two functionals agree on $1, x, x^2$ by construction. On $c(x) = (x - \tfrac12)^3$: the function is odd about $x = \tfrac12$, so $\int_0^1 c = 0$; and Simpson gives $\tfrac16(-\tfrac18) + \tfrac23\cdot 0 + \tfrac16\cdot\tfrac18 = 0$. They agree on a basis, hence on all of $\mathcal{P}_3$. For $x^4$: $\int_0^1 x^4 = \tfrac15$, while Simpson gives $\tfrac23\cdot\tfrac1{16} + \tfrac16\cdot 1 = \tfrac1{24} + \tfrac4{24} = \tfrac{5}{24} \ne \tfrac15$. $\blacksquare$

That answers the cold open: three samples cannot pin down a cubic, but they don't need to. Simpson's rule doesn't reconstruct the cubic; it only needs the *one number* $\int_0^1 p$, and the extra cubic direction $(x - \tfrac12)^3$ happens to lie in the kernel of *both* functionals. Symmetric nodes buy one degree for free.

**Gaussian quadrature: choosing the probes.** Simpson fixed the nodes and solved for weights. What if we choose nodes too? With $n$ nodes and $n$ weights we have $2n$ free parameters, so we might hope for exactness on $\mathcal{P}_{2n-1}$ (dimension $2n$).

> **Theorem (Gauss).** For each $n$ there are nodes $x_1, \dots, x_n \in (0, 1)$ and weights $w_i > 0$ such that $\int_0^1 p = \sum_i w_i\,p(x_i)$ for all $p$ of degree $\le 2n - 1$. No rule with $n$ nodes is exact for all polynomials of degree $2n$.

*Proof of optimality (complete).* Take any nodes $x_1, \dots, x_n$ and weights $w_i$. Let $q(x) = \prod_{i=1}^n (x - x_i)^2$, of degree $2n$. Then $q \ge 0$ and $q$ is not identically zero, so $\int_0^1 q > 0$. But $q(x_i) = 0$ for every node, so $\sum_i w_i q(x_i) = 0$. The rule fails on $q$. $\blacksquare$

*Sketch of existence.* Let $\pi_n$ be the degree-$n$ polynomial orthogonal to $\mathcal{P}_{n-1}$ for $\langle f, g\rangle = \int_0^1 fg$ (a shifted Legendre polynomial; it has $n$ distinct roots in $(0,1)$). Take the nodes to be its roots and the weights $w_i = \int_0^1 L_i$. For $p$ of degree $\le 2n - 1$, divide: $p = s\,\pi_n + r$ with $\deg s, \deg r \le n - 1$. Then $\int_0^1 s\,\pi_n = 0$ by orthogonality, and $\sum w_i s(x_i)\pi_n(x_i) = 0$ since the nodes are roots of $\pi_n$; the rule is exact on $r$ by construction. So it is exact on $p$. (Inner products arrive in ↪ S2E14; here they are just a convenient way to name $\pi_n$.)

For $n = 2$ on $[0,1]$: nodes $\tfrac12 \pm \tfrac{\sqrt3}{6}$, weights $\tfrac12, \tfrac12$ (Example 4). Two samples, exact for cubics, the same degree as Simpson's three.

### 5. Linear constraints are functionals

"Find a polynomial with $p(0) = 0$, $p(1) = 0$, and zero average" is a system of linear equations, and each equation is a functional set to zero. The solution set is an **intersection of kernels**.

> **Theorem.** If $\varphi_1, \dots, \varphi_k \in V^*$ are linearly independent and $\dim V = n$, then
> $$\dim\Big(\ker\varphi_1\cap\dots\cap\ker\varphi_k\Big) = n - k,$$
> and for any $y \in F^k$ the system $\varphi_i(v) = y_i$ ($i = 1, \dots, k$) has solutions, forming a translate of that intersection.

*Proof.* Let $\Phi : V \to F^k$, $\Phi(v) = (\varphi_1(v), \dots, \varphi_k(v))$. Its kernel is the intersection of the kernels. Suppose $\Phi$ were not surjective. Then $\operatorname{im}\Phi$ is a proper subspace of $F^k$, which is contained in a hyperplane, hence in the kernel of some nonzero functional $(y_1, \dots, y_k) \mapsto \sum c_i y_i$ on $F^k$ (↩ S2E06). Then $\sum_i c_i\varphi_i(v) = 0$ for all $v$, so $\sum_i c_i\varphi_i = 0$ with not all $c_i = 0$, contradicting independence. So $\Phi$ is surjective, and rank–nullity (↩ S2E03) gives $\dim\ker\Phi = n - k$. The solution set of $\Phi(v) = y$ is particular + kernel (↩ S2E04). $\blacksquare$

Each independent constraint cuts the dimension by exactly one. Interpolation is the extreme case: $n$ independent evaluation constraints on an $n$-dimensional space leave a 0-dimensional solution set, a single point.

### 6. Zoom out and seed for the finale

**Thread: duality, or measuring things.** The "different perspective" of this episode: interpolation, numerical differentiation, and numerical integration are not three topics but one. Each asks how to express one measurement in terms of others, and each answer is a row of a change-of-basis matrix in $V^*$. Swap the probes and the coordinates change; the function doesn't.

**Seed for the finale (↪ S2E33).** On polynomials, $\delta_0$ ("the value at 0") is a perfectly good functional. Now enlarge the space. On the space of integrable functions, where two functions are considered equal if they differ only on a set of zero length (↪ S2E22–23), "the value at 0" isn't even well defined: changing $f$ at the single point $0$ doesn't change $f$ as an element of the space, but it changes $f(0)$. And even on continuous functions, if "close" means "small area of $|f|$," a tall thin spike at $0$ is close to zero but has $f(0)$ huge: $\delta_0$ is not continuous (↪ S2E24). Keep this problem in the back pocket; the season ends by turning it into the theory of distributions.

**Teaser.** Every linear map $T : V \to W$ lets you pull measurements on $W$ back to measurements on $V$: measure after mapping. In coordinates, this operation turns out to be the transpose. Next episode: the transpose, finally explained, and the double dual.

## Worked examples

### Example 1: Interpolating three data points

Find the polynomial $p \in \mathcal{P}_2$ with $p(0) = 1$, $p(1) = 3$, $p(2) = 7$.

*Lagrange polynomials for nodes $0, 1, 2$:*
$$L_0 = \frac{(x-1)(x-2)}{(0-1)(0-2)} = \frac{x^2 - 3x + 2}{2},\quad L_1 = \frac{(x-0)(x-2)}{(1-0)(1-2)} = -x^2 + 2x,\quad L_2 = \frac{(x-0)(x-1)}{(2-0)(2-1)} = \frac{x^2 - x}{2}.$$
Check $L_1$: $L_1(0) = 0$, $L_1(1) = -1 + 2 = 1$, $L_1(2) = -4 + 4 = 0$ ✓.

*Interpolant:*
$$p = 1\cdot L_0 + 3 L_1 + 7 L_2 = \frac{x^2 - 3x + 2}{2} + (-3x^2 + 6x) + \frac{7x^2 - 7x}{2} = \frac{x^2 - 3x + 2 - 6x^2 + 12x + 7x^2 - 7x}{2} = \frac{2x^2 + 2x + 2}{2}.$$
So $p = x^2 + x + 1$. Check: $p(0) = 1$, $p(1) = 3$, $p(2) = 4 + 2 + 1 = 7$ ✓.

*Same answer via Vandermonde.* Coefficients $(c_0, c_1, c_2)$ satisfy $V\mathbf{c} = (1, 3, 7)$ with
$$V = \begin{pmatrix} 1 & 0 & 0 \\ 1 & 1 & 1 \\ 1 & 2 & 4\end{pmatrix},\qquad V^{-1} = \begin{pmatrix} 1 & 0 & 0 \\ -\tfrac32 & 2 & -\tfrac12 \\ \tfrac12 & -1 & \tfrac12\end{pmatrix}.$$
Then $\mathbf{c} = V^{-1}(1,3,7)^{\mathsf T} = \big(1,\ -\tfrac32 + 6 - \tfrac72,\ \tfrac12 - 3 + \tfrac72\big) = (1, 1, 1)$ ✓. The columns of $V^{-1}$ are the coefficient lists of $L_0, L_1, L_2$: column 1 is $(1, -\tfrac32, \tfrac12)$, i.e. $1 - \tfrac32 x + \tfrac12 x^2 = L_0$ ✓.

*The season's polynomial in value coordinates.* $p(x) = 3x^2 - x + 2$ has values $p(0) = 2$, $p(1) = 4$, $p(2) = 12$. So in the Lagrange basis its coordinates are $(2, 4, 12)$, versus $(2, -1, 3)$ in the monomial basis and $(4, 5, 3)$ in the basis $1, (x-1), (x-1)^2$ (↩ S2E02). Check: $2L_0 + 4L_1 + 12L_2 = (x^2 - 3x + 2) + (-4x^2 + 8x) + (6x^2 - 6x) = 3x^2 - x + 2$ ✓. One polynomial, three languages.

### Example 2: Deriving Simpson's rule two ways, and testing it

*Method 1: integrate the Lagrange polynomials.* Nodes $0, \tfrac12, 1$:
$$L_0 = \frac{(x - \tfrac12)(x - 1)}{(0 - \tfrac12)(0 - 1)} = 2x^2 - 3x + 1,\quad L_{1/2} = \frac{x(x-1)}{\tfrac12\cdot(-\tfrac12)} = -4x^2 + 4x,\quad L_1 = \frac{x(x - \tfrac12)}{1\cdot\tfrac12} = 2x^2 - x.$$
Integrate over $[0,1]$ (using $\int_0^1 x^2 = \tfrac13$, $\int_0^1 x = \tfrac12$):
$$\int_0^1 L_0 = \tfrac23 - \tfrac32 + 1 = \tfrac16,\qquad \int_0^1 L_{1/2} = -\tfrac43 + 2 = \tfrac23,\qquad \int_0^1 L_1 = \tfrac23 - \tfrac12 = \tfrac16.$$

*Method 2: solve for the weights.* Require $w_0 + w_1 + w_2$ times the values of $1, x, x^2$ to match their integrals:
$$w_0 + w_1 + w_2 = 1,\qquad \tfrac12 w_1 + w_2 = \tfrac12,\qquad \tfrac14 w_1 + w_2 = \tfrac13.$$
Subtract the third from the second: $\tfrac14 w_1 = \tfrac16$, so $w_1 = \tfrac23$. Then $w_2 = \tfrac12 - \tfrac13 = \tfrac16$, and $w_0 = 1 - \tfrac23 - \tfrac16 = \tfrac16$ ✓. (This system's matrix is the transpose of a Vandermonde matrix: the weights are coordinates of $\int_0^1$ in the dual basis.)

*Test on cubics and quartics.* For $x^3$: exact $\tfrac14$; Simpson $\tfrac16\cdot 0 + \tfrac23\cdot\tfrac18 + \tfrac16\cdot 1 = \tfrac1{12} + \tfrac{2}{12} = \tfrac14$ ✓. For $x^4$: exact $\tfrac15 = 0.2$; Simpson $\tfrac23\cdot\tfrac1{16} + \tfrac16 = \tfrac{5}{24} \approx 0.2083$, not exact.

*Test on a non-polynomial.* $\int_0^1 e^x\,dx = e - 1 \approx 1.718282$. Simpson: $\tfrac16(1 + 4e^{1/2} + e) \approx 1.718861$, error about $5.8\times 10^{-4}$.

### Example 3: Derivatives as combinations of values

On $\mathcal{P}_2$ with nodes $0, 1, 2$, rewrite $\varphi(p) = p'(1)$ and $\psi(p) = p'(0)$ in the evaluation basis using $\varphi = \sum_i \varphi(L_i)\delta_i$. From Example 1: $L_0' = x - \tfrac32$, $L_1' = -2x + 2$, $L_2' = x - \tfrac12$.

- At $x = 1$: $L_0'(1) = -\tfrac12$, $L_1'(1) = 0$, $L_2'(1) = \tfrac12$. So
  $$p'(1) = \frac{p(2) - p(0)}{2}\quad\text{for all } p \in \mathcal{P}_2,$$
  the **central difference**, exact for quadratics. Check with $p = x^2$: $p'(1) = 2$ and $\tfrac{4 - 0}{2} = 2$ ✓.
- At $x = 0$: $L_0'(0) = -\tfrac32$, $L_1'(0) = 2$, $L_2'(0) = -\tfrac12$. So
  $$p'(0) = -\tfrac32\,p(0) + 2\,p(1) - \tfrac12\,p(2),$$
  the one-sided three-point formula. These weights are exactly row 2 of $V^{-1}$ in Example 1, because $p'(0) = \tau_1(p)$. Check with $p = 1$: $-\tfrac32 + 2 - \tfrac12 = 0$ ✓; $p = x$: $0 + 2 - 1 = 1$ ✓; $p = x^2$: $0 + 2 - 2 = 0$ ✓. With $p = x^3$ it fails ($p'(0) = 0$ but the formula gives $2 - 4 = -2$): $x^3$ is outside $\mathcal{P}_2$.

### Example 4: Two-point Gaussian quadrature on $[0, 1]$

Look for a symmetric rule $\int_0^1 p \approx \tfrac12 p(\tfrac12 - h) + \tfrac12 p(\tfrac12 + h)$. Write polynomials in powers of $t = x - \tfrac12$.

- $t^0 = 1$: exact ($\tfrac12 + \tfrac12 = 1 = \int_0^1 1$).
- $t^1$ and $t^3$: both the integral over $[0,1]$ (odd about $\tfrac12$) and the symmetric rule ($\tfrac12(-h)^k + \tfrac12 h^k = 0$ for odd $k$) give $0$.
- $t^2$: $\int_0^1 (x - \tfrac12)^2\,dx = \big[\tfrac13(x - \tfrac12)^3\big]_0^1 = \tfrac13\big(\tfrac18 + \tfrac18\big) = \tfrac1{12}$. The rule gives $\tfrac12 h^2 + \tfrac12 h^2 = h^2$. So $h^2 = \tfrac1{12}$, $h = \tfrac{1}{2\sqrt3} = \tfrac{\sqrt3}{6} \approx 0.288675$.

So the nodes are $x_{1,2} = \tfrac12 \mp \tfrac{\sqrt3}{6} \approx 0.211325,\ 0.788675$ with weights $\tfrac12$, exact on $1, t, t^2, t^3$, hence on all of $\mathcal{P}_3$, with only two samples. On $t^4$: exact $\int_0^1 t^4 = \tfrac{1}{80}$, rule $h^4 = \tfrac1{144}$, not equal, as the optimality theorem demands. On $e^x$: $\tfrac12(e^{x_1} + e^{x_2}) \approx 1.717896$, error about $-3.9\times 10^{-4}$, comparable to Simpson's with one fewer sample.

### Example 5: A constrained polynomial

Find all $p \in \mathcal{P}_3$ with $p(0) = 0$, $p(1) = 0$, and $\int_0^1 p = 0$.

*Independence:* in monomial coordinates, the functionals are the rows $\delta_0 = (1, 0, 0, 0)$, $\delta_1 = (1,1,1,1)$, $I = (1, \tfrac12, \tfrac13, \tfrac14)$. Suppose $a\delta_0 + b\delta_1 + cI = 0$. The last three entries give $b + \tfrac12c = 0$, $b + \tfrac13 c = 0$, $b + \tfrac14 c = 0$; subtracting the first two gives $\tfrac16 c = 0$, so $c = 0$, then $b = 0$, then $a = 0$. Independent. By the theorem of §5, the solution space has dimension $4 - 3 = 1$.

*Solve:* $p(0) = p(1) = 0$ means $p = x(x - 1)(\alpha x + \beta)$. Then
$$\int_0^1 x(x-1)(\alpha x + \beta)\,dx = \alpha\int_0^1(x^3 - x^2) + \beta\int_0^1 (x^2 - x) = \alpha\big(\tfrac14 - \tfrac13\big) + \beta\big(\tfrac13 - \tfrac12\big) = -\tfrac{\alpha}{12} - \tfrac{\beta}{6}.$$
Setting this to $0$ gives $\alpha = -2\beta$. With $\beta = -1$: $p = x(x - 1)(2x - 1) = 2x^3 - 3x^2 + x$. Check: $p(0) = 0$, $p(1) = 2 - 3 + 1 = 0$, $\int_0^1 p = \tfrac24 - 1 + \tfrac12 = 0$ ✓. The solution space is $\operatorname{span}(2x^3 - 3x^2 + x)$, a line, as predicted. (This $p$ is odd about $x = \tfrac12$, which explains its zero integral.)

## Visual and animation notes
1. **Cold open:** a smooth curve on $[0,1]$ with four orange "probe" devices attached: a pin at $x = 0$ (value), a shaded area meter (integral), a tangent-line gauge at $x = 1$ (slope), a tuning fork (Fourier coefficient). Each outputs a number. Then Simpson's three probes (weights $\tfrac16, \tfrac23, \tfrac16$ shown as probe sizes) measure a cubic and the area meter agrees exactly.
2. **Key visual (storyline): probes as coordinates.** A polynomial graph is "measured" by a row of three probes at $0, 1, 2$; their readings $(2, 4, 12)$ appear as coordinates. Swap the probes for Taylor probes at $0$ (value, slope, curvature/2) and the readings change to $(2, -1, 3)$ while the graph stays fixed (basis/camera motif, now on the covector side; probes drawn orange).
3. **Lagrange basis:** three "spike-like" parabolas $L_0, L_1, L_2$, each equal to 1 at its own node and 0 at the others; the interpolant is assembled as a weighted sum, graph morphing as weights slide to $1, 3, 7$.
4. **Vandermonde as a translator:** a matrix box labeled "coefficients → values," and its inverse "values → coefficients"; rows of the inverse light up as "finite-difference formula for $p'(0)$."
5. **Simpson's bonus:** the cubic $(x - \tfrac12)^3$ drawn with its positive and negative lobes canceling (area meter reads 0); Simpson's probes at $0, \tfrac12, 1$ read $-\tfrac18, 0, \tfrac18$ and also cancel. Caption: "a direction both measurements can't see."
6. **Gauss optimality:** $q(x) = (x - x_1)^2(x - x_2)^2$ touching zero at the nodes; probes read 0, the area meter reads positive. Red "fail" flash.
7. **Constraints:** in a schematic 4D-to-3D picture, three hyperplanes (orange sheets) intersect in a single line through the origin; the polynomial $2x^3 - 3x^2 + x$ appears on that line.
8. **Finale seed:** the probe $\delta_0$ approaches a very rough, spiky function and its needle jitters wildly; caption "↪ S2E33."

## Common misconceptions
- **Misconception:** The Lagrange polynomials are the dual basis, i.e. functionals. **Reality:** the Lagrange polynomials are vectors (polynomials); the evaluations $\delta_{a_i}$ are the functionals. Each basis is the dual of the other.
- **Misconception:** Interpolation finds an approximate polynomial. **Reality:** in $\mathcal{P}_{n-1}$ with $n$ distinct nodes, interpolation is an exact change of coordinates: values to coefficients.
- **Misconception:** Simpson's rule with 3 points can only be exact for quadratics. **Reality:** by symmetry it is exact for cubics too; Gaussian quadrature with 2 points also achieves degree 3.
- **Misconception:** More interpolation nodes always give better approximations of a function. **Reality:** with equally spaced nodes, high-degree interpolation can diverge badly near the endpoints (Runge's phenomenon); the choice of nodes matters, which is part of why Gauss's choice is so effective.
- **Misconception:** "The value at a point" is a measurement you can always make. **Reality:** it's a fine linear functional on polynomials or continuous functions, but it isn't defined on $L^1$ and isn't continuous for integral-based norms (S2E24, S2E33).

## Exercises
- **Warm-up (computational):** (a) Find the quadratic through $(-1, 2)$, $(0, 1)$, $(1, 4)$ using Lagrange polynomials. (b) Derive the trapezoidal rule $\int_0^1 p \approx \tfrac12 p(0) + \tfrac12 p(1)$ as the exact rule on $\mathcal{P}_1$, and show it is *not* exact on $x^2$.
- **Core (conceptual):** (a) Express $\delta_3$ on $\mathcal{P}_2$ as a combination of $\delta_0, \delta_1, \delta_2$. (This is extrapolation.) (b) Why can't any rule $\int_0^1 p = w_0p(0) + w_1p(1)$ be exact on $\mathcal{P}_2$? Use dimension counting.
- **Stretch (proof):** Show that the quadrature rule with nodes $x_1, \dots, x_n$ and weights $w_i = \int_0^1 L_i$ is exact on $\mathcal{P}_{n-1+m}$ if and only if $\int_0^1 q(x)\prod_i (x - x_i)\,dx = 0$ for every $q \in \mathcal{P}_{m-1}$. Deduce Simpson's bonus degree from $\int_0^1 x(x - \tfrac12)(x-1)\,dx = 0$.

<details><summary>Hints and answers</summary>

**Warm-up.** (a) $L_{-1} = \tfrac{x(x-1)}{2}$, $L_0 = 1 - x^2$, $L_1 = \tfrac{x(x+1)}{2}$. $p = 2L_{-1} + L_0 + 4L_1 = (x^2 - x) + (1 - x^2) + (2x^2 + 2x) = 2x^2 + x + 1$. Check: $p(-1) = 2 - 1 + 1 = 2$ ✓, $p(0) = 1$ ✓, $p(1) = 4$ ✓. (b) $L_0 = 1 - x$, $L_1 = x$, $\int_0^1 L_0 = \int_0^1 L_1 = \tfrac12$. On $x^2$: exact $\tfrac13$, rule $\tfrac12$.

**Core.** (a) $\delta_3 = \sum_i L_i(3)\delta_i$ with $L_0(3) = \tfrac{(2)(1)}{2} = 1$, $L_1(3) = -9 + 6 = -3$, $L_2(3) = \tfrac{9 - 3}{2} = 3$. So $p(3) = p(0) - 3p(1) + 3p(2)$ (check on $x^2$: $0 - 3 + 12 = 9$ ✓). (b) The functionals $\delta_0, \delta_1, \int_0^1$ on the 3-dimensional $\mathcal{P}_2$: if $\int = w_0\delta_0 + w_1\delta_1$, then $\int$ would vanish on $\ker\delta_0\cap\ker\delta_1 = \operatorname{span}(x(x-1))$, but $\int_0^1 x(x-1) = -\tfrac16 \ne 0$.

**Stretch.** Let $\omega(x) = \prod(x - x_i)$. Any $p \in \mathcal{P}_{n-1+m}$ is $p = q\,\omega + r$ with $\deg q \le m - 1$, $\deg r \le n - 1$. The rule is exact on $r$ and gives $0$ on $q\,\omega$ (which vanishes at the nodes), so exactness on $p$ is equivalent to $\int_0^1 q\,\omega = 0$. For Simpson, $n = 3$, $\omega = x(x - \tfrac12)(x - 1)$ is odd about $\tfrac12$, so $\int_0^1 \omega = 0$, giving $m = 1$: exact on $\mathcal{P}_3$. Gauss: choose $\omega$ orthogonal to all of $\mathcal{P}_{n-1}$, giving $m = n$.
</details>

## Historical note
The interpolation formula we call Lagrange's was published by Edward Waring in 1779 in the *Philosophical Transactions of the Royal Society*, rediscovered by Euler in 1783, and published by Joseph-Louis Lagrange in 1795 in his lectures at the newly founded École Normale, which is how it got his name. Newton had earlier given interpolation by divided differences (in a 1676 letter, and in Book III of the *Principia*, 1687). The three-point area rule is older than Simpson: Bonaventura Cavalieri and James Gregory used versions of it in the seventeenth century, and Kepler's 1615 *Nova stereometria doliorum vinariorum* ("New solid geometry of wine barrels") used a related rule to estimate barrel volumes; Thomas Simpson's 1743 treatment made it famous. In 1814 Carl Friedrich Gauss presented to the Göttingen Society his "Methodus nova integralium valores per approximationem inveniendi," showing that freeing the nodes doubles the attainable degree of exactness; Jacobi (1826) recast Gauss's result in terms of orthogonal (Legendre) polynomials. Seeing all of this as linear algebra in the dual space is a twentieth-century viewpoint, standard in textbooks such as Hoffman and Kunze's.

## Connections
- **Callbacks:** ↩ S2E06 (dual basis, $\varphi = \sum\varphi(b_i)\beta^i$, kernels), ↩ S2E04 (change of basis; particular + kernel), ↩ S2E03 (rank–nullity), ↩ S2E02 (the season's polynomial in different bases).
- **Sets up:** ↪ S2E08 (dual maps and the transpose; $\mathcal{P}(\mathbb{R})^*$ is much bigger than $\mathcal{P}(\mathbb{R})$), ↪ S2E14 (inner products on function spaces; Legendre polynomials), ↪ S2E24 (evaluation is continuous for the sup norm, not for $L^1$), ↪ S2E29 (Fourier coefficients as measurements), ↪ S2E33 (the Dirac delta $\delta_0$ as a distribution), ↪ S3E04 (Fourier as duality).
- **Side quests:** "Kernel methods and RKHS" (attaches after S2E30: Hilbert spaces in which every $\delta_a$ is continuous), "Convex duality and optimization" (attaches after S2E25: constraints as functionals, Lagrange multipliers).

## References
- **Primary / historical**
  - Edward Waring, "Problems concerning interpolations," *Philosophical Transactions of the Royal Society of London* 69 (1779).
  - Carl Friedrich Gauss, "Methodus nova integralium valores per approximationem inveniendi," *Commentationes Societatis Regiae Scientiarum Gottingensis Recentiores* 3 (presented 1814, published 1816).
- **Textbooks**
  - Kenneth Hoffman and Ray Kunze, *Linear Algebra*, 2nd ed., 1971, Chapter 3, §3.5 (Linear Functionals), which develops Lagrange interpolation as a dual-basis computation.
  - Sheldon Axler, *Linear Algebra Done Right*, 4th ed., Springer, 2024 (or 3rd ed., 2015), Chapter 3, section 3F (Duality).
  - Endre Süli and David F. Mayers, *An Introduction to Numerical Analysis*, Cambridge University Press, 2003 (chapters on polynomial interpolation, Newton–Cotes formulae, and Gauss quadrature).
  - Philip J. Davis and Philip Rabinowitz, *Methods of Numerical Integration*, 2nd ed., Academic Press, 1984.
- **Accessible**
  - Jean-Paul Berrut and Lloyd N. Trefethen, "Barycentric Lagrange Interpolation," *SIAM Review* 46(3) (2004): a readable account of Lagrange interpolation, including its history (Waring, Euler, Lagrange).
  - Lloyd N. Trefethen, *Approximation Theory and Approximation Practice*, SIAM, 2013 (extended edition 2019), especially the chapters on barycentric interpolation and on Clenshaw–Curtis and Gauss quadrature.
