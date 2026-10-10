# S3E07: Differential Forms: What You Integrate

> **Season / Act:** Season 3, Act II (Linear Algebra Goes Curved) · **Target runtime:** 20–25 min ·
> **Prerequisites:** S2E06 (covectors), S2E08 (the dual map), S2E11 (alternating forms and the determinant), S3E05 (manifolds), S3E06 (tangent and cotangent spaces); multivariable calculus (line and double integrals, change of variables) ·
> **Builds toward:** S3E08 (exterior derivative and Stokes), S3E09 (de Rham cohomology), S3E10 (the area form of a metric), S3E12 (pullback as a contravariant functor)

## Learning objectives
By the end of this lesson the viewer can:
1. Define a differential $k$-form as a smoothly varying alternating multilinear form on tangent spaces, and write any form on $\mathbb{R}^n$ in the basis $dx^{i_1}\wedge\cdots\wedge dx^{i_k}$.
2. Compute wedge products and explain why $dx\wedge dy = -\,dy\wedge dx$ encodes orientation.
3. Compute the pullback $F^*\omega$ of a form along a smooth map, and recognize it as the dual map of S2E08 applied at every point.
4. Prove that $F^*(dy^1\wedge\cdots\wedge dy^n) = \det(DF)\,dx^1\wedge\cdots\wedge dx^n$, and use it to explain why integrals of forms do not depend on coordinates.
5. Integrate 1-forms along curves and 2-forms over surfaces by pulling back to a parameter domain.

## Cold open
*Narration draft.*

Every calculus student has written it a thousand times: $\iint f\,dx\,dy$. The little "$dx\,dy$" sits at the end like a pair of parentheses, something you write so the teacher doesn't take points off.

But watch what happens when you switch to polar coordinates. Suddenly it isn't $dr\,d\theta$. It's $r\,dr\,d\theta$. Where did that extra $r$ come from? Your textbook says "the Jacobian." Fine. Now try something stranger. In the formula for a surface integral, swap the order of the two parameters, $u$ and $v$. The answer flips sign. A double integral that cares about the order in which you list the variables? That isn't how ordinary area works. Area doesn't have a sign.

So the thing at the end of the integral isn't decoration. It's an object, with rules of its own, and it already knows about determinants and orientation. Tonight we take it out of the parentheses and look at it directly. It turns out to be something we met in Season 2: an alternating form, the signed-volume meter from S2E11. Except now there is one at every single point of space.

Once you see it, you will never write "$dx\,dy$" the same way again.

## The story

### 1. The naive attempt: integrate a function

The obvious thing to integrate over a curve $\gamma:[a,b]\to\mathbb{R}^2$ is a function $f$: just compute $\int_a^b f(\gamma(t))\,dt$. This fails immediately. Run the same curve twice as fast, $\tilde\gamma(t)=\gamma(2t)$ on $[a/2,b/2]$, and the answer is cut in half. The number depends on the *speed* of the parametrization, not on the curve.

There are two repairs. One is to multiply by the speed, $\int f(\gamma(t))\,|\gamma'(t)|\,dt$, the arc-length integral. But $|\gamma'|$ requires a notion of length, an inner product (S2E14), and we do not yet have one on a general manifold. That repair waits for S3E10.

The other repair is the one physics already uses: **work**. The work done by a force field along a path is $\int_a^b F(\gamma(t))\cdot\gamma'(t)\,dt$. Doubling the speed doubles $\gamma'$ and halves the time interval, and the two effects cancel. What is being integrated is a machine that *eats a velocity vector and returns a number, linearly*. That is a covector (S2E06). A field of covectors, one at each point, is exactly what S3E06 called a 1-form, with $df$ as the first example.

> **Lesson of the naive attempt:** what you integrate over a $k$-dimensional object is not a function. It is something that eats the $k$ tangent vectors spanning a tiny piece of that object and returns a number.

### 2. The crisis: what must a "$k$-dimensional measuring device" satisfy?

Chop a surface into tiny parallelograms, each spanned by two tangent vectors $v,w$ at a point $p$. We want a rule $\omega_p(v,w)$ that measures the contribution of that cell. Three requirements are forced:

