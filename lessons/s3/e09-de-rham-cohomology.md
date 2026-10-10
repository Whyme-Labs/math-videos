# S3E09: de Rham Cohomology: Calculus Detects Holes

> **Season / Act:** Season 3, Act II (Linear Algebra Goes Curved) · **Target runtime:** 20–25 min ·
> **Prerequisites:** S3E07 (forms, pullback), S3E08 ($d$, $d^2=0$, Stokes), S1E05 (equivalence classes), S2E05 (quotient spaces), S2E09 (the Minkowski form, for the physics section) ·
> **Builds toward:** S3E10 (Gauss–Bonnet: curvature integrates to the Euler characteristic), S3E12 (cohomology as a contravariant functor); side quests on Hodge theory and Morse theory

## Learning objectives
By the end of this lesson the viewer can:
1. Define closed and exact forms, explain why exact implies closed, and prove that $d\theta$ on $\mathbb{R}^2\setminus\{0\}$ is closed but not exact.
2. Define de Rham cohomology $H^k(M)=\ker d/\operatorname{im} d$ as a quotient vector space and compute it for $\mathbb{R}^n$, $S^1$, $S^2$, and the torus $T^2$.
3. State the Poincaré lemma, homotopy invariance, and de Rham's theorem, and compute the Euler characteristic as an alternating sum of Betti numbers.
4. Write Maxwell's equations as $dF=0$ and $d\star F=\mathcal{J}$ (with stated conventions), derive charge conservation from $d^2=0$, and explain the Aharonov–Bohm effect as a nonzero cohomology class.

## Cold open
*Narration draft.*

Pull the plug in a bathtub and watch the water. It spirals toward the drain, faster and faster as it gets closer. Now drop a tiny paddle wheel into the water, anywhere except right over the drain. Does it spin?

For an idealized vortex, the answer is no. The water near the drain moves faster, but it also curves more tightly, and the two effects cancel exactly. The paddle wheel is carried around, but it doesn't rotate about its own axis. In the language of vector calculus, the curl of the flow is zero, everywhere the water is.

Now drag a toy boat in a full circle around the drain and add up how much the current pushed it along. That is the circulation. Stokes' theorem, from the last episode, says circulation equals the total curl inside the loop. The curl is zero everywhere. So the circulation must be zero.

It isn't. It's the same nonzero number for every loop around the drain, no matter how big, no matter how wobbly.

Stokes' theorem isn't wrong. Something is in the way: the drain itself, a single point where the flow isn't defined. The loop can't be shrunk past it. Tonight we turn that observation into an instrument, a way to *detect holes using nothing but calculus*. And then we'll use it to explain one of the strangest experiments in quantum physics.

## The story

### 1. The naive attempt: "curl-free means gradient"

In S3E08 we saw that $d^2=0$: every **exact** form ($\omega=d\eta$) is **closed** ($d\omega=0$). In vector language, every gradient has zero curl. The naive hope is the converse: a curl-free field is a gradient. Here is the natural attempt to prove it for a closed 1-form $\omega$ on a region $U$. Fix a base point $p_0$ and define
$$f(p)=\int_{\text{path from }p_0\text{ to }p}\omega .$$
If this is well defined (independent of the path), then $df=\omega$. Two paths from $p_0$ to $p$ together form a loop $\gamma$, so well-definedness is the statement $\oint_\gamma\omega=0$ for every loop. If the loop bounds a surface $S$ inside $U$, Stokes gives $\oint_\gamma\omega=\int_S d\omega=0$. So the attempt succeeds whenever every loop in $U$ bounds a surface in $U$.

> **Poincaré lemma.** If $U\subseteq\mathbb{R}^n$ is star-shaped (for instance a ball, or all of $\mathbb{R}^n$), then every closed $k$-form on $U$ with $k\ge1$ is exact.

