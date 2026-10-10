# S3E01: Fields Are Vector Spaces Over Fields

> **Season / Act:** Season 3, Act I (Algebra Meets Linear Algebra) · **Target runtime:** 18–22 min ·
> **Prerequisites:** S1E18 (rings, quotient rings), S1E19 (fields, extensions, impossible constructions), S2E01–S2E04 (vector spaces, bases, dimension, linear maps, matrices), S2E11–S2E12 (determinant, trace); outside knowledge: polynomial long division ·
> **Builds toward:** S3E02 (modules: changing the scalars from a field to a ring), S3E03 (groups acting linearly), S3E12 (category theory)

## Learning objectives
By the end of this lesson the viewer can:
1. Explain why every field extension $L/K$ is a vector space over $K$, compute its degree $[L:K]$, and write down an explicit basis for extensions such as $\mathbb{C}/\mathbb{R}$, $\mathbb{Q}(\sqrt2)/\mathbb{Q}$, $\mathbb{Q}(\sqrt2,\sqrt3)/\mathbb{Q}$ and $\mathbb{F}_8/\mathbb{F}_2$.
2. State and prove the tower law $[M:K] = [M:L]\,[L:K]$ and use it to show that a $60^\circ$ angle cannot be trisected.
3. Prove that every finite field has $p^n$ elements for some prime $p$ and some $n \ge 1$.
4. Treat "multiply by $\alpha$" as a linear map and compute the field norm and trace of $\alpha$ as a determinant and a trace.

## Cold open
*(Narrator, over a slow pan across a pile of playing cards, each printed with a different "number system.")*

Here's a strange question. Could there be a number system with exactly six numbers?

Not a clock. Clock arithmetic mod 6 breaks: $2 \times 3 = 0$, so you can't divide by 2. I mean a genuine *field*: add, subtract, multiply, and divide by anything nonzero, with all the familiar rules.

Five works. Seven works. There's a perfectly good field with four elements, and one with eight, and one with nine. But six? Ten? Twelve? Never. Try to build one and something always jams.

Back in Season 1, we stated this as a fact: finite fields come only in sizes that are powers of a prime. Today we're going to *see* why, and the reason is going to feel almost like cheating. It's a fact about counting arrows.

Because here's the secret we kept back in Season 1. Every time we built a bigger field on top of a smaller one, $\mathbb{R}$ inside $\mathbb{C}$, $\mathbb{Q}$ inside $\mathbb{Q}(\sqrt2)$, we were quietly building a **vector space**. And once you see a field as a vector space, three things that looked like separate miracles, the impossible trisection, the sizes of finite fields, and the "norm" that number theorists love, collapse into a single idea from Season 2.

Dimensions multiply.

## The story

### 1. The naive picture: fields as towers of floors
In S1E19 we met field extensions as "floors" on the number tower: $\mathbb{Q} \subset \mathbb{Q}(\sqrt2) \subset \mathbb{R} \subset \mathbb{C}$. The natural first question about any extension is *how much bigger* the top floor is. The naive attempt is to count elements, and it fails immediately: $\mathbb{Q}$ and $\mathbb{Q}(\sqrt2)$ are both countable (↩ S1E11), so counting says they are "the same size." Yet $\mathbb{Q}(\sqrt2)$ is clearly *more*: it contains a number $\sqrt2$ that no fraction equals.

Cardinality is the wrong ruler. We need a ruler that sees the algebraic structure, not just the raw set.

### 2. The crisis, and the observation that resolves it
Look at what you can *do* with a field extension $K \subseteq L$:
- you can add two elements of $L$;
- you can multiply an element of $L$ by an element of $K$.

Every vector-space axiom (↩ S2E01) holds automatically, because these are just special cases of the field axioms of $L$: distributivity in $L$ gives $a(x+y) = ax + ay$ and $(a+b)x = ax + bx$; associativity gives $(ab)x = a(bx)$; and $1 \cdot x = x$. We are simply *forgetting* that we can multiply two elements of $L$ together, and remembering only how $K$ acts on $L$.

> **Definition (degree).** If $K \subseteq L$ are fields, then $L$ is a vector space over $K$. Its dimension is called the **degree** of the extension and written $[L:K] = \dim_K L$. The extension is **finite** if $[L:K] < \infty$.

This is the right ruler. It sees $\sqrt2$:

