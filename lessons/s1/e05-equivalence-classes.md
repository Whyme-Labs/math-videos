# S1E05: The Master Tool: Equivalence Classes

> **Season / Act:** Season 1 ("What Is a Number?"), Act II: Repairing the Defects · **Target runtime:** 18–22 min ·
> **Prerequisites:** S1E04 (sets, ordered pairs); S1E03 (arithmetic in ℕ, cancellation) ·
> **Builds toward:** S1E06 (ℤ and ℚ), S1E08 (ℝ from Cauchy sequences), S1E17–S1E18 (quotient groups and rings), S2E05 (quotient spaces), S2E22–S2E23 (functions equal almost everywhere)

## Learning objectives
By the end of this lesson the viewer can:
1. Define a relation on a set as a set of ordered pairs, and test whether a given relation is reflexive, symmetric, and transitive.
2. Define equivalence relations, equivalence classes, and the quotient set $A/{\sim}$.
3. State and prove that the equivalence classes of an equivalence relation partition the set, and that every partition comes from exactly one equivalence relation.
4. Decide whether a function or operation on a set "passes to the quotient" (is **well-defined** on classes), and spot one that doesn't.
5. Recognize the quotient construction as the series' recurring tool for making new objects by declaring things equal.

## Cold open
Is one-half the same as two-quarters?

Of course it is, you say. Half a pizza is two quarters of a pizza. But look at them as *written*: "1 over 2" and "2 over 4." Different top, different bottom. If a fraction is a pair of whole numbers, these are two different pairs.

Here's the same puzzle in disguise. What time is it 15 hours after midnight? A 24-hour clock says 15:00. A 12-hour clock says 3. Is 15 the same as 3? On a clock, yes. On a number line, certainly not.

And again: you and a stranger share a birthday. Are you "the same"? In one sense, absolutely not. But for the purposes of a birthday party, you're interchangeable.

All three are the same move. We take things that are different, and *declare* them the same for some purpose. Mathematicians do this constantly, and if you do it carelessly, you get nonsense. Today we learn to do it properly. It turns out to be the single most reused tool in this entire series, and it's how we're about to build negative numbers, fractions, and eventually the real numbers themselves.

## The story

### 1. The naive attempt: "just say they're equal"

We'd like to say $\tfrac12 = \tfrac24$. If a fraction is literally a pair $(p, q)$, then $(1, 2) \ne (2, 4)$ by the definition of ordered pairs (↩ S1E04). Equality of pairs is too strict.

We could try to fix this by picking a "favorite" representative: always reduce to lowest terms. That works for fractions, but it doesn't generalize. Which hour is the "favorite" name for 3 o'clock: 3, 15, or 27? Which of two people sharing a birthday is the "real" one? We need a way to make new objects that doesn't depend on choosing favorites.

The trick is to stop asking which representative is right and treat the **whole group of equivalent things** as one new object. The fraction $\tfrac12$ will *be* the set $\lbrace (1,2), (2,4), (3,6), \dots\rbrace$. To do that safely, we first need the language of relations.

### 2. Relations, and the three properties

> **Definition (relation).** A **relation** on a set $A$ is a subset $R \subseteq A \times A$. We write $a \mathrel{R} b$ to mean $(a, b) \in R$.

Familiar examples on ℕ: $=$, $\le$, $<$, "divides," "differs by a multiple of 12." Outside mathematics: "has the same birthday as," "is a parent of," "is a friend of."

> **Definition (properties of a relation).** A relation $\sim$ on $A$ is
> - **reflexive** if $a \sim a$ for every $a \in A$;
> - **symmetric** if $a \sim b$ implies $b \sim a$;
> - **transitive** if $a \sim b$ and $b \sim c$ imply $a \sim c$.
>
> An **equivalence relation** is a relation with all three properties.

These are exactly the properties of "is the same as" that we need in order to treat related things as interchangeable. Here's how common relations score:

| Relation | Reflexive | Symmetric | Transitive | Equivalence? |
|---|---|---|---|---|
| $a = b$ on any set | yes | yes | yes | **yes** |
| same birthday (people) | yes | yes | yes | **yes** |
| $a - b$ divisible by 12 (on ℤ) | yes | yes | yes | **yes** |
| $a \le b$ (on ℕ) | yes | no | yes | no |
| $a < b$ (on ℕ) | no | no | yes | no |
| "is a friend of" | debatable | yes | no | no |
| $\lvert x - y \rvert < 1$ (on ℝ) | yes | yes | no | no |
| $a$ divides $b$ (on ℕ) | yes | no | yes | no |

