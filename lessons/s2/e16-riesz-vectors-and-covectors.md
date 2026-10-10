# S2E16: Identifying Vectors and Covectors

> **Season / Act:** Season 2, Part A, Act V (Geometry: Inner Products) · **Target runtime:** 18–22 min ·
> **Prerequisites:** S2E06 (covectors as level-line stacks), S2E08 (dual map and transpose, natural vs. chosen isomorphisms), S2E09 (bilinear forms as maps $V \to V^*$), S2E14–S2E15 (real and complex inner products); outside knowledge: partial derivatives ·
> **Builds toward:** S2E17 (orthogonal complements), S2E18 (self-adjoint maps), S2E24 (continuous duals), S2E28 (Riesz representation in Hilbert space), S2E31 (self-adjoint observables), S2E33 (distributions), S3E06 and S3E10 (gradients on manifolds)

## Learning objectives
By the end of this lesson the viewer can:
1. State and prove the finite-dimensional Riesz representation theorem: an inner product gives an isomorphism $V \to V^*$, $v \mapsto \langle\cdot, v\rangle$.
2. Explain why "row vectors = column vectors" is a silent use of the dot product, and compute the vector that represents a covector under a non-standard inner product.
3. Distinguish the differential $df$ (a covector, no choices) from the gradient $\nabla f$ (a vector, which depends on the inner product), and compute both.
4. Define the adjoint $T^*$ by $\langle Tv, w\rangle = \langle v, T^*w\rangle$, compute it in orthonormal and non-orthonormal bases, and relate it to the dual map of S2E08.
5. Explain why the "map vs. form" distinction of S2E09 disappears when you only use orthonormal bases.

## Cold open
You're hiking. Your phone shows a contour map of the hill: elevation lines, one every ten meters. You want to go *straight uphill*, the steepest way. Easy, right? Walk perpendicular to the contour lines.

Now someone hands you a second map of the same hill, drawn by a cartographer who squashed the north–south direction by half to fit it on the page. The contour lines are the same lines, crossing the same rocks and trees. But "perpendicular" on this map points in a *different direction on the ground*. Follow it and you walk diagonally.

Here's the strange part: the contour lines themselves are not wrong on either map. How many lines you cross when you take a step is a fact about the hill and your step. It doesn't depend on how anyone draws the map. What *does* depend on the map is the idea of "perpendicular," and with it, the idea of a single *arrow* pointing uphill.

So which is the real thing: the stack of contour lines, or the uphill arrow?

Back in Episode 6 we met two kinds of objects: arrows, and stacks of level lines that measure arrows. We promised they were different. And yet in every calculus class the gradient is drawn as an arrow. Today we find the exact moment the stack turns into an arrow, and the price of that conversion: you have to choose how to measure angles.

## The story

### 1. Two kinds of objects, no natural bridge

Recall the setup (↩ S2E06, ↩ S2E08). A vector space $V$ has a dual space $V^*$ of linear functionals: measuring devices that eat a vector and return a number. We drew vectors as blue arrows and covectors as orange stacks of parallel level planes; $\varphi(v)$ counts how many planes the arrow $v$ crosses.

When $\dim V = n$ we know $\dim V^* = n$, so $V \cong V^*$. But in S2E08 we stressed that this isomorphism *requires a choice*: picking a basis $e_1, \dots, e_n$ and sending $e_i$ to the dual basis functional $e^i$ works, but a different basis gives a different isomorphism. Contrast $V \cong V^{**}$, which is natural. There is no way to turn a stack of planes into an arrow using only the vector space structure.

The question of this episode: **what is the minimal extra structure that makes $V \cong V^*$ canonical?** Answer: an inner product.

### 2. Riesz in finite dimensions

Given an inner product, every vector $v$ defines a covector, "take the inner product with $v$":
$$\Phi(v) = \langle\,\cdot\,, v\rangle \in V^*, \qquad \Phi(v)(u) = \langle u, v\rangle.$$
(We put $v$ in the second slot so that $\Phi(v)$ is linear in $u$, using the convention of S2E15 that the first slot is linear.) Geometrically, $\Phi(v)$ is the stack of planes perpendicular to $v$, with spacing $1/\lVert v\rVert$: longer arrows give denser stacks.