- $[\mathbb{C}:\mathbb{R}] = 2$, with basis $\{1, i\}$: every complex number is uniquely $a \cdot 1 + b \cdot i$ (↩ S1E10, where $\mathbb{C}$ was literally built as pairs of reals).
- $[\mathbb{Q}(\sqrt2):\mathbb{Q}] = 2$, with basis $\{1,\sqrt2\}$. Spanning: $(\sqrt2)^2 = 2 \in \mathbb{Q}$, so every polynomial expression in $\sqrt2$ reduces to $a + b\sqrt2$, and $\frac{1}{a+b\sqrt2} = \frac{a - b\sqrt2}{a^2-2b^2}$ stays in that form. Independence: $a + b\sqrt2 = 0$ with $b\ne0$ would make $\sqrt2 = -a/b$ rational.
- $[\mathbb{R}:\mathbb{Q}] = \infty$; in fact its dimension is uncountable (↩ S2E02).

In general, if $\alpha$ is a root of an irreducible polynomial $m(x) \in K[x]$ of degree $n$ (its **minimal polynomial**), then
$$K(\alpha) \cong K[x]/(m(x)), \qquad [K(\alpha):K] = n, \qquad \text{basis } 1, \alpha, \alpha^2, \dots, \alpha^{n-1}.$$
The isomorphism is the quotient-ring construction of S1E18 (↩ S1E18); the basis statement is just polynomial division: any polynomial $f$ can be written $f = qm + r$ with $\deg r < n$, and $f(\alpha) = r(\alpha)$. Independence of $1, \dots, \alpha^{n-1}$ holds because a nontrivial relation would be a nonzero polynomial of degree $< n$ killing $\alpha$, contradicting the minimality of $m$.

**Build or Describe?** $\mathbb{C}$ can be *built* as $\mathbb{R}[x]/(x^2+1)$ (a quotient ring), or *described* as "a 2-dimensional $\mathbb{R}$-vector space with a multiplication in which some vector squares to $-1$." The degree belongs to the description: it doesn't care how you built the field.

### 3. The tower law: dimensions multiply
> **Theorem (Tower Law).** Let $K \subseteq L \subseteq M$ be fields with $[L:K]$ and $[M:L]$ finite. Then $[M:K]$ is finite and
> $$[M:K] = [M:L]\,[L:K].$$

**Proof.** Let $\{\ell_1, \dots, \ell_m\}$ be a basis of $L$ over $K$ and $\{\mu_1, \dots, \mu_n\}$ a basis of $M$ over $L$. We claim the $mn$ products $\{\ell_i \mu_j\}$ form a basis of $M$ over $K$.

*Spanning.* Take $z \in M$. Since the $\mu_j$ span $M$ over $L$, we can write $z = \sum_j b_j \mu_j$ with $b_j \in L$. Since the $\ell_i$ span $L$ over $K$, each $b_j = \sum_i a_{ij} \ell_i$ with $a_{ij} \in K$. Substituting,
$$z = \sum_{j}\Big(\sum_i a_{ij}\ell_i\Big)\mu_j = \sum_{i,j} a_{ij}\,(\ell_i\mu_j).$$

*Independence.* Suppose $\sum_{i,j} a_{ij}\,\ell_i\mu_j = 0$ with $a_{ij} \in K$. Regroup as $\sum_j \big(\sum_i a_{ij}\ell_i\big)\mu_j = 0$. The inner sums lie in $L$, and the $\mu_j$ are independent over $L$, so $\sum_i a_{ij}\ell_i = 0$ for every $j$. The $\ell_i$ are independent over $K$, so every $a_{ij} = 0$. $\blacksquare$

The whole proof is "a basis of a basis is a basis." It is the same reason that a $3 \times 4$ grid has 12 cells, or that $\dim(V \otimes W) = \dim V \cdot \dim W$ (↩ S2E10).

**Corollary.** If $K \subseteq L \subseteq M$ with $[M:K]$ finite, then $[L:K]$ divides $[M:K]$. (Note: finiteness of $[M:K]$ forces both $[L:K]$ and $[M:L]$ to be finite, since $L$ is a $K$-subspace of $M$ and a $K$-spanning set of $M$ also spans it over $L$.)

### 4. Payoff 1: why finite fields have prime-power size
In S1E19 we asserted that a finite field of size $q$ exists exactly when $q$ is a prime power. Now we prove the half that sounds hardest, "only prime powers," with almost no effort.

> **Theorem.** If $F$ is a finite field, then $|F| = p^n$ for some prime $p$ and some integer $n \ge 1$.

