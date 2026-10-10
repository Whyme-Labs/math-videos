# S2E09: Bilinear Forms: Two Inputs, One Number

> **Season / Act:** Season 2, Part A, Act III (Multilinear Algebra) · **Target runtime:** 15–25 min ·
> **Prerequisites:** ↩ S2E04 (change of basis, similarity), ↩ S2E06 (covectors), ↩ S2E08 (dual maps and the transpose); high-school conics (ellipse, hyperbola) ·
> **Builds toward:** ↪ S2E10 (bilinear forms as tensors in $V^*\otimes V^*$), ↪ S2E11 (alternating forms and volume), ↪ S2E14 (inner products), ↪ S2E18 (principal axes of quadratic forms)

## Learning objectives
By the end of this lesson the viewer can:
1. Define a bilinear form, write its Gram matrix in a basis, and identify a bilinear form with a linear map $V \to V^*$.
2. Derive the two different change-of-basis rules, $P^{-1}AP$ for maps and $P^{\mathsf T}BP$ for forms, and explain why the same grid of numbers can have different invariants depending on which object it represents.
3. Classify symmetric and alternating forms, test nondegeneracy, and diagonalize a real quadratic form by completing squares.
4. State and prove Sylvester's law of inertia, and compute the signature of a quadratic form.

## Cold open
Here is a $2\times 2$ grid of numbers:
$$\begin{pmatrix} 2 & 1\\ 1 & 2\end{pmatrix}.$$
Show it to an engineer and she'll say: "That's a map. It takes the arrow $(1,1)$ and triples it, and it leaves the direction $(1,-1)$ alone. Its eigenvalues are 3 and 1." Show it to a physicist and he'll say: "That's an energy. Feed it a displacement $(x,y)$ and you get $2x^2 + 2xy + 2y^2$. Its level curves are ellipses."

Same four numbers. Who's right?

Here's a test. Let's change coordinates, the way we did in Episode 4. Use the new basis $(1,0)$ and $(1,2)$. The engineer recomputes her matrix and gets something with trace 4 and determinant 3, just as before. The physicist recomputes his and gets trace 16 and determinant 12.

Same grid, same change of coordinates, completely different behavior. So these aren't the same object at all. They just happened to be wearing the same grid of numbers.

Today: the object the physicist was holding. It takes two vectors and returns a number. It turns out to be what's hiding inside lengths, angles, relativity, and the equations of planetary motion. And there's a 170-year-old theorem that says that, deep down, there are only a handful of them.

## The story

### 1. Two inputs, one number

> **Definition.** A **bilinear form** on a vector space $V$ over a field $F$ is a function $B: V \times V \to F$ that is linear in each slot separately:
> $$B(au + bu', v) = aB(u,v) + bB(u',v), \qquad B(u, av + bv') = aB(u,v) + bB(u,v').$$

This is the first **multilinear map** of Act III: a measurement that takes several vectors at once and is linear in each one when the others are held fixed. Examples:
- The dot product on $\mathbb R^n$: $B(u,v) = \sum_i u_iv_i$.
- On polynomials, $B(p,q) = \int_0^1 p(x)q(x)\,dx$, or $B(p,q) = p(0)q(1)$.
- The signed area on $\mathbb R^2$: $\omega(u,v) = u_1v_2 - u_2v_1$.
- On $\mathbb R^4$ with coordinates $(t,x,y,z)$: $\eta(u,v) = u_tv_t - u_xv_x - u_yv_y - u_zv_z$ (units with $c = 1$).

Bilinear is *not* linear: $B(2u, 2v) = 4B(u,v)$. A bilinear form is not a linear map on $V\times V$.

**Coordinates.** Choose a basis $e_1,\dots,e_n$. By bilinearity,
$$B(u,v) = B\Big(\sum_i x_ie_i, \sum_j y_je_j\Big) = \sum_{i,j}x_iy_jB(e_i,e_j) = x^{\mathsf T}By,$$
where $x, y$ are the coordinate columns and $B_{ij} = B(e_i, e_j)$. The matrix $B$ is the **Gram matrix** of the form in this basis. So a bilinear form is determined by $n^2$ numbers, exactly as a linear map is. That is the source of the confusion in the cold open.

