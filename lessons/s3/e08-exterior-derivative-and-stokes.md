# S3E08: The Exterior Derivative and Stokes' Theorem

> **Season / Act:** Season 3, Act II (Linear Algebra Goes Curved) · **Target runtime:** 20–25 min ·
> **Prerequisites:** S3E07 (differential forms, wedge, pullback, integration), S3E06 ($df$ as a covector field), S2E08 (dual maps and the transpose), S2E11 (Hodge star and the cross product); the classical theorems of Green, Stokes, and Gauss at the level of a multivariable calculus course (re-derived here) ·
> **Builds toward:** S3E09 (closed vs. exact forms, cohomology, Maxwell), S3E10 (Gauss–Bonnet as a Stokes-type theorem), S3E12 (chain complexes and duality as functors)

## Learning objectives
By the end of this lesson the viewer can:
1. Define the exterior derivative $d:\Omega^k\to\Omega^{k+1}$, compute it in coordinates, and prove $d\circ d=0$.
2. Translate grad, curl, and div in $\mathbb{R}^3$ into $d$ acting on 0-, 1-, and 2-forms, and see the identities $\operatorname{curl}\circ\operatorname{grad}=0$ and $\operatorname{div}\circ\operatorname{curl}=0$ as $d^2=0$.
3. State the generalized Stokes theorem $\int_{\partial M}\omega=\int_M d\omega$, prove it for a rectangle, and recover FTC, Green, Kelvin–Stokes, and Gauss as special cases.
4. Explain "$d$ is the dual of $\partial$": integration pairs chains with forms, and Stokes says $d$ is the transpose of the boundary operator.

## Cold open
*Narration draft.*

Open any vector calculus textbook to the last chapter and you'll find a shrine. Four theorems, each with its own name, its own picture, its own page of proof.

The Fundamental Theorem of Calculus: integrate a derivative over an interval, and you get the difference of the endpoint values. Green's theorem: integrate a "curl-like" expression over a region in the plane, and you get a circulation around its edge. Stokes' theorem: the flux of a curl through a curved surface equals the circulation around its rim. Gauss's divergence theorem: the total divergence inside a solid equals the flux out through its skin.

Students memorize all four. They memorize which one has the dot product, which one has the cross product, which one needs an outward normal and which one needs the right-hand rule.

But look at them side by side. Each says the same thing: *the integral of a derivative over a region equals the integral of the original thing over the boundary of the region.* Four different derivatives, four different kinds of region, one sentence.

What if that sentence is the theorem, and the four "theorems" are just that one sentence translated into four dialects? Tonight we learn the language in which the translation becomes unnecessary. The four pages of the shrine collapse into one line:
$$\int_{\partial M}\omega=\int_M d\omega.$$

## The story

### 1. The naive attempt: four theorems, four derivatives

Here are the four theorems in their usual forms, for nice regions with the usual orientations.

| Name | Statement | Region | "Derivative" |
|---|---|---|---|
| FTC | $\int_a^b f'(x)\,dx = f(b)-f(a)$ | interval | $f'$ |
| Green | $\iint_D (Q_x-P_y)\,dA = \oint_{\partial D} P\,dx+Q\,dy$ | planar region | "scalar curl" |
| Kelvin–Stokes | $\iint_S (\nabla\times F)\cdot n\,dA = \oint_{\partial S} F\cdot dr$ | surface in $\mathbb{R}^3$ | curl |
| Gauss | $\iiint_V \nabla\cdot F\,dV = \oiint_{\partial V} F\cdot n\,dA$ | solid in $\mathbb{R}^3$ | div |

The naive approach is to prove each separately (the textbook way) and to remember a separate list of identities: $\nabla\times(\nabla f)=0$ and $\nabla\cdot(\nabla\times F)=0$. These look like two more unrelated facts. The pattern is visible, but the dialects hide it: dot products, cross products, unit normals, and the right-hand rule are all *metric* and *orientation* bookkeeping, layered on top of something simpler.

### 2. The crisis: one derivative for all degrees