> **Theorem (Riesz representation, finite-dimensional).** Let $V$ be a finite-dimensional real or complex inner product space. For every linear functional $\varphi \in V^*$ there is exactly one vector $r_\varphi \in V$ with
> $$\varphi(u) = \langle u, r_\varphi\rangle \quad\text{for all } u \in V.$$
> The map $\Phi : V \to V^*$ is a bijection; it is linear over $\mathbb{R}$ and conjugate-linear over $\mathbb{C}$ ($\Phi(\lambda v) = \overline{\lambda}\,\Phi(v)$). Moreover $\lVert\varphi\rVert = \lVert r_\varphi\rVert$, where $\lVert\varphi\rVert = \max_{\lVert u\rVert = 1}\lvert\varphi(u)\rvert$.
>
> *Proof.* **Uniqueness / injectivity.** If $\langle u, r\rangle = \langle u, r'\rangle$ for all $u$, put $u = r - r'$: then $\lVert r - r'\rVert^2 = 0$, so $r = r'$.
>
> **Existence (explicit formula).** Let $e_1, \dots, e_n$ be an orthonormal basis (Gram–Schmidt, ↪ S2E17). Set
> $$r_\varphi = \sum_{k=1}^n \overline{\varphi(e_k)}\;e_k .$$
> For $u = \sum_j u_j e_j$ we get $\langle u, r_\varphi\rangle = \sum_k u_k\,\overline{\overline{\varphi(e_k)}} = \sum_k u_k\,\varphi(e_k) = \varphi(u)$, using orthonormality and linearity of $\varphi$.
>
> **Norms.** By Cauchy–Schwarz, $\lvert\varphi(u)\rvert = \lvert\langle u, r_\varphi\rangle\rvert \le \lVert u\rVert\,\lVert r_\varphi\rVert$, with equality at $u = r_\varphi/\lVert r_\varphi\rVert$ (if $r_\varphi \neq 0$). ∎

A second proof is worth seeing, because it is the one that generalizes to S2E28. If $\varphi \neq 0$, its kernel is a hyperplane $K$ (↩ S2E06). The orthogonal complement $K^\perp$ is one-dimensional (↪ S2E17); pick a unit vector $z \in K^\perp$. Every $u$ splits as $u = \big(u - \tfrac{\varphi(u)}{\varphi(z)}z\big) + \tfrac{\varphi(u)}{\varphi(z)}z$, with the first part in $K$. Taking the inner product with $z$ gives $\langle u, z\rangle = \varphi(u)/\varphi(z)$, so $r_\varphi = \overline{\varphi(z)}\,z$. *The representing vector is the normal to the level planes.* In infinite dimensions, this proof works exactly when the kernel is closed and the projection onto it exists, which is where completeness enters.

**Rows and columns.** In $\mathbb{R}^n$ with the dot product and the standard basis, $r_\varphi$ has the same coordinates as the row vector of $\varphi$. That's the whole reason we normally "pretend rows and columns are the same thing": we are silently applying $\Phi$ for the dot product. With a different inner product $\langle u, v\rangle_G = u^{\mathsf T}Gv$ ($G$ symmetric positive definite, the Gram matrix of S2E09), a functional with row vector $a^{\mathsf T}$ is represented by
$$r = G^{-1}a,$$
since $\langle u, G^{-1}a\rangle_G = u^{\mathsf T}GG^{-1}a = u^{\mathsf T}a$. The row and the column now have *different* entries (Example 1).

**"Build or Describe?"** *Build:* $r_\varphi = \sum_k\overline{\varphi(e_k)}e_k$, a formula in an orthonormal basis. *Describe:* the unique vector with $\varphi = \langle\cdot, r_\varphi\rangle$. The description shows the answer doesn't depend on which orthonormal basis we used to build it.

### 3. The gradient is a converted covector

Let $f : \mathbb{R}^n \to \mathbb{R}$ be differentiable at $p$. Its derivative at $p$ is the linear map
$$df_p(v) = \lim_{t\to0}\frac{f(p + tv) - f(p)}{t} = \sum_i \frac{\partial f}{\partial x_i}(p)\,v_i,$$
which eats a direction and returns a rate of change. That is a covector, and it required no inner product: just limits and linearity (↩ S2E06). Its level planes, drawn at $p$, are the tangent planes to the contour surfaces of $f$.