### 2. A form is a map into the dual

Feed a bilinear form only one vector, and leave the other slot open. What remains is linear in the open slot: a measuring device.

> **Proposition 1.** Bilinear forms on $V$ correspond one-to-one with linear maps $V \to V^*$, via
> $$B \longmapsto \beta,\qquad \beta(v) = B(\cdot, v).$$
> In a basis $e_i$ with dual basis $e^i$, the matrix of $\beta$ is the Gram matrix $B$.

*Proof.* For fixed $v$, $u \mapsto B(u,v)$ is linear, so $\beta(v) \in V^*$; linearity in $v$ makes $\beta$ linear. Conversely, from any linear $\beta: V\to V^*$ define $B(u,v) = \beta(v)(u)$; it is bilinear, and the two constructions are inverse. For the matrix: the $i$-th coordinate of $\beta(e_j)$ in the dual basis is $\beta(e_j)(e_i) = B(e_i, e_j) = B_{ij}$, so column $j$ of the matrix of $\beta$ is column $j$ of $B$. $\blacksquare$

This is the coordinate-free statement of the difference: **a linear operator is a map $V \to V$; a bilinear form is a map $V \to V^*$.** Vector in, vector out, versus vector in, measurement out.

> **Definition.** $B$ is **nondegenerate** if $\beta: V\to V^*$ is an isomorphism, that is, if the only $v$ with $B(u,v) = 0$ for all $u$ is $v = 0$. In finite dimensions this holds iff $\det B \ne 0$ in any basis.

A nondegenerate form is exactly the extra data that lets you identify vectors with covectors. In ↩ S2E08 we saw that $V \cong V^*$ "requires a choice." A nondegenerate bilinear form *is* such a choice.

### 3. The punchline: similarity versus congruence

Change basis with an invertible matrix $P$: the new basis vectors are $e'_j = \sum_i P_{ij}e_i$, so old coordinates $x$ and new coordinates $x'$ are related by $x = Px'$.

**For a map** $T: V\to V$ with matrix $A$: the equation $y = Ax$ (in old coordinates) becomes $Py' = APx'$, so $y' = P^{-1}APx'$. The new matrix is
$$A' = P^{-1}AP \qquad\text{(similarity).}$$

**For a form** with Gram matrix $B$: $B(u,v) = x^{\mathsf T}By = (Px')^{\mathsf T}B(Py') = x'^{\mathsf T}(P^{\mathsf T}BP)y'$. The new Gram matrix is
$$B' = P^{\mathsf T}BP \qquad\text{(congruence).}$$

Why the transpose? Because a form is a map $V \to V^*$, and the target is a *dual* space. By ↩ S2E08, coordinates on $V^*$ transform through the transpose: the change of basis on the output side is $P^{\mathsf T}$ rather than $P^{-1}$. Both rules are "conjugate by the change of basis on each side," but the two sides are different spaces.

The two rules agree exactly when $P^{\mathsf T} = P^{-1}$, i.e. for orthogonal changes of basis. That is why, in a course that only ever uses orthonormal bases in $\mathbb R^n$, the distinction never shows up, and why it bites as soon as you leave that world.

**Consequences for invariants.**
- Under similarity, $\det A' = \det A$, $\operatorname{tr}A' = \operatorname{tr}A$, and eigenvalues are unchanged (↪ S2E12).
- Under congruence, $\det B' = (\det P)^2\det B$: only the *sign* of the determinant (over $\mathbb R$) and whether it is zero are invariant. The trace and the eigenvalues of the Gram matrix are **not** invariants of the form. What survives is the **rank** and, over $\mathbb R$, the **signature**.

### 4. Symmetric, alternating, and quadratic forms

> **Definitions.** $B$ is **symmetric** if $B(u,v) = B(v,u)$ for all $u, v$ (Gram matrix $B^{\mathsf T} = B$). $B$ is **alternating** if $B(v,v) = 0$ for all $v$.