In S3E07 we learned that what you integrate over a $k$-dimensional region is a $k$-form. On the left side of every theorem above, the integrand has one degree more than on the right side. So what we need is a single operation
$$d:\Omega^k(M)\to\Omega^{k+1}(M)$$
that (i) is the familiar $df$ on functions, (ii) is linear, (iii) obeys a product rule compatible with the sign rules of the wedge, and (iv) is coordinate-free, so that it makes sense on a manifold. Requirement (iv) is the real test: partial derivatives of coefficients are coordinate-dependent, so we need a combination of them that transforms correctly.

### 3. The construction: the exterior derivative

> **Definition (exterior derivative on $\mathbb{R}^n$ or in a chart).** For a $k$-form written as $\omega=\sum_I \omega_I\,dx^I$ (where $dx^I=dx^{i_1}\wedge\cdots\wedge dx^{i_k}$),
> $$d\omega := \sum_I d\omega_I\wedge dx^I = \sum_I\sum_{j=1}^n \frac{\partial\omega_I}{\partial x^j}\,dx^j\wedge dx^I .$$

The same formula holds if the multi-indices $I$ are not in increasing order, since reordering $dx^I$ multiplies both sides by the same sign.

> **Theorem (characterization of $d$).** On any smooth manifold there is a unique family of maps $d:\Omega^k(M)\to\Omega^{k+1}(M)$ such that
> 1. $d$ is $\mathbb{R}$-linear;
> 2. on functions, $df$ is the differential of S3E06;
> 3. **graded Leibniz rule:** $d(\alpha\wedge\beta)=d\alpha\wedge\beta+(-1)^k\alpha\wedge d\beta$ for $\alpha\in\Omega^k$;
> 4. $d\circ d=0$.
>
> Moreover $d$ commutes with pullback: $F^*(d\omega)=d(F^*\omega)$ for every smooth map $F$.

*Proof sketch.* Uniqueness: properties 1–4 force $d(f\,dx^{i_1}\wedge\cdots\wedge dx^{i_k}) = df\wedge dx^{i_1}\wedge\cdots\wedge dx^{i_k}$, because each $dx^{i}$ is $d$ of a function and so $d(dx^i)=0$. Existence: the coordinate formula satisfies 1–4 (we prove 4 below), and uniqueness shows that the formulas from overlapping charts agree, so they glue. Pullback: both $F^*\circ d$ and $d\circ F^*$ satisfy the same rules and agree on functions by the chain rule. $\square$

The last statement is the "different perspective" of the episode: **$d$ is a derivative that does not need coordinates, a metric, or an orientation.** Only the *integral* needs an orientation, and only the *translation into vector fields* needs a metric.

Now the key identity, with a complete proof.

> **Theorem ($d^2=0$).** For every $k$-form $\omega$ on an open subset of $\mathbb{R}^n$, $d(d\omega)=0$.

**Proof.** By linearity it suffices to treat $\omega=f\,dx^I$ with $f$ smooth. Then $d\omega=\sum_{i}\partial_i f\,dx^i\wedge dx^I$, and applying the definition again,
$$d(d\omega)=\sum_{i=1}^n\sum_{j=1}^n \partial_j\partial_i f\;dx^j\wedge dx^i\wedge dx^I .$$
Split the double sum. Terms with $i=j$ contain $dx^i\wedge dx^i=0$. The remaining terms come in pairs $\{(i,j),(j,i)\}$ with $i\neq j$, contributing
$$\big(\partial_j\partial_i f-\partial_i\partial_j f\big)\,dx^j\wedge dx^i\wedge dx^I ,$$
using $dx^i\wedge dx^j=-dx^j\wedge dx^i$. By equality of mixed partials (Clairaut–Schwarz, valid since $f$ is $C^2$), every bracket is zero. Hence $d(d\omega)=0$. $\blacksquare$

So $d^2=0$ is *symmetry of second derivatives* meeting *antisymmetry of the wedge*. One is symmetric, one is antisymmetric, and their pairing is zero, the same reason the trace of a symmetric matrix times an antisymmetric one vanishes.

### 4. grad, curl, and div are all $d$

In $\mathbb{R}^3$ the dimensions of $\Omega^0,\Omega^1,\Omega^2,\Omega^3$ are $1,3,3,1$, so 1-forms and 2-forms each have three components and can be disguised as vector fields. The disguises use two pieces of extra structure.

