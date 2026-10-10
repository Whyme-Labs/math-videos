# S1E19: Fields, and the Impossible Constructions

> **Season / Act:** Season 1, Act IV (Forget What It Is, Keep What It Does) · **Target runtime:** 20–25 min ·
> **Prerequisites:** S1E06 (ℚ as a field), S1E07 (√2 is irrational), S1E10 (ℂ), S1E17 (quotients), S1E18 (rings, ideals, $\mathbb{R}[x]/(x^2+1) \cong \mathbb{C}$). Outside knowledge: the rational root test; straightedge-and-compass constructions from school geometry ·
> **Builds toward:** S1E20 (Galois theory), S2E01 (vector spaces over a field), S2E02 (basis and dimension), S3E01 (fields as vector spaces; the tower law; why $|\mathbb{F}_q|$ is a prime power)

## Learning objectives
By the end of this lesson the viewer can:
1. Define a field, give the standard examples (ℚ, ℝ, ℂ, $\mathbb{F}_p$, $\mathbb{F}_4$), and build finite fields as $\mathbb{F}_p[x]/(f)$ with $f$ irreducible.
2. Compute the degree $[K : F]$ of a field extension as the dimension of $K$ as a vector space over $F$, and prove the tower law.
3. Explain why every constructible number has degree a power of 2 over ℚ.
4. Prove that a 60° angle cannot be trisected and the cube cannot be doubled, by showing that $\cos 20°$ and $\sqrt[3]{2}$ have degree 3.

## Cold open
*Narrator:*

"Here are the rules of a game the ancient Greeks played. You get a straightedge, with no markings, and a compass. You may draw a line through two points you already have, and a circle with a center you have through a point you have. That's all.

With these rules you can do wonderful things. Bisect any angle: easy, a schoolchild can do it. Draw a regular hexagon. Construct √2 as the diagonal of a square.

So, cut an angle into *three* equal parts. Bisecting was easy; trisecting should be a small step further. For two thousand years, brilliant people tried. Nobody succeeded, and nobody could prove it was impossible either. Mathematics departments still receive letters from people who believe they've done it.

In 1837, a young French mathematician named Pierre Wantzel, still in his early twenties, settled it: in general, it cannot be done. Not 'nobody has found the method.' *There is no method.*

Proving that something can't be done is a completely different kind of problem from doing it. To prove that no sequence of lines and circles ever lands on the right point, you need to understand *every possible* construction at once. The tool that does it is the subject of today's episode: the field. And at the heart of the proof, quietly, is an idea from linear algebra: dimension."

## The story

### 1. The naive attempt: what can a straightedge and compass do?
Start with two points, 0 and 1, on a line. A number $a$ is **constructible** if you can construct a segment of length $|a|$ (equivalently, the point $(a, 0)$) in finitely many steps.

Experiments show the constructible numbers are closed under a lot:
- **+ and −:** lay segments end to end.
- **× and ÷:** similar triangles. If you have lengths $1, a, b$, draw two rays from a point, mark 1 and $b$ on one and $a$ on the other; a parallel line produces $ab$ (or $a/b$).
- **Square roots:** draw a circle on a diameter of length $1 + a$; the perpendicular at the junction point has height $\sqrt{a}$ (the geometric mean).

So we can reach every rational number, then $\sqrt2$, $\sqrt{1 + \sqrt 2}$, $\sqrt{3 - \sqrt{5}}$, and so on. Trisecting a 60° angle amounts to constructing $\cos 20°$: if we had the 20° angle we could intersect it with the unit circle and drop a perpendicular, and conversely. Can we reach $\cos 20° \approx 0.9397$? Each failed attempt teaches nothing. We need a description of *all* constructible numbers at once.

### 2. Fields: where you can add, subtract, multiply, and divide
The closure properties above have a name.

> **Definition (field).** A **field** is a commutative ring $F$ with $1 \neq 0$ in which every nonzero element has a multiplicative inverse. Equivalently: $(F, +)$ is an abelian group, $(F \setminus \{0\}, \cdot)$ is an abelian group, and multiplication distributes over addition.