> **Definition.** Given an inner product on $\mathbb{R}^n$, the **gradient** $\nabla f(p)$ is the Riesz representer of $df_p$:
> $$\langle v, \nabla f(p)\rangle = df_p(v) \quad\text{for all } v.$$

With the dot product, $\nabla f = (\partial_1 f, \dots, \partial_n f)$, the familiar formula. With $\langle u, v\rangle_G = u^{\mathsf T}Gv$,
$$\nabla_G f = G^{-1}\begin{pmatrix}\partial_1 f\\ \vdots\\ \partial_n f\end{pmatrix}.$$
The **steepest ascent property** holds for *every* inner product: among unit vectors (in that inner product's norm), $df_p(v) = \langle v, \nabla f\rangle$ is maximized by $v = \nabla f/\lVert\nabla f\rVert$, by Cauchy–Schwarz. But *which* direction that is depends on the inner product. This resolves the hike: both maps agree on the contour lines ($df$), and disagree on "uphill" ($\nabla f$) because they measure angles differently.

This is why physicists distinguish upper and lower indices, why optimization people talk about "preconditioning" (choosing $G$ to make gradient descent take better steps), and why on curved spaces the gradient needs a Riemannian metric while $df$ doesn't (↪ S3E06, ↪ S3E10).

### 4. The adjoint: the transpose made geometric

In S2E08 every linear map $T : V \to W$ induced a **dual map** $T' : W^* \to V^*$, $T'(\psi) = \psi\circ T$ ("measure after mapping"), whose matrix in dual bases is the transpose. (S2E08 wrote this map as $T^*$; from now on we reserve the star for the adjoint below, as most books do, and write the dual map as $T'$.) The dual map goes between *dual* spaces. With inner products on both sides, Riesz lets us bring it back down to the original spaces.

> **Definition.** Let $V, W$ be finite-dimensional inner product spaces and $T : V \to W$ linear. The **adjoint** $T^* : W \to V$ is the unique map with
> $$\langle Tv, w\rangle_W = \langle v, T^*w\rangle_V \quad\text{for all } v \in V,\ w \in W.$$
> (Physicists write $T^\dagger$.)

*Existence and uniqueness.* Fix $w$. The map $v \mapsto \langle Tv, w\rangle$ is a linear functional on $V$, so by Riesz it equals $\langle v, r\rangle$ for exactly one $r$; call it $T^*w$. Linearity of $w \mapsto T^*w$ follows from uniqueness. In the language of S2E08, $T^* = \Phi_V^{-1}\circ T'\circ\Phi_W$: convert $w$ to a covector, pull it back with the dual map, convert back to a vector.

**Matrices.** If $A$ is the matrix of $T$ in *orthonormal* bases, the matrix of $T^*$ is the conjugate transpose $A^* = \overline{A}^{\,\mathsf T}$ (just $A^{\mathsf T}$ over $\mathbb{R}$), because the $(j,k)$ entry of $[T^*]$ is $\langle T^*f_k, e_j\rangle = \overline{\langle e_j, T^*f_k\rangle} = \overline{\langle Te_j, f_k\rangle} = \overline{A_{kj}}$ (here $e_j$ and $f_k$ are the orthonormal bases of $V$ and $W$). In bases with Gram matrices $G_V$ and $G_W$ the formula picks up the metric:
$$[T^*] = G_V^{-1}\,A^*\,G_W .$$
So "the adjoint is the transpose" is a theorem about orthonormal bases, not a definition (Example 4).

**Properties** (each follows from uniqueness in Riesz): $(S + T)^* = S^* + T^*$, $(\lambda T)^* = \overline{\lambda}T^*$, $(ST)^* = T^*S^*$, $(T^*)^* = T$, and
$$\ker T^* = (\operatorname{im} T)^\perp, \qquad \operatorname{im} T^* = (\ker T)^\perp .$$
*Proof of the first:* $w \in \ker T^*$ ⇔ $\langle v, T^*w\rangle = 0$ for all $v$ ⇔ $\langle Tv, w\rangle = 0$ for all $v$ ⇔ $w \perp \operatorname{im}T$. The second follows by applying the first to $T^*$ and taking complements. These are the "four fundamental subspaces" of Strang's linear algebra, and the duality version of row rank = column rank (↩ S2E08). They drive least squares in S2E17.

### 5. Isometries, self-adjoint maps, and the end of "map vs. form"

The adjoint lets us say geometric things with algebra:
- $T$ preserves inner products ⇔ $\langle Tu, Tv\rangle = \langle u, T^*Tv\rangle = \langle u, v\rangle$ for all $u, v$ ⇔ $T^*T = I$. These are the **orthogonal** (real) and **unitary** (complex) maps of S2E15.
- $T$ is **self-adjoint** if $T^* = T$, i.e. $\langle Tu, v\rangle = \langle u, Tv\rangle$. In orthonormal bases these are the symmetric (real) and Hermitian (complex) matrices, the stars of S2E18.

Now recall the puzzle of S2E09: a square grid of numbers can be a **map** (changing as $P^{-1}AP$) or a **form** (changing as $P^{\mathsf T}BP$). Riesz explains the connection. A bilinear form $B$ is a map $V \to V^*$ (↩ S2E09); composing with $\Phi^{-1}$ gives a map $V \to V$:
$$B(u, v) = \langle Tu, v\rangle \quad\text{(real case)}.$$
So an inner product turns every form into an operator, and symmetric forms into self-adjoint operators. And if we only change between *orthonormal* bases, then $P$ is orthogonal, $P^{\mathsf T} = P^{-1}$, and the two transformation laws **coincide**. That's why, in a course that only ever uses the dot product and rotations, nobody notices that maps and forms are different. The difference reappears the moment you use a skewed basis or a different inner product.

**Payoff.** The duality act (Act II) and the geometry act (Act V) snap together: an inner product is exactly a nondegenerate symmetric (or Hermitian) bilinear form, and a nondegenerate form is exactly an isomorphism $V \to V^*$. Choosing an inner product = choosing how to turn stacks into arrows.

**Teaser.** The dimension count "$\dim V = \dim V^*$" did a lot of quiet work. In infinite dimensions it fails: there are functionals with no representing vector (Example 3 shows one escaping). The rescue (S2E24, S2E28) needs two repairs: only *continuous* functionals count, and the space must be *complete*. The most famous functional without a representer, "evaluate at 0," gets its own life as the Dirac delta (↪ S2E33).

## Worked examples

### Example 1: The vector representing a covector, two ways
Let $\varphi(x, y) = 3x + 2y$ on $\mathbb{R}^2$.

**Dot product.** We need $r = (a, b)$ with $ax + by = 3x + 2y$ for all $x, y$: $r = (3, 2)$.

**Skewed inner product.** Let $\langle u, v\rangle_G = u^{\mathsf T}Gv$ with $G = \begin{pmatrix}2 & 1\\ 1 & 1\end{pmatrix}$. (Positive definite: $\operatorname{tr}G = 3 > 0$, $\det G = 1 > 0$.) Then $r = G^{-1}\binom{3}{2}$ with $G^{-1} = \frac{1}{1}\begin{pmatrix}1 & -1\\ -1 & 2\end{pmatrix}$:
$$r = \begin{pmatrix}3 - 2\\ -3 + 4\end{pmatrix} = \begin{pmatrix}1\\1\end{pmatrix}.$$
**Check.** $\langle (x,y), (1,1)\rangle_G = (x, y)\begin{pmatrix}2&1\\1&1\end{pmatrix}\begin{pmatrix}1\\1\end{pmatrix} = (x,y)\begin{pmatrix}3\\2\end{pmatrix} = 3x + 2y$. ✓

The covector (the row $(3,2)$, the stack of lines $3x + 2y = c$) is the same in both cases. The representing arrow changed from $(3,2)$ to $(1,1)$. Note that $(1,1)$ is *not* perpendicular to the lines $3x + 2y = c$ in the usual sense, but it *is* $G$-perpendicular to them: the direction vector of those lines is $(2, -3)$, and $\langle (2,-3), (1,1)\rangle_G = (2,-3)\binom{3}{2} = 6 - 6 = 0$. ✓

### Example 2: Gradient of $f(x,y) = x^2y$ under two metrics
At $p = (1, 2)$: $\partial_x f = 2xy = 4$ and $\partial_y f = x^2 = 1$. So
$$df_p = 4\,dx + 1\,dy, \qquad df_p(v) = 4v_1 + v_2 .$$
**Dot product:** $\nabla f(p) = (4, 1)$, length $\sqrt{17}$. The maximal rate of increase per unit step is $\sqrt{17} \approx 4.123$, in the direction $(4,1)/\sqrt{17}$.

**Metric $G = \operatorname{diag}(1, 4)$** (a map where a unit of $y$ counts as 2 units of length, since $\lVert(0,1)\rVert_G = 2$): $\nabla_G f(p) = G^{-1}(4,1) = (4, \tfrac14)$.
- Check: $\langle v, (4, \tfrac14)\rangle_G = 4v_1 + 4\cdot\tfrac14 v_2 = 4v_1 + v_2 = df_p(v)$. ✓
- $\lVert\nabla_G f\rVert_G^2 = 4^2 + 4\cdot(\tfrac14)^2 = 16 + \tfrac14 = 16.25$, so the maximal rate per unit ($G$-)step is $\sqrt{16.25} \approx 4.031$, in the direction $(4, \tfrac14)/\sqrt{16.25}$.

The steepest direction has rotated toward the $x$-axis: moving in $y$ is now "expensive," so it's less attractive per unit of distance. Same covector, different arrows.

### Example 3: Evaluation at 0 on polynomials, and a representer that blows up
Let $P_n$ be the real polynomials of degree $\le n$ with $\langle p, q\rangle = \int_0^1 p(x)q(x)\,dx$, and let $\delta_0(p) = p(0)$. Find the representer $q_n$ with $\int_0^1 p\,q_n = p(0)$ for all $p \in P_n$.

**$n = 1$.** Write $q_1 = a + bx$. It suffices to test the basis $1, x$:
- $p = 1$: $\int_0^1 (a + bx)\,dx = a + \tfrac b2 = 1$.
- $p = x$: $\int_0^1 (ax + bx^2)\,dx = \tfrac a2 + \tfrac b3 = 0$, so $a = -\tfrac{2b}{3}$.

Substituting: $-\tfrac{2b}{3} + \tfrac{b}{2} = -\tfrac b6 = 1$, so $b = -6$, $a = 4$, and $q_1(x) = 4 - 6x$.
Check: $\int_0^1(4 - 6x)\,dx = 4 - 3 = 1$ ✓ and $\int_0^1(4x - 6x^2)\,dx = 2 - 2 = 0$ ✓.

**$n = 2$.** Testing $1, x, x^2$ against $q_2 = a + bx + cx^2$ gives a linear system whose coefficient matrix is the $3\times3$ Hilbert matrix (the Gram matrix of $1, x, x^2$),
$$\begin{pmatrix}1 & \tfrac12 & \tfrac13\\ \tfrac12 & \tfrac13 & \tfrac14\\ \tfrac13 & \tfrac14 & \tfrac15\end{pmatrix}\begin{pmatrix}a\\b\\c\end{pmatrix} = \begin{pmatrix}1\\0\\0\end{pmatrix},$$
whose solution is $q_2(x) = 9 - 36x + 30x^2$. Check the three equations: $9 - 18 + 10 = 1$ ✓; $\tfrac92 - 12 + \tfrac{30}{4} = 0$ ✓; $3 - 9 + 6 = 0$ ✓.

**The norms.** By Riesz, $\lVert\delta_0\rVert = \lVert q_n\rVert$, and $\lVert q_n\rVert^2 = \langle q_n, q_n\rangle = \delta_0(q_n) = q_n(0)$. So $\lVert q_1\rVert^2 = 4$, $\lVert q_2\rVert^2 = 9$, and (one more computation, checked numerically) $q_3 = 16 - 120x + 240x^2 - 140x^3$ with $\lVert q_3\rVert^2 = 16$. In general $\lVert q_n\rVert = n + 1$.

The representer of "evaluate at 0" is a polynomial that gets taller and more concentrated near 0 as $n$ grows, with norm going to infinity. On the space of *all* polynomials there is no representer at all: $\delta_0$ is not continuous for the $L^2$ norm. This is the first sighting of the Dirac delta (↪ S2E24, ↪ S2E33).

### Example 4: An adjoint that is not the transpose
Let $A = \begin{pmatrix}0 & 1\\ 0 & 0\end{pmatrix}$ on $\mathbb{R}^2$ with $\langle u, v\rangle_G = u_1v_1 + 4u_2v_2$, $G = \operatorname{diag}(1,4)$. The standard basis is orthogonal but not orthonormal ($\lVert e_2\rVert_G = 2$), so we use $[T^*] = G^{-1}A^{\mathsf T}G$:
$$A^{\mathsf T}G = \begin{pmatrix}0&0\\1&0\end{pmatrix}\begin{pmatrix}1&0\\0&4\end{pmatrix} = \begin{pmatrix}0&0\\1&0\end{pmatrix},\qquad G^{-1}A^{\mathsf T}G = \begin{pmatrix}1&0\\0&\tfrac14\end{pmatrix}\begin{pmatrix}0&0\\1&0\end{pmatrix} = \begin{pmatrix}0&0\\ \tfrac14&0\end{pmatrix}.$$
**Check.** $Av = (v_2, 0)$, so $\langle Av, w\rangle_G = v_2w_1$. And $A^*w = (0, \tfrac14 w_1)$, so $\langle v, A^*w\rangle_G = v_1\cdot0 + 4v_2\cdot\tfrac14 w_1 = v_2w_1$. ✓ The plain transpose $(0, w_1)$ would give $4v_2w_1$, which is wrong.

### Example 5: The adjoint of $d/dx$ is $-d/dx$
Let $V$ be the complex trigonometric polynomials $f(x) = \sum_{\lvert k\rvert \le N} c_k e^{ikx}$ with $\langle f, g\rangle = \int_0^{2\pi} f\,\overline{g}\,dx$, and $D = d/dx$ (which maps $V$ to itself). Integrate by parts:
$$\langle Df, g\rangle = \int_0^{2\pi} f'\,\overline{g}\,dx = \Big[f\,\overline{g}\Big]_0^{2\pi} - \int_0^{2\pi} f\,\overline{g'}\,dx = \langle f, -Dg\rangle,$$
because $f$ and $g$ are $2\pi$-periodic, so the boundary term vanishes. Hence $D^* = -D$: differentiation is *skew*-adjoint, and $P = -iD$ is self-adjoint ($P^* = \overline{(-i)}\,D^* = i\cdot(-D) = -iD = P$). The eigenvectors of $P$ are $e^{ikx}$ with real eigenvalues $k$, and they are orthogonal: the Fourier basis (↪ S2E29). Up to a factor of $\hbar$, $P$ is the momentum operator of quantum mechanics (↪ S2E31).

## Visual and animation notes
1. **Cold open:** a 3D hill, then its contour map with a blue "uphill" arrow perpendicular to the contours. A second map slides in, squashed vertically; the orange contour lines deform with it, and the new "perpendicular" arrow, mapped back to the hill, points in a visibly different ground direction.
2. **Riesz map:** a blue arrow $v$ morphs into an orange stack of planes perpendicular to it; lengthening $v$ packs the planes closer (spacing $1/\lVert v\rVert$). Then the reverse: a stack of planes "grows" a normal arrow. Callback stamp ↩ S2E06.
3. **Changing the inner product:** the unit circle stretches into an ellipse (↩ S2E14 motif). The orange stack stays fixed; the blue representing arrow swings to the ellipse's notion of "normal" (Example 1).
4. **Gradient:** heat-map of $f(x,y) = x^2y$ with contours; at $(1,2)$ the covector $df$ as local level lines, then two gradient arrows (dot product vs. $G$) emerging from the same stack.
5. **Adjoint as a round trip:** a commutative square with $W \to W^* \to V^* \to V$ (convert, pull back, convert back), the arrows lighting up in sequence and composing into $T^*$.
6. **Map vs. form, reconciled:** S2E09's split screen (grid of arrows vs. level ellipses) replays; under a rotation of basis both transform identically; under a shear of basis they diverge. Badge: "agree when $P^{\mathsf T} = P^{-1}$."
7. **Teaser:** the representers $q_1, q_2, q_3, \dots$ of $\delta_0$ plotted on $[0,1]$, spiking at 0 with norms $2, 3, 4, \dots$ shown as a growing bar; the bar runs off the top of the screen.

## Common misconceptions
- **Misconception:** The gradient is a vector, full stop. **Reality:** The differential $df$ is canonical; the gradient vector is $df$ converted using an inner product, and it changes when the inner product changes.
- **Misconception:** The adjoint is the transpose. **Reality:** The matrix of the adjoint is the (conjugate) transpose *in orthonormal bases*. In general it is $G_V^{-1}A^*G_W$.
- **Misconception:** The dual map and the adjoint are the same. **Reality:** The dual map $T' : W^* \to V^*$ exists with no inner product; the adjoint $T^* : W \to V$ needs inner products on both spaces to bring $T'$ back down.
- **Misconception:** Since $V \cong V^*$, covectors are "really just" vectors. **Reality:** Every finite-dimensional $V$ is isomorphic to $V^*$, but no isomorphism is preferred until you choose an inner product; different inner products give different identifications.
- **Misconception:** Over $\mathbb{C}$, $v \mapsto \langle\cdot, v\rangle$ is linear. **Reality:** It is conjugate-linear, $\Phi(\lambda v) = \overline{\lambda}\Phi(v)$; it is still a bijection.
- **Misconception:** Riesz works for every linear functional on every inner product space. **Reality:** In infinite dimensions it needs continuity of the functional and completeness of the space (S2E28); evaluation at a point is the standard counterexample.

## Exercises
- **Warm-up (computational):**
  1. With $\langle u,v\rangle_G = u^{\mathsf T}Gv$, $G = \begin{pmatrix}1 & 1\\ 1 & 2\end{pmatrix}$, find the vector representing $\varphi(x,y) = x - y$. Check your answer.
  2. On $P_1$ with $\langle p,q\rangle = \int_0^1 pq$, find the representer of $\varphi(p) = \int_0^1 p(x)\,dx$, and of $\psi(p) = p(1)$.
  3. Compute the gradient of $f(x,y) = x^2 + 3y^2$ at $(1,1)$ with respect to the dot product and with respect to $G = \operatorname{diag}(2, 6)$. What is special about the second answer?
- **Core (conceptual):**
  4. Show that $(ST)^* = T^*S^*$ using only the defining property of the adjoint.
  5. Prove that $\operatorname{rank}T = \operatorname{rank}T^*$ using $\operatorname{im}T^* = (\ker T)^\perp$ and rank–nullity.
  6. Explain why the matrix of a bilinear form and the matrix of the corresponding self-adjoint operator coincide in any orthonormal basis, but not in a general basis.
- **Stretch (proof or exploration):**
  7. Show that for $q_n$ in Example 3, $q_n(x) = \sum_{k=0}^n \ell_k(0)\ell_k(x)$ where $\ell_k$ are orthonormal polynomials on $[0,1]$. Using $\ell_k(0)^2 = 2k+1$ (shifted Legendre polynomials), deduce $\lVert q_n\rVert = n+1$.
  8. Let $V = C^1$ functions on $[0,1]$ vanishing at both ends, $\langle f,g\rangle = \int_0^1 fg$. Show that $D = d/dx$ satisfies $\langle Df, g\rangle = -\langle f, Dg\rangle$. What goes wrong if the boundary condition is dropped?

<details><summary>Hints and answers</summary>

1. $G^{-1} = \begin{pmatrix}2 & -1\\ -1 & 1\end{pmatrix}$, so $r = G^{-1}(1,-1) = (3, -2)$. Check: $(x,y)G(3,-2)^{\mathsf T} = (x,y)\cdot(1, -1)$. ✓
2. For $\varphi$: $r = 1$ (constant), since $\int_0^1 p\cdot1 = \varphi(p)$. For $\psi$: by the symmetry $x \mapsto 1-x$ of Example 3, $r = 4 - 6(1-x) = 6x - 2$. Check: $\int_0^1(6x-2)\,dx = 1 = \psi(1)$, $\int_0^1 x(6x-2)\,dx = 2 - 1 = 1 = \psi(x)$.
3. $df = 2\,dx + 6\,dy$. Dot product: $(2, 6)$. With $G$: $G^{-1}(2,6) = (1, 1)$, which is the position vector itself. In the $G$-geometry the level sets of $f$ (which is $\tfrac12\lVert v\rVert_G^2$) are circles, so the gradient points radially.
4. $\langle STv, w\rangle = \langle Tv, S^*w\rangle = \langle v, T^*S^*w\rangle$; uniqueness of adjoints.
5. $\operatorname{rank}T^* = \dim(\ker T)^\perp = \dim V - \dim\ker T = \operatorname{rank}T$.
6. In an orthonormal basis $B(e_i, e_j) = \langle Te_i, e_j\rangle = T_{ji}$, and symmetry makes this $T_{ij}$. In a general basis with Gram matrix $G$, $B(u,v) = (Au)^{\mathsf T}Gv$, so the form's matrix is $A^{\mathsf T}G$, which differs from the operator's matrix $A$ unless $G = I$ (or $A^{\mathsf T}G = A$ by luck).
7. Expand $q_n$ in the orthonormal basis: the coefficient of $\ell_k$ is $\langle q_n, \ell_k\rangle = \ell_k(0)$. Then $\lVert q_n\rVert^2 = \sum_k \ell_k(0)^2 = \sum_{k=0}^n(2k+1) = (n+1)^2$.
8. Integration by parts gives a boundary term $[fg]_0^1$, which vanishes under the boundary condition. Without it, $D$ has no adjoint of the form $-D$ on that space; the domain matters, a theme of S2E31.
</details>

## Historical note
The representation of functionals by inner products is named after Frigyes Riesz, who proved it in 1907 for the space of square-integrable functions; Maurice Fréchet published the same result in the same year. Both were working in the newly born infinite-dimensional setting created by Hilbert's work on integral equations (1904–1910), and the finite-dimensional version was regarded as obvious. The distinction between "contravariant" and "covariant" components (arrows vs. stacks, upper vs. lower indices) goes back to the tensor calculus of Gregorio Ricci-Curbastro and Tullio Levi-Civita (1900), where raising and lowering indices with the metric tensor is exactly the Riesz map. The adjoint of a differential operator, obtained by integration by parts, appears throughout 19th-century work on differential equations (Lagrange's adjoint operator), long before it was recognized as the same construction as the conjugate transpose of a matrix.