**Proof.** *Step 1: $F$ contains a copy of some $\mathbb{F}_p$.* Consider the ring homomorphism $\mathbb{Z} \to F$, $k \mapsto k \cdot 1 = 1 + \dots + 1$. Since $F$ is finite and $\mathbb{Z}$ is infinite, it isn't injective; its kernel is a nonzero ideal $(c)$ with $c > 0$ (↩ S1E18). By the first isomorphism theorem (↩ S1E17) its image is $\mathbb{Z}/c\mathbb{Z}$, a subring of a field, so it has no zero divisors. If $c = ab$ with $1 < a, b < c$, then $(a\cdot1)(b\cdot1) = 0$ with both factors nonzero, a contradiction. So $c = p$ is prime, and $F$ contains the field $\mathbb{F}_p = \mathbb{Z}/p\mathbb{Z}$. (This $p$ is the **characteristic** of $F$.)

*Step 2: $F$ is a vector space over $\mathbb{F}_p$.* By §2, $F$ is a vector space over its subfield $\mathbb{F}_p$, and it is finite-dimensional because it is a finite set (it is spanned by itself). Let $n = [F:\mathbb{F}_p]$ and choose a basis $e_1, \dots, e_n$.

*Step 3: count.* Every element of $F$ is uniquely $c_1e_1 + \dots + c_ne_n$ with each $c_i \in \mathbb{F}_p$. There are $p$ choices for each coefficient, so $|F| = p^n$. $\blacksquare$

The cold open is answered: a field with 6 elements would have to be $\mathbb{F}_p^n$ as a vector space, and $6$ is not a prime power. The same argument (applying the tower law instead of Step 1) shows that if $F \subseteq E$ are finite fields with $|F| = q$, then $|E| = q^m$ where $m = [E:F]$.

The other direction, that a field of every prime-power size exists and is unique up to isomorphism, needs a different tool: $\mathbb{F}_{p^n}$ is the set of roots of $x^{p^n} - x$ in a splitting field. We state it and leave the proof to the references; the existence half reappears in the exercises.

### 5. Payoff 2: multiplication is a linear map, so it has a determinant
Here is the second "same idea" moment. Fix $\alpha \in L$ and define
$$m_\alpha : L \to L, \qquad m_\alpha(x) = \alpha x.$$
Because $\alpha(x+y) = \alpha x + \alpha y$ and $\alpha(cx) = c(\alpha x)$ for $c\in K$, this is a $K$-**linear map** (↩ S2E03). Choose a basis and it becomes a matrix (↩ S2E04). We met the very first instance in S1E10: multiplication by $i$ on $\mathbb{C} = \mathbb{R}^2$ is the quarter-turn matrix $\begin{pmatrix}0&-1\\1&0\end{pmatrix}$.

Linear maps have coordinate-free invariants (↩ S2E11, S2E12): the trace and the determinant. Applied to $m_\alpha$ they get number-theoretic names.

> **Definition (field norm and trace).** For a finite extension $L/K$ and $\alpha \in L$,
> $$N_{L/K}(\alpha) = \det(m_\alpha), \qquad \operatorname{Tr}_{L/K}(\alpha) = \operatorname{tr}(m_\alpha).$$
> Both lie in $K$ and neither depends on the choice of basis.

Basis-independence is free: changing basis replaces the matrix $A$ by $P^{-1}AP$, and similar matrices have the same determinant and trace. Two properties come for free as well:

- **The norm is multiplicative:** $m_{\alpha\beta} = m_\alpha \circ m_\beta$, so $N(\alpha\beta) = \det(m_\alpha m_\beta) = N(\alpha)N(\beta)$. This is just $\det(AB) = \det A \det B$.
- **The trace is $K$-linear:** $m_{\alpha+\beta} = m_\alpha + m_\beta$ and $m_{c\alpha} = c\, m_\alpha$.

And the **characteristic polynomial** of $m_\alpha$ is a polynomial with coefficients in $K$ that kills $\alpha$ (by Cayley–Hamilton, ↩ S2E13, $p(m_\alpha) = 0$, hence $p(\alpha) = p(m_\alpha)(1) = 0$). When $\alpha$ generates $L$, it is exactly the minimal polynomial.

For $\mathbb{C}/\mathbb{R}$ and $\alpha = a + bi$: in the basis $\{1, i\}$, $\alpha \cdot 1 = a + bi$ and $\alpha \cdot i = -b + ai$, so
$$m_\alpha = \begin{pmatrix} a & -b \\ b & a\end{pmatrix}, \qquad N(\alpha) = a^2 + b^2 = |\alpha|^2, \qquad \operatorname{Tr}(\alpha) = 2a = \alpha + \bar\alpha.$$
Multiplicativity of the norm is the classical two-squares identity
$$(a^2+b^2)(c^2+d^2) = (ac - bd)^2 + (ad + bc)^2,$$
which is therefore nothing but "the determinant of a product is the product of determinants."