**Examples.**
- ℚ, ℝ, ℂ (↩ S1E06, S1E08, S1E10).
- $\mathbb{F}_p = \mathbb{Z}/p$ for $p$ prime (↩ S1E18). In $\mathbb{F}_7$, $3^{-1} = 5$ since $3 \cdot 5 = 15 \equiv 1$.
- $\mathbb{Q}(\sqrt2) = \{a + b\sqrt2 : a, b \in \mathbb{Q}\}$. Inverses exist by "rationalizing the denominator": $\frac{1}{a + b\sqrt2} = \frac{a - b\sqrt2}{a^2 - 2b^2}$, and $a^2 - 2b^2 \ne 0$ unless $a = b = 0$ because $\sqrt2$ is irrational (↩ S1E07).

**Non-examples.** ℤ (2 has no inverse); ℤ/6 (zero divisors); $M_2(\mathbb{R})$ (not commutative, and has zero divisors).

**Characteristic.** Add 1 to itself repeatedly. Either you never get 0 (characteristic 0: ℚ, ℝ, ℂ), or the first time you get 0 is after $p$ steps, and $p$ must be prime: if $p = jk$ then $(j\cdot 1)(k \cdot 1) = 0$, and a field has no zero divisors. So every field contains a copy of ℚ or of some $\mathbb{F}_p$.

> **Theorem (finite fields).** Every finite field has $p^n$ elements for some prime $p$ and $n \ge 1$. For each prime power $q = p^n$ there is a field $\mathbb{F}_q$ with $q$ elements, and any two fields with $q$ elements are isomorphic.

The first statement is a dimension count: a field of characteristic $p$ is a vector space over $\mathbb{F}_p$, and a vector space of dimension $n$ over $\mathbb{F}_p$ has $p^n$ elements (↪ S3E01). So there is no field with 6 or 10 elements. Existence comes from the next construction; uniqueness we state without proof.

### 3. A machine for making fields
S1E18 ended with a hint: $\mathbb{R}[x]/(x^2 + 1)$ is a field because $x^2 + 1$ can't be factored over ℝ. That is a general fact.

> **Theorem.** Let $F$ be a field and $f \in F[x]$ a polynomial of degree $n \ge 1$. Then $F[x]/(f)$ is a field if and only if $f$ is irreducible over $F$. In that case its elements are uniquely $a_0 + a_1\alpha + \dots + a_{n-1}\alpha^{n-1}$ with $a_i \in F$, where $\alpha$ is the class of $x$ and $f(\alpha) = 0$.

*Proof.* If $f = gh$ with $g, h$ of smaller degree, their classes are nonzero but multiply to 0: zero divisors, so not a field. Conversely, let $f$ be irreducible and let $g$ be a polynomial not divisible by $f$. The only divisors of $f$ are constants and constant multiples of $f$, so $\gcd(f, g) = 1$. The Euclidean algorithm for polynomials gives $u, v$ with $ug + vf = 1$. Modulo $f$, this says $ug \equiv 1$: $g$ has an inverse. (This is the same argument as "ℤ/p is a field," with polynomials in place of integers.) Every polynomial is congruent to its remainder on division by $f$, which has degree $< n$, and two different remainders differ by a nonzero polynomial of degree $< n$, which isn't a multiple of $f$; this gives the unique form. ∎

So **irreducible polynomial ↦ field**. Over $\mathbb{F}_2$:
- $x^2 + x + 1$ has no root in $\mathbb{F}_2$ ($0 \mapsto 1$, $1 \mapsto 1 + 1 + 1 = 1$), so it is irreducible (a quadratic with no root has no linear factor). $\mathbb{F}_2[x]/(x^2 + x + 1) = \mathbb{F}_4$.
- $x^3 + x + 1$ has no root in $\mathbb{F}_2$ ($0 \mapsto 1$, $1 \mapsto 1$), so it is irreducible (a cubic that factors must have a linear factor). $\mathbb{F}_2[x]/(x^3 + x + 1) = \mathbb{F}_8$.

### 4. Extensions and degree: a dimension in disguise
> **Definition (extension, degree).** If $F \subseteq K$ are fields, $K$ is an **extension** of $F$. Then $K$ is a vector space over $F$: you can add elements of $K$ and multiply them by "scalars" from $F$. The **degree** $[K : F]$ is the dimension of that vector space.