For 1-forms on a region star-shaped about $0$ there is an explicit formula: integrate along the straight ray,
$$f(x)=\int_0^1 \omega_{tx}(x)\,dt=\int_0^1\sum_i\omega_i(tx)\,x^i\,dt ,$$
and a direct computation using $\partial_j\omega_i=\partial_i\omega_j$ shows $df=\omega$ (Worked Example 2). For higher $k$, the same "integrate along rays" idea gives a homotopy operator $h$ with $dh+hd=\mathrm{id}$ on $\Omega^{k}$, $k\ge1$, which proves the lemma.

### 2. The crisis: the angle form

On the punctured plane $U=\mathbb{R}^2\setminus\{0\}$, consider
$$\omega=\frac{-y\,dx+x\,dy}{x^2+y^2}.$$
In S3E07 we computed that its pullback to polar coordinates is $d\theta$, so it is usually called $d\theta$. The name is a trap. There is no smooth function $\theta$ on all of $U$: the angle jumps by $2\pi$ somewhere on every circle around the origin.

> **Theorem.** $\omega=d\theta$ is closed on $\mathbb{R}^2\setminus\{0\}$ but not exact.

**Proof.** *Closed.* With $P=-y/(x^2+y^2)$ and $Q=x/(x^2+y^2)$,
$$Q_x=\frac{(x^2+y^2)-x\cdot 2x}{(x^2+y^2)^2}=\frac{y^2-x^2}{(x^2+y^2)^2},\qquad
P_y=\frac{-(x^2+y^2)+y\cdot 2y}{(x^2+y^2)^2}=\frac{y^2-x^2}{(x^2+y^2)^2},$$
so $d\omega=(Q_x-P_y)\,dx\wedge dy=0$.

*Not exact.* Let $\gamma(t)=(\cos t,\sin t)$, $0\le t\le2\pi$. Then $\gamma^*\omega=\big((-\sin t)(-\sin t)+(\cos t)(\cos t)\big)\,dt=dt$, so
$$\oint_\gamma\omega=\int_0^{2\pi}dt=2\pi .$$
Suppose $\omega=df$ for a smooth function $f$ on $U$. Then by the chain rule $\gamma^*\omega=d(f\circ\gamma)$, and FTC gives $\oint_\gamma\omega=f(\gamma(2\pi))-f(\gamma(0))=f(1,0)-f(1,0)=0$. Since $2\pi\neq0$, no such $f$ exists. $\blacksquare$

The drain of the cold open is this form in disguise: the ideal vortex has velocity $v=\frac{\Gamma}{2\pi}\frac{(-y,x)}{x^2+y^2}$, so $v^\flat=\frac{\Gamma}{2\pi}\,d\theta$. Its curl is zero (it is closed), and its circulation around the drain is $\Gamma$ (it is not exact). The point removed from the plane is exactly what blocks the naive argument: the unit circle does not bound any surface in $U$.

### 3. The construction: closed modulo exact

We want an invariant that records how badly "closed ⇒ exact" fails. The answer is the master tool from S1E05: declare things equal and look at what's left.

> **Definition (de Rham cohomology).** For a smooth manifold $M$, let
> $$Z^k(M)=\ker\big(d:\Omega^k\to\Omega^{k+1}\big)\quad(\text{closed }k\text{-forms}),\qquad
> B^k(M)=\operatorname{im}\big(d:\Omega^{k-1}\to\Omega^{k}\big)\quad(\text{exact }k\text{-forms}).$$
> Since $d^2=0$, $B^k\subseteq Z^k$, and both are vector spaces. The **$k$-th de Rham cohomology** is the quotient vector space
> $$H^k(M)=Z^k(M)/B^k(M).$$
> Its elements $[\omega]$ are closed forms with $\omega\sim\omega'$ iff $\omega-\omega'=d\eta$. When $H^k(M)$ is finite-dimensional, its dimension $b_k(M)$ is the **$k$-th Betti number**.