The row $\lvert x - y\rvert < 1$ deserves a moment: "is close to" feels like a kind of sameness, but $0 \sim 0.6$ and $0.6 \sim 1.2$ while $0 \not\sim 1.2$. Small differences add up. This is why "approximately equal" can't be used to build new objects directly, and why ↪ S1E08 has to work harder to glue together sequences that "get close."

### 3. The construction: classes and the quotient

> **Definition (equivalence class, quotient set).** Let $\sim$ be an equivalence relation on $A$. The **equivalence class** of $a \in A$ is
> $$[a] = \lbrace x \in A : x \sim a \rbrace .$$
> Any element of $[a]$ is called a **representative** of the class. The **quotient set** is the set of all classes,
> $$A/{\sim} \;=\; \lbrace [a] : a \in A \rbrace,$$
> and the **quotient map** (or projection) is $\pi : A \to A/{\sim}$, $\pi(a) = [a]$.

The quotient map is the "blurring" step: it sends each point to the blob it belongs to. Each blob is now a **single point** of the new set $A/{\sim}$.

The magic is that two elements become *equal* in the quotient exactly when they were *related* before:

> **Lemma.** For an equivalence relation $\sim$ on $A$ and $a, b \in A$: $\;[a] = [b] \iff a \sim b$.

And the classes cut $A$ into non-overlapping pieces.

> **Definition (partition).** A **partition** of $A$ is a collection $\mathcal{P}$ of nonempty subsets of $A$ such that every element of $A$ lies in **exactly one** member of $\mathcal{P}$.

> **Theorem (classes form a partition).** If $\sim$ is an equivalence relation on $A$, then $A/{\sim}$ is a partition of $A$. Conversely, every partition $\mathcal{P}$ of $A$ arises in this way from exactly one equivalence relation, namely $a \sim b \iff a$ and $b$ lie in the same piece of $\mathcal{P}$.

*Proof.* First the lemma.
($\Leftarrow$) Suppose $a \sim b$. If $x \in [a]$, then $x \sim a$ and $a \sim b$, so $x \sim b$ by transitivity; hence $x \in [b]$. So $[a] \subseteq [b]$. By symmetry $b \sim a$, and the same argument gives $[b] \subseteq [a]$. So $[a] = [b]$.
($\Rightarrow$) Suppose $[a] = [b]$. By reflexivity $a \sim a$, so $a \in [a] = [b]$, which means $a \sim b$.

Now the partition.
- *Each class is nonempty:* $a \in [a]$ by reflexivity.
- *Every element is in some class:* $a \in [a]$.
- *No element is in two different classes:* suppose $x \in [a] \cap [b]$. Then $x \sim a$ and $x \sim b$. By symmetry $a \sim x$, and by transitivity $a \sim b$. By the lemma, $[a] = [b]$. So two classes are either **identical or disjoint**.

For the converse, given a partition $\mathcal P$, define $a \sim b$ iff $a$ and $b$ are in the same piece. Reflexivity and symmetry are immediate. For transitivity: if $a, b$ share a piece $P$ and $b, c$ share a piece $P'$, then $b \in P \cap P'$, so $P = P'$ (each element lies in exactly one piece), and $a, c$ share it. The classes of this relation are exactly the pieces of $\mathcal P$. Finally, an equivalence relation is determined by its classes (by the lemma, $a \sim b$ iff $a, b$ lie in the same class), so this is the only equivalence relation giving $\mathcal{P}$. ∎

So **equivalence relations and partitions are the same thing**, described two ways: one by saying which pairs are "the same," the other by drawing the blobs.

### 4. The hidden trap: well-definedness

Making new *objects* is half the job. We also want to *do things* with them, for example add fractions or add hours on a clock. The natural plan: to compute with classes, pick representatives, compute with those, and take the class of the answer. The danger is that **different representatives might give different answers.**

> **Definition (well-defined).** Let $\sim$ be an equivalence relation on $A$ and $f : A \to B$ a function. We say $f$ **passes to the quotient** (or **induces a well-defined function** on $A/{\sim}$) if
> $$a \sim a' \implies f(a) = f(a').$$
> Then $\bar f([a]) := f(a)$ is a genuine function $\bar f: A/{\sim} \to B$, and $\bar f \circ \pi = f$.

