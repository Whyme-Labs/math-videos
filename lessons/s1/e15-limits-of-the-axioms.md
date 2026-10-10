# S1E15: The Limits of the Axioms

> **Season / Act:** Season 1, Act III (Infinity and the Foundations Crisis) · **Target runtime:** 20–25 min ·
> **Prerequisites:** S1E04 (sets and ZF), S1E05 (equivalence classes), S1E11–S1E12 (bijections, the diagonal argument), S1E13 (ordinals, Goodstein), S1E14 (Russell, Principia, Hilbert's program). No logic background beyond "an axiom system plus rules of proof" ·
> **Builds toward:** S1E16 (groups; the free group behind Banach–Tarski), S2E02 (every vector space has a basis, using Choice), S2E22 (non-measurable sets), S2E25 (Hahn–Banach and Zorn's lemma)

## Learning objectives
By the end of this lesson the viewer can:
1. State Gödel's first and second incompleteness theorems with their hypotheses (consistent, effectively axiomatized, strong enough for basic arithmetic), and explain how the second differs from the first.
2. Explain how the diagonal trick of S1E12 becomes a self-referential sentence via Gödel numbering, and run a small Gödel-numbering computation by hand.
3. State the Continuum Hypothesis and explain what "independent of ZFC" means (Gödel 1940 plus Cohen 1963), including why it is a *relative* consistency result.
4. State the Axiom of Choice, prove it for finite families, explain Russell's shoes-and-socks illustration, and show why a Vitali set (built with Choice) cannot have a length.

## Cold open
*Narrator:*

"Episode 11 taught us to count infinite sets by matching. Episode 12 showed that the real line is strictly bigger than the whole numbers. So here's an innocent question. Is there anything *in between*? Is there a set of real numbers too big to be listed, but too small to be matched with the whole line?

Georg Cantor believed the answer was no. He called it the Continuum Hypothesis, and he spent years trying to prove it. He never managed. In 1900, David Hilbert put it first on his famous list of problems for the new century.

Here is how the story ends, and it's stranger than either 'yes' or 'no.' In 1940, Kurt Gödel showed that the standard axioms of mathematics can't *disprove* it. In 1963, Paul Cohen showed that they can't *prove* it either. The question is perfectly precise. And the rules we use for all of mathematics are simply silent.

How can a precise question have no answer? To understand that, we have to go back ten years before Gödel's result, to a young man at a conference in Königsberg, who quietly announced that *every* system of rules strong enough to do arithmetic has questions like this. Tonight we find out where the axioms run out."

## The story

### 1. The naive hope: one rulebook to settle everything
At the end of S1E14 we left three schools arguing about the foundations. Hilbert's *formalism* had a concrete program: write all of mathematics as a formal system (axioms plus mechanical proof rules), then prove, using only safe finite reasoning, that the system is

- **complete**: every statement is either provable or refutable, and
- **consistent**: no statement is both provable and refutable.

To make this precise, we need a few definitions.

> **Definition (formal theory).** A *theory* T is a set of axioms written in a formal language, together with fixed logical rules of inference. A *proof* in T is a finite sequence of formulas, each an axiom or obtained from earlier ones by a rule. We write T ⊢ φ ("T proves φ").
>
> - T is **consistent** if there is no sentence φ with both T ⊢ φ and T ⊢ ¬φ.
> - T is **complete** if for every sentence φ (in its language), T ⊢ φ or T ⊢ ¬φ.
> - T is **effectively axiomatized** if there is an algorithm that decides, for any formula, whether it is an axiom of T. (Then there is also an algorithm that checks whether a given finite list of formulas is a proof.)

Peano arithmetic (PA, the first-order version of S1E02's axioms, with induction as an axiom scheme) is effectively axiomatized. So is ZFC. Hilbert hoped such systems were complete, and that their consistency could be proved by elementary means.

### 2. The crisis: a sentence that talks about its own provability
Gödel's insight had two steps.

**Step 1: arithmetic can talk about proofs.** Give each symbol a code number, and encode a string of symbols $s_1 s_2 \dots s_k$ with codes $c_1, \dots, c_k$ as
$$\ulcorner s_1 \dots s_k \urcorner = 2^{c_1} \cdot 3^{c_2} \cdot 5^{c_3} \cdots p_k^{c_k},$$
where $p_k$ is the $k$-th prime. Unique prime factorization means the number can be decoded back into the string. A proof is a list of strings, so it can be coded the same way. Now "x is the code of a proof of the formula with code y" is a statement about two numbers, checkable by a mechanical procedure, and Gödel showed it can be expressed by a formula $\mathrm{Prf}(x, y)$ of arithmetic. Then
$$\mathrm{Prov}(y) :\equiv \exists x\, \mathrm{Prf}(x, y)$$
says "the formula with code y is provable."

**Step 2: the diagonal trick.** Recall S1E12: list every row of a table, then walk down the diagonal and flip. Gödel did the same thing with formulas that take numbers as input.

> **Diagonal Lemma.** Let T be a theory strong enough to represent computable functions (as below). For every formula φ(x) with one free variable, there is a sentence G such that
> $$T \vdash G \leftrightarrow \varphi(\ulcorner G \urcorner).$$

*Proof sketch.* Let $d(n)$ be the computable function that takes the code of a formula $\psi(x)$ and returns the code of $\psi(\overline{n})$, the formula with the numeral for its *own code* plugged in (this is the "diagonal": formula number n applied to input n). Since T represents computable functions, there is a formula expressing $d$. Let $\psi(x) :\equiv \varphi(d(x))$, let $k = \ulcorner \psi \urcorner$, and let $G :\equiv \psi(\overline{k})$. Then $G$ says $\varphi(d(k))$, and $d(k) = \ulcorner \psi(\overline{k}) \urcorner = \ulcorner G \urcorner$. So $G$ says $\varphi(\ulcorner G \urcorner)$, and T can verify this. ∎ (Worked Example 2 walks through it.)

Apply the lemma to $\varphi(x) :\equiv \neg\mathrm{Prov}(x)$ and get the **Gödel sentence** $G_T$:
$$T \vdash G_T \leftrightarrow \neg\mathrm{Prov}(\ulcorner G_T \urcorner).$$
In plain words, $G_T$ says: **"I am not provable in T."** This is the Liar ("this sentence is false") with *truth* replaced by *provability*. The Liar is a paradox; Gödel's version is a theorem.

### 3. The theorems, stated carefully
"Sufficiently strong" has a precise meaning: T can prove the basic facts about +, × and order on the numerals (for example, T contains Robinson arithmetic Q, a finite fragment of PA without induction). That is enough for T to *represent* every computable function, which is what the Diagonal Lemma needs.

> **Gödel's First Incompleteness Theorem (1931; in the form strengthened by Rosser, 1936).** Let T be a theory in which basic arithmetic can be carried out. If T is
> 1. **consistent**,
> 2. **effectively axiomatized**, and
> 3. **sufficiently strong** (it interprets Robinson arithmetic Q),
>
> then there is a sentence $G$ in the language of arithmetic such that $T \nvdash G$ and $T \nvdash \neg G$. In particular, T is incomplete.

Gödel's 1931 paper proved "$T \nvdash \neg G$" under the slightly stronger hypothesis of *ω-consistency*; J. Barkley Rosser (1936) found a cleverer sentence that needs only consistency.

Here is the half of the argument that is short enough to give in full, in the cleanest special case.

> **Theorem (truth version).** Suppose T satisfies the hypotheses and is moreover **sound**: everything T proves is true in the standard natural numbers ℕ. Then $G_T$ is true but not provable in T, and $\neg G_T$ is not provable either.

*Proof.* Suppose $T \vdash G_T$. By soundness $G_T$ is true. But $G_T$ is (provably, hence truly) equivalent to "$G_T$ is not provable in T," so $G_T$ is not provable: a contradiction. Hence $T \nvdash G_T$. That fact is exactly what $G_T$ asserts, so $G_T$ is **true**. Then $\neg G_T$ is false, and by soundness T cannot prove a falsehood, so $T \nvdash \neg G_T$. ∎

Notice where each hypothesis went. Effective axiomatization makes "is a proof" a mechanical check, so that Prov is a formula of arithmetic at all. Strength lets T carry out the diagonal construction. Consistency (or soundness) keeps T from proving everything. Drop any one and the theorem can fail: the set of *all true* arithmetic sentences is complete and consistent, but no algorithm can recognize its axioms; Presburger arithmetic (addition only, no multiplication) is consistent, effectively axiomatized, and **complete**, because it is too weak to code proofs.

Now the second theorem. Let $\mathrm{Con}_T$ be the arithmetic sentence $\neg\mathrm{Prov}(\ulcorner 0 = 1 \urcorner)$, "T does not prove 0 = 1."

> **Gödel's Second Incompleteness Theorem (1931).** If T is consistent, effectively axiomatized, and contains enough arithmetic to formalize the proof of the first theorem (for example, T extends PA), then
> $$T \nvdash \mathrm{Con}_T.$$

*Proof sketch.* The argument "if T is consistent, then $G_T$ is not provable" uses only elementary reasoning about codes, and PA is strong enough to carry it out internally. So $T \vdash \mathrm{Con}_T \rightarrow \neg\mathrm{Prov}(\ulcorner G_T \urcorner)$, i.e. $T \vdash \mathrm{Con}_T \rightarrow G_T$. If T also proved $\mathrm{Con}_T$, it would prove $G_T$, which the first theorem forbids. ∎

**The difference between the two.** The first theorem says: some sentence is undecided, and that sentence is a specially built self-referential one. The second says: one *specific, meaningful* sentence is unprovable, namely the system's own consistency. The second is the one that ended Hilbert's program as originally conceived. A consistent system can't certify its own consistency, and certainly a weaker "finitary" fragment can't certify it either.

**What this means for S1E13 and S1E14.** Principia Mathematica, if consistent, is incomplete; so is every effectively axiomatized extension, including ZFC. Gödel's theorem explains *why* PA must leave some true arithmetic statements unproved. Goodstein's theorem from S1E13 is a natural example, shown unprovable in PA by Kirby and Paris (1982). And the ordinal $\varepsilon_0$ appears again: Gerhard Gentzen (1936) proved the consistency of PA, but his proof uses transfinite induction up to $\varepsilon_0$, a principle PA itself cannot prove. That is the second theorem in action: consistency can be proved, but only from outside.

### 4. The Continuum Hypothesis: a question ZFC can't settle
S1E12 gave us $|\mathbb{N}| < |\mathbb{R}|$. Write $\aleph_0 = |\mathbb{N}|$, $\aleph_1$ for the next larger cardinal (it exists in ZFC: it is the set of countable ordinals from S1E13), and $2^{\aleph_0} = |\mathcal{P}(\mathbb{N})| = |\mathbb{R}|$.

> **Continuum Hypothesis (CH).** Every infinite subset of ℝ is either countable or in bijection with ℝ. Equivalently, $2^{\aleph_0} = \aleph_1$.

Partial evidence came early: Cantor and Bendixson showed that every uncountable **closed** subset of ℝ has the size of ℝ. But arbitrary subsets resisted.

> **Theorem (Gödel, 1938–1940).** If ZF is consistent, then so is ZFC + CH (indeed ZFC + the Generalized Continuum Hypothesis).
>
> **Theorem (Cohen, 1963).** If ZF is consistent, then so is ZFC + ¬CH.

Together: **if ZFC is consistent, it neither proves nor refutes CH.** These are *relative* consistency results; by the second incompleteness theorem we can't hope for an absolute proof that ZFC is consistent, so "if ZF is consistent" is the best possible hypothesis.

How did they do it? Gödel built, inside any model of ZF, a slim universe *L* of **constructible sets**: sets added stage by stage along the ordinals, each one definable from earlier stages. In *L*, Choice and CH both hold. Cohen went the other way: he invented **forcing**, a method to enlarge a model by adding new sets (for example, $\aleph_2$ new real numbers) while keeping all of the ZFC axioms true. Cohen received the Fields Medal in 1966 for this work.

Note that CH is *not* a Gödel sentence: Gödel's sentences are statements about natural numbers, while CH is about arbitrary sets of reals. Independence of CH is a separate, set-theoretic phenomenon. Its status remains debated: some set theorists look for new axioms (large cardinals, forcing axioms) that would settle it, others argue there are several equally good "universes" of sets.

### 5. The Axiom of Choice: harmless for finite sets, strange for infinite ones
> **Axiom of Choice (AC).** For every family $\{A_i\}_{i \in I}$ of nonempty sets, there is a function $f$ with $f(i) \in A_i$ for every $i$. Such an $f$ is a **choice function**.

For finitely many sets, you don't need an axiom (Worked Example 3 proves it). For infinitely many, ZF alone can't always produce $f$: Gödel (1938) showed AC is consistent with ZF, and Cohen (1963) showed ¬AC is too. So AC is independent of ZF, which is why the standard system is called ZF**C** with Choice added on purpose.

**Russell's shoes and socks.** In *Introduction to Mathematical Philosophy* (1919), where Russell calls AC the "multiplicative axiom," he gives the illustration: a millionaire owns infinitely many pairs of boots and infinitely many pairs of socks. To pick one boot from each pair, there is a *rule*: take the left one. For socks the two members of a pair are indistinguishable, so there is no rule, and producing a selection needs the axiom.

Choice is equivalent (over ZF) to **Zorn's lemma** and to Zermelo's **well-ordering theorem** (every set can be well-ordered, in the sense of S1E13). It has consequences that are wonderful and consequences that are disturbing:

- *Wonderful:* every vector space has a basis (↪ S2E02); in fact Andreas Blass (1984) showed that this statement, over ZF, implies AC. Hahn–Banach (↪ S2E25) uses it too.
- *Disturbing:* ℝ can be well-ordered, yet nobody can write a well-ordering down; it is consistent with ZFC that no formula of set theory defines one. And the **Banach–Tarski paradox** (1924): a solid ball in ℝ³ can be split into finitely many pieces (five suffice) that can be moved by rotations and translations and reassembled into *two* balls, each the same size as the original. The pieces are so wild that they have no volume. The engine of the proof is a group: two rotations that generate a *free group*, which you will be ready to appreciate after S1E16.

### 6. Payoff: mathematics has choices in its foundations
The cold-open question, "Is there an infinity between ℕ and ℝ?", has a precise answer: ZFC can't decide. Gödel's theorems say this is not a defect of our particular axioms. Any consistent, effectively axiomatized system strong enough for arithmetic leaves questions open, and can't vouch for its own consistency.

That doesn't make mathematics arbitrary. Every theorem is still a guarantee: *if* these axioms, *then* this conclusion. What changes is our view of axioms. They are not a final description of the one true universe. They are choices of which structure we want to study. That sentence is the bridge to Act IV: from now on, we stop asking what objects *are* and start asking which rules they follow.

## Worked examples

### Example 1: Gödel numbering by hand
Use this toy code (Gödel's own 1931 assignments were different): `0` ↦ 1, `S` ↦ 2, `=` ↦ 3, `(` ↦ 4, `)` ↦ 5, `+` ↦ 6.

**(a) Encode "0 = 0".** The codes are 1, 3, 1. Using the first three primes:
$$2^{1} \cdot 3^{3} \cdot 5^{1} = 2 \cdot 27 \cdot 5 = 270.$$

**(b) Encode "S0 = S0".** The codes are 2, 1, 3, 2, 1. Using primes 2, 3, 5, 7, 11:
$$2^{2} \cdot 3^{1} \cdot 5^{3} \cdot 7^{2} \cdot 11^{1} = 4 \cdot 3 \cdot 125 \cdot 49 \cdot 11.$$
Step by step: $4 \cdot 3 = 12$; $12 \cdot 125 = 1500$; $1500 \cdot 49 = 73{,}500$; $73{,}500 \cdot 11 = 808{,}500$.

**(c) Decode 808,500.** Factor: $808500 = 2 \cdot 404250 = 2^2 \cdot 202125$; $202125 = 3 \cdot 67375$; $67375 = 5^3 \cdot 539$; $539 = 7^2 \cdot 11$. So $808500 = 2^2 \cdot 3^1 \cdot 5^3 \cdot 7^2 \cdot 11^1$, exponents 2, 1, 3, 2, 1, which spells `S 0 = S 0`. Unique factorization (S1E03's arithmetic, and S1E18's main character) is what makes decoding unambiguous.

**Takeaway:** "formula," "proof," "provable" become properties of numbers. Arithmetic can now talk about itself.

### Example 2: Building the self-referential sentence step by step
We follow the Diagonal Lemma with $\varphi(x) = \neg\mathrm{Prov}(x)$.

1. Define the computable function $d$: given the code $n$ of a formula $\psi(x)$, output the code of $\psi(\overline{n})$.
2. Form $\psi(x) :\equiv \neg\mathrm{Prov}(d(x))$. In words: "the diagonal of formula x is not provable."
3. Compute its code; call it $k$. (It is some enormous but definite number.)
4. Form $G :\equiv \psi(\overline{k}) = \neg\mathrm{Prov}(d(\overline{k}))$.
5. Evaluate $d(k)$: by definition it is the code of $\psi(\overline{k})$, which is $G$ itself. So $d(k) = \ulcorner G \urcorner$.
6. Therefore $G$ says $\neg\mathrm{Prov}(\ulcorner G \urcorner)$: "I am not provable."

The same trick in English, due to W. V. Quine: *"yields a falsehood when appended to its own quotation" yields a falsehood when appended to its own quotation.* The sentence never names itself directly; it gives instructions whose result *is* the sentence. No sentence "contains itself" (Russell's types from S1E14 are respected); self-reference arrives through coding and substitution.

### Example 3: Choice is free for finite families
**Claim.** For every $n \ge 1$ and nonempty sets $A_1, \dots, A_n$, ZF proves there is a choice function $f$ with $f(i) \in A_i$.

*Proof by induction on n.* For $n = 1$: $A_1$ is nonempty, so by the logical rule of existential instantiation we may take some $a_1 \in A_1$, and $f = \{(1, a_1)\}$ works. For the step, suppose $f$ is a choice function for $A_1, \dots, A_n$. Since $A_{n+1} \neq \varnothing$, pick $a \in A_{n+1}$ and set $f' = f \cup \{(n+1, a)\}$. Then $f'(i) \in A_i$ for all $i \le n + 1$. ∎

**Why the proof doesn't extend.** Induction yields choice functions for each finite stage, but a proof is finite, so it can make only finitely many arbitrary picks. To get one function for *infinitely many* sets at once, we need either a rule (shoes: $f(\text{pair}) = $ left shoe) or the axiom (socks).

**Shoes, concretely.** Let pair $i$ be $\{L_i, R_i\}$. The choice function $f(i) = L_i$ is *defined*; no axiom needed. **Socks:** pair $i$ is $\{a_i, b_i\}$ with no property distinguishing $a_i$ from $b_i$. There are models of ZF (built by permutation and forcing arguments) in which a countable family of two-element sets has no choice function at all.

### Example 4: A set with no length (Vitali, 1905)
This is the canonical "Choice produces a monster" argument, and it returns in S2E22.

1. **Equivalence relation (↩ S1E05).** On $[0, 1]$ say $x \sim y$ iff $x - y \in \mathbb{Q}$. It is reflexive ($x - x = 0$), symmetric, and transitive (a sum of rationals is rational). Each class is countable, like $\{x + q\}$, and there are uncountably many classes.
2. **Choice.** Use AC to pick one representative from each class. Call the set of representatives $V \subseteq [0, 1]$. No rule is available: there's no "left shoe" in a class like $\{\sqrt{2} + q\}$.
3. **Translates.** Let $q_1, q_2, \dots$ list $\mathbb{Q} \cap [-1, 1]$ (countable by S1E11). Put $V_n = V + q_n$.
4. **Disjoint.** If $x \in V_m \cap V_n$, then $x = v + q_m = w + q_n$ with $v, w \in V$, so $v - w \in \mathbb{Q}$, so $v \sim w$, so $v = w$ (one representative per class) and then $q_m = q_n$.
5. **They cover [0, 1].** For $x \in [0, 1]$, its class has a representative $v \in V$ with $x - v \in \mathbb{Q} \cap [-1, 1]$, so $x \in V_n$ for some n.
6. **They fit inside [−1, 2].** Each $V_n \subseteq [0, 1] + [-1, 1] = [-1, 2]$.
7. **Contradiction.** Suppose $V$ had a length $m(V)$ that is translation-invariant and countably additive. Then all $V_n$ have length $m(V)$, and
$$1 \le \sum_{n=1}^{\infty} m(V) \le 3.$$
If $m(V) = 0$ the sum is $0 < 1$; if $m(V) > 0$ the sum is $\infty > 3$. Neither works. So $V$ has no length. ∎

Solovay (1970) showed that, assuming the consistency of an inaccessible cardinal, there is a model of ZF (without full Choice) in which *every* subset of ℝ is Lebesgue measurable. So the monster really is a product of Choice.

## Visual and animation notes
1. **Cold open:** the number line ℕ as sparse dots, ℝ as a solid glowing line, and a question mark hovering in a gap between two "size badges" ($\aleph_0$ and $2^{\aleph_0}$). The gap flickers between empty and occupied.
2. **Gödel numbering:** symbols drop into a "prime factory": each symbol becomes an exponent on a prime, and the tower of primes multiplies into one big number (270, then 808,500). Reverse the animation to decode.
3. **Diagonal argument (recurring motif):** the S1E12 infinite table returns, now with rows labeled by formulas $\psi_0, \psi_1, \ldots$ and columns by numbers. The diagonal $\psi_n(\overline{n})$ lights up, a NOT gate flips it, and the flipped diagonal becomes a new row that "points at itself" with an arrow labeled "I am not provable."
4. **Two theorems, two badges:** Theorem I places a badge "undecided: $G_T$" outside a fenced region labeled "provable in T." Theorem II places a second badge "Con(T)" next to it.
5. **Hilbert's program:** a castle labeled "complete + consistent, proved finitely." A Gödel sentence cracks the "complete" tower; Con(T) cracks the "self-certified" tower.
6. **Gentzen:** the ε₀ matchstick spiral from S1E13 reappears as a ladder *outside* the PA box, reaching in to stamp "consistent."
7. **CH as a fork in the road:** a universe labeled ZFC splits into two branches: *L* (Gödel, "slim," CH true) and a forcing extension (Cohen, "inflated with $\aleph_2$ new reals," CH false). Both branches are drawn as equally solid.
8. **Shoes and socks:** an infinite shelf of shoe pairs; a hand grabs every left shoe in one sweep. Then an infinite shelf of identical sock pairs; the hand hesitates, and an "AC" stamp has to appear before the selection happens.
9. **Vitali (quotient motif):** points of [0, 1] blur into blobs (classes mod ℚ, the S1E05 motif), one glowing representative per blob, then countably many shifted copies stack into [−1, 2] with the bound "between 1 and 3" overlaid.
10. **Banach–Tarski teaser:** a ball shatters into five dust-like pieces that rotate and reassemble into two balls; a caption: "these pieces have no volume." A small tag "free group ↪ S1E16."

## Common misconceptions
- **Misconception:** Gödel proved that mathematics is inconsistent or that nothing is certain. **Reality:** the theorems are themselves rigorous results. They say that a *consistent* system of the right kind is incomplete and can't prove its own consistency.
- **Misconception:** there are true statements that can never be proved by anyone. **Reality:** $G_T$ is unprovable *in T*. It is provable in the stronger system T + Con(T), which then has its own Gödel sentence. Unprovability is always relative to a system.
- **Misconception:** incompleteness applies to every formal system. **Reality:** it needs all three hypotheses. Presburger arithmetic (no multiplication) and Tarski's theory of real closed fields are complete and decidable.
- **Misconception:** Gödel's completeness theorem and incompleteness theorems contradict each other. **Reality:** completeness (Gödel, 1929/30) says first-order logic proves every sentence true in *all* models of the axioms. Incompleteness says some sentences are true in ℕ but false in other (non-standard) models of PA (↩ S1E02, S1E13), so they can't be proved.
- **Misconception:** CH is independent because of the incompleteness theorem. **Reality:** CH is not an arithmetic sentence, and its independence needed the new techniques of constructible sets and forcing.
- **Misconception:** Banach–Tarski shows AC is false. **Reality:** there is no contradiction: the pieces are non-measurable, so "volume is conserved" doesn't apply to them. It shows that "volume" can't be defined for every subset of ℝ³.

## Exercises
- **Warm-up (computational):** Using the toy code of Example 1, compute the Gödel number of `S0 = 0` and decode the number $2^{1} \cdot 3^{6} \cdot 5^{1} \cdot 7^{3} \cdot 11^{1}$.
- **Core (conceptual):** Explain which hypothesis of the first incompleteness theorem fails for each of these complete theories: (a) the set of all sentences true in ℕ; (b) Presburger arithmetic; (c) an inconsistent theory.
- **Stretch (proof):** Use the halting problem to prove a weak form of incompleteness: if T is sound, effectively axiomatized, and for every program P can express "P halts" as a sentence $H_P$, then T is incomplete. (Hint: if T decided every $H_P$, search through all proofs to decide halting.)

<details><summary>Hints and answers</summary>

- **Warm-up:** `S0 = 0` has codes 2, 1, 3, 1, so its number is $2^2 \cdot 3 \cdot 5^3 \cdot 7 = 4 \cdot 3 \cdot 125 \cdot 7 = 10{,}500$. The exponents 1, 6, 1, 3, 1 decode to `0 + 0 = 0`.
- **Core:** (a) Not effectively axiomatized: by the first theorem (or by Tarski's and Church's work), there is no algorithm recognizing true arithmetic sentences. (b) Not sufficiently strong: no multiplication, so proofs can't be coded. (c) Not consistent: an inconsistent theory proves everything, so it is trivially "complete."
- **Stretch:** Suppose T proves $H_P$ or $\neg H_P$ for every P. Given P, enumerate all proofs of T (possible since T is effectively axiomatized) until you find a proof of $H_P$ or of $\neg H_P$; one appears by completeness. By soundness, the one you find is true. This decides the halting problem, which Turing (1936) showed is undecidable (another diagonal argument). So T is incomplete. Note that this version needs soundness, while Gödel–Rosser needs only consistency.

</details>

## Historical note
Kurt Gödel (1906–1978) proved the completeness of first-order logic in his 1929 doctoral dissertation at Vienna. In September 1930, aged 24, he attended a conference on the epistemology of the exact sciences in Königsberg. In a closing discussion he remarked, almost in passing, that there are arithmetic statements that are true but unprovable in a formal system like Principia's. John von Neumann was one of the very few who grasped the point immediately. In the same city, at a meeting held around the same days, Hilbert delivered his address ending "Wir müssen wissen, wir werden wissen" ("We must know, we will know"). Gödel's paper *On formally undecidable propositions of Principia Mathematica and related systems I* appeared in 1931; the promised Part II was never written, because the result was accepted quickly.

The Continuum Hypothesis was formulated by Cantor in 1878 and headed Hilbert's 1900 list of problems. Gödel's consistency proof via the constructible universe was announced in 1938 and published as a monograph in 1940. Paul Cohen, an analyst by training, invented forcing in 1963 and settled the other half, earning the Fields Medal in 1966.

Ernst Zermelo stated the Axiom of Choice explicitly in 1904 to prove that every set can be well-ordered. The proof provoked fierce debate (Borel, Baire, Lebesgue, and others objected), and Zermelo's 1908 axiomatization of set theory was partly a defense of it. Russell's shoes-and-socks illustration appears in *Introduction to Mathematical Philosophy* (1919), in the chapter on the multiplicative axiom. Banach and Tarski published their paradox in 1924.

## Connections
- **Callbacks:** ↩ S1E02 (Peano axioms; non-standard models), ↩ S1E04 (ZF and Russell's paradox), ↩ S1E05 (equivalence classes in the Vitali construction), ↩ S1E11 (bijections; ℚ is countable), ↩ S1E12 (the diagonal trick; $|\mathcal{P}(\mathbb{N})| > |\mathbb{N}|$), ↩ S1E13 (ordinals, $\varepsilon_0$, Goodstein, well-ordering), ↩ S1E14 (Principia, Hilbert's program, types, the three schools)
- **Sets up:** ↪ S1E16 (groups; the free group behind Banach–Tarski), ↪ S2E02 (bases of infinite-dimensional spaces need Choice; ℝ over ℚ), ↪ S2E22 (Vitali's non-measurable set), ↪ S2E25 (Hahn–Banach via Zorn's lemma)
- **Side quests:** Computable reals and Chaitin's Ω (attaches after S1E12); Constructive mathematics (after S1E14); history interludes "Hilbert's 1900 problems and the foundations crisis" and "Gödel stuns the 1930 Königsberg conference"

## References
- **Primary / historical**
  - Kurt Gödel, "Über formal unentscheidbare Sätze der Principia Mathematica und verwandter Systeme I," *Monatshefte für Mathematik und Physik* 38 (1931). English translation in Jean van Heijenoort (ed.), *From Frege to Gödel: A Source Book in Mathematical Logic, 1879–1931* (Harvard, 1967).
  - J. Barkley Rosser, "Extensions of some theorems of Gödel and Church," *Journal of Symbolic Logic* 1 (1936).
  - Kurt Gödel, *The Consistency of the Axiom of Choice and of the Generalized Continuum-Hypothesis with the Axioms of Set Theory*, Annals of Mathematics Studies 3 (Princeton University Press, 1940).
  - Paul J. Cohen, "The independence of the continuum hypothesis," *Proceedings of the National Academy of Sciences* 50 (1963); and *Set Theory and the Continuum Hypothesis* (W. A. Benjamin, 1966).
  - Bertrand Russell, *Introduction to Mathematical Philosophy* (1919), Chapter XII, "Selections and the Multiplicative Axiom."
  - Stefan Banach and Alfred Tarski, "Sur la décomposition des ensembles de points en parties respectivement congruentes," *Fundamenta Mathematicae* 6 (1924).
  - Laurie Kirby and Jeff Paris, "Accessible independence results for Peano arithmetic," *Bulletin of the London Mathematical Society* 14 (1982).
- **Textbooks**
  - Ernest Nagel and James R. Newman, *Gödel's Proof* (New York University Press, 1958; revised edition ed. Douglas Hofstadter, 2001).
  - Raymond Smullyan, *Gödel's Incompleteness Theorems* (Oxford University Press, 1992).
  - Thomas Jech, *Set Theory*, Third Millennium Edition (Springer, 2003): the chapters on the Axiom of Choice, constructible sets, and forcing.
  - Stan Wagon, *The Banach–Tarski Paradox* (Cambridge University Press, 1985).
- **Accessible**
  - Stanford Encyclopedia of Philosophy: "Gödel's Incompleteness Theorems" (Panu Raatikainen), "The Continuum Hypothesis" (Peter Koellner), and "The Axiom of Choice" (John L. Bell).
  - Douglas Hofstadter, *Gödel, Escher, Bach: an Eternal Golden Braid* (Basic Books, 1979).