We haven't formally met vector spaces yet (that's ↪ S2E01–S2E02), but all we need is: a **basis** of $K$ over $F$ is a list $b_1, \dots, b_n$ such that every element of $K$ is uniquely $a_1b_1 + \dots + a_nb_n$ with $a_i \in F$, and $n$ is the dimension.

**Examples.** $[\mathbb{C} : \mathbb{R}] = 2$ (basis $1, i$). $[\mathbb{Q}(\sqrt2) : \mathbb{Q}] = 2$ (basis $1, \sqrt2$). $[\mathbb{F}_8 : \mathbb{F}_2] = 3$ (basis $1, \beta, \beta^2$). $[\mathbb{R} : \mathbb{Q}]$ is infinite (indeed uncountable, ↩ S1E12).

> **Definition (algebraic, minimal polynomial).** $\alpha \in K$ is **algebraic** over $F$ if $p(\alpha) = 0$ for some nonzero $p \in F[x]$. The monic polynomial of least degree with $\alpha$ as a root is the **minimal polynomial** of $\alpha$; it is irreducible over $F$.

The theorem of Section 3 then gives: **$[F(\alpha) : F]$ equals the degree of the minimal polynomial of α**, with basis $1, \alpha, \dots, \alpha^{n-1}$. So to find a degree, find an irreducible polynomial with $\alpha$ as a root.

Degrees multiply along a chain of extensions. This is the episode's main proof.

> **Tower Law.** If $F \subseteq K \subseteq L$ are fields with $[L : K] = m$ and $[K : F] = n$ finite, then
> $$[L : F] = [L : K]\,[K : F] = mn.$$

*Proof.* Let $u_1, \dots, u_n$ be a basis of $K$ over $F$ and $v_1, \dots, v_m$ a basis of $L$ over $K$. We show the $mn$ products $u_iv_j$ form a basis of $L$ over $F$.

*Spanning.* Take $x \in L$. Write $x = \sum_j c_j v_j$ with $c_j \in K$. Write each $c_j = \sum_i a_{ij}u_i$ with $a_{ij} \in F$. Then $x = \sum_{i,j} a_{ij}\,u_iv_j$.

*Independence.* Suppose $\sum_{i,j} a_{ij}u_iv_j = 0$ with $a_{ij} \in F$. Group by $j$: $\sum_j \big(\sum_i a_{ij}u_i\big)v_j = 0$. The inner sums are in $K$, and the $v_j$ are independent over $K$, so each $\sum_i a_{ij}u_i = 0$. The $u_i$ are independent over $F$, so every $a_{ij} = 0$. ∎

In words: **dimensions multiply.** Here is linear algebra doing number theory, and it's the bridge to Season 2.

### 5. The crisis resolved: constructible means degree $2^k$
Now translate geometry into algebra. Suppose all points constructed so far have coordinates in a field $F$ (initially ℚ). A new point is an intersection of:
- **line ∩ line:** solving two linear equations with coefficients in $F$ keeps you in $F$;
- **line ∩ circle:** substitute the line into the circle's equation $(x - a)^2 + (y - b)^2 = r^2$ to get a quadratic over $F$, whose roots lie in $F$ or in $F(\sqrt{d})$ for some $d \in F$;
- **circle ∩ circle:** subtracting the two circle equations cancels $x^2 + y^2$ and leaves a line, so this reduces to the previous case.

So each step creates an extension of degree 1 or 2. A construction is a finite tower
$$\mathbb{Q} = F_0 \subseteq F_1 \subseteq \dots \subseteq F_k, \qquad [F_{i+1} : F_i] \in \{1, 2\},$$
and by the tower law $[F_k : \mathbb{Q}] = 2^j$ for some $j$. If $\alpha \in F_k$, then $\mathbb{Q}(\alpha)$ sits inside $F_k$, and the tower law again gives $[\mathbb{Q}(\alpha) : \mathbb{Q}] \cdot [F_k : \mathbb{Q}(\alpha)] = 2^j$.

> **Theorem (Wantzel, 1837).** If $\alpha$ is constructible, then $[\mathbb{Q}(\alpha) : \mathbb{Q}]$ is a power of 2.

(The converse is false in general, but we only need this direction for impossibility.)