- **The metric** (the dot product, ↩ S2E14, S2E16): a vector field $F=(P,Q,R)$ corresponds to the 1-form $F^\flat=P\,dx+Q\,dy+R\,dz$ (Riesz: vector ↦ "dot with it").
- **The Hodge star** (metric plus orientation, ↩ S2E11): $\star dx=dy\wedge dz$, $\star dy=dz\wedge dx$, $\star dz=dx\wedge dy$, and $\star 1=dx\wedge dy\wedge dz$. So $F$ also corresponds to the 2-form $\star F^\flat=P\,dy\wedge dz+Q\,dz\wedge dx+R\,dx\wedge dy$ (its flux form).

Now compute $d$ in each degree:

$$\begin{aligned}
df &= f_x\,dx+f_y\,dy+f_z\,dz = (\nabla f)^\flat,\\
d(F^\flat) &= (R_y-Q_z)\,dy\wedge dz+(P_z-R_x)\,dz\wedge dx+(Q_x-P_y)\,dx\wedge dy=\star(\nabla\times F)^\flat,\\
d(\star F^\flat) &= (P_x+Q_y+R_z)\,dx\wedge dy\wedge dz = (\nabla\cdot F)\,\star 1 .
\end{aligned}$$

The diagram

$$\Omega^0\xrightarrow{\ d\ }\Omega^1\xrightarrow{\ d\ }\Omega^2\xrightarrow{\ d\ }\Omega^3
\qquad\longleftrightarrow\qquad
\text{functions}\xrightarrow{\ \operatorname{grad}\ }\text{fields}\xrightarrow{\ \operatorname{curl}\ }\text{fields}\xrightarrow{\ \operatorname{div}\ }\text{functions}$$

commutes with the disguises. Therefore:

> **Corollary.** $\nabla\times(\nabla f)=0$ and $\nabla\cdot(\nabla\times F)=0$ are both the single identity $d^2=0$.

(Both identities, and the three formulas above, were checked symbolically with sympy for arbitrary smooth $f,P,Q,R$.) The cross product's peculiarity, existing only in three dimensions, is now explained twice over: curl is $d$ on 1-forms, landing in 2-forms, and only in $\mathbb{R}^3$ does $\star$ turn 2-forms back into vectors. In $\mathbb{R}^4$, the "curl" of a field has six components.

### 5. Stokes' theorem

> **Theorem (generalized Stokes).** Let $M$ be an oriented smooth $n$-manifold with boundary $\partial M$, carrying the induced orientation (outward direction first), and let $\omega$ be a compactly supported $(n-1)$-form on $M$. Then
> $$\int_{\partial M}\omega=\int_M d\omega .$$

For $n=1$, $M=[a,b]$, $\omega=f$ a function, $\partial M=\{b\}-\{a\}$ (points with signs), and the theorem is FTC. For $n=2$ in the plane it is Green. For a surface in $\mathbb{R}^3$ with $\omega=F^\flat$, it is Kelvin–Stokes. For a solid with $\omega=\star F^\flat$, it is Gauss. The dot products, normals, and right-hand rules were the dictionary of Section 4 plus the induced orientation.

Here is a complete proof in the most important special case. It contains the whole idea: *Stokes is FTC applied one variable at a time.*