## Connections
- **Callbacks:** ↩ S2E06 (covectors as level-plane stacks; $df$ as a covector; kernels are hyperplanes), ↩ S2E08 (dual map, transpose, "natural vs. chosen," row rank = column rank), ↩ S2E09 (bilinear forms as maps $V \to V^*$; congruence vs. similarity), ↩ S2E14 (inner products, Gram matrices, Cauchy–Schwarz), ↩ S2E15 (complex conventions, unitary maps).
- **Sets up:** ↪ S2E17 (orthogonal complements and $\ker A^{\mathsf T} = (\operatorname{im}A)^\perp$ in least squares), ↪ S2E18 (self-adjoint maps), ↪ S2E24 (continuous duals; evaluation is not $L^2$-continuous), ↪ S2E28 (Riesz representation in Hilbert space), ↪ S2E31 (momentum as a self-adjoint operator; domains matter), ↪ S2E33 (the Dirac delta as a functional with no representer), ↪ S3E06 ($df$ as a covector field), ↪ S3E10 (gradients via a Riemannian metric).
- **Side quests:** *Linear algebra in machine learning* (preconditioning and natural gradient; attaches after S2E19); *Information geometry* (the Fisher metric turns $df$ into the natural gradient; attaches after S3E10).

## References
- **Primary / historical:**
  - F. Riesz, "Sur une espèce de géométrie analytique des systèmes de fonctions sommables," *Comptes rendus de l'Académie des sciences* 144 (1907).
  - M. Fréchet, "Sur les ensembles de fonctions et les opérations linéaires," *Comptes rendus de l'Académie des sciences* 144 (1907).
- **Textbooks:**
  - S. Axler, *Linear Algebra Done Right*, 3rd ed., Springer, 2015: Ch. 6.B (Riesz representation theorem, finite-dimensional) and Ch. 7.A (adjoints, self-adjoint and normal operators).
  - P. R. Halmos, *Finite-Dimensional Vector Spaces*, 2nd ed., Van Nostrand, 1958: the chapter on orthogonality (linear functionals on inner product spaces, adjoints).
  - G. Strang, *Introduction to Linear Algebra*, 5th ed., Wellesley-Cambridge Press, 2016: Ch. 4 (orthogonality and the four fundamental subspaces).
  - E. Kreyszig, *Introductory Functional Analysis with Applications*, Wiley, 1978: Ch. 3 (inner product spaces; Riesz representation and the Hilbert-adjoint operator), for the infinite-dimensional continuation.
- **Accessible:**
  - 3Blue1Brown (G. Sanderson), *Essence of Linear Algebra* video series, 2016: the chapter "Dot products and duality."
  - G. Strang, MIT OpenCourseWare 18.06 *Linear Algebra* (Spring 2010 lectures): Lecture 10 (the four fundamental subspaces).