### 6. Payoff: trisecting 60° and doubling the cube are impossible
**Trisection.** The triple-angle identity $\cos 3\theta = 4\cos^3\theta - 3\cos\theta$ with $\theta = 20°$ and $\cos 60° = \tfrac12$ gives
$$4c^3 - 3c = \tfrac12 \quad\Longrightarrow\quad 8c^3 - 6c - 1 = 0, \qquad c = \cos 20°.$$
The cubic $8x^3 - 6x - 1$ has no rational root (Worked Example 3), so it is irreducible over ℚ, and $[\mathbb{Q}(\cos 20°) : \mathbb{Q}] = 3$. Three is not a power of 2. So $\cos 20°$ is not constructible, and **the 60° angle cannot be trisected** with straightedge and compass. Since 60° itself *is* constructible (equilateral triangle), there is no general trisection method.

**Doubling the cube** (the Delian problem): construct the side of a cube with twice the volume of a unit cube, i.e. $\sqrt[3]{2}$. Its minimal polynomial is $x^3 - 2$ (Worked Example 5), of degree 3. Not a power of 2: **impossible.**

**Squaring the circle** needs $\sqrt{\pi}$, which isn't even algebraic: Lindemann proved in 1882 that $\pi$ is transcendental. **Regular polygons:** a regular 7-gon needs $\cos(2\pi/7)$, a root of $8x^3 + 4x^2 - 4x - 1$, again degree 3, so it's impossible; Gauss showed the 17-gon *is* constructible because $[\mathbb{Q}(\cos\frac{2\pi}{17}) : \mathbb{Q}] = 8 = 2^3$, and Wantzel completed the classification.

**Zoom out.** Two thousand years of geometry were settled by asking: *what is the dimension of this field as a vector space?* The degree is an **invariant** (thread 5): no clever sequence of constructions can change it. And the tool, dimension, is the central idea of Season 2.

## Worked examples

### Example 1: The field with four elements, and a look at 𝔽₈
$\mathbb{F}_4 = \mathbb{F}_2[x]/(x^2 + x + 1)$. Let $a$ be the class of $x$, so $a^2 = a + 1$ (since $-1 = 1$ in $\mathbb{F}_2$). Elements: $0, 1, a, a+1$.

**Addition** (coefficients mod 2; every element is its own negative):

| + | 0 | 1 | a | a+1 |
|---|---|---|---|---|
| **0** | 0 | 1 | a | a+1 |
| **1** | 1 | 0 | a+1 | a |
| **a** | a | a+1 | 0 | 1 |
| **a+1** | a+1 | a | 1 | 0 |

**Multiplication**, computed with $a^2 = a + 1$:
- $a \cdot a = a + 1$
- $a(a + 1) = a^2 + a = (a + 1) + a = 1$
- $(a + 1)^2 = a^2 + 2a + 1 = a^2 + 1 = (a + 1) + 1 = a$

| × | 0 | 1 | a | a+1 |
|---|---|---|---|---|
| **0** | 0 | 0 | 0 | 0 |
| **1** | 0 | 1 | a | a+1 |
| **a** | 0 | a | a+1 | 1 |
| **a+1** | 0 | a+1 | 1 | a |

Every nonzero element has an inverse ($a^{-1} = a + 1$), so it's a field. Note $\mathbb{F}_4 \ne \mathbb{Z}/4$: in $\mathbb{Z}/4$, $2 \cdot 2 = 0$. The additive group of $\mathbb{F}_4$ is $V_4$ (↩ S1E17), and its multiplicative group $\{1, a, a+1\}$ is cyclic of order 3.

**𝔽₈.** With $\beta^3 = \beta + 1$, the powers of β run through all 7 nonzero elements:
$$\beta^0 = 1,\ \beta^1 = \beta,\ \beta^2 = \beta^2,\ \beta^3 = \beta + 1,\ \beta^4 = \beta^2 + \beta,\ \beta^5 = \beta^3 + \beta^2 = \beta^2 + \beta + 1,$$
$$\beta^6 = \beta^3 + \beta^2 + \beta = \beta^2 + 1,\quad \beta^7 = \beta^3 + \beta = 1.$$
So multiplication in $\mathbb{F}_8$ is just "add exponents mod 7," and $[\mathbb{F}_8 : \mathbb{F}_2] = 3$ with basis $1, \beta, \beta^2$.