### 6. Payoff 3: the impossible constructions, in one line
S1E19 told the story: straightedge-and-compass constructions starting from $\mathbb{Q}$ only ever solve linear and quadratic equations, so each new point lives in an extension of degree 1 or 2 over the previous field. A constructible number $c$ therefore lies in some field $M$ at the top of a tower
$$\mathbb{Q} = K_0 \subseteq K_1 \subseteq \dots \subseteq K_r = M, \qquad [K_{i+1}:K_i] \in \{1, 2\}.$$
By the tower law, $[M:\mathbb{Q}] = 2^k$. By the corollary, $[\mathbb{Q}(c):\mathbb{Q}]$ divides $2^k$, so it is itself a power of 2. A number whose minimal polynomial has degree 3 is never constructible. Worked Example 3 runs this for the trisection of $60^\circ$.

The "aha" for the episode: the degree, the tower law, the count $p^n$, and the norm are all **Season 2 facts about dimension and determinants**, applied to vector spaces that happen to also be fields.

## Worked examples

### Example 1: $\mathbb{Q}(\sqrt2, \sqrt3)$ has degree 4, and the minimal polynomial of $\sqrt2+\sqrt3$ is a characteristic polynomial
**Step 1 (bottom floor).** $[\mathbb{Q}(\sqrt2):\mathbb{Q}] = 2$ with basis $\{1, \sqrt2\}$ (§2).

**Step 2 (top floor).** Is $\sqrt3 \in \mathbb{Q}(\sqrt2)$? Suppose $\sqrt3 = a + b\sqrt2$ with $a, b \in \mathbb{Q}$. Squaring, $3 = a^2 + 2b^2 + 2ab\sqrt2$. Since $\{1,\sqrt2\}$ is a basis, $2ab = 0$ and $a^2 + 2b^2 = 3$. If $b = 0$ then $a^2 = 3$, impossible in $\mathbb{Q}$. If $a = 0$ then $b^2 = 3/2$, i.e. $(2b)^2 = 6$, impossible in $\mathbb{Q}$. So $\sqrt3 \notin \mathbb{Q}(\sqrt2)$, the polynomial $x^2 - 3$ is irreducible over $\mathbb{Q}(\sqrt2)$, and $[\mathbb{Q}(\sqrt2,\sqrt3):\mathbb{Q}(\sqrt2)] = 2$ with basis $\{1,\sqrt3\}$.

**Step 3 (tower law).** $[\mathbb{Q}(\sqrt2,\sqrt3):\mathbb{Q}] = 2 \cdot 2 = 4$, and the proof of the tower law hands us the basis of products:
$$\{1,\ \sqrt2\} \times \{1,\ \sqrt3\} \ \longrightarrow\ \{1,\ \sqrt2,\ \sqrt3,\ \sqrt6\}.$$

**Step 4 (the matrix of $m_\alpha$).** Let $\alpha = \sqrt2 + \sqrt3$. Multiply each basis vector by $\alpha$:
- $\alpha \cdot 1 = \sqrt2 + \sqrt3 \;\to\; (0, 1, 1, 0)$
- $\alpha \cdot \sqrt2 = 2 + \sqrt6 \;\to\; (2, 0, 0, 1)$
- $\alpha \cdot \sqrt3 = \sqrt6 + 3 \;\to\; (3, 0, 0, 1)$
- $\alpha \cdot \sqrt6 = \sqrt{12} + \sqrt{18} = 2\sqrt3 + 3\sqrt2 \;\to\; (0, 3, 2, 0)$

These are the columns:
$$m_\alpha = \begin{pmatrix} 0 & 2 & 3 & 0 \\ 1 & 0 & 0 & 3 \\ 1 & 0 & 0 & 2 \\ 0 & 1 & 1 & 0 \end{pmatrix}.$$

**Step 5 (invariants).** $\operatorname{Tr}(\alpha) = 0 + 0 + 0 + 0 = 0$. The characteristic polynomial is $\det(xI - m_\alpha) = x^4 - 10x^2 + 1$ (checked with `sympy`), so $N(\alpha) = \det m_\alpha = 1$.

**Step 6 (check by hand).** $\alpha^2 = 2 + 2\sqrt6 + 3 = 5 + 2\sqrt6$, so $(\alpha^2 - 5)^2 = 24$, i.e. $\alpha^4 - 10\alpha^2 + 1 = 0$. ✓ Since $\alpha$ satisfies a degree-4 polynomial and $[\mathbb{Q}(\alpha):\mathbb{Q}]$ divides 4 and $\alpha \notin \mathbb{Q}(\sqrt2)$ (or any quadratic subfield; see Exercise 2), $\mathbb{Q}(\alpha) = \mathbb{Q}(\sqrt2,\sqrt3)$ and $x^4 - 10x^2 + 1$ is the minimal polynomial. The four roots $\pm\sqrt2\pm\sqrt3$ multiply to $1$ and add to $0$, matching the norm and trace.