> **Theorem (Green's theorem for a rectangle, via $d$).** Let $R=[a,b]\times[c,d]$ with the standard orientation and let $\omega=P\,dx+Q\,dy$ be smooth on a neighborhood of $R$. Then $\oint_{\partial R}\omega=\iint_R d\omega$.

**Proof.** First, $d\omega=dP\wedge dx+dQ\wedge dy=P_y\,dy\wedge dx+Q_x\,dx\wedge dy=(Q_x-P_y)\,dx\wedge dy$. So
$$\iint_R d\omega=\int_c^d\!\!\int_a^b Q_x\,dx\,dy-\int_a^b\!\!\int_c^d P_y\,dy\,dx
=\int_c^d\big[Q(b,y)-Q(a,y)\big]dy-\int_a^b\big[P(x,d)-P(x,c)\big]dx,$$
using FTC in the inner integrals (and Fubini to choose the order). Now the boundary, counterclockwise, as four edges:
- bottom, $y=c$, $x$ from $a$ to $b$: $dy=0$, contributes $\int_a^b P(x,c)\,dx$;
- right, $x=b$, $y$ from $c$ to $d$: $dx=0$, contributes $\int_c^d Q(b,y)\,dy$;
- top, $y=d$, $x$ from $b$ to $a$: contributes $-\int_a^b P(x,d)\,dx$;
- left, $x=a$, $y$ from $d$ to $c$: contributes $-\int_c^d Q(a,y)\,dy$.

The sum of the four edges is exactly the expression above. $\blacksquare$

*Sketch for the general theorem.* Both sides are linear in $\omega$. A partition of unity writes $\omega$ as a sum of forms each supported in one chart, and charts look like either $\mathbb{R}^n$ or the half-space $\{x^n\ge0\}$. In such a chart, $\omega=\sum_j \omega_j\,dx^1\wedge\cdots\widehat{dx^j}\cdots\wedge dx^n$, and $d\omega=\sum_j(-1)^{j-1}\partial_j\omega_j\,dx^1\wedge\cdots\wedge dx^n$. Integrating $\partial_j\omega_j$ in the variable $x^j$ by FTC gives zero (compact support) unless $j=n$ and we are in the half-space, where it gives exactly the boundary integral. The sign conventions for the induced orientation are chosen to make this come out right.

### 6. $d$ is the dual of $\partial$

Stokes' theorem has a hidden linear-algebra structure. Let $C_k$ be the vector space of **$k$-chains**: formal linear combinations of oriented $k$-dimensional pieces (parametrized cubes or simplices). The boundary of a piece is a chain of one dimension lower, giving a linear map $\partial:C_k\to C_{k-1}$. Integration defines a **pairing**
$$\langle c,\omega\rangle := \int_c\omega,\qquad C_k\times\Omega^k\to\mathbb{R},$$
bilinear, exactly like a covector measuring a vector (↩ S2E06). In this notation Stokes reads
$$\langle \partial c,\omega\rangle = \langle c, d\omega\rangle .$$
That is the defining equation of a dual map (↩ S2E08): **$d$ is the transpose of $\partial$.**

And the boundary operator satisfies its own identity: **$\partial\circ\partial=0$**, "the boundary of a boundary is empty." The boundary of a filled square is a closed loop, and a closed loop has no endpoints: each corner appears twice, once as an end and once as a start, with opposite signs. The two identities mirror each other:
$$\langle c, d(d\omega)\rangle=\langle\partial c, d\omega\rangle=\langle\partial\partial c,\omega\rangle = 0 .$$
Geometry ($\partial^2=0$) and calculus ($d^2=0$) are transposes of one another.

**Build or Describe?** *Build:* four theorems with four proofs, each using a specific formula for curl or div. *Describe:* there is a unique coordinate-free $d$ (characterized by four properties), and Stokes says it is the transpose of $\partial$.

**Thread: duality.** Regions and forms are dual. Vectors and covectors (S2E06), $V$ and $V^*$ (S2E08), chains and forms: the same picture three times.

**Teaser.** On $\mathbb{R}^3$, a field with zero curl is always a gradient. But around a drain, the swirling water has zero curl everywhere, and yet its circulation around the drain is not zero. If $d^2=0$ says "exact implies closed," what measures the failure of the converse? (↪ S3E09)

## Worked examples

### Example 1: Computing $d$, and seeing $d^2=0$
**(a)** Let $f=x^2yz$ on $\mathbb{R}^3$. Then $df=2xyz\,dx+x^2z\,dy+x^2y\,dz$. Applying $d$:
$$\begin{aligned}
d(df)&=d(2xyz)\wedge dx+d(x^2z)\wedge dy+d(x^2y)\wedge dz\\
&=(2xz\,dy+2xy\,dz)\wedge dx+(2xz\,dx+x^2\,dz)\wedge dy+(2xy\,dx+x^2\,dy)\wedge dz\\
&=2xz(dy\wedge dx+dx\wedge dy)+2xy(dz\wedge dx+dx\wedge dz)+x^2(dz\wedge dy+dy\wedge dz)=0 .
\end{aligned}$$
Each pair cancels: the mixed partials agree, the wedges disagree.

**(b)** Return to S3E07, Example 2. For $\omega=xy\,dx+x^2\,dy$:
$d\omega = x\,dy\wedge dx+2x\,dx\wedge dy = x\,dx\wedge dy\neq0$. For $\eta=y^2\,dx+2xy\,dy$: $d\eta=2y\,dy\wedge dx+2y\,dx\wedge dy=0$. Since $d(df)=0$ for every $f$, $\omega$ cannot be $df$ for any $f$. That explains why $\omega$'s integral depended on the path while $\eta=d(xy^2)$'s did not.

### Example 2: Green's theorem on a rectangle, checked by hand
Take $R=[0,2]\times[0,1]$ and $\omega=-y^2\,dx+xy\,dy$, so $P=-y^2$, $Q=xy$.

**Interior.** $d\omega=(Q_x-P_y)\,dx\wedge dy=(y+2y)\,dx\wedge dy=3y\,dx\wedge dy$, and
$\iint_R 3y\,dx\,dy=\int_0^2 dx\cdot\int_0^1 3y\,dy = 2\cdot\tfrac32=3$.

**Boundary** (counterclockwise):
- bottom ($y=0$): $P=0$, contributes $0$;
- right ($x=2$, $y:0\to1$): $\int_0^1 Q(2,y)\,dy=\int_0^1 2y\,dy=1$;
- top ($y=1$, $x:2\to0$): $\int_2^0 P(x,1)\,dx=\int_2^0(-1)\,dx=2$;
- left ($x=0$): $Q=0$, contributes $0$.

Total: $0+1+2+0=3$. Both sides agree.

### Example 3: Kelvin–Stokes on a hemisphere
Let $\omega=-y\,dx+x\,dy$ on $\mathbb{R}^3$ and let $S$ be the upper unit hemisphere, oriented by the outward normal, so $\partial S$ is the equator traversed counterclockwise when viewed from above.

**Boundary.** With $\gamma(t)=(\cos t,\sin t,0)$: $\gamma^*\omega=(\sin^2t+\cos^2t)\,dt=dt$, so $\oint_{\partial S}\omega=2\pi$.

**Interior.** $d\omega=-dy\wedge dx+dx\wedge dy=2\,dx\wedge dy$. Using $\varphi(\phi,\theta)$ from S3E07, Example 3, $\varphi^*(dx\wedge dy)=\sin\phi\cos\phi\,d\phi\wedge d\theta$, so
$$\int_S d\omega=\int_0^{2\pi}\!\!\int_0^{\pi/2}2\sin\phi\cos\phi\,d\phi\,d\theta=2\pi\cdot\big[\sin^2\phi\big]_0^{\pi/2}=2\pi .$$
In vector language, $\omega=F^\flat$ with $F=(-y,x,0)$ and $\nabla\times F=(0,0,2)$. Notice that the flat unit disk with the same boundary gives $2\cdot\pi=2\pi$ as well. Every surface with this rim gives $2\pi$: two such surfaces bound a solid $V$, and $\int_{\partial V}d\omega=\int_V d(d\omega)=0$. Here $d^2=0$ and Stokes work together.

### Example 4: Gauss's theorem on the unit ball
Let $\omega=x\,dy\wedge dz+y\,dz\wedge dx+z\,dx\wedge dy=\star F^\flat$ for $F=(x,y,z)$. Then $d\omega=(1+1+1)\,dx\wedge dy\wedge dz$, so $\int_B d\omega=3\cdot\tfrac43\pi=4\pi$. On the sphere, S3E07's Example 3 showed $\varphi^*\omega=\sin\phi\,d\phi\wedge d\theta$, and over the full range $0\le\phi\le\pi$ this integrates to $2\pi\cdot2=4\pi$. Both sides equal $4\pi$.

### Example 5 (conceptual): Why $\partial^2=0$ for a square
Label the unit square's corners $A=(0,0)$, $B=(1,0)$, $C=(1,1)$, $D=(0,1)$. Then $\partial(\text{square})=[AB]+[BC]+[CD]+[DA]$, and $\partial[PQ]=Q-P$. So
$\partial\partial(\text{square})=(B-A)+(C-B)+(D-C)+(A-D)=0$. Pairing with a function $f$ (a 0-form): $\langle\partial\partial\,\square, f\rangle=0$ matches $\iint_\square d(df)=0$.

## Visual and animation notes
1. **Cold open:** four framed theorems on a museum wall (the "shrine"). A spotlight sweeps across them; the same words "derivative inside = original on the boundary" highlight in each.
2. **The table** of Section 1 appears; the dot products, cross products, and unit normals fade to grey, labeled "metric bookkeeping."
3. **$d$ on forms:** **differential forms motif**. Orange level-line stacks (a 1-form) are drawn in the plane; where the lines fail to close up (more lines enter a small square than leave it), tiny oriented cells appear: that is $d\omega$.
4. **$d^2=0$:** a grid of mixed partials $\partial_j\partial_i f$ (a symmetric matrix, glowing equal pairs) overlaid with the antisymmetric pattern of $dx^j\wedge dx^i$ (opposite colors). They multiply and every pair cancels to zero. The **invariant badge** "$d^2=0$" pins to the screen while coordinates churn.
5. **grad/curl/div:** the chain $\Omega^0\to\Omega^1\to\Omega^2\to\Omega^3$ on top, the chain of functions and fields below, vertical arrows labeled "$\flat$" and "$\star$." Swirling and diverging fields animate under each arrow.
6. **The collapse (key visual):** the four classical theorems in their usual forms slide together and fuse one by one into $\int_{\partial M}\omega=\int_M d\omega$.
7. **Green's proof:** a rectangle is sliced into thin vertical strips; FTC on each strip leaves only top and bottom contributions; interior edges cancel in pairs, animated as opposite arrows annihilating.
8. **Duality:** a region (blue, like vectors) and a form (orange, like covectors) meet with a "$\langle\ ,\ \rangle$" bracket; $\partial$ acts on the left and $d$ on the right, a mirror between them (↩ S2E08 transpose mirror).
9. **Teaser:** water spiraling into a drain; small paddle wheels placed anywhere off-center do not spin (zero curl), yet a boat dragged around the drain picks up nonzero circulation.

## Common misconceptions
- **Misconception:** "$d$ needs a metric, like grad, curl, and div." **Reality:** $d$ is defined on any smooth manifold with no metric and no orientation. The metric only enters when you translate forms into vector fields.
- **Misconception:** "$d^2=0$ and $\partial^2=0$ are coincidences." **Reality:** Stokes makes $d$ the transpose of $\partial$, so each identity implies the other on integrals.
- **Misconception:** "Stokes' theorem requires the surface to be flat, or the region to be simply connected." **Reality:** it holds for any compact oriented manifold with boundary. What fails on regions with holes is the converse "closed ⇒ exact" (↪ S3E09), not Stokes.
- **Misconception:** "The induced boundary orientation is an arbitrary right-hand-rule convention." **Reality:** it is the unique convention that makes the one-variable FTC (with $\partial[a,b]=\{b\}-\{a\}$) and the general theorem consistent.
- **Misconception:** "If $d\omega=0$ then $\omega=d\eta$." **Reality:** only on regions without holes (Poincaré lemma). That gap is the subject of the next episode.

## Exercises
- **Warm-up:** (a) Compute $d(x\,dy\wedge dz)$ and $d(e^{xy}\,dz)$ on $\mathbb{R}^3$. (b) Verify Green's theorem for $\omega=x^2\,dy$ on the unit square $[0,1]^2$.
- **Core:** (a) Using the dictionary of Section 4, show that $\nabla\cdot(f F)=\nabla f\cdot F+f\,\nabla\cdot F$ is the graded Leibniz rule. (b) Explain why the flux of $\nabla\times F$ through a closed surface is always zero. (c) In $\mathbb{R}^4$, how many components does $d$ of a 1-form have?
- **Stretch:** (a) Prove the graded Leibniz rule from the coordinate definition of $d$. (b) Show that $F^*(d\omega)=d(F^*\omega)$ for a 1-form $\omega$ on $\mathbb{R}^2$ and a smooth $F:\mathbb{R}^2\to\mathbb{R}^2$ by direct computation. (c) Prove Stokes for a $k$-cube $[0,1]^k$ in $\mathbb{R}^k$, generalizing the rectangle proof.

<details><summary>Hints and answers</summary>

- **Warm-up:** (a) $d(x\,dy\wedge dz)=dx\wedge dy\wedge dz$; $d(e^{xy}dz)=ye^{xy}dx\wedge dz+xe^{xy}dy\wedge dz$. (b) $d\omega=2x\,dx\wedge dy$, integral $1$. Boundary: only the right edge $x=1$ contributes, $\int_0^1 1\,dy=1$ (the left edge has $x^2=0$; top and bottom have $dy=0$).
- **Core:** (a) $\star(fF)^\flat = f\wedge\star F^\flat$; apply $d(f\wedge\beta)=df\wedge\beta+f\,d\beta$ and check $df\wedge\star F^\flat=(\nabla f\cdot F)\star1$. (b) The surface $S=\partial V$ has empty boundary, so $\int_S d\omega=\int_{\partial S}\omega=0$; or use $\int_V d(d\omega)=0$. (c) $\binom42=6$.
- **Stretch:** (a) Reduce to $\alpha=f\,dx^I$, $\beta=g\,dx^J$; the sign $(-1)^k$ comes from moving $dg$ past $dx^I$. (b) Both sides equal $(\text{expression})\,du\wedge dv$; use the chain rule and the pullback lemma of S3E07. (c) For $\omega=f\,dx^1\wedge\cdots\widehat{dx^j}\cdots\wedge dx^k$, integrate $\partial_jf$ in $x^j$ first; only the two faces $x^j=0,1$ survive, with signs $(-1)^{j}$ and $(-1)^{j-1}$ matching the induced orientations.
</details>

## Historical note
The four theorems were found separately. George Green, a self-taught miller's son from Nottingham, published his *Essay on the Application of Mathematical Analysis to the Theories of Electricity and Magnetism* in 1828, containing the integral identities now named after him. Mikhail Ostrogradsky presented the divergence theorem in Paris in the 1820s (published 1831); Gauss had special cases earlier. The curl theorem first appears in a letter from William Thomson (later Lord Kelvin) to George Gabriel Stokes in July 1850. Stokes set it as a question on Cambridge's Smith's Prize examination of 1854, and the name stuck to him; one of the candidates that year was James Clerk Maxwell. Higher-dimensional versions were written down by Vito Volterra and Henri Poincaré in the late 19th century. Élie Cartan's exterior derivative (from 1899 on) made the general statement a single line, and the modern formulation with chains, manifolds with boundary, and partitions of unity was standard by the mid-20th century. Victor Katz's history (below) traces the whole story.

## Connections
- **Callbacks:** ↩ S2E06 (pairing covectors with vectors), ↩ S2E08 (the dual map: $d$ is the transpose of $\partial$), ↩ S2E11 (Hodge star; the cross product as a wedge in disguise), ↩ S2E14 and ↩ S2E16 (the metric turns 1-forms into vector fields), ↩ S3E06 ($df$), ↩ S3E07 (forms, pullback, integration).
- **Sets up:** ↪ S3E09 (closed vs. exact; the chain complex $\Omega^0\to\Omega^1\to\cdots$ and its cohomology; Maxwell's equations), ↪ S3E10 (Gauss–Bonnet, whose proof is a Stokes argument), ↪ S3E12 (complexes and "dual" as a contravariant functor).
- **Side quests:** Symplectic geometry (a closed, nondegenerate 2-form; Liouville's theorem on phase-space volume is a consequence of $d\omega=0$); Hodge theory (after S3E09).

## References
- **Primary / historical:** George Green, *An Essay on the Application of Mathematical Analysis to the Theories of Electricity and Magnetism* (Nottingham, 1828).
- **Historical survey:** Victor J. Katz, "The History of Stokes' Theorem," *Mathematics Magazine* 52 (1979).
- **Textbook:** Michael Spivak, *Calculus on Manifolds* (1965), Ch. 4 "Integration on Chains" (Stokes' theorem for chains) and Ch. 5 "Integration on Manifolds."
- **Textbook:** John M. Lee, *Introduction to Smooth Manifolds*, 2nd ed. (Springer GTM 218, 2013), Ch. 14 "Differential Forms" (exterior derivative) and Ch. 16 "Integration on Manifolds" (Stokes' theorem).
- **Textbook:** Loring W. Tu, *An Introduction to Manifolds*, 2nd ed. (Springer Universitext, 2011), chapters on differential forms (the exterior derivative) and integration (Stokes' theorem).
- **Accessible:** H. M. Schey, *Div, Grad, Curl, and All That: An Informal Text on Vector Calculus* (W. W. Norton; first published 1973).
- **Accessible:** Tristan Needham, *Visual Differential Geometry and Forms* (Princeton, 2021), Act V (the exterior derivative and Stokes).