Similarly, a binary operation $\ast$ on $A$ passes to the quotient if $a \sim a'$ and $b \sim b'$ imply $a \ast b \sim a' \ast b'$; then $[a] \ast [b] := [a \ast b]$ is well-defined.

If the condition fails, the "definition" $\bar f([a]) = f(a)$ doesn't define anything: the same input $[a] = [a']$ would get two different outputs. Example 3 below shows a natural-looking operation on clock times that fails this test, and ↪ S1E06 shows a tempting "addition" of fractions that fails it too.

### 5. Payoff: a machine for making new objects

Put the pieces together and we have a general-purpose machine:

1. Start with a set $A$ of "raw descriptions" (pairs of numbers, times on a 24-hour clock, people).
2. Choose an equivalence relation $\sim$ that says when two descriptions should count as "the same."
3. Form $A/{\sim}$. Its elements are the new objects.
4. Define operations on the new objects through representatives, and **prove they're well-defined.**

The answer to the cold open: $\tfrac12$ and $\tfrac24$ are different *descriptions* of the same *fraction*. "The same" means "related by the equivalence relation $(p,q) \sim (r,s) \iff ps = qr$," and the fraction itself is the class. Equality in the new world is relatedness in the old one.

This is the second recurring thread of the series: **glue things together.** We'll use this machine to build ℤ and ℚ (↪ S1E06), ℝ (↪ S1E08), the integers mod $n$ and quotient groups (↪ S1E17), quotient rings including ℂ again (↪ S1E18), quotient vector spaces (↪ S2E05), and the space $L^1$, whose elements are classes of functions that agree "almost everywhere" (↪ S2E22–S2E23). Each time the visual will be the same: points blurring into blobs, and each blob becoming a single new point.

## Worked examples

### Example 1: clock arithmetic (congruence mod 12)
On ℕ, define $a \sim b$ iff $a$ and $b$ leave the same remainder when divided by 12. (Equivalently, once we have ℤ in ↪ S1E06: $12$ divides $a - b$. This is written $a \equiv b \pmod{12}$.)

**It's an equivalence relation.** Reflexive: $a$ has the same remainder as itself. Symmetric: "same remainder" is symmetric. Transitive: if $a, b$ have the same remainder and $b, c$ do, then $a, c$ do. (Any relation of the form "$f(a) = f(b)$" is an equivalence relation, for the same reasons.)

**The classes.** There are exactly 12, one per possible remainder:
$$[0] = \lbrace 0, 12, 24, \dots \rbrace,\ [1] = \lbrace 1, 13, 25, \dots \rbrace,\ \dots,\ [11] = \lbrace 11, 23, 35, \dots \rbrace .$$
For instance $15 = 1\cdot 12 + 3$ and $27 = 2 \cdot 12 + 3$, so $15 \sim 27 \sim 3$ and $[15] = [27] = [3]$.

**Addition passes to the quotient.** *Claim:* if $a \sim a'$ and $b \sim b'$ then $a + b \sim a' + b'$.
*Proof.* Write $a = 12k + r$, $a' = 12k' + r$, $b = 12m + s$, $b' = 12m' + s$, with the same remainders $r, s$. Then
$$a + b = 12(k + m) + (r + s), \qquad a' + b' = 12(k' + m') + (r + s).$$
Both leave the same remainder as $r + s$ on division by 12, so they leave the same remainder as each other. ∎

**Compute** "5 hours after 9 o'clock": $[9] + [5] = [14] = [2]$, since $14 = 1 \cdot 12 + 2$. Two o'clock.
**Check with other representatives:** $[9] = [21]$ and $[5] = [17]$; $21 + 17 = 38 = 3 \cdot 12 + 2$, so $[21 + 17] = [2]$. Same answer. ✓

### Example 2: classes of a finite relation, and counting partitions
Let $A = \lbrace a, b, c \rbrace$. How many equivalence relations does $A$ have? By the theorem, this equals the number of partitions of $A$. List them:
1. $\lbrace\lbrace a, b, c\rbrace\rbrace$ (everything is equivalent)
2. $\lbrace\lbrace a, b\rbrace, \lbrace c \rbrace\rbrace$
3. $\lbrace\lbrace a, c\rbrace, \lbrace b \rbrace\rbrace$
4. $\lbrace\lbrace b, c\rbrace, \lbrace a \rbrace\rbrace$
5. $\lbrace\lbrace a\rbrace, \lbrace b\rbrace, \lbrace c \rbrace\rbrace$ (only equality)