Alternating implies **skew-symmetric**, $B(u,v) = -B(v,u)$: expand $0 = B(u+v,u+v) = B(u,u) + B(u,v) + B(v,u) + B(v,v)$. Over fields where $2 \ne 0$ the converse holds too. Every bilinear form splits uniquely as symmetric plus skew (if $2\ne 0$): $B(u,v) = \tfrac12[B(u,v)+B(v,u)] + \tfrac12[B(u,v) - B(v,u)]$.

A **quadratic form** is $q(v) = B(v,v)$ for a symmetric $B$. If $2 \neq 0$ in $F$, you can recover $B$ from $q$ by **polarization**:
$$B(u,v) = \tfrac12\big[q(u+v) - q(u) - q(v)\big].$$
So over $\mathbb R$ or $\mathbb C$, symmetric bilinear forms and quadratic forms are the same thing. (Over $\mathbb F_2$, ↩ S1E19, they are not: there $q(x) = x_1^2$ is a nonzero quadratic form, yet $q(u+v) - q(u) - q(v) = 2u_1v_1 = 0$, so its polarization is the zero form.)

**Diagonalization by congruence.** Over any field with $2\neq 0$, every symmetric form has a basis in which its Gram matrix is diagonal.

*Proof sketch.* Induct on $\dim V$. If $B = 0$ we're done. Otherwise, by polarization there is $v$ with $q(v) \neq 0$. Its "orthogonal complement" $v^\perp = \{u: B(u,v) = 0\}$ is the kernel of the nonzero covector $B(\cdot, v)$, a hyperplane (↩ S2E06), and $v \notin v^\perp$, so $V = \operatorname{span}(v)\oplus v^\perp$. Apply induction to $B$ restricted to $v^\perp$. $\blacksquare$