1. **Multilinear.** Doubling $v$ doubles the parallelogram; splitting $v=v_1+v_2$ splits it into two pieces whose contributions should add. So $\omega_p$ is linear in each slot.
2. **Alternating.** A degenerate parallelogram ($v=w$) has no area, so $\omega_p(v,v)=0$. By S2E11, this is equivalent to $\omega_p(v,w)=-\omega_p(w,v)$: swapping the edges reverses the orientation.
3. **Smooth in $p$.** Otherwise we cannot integrate.

Requirements 1–2 are precisely the definition of an alternating bilinear form on $T_pM$ from S2E11. So the crisis has already been solved, one point at a time. We only need to put those Season 2 objects on every tangent space.

### 3. The construction: differential forms

> **Definition (differential form).** Let $M$ be a smooth $n$-manifold. A **differential $k$-form** $\omega$ on $M$ assigns to each point $p$ an alternating $k$-linear map
> $$\omega_p : \underbrace{T_pM\times\cdots\times T_pM}_{k}\to\mathbb{R},$$
> i.e. an element of $\Lambda^k(T_p^*M)$, such that in every chart the coefficient functions (below) are smooth. A $0$-form is a smooth function. The set of $k$-forms is written $\Omega^k(M)$; it is a vector space, and in fact a module over the ring of smooth functions (↩ S3E02).

In a chart with coordinates $x^1,\dots,x^n$, the covectors $dx^1_p,\dots,dx^n_p$ are the dual basis of $\partial_1|_p,\dots,\partial_n|_p$ (↩ S3E06). S2E11 tells us that the wedge products $dx^{i_1}\wedge\cdots\wedge dx^{i_k}$ with $i_1<\cdots<i_k$ form a basis of $\Lambda^k(T_p^*M)$, which has dimension $\binom{n}{k}$. So every $k$-form is uniquely

$$\omega=\sum_{i_1<\cdots<i_k}\omega_{i_1\cdots i_k}(x)\,dx^{i_1}\wedge\cdots\wedge dx^{i_k}.$$

On $\mathbb{R}^3$: 0-forms are functions $f$; 1-forms are $P\,dx+Q\,dy+R\,dz$; 2-forms are $A\,dy\wedge dz+B\,dz\wedge dx+C\,dx\wedge dy$; 3-forms are $g\,dx\wedge dy\wedge dz$. The dimensions $1,3,3,1$ are the binomial coefficients, and there are no forms of degree above 3. This is why vector calculus in $\mathbb{R}^3$ gets away with only functions and vector fields: $3=\binom31=\binom32$, a numerical coincidence of dimension three (the same coincidence behind the cross product, ↩ S2E11).

**Evaluating a basic form.** By the determinant formula for wedges of covectors (S2E11),
$$ (dx^{i_1}\wedge\cdots\wedge dx^{i_k})(v_1,\dots,v_k)=\det\big[dx^{i_r}(v_s)\big]_{r,s=1}^{k}. $$
For instance $(dx\wedge dy)(v,w)=v^xw^y-v^yw^x$: the signed area of the shadow of the parallelogram $v,w$ on the $xy$-plane.

> **Wedge product.** For $\alpha\in\Omega^k$, $\beta\in\Omega^l$, the wedge $\alpha\wedge\beta\in\Omega^{k+l}$ is defined pointwise by the exterior algebra of S2E11. It is bilinear, associative, and **graded commutative**: $\alpha\wedge\beta=(-1)^{kl}\,\beta\wedge\alpha$. In particular $dx\wedge dy=-dy\wedge dx$ and $dx\wedge dx=0$. Functions multiply: $f\wedge\beta = f\beta$.

The sign $dx\wedge dy=-dy\wedge dx$ is the "swap the order and the answer flips" from the cold open. It is orientation, not area.

### 4. Pullback: forms move backward

Let $F:M\to N$ be smooth. Vectors move *forward*: $dF_p:T_pM\to T_{F(p)}N$ (↩ S3E06). A covector on $N$ can be fed a pushed-forward vector, so covectors move *backward*. This is the dual map of S2E08, applied at every point.

> **Definition (pullback).** For $\omega\in\Omega^k(N)$, the pullback $F^*\omega\in\Omega^k(M)$ is
> $$(F^*\omega)_p(v_1,\dots,v_k)=\omega_{F(p)}\big(dF_p v_1,\dots,dF_p v_k\big).$$
> For a function ($k=0$), $F^*g = g\circ F$.

