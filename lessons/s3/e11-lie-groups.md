# S3E11: Lie Groups: Continuous Symmetry

> **Season / Act:** Season 3, Act II (Linear Algebra Goes Curved) · **Target runtime:** 20–25 min ·
> **Prerequisites:** S1E16–S1E17 (groups, homomorphisms, kernels), S1E10 and the Cayley–Dickson side quest (ℂ as rotations; quaternions), S2E13 (the matrix exponential), S2E15 (unitary groups), S3E03 (representations), S3E05–S3E06 (manifolds, tangent spaces); basic Lagrangian mechanics helps for the Noether section ·
> **Builds toward:** S3E12 (groups as one-object categories; representations as functors); side quest on fiber bundles and gauge theory

## Learning objectives
By the end of this lesson the viewer can:
1. Define a Lie group and its Lie algebra, and compute the Lie algebras of $SO(n)$, $SU(2)$, $GL(n)$, and $SL(n)$.
2. Explain the bracket $[X,Y]=XY-YX$ as the second-order leftover of non-commutativity, and compute it for $\mathfrak{so}(3)$.
3. Prove that the exponential of a skew-symmetric matrix is a rotation, and use Rodrigues' formula to exponentiate elements of $\mathfrak{so}(3)$.
4. Construct the 2-to-1 homomorphism $SU(2)\to SO(3)$ and use it to explain the "belt trick" and spin.
5. State and prove Noether's theorem for a one-parameter symmetry of a Lagrangian, and identify the conserved quantities for translations, rotations, and time translation.

## Cold open
*Narration draft.*

Hold a cup of coffee flat on your palm. Now, without spilling, rotate it a full turn: under your arm, around, and back to where it started. The cup is back exactly where it was. Three hundred sixty degrees. Nothing has changed.

Except your arm. Your arm is twisted into an awkward knot, elbow pointing at the sky.

Now keep going. Rotate the cup *another* full turn in the same direction, this time bringing it over your head. And something impossible happens: your arm untwists. After seven hundred twenty degrees, cup *and* arm are back to normal.

Waiters in Bali do this with plates as a dance. Physicists do it with belts. And it's not a party trick. It's telling us something deep about the shape of the set of all rotations. A rotation by 360 degrees is the "same" as no rotation at all, if you only look at the cup. But if you keep track of *how you got there*, the path you took, then one full turn is genuinely different from zero, and two full turns are not.

Electrons know this. An electron rotated by 360 degrees picks up a minus sign. It takes 720 to bring it back.

Tonight: what happens when a group (the algebra of symmetries) is also a smooth space (the geometry of manifolds), and the two structures have to cooperate.

## The story

### 1. When a group is also a manifold

In S1E16 we met groups as symmetries: the 8 symmetries of a square, the 12 positions of a clock. Rotations of 3-dimensional space also form a group,
$$SO(3)=\{R\in\mathbb{R}^{3\times3}: R^{\mathsf T}R=I,\ \det R=1\}.$$
But unlike the square's symmetries, rotations come in continuous families: you can rotate by $10^\circ$, $10.1^\circ$, $10.01^\circ$. In S3E05 we noted that $SO(3)$ is a 3-dimensional manifold (an axis, 2 parameters, plus an angle, 1 parameter).

> **Definition (Lie group).** A **Lie group** is a group $G$ that is also a smooth manifold, such that multiplication $G\times G\to G$ and inversion $G\to G$ are smooth maps.

**Examples.**
- $(\mathbb{R}^n,+)$; the circle $U(1)=\{e^{i\theta}\}\cong SO(2)$ (↩ S1E10, S2E15).
- $GL(n,\mathbb{R})$, the invertible $n\times n$ matrices: an open subset of $\mathbb{R}^{n^2}$ (where $\det\neq0$), so a manifold of dimension $n^2$.
- The **classical groups**: $SL(n)$ ($\det=1$), $O(n)$ and $SO(n)$ (rotations and reflections), $U(n)$ and $SU(n)$ (↩ S2E15). These are closed subgroups of $GL(n,\mathbb{R})$ or $GL(n,\mathbb{C})$, and a theorem of Cartan says every closed subgroup of a Lie group is a Lie group.
- $SU(2)=\left\{\begin{pmatrix}\alpha&-\bar\beta\\ \beta&\bar\alpha\end{pmatrix}:|\alpha|^2+|\beta|^2=1\right\}$. Writing $\alpha,\beta$ in real coordinates, this is the unit sphere $S^3\subset\mathbb{R}^4$.