### Example 2: building $\mathbb{F}_8$ and computing norm and trace in it
**Step 1 (an irreducible cubic).** Over $\mathbb{F}_2$, $f(x) = x^3 + x + 1$ has no roots: $f(0) = 1$ and $f(1) = 1 + 1 + 1 = 1$. A cubic with no roots has no linear factor, hence is irreducible. So $\mathbb{F}_8 := \mathbb{F}_2[x]/(x^3+x+1)$ is a field (↩ S1E18), and writing $\theta$ for the class of $x$, its elements are $a + b\theta + c\theta^2$ with $a, b, c \in \mathbb{F}_2$: $2^3 = 8$ elements, a 3-dimensional $\mathbb{F}_2$-vector space with basis $\{1, \theta, \theta^2\}$.

**Step 2 (multiplication rule).** $\theta^3 = \theta + 1$ (since $-1 = 1$). Powers of $\theta$:

| $k$ | $\theta^k$ |
|---|---|
| 1 | $\theta$ |
| 2 | $\theta^2$ |
| 3 | $\theta + 1$ |
| 4 | $\theta^2 + \theta$ |
| 5 | $\theta^3 + \theta^2 = \theta^2 + \theta + 1$ |
| 6 | $\theta^3 + \theta^2 + \theta = \theta^2 + 1$ |
| 7 | $\theta^3 + \theta = 1$ |

All 7 nonzero elements appear, so $\mathbb{F}_8^\times$ is cyclic of order 7, generated by $\theta$.

**Step 3 (the matrix of $m_\theta$).** In the basis $(1, \theta, \theta^2)$: $\theta\cdot 1 = \theta \to (0,1,0)$; $\theta\cdot\theta = \theta^2 \to (0,0,1)$; $\theta\cdot\theta^2 = 1 + \theta \to (1,1,0)$. So
$$m_\theta = \begin{pmatrix} 0 & 0 & 1 \\ 1 & 0 & 1 \\ 0 & 1 & 0 \end{pmatrix},$$
the **companion matrix** of $x^3 + x + 1$ (a shape that returns in S3E02).

**Step 4 (invariants).** $\operatorname{Tr}(\theta) = 0$. Expanding along the first row, $\det m_\theta = 1 \cdot (1\cdot1 - 0\cdot0) = 1$. And $\det(xI - m_\theta) = x^3 + x + 1$ over $\mathbb{F}_2$, recovering the minimal polynomial.

**Step 5 (all eight elements).** Computing $\operatorname{Tr}$ and $N$ for every element (verified in Python):

| element | $0$ | $1$ | $\theta$ | $\theta^2$ | $\theta+1$ | $\theta^2+1$ | $\theta^2+\theta$ | $\theta^2+\theta+1$ |
|---|---|---|---|---|---|---|---|---|
| Tr | 0 | 1 | 0 | 0 | 1 | 1 | 0 | 1 |
| N | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |

$\operatorname{Tr}(1) = 3 \cdot 1 = 1$ in $\mathbb{F}_2$, since $m_1$ is the $3\times3$ identity. The trace is a nonzero linear functional $\mathbb{F}_8 \to \mathbb{F}_2$ (↩ S2E06); its kernel $\{0, \theta, \theta^2, \theta^2+\theta\}$ is a 2-dimensional subspace, a hyperplane, exactly as Season 2 predicts. Every nonzero element has norm $1$, as it must: $N$ is a multiplicative map $\mathbb{F}_8^\times \to \mathbb{F}_2^\times = \{1\}$.

### Example 3: a $60^\circ$ angle cannot be trisected
**Step 1 (the equation).** Trisecting $60^\circ$ means constructing $20^\circ$, equivalently constructing $c = \cos 20^\circ$. The triple-angle identity $\cos 3t = 4\cos^3 t - 3\cos t$ with $t = 20^\circ$ gives $\tfrac12 = 4c^3 - 3c$. Put $u = 2c$: then $u^3 - 3u - 1 = 0$.

**Step 2 (irreducible).** By the rational root test, a rational root of $u^3 - 3u - 1$ must be $\pm1$. But $1 - 3 - 1 = -3 \ne 0$ and $-1 + 3 - 1 = 1 \ne 0$. A cubic with no rational root is irreducible over $\mathbb{Q}$. So $[\mathbb{Q}(u):\mathbb{Q}] = 3$, and $\mathbb{Q}(c) = \mathbb{Q}(u)$.