**Properties** (each follows from the definition in a line):
- $F^*$ is linear, and $F^*(\alpha\wedge\beta)=F^*\alpha\wedge F^*\beta$.
- $F^*(dg)=d(g\circ F)$: this is the chain rule.
- **Contravariance:** $(G\circ F)^* = F^*\circ G^*$, the same order reversal as $(AB)^{\mathsf T}=B^{\mathsf T}A^{\mathsf T}$ (↩ S2E08). Remember this; it is exactly what S3E12 will call a contravariant functor.

These rules give the **computation recipe**: to pull back, substitute the formulas for the old coordinates into the coefficients, replace each $dy^j$ by $d(y^j\circ F)=\sum_i \frac{\partial F^j}{\partial x^i}dx^i$, and expand using the wedge rules. Notice that forms *can always* be pulled back along any smooth map; vector fields generally cannot be pushed forward (two points may land on the same point with different vectors). Forms are the natural integrands precisely because they move along maps without asking permission.

### 5. Integration, and why it is coordinate-free

Here is the key lemma. It is the determinant of S2E11 appearing inside calculus.

> **Theorem (top-degree pullback).** Let $F:U\to V$ be a smooth map between open subsets of $\mathbb{R}^n$, with coordinates $x$ on $U$ and $y$ on $V$. Then
> $$F^*(dy^1\wedge\cdots\wedge dy^n) = \det\big(DF(x)\big)\,dx^1\wedge\cdots\wedge dx^n .$$

**Proof.** At each point $p$, both sides are elements of $\Lambda^n(T_p^*U)$, which is one-dimensional (S2E11) with basis $dx^1\wedge\cdots\wedge dx^n$. So the left side equals $c(p)\,dx^1\wedge\cdots\wedge dx^n$ for a unique number $c(p)$, and we find $c(p)$ by evaluating both sides on $(\partial_1,\dots,\partial_n)$. The right side gives $\det DF(p)\cdot 1$. For the left side, by the definition of pullback,
$$F^*(dy^1\wedge\cdots\wedge dy^n)(\partial_1,\dots,\partial_n)=(dy^1\wedge\cdots\wedge dy^n)\big(dF_p\partial_1,\dots,dF_p\partial_n\big).$$
The vector $dF_p\partial_j$ is the $j$-th column of the Jacobian, with $y^i$-component $\partial F^i/\partial x^j$. By the evaluation formula, the right side is $\det\big[dy^i(dF_p\partial_j)\big]=\det\big[\partial F^i/\partial x^j\big]=\det DF(p)$. Hence $c(p)=\det DF(p)$. $\blacksquare$

Now define the integral. For a compactly supported $n$-form $\omega=f\,dx^1\wedge\cdots\wedge dx^n$ on an open set $U\subseteq\mathbb{R}^n$ (with its standard orientation),
$$\int_U\omega := \int_U f\,dx^1\cdots dx^n \qquad\text{(an ordinary Riemann or Lebesgue integral).}$$

> **Corollary (invariance).** If $F:U\to V$ is a diffeomorphism and $\omega$ is a compactly supported $n$-form on $V$, then
> $$\int_U F^*\omega = \pm\int_V \omega,$$
> with $+$ if $F$ preserves orientation ($\det DF>0$ everywhere) and $-$ if it reverses it.

*Proof.* Write $\omega = g\,dy^1\wedge\cdots\wedge dy^n$. By the theorem, $F^*\omega=(g\circ F)\det(DF)\,dx^1\wedge\cdots\wedge dx^n$. The classical change-of-variables formula says $\int_V g\,dy=\int_U (g\circ F)\,|\det DF|\,dx$. If $\det DF>0$ the absolute value does nothing; if $\det DF<0$ it contributes a minus sign. $\blacksquare$

This is the cold open, answered. The classical formula needs an absolute value because $dx\,dy$ in a Riemann integral is an *unsigned* density. A differential form carries its sign with it, and the determinant comes out of the algebra automatically. Integration of an $n$-form over an **oriented** $n$-manifold is then defined by covering it with positively oriented charts and gluing with a partition of unity (sketch: the corollary guarantees that overlapping charts agree). Over a parametrized $k$-dimensional piece $\varphi:D\to M$ (a curve, a surface patch) we set
$$\int_\varphi\omega := \int_D\varphi^*\omega.$$
For a 1-form this is the work integral of Section 1, and the corollary (with $n=1$) is the statement that reparametrizing the curve in the same direction does not change the answer, while reversing direction flips the sign.