### 2. The naive attempt and the crisis

The naive approach is to study a Lie group the way we studied finite groups: list elements, write a multiplication table, find subgroups. That fails immediately. $SO(3)$ has uncountably many elements, and its multiplication (composition of rotations about different axes) is a tangle of trigonometry.

The crisis: *how can we capture an infinite, curved, non-commutative object with finite information?* The answer is the move of the whole act: **linearize**. A smooth group looks, near its identity element, like its tangent space there (S3E06). And because the group can translate any point to the identity, the structure near the identity determines the structure near every point.

### 3. The idea: the Lie algebra

> **Definition (Lie algebra of a matrix group).** For a matrix Lie group $G$, its **Lie algebra** is
> $$\mathfrak{g}=T_IG=\{X : e^{tX}\in G\ \text{for all } t\in\mathbb{R}\},$$
> the velocities at $t=0$ of smooth curves in $G$ through $I$. It is a real vector space of dimension $\dim G$.

**Computing them** by differentiating the defining equation along a curve $A(t)$ with $A(0)=I$, $A'(0)=X$:
- $O(n)$, $SO(n)$: from $A^{\mathsf T}A=I$, $X^{\mathsf T}+X=0$. So $\mathfrak{so}(n)=\{X:X^{\mathsf T}=-X\}$, of dimension $\binom n2$; for $n=3$, dimension 3.
- $U(n)$: $\mathfrak{u}(n)=\{X:X^*=-X\}$ (skew-Hermitian). $SU(n)$ adds $\operatorname{tr}X=0$; $\dim\mathfrak{su}(2)=3$.
- $SL(n)$: from $\det A(t)=1$ and $\frac{d}{dt}\det A(t)\big|_0=\operatorname{tr}X$, $\mathfrak{sl}(n)=\{\operatorname{tr}X=0\}$.
- $GL(n)$: all matrices.

**The bracket.** A vector space alone forgets that the group is non-commutative. What remembers it? Take two one-parameter families $e^{\varepsilon X}$ and $e^{\varepsilon Y}$ and form the group commutator. Expanding with $e^{\varepsilon X}=I+\varepsilon X+\tfrac{\varepsilon^2}{2}X^2+O(\varepsilon^3)$,
$$e^{\varepsilon X}e^{\varepsilon Y}e^{-\varepsilon X}e^{-\varepsilon Y}=I+\varepsilon^2(XY-YX)+O(\varepsilon^3).$$
The first-order terms cancel; the second-order leftover is the **Lie bracket** $[X,Y]=XY-YX$. If $G$ is commutative, it is zero.

> **Definition (Lie algebra, abstractly).** A **Lie algebra** is a vector space $\mathfrak{g}$ with a bilinear operation $[\cdot,\cdot]$ that is antisymmetric ($[X,Y]=-[Y,X]$) and satisfies the **Jacobi identity** $[X,[Y,Z]]+[Y,[Z,X]]+[Z,[X,Y]]=0$.

For $\mathfrak{so}(3)$, use the basis of infinitesimal rotations about the three axes:
$$L_x=\begin{pmatrix}0&0&0\\0&0&-1\\0&1&0\end{pmatrix},\quad L_y=\begin{pmatrix}0&0&1\\0&0&0\\-1&0&0\end{pmatrix},\quad L_z=\begin{pmatrix}0&-1&0\\1&0&0\\0&0&0\end{pmatrix}.$$
Then $[L_x,L_y]=L_z$, $[L_y,L_z]=L_x$, $[L_z,L_x]=L_y$ (checked by direct multiplication). Identifying $aL_x+bL_y+cL_z\leftrightarrow(a,b,c)$, the bracket is the **cross product**: $(\mathfrak{so}(3),[\cdot,\cdot])\cong(\mathbb{R}^3,\times)$. Infinitesimal rotations *are* angular velocity vectors, and they fail to commute exactly as the cross product says.

### 4. The exponential map: from infinitesimal to actual