### Example 2: Inverses in ℚ(√2) and ℚ(∛2)
**(a)** $\frac{1}{3 + \sqrt2} = \frac{3 - \sqrt2}{(3 + \sqrt2)(3 - \sqrt2)} = \frac{3 - \sqrt2}{9 - 2} = \frac37 - \frac17\sqrt2.$ Check: $(3 + \sqrt2)(3 - \sqrt2) = 7$. ✓

**(b)** Let $\gamma = \sqrt[3]{2}$, so $\gamma^3 = 2$, and $\mathbb{Q}(\gamma)$ has basis $1, \gamma, \gamma^2$. Find $(1 + \gamma)^{-1}$. Use the identity $(1 + \gamma)(1 - \gamma + \gamma^2) = 1 + \gamma^3 = 1 + 2 = 3$. So
$$\frac{1}{1 + \gamma} = \frac{1 - \gamma + \gamma^2}{3} = \frac13 - \frac13\sqrt[3]{2} + \frac13\sqrt[3]{4}.$$
Check by expanding: $(1 + \gamma)(1 - \gamma + \gamma^2) = 1 - \gamma + \gamma^2 + \gamma - \gamma^2 + \gamma^3 = 1 + \gamma^3 = 3$. ✓ Numerically, with $\sqrt[3]2 \approx 1.259921$ and $\sqrt[3]4 \approx 1.587401$: $(1 - 1.259921 + 1.587401)/3 = 1.327480/3 \approx 0.442493$, and $1/2.259921 \approx 0.442493$. ✓

### Example 3: The minimal polynomial of cos 20°
**Step 1: triple-angle formula.** $\cos 3\theta = \cos(2\theta + \theta) = \cos 2\theta\cos\theta - \sin 2\theta\sin\theta = (2c^2 - 1)c - 2s^2c$, with $c = \cos\theta$, $s = \sin\theta$. Substitute $s^2 = 1 - c^2$: $2c^3 - c - 2c + 2c^3 = 4c^3 - 3c$.

**Step 2: the cubic.** With $\theta = 20°$: $4c^3 - 3c = \cos 60° = \tfrac12$; multiply by 2: $8c^3 - 6c - 1 = 0$.

**Step 3: rational root test.** A rational root $r/s$ in lowest terms has $r \mid 1$ and $s \mid 8$, so the candidates are $\pm1, \pm\tfrac12, \pm\tfrac14, \pm\tfrac18$. Let $f(x) = 8x^3 - 6x - 1$:
- $f(1) = 8 - 6 - 1 = 1$; $f(-1) = -8 + 6 - 1 = -3$
- $f(\tfrac12) = 1 - 3 - 1 = -3$; $f(-\tfrac12) = -1 + 3 - 1 = 1$
- $f(\tfrac14) = \tfrac18 - \tfrac32 - 1 = -\tfrac{19}{8}$; $f(-\tfrac14) = -\tfrac18 + \tfrac32 - 1 = \tfrac38$
- $f(\tfrac18) = \tfrac{1}{64} - \tfrac34 - 1 = -\tfrac{111}{64}$; $f(-\tfrac18) = -\tfrac1{64} + \tfrac34 - 1 = -\tfrac{17}{64}$

None is 0.

**Step 4: irreducible.** A cubic that factors over ℚ has a linear factor, hence a rational root. None exists, so $8x^3 - 6x - 1$ is irreducible, and the minimal polynomial of $\cos 20°$ is $x^3 - \tfrac34 x - \tfrac18$ (the monic version).

**Step 5: conclude.** $[\mathbb{Q}(\cos 20°) : \mathbb{Q}] = 3$, not a power of 2. Numerical sanity check: $\cos 20° \approx 0.9396926$; $8(0.9396926)^3 - 6(0.9396926) - 1 \approx 6.6381557 - 5.6381557 - 1 = 0$. ✓

Contrast: trisecting 90° *is* possible, because $\cos 30° = \tfrac{\sqrt3}{2}$ has degree 2. Some angles can be trisected; there's no method that works for all.

### Example 4: ℚ(√2, √3) and the tower law
**Step 1.** $[\mathbb{Q}(\sqrt2) : \mathbb{Q}] = 2$ (minimal polynomial $x^2 - 2$, irreducible since $\sqrt2 \notin \mathbb{Q}$).