### 6. Payoff and zoom-out

| Degree | What it measures | Physical example |
|---|---|---|
| 0-form $f$ | values at points | temperature |
| 1-form $P\,dx+Q\,dy+R\,dz$ | oriented curves | work, circulation |
| 2-form $A\,dy\wedge dz+\cdots$ | oriented surfaces | flux of a fluid or magnetic field |
| 3-form $g\,dx\wedge dy\wedge dz$ | oriented regions | mass, charge |

**Build or Describe?** *Build:* a form is an array of coefficient functions $\omega_{i_1\cdots i_k}$ that transform by Jacobian factors when you change coordinates (the physicist's "transforms like a tensor"). *Describe:* a form is a field of alternating multilinear measurements of tangent vectors. The second description makes the transformation law a *theorem* (the pullback lemma) instead of a definition.

**Thread: duality, or measuring things.** A $k$-form is a measuring device for oriented $k$-dimensional pieces of space, just as a covector measures vectors (↩ S2E06). Integration pairs a form with a region. That pairing is the start of a duality that S3E08 makes precise.

**Teaser.** We have differentiated functions into 1-forms ($df$). Can we differentiate a 1-form into a 2-form? And if we do, what happens to the four "fundamental theorems" of vector calculus? (↪ S3E08)

## Worked examples

### Example 1: Polar coordinates, and where the $r$ comes from
Let $F(r,\theta)=(r\cos\theta,\,r\sin\theta)$, so $x=r\cos\theta$, $y=r\sin\theta$.

**Step 1 (1-forms).** Apply $d$ to each coordinate function:
$$F^*dx = d(r\cos\theta)=\cos\theta\,dr - r\sin\theta\,d\theta,\qquad F^*dy = d(r\sin\theta)=\sin\theta\,dr + r\cos\theta\,d\theta.$$

**Step 2 (2-form).** Wedge them, using $dr\wedge dr=d\theta\wedge d\theta=0$ and $d\theta\wedge dr=-dr\wedge d\theta$:
$$\begin{aligned}
F^*(dx\wedge dy) &= (\cos\theta\,dr - r\sin\theta\,d\theta)\wedge(\sin\theta\,dr + r\cos\theta\,d\theta)\\
&= r\cos^2\theta\,dr\wedge d\theta - r\sin^2\theta\,d\theta\wedge dr\\
&= r(\cos^2\theta+\sin^2\theta)\,dr\wedge d\theta = r\,dr\wedge d\theta .
\end{aligned}$$
This agrees with the theorem: $\det DF=\det\begin{pmatrix}\cos\theta & -r\sin\theta\\ \sin\theta & r\cos\theta\end{pmatrix}=r$.

**Step 3 (use it).** The area of the unit disk is $\int_{[0,1]\times[0,2\pi]} r\,dr\wedge d\theta = \int_0^{2\pi}\!\int_0^1 r\,dr\,d\theta = 2\pi\cdot\tfrac12=\pi$.

**Step 4 (a famous 1-form).** Let $\omega=\dfrac{x\,dy-y\,dx}{x^2+y^2}$ on $\mathbb{R}^2\setminus\{0\}$. Then
$$x\,F^*dy - y\,F^*dx = r\cos\theta(\sin\theta\,dr + r\cos\theta\,d\theta) - r\sin\theta(\cos\theta\,dr - r\sin\theta\,d\theta) = r^2\,d\theta,$$
and dividing by $x^2+y^2=r^2$ gives $F^*\omega = d\theta$. Remember this form. It is the star of S3E09.

### Example 2: A 1-form along two paths
Let $\omega = xy\,dx + x^2\,dy$ and consider two curves from $(0,0)$ to $(1,1)$.

**Path A, the parabola** $\gamma(t)=(t,t^2)$, $0\le t\le 1$. Pull back: $x=t$, $y=t^2$, $dx=dt$, $dy=2t\,dt$. Then
$$\gamma^*\omega = t\cdot t^2\,dt + t^2\cdot 2t\,dt = 3t^3\,dt,\qquad \int_\gamma\omega=\int_0^1 3t^3\,dt=\tfrac34 .$$

**Path B, the diagonal** $\sigma(t)=(t,t)$. Now $dx=dy=dt$ and $\sigma^*\omega = t^2\,dt+t^2\,dt=2t^2\,dt$, so $\int_\sigma\omega=\tfrac23$.

The answers differ, so the integral of this 1-form depends on the path. Compare $\eta = y^2\,dx + 2xy\,dy$. Along the parabola, $\gamma^*\eta = t^4\,dt + 2t\cdot t^2\cdot 2t\,dt = 5t^4\,dt$, integral $1$. Along the diagonal, $\sigma^*\eta = t^2\,dt+2t^2\,dt=3t^2\,dt$, integral $1$. Same answer, because $\eta=d(xy^2)$ and $xy^2$ goes from $0$ to $1$. Which 1-forms are "$d$ of something" is the subject of S3E08–S3E09.

### Example 3: Flux through a hemisphere
Let $\omega = x\,dy\wedge dz + y\,dz\wedge dx + z\,dx\wedge dy$ on $\mathbb{R}^3$ (the flux form of the position field $(x,y,z)$). Parametrize the upper unit hemisphere by
$\varphi(\phi,\theta)=(\sin\phi\cos\theta,\ \sin\phi\sin\theta,\ \cos\phi)$ with $0\le\phi\le\pi/2$, $0\le\theta\le 2\pi$. This orientation has $\varphi_\phi\times\varphi_\theta=\sin\phi\,\varphi$, the outward normal.

**Step 1.** $d x = \cos\phi\cos\theta\,d\phi - \sin\phi\sin\theta\,d\theta$, $dy = \cos\phi\sin\theta\,d\phi+\sin\phi\cos\theta\,d\theta$, $dz=-\sin\phi\,d\phi$.

**Step 2.** The three 2-forms (keep only $d\phi\wedge d\theta$ terms):
- $dy\wedge dz = (\sin\phi\cos\theta\,d\theta)\wedge(-\sin\phi\,d\phi)=\sin^2\!\phi\cos\theta\,d\phi\wedge d\theta$.
- $dz\wedge dx = (-\sin\phi\,d\phi)\wedge(-\sin\phi\sin\theta\,d\theta)=\sin^2\!\phi\sin\theta\,d\phi\wedge d\theta$.
- $dx\wedge dy = \sin\phi\cos\phi\cos^2\theta\,d\phi\wedge d\theta - \sin\phi\cos\phi\sin^2\theta\,d\theta\wedge d\phi = \sin\phi\cos\phi\,d\phi\wedge d\theta$.

**Step 3.** Multiply by the coefficients and add:
$$\varphi^*\omega = \big(\sin^3\!\phi\cos^2\theta + \sin^3\!\phi\sin^2\theta + \sin\phi\cos^2\phi\big)\,d\phi\wedge d\theta = \sin\phi\,d\phi\wedge d\theta .$$

**Step 4.** $\displaystyle\int_\varphi\omega = \int_0^{2\pi}\!\!\int_0^{\pi/2}\sin\phi\,d\phi\,d\theta = 2\pi\cdot 1 = 2\pi$, the area of the hemisphere, as it should be: the position field is the unit normal there. (Checked symbolically with sympy, along with the piece $\int z\,dx\wedge dy = 2\pi/3$.)

### Example 4 (conceptual): A linear change of variables and orientation
Let $F(u,v)=(2u+v,\ u+3v)$. Then $F^*(dx\wedge dy) = (2\,du+dv)\wedge(du+3\,dv) = 6\,du\wedge dv + dv\wedge du = 5\,du\wedge dv$, and $\det\begin{pmatrix}2&1\\1&3\end{pmatrix}=5$. Now swap the output coordinates: $G(u,v)=(u+3v,\ 2u+v)$. Then $G^*(dx\wedge dy) = (du+3\,dv)\wedge(2\,du+dv) = du\wedge dv + 6\,dv\wedge du = -5\,du\wedge dv$. Same parallelograms, same unsigned area, opposite orientation. A form notices; an unsigned area does not.

## Visual and animation notes
1. **Cold open:** a double integral on a chalkboard; the "$dx\,dy$" lifts off the board and starts glowing. Cut to polar coordinates; an "$r$" materializes out of nowhere next to "$dr\,d\theta$" with a question mark.
2. **Speed problem:** the same curve traced by two dots at different speeds; a running total of $\int f\,dt$ for each diverges. Then a force field (arrows) and velocity vectors, with the work totals matching.
3. **1-forms:** reuse the **covector motif** (orange stacks of level lines) at every point of the plane, i.e. a field of level-line stacks. A blue curve threads through them; a counter ticks once per line crossed. Counting crossings = integrating.
4. **2-forms:** the **differential forms motif**: a "honeycomb" of tiny oriented cells (with a circular arrow on each) filling space. A surface slices through; each cell it crosses lights up with $+1$ or $-1$ depending on whether its orientation agrees with the surface's.
5. **Wedge sign:** a parallelogram spanned by blue arrows $v,w$; swap them and the circular orientation arrow reverses, the area counter flips to negative (↩ S2E11 unit-cube animation).
6. **Pullback:** **tangent spaces motif**: little planes over the $(r,\theta)$ rectangle and over the disk. A grid square in $(r,\theta)$ is carried forward by $F$ (blue); the orange level lines on the disk are carried *backward* onto the rectangle, visibly bunching up by the factor $r$.
7. **Coordinate-free integration:** a **badge** labeled "$\int\omega$" stays fixed while the "camera/language overlay" (coordinate grid) changes from Cartesian to polar to a skewed linear grid; the integrand's coefficient churns underneath but the badge never changes.
8. **Teaser:** the four classical theorems appear as four separate scrolls, then the camera pulls back to show them tied with one ribbon labeled "next episode."

## Common misconceptions
- **Misconception:** "$dx$ is an infinitely small number." **Reality:** $dx$ is a covector field, the differential of the coordinate function $x$. It eats a tangent vector and returns its $x$-component, a perfectly finite number.
- **Misconception:** "$dx\,dy$ in a double integral and $dx\wedge dy$ are the same thing." **Reality:** $\iint f\,dx\,dy$ uses an unsigned measure; $dx\wedge dy$ is oriented and $dy\wedge dx=-dx\wedge dy$. They agree only when you integrate over $\mathbb{R}^2$ with its standard orientation.
- **Misconception:** "A 1-form is the same as a vector field." **Reality:** they live in dual spaces (↩ S2E06). Turning one into the other requires a metric (↪ S3E10, ↩ S2E16). Forms pull back along every smooth map; vector fields do not push forward in general.
- **Misconception:** "Arc length $\int f\,ds$ is the integral of a 1-form." **Reality:** $ds$ is not a 1-form; it is not linear in the velocity (it is $|\gamma'|\,dt$) and it depends on a metric. It is an unsigned density.
- **Misconception:** "$\omega\wedge\omega=0$ for every form." **Reality:** true for 1-forms (and any odd degree), but $(dx^1\wedge dx^2+dx^3\wedge dx^4)^{\wedge 2}=2\,dx^1\wedge dx^2\wedge dx^3\wedge dx^4\neq0$.

## Exercises
- **Warm-up:** (a) Expand $(x\,dx+y\,dy)\wedge(x\,dy-y\,dx)$. (b) Pull back $x\,dy-y\,dx$ under polar coordinates. (c) Integrate $\omega=-y\,dx+x\,dy$ counterclockwise around the unit circle.
- **Core:** (a) Show that every 3-form on $\mathbb{R}^2$ is zero, and find $\dim\Omega^2_p(\mathbb{R}^4)$. (b) Explain why reversing the direction of a curve negates $\int_\gamma\omega$ but not the arc length. (c) Compute $\omega\wedge\omega$ for $\omega=dx^1\wedge dx^2+dx^3\wedge dx^4$.
- **Stretch:** (a) Prove $(G\circ F)^*=F^*\circ G^*$ from the definition. (b) Prove $F^*(\alpha\wedge\beta)=F^*\alpha\wedge F^*\beta$ for 1-forms $\alpha,\beta$. (c) Show that the integral of a 1-form over a curve is independent of orientation-preserving reparametrization, using only the one-variable chain rule.

<details><summary>Hints and answers</summary>

- **Warm-up:** (a) $(x^2+y^2)\,dx\wedge dy$ (the cross terms $x\,dx\wedge(-y\,dx)$ and $y\,dy\wedge x\,dy$ vanish; $y\,dy\wedge(-y\,dx)=y^2\,dx\wedge dy$). (b) $r^2\,d\theta$ (Example 1, Step 4). (c) With $(x,y)=(\cos t,\sin t)$ the pullback is $(\sin^2t+\cos^2t)\,dt=dt$, so the integral is $2\pi$.
- **Core:** (a) $\Lambda^3$ of a 2-dimensional space is zero since $\binom23=0$; $\binom42=6$. (b) The form pulls back with a factor $\gamma'(t)$ that changes sign; arc length uses $|\gamma'(t)|$. (c) $2\,dx^1\wedge dx^2\wedge dx^3\wedge dx^4$ (two equal cross terms, using that 2-forms commute).
- **Stretch:** (a) $d(G\circ F)_p = dG_{F(p)}\circ dF_p$ (chain rule), then unwind the definition. (b) Evaluate both sides on $(v,w)$: each is $\alpha(dF v)\beta(dF w)-\alpha(dF w)\beta(dF v)$. (c) If $\tilde\gamma=\gamma\circ h$ with $h'>0$, then $\tilde\gamma^*\omega = h^*(\gamma^*\omega)$ and substitute $s=h(t)$.
</details>

## Historical note
The algebra came first and was ignored. Hermann Grassmann's *Ausdehnungslehre* (1844) introduced the exterior ("outer") product with its sign rule, but almost no one read it. Meanwhile 19th-century physics developed line, surface, and volume integrals one at a time, each with its own notation. Henri Poincaré, studying celestial mechanics, worked with "integral invariants" of differential expressions in the 1890s. The modern calculus of differential forms is due to Élie Cartan, whose 1899 paper "Sur certaines expressions différentielles et le problème de Pfaff" defined exterior differential forms and their product, and who developed the theory for decades, notably in *Leçons sur les invariants intégraux* (1922). The treatment of integration via pullback and partitions of unity became standard in mid-20th-century texts; Spivak's *Calculus on Manifolds* (1965) brought it to undergraduates.

## Connections
- **Callbacks:** ↩ S2E06 (covectors as measuring devices; level-line stacks), ↩ S2E08 (the dual map and the transpose; order reversal), ↩ S2E11 (alternating forms, $\Lambda^n$ is one-dimensional, the determinant, the cross product as a disguised wedge), ↩ S2E14 (length requires a choice), ↩ S3E02 (forms as a module over smooth functions), ↩ S3E05 (charts and orientation), ↩ S3E06 (tangent spaces, $df$, $dF_p$).
- **Sets up:** ↪ S3E08 (the exterior derivative $d$ and Stokes' theorem), ↪ S3E09 (the angle form $d\theta$ and cohomology), ↪ S3E10 (the area form of a metric, Gauss–Bonnet), ↪ S3E12 (pullback as a contravariant functor).
- **Side quests:** Symplectic geometry (an alternating 2-form on every tangent space; attaches after S3E08); Geometric algebra (Clifford's product combining dot and wedge; attaches after S2E11).

## References
- **Primary / historical:** Élie Cartan, "Sur certaines expressions différentielles et le problème de Pfaff," *Annales scientifiques de l'École Normale Supérieure* 16 (1899). Hermann Grassmann, *Die lineale Ausdehnungslehre* (1844).
- **Textbook:** Michael Spivak, *Calculus on Manifolds* (1965), Ch. 4 "Integration on Chains" (fields and forms, pullback, change of variables).
- **Textbook:** John M. Lee, *Introduction to Smooth Manifolds*, 2nd ed. (Springer GTM 218, 2013), Ch. 14 "Differential Forms" and Ch. 16 "Integration on Manifolds."
- **Textbook:** Loring W. Tu, *An Introduction to Manifolds*, 2nd ed. (Springer Universitext, 2011), the opening chapter on Euclidean spaces (alternating multilinear functions and differential forms on $\mathbb{R}^n$) and the chapters on differential forms and integration.
- **Accessible:** Tristan Needham, *Visual Differential Geometry and Forms* (Princeton University Press, 2021), Act V on forms.
- **Accessible:** Harley Flanders, *Differential Forms with Applications to the Physical Sciences* (Academic Press, 1963; Dover reprint).
- **Physics viewpoint:** V. I. Arnold, *Mathematical Methods of Classical Mechanics*, 2nd ed. (Springer GTM 60, 1989), Ch. 7 "Differential forms."