The matrix exponential of S2E13 turns Lie algebra elements into group elements: $\exp:\mathfrak{g}\to G$, $X\mapsto e^X$. The curve $t\mapsto e^{tX}$ is a **one-parameter subgroup** ($e^{sX}e^{tX}=e^{(s+t)X}$), the "flow" generated by the infinitesimal symmetry $X$.

> **Theorem.** If $A$ is a real skew-symmetric $n\times n$ matrix, then $e^A\in SO(n)$.

**Proof.** *Orthogonal.* Transposing the series term by term, $(e^A)^{\mathsf T}=\sum_k\frac{(A^{\mathsf T})^k}{k!}=e^{A^{\mathsf T}}=e^{-A}$. Since $A$ and $-A$ commute, $e^Ae^{-A}=e^{A-A}=e^0=I$ (↩ S2E13: $e^{X+Y}=e^Xe^Y$ when $XY=YX$). Hence $(e^A)^{\mathsf T}e^A=e^{-A}e^A=I$.

*Determinant 1.* For $t\in[0,1]$, the matrix $e^{tA}$ is orthogonal by the same argument (since $tA$ is skew-symmetric), so $\det e^{tA}\in\{+1,-1\}$. The function $t\mapsto\det e^{tA}$ is continuous (a polynomial in the entries, which are continuous in $t$), takes values in the two-point set $\{\pm1\}$, and equals $\det I=1$ at $t=0$. A continuous function from an interval to $\{\pm1\}$ is constant, so $\det e^A=1$. $\blacksquare$

(Alternatively, $\det e^A=e^{\operatorname{tr}A}=e^0=1$, using the identity $\det e^X=e^{\operatorname{tr}X}$, which follows from triangularizing $X$ over $\mathbb{C}$, ↩ S2E15 Schur.)

**Rodrigues' formula.** Let $n$ be a unit vector and $K$ the matrix of $v\mapsto n\times v$. Then $K^3=-K$ (checked symbolically), so the exponential series collapses:
$$e^{\theta K}=I+\sin\theta\,K+(1-\cos\theta)\,K^2,$$
which is the rotation by angle $\theta$ about the axis $n$. Euler's theorem (every rotation of $\mathbb{R}^3$ has an axis) shows that $\exp:\mathfrak{so}(3)\to SO(3)$ is onto.

### 5. Quaternions, $SU(2)$, and the double cover

The Cayley–Dickson side quest promised that quaternions would rotate space. Here is the payoff, in matrix form. Let $\sigma_x,\sigma_y,\sigma_z$ be the Pauli matrices
$$\sigma_x=\begin{pmatrix}0&1\\1&0\end{pmatrix},\quad\sigma_y=\begin{pmatrix}0&-i\\i&0\end{pmatrix},\quad\sigma_z=\begin{pmatrix}1&0\\0&-1\end{pmatrix},$$
and identify a vector $v\in\mathbb{R}^3$ with the traceless Hermitian matrix $v\cdot\sigma=v_x\sigma_x+v_y\sigma_y+v_z\sigma_z$. Note $\det(v\cdot\sigma)=-|v|^2$.

> **Theorem.** For $U\in SU(2)$, the map $v\cdot\sigma\mapsto U(v\cdot\sigma)U^*$ preserves traceless Hermitian matrices and their determinants, so it defines a rotation $\Phi(U)\in SO(3)$, with matrix entries $\Phi(U)_{ij}=\tfrac12\operatorname{tr}(\sigma_iU\sigma_jU^*)$. The map $\Phi:SU(2)\to SO(3)$ is a surjective Lie group homomorphism with kernel $\{\pm I\}$.

*Proof sketch.* Conjugation preserves trace, Hermitian-ness, and determinant, so $\Phi(U)$ preserves $|v|^2$, hence is orthogonal; it is a homomorphism because $(UV)\,X\,(UV)^*=U(VXV^*)U^*$. $SU(2)\cong S^3$ is connected, so $\det\Phi(U)$ is constantly $1$. The kernel consists of $U$ commuting with all Pauli matrices, i.e. scalar matrices in $SU(2)$: $\pm I$. Surjectivity: $\Phi\big(e^{-i\theta\,n\cdot\sigma/2}\big)$ is the rotation by $\theta$ about $n$ (Worked Example 4), and every rotation has this form. (Checked numerically on random elements: $\Phi(AB)=\Phi(A)\Phi(B)$, $\Phi(A)\in SO(3)$, $\Phi(-A)=\Phi(A)$.) $\square$