**Step 2: $\sqrt3 \notin \mathbb{Q}(\sqrt2)$.** Suppose $\sqrt3 = a + b\sqrt2$ with $a, b \in \mathbb{Q}$. Squaring: $3 = a^2 + 2b^2 + 2ab\sqrt2$. Since $\sqrt 2$ is irrational, $2ab = 0$. If $b = 0$, then $\sqrt3 = a \in \mathbb{Q}$: false. If $a = 0$, then $3 = 2b^2$, so $b^2 = \tfrac32$ and $\sqrt6 = 2b \in \mathbb{Q}$: false. So $x^2 - 3$ is irreducible over $\mathbb{Q}(\sqrt2)$ and $[\mathbb{Q}(\sqrt2, \sqrt3) : \mathbb{Q}(\sqrt2)] = 2$.

**Step 3: tower law.** $[\mathbb{Q}(\sqrt2,\sqrt3) : \mathbb{Q}] = 2 \cdot 2 = 4$, with basis $1, \sqrt2, \sqrt3, \sqrt6$ (products of the two bases, as in the proof).

**Step 4: a single generator.** Let $\alpha = \sqrt2 + \sqrt3$. Then $\alpha^2 = 5 + 2\sqrt6$, so $\alpha^2 - 5 = 2\sqrt6$ and $(\alpha^2 - 5)^2 = 24$: $\alpha^4 - 10\alpha^2 + 1 = 0$. Since $\alpha^3 = 11\sqrt2 + 9\sqrt3$ (expand: $(\sqrt2 + \sqrt3)(5 + 2\sqrt6) = 5\sqrt2 + 5\sqrt3 + 2\sqrt{12} + 2\sqrt{18} = 5\sqrt2 + 5\sqrt3 + 4\sqrt3 + 6\sqrt2$), we get $\sqrt2 = \frac{\alpha^3 - 9\alpha}{2}$ and $\sqrt3 = \frac{11\alpha - \alpha^3}{2}$, so $\mathbb{Q}(\alpha) = \mathbb{Q}(\sqrt2, \sqrt3)$ has degree 4. Therefore $x^4 - 10x^2 + 1$ is the minimal polynomial of α. Degree 4 = $2^2$, consistent with $\alpha$ being constructible (it is: construct $\sqrt2$, $\sqrt3$, add).