**Step 3 (tower law).** If $c$ were constructible, it would lie in a field $M$ with $[M:\mathbb{Q}] = 2^k$ (§6). Then $\mathbb{Q} \subseteq \mathbb{Q}(c) \subseteq M$ and the tower law gives $2^k = [M:\mathbb{Q}(c)] \cdot 3$. But 3 does not divide $2^k$. Contradiction. $\blacksquare$

Numerically, $u = 2\cos 20^\circ \approx 1.87939$, and indeed $1.87939^3 - 3(1.87939) - 1 \approx 0$.

### Example 4: the norm finds inverses and units in $\mathbb{Q}(\sqrt[3]{2})$
Let $\gamma = \sqrt[3]{2}$, so $L = \mathbb{Q}(\gamma)$ has basis $\{1, \gamma, \gamma^2\}$ ($x^3 - 2$ is irreducible by the rational root test: $\pm1, \pm2$ are not roots). For $\beta = a + b\gamma + c\gamma^2$, multiplying the basis by $\beta$ and using $\gamma^3 = 2$:
- $\beta\cdot1 = a + b\gamma + c\gamma^2 \to (a, b, c)$
- $\beta\cdot\gamma = 2c + a\gamma + b\gamma^2 \to (2c, a, b)$
- $\beta\cdot\gamma^2 = 2b + 2c\gamma + a\gamma^2 \to (2b, 2c, a)$

$$m_\beta = \begin{pmatrix} a & 2c & 2b \\ b & a & 2c \\ c & b & a\end{pmatrix},\qquad N(\beta) = a^3 + 2b^3 + 4c^3 - 6abc, \qquad \operatorname{Tr}(\beta) = 3a.$$

For $\beta = 1 + \gamma$: $N(\beta) = 1 + 2 = 3$. The nonzero norm says $m_\beta$ is invertible, so $\beta^{-1}$ exists. To find it, guess from $1 + \gamma^3 = (1+\gamma)(1 - \gamma + \gamma^2)$: since $1 + \gamma^3 = 3$,
$$\frac{1}{1+\sqrt[3]2} = \frac{1 - \sqrt[3]2 + \sqrt[3]4}{3}.$$
Check: $(1+\gamma)(1 - \gamma + \gamma^2) = 1 - \gamma + \gamma^2 + \gamma - \gamma^2 + \gamma^3 = 1 + 2 = 3$. ✓ The norm $3$ is the product of $1+\gamma$ with its two complex "conjugates" $1 + \omega\gamma$ and $1 + \omega^2\gamma$, where $\omega = e^{2\pi i/3}$.