In quaternion language, $SU(2)$ is the group of unit quaternions, $\mathbb{R}^3$ is the pure imaginary quaternions, and $\Phi(q)$ is $v\mapsto qv\bar q$ (↩ Cayley–Dickson side quest). Topologically, $SO(3)\cong S^3/\{\pm1\}=\mathbb{RP}^3$.

**The belt trick explained.** The path $\theta\mapsto e^{-i\theta\sigma_z/2}$, $0\le\theta\le2\pi$, runs in $SU(2)$ from $I$ to $-I$. Its image in $SO(3)$ is the loop "rotate by $0$ to $360^\circ$ about $z$." That loop cannot be shrunk to a point in $SO(3)$: if it could, the shrinking would lift to $SU(2)$ and the lifted path's endpoint would have to stay at $-I$ while also becoming the constant path at $I$. Going around twice lifts to a path from $I$ to $I$, a loop in $S^3$, which *can* be shrunk. So $\pi_1(SO(3))=\mathbb{Z}/2$: one full turn is "twisted," two full turns are not. Your arm records the path, not just the endpoint.

**Spin.** Quantum states transform under representations (↩ S3E03), and physically only the projective action matters, so the relevant group is $SU(2)$, not $SO(3)$. The irreducible representations of $\mathfrak{su}(2)\cong\mathfrak{so}(3)$ have dimensions $1,2,3,\dots$ (spin $j=0,\tfrac12,1,\dots$, dimension $2j+1$). Those of half-integer spin are representations of $SU(2)$ in which $-I$ acts as $-1$: they do not descend to $SO(3)$. An electron (spin $\tfrac12$) changes sign under a $360^\circ$ rotation.