In practice, you diagonalize by **completing the square** (Lagrange's method; Worked Example 2). Over $\mathbb R$, rescale each basis vector by $1/\sqrt{|q(e_i)|}$ to make every diagonal entry $+1$, $-1$, or $0$. Over $\mathbb C$ you can even turn every $-1$ into $+1$ (rescale by $i$), so a complex symmetric form is classified by its rank alone. Over $\mathbb R$ you can't: no real rescaling changes the sign of $q(e_i) = c^2q(e_i)$.

**Alternating forms** have their own normal form. If $\omega$ is alternating and nondegenerate, there is a basis $e_1,f_1,\dots,e_m,f_m$ with $\omega(e_i,f_i) = 1 = -\omega(f_i, e_i)$ and all other pairings zero. In particular $\dim V = 2m$ is **even**. (Quick proof of evenness over $\mathbb R$: the Gram matrix satisfies $\Omega^{\mathsf T} = -\Omega$, so $\det\Omega = \det(-\Omega) = (-1)^n\det\Omega$, and $\det \Omega \ne 0$ forces $n$ even.) Such an $\omega$ is a **symplectic form**: the structure of phase space in Hamiltonian mechanics, where $\omega((q,p),(q',p')) = qp' - pq'$ in each degree of freedom.

### 5. Sylvester's law of inertia

Over $\mathbb R$, after diagonalization a symmetric form looks like
$$q(x) = x_1^2 + \dots + x_p^2 - x_{p+1}^2 - \dots - x_{p+r}^2,$$
with $z = n - p - r$ coordinates missing. Different diagonalizations use different bases and may look very different. Could one diagonalization have three plus signs and another only two?

> **Theorem 2 (Sylvester's law of inertia, 1852).** Let $q$ be a quadratic form on a real vector space $V$ of dimension $n$. In every basis that diagonalizes $q$, the number $p$ of positive diagonal entries, the number $r$ of negative entries, and the number $z$ of zero entries are the same. The triple $(p, r, z)$ is the **signature** (or inertia) of $q$, and two real symmetric forms are congruent if and only if they have the same signature.

*Proof.* First, $z$ is invariant: $p + r$ is the rank of the Gram matrix, and congruence $B \mapsto P^{\mathsf T}BP$ by invertible $P$ preserves rank. Equivalently, $z = \dim\{v : B(u,v) = 0 \ \forall u\}$, which mentions no basis.

Now suppose $(e_i)$ diagonalizes $q$ with $p$ positive entries, and $(f_i)$ diagonalizes it with $p'$ positive entries. Let
$$U = \operatorname{span}\{e_i : q(e_i) > 0\}, \qquad W = \operatorname{span}\{f_i : q(f_i) \le 0\}.$$
For $u = \sum c_ie_i \in U$ with $u\neq 0$: $q(u) = \sum c_i^2 q(e_i) > 0$ (cross terms vanish because the basis diagonalizes $B$). For $w = \sum d_if_i \in W$: $q(w) = \sum d_i^2q(f_i) \le 0$. So $U \cap W = \{0\}$, and therefore
$$\dim U + \dim W = \dim(U + W) \le n, \quad\text{i.e.}\quad p + (n - p') \le n, \quad\text{so}\quad p \le p'.$$
Swapping the roles of the two bases gives $p'\le p$. So $p = p'$, and then $r = n - z - p$ is invariant too.

Finally, if two forms have the same signature, both are congruent to the same diagonal matrix $\operatorname{diag}(1,\dots,1,-1,\dots,-1,0,\dots,0)$, hence to each other; conversely congruent forms are the same form in two bases. $\blacksquare$

A useful corollary: $p$ is the **largest dimension of a subspace on which $q$ is positive definite**. That is a basis-free description, and it is how the proof works.

Over $\mathbb R$, the signature can be read from the eigenvalues of *any* Gram matrix: by the spectral theorem (↪ S2E18), a symmetric matrix can be diagonalized by an orthogonal $P$, for which congruence and similarity coincide, so the signs of the eigenvalues are the signs in the diagonal form. The eigenvalues themselves change under congruence. Their signs don't.

**The three stars of the show:**
- **Dot product, $(+,+,+)$.** Positive definite: $q(v) > 0$ for every $v \ne 0$. Level sets are ellipsoids. An inner product (↪ S2E14) is exactly a positive definite symmetric bilinear form.
- **Minkowski form, $(+,-,-,-)$.** Spacetime in special relativity. Nonzero vectors can have $q(v) = 0$ (light rays) or $q(v) < 0$ (spacelike separations). Lorentz transformations are exactly the linear maps that preserve $\eta$. (Many physics texts use the opposite convention $(-,+,+,+)$; the geometry is the same.)
- **Symplectic form.** Alternating, not symmetric, so Sylvester doesn't apply; instead it has the normal form of Section 4 and lives only in even dimensions.

**Payoff for the cold open.** The physicist's form $2x^2 + 2xy + 2y^2$ has signature $(2, 0, 0)$: it is positive definite. Its Gram matrix can be made to look like $\begin{pmatrix}2&4\\4&14\end{pmatrix}$ (Example 1), and with a well-chosen basis it can be made to look exactly like the identity matrix $I$. The engineer's map can never look like $I$: in every basis its eigenvalues are $3$ and $1$. Same grid, different objects, different invariants: eigenvalues for maps, signature for forms.

## Worked examples

### Example 1: The same grid, two changes of basis
Let $A = \begin{pmatrix}2&1\\1&2\end{pmatrix}$ and $P = \begin{pmatrix}1&1\\0&2\end{pmatrix}$ (new basis $(1,0)$, $(1,2)$; $\det P = 2$). Then $P^{-1} = \tfrac12\begin{pmatrix}2&-1\\0&1\end{pmatrix}$.

**As a map (similarity).**
$$AP = \begin{pmatrix}2&1\\1&2\end{pmatrix}\begin{pmatrix}1&1\\0&2\end{pmatrix} = \begin{pmatrix}2&4\\1&5\end{pmatrix},\qquad P^{-1}AP = \tfrac12\begin{pmatrix}2&-1\\0&1\end{pmatrix}\begin{pmatrix}2&4\\1&5\end{pmatrix} = \tfrac12\begin{pmatrix}3&3\\1&5\end{pmatrix}.$$
Trace $= \tfrac32 + \tfrac52 = 4$, determinant $= \tfrac34\cdot 5 - \tfrac34 \cdot 1 = \tfrac{15 - 3}{4} = 3$. Same as $A$ (trace 4, det 3), and the characteristic polynomial $\lambda^2 - 4\lambda + 3 = (\lambda-1)(\lambda-3)$ is unchanged.

**As a form (congruence).**
$$P^{\mathsf T}AP = \begin{pmatrix}1&0\\1&2\end{pmatrix}\begin{pmatrix}2&4\\1&5\end{pmatrix} = \begin{pmatrix}2&4\\4&14\end{pmatrix}.$$
Trace $16$, determinant $28 - 16 = 12 = (\det P)^2\cdot 3$. The eigenvalues of this Gram matrix are $8 \pm 2\sqrt{13}\approx 15.21,\ 0.79$, not $3$ and $1$. But both are positive, so the signature is still $(2,0,0)$.

**Check directly.** In the new basis, $u = x'(1,0) + y'(1,2) = (x'+y', 2y')$. Then
$2(x'+y')^2 + 2(x'+y')(2y') + 2(2y')^2 = 2x'^2 + 4x'y' + 2y'^2 + 4x'y' + 4y'^2 + 8y'^2 = 2x'^2 + 8x'y' + 14y'^2$,
which is $x'^{\mathsf T}\begin{pmatrix}2&4\\4&14\end{pmatrix}x'$ (the off-diagonal $4$ appears twice, giving $8x'y'$). ✓

### Example 2: Signature by completing squares, checked by eigenvalues
Let $q(x,y,z) = x^2 + 2xy + 2y^2 + 4yz + z^2$, with Gram matrix
$$B = \begin{pmatrix}1&1&0\\1&2&2\\0&2&1\end{pmatrix}$$
(off-diagonal entries are half the cross-term coefficients).

**Complete the square in $x$:** $x^2 + 2xy = (x+y)^2 - y^2$, so
$q = (x+y)^2 + y^2 + 4yz + z^2.$

**Complete the square in $y$:** $y^2 + 4yz = (y + 2z)^2 - 4z^2$, so
$$q = (x+y)^2 + (y+2z)^2 - 3z^2.$$
Check by expanding: $(x^2 + 2xy + y^2) + (y^2 + 4yz + 4z^2) - 3z^2 = x^2 + 2xy + 2y^2 + 4yz + z^2$. ✓

New coordinates $u = x + y$, $v = y + 2z$, $w = z$, i.e. $(u,v,w)^{\mathsf T} = Q(x,y,z)^{\mathsf T}$ with $Q = \begin{pmatrix}1&1&0\\0&1&2\\0&0&1\end{pmatrix}$. The change-of-basis matrix is $P = Q^{-1} = \begin{pmatrix}1&-1&2\\0&1&-2\\0&0&1\end{pmatrix}$, and indeed $P^{\mathsf T}BP = \operatorname{diag}(1, 1, -3)$. Signature $(p,r,z) = (2,1,0)$.

**Cross-check two ways.** (a) $\det B = 1(2 - 4) - 1(1 - 0) + 0 = -3$, and $\det P = 1$, so $\det\operatorname{diag}(1,1,-3) = -3$. ✓ (b) The eigenvalues of $B$ are $1$ and $\tfrac{3\pm\sqrt{21}}{2} \approx 3.79,\ -0.79$: two positive, one negative. ✓ The eigenvalues ($1, 3.79, -0.79$) differ from the diagonal entries ($1,1,-3$). Only the signs agree, exactly as Sylvester promises.

**Geometry.** The level set $q = 1$ is $u^2 + v^2 - 3w^2 = 1$: a hyperboloid of one sheet (in skewed coordinates).

### Example 3: Ellipse versus hyperbola, and a hidden signature
Consider $q_1(x,y) = x^2 + 4xy + y^2$ with Gram matrix $\begin{pmatrix}1&2\\2&1\end{pmatrix}$. Its trace is $2 > 0$ and both diagonal entries are positive, so you might guess it is positive definite. Test: $q_1(1,-1) = 1 - 4 + 1 = -2 < 0$. Complete the square: $q_1 = (x+2y)^2 - 3y^2$. Signature $(1,1,0)$; the level curve $q_1 = 1$ is a hyperbola. (Eigenvalues: $3$ and $-1$, one of each sign.)

Now $q_2(x,y) = xy$, Gram matrix $\begin{pmatrix}0&\frac12\\\frac12&0\end{pmatrix}$, whose diagonal is entirely zero. Use $xy = \big(\tfrac{x+y}{2}\big)^2 - \big(\tfrac{x-y}{2}\big)^2$. Signature $(1,1,0)$ again. By Sylvester, $q_1$ and $q_2$ are congruent: some change of basis turns $x^2 + 4xy + y^2$ into $xy$. The diagonal entries and trace told us nothing; the signature told us everything.

### Example 4: The symplectic form on $\mathbb R^2$ as a map to the dual
Let $\omega(u,v) = u_1v_2 - u_2v_1$, with Gram matrix $\Omega = \begin{pmatrix}0&1\\-1&0\end{pmatrix}$ ($\Omega_{12} = \omega(e_1,e_2) = 1$).
- **Alternating:** $\omega(v,v) = v_1v_2 - v_2v_1 = 0$.
- **Nondegenerate:** $\det\Omega = 0\cdot 0 - (1)(-1) = 1 \ne 0$.
- **As a map $V\to V^*$:** $\beta(v) = \omega(\cdot, v)$ sends $v = (v_1,v_2)$ to the covector $u \mapsto u_1v_2 - u_2v_1$, i.e. the row $(v_2\ \ {-v_1})$. So $\beta(1,0) = (0\ \ {-1})$: the vector $e_1$ becomes the measurement "minus the $y$-coordinate." Every vector $v$ becomes the covector whose level lines are *parallel to $v$*: $\omega(v,v) = 0$ says $v$ lies in the zero level of its own covector. Compare the dot product, where $v$ becomes the covector whose level lines are *perpendicular* to $v$.
- $|\omega(u,v)|$ is the area of the parallelogram spanned by $u$ and $v$, a preview of ↪ S2E11.

## Visual and animation notes
1. **Cold open.** The grid $\begin{pmatrix}2&1\\1&2\end{pmatrix}$ sits center screen. It duplicates. The left copy starts acting on a grid of blue arrows (motif: *Linear map*); the right copy draws orange level curves, concentric ellipses $2x^2+2xy+2y^2 = c$.
2. **Change the camera.** A basis overlay (motif: *Basis / coordinates*) shears to the basis $(1,0),(1,2)$. The left grid's numbers churn but a badge reading "eig: 3, 1" stays put (motif: *Invariants*). The right grid's numbers churn to $\begin{pmatrix}2&4\\4&14\end{pmatrix}$; the "eig" badge on the right flickers and changes, while a different badge, "signature $(+,+)$," stays put.
3. **Form as a machine.** A two-slot machine (motif: *Multilinear map*), both slots colored blue (vector inputs), output a number. Then one slot is filled, and the machine "collapses" into an orange level-line stack: a form is a map $V\to V^*$.
4. **Formula reveal.** $P^{-1}AP$ and $P^{\mathsf T}BP$ appear side by side, with the $P^{-1}$ glowing blue (it acts on the output vector) and the $P^{\mathsf T}$ glowing orange (it acts on the output covector).
5. **Completing the square.** The level set of $x^2 + 2xy + 2y^2 + 4yz + z^2 = 1$ rendered in 3D; axes shear along with the substitution $u = x+y$, $v = y + 2z$ until the surface is visibly a hyperboloid of one sheet.
6. **Sylvester's proof.** A "positive" plane $U$ (green) and a "nonpositive" line $W$ (red) in $\mathbb R^3$; any attempt to make them share a nonzero vector produces a vector that is simultaneously green and red, and the screen flashes "contradiction." Dimension bars: $\dim U + \dim W \le 3$.
7. **Gallery of signatures.** Three panels: ellipse $(+,+)$, hyperbola $(+,-)$, a pair of parallel lines $(+,0)$. Then a light cone for Minkowski $(+,-,-,-)$ (shown in 2+1 dimensions).
8. **Symplectic.** A blue arrow $v$ and its covector under $\omega$: the orange level lines are drawn *parallel* to $v$; contrast with the dot-product covector (level lines *perpendicular*). A parallelogram's area appears as the value $\omega(u,v)$.
9. **Callback stamps:** ↩ S2E04 at shot 2, ↩ S2E08 at shot 4, ↩ S2E06 at shot 3.

## Common misconceptions
- **Misconception:** A square matrix is a linear map. **Reality:** A square matrix is a grid of numbers. It can represent a map $V\to V$ (changes by similarity) or a bilinear form $V\times V\to F$ (changes by congruence). Which one is extra information.
- **Misconception:** The eigenvalues of a symmetric matrix are invariants of the quadratic form. **Reality:** Only their signs are (Sylvester). The eigenvalues of a Gram matrix depend on the basis unless you restrict to orthonormal bases of some inner product.
- **Misconception:** Positive diagonal entries (or a positive trace and determinant in $3\times 3$) mean positive definite. **Reality:** Example 3: $x^2 + 4xy + y^2$ has positive diagonal and is indefinite. In $2\times2$, positive definite iff $B_{11} > 0$ and $\det B > 0$.
- **Misconception:** Bilinear means linear on $V\times V$. **Reality:** $B(2u,2v) = 4B(u,v)$; bilinear maps are linear in each slot separately, not jointly.
- **Misconception:** Every quadratic form comes from a unique symmetric bilinear form, over any field. **Reality:** Polarization divides by 2. Over $\mathbb F_2$ the nonzero quadratic form $x_1^2$ and the zero form have the same (zero) polarization, so quadratic forms carry strictly more information there.

## Exercises
- **Warm-up (computational).** Find the signature of $q(x,y,z) = x^2 - 2xy + 3y^2 - 4yz + 2z^2$ by completing squares, and confirm it with the determinant of the Gram matrix.
- **Core (conceptual).** Show that for a real symmetric form, $p$ equals the largest dimension of a subspace on which $q$ is positive definite. Use this to show that the Minkowski form $(+,-,-,-)$ has no 2-dimensional subspace of "timelike" vectors (vectors with $q > 0$), together with $0$.
- **Stretch (proof).** Prove the symplectic normal form: if $\omega$ is a nondegenerate alternating form on a finite-dimensional space, there is a basis $e_1,f_1,\dots,e_m,f_m$ with $\omega(e_i,f_j) = \delta_{ij}$ and $\omega(e_i,e_j) = \omega(f_i,f_j) = 0$.

<details><summary>Hints and answers</summary>

- **Warm-up.** $q = (x - y)^2 + 2y^2 - 4yz + 2z^2 = (x-y)^2 + 2(y - z)^2 + 0\cdot z^2$. Signature $(2,0,1)$: positive semidefinite, degenerate. Gram matrix $\begin{pmatrix}1&-1&0\\-1&3&-2\\0&-2&2\end{pmatrix}$ has determinant $1(6-4) + 1(-2 - 0) + 0 = 0$, consistent with $z = 1$.
- **Core.** If $U$ is a positive definite subspace and $W$ is the span of the non-positive basis vectors from a diagonalization, then $U\cap W = 0$, so $\dim U \le p$; the span of the positive basis vectors achieves $p$. For Minkowski $p = 1$. (The set of timelike vectors is not a subspace at all; it is a double cone.)
- **Stretch.** Pick $e_1 \ne 0$; by nondegeneracy pick $f_1$ with $\omega(e_1,f_1) = 1$. Let $W = \{v: \omega(v,e_1) = \omega(v,f_1) = 0\}$, the intersection of two kernels; show $V = \operatorname{span}(e_1,f_1)\oplus W$ and that $\omega|_W$ is nondegenerate; induct.

</details>

## Historical note
Quadratic forms are older than linear algebra. Gauss's *Disquisitiones Arithmeticae* (1801) made the arithmetic of binary quadratic forms $ax^2 + bxy + cy^2$ a central topic and studied them up to changes of variables, exactly the congruence relation of this episode, though over the integers. Lagrange had already used completing squares to reduce quadratic forms. In 1852 James Joseph Sylvester published a short note in the *Philosophical Magazine* proving that however a real quadratic form is reduced to a sum of positive and negative squares, the numbers of each are fixed; he called it the "law of inertia," since the count "resists" every change of variables. Jacobi had found the same result earlier, but his proof was published only posthumously. The alternating form of Hamiltonian mechanics goes back to Lagrange's and Poisson's brackets; the word "symplectic" was coined by Hermann Weyl in *The Classical Groups* (1939). And in his 1908 lecture *Raum und Zeit*, Hermann Minkowski recast Einstein's special relativity as the geometry of a four-dimensional space carrying an indefinite quadratic form: "Henceforth space by itself, and time by itself, are doomed to fade away into mere shadows."

## Connections
- **Callbacks:** ↩ S2E04 (change of basis $P^{-1}AP$), ↩ S2E06 (covectors, hyperplanes as kernels), ↩ S2E08 (the transpose as the dual map; $V\cong V^*$ requires a choice), ↩ S1E19 (fields; characteristic 2)
- **Sets up:** ↪ S2E10 (bilinear forms $\cong V^*\otimes V^*$), ↪ S2E11 (alternating forms measure signed area and volume), ↪ S2E14 (inner product = symmetric positive definite form), ↪ S2E16 (an inner product as an isomorphism $V\to V^*$), ↪ S2E18 (principal axes: orthogonal diagonalization of a quadratic form), ↪ S3E10 (Riemannian metrics: a positive definite form on every tangent space)
- **Side quests:** Special relativity (attaches after S2E09: Minkowski space and Lorentz transformations); Symplectic geometry (attaches after S3E08: the alternating form of this episode on every tangent space)

## References
- **Primary / historical:** J. J. Sylvester, "A demonstration of the theorem that every homogeneous quadratic polynomial is reducible by real orthogonal substitutions to the form of a sum of positive and negative squares," *Philosophical Magazine*, 4th series (1852).
- **Primary / historical:** Hermann Minkowski, "Raum und Zeit," lecture at the Cologne meeting of the Gesellschaft Deutscher Naturforscher und Ärzte (1908); English translation "Space and Time" in *The Principle of Relativity* (Dover reprint of the 1923 Methuen collection).
- **Textbook:** Kenneth Hoffman and Ray Kunze, *Linear Algebra*, 2nd ed., Prentice-Hall (1971), Chapter 10 "Bilinear Forms" (symmetric and skew-symmetric forms, groups preserving forms).
- **Textbook:** Sheldon Axler, *Linear Algebra Done Right*, 4th ed., Springer (2024), Section 9A "Bilinear Forms and Quadratic Forms."
- **Textbook:** Serge Lang, *Algebra*, revised 3rd ed., Springer GTM 211 (2002), Chapter XV "Structure of Bilinear Forms" (Sylvester's theorem, alternating forms).
- **Textbook:** Steven Roman, *Advanced Linear Algebra*, 3rd ed., Springer GTM 135 (2008), chapter on metric vector spaces (symmetric, skew-symmetric, and alternating forms; Sylvester's law; symplectic geometry).
- **Accessible:** V. I. Arnold, *Mathematical Methods of Classical Mechanics*, 2nd ed., Springer GTM 60 (1989), Chapter 8 "Symplectic manifolds" (the symplectic form in mechanics).