This is the quotient $V/W$ of S2E05, built from the equivalence relation "differ by an exact form" (↩ S1E05): every closed form blurs together with all of its exact perturbations into one glowing blob. Two closed 1-forms are cohomologous exactly when their integrals around all loops agree (a consequence of de Rham's theorem below), so a cohomology class is "a closed form, remembered only through its integrals around holes."

**What the first few groups count.**
- $H^0(M)$: there are no exact 0-forms, so $H^0=\{f: df=0\}$, the locally constant functions. Thus $b_0=$ number of connected components.
- $H^1(M)$: closed 1-forms that are not gradients, detected by loops that cannot be filled in. $b_1$ counts independent "tunnels."
- $H^n(M)$ for a compact connected oriented $n$-manifold: $\cong\mathbb{R}$, via $[\omega]\mapsto\int_M\omega$ (Stokes kills exact forms since $\partial M=\varnothing$).

### 4. The main theorems

> **Functoriality.** A smooth map $F:M\to N$ induces a linear map $F^*:H^k(N)\to H^k(M)$, $[\omega]\mapsto[F^*\omega]$, and $(G\circ F)^*=F^*\circ G^*$.

It is well defined because $F^*$ commutes with $d$ (S3E08): closed pulls back to closed, exact to exact. Note the direction: forms pull back, so cohomology goes *backward*, just like the dual space (↩ S2E08). S3E12 names this pattern.

> **Homotopy invariance.** If $F_0,F_1:M\to N$ are smoothly homotopic, then $F_0^*=F_1^*$ on cohomology. Hence homotopy-equivalent manifolds have isomorphic cohomology.

So $H^k(\mathbb{R}^2\setminus\{0\})\cong H^k(S^1)$, since the punctured plane retracts onto the circle. The Poincaré lemma is the special case "$\mathbb{R}^n$ is homotopy equivalent to a point."

> **de Rham's theorem (1931).** For a smooth manifold $M$, integration over smooth cycles induces an isomorphism $H^k_{\mathrm{dR}}(M)\cong H^k(M;\mathbb{R})$, the singular cohomology with real coefficients.

*Sketch.* Integration gives a map from forms to cochains, $\omega\mapsto(c\mapsto\int_c\omega)$, which commutes with $d$ and $\partial^{\mathsf T}$ by Stokes (S3E08). Both theories satisfy the Poincaré lemma locally and a Mayer–Vietoris gluing sequence, and an induction over a good cover shows the map is an isomorphism. The significance: $H^k_{\mathrm{dR}}$ is built from derivatives, yet it depends only on the topology. Calculus counts holes.

> **Euler characteristic.** For a compact manifold, $\chi(M)=\sum_k(-1)^k b_k(M)$. For a triangulated surface this equals $V-E+F$.

### 5. Physics: Maxwell's equations and Aharonov–Bohm

**Conventions.** Spacetime $\mathbb{R}^4$ with coordinates $(t,x,y,z)$, units with $c=1$ and Heaviside–Lorentz units (so $\varepsilon_0=\mu_0=1$ and no $4\pi$), Minkowski metric of signature $(-,+,+,+)$, orientation $dt\wedge dx\wedge dy\wedge dz$, and Hodge star defined by $\alpha\wedge\star\beta=\langle\alpha,\beta\rangle\,dt\wedge dx\wedge dy\wedge dz$. Other books use $(+,-,-,-)$, Gaussian units, or the opposite sign for $F$; signs and factors of $4\pi$ move accordingly.

> **The field strength 2-form.**
> $$F=E_x\,dx\wedge dt+E_y\,dy\wedge dt+E_z\,dz\wedge dt+B_x\,dy\wedge dz+B_y\,dz\wedge dx+B_z\,dx\wedge dy .$$
> **The current 3-form.** With charge density $\rho$ and current density $\vec J$,
> $$\mathcal{J}=\rho\,dx\wedge dy\wedge dz-J_x\,dt\wedge dy\wedge dz-J_y\,dt\wedge dz\wedge dx-J_z\,dt\wedge dx\wedge dy .$$
> Equivalently $\mathcal{J}=\star j$ for the 1-form $j=-\rho\,dt+J_x\,dx+J_y\,dy+J_z\,dz$ (the current 4-vector $(\rho,\vec J)$ with its index lowered).

The storyline's "$d\star F=J$" is this equation with $J$ read as the current 3-form; writing it with the 1-form needs a star on the right. A direct computation (done symbolically with sympy) gives
$$\begin{aligned}
dF&=(\nabla\cdot\vec B)\,dx\wedge dy\wedge dz+\textstyle\sum_{\text{cyclic}}\big(\partial_t\vec B+\nabla\times\vec E\big)_x\,dt\wedge dy\wedge dz,\\
\star F&=E_x\,dy\wedge dz+E_y\,dz\wedge dx+E_z\,dx\wedge dy+B_x\,dt\wedge dx+B_y\,dt\wedge dy+B_z\,dt\wedge dz,\\
d\star F&=(\nabla\cdot\vec E)\,dx\wedge dy\wedge dz-\textstyle\sum_{\text{cyclic}}\big(\nabla\times\vec B-\partial_t\vec E\big)_x\,dt\wedge dy\wedge dz,
\end{aligned}$$
where "cyclic" means the sum over $(x,y,z)\to(y,z,x)\to(z,x,y)$ with the matching $dt\wedge dz\wedge dx$ and $dt\wedge dx\wedge dy$. Therefore:

> **Maxwell's equations.**
> $$dF=0\iff \nabla\cdot\vec B=0,\ \ \nabla\times\vec E+\partial_t\vec B=0;\qquad
> d\star F=\mathcal{J}\iff\nabla\cdot\vec E=\rho,\ \ \nabla\times\vec B-\partial_t\vec E=\vec J .$$

Two dividends:
- **Charge conservation is $d^2=0$.** Applying $d$ to $d\star F=\mathcal{J}$ gives $0=d\mathcal{J}=(\partial_t\rho+\nabla\cdot\vec J)\,dt\wedge dx\wedge dy\wedge dz$, the continuity equation.
- **Potentials are a Poincaré lemma.** On $\mathbb{R}^4$, $dF=0$ implies $F=dA$ for a 1-form $A=-\phi\,dt+A_x\,dx+A_y\,dy+A_z\,dz$, which unpacks to $\vec E=-\nabla\phi-\partial_t\vec A$ and $\vec B=\nabla\times\vec A$. Gauge freedom $A\mapsto A+d\lambda$ is "$A$ only matters up to exact forms."

**Aharonov–Bohm.** Let an infinitely long, thin solenoid run along the $z$-axis, carrying magnetic flux $\Phi$. Outside it, $\vec B=0$, so $F=dA=0$ there: $A$ is closed on the outside region $U$, which is homotopy equivalent to a circle. But by Stokes over a disk crossing the solenoid, $\oint_\gamma A=\iint B\cdot n\,dA=\Phi$ for any loop $\gamma$ around it. Outside, $A=\frac{\Phi}{2\pi}\,d\theta$ (in a suitable gauge), a multiple of the angle form. So $[A]\neq0$ in $H^1(U)\cong\mathbb{R}$. Classically, electrons that stay outside feel no force. Quantum mechanically, an electron's wavefunction picks up the phase $e^{iq\oint A/\hbar}$, so two beams passing on opposite sides of the solenoid interfere with relative phase $q\Phi/\hbar$. The interference pattern shifts as $\Phi$ changes: a cohomology class you can measure in a laboratory.

### 6. Payoff and zoom-out

The cold-open puzzle is solved: the vortex is $\frac{\Gamma}{2\pi}\,d\theta$, a closed form representing a nonzero class in $H^1$ of the punctured plane. Stokes was never violated; the loop simply does not bound a surface in the region where the flow lives.

**Build or Describe?** *Build:* $H^k_{\mathrm{dR}}$ is constructed from derivatives of smooth forms. *Describe:* $H^k(M;\mathbb{R})$ is a purely topological invariant, unchanged by any continuous deformation. de Rham's theorem says they are the same.

**Thread: glue things together.** Cohomology is a quotient, the same move as $\mathbb{Z}$ from pairs of naturals and $V/W$. **Thread: invariants.** Betti numbers are badges that survive any homotopy, the way the determinant survives a change of basis.

**Teaser.** The Euler characteristic is built from topology alone. Next episode, we add geometry (a metric), compute the curvature at every point of a surface, add it all up, and get... $2\pi\chi$. (↪ S3E10)

## Worked examples

### Example 1: The angle form around three different loops
Let $\omega=\dfrac{-y\,dx+x\,dy}{x^2+y^2}$.

**(a) Unit circle:** $\oint\omega=2\pi$ (proof above).

**(b) Ellipse** $\gamma(t)=(2\cos t,\sin t)$. Then $dx=-2\sin t\,dt$, $dy=\cos t\,dt$, and
$$-y\,dx+x\,dy=(2\sin^2t+2\cos^2t)\,dt=2\,dt,\qquad x^2+y^2=4\cos^2t+\sin^2t,$$
so $\gamma^*\omega=\dfrac{2\,dt}{4\cos^2t+\sin^2t}$. Using the standard integral $\int_0^{2\pi}\frac{dt}{a^2\cos^2t+b^2\sin^2t}=\frac{2\pi}{ab}$ with $a=2$, $b=1$: $\oint\omega=2\cdot\frac{2\pi}{2}=2\pi$. (Numerically checked: $6.2831853\ldots$.) Cohomologically this is automatic: the ellipse and circle together bound an annulus $A$ avoiding $0$, and $\int_{\partial A}\omega=\int_A d\omega=0$.

**(c) Circle of radius 1 centered at $(3,0)$:** this loop bounds a disk $D$ not containing $0$. On $D$ (star-shaped), $\omega$ is exact by the Poincaré lemma, so $\oint\omega=0$. (Numerical check: $\approx 4\times10^{-16}$.) In general $\frac1{2\pi}\oint_\gamma\omega$ is the winding number of $\gamma$ around $0$.

### Example 2: Building a potential with the Poincaré lemma
Let $\omega=2xy\,dx+(x^2+3y^2)\,dy$ on $\mathbb{R}^2$.

**Step 1 (closed?):** $\partial_x(x^2+3y^2)-\partial_y(2xy)=2x-2x=0$. Yes.

**Step 2 (ray integral):** $f(x,y)=\int_0^1\big[\omega_1(tx,ty)\,x+\omega_2(tx,ty)\,y\big]dt$, with $\omega_1(tx,ty)=2t^2xy$ and $\omega_2(tx,ty)=t^2x^2+3t^2y^2$. So the integrand is $2t^2x^2y+t^2x^2y+3t^2y^3=3t^2(x^2y+y^3)$, and $f=\int_0^13t^2\,dt\,(x^2y+y^3)=x^2y+y^3$.

**Step 3 (check):** $df=(2xy)\,dx+(x^2+3y^2)\,dy=\omega$. (Verified with sympy.) On the punctured plane, the same recipe fails for $d\theta$ because the rays from the origin pass through the puncture.

### Example 3: Betti numbers of $S^1$, $S^2$, $T^2$
**The circle.** $H^0(S^1)=\mathbb{R}$ (connected). For $H^1$, define $I:\Omega^1(S^1)\to\mathbb{R}$, $I(\omega)=\int_{S^1}\omega$. It kills exact forms (FTC on a closed loop), so it descends to $H^1(S^1)\to\mathbb{R}$, and it is onto since $I(d\theta)=2\pi$. It is injective: if $\int_{S^1}\omega=0$, then $f(\theta)=\int_0^\theta\omega$ is a well-defined smooth function on the circle (going once around adds $0$), and $df=\omega$. Hence $H^1(S^1)\cong\mathbb{R}$, spanned by $[d\theta]$: $(b_0,b_1)=(1,1)$, $\chi=0$.

**The sphere.** $H^0=\mathbb{R}$. $H^1(S^2)=0$: every loop on $S^2$ can be contracted to a point, so it bounds a (possibly self-intersecting) disk, and integrals of closed 1-forms around loops vanish and the path-integral construction of Section 1 works. $H^2(S^2)\cong\mathbb{R}$: the area form $\sigma=\sin\phi\,d\phi\wedge d\theta$ has $\int_{S^2}\sigma=4\pi\neq0$, while any exact $d\eta$ has $\int_{S^2}d\eta=\int_{\partial S^2}\eta=0$; so $[\sigma]\neq0$. $(b_0,b_1,b_2)=(1,0,1)$, $\chi=2$.

**The torus** $T^2=S^1\times S^1$ with angles $\theta_1,\theta_2$. $H^1$ contains $[d\theta_1]$ and $[d\theta_2]$. They are independent: integrate around the two circles $C_1$ ($\theta_2$ fixed) and $C_2$ ($\theta_1$ fixed); the matrix of integrals is $\begin{pmatrix}2\pi&0\\0&2\pi\end{pmatrix}$, invertible, and exact forms integrate to zero on both. In fact $H^1(T^2)=\mathbb{R}^2$ and $H^2(T^2)=\mathbb{R}$, spanned by $[d\theta_1\wedge d\theta_2]$ with integral $4\pi^2$. $(b_0,b_1,b_2)=(1,2,1)$, $\chi=0$.

**Cross-check with triangulations** (computed in python by ranks of boundary matrices over $\mathbb{Q}$, which by de Rham's theorem give the same Betti numbers):

| Space | Triangulation | $(V,E,F)$ | Betti numbers | $\chi=\sum(-1)^kb_k=V-E+F$ |
|---|---|---|---|---|
| $S^1$ | boundary of a triangle | $(3,3,\,\text{–})$ | $1,1$ | $0$ |
| $S^2$ | boundary of a tetrahedron | $(4,6,4)$ | $1,0,1$ | $2$ |
| $T^2$ | $3\times3$ grid, each square cut in two | $(9,27,18)$ | $1,2,1$ | $0$ |

### Example 4: The Aharonov–Bohm potential, inside and out
Take a solenoid of radius $a$ with uniform field $B_0$ inside, so $\Phi=\pi a^2B_0$. Choose
$$A=\begin{cases}\dfrac{\Phi\,r^2}{2\pi a^2}\,d\theta & r\le a,\\[2mm] \dfrac{\Phi}{2\pi}\,d\theta & r\ge a.\end{cases}$$
The two agree at $r=a$. Inside, $dA=\frac{\Phi r}{\pi a^2}\,dr\wedge d\theta=\frac{\Phi}{\pi a^2}\,dx\wedge dy=B_0\,dx\wedge dy$, using $dx\wedge dy=r\,dr\wedge d\theta$ from S3E07. Outside, $dA=0$. Around any loop encircling the solenoid once, $\oint A=\frac{\Phi}{2\pi}\cdot2\pi=\Phi$. The relative phase of two electron beams is $q\Phi/\hbar$.

## Visual and animation notes
1. **Cold open:** overhead shot of a draining tub; tiny paddle wheels float in the flow, translating but not rotating; a toy boat circles the drain with a circulation counter climbing to a fixed value.
2. **Naive attempt:** a path integral from a base point $p_0$ to $p$; a second path appears; together they form a loop that is filled in by a soap-film surface (Stokes), giving zero.
3. **Key visual (cohomology motif):** in the punctured plane, a loop slides around, stretches, wobbles; the counter "$\oint d\theta = 2\pi$" stays stuck. When the loop tries to shrink, it **snags on the hole**. Moved off to the side so it no longer encircles the puncture, it shrinks to a point and the counter drops to 0.
4. **The quotient:** reuse the **equivalence class motif**: many closed 1-forms (orange level-line fields with a spiral) blur into one glowing blob labeled $[d\theta]$, while all exact forms collapse into the blob labeled $0$ (↩ S1E05, S2E05 stack-of-planes collapse).
5. **Betti numbers:** a sphere, a torus, and a circle side by side, each with its "holes badge" ($b_0,b_1,b_2$) pinned on as **invariant badges**; the shapes are stretched and dented while the badges stay put.
6. **de Rham's theorem:** two columns, "calculus" (forms, $d$) and "topology" (cycles, $\partial$), connected by **bijection threads** labeled $\int$, then sliding onto each other.
7. **Maxwell:** the four vector equations stacked; they fold into two lines, $dF=0$ and $d\star F=\mathcal{J}$; a final $d$ is applied to the second, and the continuity equation drops out.
8. **Aharonov–Bohm:** two electron beams pass on either side of a glowing solenoid with zero field outside; the interference fringes slide as a dial for $\Phi$ turns.

## Common misconceptions
- **Misconception:** "$d\theta$ is exact because it is $d$ of $\theta$." **Reality:** $\theta$ is not a single-valued smooth function on $\mathbb{R}^2\setminus\{0\}$. $d\theta$ is defined everywhere; $\theta$ is not. The notation hides the hole.
- **Misconception:** "Zero curl means no circulation." **Reality:** only for loops that bound a surface within the region. The obstruction is exactly $H^1$.
- **Misconception:** "Cohomology needs a metric or a triangulation." **Reality:** de Rham cohomology uses only smooth structure and $d$; de Rham's theorem shows it is even independent of that, depending only on topology.
- **Misconception:** "The vector potential is unphysical, only $F$ matters." **Reality:** $A$ is defined up to exact forms (gauge), but its cohomology class, measured by $\oint A$ around holes, is physical (Aharonov–Bohm).
- **Misconception:** "$H^k$ counts $k$-dimensional holes in a naive picture-by-picture way." **Reality:** it is a vector space; the dimensions are robust invariants, but e.g. $S^2$ encloses a "cavity" seen by $H^2$ only because the sphere itself is a closed 2-cycle.

## Exercises
- **Warm-up:** (a) Compute $\oint_\gamma d\theta$ for $\gamma(t)=(\cos 2t,\sin 2t)$, $0\le t\le 2\pi$. (b) Find $f$ with $df=(y\cos x)\,dx+(\sin x+2y)\,dy$ using the ray integral. (c) Compute $\chi$ for the boundary of a cube (8 vertices, 12 edges, 6 square faces).
- **Core:** (a) Show that $H^1(\mathbb{R}^2\setminus\{p,q\})$ is at least 2-dimensional, using two angle forms. (b) Explain why a closed 2-form on $S^2$ with total integral 0 is exact (assume $H^2(S^2)\cong\mathbb{R}$ via integration). (c) Derive the continuity equation from $d\star F=\mathcal{J}$ in words.
- **Stretch:** (a) Prove the 1-form Poincaré lemma on a star-shaped region by differentiating the ray integral. (b) Show that $H^1$ of the figure-eight (two circles joined at a point) is 2-dimensional, and compute its Euler characteristic two ways. (c) Show that a smooth map $F:S^1\to S^1$ acts on $H^1(S^1)\cong\mathbb{R}$ by multiplication by an integer (the degree).

<details><summary>Hints and answers</summary>

- **Warm-up:** (a) $4\pi$ (the loop winds twice). (b) $f=y\sin x+y^2$. (c) $8-12+6=2$, same as $S^2$.
- **Core:** (a) The forms $d\theta_p,d\theta_q$ (angles about $p$ and $q$) have integral matrix $\begin{pmatrix}2\pi&0\\0&2\pi\end{pmatrix}$ over small circles around $p$ and $q$. (b) Its class maps to $0$ under the isomorphism. (c) $d$ of the left side is $d^2(\star F)=0$, so $d\mathcal{J}=0$, which is $\partial_t\rho+\nabla\cdot\vec J=0$.
- **Stretch:** (a) Differentiate under the integral, use $\partial_j\omega_i=\partial_i\omega_j$, and recognize $\frac{d}{dt}\big(t\,\omega_j(tx)\big)$. (b) Vertices 1, edges 2 in a minimal cell structure: $\chi=1-2=-1=b_0-b_1=1-2$. (Python check on a triangulation with $(V,E)=(5,6)$ also gives $b=(1,2)$.) (c) $\int_{S^1}F^*d\theta$ is $2\pi$ times the number of times $F$ winds, an integer because $F$ returns to its start.
</details>

## Historical note
Poincaré's *Analysis Situs* (1895) introduced homology and the Betti numbers, named after Enrico Betti, who had studied connectivity numbers in the 1870s. Poincaré also knew that closed forms need not be exact on spaces with holes; the lemma that bears his name records the case without holes. Élie Cartan conjectured in the late 1920s that the forms-and-$d$ calculus captures the topological invariants exactly, and Georges de Rham proved it in his 1931 thesis, "Sur l'analysis situs des variétés à $n$ dimensions." The modern presentation via sheaves and good covers came later, from Weil, Cartan, and others; Bott and Tu's textbook (1982) made the differential-forms approach the standard entry point.

On the physics side, Maxwell published his equations in 1865; the compact form-language version $dF=0$, $d\star F=\mathcal{J}$ became standard in 20th-century relativity texts such as Misner, Thorne, and Wheeler (1973). Yakir Aharonov and David Bohm predicted the effect in 1959 (Ehrenberg and Siday had noticed it in 1949), and it was confirmed experimentally, most decisively by Tonomura and collaborators in the 1980s using shielded toroidal magnets.

## Connections
- **Callbacks:** ↩ S1E05 (equivalence classes), ↩ S2E05 (quotient spaces $V/W$), ↩ S2E08 (duals go backward), ↩ S2E09 (Minkowski signature), ↩ S2E11 (Hodge star), ↩ S3E07 (the angle form, $dx\wedge dy=r\,dr\wedge d\theta$), ↩ S3E08 ($d^2=0$, Stokes, chains).
- **Sets up:** ↪ S3E10 (Gauss–Bonnet: $\int K\,dA=2\pi\chi$), ↪ S3E11 (cohomology of Lie groups; gauge theory as a side quest), ↪ S3E12 ($H^k$ as a contravariant functor from manifolds to vector spaces).
- **Side quests:** Hodge theory (each class has a unique harmonic representative; Hilbert spaces meet topology), Morse theory (Betti numbers from critical points), Fiber bundles and gauge theory (electromagnetism as curvature of a connection).

## References
- **Primary / historical:** Georges de Rham, "Sur l'analysis situs des variétés à $n$ dimensions," *Journal de Mathématiques Pures et Appliquées* (1931). Henri Poincaré, "Analysis Situs," *Journal de l'École Polytechnique* (1895).
- **Primary / physics:** Y. Aharonov and D. Bohm, "Significance of Electromagnetic Potentials in the Quantum Theory," *Physical Review* 115 (1959).
- **Textbook:** Raoul Bott and Loring W. Tu, *Differential Forms in Algebraic Topology* (Springer GTM 82, 1982), Ch. I "de Rham Theory," starting with §1 "The de Rham Complex on $\mathbb{R}^n$."
- **Textbook:** John M. Lee, *Introduction to Smooth Manifolds*, 2nd ed. (Springer GTM 218, 2013), Ch. 17 "De Rham Cohomology" and Ch. 18 "The de Rham Theorem."
- **Textbook (physics):** Charles W. Misner, Kip S. Thorne, and John Archibald Wheeler, *Gravitation* (W. H. Freeman, 1973), Ch. 4 "Electromagnetism and Differential Forms."
- **Accessible:** John Baez and Javier P. Muniain, *Gauge Fields, Knots and Gravity* (World Scientific, 1994), Part I (Maxwell's equations in the language of forms, de Rham cohomology).
- **Accessible:** Richard P. Feynman, Robert B. Leighton, and Matthew Sands, *The Feynman Lectures on Physics*, Vol. II (1964), Ch. 15 "The Vector Potential" (includes the Aharonov–Bohm setup).