So there are **5** equivalence relations on a 3-element set.

**Write partition 2 as a relation**, i.e. as a set of ordered pairs: two elements are related iff they're in the same piece, so
$$R = \lbrace (a,a), (b,b), (c,c), (a,b), (b,a) \rbrace .$$
Check: reflexive (all three diagonal pairs present); symmetric ($(a,b)$ and $(b,a)$ both present); transitive (the only chains are $a \sim b \sim a$, giving $(a,a)$, present, and $b \sim a \sim b$, giving $(b,b)$, present). ✓ The quotient set is $A/R = \lbrace \lbrace a, b\rbrace, \lbrace c \rbrace \rbrace$: two new "points."

**A non-example:** $R' = \lbrace (a,a),(b,b),(c,c),(a,b),(b,a),(b,c),(c,b)\rbrace$ is reflexive and symmetric but not transitive: $a \mathrel{R'} b$ and $b \mathrel{R'} c$, but $(a, c) \notin R'$. Its "classes" would be $[a] = \lbrace a, b\rbrace$ and $[b] = \lbrace a, b, c\rbrace$, which overlap without being equal. That's exactly what transitivity prevents.

(The counts of partitions of sets of size $0, 1, 2, 3, 4, 5$ are $1, 1, 2, 5, 15, 52$, the **Bell numbers**; checked with Python.)

### Example 3: an operation that is *not* well-defined
On clock times (classes mod 12), try to define "two to the power":
$$\bar f([n]) := [2^n].$$
**Test it.** We know $[0] = [12]$. Compute with each representative:
- With $n = 0$: $2^0 = 1$, so $\bar f([0]) = [1]$.
- With $n = 12$: $2^{12} = 4096 = 341 \cdot 12 + 4$, so $\bar f([12]) = [4]$.

Since $[1] \ne [4]$, the same input gives two outputs. The "function" is **not well-defined**. (The condition $a \sim a' \Rightarrow f(a) \sim f(a')$ fails for $a = 0$, $a' = 12$.)

**Contrast** with squaring, $\bar g([n]) := [n^2]$, which *is* well-defined: if $n' = n + 12k$ then $n'^2 = n^2 + 24nk + 144k^2 = n^2 + 12(2nk + 12k^2)$, so $n'^2 \sim n^2$. The squares mod 12 of $0, 1, \dots, 11$ are $0, 1, 4, 9, 4, 1, 0, 1, 4, 9, 4, 1$.

**Moral.** Whether an operation survives the gluing has to be *checked*. Exponents and bases behave differently under the same relation.

### Example 4: fractions of positive whole numbers
Let $A = \lbrace (p, q) : p, q \in \mathbb{N},\ p, q \ge 1 \rbrace$ and define
$$(p, q) \sim (r, s) \iff ps = qr .$$
(This is "cross-multiplication." Using only positive whole numbers keeps us inside ℕ, which is all we've built so far.)

**Reflexive:** $pq = qp$ by commutativity of × (↩ S1E03). ✓
**Symmetric:** if $ps = qr$, then $rq = sp$ (the same equation, read backward, using commutativity). ✓
**Transitive:** suppose $(p,q) \sim (r,s)$ and $(r,s) \sim (t,u)$, i.e. $ps = qr$ and $ru = st$. Multiply the first equation by $u$:
$$psu = qru = q(ru) = q(st) = s(qt).$$
So $s \cdot (pu) = s \cdot (qt)$. Since $s \ge 1$, we can cancel $s$ (cancellation for multiplication by a nonzero natural number, provable by induction like ↩ S1E03's Theorem 3). So $pu = qt$, i.e. $(p,q) \sim (t,u)$. ✓

**Classes.** $[(1,2)] = \lbrace (1,2), (2,4), (3,6), \dots \rbrace$. Check one member: $(1, 2) \sim (3, 6)$ since $1 \cdot 6 = 6 = 2 \cdot 3$. ✓ And $(1,2) \not\sim (2,3)$ since $1 \cdot 3 = 3 \ne 4 = 2 \cdot 2$.

Notice where we needed $s \ne 0$: in the transitivity step. If we allowed $(0, 0)$, then every pair would be related to it ($p \cdot 0 = 0 \cdot r$), and transitivity would glue *all* fractions into one blob. That's the real reason "you can't divide by zero" when we build ℚ in ↪ S1E06.

## Visual and animation notes
1. **Cold open:** "1/2" and "2/4" side by side; a pizza cut in half and another cut in quarters, the halves sliding over the quarters. Then a 24-hour clock showing 15:00 morphs into a 12-hour clock showing 3.
2. **Relations as grids:** the set $A \times A$ drawn as a square grid of dots; a relation lights up a pattern. Reflexive = the diagonal lights up; symmetric = the pattern is mirror-symmetric across the diagonal; transitive is demonstrated with a two-step arrow path forcing a third dot to light.
3. **"Close to" fails transitivity:** three dots on a line at 0, 0.6, 1.2 with links of length < 1 between neighbors, and a red broken link from 0 to 1.2.
4. **Blobs** (key visual, recurring motif **Equivalence class / quotient**): the natural numbers scattered on screen, colored by remainder mod 12. Points of the same color drift together and blur into 12 glowing blobs, which then shrink to 12 points arranged on a clock face. *Reuse this exact animation every time a quotient appears in any season.*
5. **The partition theorem:** blobs that try to overlap bounce apart; a caption reads "identical or disjoint."
6. **Well-definedness test:** a machine takes a blob, grabs two different representatives, runs both through $f$, and compares outputs. For squaring, the two outputs land in the same blob (green light). For $2^n$, they land in different blobs (red light, alarm).
7. **Fractions preview:** the grid of positive pairs $(p, q)$; the class of $(1, 2)$ lights up as a ray through the origin. Brief foreshadowing of S1E06's key visual.
8. **Zoom out:** a montage of future quotients with their callback stamps: ℤ, ℚ (S1E06), ℝ (S1E08), ℤ/nℤ (S1E17), ℂ = ℝ[x]/(x²+1) (S1E18), V/W (S2E05).
9. **Teaser:** "3 − 5 = ?" in ℕ, followed by a pair "(3, 5)" glowing.

## Common misconceptions
- **Misconception:** "An equivalence class is one of its elements." **Reality:** It's the whole set of related elements. Any element can *represent* it, but none of them *is* it. That's what frees us from choosing favorites.
- **Misconception:** "Reflexivity follows from symmetry and transitivity: $a \sim b$ and $b \sim a$ give $a \sim a$." **Reality:** Only if $a$ is related to *something*. On $A = \lbrace a, b\rbrace$, the relation $\lbrace (b, b) \rbrace$ is symmetric and transitive but not reflexive ($a \not\sim a$).
- **Misconception:** "If I define an operation by a formula on representatives, it automatically works on classes." **Reality:** Every such definition needs a well-definedness check (Example 3).
- **Misconception:** "'Approximately equal' is an equivalence relation." **Reality:** It isn't transitive (§2). Building ℝ requires a cleverer relation (↪ S1E08).
- **Misconception:** "Quotients throw information away, so they make things simpler and less interesting." **Reality:** They *create* new objects, often with new properties. The 12 clock classes form a finite arithmetic with no analogue in ℕ, and ℚ (a quotient) can divide where ℤ can't.

## Exercises
- **Warm-up (computational):** List the classes of the relation "same remainder mod 4" on $\lbrace 0, 1, \dots, 11\rbrace$. Compute $[3] + [3]$ and $[3] \cdot [3]$ mod 4, and check each with a second pair of representatives.
- **Core (conceptual):** On the set of all lines in the plane, let $\ell \sim m$ mean "$\ell$ is parallel to $m$ or equal to $m$." Show that this is an equivalence relation. What is a natural name for an equivalence class? (Frege used exactly this example.) Then: is "is perpendicular to" an equivalence relation?
- **Stretch (proof):** Let $f : A \to B$ be any function, and define $a \sim a'$ iff $f(a) = f(a')$. (a) Show this is an equivalence relation. (b) Show that $\bar f([a]) = f(a)$ is a well-defined, **injective** function $A/{\sim} \to B$, whose image equals the image of $f$. (This is the set-level version of the First Isomorphism Theorem, ↪ S1E17.)

<details><summary>Hints and answers</summary>

- **Warm-up:** $[0] = \lbrace 0, 4, 8\rbrace$, $[1] = \lbrace 1, 5, 9\rbrace$, $[2] = \lbrace 2, 6, 10\rbrace$, $[3] = \lbrace 3, 7, 11\rbrace$. $[3] + [3] = [6] = [2]$; check with $7 + 11 = 18 = 4 \cdot 4 + 2$. $[3]\cdot[3] = [9] = [1]$; check with $7 \cdot 11 = 77 = 19 \cdot 4 + 1$.
- **Core:** Reflexive (a line equals itself), symmetric, transitive (two lines parallel to a third are parallel to each other, or equal). A class is a **direction** (or "slope," including vertical). Frege used this "definition by abstraction" in *Die Grundlagen der Arithmetik* (1884) as a model for defining numbers. Perpendicularity is not reflexive (no line is perpendicular to itself) and not transitive ($\ell \perp m$ and $m \perp n$ give $\ell \parallel n$).
- **Stretch:** (a) Each property is inherited from equality in $B$. (b) Well-defined: $a \sim a'$ means $f(a) = f(a')$, which is exactly what's needed. Injective: if $\bar f([a]) = \bar f([a'])$ then $f(a) = f(a')$, so $a \sim a'$, so $[a] = [a']$. Same image: clear.

</details>

## Historical note
Quotient constructions were used long before they had a name. Carl Friedrich Gauss's *Disquisitiones Arithmeticae* (1801) opens by introducing **congruence**: $a \equiv b \pmod m$ when $m$ divides $a - b$, with the notation $\equiv$ that we still use. Gauss computed with congruence classes as if they were numbers, which is exactly arithmetic in a quotient.

In *Die Grundlagen der Arithmetik* (1884), Gottlob Frege studied what is now called **definition by abstraction**: since "is parallel to" behaves like an equality, one can define "the direction of a line" as the class of all lines parallel to it. Frege proposed defining numbers the same way, with "can be matched one-to-one with" in place of "parallel to" (↪ S1E14). Richard Dedekind's work in algebra and number theory in the second half of the nineteenth century treated classes of objects as single objects of a new kind, an approach later central to modern algebra. By the early twentieth century, equivalence relations and quotient sets were standard tools, and the construction of ℤ and ℚ by equivalence classes of pairs became the textbook approach (↪ S1E06).

## Connections
- **Callbacks:** ↩ S1E04 (sets, ordered pairs, Cartesian products); ↩ S1E03 (commutativity and cancellation, used in Example 4)
- **Sets up:**
  - ↪ S1E06: ℤ as classes of pairs of naturals, ℚ as classes of pairs of integers; the well-definedness trap
  - ↪ S1E08: ℝ as classes of Cauchy sequences
  - ↪ S1E11: "can be matched one-to-one with" is an equivalence relation on sets; its classes are sizes
  - ↪ S1E14: Frege's definition by abstraction, applied to numbers
  - ↪ S1E17: cosets, quotient groups, ℤ/nℤ, and the First Isomorphism Theorem
  - ↪ S1E18: quotient rings; ℝ[x]/(x² + 1) ≅ ℂ
  - ↪ S2E05: quotient vector spaces V/W
  - ↪ S2E22, S2E23: functions equal almost everywhere; $L^1$ as a quotient
- **Side quests:** Projective geometry (after S2E05): points of the projective plane are equivalence classes of nonzero vectors (lines through the origin).

## References
- **Primary / historical**
  - Carl Friedrich Gauss, *Disquisitiones Arithmeticae* (1801), Section I (congruences). English translation by A. A. Clarke (1966).
  - Gottlob Frege, *Die Grundlagen der Arithmetik* (1884), §§62–69, on defining directions and numbers by abstraction. English translation *The Foundations of Arithmetic* by J. L. Austin (1950).
- **Textbooks**
  - Paul R. Halmos, *Naive Set Theory* (1960), §7 ("Relations"), which covers equivalence relations and partitions.
  - Herbert B. Enderton, *Elements of Set Theory* (1977), Chapter 3 ("Relations and Functions"), including equivalence relations and the conditions for functions to be compatible with them.
  - Charles C. Pinter, *A Book of Abstract Algebra* (2nd ed., 1990; Dover reprint 2010), the chapter on partitions and equivalence relations.
  - Daniel J. Velleman, *How to Prove It: A Structured Approach* (2nd ed., 2006), Chapter 4 ("Relations").
- **Accessible**
  - Stanford Encyclopedia of Philosophy, entry "Frege's Theorem and Foundations for Arithmetic," for definitions by abstraction and Hume's principle.
