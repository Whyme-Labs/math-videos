# S2E14: Length and Angle Are a Choice

> **Season / Act:** Season 2, Part A, Act V (Geometry: Inner Products) · **Target runtime:** 18–22 min ·
> **Prerequisites:** ↩ S2E04 (a basis as a camera), ↩ S2E06 (covectors as level-line stacks), ↩ S2E09 (symmetric bilinear forms, Gram matrices, signature); ↩ S1E07–S1E08 (√2 and why we need ℝ); outside knowledge: the dot product in the plane, integrals of continuous functions ·
> **Builds toward:** ↪ S2E15 (complex inner products), ↪ S2E16 (inner product as an isomorphism $V \to V^*$), ↪ S2E17 (projection, Gram–Schmidt), ↪ S2E18 (principal axes), ↪ S2E21 (the diamond and the square as unit balls of norms), ↪ S2E24 (Hölder's inequality), ↪ S2E28 (Hilbert spaces), ↪ S2E29 (Fourier orthogonality), ↪ S3E10 (Riemannian metrics)

## Learning objectives
By the end of this lesson the viewer can:
1. Explain why a bare vector space has no notion of length or angle, and define an inner product as a symmetric, positive definite bilinear form.
2. Describe every inner product on $\mathbb R^n$ as $\langle x, y\rangle_G = x^{\mathsf T}Gy$ with $G$ symmetric positive definite, and draw its "unit circle" (an ellipse).
3. State and prove the Cauchy–Schwarz inequality, and use it to define angles and prove the triangle inequality.
4. Compute lengths, angles, and orthogonality for functions with $\langle f, g\rangle = \int_a^b fg$.
5. Use the parallelogram law and polarization to decide whether a length function comes from an inner product, and recognize the diamond ($\ell^1$) and the square ($\ell^\infty$) as lengths with no angles behind them.

## Cold open
*(Narration draft.)*

A simple question. Take the constant function $1$ and the function $x$. Are they perpendicular?

Functions are vectors (you can add and scale them), so let's ask.

Answer one: write each polynomial by its coefficients. $1$ is $(1, 0)$, $x$ is $(0, 1)$. Those are the two axes of the plane. Perpendicular.

Answer two: an engineer measures how two signals overlap by multiplying them and integrating. From $-1$ to $1$, the integral of $1 \cdot x$ is zero; the positive half cancels the negative half. Perpendicular again.

Answer three: do the same from $0$ to $1$. Now the overlap is one half, and if you run the numbers, the angle between $1$ and $x$ is exactly thirty degrees.

Three reasonable answers that disagree, and none of them is a mistake.

The question was incomplete. Nothing in this season has had a length yet. A vector space knows how to add and how to scale, and that's all. Length and angle are not facts about vectors. They are extra structure, and you have to choose it. Today: what that choice is, how many choices there are, and how to tell when a ruler secretly has a protractor hiding inside it.

## The story

### 1. The naive attempt: just dot the coordinates

In the plane we learned $u \cdot v = u_1v_1 + u_2v_2$, $\lVert v\rVert = \sqrt{v\cdot v}$, and $\cos\theta = \frac{u\cdot v}{\lVert u\rVert\lVert v\rVert}$. The obvious plan for any vector space: pick a basis and dot the coordinates.

The crisis is that the answer depends on the camera (↩ S2E04). In $\mathbb R^2$ take the basis $b_1 = (1, 0)$, $b_2 = (1, 1)$. Their coordinates in this basis are $(1,0)$ and $(0,1)$, so "dotting coordinates" says they are perpendicular unit vectors. In the standard picture they meet at 45° and $b_2$ has length $\sqrt2$. For polynomials there isn't even a standard basis to break the tie; that's the cold open.

Precisely: under a change of basis $x = Px'$, the dot product becomes $x^{\mathsf T}y = x'^{\mathsf T}(P^{\mathsf T}P)\,y'$, which is the dot product of the new coordinates only when $P^{\mathsf T}P = I$. The dot product of coordinates is **not an invariant**. "Length" was never a property of the vector space; it was a bilinear form we had silently chosen, the one whose Gram matrix (↩ S2E09) is $I$ in our favorite basis. Let's name the choice.

### 2. The construction: choose a ruler and a protractor

> **Definition (real inner product).** An **inner product** on a real vector space $V$ is a function $\langle\cdot,\cdot\rangle : V \times V \to \mathbb R$ that is
> 1. **bilinear:** linear in each slot (↩ S2E09);
> 2. **symmetric:** $\langle u, v\rangle = \langle v, u\rangle$;
> 3. **positive definite:** $\langle v, v\rangle > 0$ for every $v \neq 0$.
>
> A real vector space with a chosen inner product is an **inner product space**.

So an inner product is exactly a symmetric bilinear form of signature $(n, 0, 0)$ from S2E09. Nothing new was invented; we singled out the forms that never give a zero or negative "squared length."

**All inner products on $\mathbb R^n$.** A bilinear form is determined by its Gram matrix $G_{ij} = \langle e_i, e_j\rangle$, with $\langle x, y\rangle = x^{\mathsf T}Gy$. Symmetry means $G^{\mathsf T} = G$; positive definiteness means $x^{\mathsf T}Gx > 0$ for $x \neq 0$. So

> **inner products on $\mathbb R^n$ ↔ symmetric positive definite matrices $G$**, via $\langle x, y\rangle_G = x^{\mathsf T}Gy$.

That is a whole open cone of choices. The dot product is $G = I$. The physicist's form $2x^2 + 2xy + 2y^2$ from S2E09's cold open is the squared length for $G = \begin{pmatrix}2 & 1\\ 1 & 2\end{pmatrix}$ (Worked Example 1).

**What a choice looks like.** Draw the **unit circle** $\lbrace v : \langle v, v\rangle = 1\rbrace$. For $G = I$ it's round; for any other positive definite $G$, the curve $x^{\mathsf T}Gx = 1$ is an **ellipse** (an ellipsoid in higher dimensions). To someone living inside $\langle\cdot,\cdot\rangle_G$, that ellipse *is* a circle: every point on it is at distance 1 from the origin.

**Build or Describe?** That last sentence is a theorem.

> **Theorem.** Every $n$-dimensional real inner product space has an **orthonormal basis** $q_1, \dots, q_n$ ($\langle q_i, q_j\rangle = \delta_{ij}$). In its coordinates, $\langle u, v\rangle$ is the ordinary dot product.

*Proof.* By S2E09, a symmetric form over $\mathbb R$ has a basis in which its Gram matrix is diagonal with entries in $\lbrace 1, -1, 0\rbrace$ (diagonalize by congruence, then rescale each basis vector by $1/\sqrt{\lvert d_i\rvert}$). A diagonal entry $\le 0$ would be a basis vector $q_i$ with $\langle q_i, q_i\rangle \le 0$, contradicting positive definiteness. So the Gram matrix is $I$. $\blacksquare$

So "length is a choice" has a reassuring partner: **every choice looks the same from the inside**; any two $n$-dimensional inner product spaces are isometric. What differs between $\langle\cdot,\cdot\rangle_I$ and $\langle\cdot,\cdot\rangle_G$ on the *same* $\mathbb R^n$ is which vectors are perpendicular and which ellipse gets to be the circle.

### 3. Length, Cauchy–Schwarz, and angle

Define the **length** $\lVert v\rVert = \sqrt{\langle v, v\rangle}$. (The square root needs ℝ, not ℚ: the diagonal of the unit square has length $\sqrt2$, where Season 1's story began, ↩ S1E07–S1E08.) Call $u, v$ **orthogonal** if $\langle u, v\rangle = 0$. Expanding by bilinearity,
$$\lVert u + v\rVert^2 = \lVert u\rVert^2 + 2\langle u, v\rangle + \lVert v\rVert^2 = \lVert u\rVert^2 + \lVert v\rVert^2 \quad (u \perp v),$$
which is **Pythagoras' theorem**, in one line, in every inner product space, functions included.

To define angle by $\cos\theta = \frac{\langle u, v\rangle}{\lVert u\rVert\lVert v\rVert}$ we need that fraction to lie in $[-1, 1]$.

> **Theorem (Cauchy–Schwarz).** In any real inner product space, $\lvert\langle u, v\rangle\rvert \le \lVert u\rVert\,\lVert v\rVert$ for all $u, v$, with equality if and only if $u$ and $v$ are linearly dependent.

*Proof.* If $v = 0$, both sides are $0$ and $u, v$ are dependent. Let $v \neq 0$. For every real $t$, positivity gives
$$0 \le \lVert u - tv\rVert^2 = \lVert u\rVert^2 - 2t\langle u, v\rangle + t^2\lVert v\rVert^2 .$$
This quadratic in $t$ has positive leading coefficient and never goes below zero, so it has at most one real root, and its discriminant is $\le 0$:
$$4\langle u, v\rangle^2 - 4\lVert u\rVert^2\lVert v\rVert^2 \le 0 .$$
Take square roots. Equality holds iff the discriminant is $0$, iff the quadratic has a root $t_0$, iff $\lVert u - t_0v\rVert = 0$, iff $u = t_0v$. $\blacksquare$

Geometrically, the minimizing $t_0 = \langle u, v\rangle/\lVert v\rVert^2$ makes $u - t_0v \perp v$, and $t_0v$ is the shadow of $u$ on the line of $v$. Cauchy–Schwarz says **a shadow is never longer than the object** (↪ S2E17). In statistics it says a correlation coefficient lies in $[-1, 1]$: Pearson's $r$ is literally the cosine of the angle between two centered data vectors.

> **Definition (angle).** For nonzero $u, v$, the angle $\theta \in [0, \pi]$ is given by $\cos\theta = \dfrac{\langle u, v\rangle}{\lVert u\rVert\,\lVert v\rVert}$.

This is not a metaphor: two vectors span a plane, which (Section 2) is isometric to the Euclidean plane, and $\theta$ is the protractor angle there. The cold open's 30° is a real angle between two real arrows named $1$ and $x$.

> **Corollary (triangle inequality).** $\lVert u + v\rVert \le \lVert u\rVert + \lVert v\rVert$.

*Proof.* $\lVert u + v\rVert^2 = \lVert u\rVert^2 + 2\langle u, v\rangle + \lVert v\rVert^2 \le \lVert u\rVert^2 + 2\lVert u\rVert\lVert v\rVert + \lVert v\rVert^2 = (\lVert u\rVert + \lVert v\rVert)^2$. $\blacksquare$

So every inner product yields a length with three properties: $\lVert v\rVert > 0$ for $v \neq 0$, $\lVert cv\rVert = \lvert c\rvert\lVert v\rVert$, and the triangle inequality. S2E21 takes that list as the *definition* of a **norm**, with no inner product required.

### 4. Inner products on function spaces

The proofs above used only the three axioms, so they work verbatim for functions. On $C[a, b]$ (continuous real functions) set
$$\langle f, g\rangle = \int_a^b f(x)\,g(x)\,dx .$$
Positive definiteness uses continuity: if $f(x_0) \neq 0$, then $f^2 > \tfrac12 f(x_0)^2$ on a small interval around $x_0$, so $\int f^2 > 0$. Continuity matters: among Riemann-integrable functions, the function that is $1$ at $x = \tfrac12$ and $0$ elsewhere is nonzero with $\int f^2 = 0$. Part B fixes this by declaring such functions equal to zero, a quotient (↩ S1E05) that S2E22 calls "equal almost everywhere."

Cauchy–Schwarz for functions reads $\left(\int_a^b fg\right)^2 \le \int_a^b f^2 \int_a^b g^2$. With $g = 1$ on $[0,1]$: *the square of the average is at most the average of the square.*

The cold open is now a computation. On $[-1, 1]$, $\langle 1, x\rangle = \int_{-1}^1 x\,dx = 0$. On $[0, 1]$ the inner product is different and the angle is 30° (Worked Example 2). The coefficient dot product is a third inner product, the one with Gram matrix $I$ in the basis $1, x$. All three are legitimate; choose the one that matches what "close" should mean. Other standard choices are weighted integrals $\int_a^b fg\,w$ (Chebyshev and Hermite polynomials are orthogonal for particular weights $w$), and on $[-\pi, \pi]$ the functions $1, \cos x, \sin x, \cos 2x, \sin 2x, \dots$ are pairwise orthogonal: the seed of Fourier analysis (↪ S2E29).

### 5. Rulers without protractors: the parallelogram law

An inner product gives a length. Does the length remember the inner product? Expand $\lVert u \pm v\rVert^2 = \lVert u\rVert^2 \pm 2\langle u, v\rangle + \lVert v\rVert^2$ and subtract:

> **Polarization identity.** $\displaystyle \langle u, v\rangle = \tfrac14\big(\lVert u + v\rVert^2 - \lVert u - v\rVert^2\big).$

A ruler determines its protractor. But there are good rulers that may not come from any inner product. In the plane:
- **taxicab length** $\lVert (x, y)\rVert_1 = \lvert x\rvert + \lvert y\rvert$ (a taxi on a street grid): unit ball a **diamond**;
- **chessboard length** $\lVert (x, y)\rVert_\infty = \max(\lvert x\rvert, \lvert y\rvert)$ (moves of a chess king): unit ball a **square**;
- **Euclidean length** $\lVert (x, y)\rVert_2 = \sqrt{x^2 + y^2}$: the round **circle**.

All three are positive, scale correctly, and satisfy the triangle inequality. Do the diamond and the square secretly come from inner products? We need a test that uses lengths alone. Add the two expansions instead of subtracting:

> **Parallelogram law.** If $\lVert\cdot\rVert$ comes from an inner product, then
> $$\lVert u + v\rVert^2 + \lVert u - v\rVert^2 = 2\lVert u\rVert^2 + 2\lVert v\rVert^2 .$$
> The squares of a parallelogram's two diagonals add up to the squares of its four sides.

The converse is the remarkable part.

> **Theorem (Jordan–von Neumann, 1935).** A norm comes from an inner product if and only if it satisfies the parallelogram law. The inner product is then given by polarization.

*Proof sketch.* Define $\langle u, v\rangle$ by polarization. Symmetry is immediate and $\langle v, v\rangle = \tfrac14\lVert 2v\rVert^2 = \lVert v\rVert^2$. The work is linearity in the first slot. Fix $w$ and write $\varphi(u) = \langle u, w\rangle$. Applying the parallelogram law to the pairs $(u + w, v)$ and $(u - w, v)$ and subtracting gives $\varphi(u + v) + \varphi(u - v) = 2\varphi(u)$, from which additivity $\varphi(a + b) = \varphi(a) + \varphi(b)$ follows. Additivity gives $\varphi(cu) = c\varphi(u)$ for rational $c$; both sides are continuous in $c$ (the triangle inequality makes norms continuous) and ℚ is dense in ℝ (↩ S1E07), so it holds for all real $c$. $\blacksquare$

Test the diamond and the square on $u = (1, 0)$, $v = (0, 1)$ (Worked Example 3): both fail. **They are lengths with no angle behind them.** In taxicab geometry Pythagoras is false (the unit square's diagonal has length 2, not $\sqrt2$), and "the angle between two streets" has no consistent meaning. In the family $\lVert x\rVert_p = (\lvert x_1\rvert^p + \lvert x_2\rvert^p)^{1/p}$, whose unit balls morph from diamond ($p = 1$) through circle ($p = 2$) to square ($p \to \infty$), only $p = 2$ passes (Exercise 5).

**Payoff.** "Are $1$ and $x$ perpendicular?" is like "is this price high?" without naming a currency. A vector space carries no ruler. An inner product is a choice of ruler *and* protractor, and once chosen you get Euclid for free: Pythagoras, Cauchy–Schwarz, the triangle inequality, angles. Some rulers come without a protractor, and the parallelogram law is the litmus test.

**Zoom out (thread 6, duality).** An inner product also turns each vector $v$ into a covector $\langle\cdot, v\rangle$ (↩ S2E06) whose orange level lines are perpendicular to the blue arrow. S2E16 shows this is an isomorphism $V \cong V^*$, the hidden reason we pretend rows and columns are the same.

**Teaser.** Over ℂ this construction breaks at once: the "length" of $(1, i)$ comes out zero (↪ S2E15). And the diamond and the square, demoted today to "rulers without protractors," come back in infinite dimensions as $\ell^1$ and $\ell^\infty$, where the choice of ruler decides not just which vectors are perpendicular but which sequences converge at all (↪ S2E21).

## Worked examples

### Example 1: A tilted ruler
Let $G = \begin{pmatrix}2 & 1\\ 1 & 2\end{pmatrix}$, so $\langle x, y\rangle_G = 2x_1y_1 + x_1y_2 + x_2y_1 + 2x_2y_2$.

**Inner product?** Bilinear and symmetric. Completing the square, $\langle x, x\rangle_G = 2\big(x_1 + \tfrac12x_2\big)^2 + \tfrac32x_2^2 > 0$ unless $x = 0$. ✓

**The standard axes.** $\langle e_1, e_1\rangle_G = \langle e_2, e_2\rangle_G = 2$ and $\langle e_1, e_2\rangle_G = 1$. So $\lVert e_1\rVert_G = \lVert e_2\rVert_G = \sqrt2$ and $\cos\theta = \frac{1}{\sqrt2\sqrt2} = \frac12$: $\theta = 60^\circ$. Here the standard axes meet like two edges of an equilateral triangle.

**Perpendicular to $e_1$.** $\langle e_1, (a, b)\rangle_G = 2a + b = 0$ gives $w = (1, -2)$, with $\lVert w\rVert_G^2 = 2 - 4 + 8 = 6$. Pythagoras: $e_1 + w = (2, -2)$ has $\lVert e_1 + w\rVert_G^2 = 8 - 8 + 8 = 8 = 2 + 6$. ✓ So $q_1 = e_1/\sqrt2$, $q_2 = (1, -2)/\sqrt6$ is an orthonormal basis.

**Cauchy–Schwarz and polarization.** For $u = (1, 0)$, $v = (1, 1)$: $\langle u, v\rangle_G = 3$, $\lVert u\rVert_G^2 = 2$, $\lVert v\rVert_G^2 = 6$, and $9 \le 12$. ✓ From lengths alone: $\lVert u + v\rVert_G^2 = \lVert (2,1)\rVert_G^2 = 8 + 4 + 2 = 14$ and $\lVert u - v\rVert_G^2 = \lVert (0,-1)\rVert_G^2 = 2$, so $\tfrac14(14 - 2) = 3$. ✓

**The unit circle.** Along $(1,1)/\sqrt2$ the form equals $\tfrac12(2 + 2 + 2) = 3$; along $(1,-1)/\sqrt2$ it equals $\tfrac12(2 - 2 + 2) = 1$. So the "circle" $2x^2 + 2xy + 2y^2 = 1$ is an ellipse reaching Euclidean distance $1/\sqrt3$ along the diagonal and $1$ along the anti-diagonal. (These are the eigenvalues $3, 1$ of $G$ with eigenvectors $(1, \pm1)$: principal axes, ↪ S2E18.)

### Example 2: Angles between polynomials
Use $\langle f, g\rangle = \int_0^1 fg$ and the moments $\int_0^1 x^k\,dx = \frac1{k+1}$.

**The cold open.** $\langle 1, x\rangle = \tfrac12$, $\lVert 1\rVert = 1$, $\lVert x\rVert = 1/\sqrt3$, so $\cos\theta = \frac{1/2}{1/\sqrt3} = \frac{\sqrt3}2$ and $\theta = 30^\circ$.

**Making them perpendicular.** The shadow of $x$ on $1$ is $\frac{\langle x, 1\rangle}{\lVert 1\rVert^2}1 = \tfrac12$, so $x - \tfrac12 \perp 1$: $\int_0^1 (x - \tfrac12)\,dx = 0$. ✓ Its squared length is $\tfrac13 - \tfrac12 + \tfrac14 = \tfrac1{12}$, so $\lbrace 1, \sqrt{12}(x - \tfrac12)\rbrace$ is orthonormal.

**$x$ and $x^2$ are nearly parallel.** $\langle x, x^2\rangle = \tfrac14$, $\lVert x\rVert^2 = \tfrac13$, $\lVert x^2\rVert^2 = \tfrac15$, so
$$\cos\theta = \frac{1/4}{\sqrt{1/15}} = \frac{\sqrt{15}}4 \approx 0.968, \qquad \theta \approx 14.5^\circ .$$
High powers of $x$ on $[0,1]$ point in almost the same direction, which is why orthogonal bases are worth building (↪ S2E17).

### Example 3: The parallelogram test on three rulers
Take $u = (1, 0)$, $v = (0, 1)$, so $u \pm v = (1, \pm1)$, and $\lVert u\rVert = \lVert v\rVert = 1$ in all three norms, making the right side $2 + 2 = 4$.

| Ruler | $\lVert u + v\rVert$, $\lVert u - v\rVert$ | $\lVert u+v\rVert^2 + \lVert u-v\rVert^2$ | vs. $4$ |
|---|---|---|---|
| $\ell^2$ (circle) | $\sqrt2, \sqrt2$ | $4$ | passes |
| $\ell^1$ (diamond) | $2, 2$ | $8$ | **fails** |
| $\ell^\infty$ (square) | $1, 1$ | $2$ | **fails** |

One counterexample suffices: no inner product has the diamond or the square as its unit circle. The diamond's diagonals are too long; the square's are too short.

### Example 4: The same test on functions
On $C[0, 1]$ let $f(x) = x$, $g(x) = 1 - x$, so $f + g = 1$ and $f - g = 2x - 1$.
- **$L^2$**, $\lVert h\rVert_2^2 = \int_0^1 h^2$: $\lVert f\rVert_2^2 = \lVert g\rVert_2^2 = \tfrac13$, $\lVert f + g\rVert_2^2 = 1$, $\lVert f - g\rVert_2^2 = \int_0^1(2x - 1)^2 = \tfrac13$. LHS $\tfrac43$ = RHS $\tfrac43$. Passes, as it must.
- **$L^1$**, $\lVert h\rVert_1 = \int_0^1\lvert h\rvert$: norms $\tfrac12, \tfrac12$; $\lVert f + g\rVert_1 = 1$, $\lVert f - g\rVert_1 = \tfrac12$. LHS $1 + \tfrac14 = \tfrac54$, RHS $\tfrac14 + \tfrac14 + \tfrac14 + \tfrac14 = 1$. **Fails.**
- **Sup**, $\lVert h\rVert_\infty = \max\lvert h\rvert$: all four norms equal $1$. LHS $2$, RHS $4$. **Fails.**

"Average squared size" has angles; "total area" and "biggest height" don't. These are the function versions of circle, diamond, and square, and S2E21 is about them.

## Visual and animation notes
1. **Cold open.** Graphs of $1$ and $x$ collapse into two blue arrows (motif: *Vectors*). Three protractor cards slide in, labelled "coefficients," "$\int_{-1}^1$," "$\int_0^1$," reading 90°, 90°, 30°, and flicker in disagreement.
2. **The camera problem.** $b_1 = (1,0)$ and $b_2 = (1,1)$ in the plane; the coordinate camera (motif: *Basis / coordinates*) switches basis, and a "dot of coordinates" meter jumps from $1$ to $0$ while the arrows don't move.
3. **Many unit circles.** A fixed plane; the ellipse $x^{\mathsf T}Gx = 1$ morphs through several positive definite $G$. An inhabitant walks each ellipse, odometer stuck at 1. Callback stamp ↩ S2E09.
4. **All choices look alike.** A grid transformation (motif: *Linear map*) carries a tilted ellipse onto the round circle and an orthonormal pair onto $e_1, e_2$; a badge "isometric to ℝⁿ" stays put (motif: *Invariants*).
5. **Cauchy–Schwarz as a shadow.** $u$ casts its shadow on the line of $v$, never longer than $u$. Then the parabola $t \mapsto \lVert u - tv\rVert^2$ hovers above the axis, touching it only when $u$ swings onto the line of $v$.
6. **Angle between functions.** The plane spanned by $1$ and $x$ drawn as an ordinary Euclidean plane; arrows 30° apart; $x - \tfrac12$ snaps to perpendicular.
7. **Rulers without protractors (key visual).** Diamond, circle, square side by side, then one unit ball morphing as $p$ slides from 1 to ∞ (motif: *Norms*). A balance scale compares diagonals² with sides² and levels only at $p = 2$. Stamp ↪ S2E21.
8. **Duality teaser.** A blue arrow $v$ sprouts an orange stack of level lines perpendicular to it (motif: *Covectors*), labelled $\langle\cdot, v\rangle$; stamp ↪ S2E16.

## Common misconceptions
- **Misconception:** The inner product is the dot product of coordinates. **Reality:** only in an orthonormal basis for that inner product. In general $\langle x, y\rangle = x^{\mathsf T}Gy$, and $G$ becomes $P^{\mathsf T}GP$ under a change of basis.
- **Misconception:** Whether two vectors are perpendicular is a fact about the vectors. **Reality:** it depends on the chosen inner product: $e_1$ and $e_2$ meet at 60° in Example 1.
- **Misconception:** Every way of measuring length gives a way to measure angles. **Reality:** only norms satisfying the parallelogram law come from inner products. Taxicab and chessboard lengths have no angles.
- **Misconception:** The "angle between two functions" is just an analogy. **Reality:** two functions span a plane isometric to the Euclidean plane; the angle is a genuine protractor angle there.
- **Misconception:** $\int fg$ is an inner product on any space of integrable functions. **Reality:** positive definiteness fails once a nonzero function can have $\int f^2 = 0$; "almost everywhere" (↪ S2E22) repairs it.

## Exercises
- **Warm-up (computational).**
  1. For $G = \begin{pmatrix}3 & 1\\ 1 & 1\end{pmatrix}$, check that $\langle\cdot,\cdot\rangle_G$ is an inner product, find the angle between $e_1$ and $e_2$, and find a nonzero vector $G$-orthogonal to $e_1$.
  2. On $[-1, 1]$ with $\langle f, g\rangle = \int_{-1}^1 fg$, find $a, b$ such that $x^2 - a - bx$ is orthogonal to $1$ and to $x$.
- **Core (conceptual).**
  3. Show that $\langle u, v\rangle = u_1v_1 - u_2v_2$ on $\mathbb R^2$ is bilinear and symmetric but not an inner product, and find $u, v$ violating Cauchy–Schwarz. Which step of the proof breaks?
  4. Show that the sum of two inner products is an inner product, but the difference need not be. What shape does the set of all inner products on $\mathbb R^n$ have?
- **Stretch (proof or exploration).**
  5. Show that for $1 \le p < \infty$ the $\ell^p$ length on $\mathbb R^2$ satisfies the parallelogram law for $u = e_1$, $v = e_2$ only when $p = 2$.
  6. Fill in the Jordan–von Neumann proof: derive $\varphi(u + v) + \varphi(u - v) = 2\varphi(u)$ from the parallelogram law, deduce additivity, then homogeneity for integers, rationals, and reals.

<details><summary>Hints and answers</summary>

1. $G_{11} = 3 > 0$ and $\det G = 2 > 0$. $\lVert e_1\rVert = \sqrt3$, $\lVert e_2\rVert = 1$, $\langle e_1, e_2\rangle = 1$, so $\cos\theta = 1/\sqrt3$, $\theta \approx 54.7^\circ$. Orthogonal to $e_1$: $3a + b = 0$, e.g. $(1, -3)$.
2. $\int_{-1}^1 x(x^2 - a - bx) = -\tfrac{2b}3 = 0$ gives $b = 0$; $\int_{-1}^1 (x^2 - a) = \tfrac23 - 2a = 0$ gives $a = \tfrac13$. The result $x^2 - \tfrac13$ is a multiple of the Legendre polynomial $P_2$.
3. $\langle e_2, e_2\rangle = -1$, so positivity fails. $u = (1, 0)$, $v = (1, 1)$: $\langle u, v\rangle^2 = 1 > \langle u, u\rangle\langle v, v\rangle = 1\cdot 0$. The step "$\lVert u - tv\rVert^2 \ge 0$" is false. (This is a Minkowski-type form, ↩ S2E09.)
4. Sum: bilinear, symmetric, and $\langle v,v\rangle_1 + \langle v,v\rangle_2 > 0$. Difference: with $\langle\cdot,\cdot\rangle_2 = 2\langle\cdot,\cdot\rangle_1$ it is $-\langle\cdot,\cdot\rangle_1$, negative definite. Inner products ↔ SPD matrices form a convex cone (closed under sums and positive multiples).
5. $\lVert e_1 \pm e_2\rVert_p = 2^{1/p}$, so the left side is $2\cdot 2^{2/p}$ and the right side is $4$; equal iff $2^{2/p} = 2$, iff $p = 2$.
6. Parallelogram law on $(u + w, v)$ and on $(u - w, v)$, subtracted, gives $8\varphi(u)$ on the right. Then put $u = \frac{a + b}2$, $v = \frac{a - b}2$ and use $\varphi(2z) = 2\varphi(z)$ (the case $v = u$, since $\varphi(0) = 0$). Integers by induction; rationals from $q\,\varphi(\tfrac pq u) = \varphi(pu)$; reals by continuity and density of ℚ.

</details>

## Historical note
The inequality has three names because it was found three times. Augustin-Louis Cauchy proved the finite-sum version $\big(\sum a_ib_i\big)^2 \le \sum a_i^2\sum b_i^2$ in his *Cours d'analyse* (1821). Viktor Bunyakovsky published the integral version in 1859 in a memoir of the St. Petersburg Academy. Hermann Amandus Schwarz found the integral version again in the 1880s, in work on minimal surfaces, using the discriminant argument given above. The phrase "inner product" goes back to Hermann Grassmann's *Ausdehnungslehre*. The leap to infinite dimensions came with Hilbert's work on integral equations (1904–1910) and especially Erhard Schmidt's 1908 paper, which described square-summable sequences in openly Euclidean language: inner products, orthogonality, Pythagoras, and the notation $\lVert x\rVert$. Finally, "which lengths come from an angle?" was settled by the physicist Pascual Jordan and John von Neumann in a short 1935 paper in the *Annals of Mathematics*.

## Connections
- **Callbacks:** ↩ S1E05 (quotients, for "almost everywhere"), ↩ S1E07 (√2; density of ℚ), ↩ S1E08 (square roots need ℝ), ↩ S2E01 (functions as vectors), ↩ S2E04 (a basis as a camera), ↩ S2E06 (covectors as level-line stacks), ↩ S2E09 (Gram matrices, congruence, signature, the physicist's form)
- **Sets up:** ↪ S2E15 (the conjugate in $\sum u_k\overline{v_k}$), ↪ S2E16 ($V \cong V^*$), ↪ S2E17 (shadows, Gram–Schmidt, least squares), ↪ S2E18 (principal axes of $x^{\mathsf T}Gx = 1$), ↪ S2E21 (norms without inner products; diamond and square as the unit balls of $\ell^1$, $\ell^\infty$), ↪ S2E22 (almost everywhere), ↪ S2E24 (Hölder as Cauchy–Schwarz for $p \neq 2$), ↪ S2E28 (Hilbert spaces; the parallelogram law drives the projection theorem), ↪ S2E29 (orthogonality of sines and cosines; Legendre polynomials), ↪ S3E10 (a Riemannian metric is an inner product at every point)
- **Side quests:** *Linear algebra in machine learning* (after S2E19: cosine similarity and dot-product attention are inner products); *Special relativity* (after S2E09: drop positive definiteness)

## References
- **Primary / historical:**
  - A.-L. Cauchy, *Cours d'analyse de l'École Royale Polytechnique*, Paris, 1821 (the finite-sum inequality appears in the notes at the end of the volume).
  - E. Schmidt, "Über die Auflösung linearer Gleichungen mit unendlich vielen Unbekannten," *Rendiconti del Circolo Matematico di Palermo* 25 (1908).
  - P. Jordan and J. von Neumann, "On inner products in linear, metric spaces," *Annals of Mathematics* (2) 36 (1935).
- **Textbooks:**
  - S. Axler, *Linear Algebra Done Right*, 4th ed., Springer, 2024: Chapter 6 "Inner Product Spaces."
  - P. R. Halmos, *Finite-Dimensional Vector Spaces*, 2nd ed., Van Nostrand, 1958 (reprinted by Springer): Chapter III "Orthogonality."
  - E. Kreyszig, *Introductory Functional Analysis with Applications*, Wiley, 1978: Chapter 3 "Inner Product Spaces. Hilbert Spaces" (including the parallelogram law).
- **Accessible:**
  - J. M. Steele, *The Cauchy–Schwarz Master Class: An Introduction to the Art of Mathematical Inequalities*, Cambridge University Press, 2004: Chapter 1 (proofs and history of Cauchy–Schwarz).