### Example 5: Doubling the cube
$\sqrt[3]{2}$ is a root of $x^3 - 2$. Rational root candidates: $\pm1, \pm2$. Values: $1 - 2 = -1$, $-1 - 2 = -3$, $8 - 2 = 6$, $-8 - 2 = -10$. No rational roots, so the cubic is irreducible (alternatively: Eisenstein's criterion at $p = 2$). So $[\mathbb{Q}(\sqrt[3]{2}) : \mathbb{Q}] = 3$, and if $\sqrt[3]2$ were in a tower of degree $2^j$, the tower law would force $3 \mid 2^j$. Impossible.

## Visual and animation notes
1. **Cold open:** a parchment plane; a straightedge and compass draw an angle bisection in three strokes. Then the same tools hover over a 60° angle, try, and every attempt lands near but not on the trisecting ray. A counter of years ticks from −400 to 1837.
2. **Constructions as operations:** animated similar-triangle constructions for $ab$ and $a/b$, and the semicircle construction of $\sqrt a$. Each completed construction adds a floor-tile to a growing "field" platform.
3. **Field stamp:** a "FIELD" stamp lands on ℚ, ℝ, ℂ, $\mathbb{F}_7$ (a clock face with 7 hours), and $\mathbb{F}_4$; it bounces off ℤ (2 has no inverse) and ℤ/6 (zero divisors flash).
4. **The field machine:** S1E18's teaser machine returns: $\mathbb{F}_2[x]$ goes in, the blob motif collapses everything modulo $x^2 + x + 1$, four glowing blobs come out and arrange into the $\mathbb{F}_4$ tables.
5. **𝔽₈ as a clock:** the 7 nonzero elements of $\mathbb{F}_8$ placed on a 7-hour clock by exponent of β; multiplication = turning the hand.
6. **Degree as dimension:** $\mathbb{Q}(\sqrt2)$ drawn as a 2D grid with axes "1" and "√2" (vectors in the series' blue); $\mathbb{Q}(\sqrt[3]{2})$ as a 3D grid with axes $1, \sqrt[3]2, \sqrt[3]4$. Caption: "the degree is a dimension" with "↪ S2E02."
7. **Tower law:** stacked translucent slabs: ℚ at the bottom, $\mathbb{Q}(\sqrt2)$ (2 layers), $\mathbb{Q}(\sqrt2,\sqrt3)$ (2 × 2 = 4 layers). The basis products $1, \sqrt2, \sqrt3, \sqrt6$ appear as a 2×2 grid.
8. **Constructions as towers:** every line–circle intersection adds a floor of height 2 to a tower (the number tower motif); the height of any constructible point is a power of 2. Then $\cos 20°$ appears with a "degree 3" badge and can't fit on any floor.
9. **Invariant badge:** "degree 3" stays fixed on screen while constructions churn underneath (the invariants motif).
10. **Bridge to Season 2:** the vector grid from shot 6 detaches from the number line and floats forward with the caption "a vector space over a field."

## Common misconceptions
- **Misconception:** trisecting an angle is impossible for every angle. **Reality:** many angles can be trisected (90°, 180°, any angle $3\theta$ where $\theta$ is constructible). What's impossible is a general method, because 60° can't be trisected.
- **Misconception:** "impossible" means nobody has found a way yet. **Reality:** it's a proof: every construction lands in a field of degree $2^k$, and $\cos 20°$ has degree 3.
- **Misconception:** trisection is impossible by any means. **Reality:** with a marked ruler (a "neusis" construction, known to Archimedes), with origami, or with certain curves, trisection is possible. The theorem is about straightedge and compass only.
- **Misconception:** $\mathbb{F}_4$ is $\mathbb{Z}/4$. **Reality:** $\mathbb{Z}/4$ is not a field ($2 \cdot 2 = 0$). $\mathbb{F}_4$ is built from $\mathbb{F}_2$ and an irreducible quadratic.
- **Misconception:** every number of degree $2^k$ is constructible. **Reality:** the converse of Wantzel's theorem fails in general (some degree-4 numbers aren't constructible); the right criterion uses Galois theory (↪ S1E20).

## Exercises
- **Warm-up (computational):** In $\mathbb{F}_7$, find the inverses of 2, 3, 4, 5, 6. In $\mathbb{Q}(\sqrt5)$, compute $(2 + \sqrt5)^{-1}$.
- **Core (conceptual):** Show that a regular 9-gon cannot be constructed. (Hint: its central angle is 40°; relate $\cos 40°$ to a cubic.) Explain why the regular hexagon *can*.
- **Stretch (proof):** Prove that $x^3 + x^2 + 1$ is irreducible over $\mathbb{F}_2$ and compute the powers of the class γ of $x$ in $\mathbb{F}_2[x]/(x^3 + x^2 + 1)$. Does γ generate all 7 nonzero elements? (You've built $\mathbb{F}_8$ a second way; uniqueness says the two are isomorphic.)

<details><summary>Hints and answers</summary>

- **Warm-up:** In $\mathbb{F}_7$: $2^{-1} = 4$, $3^{-1} = 5$, $4^{-1} = 2$, $5^{-1} = 3$, $6^{-1} = 6$ (since $6 \cdot 6 = 36 \equiv 1$). $(2 + \sqrt5)^{-1} = \frac{2 - \sqrt5}{4 - 5} = -2 + \sqrt5$; check: $(2 + \sqrt5)(-2 + \sqrt5) = 5 - 4 = 1$ ✓.
- **Core:** With $\theta = 40°$, $\cos 120° = -\tfrac12$ gives $4c^3 - 3c = -\tfrac12$, i.e. $8c^3 - 6c + 1 = 0$. Candidates $\pm1, \pm\tfrac12, \pm\tfrac14, \pm\tfrac18$ give no root (this is $f(-x)$ up to sign for Example 3's $f$), so degree 3: not constructible. Hexagon: $\cos 60° = \tfrac12 \in \mathbb{Q}$.
- **Stretch:** No roots in $\mathbb{F}_2$: $0 \mapsto 1$, $1 \mapsto 1 + 1 + 1 = 1$. With $\gamma^3 = \gamma^2 + 1$: $\gamma^3 = \gamma^2 + 1$, $\gamma^4 = \gamma^3 + \gamma = \gamma^2 + \gamma + 1$, $\gamma^5 = \gamma^3 + \gamma^2 + \gamma = \gamma + 1$, $\gamma^6 = \gamma^2 + \gamma$, $\gamma^7 = \gamma^3 + \gamma^2 = 1$. Yes, γ has order 7 and generates all nonzero elements.

</details>

## Historical note
The three classical problems (trisecting an angle, doubling the cube, squaring the circle) go back to Greek geometry of the 5th and 4th centuries BCE. The Greeks solved them using other tools: Archimedes gave a trisection using a marked ruler, and Menaechmus doubled the cube using conic sections. What remained open was whether straightedge and compass alone could do it.

In 1796 the 19-year-old Carl Friedrich Gauss showed that the regular 17-gon is constructible; his *Disquisitiones Arithmeticae* (1801) gave a sufficient condition for constructing regular polygons and asserted, without full proof, that it was also necessary. Pierre Laurent Wantzel published the proofs in 1837, in Liouville's *Journal de Mathématiques Pures et Appliquées*: he proved that the cube cannot be doubled and the general angle cannot be trisected, and completed the necessity half of Gauss's polygon criterion. His paper attracted little attention at the time. Ferdinand von Lindemann proved $\pi$ transcendental in 1882, ending the quest to square the circle.

Finite fields first appear in Galois's 1830 paper "Sur la théorie des nombres," as "Galois imaginaries"; E. H. Moore proved in 1893 that every finite field is one of these. Today finite fields run error-correcting codes, QR codes, and cryptography.

## Connections
- **Callbacks:** ↩ S1E06 (ℚ is a field), ↩ S1E07 (irrationality of √2, used to show $[\mathbb{Q}(\sqrt2):\mathbb{Q}] = 2$), ↩ S1E10 (ℂ as a degree-2 extension of ℝ), ↩ S1E12 (ℝ has uncountable dimension over ℚ), ↩ S1E17 (the Klein four-group; cyclic groups), ↩ S1E18 (zero divisors; ℤ/p is a field; $F[x]/(f)$)
- **Sets up:** ↪ S1E20 (Galois theory: fields and their symmetries), ↪ S2E01 (vector spaces over a field, including $\mathbb{F}_2^n$), ↪ S2E02 (basis and dimension made rigorous), ↪ S3E01 (fields as vector spaces; the tower law; $|\mathbb{F}_q| = p^n$; norm and trace as determinant and trace of multiplication), ↪ S3E02 (codes over $\mathbb{F}_2$)
- **Side quests:** "Linear algebra over 𝔽₂: codes and puzzles" (after S2E03); "Galois's last night" (history interlude)

## References
- **Primary / historical**
  - Pierre Laurent Wantzel, "Recherches sur les moyens de reconnaître si un problème de géométrie peut se résoudre avec la règle et le compas," *Journal de Mathématiques Pures et Appliquées* 2 (1837).
  - Carl Friedrich Gauss, *Disquisitiones Arithmeticae* (1801), Section VII (on cyclotomy and the 17-gon).
  - Évariste Galois, "Sur la théorie des nombres," *Bulletin des Sciences Mathématiques de Férussac* (1830).
- **Textbooks**
  - Ian Stewart, *Galois Theory* (4th ed., CRC Press, 2015), chapters on field extensions, the degree of an extension, and ruler-and-compass constructions.
  - David S. Dummit and Richard M. Foote, *Abstract Algebra* (3rd ed., Wiley, 2004), Chapter 13 (field theory: extensions, the tower law, classical straightedge and compass constructions, finite fields).
  - Michael Artin, *Algebra* (2nd ed., Pearson, 2011), Chapter 15 (fields, including constructions with ruler and compass and finite fields).
  - Charles C. Pinter, *A Book of Abstract Algebra* (2nd ed., 1990; Dover 2010), Chapters 27–30 (extensions of fields, vector spaces, degrees of field extensions, ruler and compass).
- **Accessible**
  - Richard Courant and Herbert Robbins, *What Is Mathematics?* (Oxford University Press, 1941; revised by Ian Stewart, 1996), Chapter III, "Geometrical Constructions. The Algebra of Number Fields."
  - Underwood Dudley, *A Budget of Trisections* (Springer, 1987): a gentle look at the many failed trisection attempts.