## Visual and animation notes
1. **Cold open:** cards labeled "4", "5", "7", "8", "9" glow green; "6", "10", "12" crack apart. (Number tower motif in the background.)
2. **"Forget the multiplication":** the field $\mathbb{C}$ shown as the plane; the multiplication table fades to grey, leaving only arrows (blue vectors) that can be added and scaled by real numbers. A "vector space" stamp lands on it (callback to S2E01's stamp).
3. **Degree as dimension:** $\mathbb{Q}(\sqrt2)$ drawn as a 2D lattice of points $a + b\sqrt2$ with axes "1" and "$\sqrt2$"; then a third and fourth axis "$\sqrt3$", "$\sqrt6$" fold out of the screen for $\mathbb{Q}(\sqrt2,\sqrt3)$. Basis/coordinates "camera overlay" motif.
4. **Tower law:** a building where each floor is a grid; floor 2 has $m$ columns, floor 3 has $n$ rows *per column*; the camera pulls back to show an $m \times n$ grid. Ledger on the side: "$[M:K] = mn$."
5. **$\mathbb{F}_8$ cube:** the 8 elements as vertices of a cube $\{0,1\}^3$ with axes $1, \theta, \theta^2$. Multiplication by $\theta$ animates as a permutation of the 7 nonzero vertices in a single 7-cycle (the powers table), with $0$ fixed. Linear-map motif: the cube's "grid" stays straight.
6. **Why $|F| = p^n$:** a dial with $p$ positions per coordinate, $n$ dials, odometer counting to $p^n$. A card labeled "6" tries to sit on a dial set and doesn't fit.
7. **Multiplication is a linear map:** the plane rotating and scaling under $m_{a+bi}$; the unit square becomes a square of area $a^2+b^2$ with an "Invariant" badge reading $\det = N(\alpha)$ that stays put while the basis "camera" changes.
8. **Trisection:** the $60^\circ$ angle; three equal sub-angles try to form; a tower of degree-2 floors ($1, 2, 4, 8, \dots$) rises, and a "3" block refuses to fit into any floor.

## Common misconceptions
- **Misconception:** "$\mathbb{Q}(\sqrt2)$ is bigger than $\mathbb{Q}$ in the sense of cardinality." **Reality:** both are countable. The degree measures size *as a vector space over $\mathbb{Q}$*, which is a different, structural notion of size.
- **Misconception:** "$\mathbb{F}_4 = \mathbb{Z}/4\mathbb{Z}$." **Reality:** $\mathbb{Z}/4$ has $2 \cdot 2 = 0$, so it is not a field. $\mathbb{F}_4 = \mathbb{F}_2[x]/(x^2+x+1)$ is a 2-dimensional vector space over $\mathbb{F}_2$, and in it $1 + 1 = 0$.
- **Misconception:** "The tower law needs the bases to be compatible somehow." **Reality:** any basis of $L/K$ and any basis of $M/L$ work; their pairwise products are automatically a basis of $M/K$.
- **Misconception:** "The field norm is a norm in the sense of S2 (a length)." **Reality:** it is a determinant. It can be negative ($N(1+\sqrt2) = 1 - 2 = -1$) and it is multiplicative, not subadditive. Only for $\mathbb{C}/\mathbb{R}$ does it coincide with a squared length.
- **Misconception:** "Constructible numbers are those of degree $2^k$." **Reality:** constructible implies degree $2^k$, but not conversely. There are numbers of degree 4 that are not constructible (the precise criterion uses the Galois group, ↩ S1E20).

## Exercises
- **Warm-up (computational):** In $\mathbb{Q}(\sqrt5)$, write the matrix of multiplication by $\alpha = 2 + \sqrt5$ in the basis $\{1, \sqrt5\}$, compute $N(\alpha)$ and $\operatorname{Tr}(\alpha)$, and use the norm to find $\alpha^{-1}$.
- **Core (conceptual):** (a) Show $\sqrt2 + \sqrt3$ does not lie in any of $\mathbb{Q}(\sqrt2)$, $\mathbb{Q}(\sqrt3)$, $\mathbb{Q}(\sqrt6)$. (b) Explain, using only the tower law, why $\mathbb{F}_{16}$ contains a copy of $\mathbb{F}_4$ but no copy of $\mathbb{F}_8$.
- **Stretch (proof or exploration):** Prove that doubling the cube is impossible: show $\sqrt[3]2$ is not constructible. Then explore: for each $n \le 4$, find an irreducible polynomial of degree $n$ over $\mathbb{F}_2$ and use it to build $\mathbb{F}_{2^n}$. (How many irreducible cubics over $\mathbb{F}_2$ are there?)

<details><summary>Hints and answers</summary>

- **Warm-up:** $\alpha\cdot1 = 2 + \sqrt5$, $\alpha\cdot\sqrt5 = 5 + 2\sqrt5$, so $m_\alpha = \begin{pmatrix}2 & 5\\ 1 & 2\end{pmatrix}$, $N(\alpha) = 4 - 5 = -1$, $\operatorname{Tr}(\alpha) = 4$. Since $\alpha\bar\alpha = N(\alpha)$ with $\bar\alpha = 2 - \sqrt5$, we get $\alpha^{-1} = \bar\alpha / N(\alpha) = -2 + \sqrt5$. Check: $(2+\sqrt5)(-2+\sqrt5) = 5 - 4 = 1$.
- **Core (a):** If $\sqrt2+\sqrt3 \in \mathbb{Q}(\sqrt2)$ then $\sqrt3 \in \mathbb{Q}(\sqrt2)$, contradicting Example 1, Step 2. Similarly for $\mathbb{Q}(\sqrt3)$. If it were in $\mathbb{Q}(\sqrt6)$, then so would be its square $5 + 2\sqrt6$ (fine) but also, with $\alpha = \sqrt2+\sqrt3$, the element $\alpha^3 = 11\sqrt2 + 9\sqrt3$, and $\alpha^3 - 9\alpha = 2\sqrt2 \in \mathbb{Q}(\sqrt6)$, which would force $\sqrt2 = a + b\sqrt6$; squaring leads to a contradiction as in Example 1. **(b):** $[\mathbb{F}_{16}:\mathbb{F}_2] = 4$. A subfield of size 4 has degree 2, and $2 \mid 4$ (it exists: the roots of $x^4 - x$). A subfield of size 8 would have degree 3, and $3 \nmid 4$.
- **Stretch:** $x^3 - 2$ is irreducible over $\mathbb{Q}$ (no rational roots among $\pm1,\pm2$), so $[\mathbb{Q}(\sqrt[3]2):\mathbb{Q}] = 3$, which is not a power of 2. Irreducibles: degree 2: $x^2+x+1$; degree 3: $x^3+x+1$ and $x^3+x^2+1$ (exactly two); degree 4: $x^4+x+1$ (also $x^4+x^3+1$ and $x^4+x^3+x^2+x+1$).

</details>

## Historical note
The idea that an extension field is a vector space over its base is surprisingly late. Pierre Wantzel proved the impossibility of trisecting the angle and doubling the cube in 1837 by arguing about the degrees of polynomials, without any vector spaces. Galois (1830) introduced the finite fields now named after him, and E. H. Moore proved in 1893 that every finite field is one of these "Galois fields," with a prime-power number of elements. Richard Dedekind spoke of the degree of a field extension and treated fields as having bases over subfields in his work on algebraic number theory in the 1870s–1890s, and Ernst Steinitz's 1910 paper *Algebraische Theorie der Körper* laid out abstract field theory systematically. The style used in this episode, where linear algebra does the heavy lifting, was popularized by Emil Artin, whose Notre Dame lectures *Galois Theory* (1942) rebuilt the whole subject on dimension counting and linear independence. Artin's approach is the reason most modern textbooks prove the tower law on page one of field theory.

## Connections
- **Callbacks:** ↩ S1E10 ($\mathbb{C}$ as pairs; multiplication by $i$ as a quarter turn), ↩ S1E11 (countability of $\mathbb{Q}$ and of $\mathbb{Q}(\sqrt2)$), ↩ S1E17 (first isomorphism theorem), ↩ S1E18 (quotient rings $K[x]/(m)$), ↩ S1E19 (fields, degree, impossible constructions), ↩ S1E20 (Galois groups), ↩ S2E01 (vector space axioms), ↩ S2E02 (basis and dimension), ↩ S2E03 (linear maps), ↩ S2E04 (matrices, change of basis), ↩ S2E06 (linear functionals: the trace form), ↩ S2E10 (dimensions multiply in tensor products), ↩ S2E11 (determinant), ↩ S2E12 (trace, characteristic polynomial), ↩ S2E13 (Cayley–Hamilton; companion matrices).
- **Sets up:** ↪ S3E02 (replace the field of scalars by a ring: modules; companion matrices return as the rational canonical form), ↪ S3E03 (Galois groups and symmetry groups acting by linear maps), ↪ S3E04 (characters of $\mathbb{F}_q$ and of $\mathbb{Z}/n$), ↪ S3E12 (the "forgetful" move from fields to vector spaces is a functor).
- **Side quests:** "Linear algebra over $\mathbb{F}_2$: codes and puzzles" (attaches after S2E03; picked up in S3E02); "Cayley–Dickson: $\mathbb{H}$, $\mathbb{O}$ and beyond" (the quaternions are a 4-dimensional $\mathbb{R}$-algebra that is *not* a field); "p-adic numbers."

## References
- **Primary / historical:** P. L. Wantzel, "Recherches sur les moyens de reconnaître si un problème de géométrie peut se résoudre avec la règle et le compas," *Journal de Mathématiques Pures et Appliquées* 2 (1837). E. Artin, *Galois Theory*, Notre Dame Mathematical Lectures No. 2 (1942; Dover reprint), sections on the degree of an extension and on linear independence. E. Steinitz, "Algebraische Theorie der Körper," *Journal für die reine und angewandte Mathematik* 137 (1910).
- **Textbooks:** D. S. Dummit and R. M. Foote, *Abstract Algebra*, 3rd ed. (Wiley, 2004), Ch. 13 "Field Theory" (degree, tower law, constructions, finite fields) and Ch. 14 "Galois Theory." M. Artin, *Algebra*, 2nd ed. (Pearson, 2011), Ch. 15 "Fields." I. Stewart, *Galois Theory*, 4th ed. (CRC Press, 2015), the chapters on the degree of an extension, ruler-and-compass constructions, and finite fields. R. Lidl and H. Niederreiter, *Introduction to Finite Fields and Their Applications*, revised ed. (Cambridge University Press, 1994), Ch. 2 (structure of finite fields; norm and trace).
- **Accessible:** S. Axler, *Linear Algebra Done Right*, 3rd ed. (Springer, 2015), for the linear-algebra facts used (determinant and trace as invariants of an operator). I. Stewart's book above is written for a broad audience and is the best follow-up for the impossible constructions.