**One algebra, two groups.** $SU(2)$ and $SO(3)$ have isomorphic Lie algebras but are different groups. The Lie algebra captures everything *local*; the global topology is extra data. (Lie's correspondence: each finite-dimensional real Lie algebra comes from exactly one simply connected Lie group, here $SU(2)$.)

### 6. Noether's theorem: symmetry gives conservation

Let a mechanical system have coordinates $q=(q_1,\dots,q_n)$ and Lagrangian $L(q,\dot q)$, with equations of motion $\frac{d}{dt}\frac{\partial L}{\partial\dot q_i}=\frac{\partial L}{\partial q_i}$ (Euler–Lagrange).

> **Theorem (Noether, 1918; mechanics version).** Suppose a one-parameter group of transformations $\varphi_s$ of configuration space leaves $L$ invariant: $L\big(\varphi_s(q),\tfrac{d}{dt}\varphi_s(q)\big)=L(q,\dot q)$ for all $s$. Let $\xi(q)=\frac{d}{ds}\varphi_s(q)\big|_{s=0}$ be its infinitesimal generator (a Lie algebra element, acting as a vector field). Then
> $$Q=\sum_i\frac{\partial L}{\partial\dot q_i}\,\xi_i(q)$$
> is constant along every solution of the equations of motion.

**Proof.** Along a solution,
$$\frac{dQ}{dt}=\sum_i\Big(\frac{d}{dt}\frac{\partial L}{\partial\dot q_i}\Big)\xi_i+\sum_i\frac{\partial L}{\partial\dot q_i}\frac{d\xi_i}{dt}
=\sum_i\frac{\partial L}{\partial q_i}\xi_i+\sum_i\frac{\partial L}{\partial\dot q_i}\dot\xi_i ,$$
using Euler–Lagrange in the first sum. The right side is exactly $\frac{d}{ds}\Big|_{s=0}L\big(\varphi_s(q),\tfrac{d}{dt}\varphi_s(q)\big)$ by the chain rule (the velocity of $\varphi_s(q(t))$ varies with $s$ at rate $\dot\xi$). By invariance this derivative is $0$. $\blacksquare$

| Symmetry (one-parameter group) | Generator $\xi$ | Conserved quantity |
|---|---|---|
| translation in $x$ | $(1,0,0)$ | momentum $p_x=m\dot x$ |
| rotation about $z$ ($e^{sL_z}$) | $L_zq=(-y,x,0)$ | angular momentum $L_z=m(x\dot y-y\dot x)$ |
| time translation (if $L$ has no explicit $t$) | — | energy $E=\sum\dot q_i\frac{\partial L}{\partial\dot q_i}-L$ |

The rotation row is the Lie algebra at work: the generator is $L_z\in\mathfrak{so}(3)$, and the three angular momentum components correspond to the basis $L_x,L_y,L_z$. In quantum mechanics their commutation relations are $\mathfrak{so}(3)$'s bracket, and quantized angular momentum is the representation theory of $\mathfrak{su}(2)$.

### Payoff and zoom-out
The coffee-cup trick is $\pi_1(SO(3))=\mathbb{Z}/2$, seen through the double cover $SU(2)\to SO(3)$. **Build or Describe?** *Build:* $SO(3)$ as $3\times3$ matrices with $R^{\mathsf T}R=I$; *describe:* $SO(3)$ as unit quaternions modulo $\pm1$, or as "the group generated by exponentiating $\mathfrak{so}(3)$." **Thread: symmetry means what stays fixed.** Continuous symmetries are captured by a vector space with a bracket, and every one of them, by Noether, makes a quantity stay fixed in time.

**Teaser.** Groups have homomorphisms, vector spaces have linear maps, manifolds have smooth maps, Lie groups have smooth homomorphisms, and the Lie algebra construction turns each smooth homomorphism into a linear map that preserves brackets. Every story in this series has had objects *and* structure-preserving maps between them. What if the maps are the whole story? (↪ S3E12)

## Worked examples

### Example 1: $\exp$ on $\mathfrak{so}(2)$ recovers $e^{i\theta}$
Let $J=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$, so $\mathfrak{so}(2)=\{\theta J\}$. Then $J^2=-I$, $J^3=-J$, $J^4=I$, and the powers cycle. Splitting the series into even and odd terms:
$$e^{\theta J}=\Big(1-\tfrac{\theta^2}{2!}+\tfrac{\theta^4}{4!}-\cdots\Big)I+\Big(\theta-\tfrac{\theta^3}{3!}+\cdots\Big)J=\begin{pmatrix}\cos\theta&-\sin\theta\\ \sin\theta&\cos\theta\end{pmatrix}.$$
This is Euler's formula $e^{i\theta}=\cos\theta+i\sin\theta$ with $i$ replaced by $J$ (↩ S1E10: multiplication by $i$ is a quarter turn). The same computation with $L_z$ gives the rotation about the $z$-axis.

### Example 2: Rodrigues for a $120^\circ$ turn about $(1,1,1)$
Take $n=\frac1{\sqrt3}(1,1,1)$ and $\theta=\frac{2\pi}3$.

**Step 1.** $K=\frac1{\sqrt3}(L_x+L_y+L_z)=\frac1{\sqrt3}\begin{pmatrix}0&-1&1\\1&0&-1\\-1&1&0\end{pmatrix}$.

**Step 2.** $K^2=\frac13\begin{pmatrix}-2&1&1\\1&-2&1\\1&1&-2\end{pmatrix}$ (which equals $nn^{\mathsf T}-I$).

**Step 3.** $\sin\frac{2\pi}3=\frac{\sqrt3}2$ and $1-\cos\frac{2\pi}3=\frac32$, so
$$e^{\theta K}=I+\tfrac{\sqrt3}{2}K+\tfrac32K^2=I+\tfrac12\begin{pmatrix}0&-1&1\\1&0&-1\\-1&1&0\end{pmatrix}+\tfrac12\begin{pmatrix}-2&1&1\\1&-2&1\\1&1&-2\end{pmatrix}=\begin{pmatrix}0&0&1\\1&0&0\\0&1&0\end{pmatrix}.$$

**Step 4 (check).** This matrix sends $e_1\mapsto e_2\mapsto e_3\mapsto e_1$: the $120^\circ$ rotation that cycles the coordinate axes, as symmetry predicts. It is orthogonal with determinant $1$, and its trace $0$ equals $1+2\cos\theta$. (Matched by sympy's matrix exponential.)

### Example 3: The bracket as a leftover rotation
Compute $C(\varepsilon)=e^{\varepsilon L_x}e^{\varepsilon L_y}e^{-\varepsilon L_x}e^{-\varepsilon L_y}$ to second order. Using $e^{\pm\varepsilon X}=I\pm\varepsilon X+\frac{\varepsilon^2}2X^2+O(\varepsilon^3)$ and multiplying out, the terms of order $\varepsilon$ cancel; at order $\varepsilon^2$ the squares cancel against the cross terms $-X^2,-Y^2$ except for $XY-YX$ (and $-XY+YX$ pieces combine into $+[X,Y]$). Result:
$$C(\varepsilon)=\begin{pmatrix}1&-\varepsilon^2&0\\ \varepsilon^2&1&0\\0&0&1\end{pmatrix}+O(\varepsilon^3)=I+\varepsilon^2L_z+O(\varepsilon^3).$$
(Verified symbolically.) Physically: pitch, yaw, un-pitch, un-yaw, and you are left with a small roll. Pilots and smartphone gyroscopes live with this.

### Example 4: $SU(2)\to SO(3)$ in coordinates
Let $U_\theta=e^{-i\theta\sigma_z/2}=\operatorname{diag}(e^{-i\theta/2},e^{i\theta/2})$.

**Step 1.** $U_\theta\sigma_xU_\theta^*=\begin{pmatrix}0&e^{-i\theta}\\e^{i\theta}&0\end{pmatrix}=\cos\theta\,\sigma_x+\sin\theta\,\sigma_y$. So $e_x\mapsto(\cos\theta,\sin\theta,0)$.

**Step 2.** Similarly $U_\theta\sigma_yU_\theta^*=-\sin\theta\,\sigma_x+\cos\theta\,\sigma_y$, and $U_\theta\sigma_zU_\theta^*=\sigma_z$ (diagonal matrices commute).

**Step 3.** Hence $\Phi(U_\theta)=\begin{pmatrix}\cos\theta&-\sin\theta&0\\ \sin\theta&\cos\theta&0\\0&0&1\end{pmatrix}$, the rotation by $\theta$ about $z$, while $U_\theta$ itself has the *half* angle $\theta/2$.

**Step 4.** At $\theta=2\pi$: $\Phi(U_{2\pi})=I$ but $U_{2\pi}=\operatorname{diag}(e^{-i\pi},e^{i\pi})=-I$. Only at $\theta=4\pi$ does $U_\theta$ return to $I$. (Similarly $\Phi(e^{-i\theta\sigma_x/2})$ is the rotation about $x$; all checked with sympy.)

### Example 5: Noether in a uniform gravitational field
A particle of mass $m$ with $L=\frac m2(\dot x^2+\dot y^2+\dot z^2)-mgz$.

**Symmetries.** $L$ is unchanged by translations in $x$ and $y$, by rotations about the vertical $z$-axis (they preserve $\dot x^2+\dot y^2$ and $z$), and by time translation. It is *not* invariant under translation in $z$ (the potential changes) or rotation about $x$ (it mixes $y$ and $z$).

**Conserved quantities.** $p_x=m\dot x$, $p_y=m\dot y$; for the rotation, $\xi=(-y,x,0)$ gives $Q=m\dot x(-y)+m\dot y\,x=m(x\dot y-y\dot x)=L_z$; and $E=\frac m2|\dot q|^2+mgz$.

**Check against the equations of motion** ($\ddot x=\ddot y=0$, $\ddot z=-g$): $\dot L_z=m(x\ddot y-y\ddot x)=0$ ✓, while $\frac{d}{dt}(m\dot z)=-mg\neq0$ and $\frac{d}{dt}\,m(y\dot z-z\dot y)=m(y\ddot z-z\ddot y)=-mgy\neq0$. Broken symmetry, no conservation law. (All verified with sympy; for a general central potential $V(|q|)$, all three components of angular momentum and the energy are conserved.)

## Visual and animation notes
1. **Cold open:** live action or stylized animation of the plate/cup trick, with a ribbon from the cup to a fixed wall that twists after $360^\circ$ and untwists after $720^\circ$.
2. **Group + manifold:** $SO(3)$ drawn as a solid ball of radius $\pi$ (axis = direction, angle = distance from the center), with antipodal boundary points glowing and blurring together (**equivalence class motif**, ↩ S1E05, S3E05 quotients).
3. **Lie algebra:** a **tangent plane** at the identity of a curved surface representing $G$; blue arrows in the plane (Lie algebra elements) curl up into curves on the surface under $\exp$.
4. **Bracket:** a small square path in the Lie algebra mapped to the group fails to close up; the gap vector lights up and is labeled $\varepsilon^2[X,Y]$.
5. **Rodrigues:** a cube spinning about its diagonal; after $120^\circ$, the axes have permuted. The **badge** "$\det=1$, $R^{\mathsf T}R=I$" stays fixed.
6. **Double cover:** a 3-sphere (shown as nested 2-spheres or via stereographic projection) above, $SO(3)$ below, two points $\pm U$ connected by **bijection threads** to the same rotation; a path from $I$ to $-I$ above projects to a closed loop below.
7. **Belt trick:** a belt fixed at one end; the other end rotated $360^\circ$ (twist can't be removed), then $720^\circ$, and the belt is untwisted by passing it around the buckle.
8. **Noether:** a table with symmetries on the left and conserved quantities on the right, connected by threads; a ball in a gravity field with $p_x$, $L_z$, $E$ as fixed **invariant badges** and $p_z$ visibly changing.

## Common misconceptions
- **Misconception:** "The Lie algebra is just the tangent space; it has no more structure than a vector space." **Reality:** the bracket records the group's non-commutativity to second order, and (for connected groups) determines the group locally.
- **Misconception:** "The same Lie algebra means the same group." **Reality:** $SU(2)$ and $SO(3)$ share a Lie algebra but differ globally (double cover); $\mathbb{R}$ and $U(1)$ share one too.
- **Misconception:** "$e^{X+Y}=e^Xe^Y$ always." **Reality:** only when $XY=YX$. The failure is governed by the bracket (Baker–Campbell–Hausdorff: $e^Xe^Y=e^{X+Y+\frac12[X,Y]+\cdots}$).
- **Misconception:** "Spin $\tfrac12$ means the particle is physically spinning." **Reality:** spin is a label of an $SU(2)$ representation; half-integer spin means the representation does not factor through $SO(3)$.
- **Misconception:** "Noether's theorem says every conserved quantity comes from a symmetry of space." **Reality:** it says each continuous symmetry of the action gives a conserved quantity (and conversely, in her full theorem, under suitable conditions); the symmetry can be abstract (gauge phase → electric charge).

## Exercises
- **Warm-up:** (a) Compute $e^{tN}$ for $N=\begin{pmatrix}0&1\\0&0\end{pmatrix}$ and decide which group the curve lies in. (b) Verify $[L_y,L_z]=L_x$. (c) Find $\dim SO(4)$ and $\dim SU(3)$.
- **Core:** (a) Show that $\mathfrak{sl}(2,\mathbb{R})$ has basis $H=\operatorname{diag}(1,-1)$, $E=\begin{pmatrix}0&1\\0&0\end{pmatrix}$, $F=\begin{pmatrix}0&0\\1&0\end{pmatrix}$ and compute all brackets. (b) Explain why $\Phi(U)=\Phi(-U)$ follows from the formula $U(v\cdot\sigma)U^*$. (c) For a free particle, which conserved quantity comes from Galilean boosts?
- **Stretch:** (a) Prove $\det e^X=e^{\operatorname{tr}X}$ by showing $f(t)=\det e^{tX}$ satisfies $f'=(\operatorname{tr}X)f$. (b) Prove the Jacobi identity for the commutator bracket. (c) Show that $\exp:\mathfrak{sl}(2,\mathbb{R})\to SL(2,\mathbb{R})$ is not onto, by showing $\begin{pmatrix}-2&0\\0&-1/2\end{pmatrix}$ is not an exponential (hint: eigenvalues of $e^X$).

<details><summary>Hints and answers</summary>

- **Warm-up:** (a) $N^2=0$, so $e^{tN}=\begin{pmatrix}1&t\\0&1\end{pmatrix}$, a shear, in $SL(2,\mathbb{R})$ (not compact; ↩ S2E13). (b) Multiply out. (c) $\binom42=6$; $3^2-1=8$.
- **Core:** (a) $[H,E]=2E$, $[H,F]=-2F$, $[E,F]=H$. (b) $(-U)X(-U)^*=UXU^*$. (c) The center-of-mass theorem: $mx-tp$ is conserved (for a single particle, $x(t)-t\dot x$), i.e. uniform motion of the center of mass.
- **Stretch:** (a) $\det e^{(t+h)X}=\det e^{tX}\det e^{hX}$ and $\det(I+hX)=1+h\operatorname{tr}X+O(h^2)$. (b) Expand all twelve terms; they cancel in pairs. (c) If $X\in\mathfrak{sl}(2,\mathbb{R})$ has eigenvalues $\pm\lambda$, then $e^X$ has eigenvalues $e^{\pm\lambda}$: either both positive (λ real), or a conjugate pair on the unit circle (λ imaginary), or $X$ is nilpotent ($e^X$ has eigenvalue 1). Distinct negative eigenvalues $-2,-\frac12$ are impossible.
</details>

## Historical note
Sophus Lie, a Norwegian mathematician, set out in the 1870s to do for differential equations what Galois had done for polynomials (↩ S1E20): use the symmetries of an equation to solve it. His "continuous transformation groups," and their infinitesimal generators, were written up with Friedrich Engel in *Theorie der Transformationsgruppen* (three volumes, 1888–1893). Wilhelm Killing and Élie Cartan classified the simple Lie algebras around 1888–1894; the term "Lie algebra" itself came later, introduced by Hermann Weyl in the 1930s. The quaternions date from 16 October 1843, when William Rowan Hamilton carved $i^2=j^2=k^2=ijk=-1$ into Broom (Brougham) Bridge in Dublin; Olinde Rodrigues had already published the composition law for rotations in 1840. In 1918, at the invitation of Hilbert and Klein, who were puzzling over energy conservation in general relativity, Emmy Noether proved her theorems relating symmetries of an action to conservation laws, in "Invariante Variationsprobleme." In 1939 Eugene Wigner classified elementary particles as unitary irreducible representations of the symmetry group of spacetime, making "particles are representations" a precise statement.

## Connections
- **Callbacks:** ↩ S1E10 ($e^{i\theta}$ as rotation), ↩ S1E16 and ↩ S1E17 (groups, homomorphisms, kernels), ↩ S1E20 (Galois: symmetry solves equations), ↩ S2E13 (matrix exponential), ↩ S2E15 (unitary groups, Schur), ↩ S3E03 (representations; particles as representations), ↩ S3E05 ($SO(3)$ as a manifold; quotients), ↩ S3E06 (tangent spaces), ↩ Cayley–Dickson side quest (quaternions).
- **Sets up:** ↪ S3E12 (a group is a one-object category; a representation is a functor; Lie's construction is a functor from Lie groups to Lie algebras).
- **Side quests:** Fiber bundles and gauge theory ($U(1)$, $SU(2)$, $SU(3)$ as gauge groups of the Standard Model); Symplectic geometry (Noether via moment maps); Geometric algebra (rotors as "sandwiches").

## References
- **Primary / historical:** Emmy Noether, "Invariante Variationsprobleme," *Nachrichten von der Gesellschaft der Wissenschaften zu Göttingen, Math.-Phys. Klasse* (1918); English translation by M. A. Tavel, "Invariant Variation Problems," *Transport Theory and Statistical Physics* 1 (1971).
- **Primary / historical:** Sophus Lie and Friedrich Engel, *Theorie der Transformationsgruppen*, 3 vols. (Teubner, 1888–1893).
- **Textbook:** Brian C. Hall, *Lie Groups, Lie Algebras, and Representations: An Elementary Introduction*, 2nd ed. (Springer GTM 222, 2015), Ch. 1 "Matrix Lie Groups," Ch. 2 "The Matrix Exponential," Ch. 3 "Lie Algebras."
- **Textbook / accessible:** John Stillwell, *Naive Lie Theory* (Springer Undergraduate Texts in Mathematics, 2008), Ch. 1 (complex numbers and quaternions as rotations) and the chapter on the exponential map.
- **Textbook:** John M. Lee, *Introduction to Smooth Manifolds*, 2nd ed. (Springer GTM 218, 2013), Ch. 7 "Lie Groups" and Ch. 20 "The Exponential Map."
- **Physics:** V. I. Arnold, *Mathematical Methods of Classical Mechanics*, 2nd ed. (Springer GTM 60, 1989), Ch. 4, §20 "Noether's theorem."
- **Accessible / historical:** Yvette Kosmann-Schwarzbach, *The Noether Theorems: Invariance and Conservation Laws in the Twentieth Century* (Springer, 2011).
