# S1E14: Russell's Dream: Is Mathematics Just Logic?

> **Season / Act:** Season 1, Act III (Infinity and the Foundations Crisis) · **Target runtime:** 20–25 min ·
> **Prerequisites:** S1E02 (Peano axioms), S1E04 (sets, Russell's paradox in naive form, ZF, von Neumann and Zermelo numerals), S1E11 (one-to-one matching), S1E12 (the diagonal argument), S1E13 (Burali-Forti's paradox) ·
> **Builds toward:** S1E15 (Gödel's incompleteness ends the full ambitions of Principia and Hilbert's program), S1E20 (the season's answer to "what is a number?"), side quests *Constructive mathematics* and *Proof assistants*

## Learning objectives
By the end of this lesson the viewer can:
1. State the logicist thesis and the Frege–Russell definition of number ("2 is the class of all pairs"), and compare it with the von Neumann and Zermelo answers from S1E04.
2. Derive Russell's paradox step by step from unrestricted comprehension, and explain why it destroyed Frege's system.
3. Explain the theory of types and the vicious circle principle, and why Principia Mathematica needed the axioms of infinity and reducibility.
4. Describe the three schools of the foundations crisis (logicism, formalism, intuitionism), and connect Russell's types to modern type systems, the Curry–Howard correspondence, and proof assistants.

## Cold open
*Narrator, over a desk in Jena, a stack of proofs, and a letter with an English stamp:*

June 1902. Jena, Germany.

Gottlob Frege is fifty-three. For more than twenty years he has been building one enormous machine: a system of pure logic from which, he believes, all of arithmetic can be derived. No intuition. No special assumptions about numbers. Just logic. The first volume of his *Basic Laws of Arithmetic* is already in print, and the second is at the printer.

A letter arrives from England. It's from a young philosopher named Bertrand Russell, thirty years old, who admires Frege's work enormously. The letter is polite, even warm. And in a few lines, it explains that Frege's system contradicts itself.

The problem is a single set: the set of all sets that are not members of themselves. Is it a member of itself? If it is, it isn't. If it isn't, it is.

Frege's reply, written within a week, is one of the most honest letters in the history of science. He doesn't deny it. He writes that the discovery has shaken the very ground on which he meant to build arithmetic. In a phrase that is often quoted from the English translation: *arithmetic totters.*

Today: what Frege and Russell were trying to do, how one sentence broke it, how Russell spent the next decade rebuilding it, and how his repair ended up inside every modern programming language.

## The story

### 1. The dream: logicism

In ↩ S1E02 we pinned down ℕ with the Peano axioms, and in ↩ S1E04 we built numbers out of sets. Both approaches *assume* something: axioms about numbers, or axioms about sets. Frege wanted to assume less.

> **Logicism** is the thesis that mathematics (at least arithmetic) is part of logic: every mathematical concept can be defined in purely logical terms, and every mathematical truth can be proved from purely logical laws, with no specifically mathematical axioms.

If logicism were true, the truths of arithmetic would be as certain as "if all A are B, and x is an A, then x is a B." Mathematics would need no intuition of space or time (Kant's view) and no empirical generalization (Mill's view). It would be analytic: true by meaning alone.

Frege laid out the logic in *Begriffsschrift* (1879), the philosophy and the definitions in *Die Grundlagen der Arithmetik* (1884), and the formal derivations in *Grundgesetze der Arithmetik* (volume 1, 1893; volume 2, 1903). Russell, independently drawn to the same idea around 1900, announced it in *The Principles of Mathematics* (1903) and then, with Alfred North Whitehead, tried to carry it out in *Principia Mathematica* (1910–13).

### 2. A third answer to "what is 2?"

How do you know there are as many cups as saucers on a table, without counting? Put one cup on each saucer. If nothing is left over on either side, there are equally many. (Frege's own illustration was a waiter laying out knives and plates.) That is the matching idea of ↩ S1E11, and Frege made it the *definition* of number.

> **Definition (equinumerous concepts).** Concepts $F$ and $G$ are **equinumerous** if there is a one-to-one correspondence between the objects falling under $F$ and those falling under $G$.

> **Hume's principle.** The number of $F$s equals the number of $G$s if and only if $F$ and $G$ are equinumerous.

(Frege quoted a version of this from David Hume; the name "Hume's principle" was popularized much later, in the 1980s.) Hume's principle tells us *when* two numbers are equal, but not *what* a number is. Frege's answer, also reached by Russell:

> **Definition (Frege–Russell number).** The number of $F$s is the class of all concepts (Russell: all classes) equinumerous with $F$. In particular,
> - **0** is the number of the concept "not identical with itself" (nothing falls under it, so 0 is the class of all empty classes, i.e. the class whose only member is the empty class);
> - **1** is the class of all one-element classes; **2** is the class of all pairs; **3** is the class of all triples;
> - $n$ is **followed by** $m$ if there is a concept $F$ and an object $x$ falling under $F$ such that the number of $F$s is $m$ and the number of "$F$ but not $x$" is $n$.
> - The **natural numbers** are the objects that share every property that 0 has and that is passed from each number to its successor (this definition *builds in* induction).

So now we have three answers to "what is 2?":

| Who | 2 is | Built by |
|---|---|---|
| von Neumann (↩ S1E04) | $\{\varnothing, \{\varnothing\}\}$ | each number is the set of its predecessors |
| Zermelo (↩ S1E04) | $\{\{\varnothing\}\}$ | each number is the singleton of its predecessor |
| Frege–Russell | the class of *all* two-element classes | a number is a class of matchable collections |

The Frege–Russell answer is the most philosophically attractive of the three: it says what all pairs have *in common*. The equivalence classes of ↩ S1E05 are in the background: "number" is the blob you get by gluing together all equinumerous collections. But each of these classes is enormous: the class of all pairs contains pairs of anything at all. That enormity is where the trouble starts.

### 3. The crack: unrestricted comprehension

Frege's system had a rule that seems like plain logic: every concept has an **extension**, the class of things falling under it. In modern terms this is

> **Unrestricted comprehension.** For every property $P(x)$, there is a set $\{x : P(x)\}$ whose members are exactly the $x$ with $P(x)$.

(In Frege's system this came from his Basic Law V, which says that two concepts have the same extension if and only if exactly the same objects fall under them.) Frege needed it: the number 2 is the extension of a concept ("is equinumerous with some pair"), so without extensions there would be no numbers.

> **Theorem (Russell, 1901).** Unrestricted comprehension is inconsistent.

**Proof.** Apply comprehension to the property $P(x)$: "$x \notin x$." It gives a set
$$R = \{\, x : x \notin x \,\},$$
with the defining property that for every $y$, $y \in R \iff y \notin y$. Now take $y = R$:
$$R \in R \iff R \notin R.$$
A statement equivalent to its own negation yields a contradiction: if $R \in R$, then $R \notin R$; and if $R \notin R$, then $R \in R$. Either way both hold. ∎

As ↩ S1E12 showed, this is exactly Cantor's diagonal argument with "the set of everything" in the role of $S$ and $f(x) = x$. Russell found it by thinking about Cantor's theorem. The diagonal trick does not care whether you are listing real numbers, subsets, or sets themselves.

Russell soon collected a whole family of related paradoxes. Burali-Forti's paradox of the largest ordinal (↩ S1E13) is one. Another, which Russell credited to G. G. Berry, a librarian at the Bodleian Library in Oxford, is about definitions:

> **Berry's paradox.** Consider "the least integer not nameable in fewer than nineteen syllables." There are only finitely many phrases with fewer than nineteen syllables, so only finitely many integers are nameable that way, and some least integer isn't. But the quoted phrase names it, and the phrase has only eighteen syllables.

(A popular modern variant uses "the smallest number not definable in under sixty letters.") Berry's paradox is a cousin of ↩ S1E12's "most numbers can't be named": it shows that "nameable" cannot be treated as an ordinary well-defined property within the same language that does the naming.

### 4. Russell's repair: the theory of types

Russell diagnosed all these paradoxes as having a common feature: something is defined in terms of a collection that includes the very thing being defined. $R$ is defined by quantifying over *all* sets, including $R$. Berry's number is defined by quantifying over *all* definitions, including the one doing the defining.

> **The vicious circle principle.** No totality can contain members that are defined only in terms of that totality. In Russell's 1908 formulation: "Whatever involves all of a collection must not be one of the collection."

The theory of types enforces this by giving every object a level.

> **Simple theory of types.** Objects are sorted into **types**: type 0 consists of individuals; type 1 of classes of individuals; type 2 of classes of type-1 classes; and so on. The formula $x \in y$ is *well-formed* only when the type of $y$ is exactly one more than the type of $x$.

In this language, "$x \in x$" is not false; it is not even a sentence. It is like asking whether the number 7 is green. So $R = \{x : x \notin x\}$ cannot be written down, and the paradox never starts.

The price:
- **Numbers are duplicated at every level.** "2" at type 2 is the class of all pairs of individuals; "2" at type 3 is the class of all pairs of type-1 classes, and so on. Russell called the convention of writing them all the same way *typical ambiguity*.
- **The Axiom of Infinity.** Since numbers are built from classes of individuals, there are only as many distinct numbers as the stock of individuals allows. If there were only finitely many individuals, distinct numbers would collapse into each other (Example 3). So *Principia* has to assume there are infinitely many individuals. That is a claim about how big the world is, not a law of logic.
- **The Axiom of Reducibility.** Russell's actual system was the *ramified* theory of types, which also split each type into **orders** according to how a property is defined (whether its definition quantifies over properties of the same type). This blocks Berry-style paradoxes, but it also blocks ordinary analysis. The least upper bound of a set of reals (↩ S1E08: the union of a set of cuts) is defined by quantifying over a collection of reals, so it lands at a higher order than the reals it bounds, and completeness breaks. To recover classical mathematics, Russell added the axiom of reducibility: every property is equivalent to one of the lowest admissible order. Critics, starting soon after publication, objected that this axiom had no claim to be pure logic. Frank Ramsey later (1926) argued that most of the ramification could be dropped, leaving essentially the simple theory of types.

### 5. *Principia Mathematica*

*Principia Mathematica*, by Alfred North Whitehead and Bertrand Russell, appeared in three volumes in 1910, 1912, and 1913. It derives a large part of arithmetic and the beginnings of set theory and real analysis, in an exhaustive symbolic notation, from a small stock of logical primitives plus the axioms above.

Its most famous moment is the long road to $1 + 1 = 2$. Hundreds of pages into volume 1, proposition ∗54.43 shows, in modern notation:

$$\alpha, \beta \in 1 \;\Rightarrow\; \big(\alpha \cap \beta = \varnothing \iff \alpha \cup \beta \in 2\big):$$

if $\alpha$ and $\beta$ are one-element classes, they are disjoint exactly when their union is a two-element class. The authors remark that once arithmetical addition has been defined, $1 + 1 = 2$ will follow. That definition comes in volume 2, and the arithmetic statement is proved at ∗110.643, followed by the authors' dry comment: "The above proposition is occasionally useful."

The joke is affectionate, but the point is serious. Every step from logic to arithmetic was explicit and checkable. Nothing was hidden in "it is obvious that." That was the dream: mathematics so explicit that its correctness could be verified mechanically.

The weak points were the ones in Section 4. Infinity and reducibility did not look like logic. Logicism had shown that mathematics could be reduced to logic *plus* some substantial assumptions about what exists.

### 6. Three schools, and what came next

The paradoxes set off what is called the **foundations crisis** of the early 20th century, and three main programs emerged:

| School | Leading figures | Mathematics is… | Response to the paradoxes |
|---|---|---|---|
| **Logicism** | Frege, Russell, Whitehead | part of logic | restrict logic (types) |
| **Formalism** | David Hilbert | the study of formal systems of symbols and rules | formalize everything, then prove the formal system is *consistent* by safe, finitary reasoning (Hilbert's program, 1920s) |
| **Intuitionism** | L. E. J. Brouwer | a mental construction | only what can be constructed exists; reject the law of excluded middle ($P$ or not $P$) for infinite domains |

Hilbert refused to give up Cantor's infinities: "No one shall expel us from the paradise that Cantor has created" (from his 1926 paper "Über das Unendliche"). Brouwer argued that a proof of existence must exhibit the object, so "either the decimal expansion of π contains a run of a hundred 7s or it doesn't" is not a valid premise until one or the other is shown. The quarrel between them was personal as well as philosophical.

Meanwhile, working mathematicians largely adopted a fourth route: Zermelo's 1908 axioms for sets (↩ S1E04), later refined into ZF and ZFC, which avoid the paradoxes by allowing a property to carve out a subset *of a set already given* (separation) rather than forming $\{x : P(x)\}$ from everything.

### 7. Extrapolation: Russell's types are alive and well

Russell's types were designed to stop sets from containing themselves. Decades later, the same idea became a central tool of computer science.

- **Type systems.** When a programming language refuses to add a number to a list of strings, it is doing what Russell's hierarchy does: rejecting an ill-typed expression before it can cause trouble. Alonzo Church's simply typed λ-calculus (1940) is a direct descendant of the simple theory of types.
- **The Curry–Howard correspondence ("proofs are programs").** Haskell Curry and, later, William Howard observed that propositions behave like types and proofs behave like programs of those types. A proof of "$A$ implies $B$" is a function turning evidence for $A$ into evidence for $B$ (Example 4).
- **Proof assistants.** Systems like Lean, Coq (recently renamed Rocq), Isabelle, and HOL Light are built on type theories. Mathematicians write proofs that a computer checks line by line, Principia-style but with the computer doing the drudgery. Landmark formalizations include the Four Colour Theorem (Coq, Gonthier, 2005), the Feit–Thompson odd order theorem (Coq, 2012), and the Kepler conjecture (the Flyspeck project, 2014). In Lean, $1 + 1 = 2$ for natural numbers is checked by computation in one line.

Russell's dream of fully explicit mathematics was, in this sense, realized. What was *not* realized was the stronger dream: one system of rules capturing all mathematical truth. That is where ↪ S1E15 begins.

## Worked examples

### Example 1: Frege's numbers at work: 0 ≠ 1, without assuming it

Using only Hume's principle and Frege's definitions:

- **0** is the number of the concept $E(x)$: "$x \neq x$." Nothing falls under $E$ (everything is identical with itself).
- **1** is the number of the concept $U(x)$: "$x = 0$." Exactly one object falls under $U$, namely the number 0 itself (which exists, as just defined).

**Claim:** $0 \neq 1$.

**Proof.** By Hume's principle, $0 = 1$ would mean $E$ and $U$ are equinumerous: a one-to-one correspondence between the objects falling under $E$ (none) and the objects falling under $U$ (just 0). But 0 falls under $U$ and would need a partner under $E$, and there is none. So no such correspondence exists, and $0 \neq 1$. ∎

**Continuing:** 2 is the number of the concept "$x = 0$ or $x = 1$," which has exactly two objects falling under it, since $0 \ne 1$. Each new number is built from the previously built numbers as objects. This "bootstrapping" is how Frege generates infinitely many numbers *without* an axiom of infinity, because numbers themselves are the objects being counted. (Russell's type theory can't do this: a number of type $n + 1$ cannot be counted among the type-$n$ objects. That is exactly why *Principia* needs an Axiom of Infinity, as Example 3 shows.)

**A modern footnote.** In the 1980s Crispin Wright, George Boolos, and others observed that Frege's derivations of the Peano axioms really need only Hume's principle (plus second-order logic), not the inconsistent Basic Law V. This result is now called **Frege's theorem**, and the program of building on it is called **neo-logicism**. Whether Hume's principle counts as "logic" is still debated.

### Example 2: Russell's paradox as a formal derivation

Work in a system with unrestricted comprehension: for any formula $\varphi(x)$, the axiom $\exists y\, \forall x\, (x \in y \leftrightarrow \varphi(x))$.

1. Take $\varphi(x)$ to be $x \notin x$. Comprehension gives a $y$ with $\forall x\,(x \in y \leftrightarrow x \notin x)$. Call it $R$.
2. Instantiate the universal statement at $x = R$: $\; R \in R \leftrightarrow R \notin R$.
3. Suppose $R \in R$. By step 2, $R \notin R$. Contradiction, so $R \notin R$.
4. From $R \notin R$ and step 2 (right to left), $R \in R$.
5. Steps 3 and 4 give $R \in R$ and $R \notin R$. The system is inconsistent, and by "from a contradiction, anything follows," it proves every statement, including $0 = 1$.

**How each repair blocks it:**
- *Types:* step 1 fails, because "$x \notin x$" is not a well-formed formula.
- *ZF separation:* comprehension only gives $\{x \in A : x \notin x\}$ for a set $A$ already in hand. Running steps 2–5 with this set $R_A$ shows $R_A \notin A$, not a contradiction. Applying this to every set $A$ proves that **no set contains every set**. The paradox has turned into a theorem.

### Example 3: Why types need an Axiom of Infinity

Imagine a universe with exactly **3 individuals**, $a, b, c$, and build numbers in Russell's way at type 2: the number $n$ is the class of all $n$-element classes of individuals.

Count the $n$-element classes of $\{a, b, c\}$, which is $\binom{3}{n}$:

| $n$ | $n$-element classes of individuals | how many |
|---|---|---|
| 0 | $\varnothing$ | 1 |
| 1 | $\{a\}, \{b\}, \{c\}$ | 3 |
| 2 | $\{a,b\}, \{a,c\}, \{b,c\}$ | 3 |
| 3 | $\{a,b,c\}$ | 1 |
| 4 | none | 0 |
| 5 | none | 0 |

So at this type, the "number" 4 is the empty class, and so is the "number" 5. Therefore $4 = 5$, even though $4 \neq 5$ should be a theorem of arithmetic. In Peano's terms (↩ S1E02), the successor function stops being injective: $S(3) = 4 = 5 = S(4)$ would give $3 = 4$ if injectivity held, so injectivity must fail.

Since no amount of pure logic can tell us how many individuals there are, *Principia* must either assume infinitely many individuals (the Axiom of Infinity) or carry that assumption as a hypothesis in every theorem that needs it. Russell discusses exactly this point in *Introduction to Mathematical Philosophy* (1919), in the chapter on the axiom of infinity and logical types.

### Example 4: A proof that is a program

**Proposition:** for any propositions $A$ and $B$, $A \to (B \to A)$. ("If $A$ is true, then $B$ implies $A$.")

**Proof, informally:** assume $A$. Now assume $B$. We already have $A$. So $B \to A$, and therefore $A \to (B \to A)$.

**The same proof, as a program:** a function that takes evidence $a$ for $A$ and returns a function that takes evidence $b$ for $B$ and returns $a$. In λ-notation: $\lambda a.\, \lambda b.\, a$. Under Curry–Howard, the *type* of this program is $A \to (B \to A)$: the proposition.

In Lean 4:
```lean
-- A proof of A → (B → A) is literally a function.
theorem const_intro (A B : Prop) : A → B → A :=
  fun a _ => a

-- A proof that A ∧ B implies B ∧ A swaps the components of a pair.
theorem and_swap (A B : Prop) : A ∧ B → B ∧ A :=
  fun ⟨a, b⟩ => ⟨b, a⟩

-- Principia's famous result, checked by computation on Nat.
example : 1 + 1 = 2 := rfl
```
In the last line, `rfl` ("reflexivity") tells Lean to compute both sides; since the natural numbers are defined Peano-style (↩ S1E02) with recursive addition (↩ S1E03), $1 + 1$ unfolds to $2$. Lean's type checker plays the role that Russell's types played: an ill-typed proof, like an ill-typed set, is rejected before it can do harm.

## Visual and animation notes
1. **Cold open:** a desk in lamplight; printed proof sheets of the *Grundgesetze*; an envelope from England. The letter's key sentence glows; a crack runs across the stack of sheets. Frege's reply is shown being written (paraphrase on screen; do not show a fabricated handwritten quotation).
2. **Three answers to "what is 2?":** three panels. Von Neumann's nested boxes (reuse S1E04), Zermelo's chain of singletons, and the Frege–Russell blob: every pair in the universe (two shoes, two eyes, two moons of Mars, $\{\varnothing, \{\varnothing\}\}$) blurring into one glowing class (equivalence-class motif from S1E05).
3. **Cups and saucers:** cups drop onto saucers one by one; none left over. Caption: Hume's principle. Thread-and-slide bijection motif from S1E11.
4. **Russell's paradox:** a giant set-bubble labeled $R$ sweeps up every bubble that does not contain itself, then turns to look at itself; the bubble flickers in and out of its own interior and pops. Brief callback overlay of the S1E12 diagonal table, with the diagonal lighting up and flipping.
5. **Key visual, the tower of types:** horizontal floors labeled "individuals," "classes of individuals," "classes of classes," … . Membership arrows only go up exactly one floor. An arrow tries to loop from a class back to its own floor; a barrier slams down ("not well-formed").
6. **Example 3:** three individuals at the bottom floor; the next floors fill with their classes; the "4" and "5" bins at the top are both empty and merge into one, with a warning light: "successor not injective."
7. **Principia:** a camera moves past a long shelf of dense symbolic pages; a counter of propositions ticks; stop at ∗54.43, then jump to volume 2 and ∗110.643 with the line "occasionally useful" fading in.
8. **Three schools:** a triangle with Frege/Russell, Hilbert, Brouwer at the corners, each with a one-line motto. Center: "consistency?" with a question mark for S1E15.
9. **Extrapolation:** the tower of types morphs into a type-checker's error message, then into a Lean editor window with the three short proofs above turning green as they are checked.
10. **End card:** Russell's quote over a slow fade of the tower of levels.

## Common misconceptions
- **Misconception:** "Russell's paradox shows that set theory is inconsistent." **Reality:** it shows that *unrestricted comprehension* is inconsistent. ZFC and type theories avoid it, and no contradiction is known in either.
- **Misconception:** "Principia took hundreds of pages to prove something trivial, so it was a failure." **Reality:** the pages before ∗54.43 build logic, classes, relations, and cardinal number from scratch; $1 + 1 = 2$ falls out along the way. The project's limits were the non-logical axioms and, later, Gödel's theorems, not its length.
- **Misconception:** "Logicism was simply refuted." **Reality:** its strongest form (all of mathematics from pure logic, in one complete system) did fail. But it gave modern logic its shape, Frege's theorem revived a version of it (neo-logicism), and Principia's explicitness lives on in proof assistants.
- **Misconception:** "The theory of types forbids self-reference entirely." **Reality:** it forbids a class from being a member of itself, or a property from being applied to itself. Self-reference can still be achieved indirectly by coding, which is exactly what Gödel does in S1E15.
- **Misconception:** "Frege's definition makes 2 a specific pair." **Reality:** 2 is the class of *all* pairs; each pair is a member of 2, not 2 itself.
- **Misconception:** "Intuitionists think the law of excluded middle is false." **Reality:** they decline to assert it in general, because asserting "$P$ or not $P$" requires a method for deciding which. They never assert that it fails for a particular $P$, which would itself be contradictory.

## Exercises
- **Warm-up (computational):** In a universe with exactly 4 individuals, list the sizes of the classes "number $n$ at type 2" for $n = 0, 1, \ldots, 6$ (how many $n$-element classes of individuals there are). Which numbers coincide? Then count the syllables in Berry's phrase "the least integer not nameable in fewer than nineteen syllables."
- **Core (conceptual):** Explain why the set $R_A = \{x \in A : x \notin x\}$ is harmless in ZF, and use it to prove that there is no set of all sets. How is this the same argument as Cantor's theorem from S1E12?
- **Stretch (exploration):** Write proofs (in words, then as λ-terms or in Lean if you have it) of (a) $(A \to B) \to ((B \to C) \to (A \to C))$ and (b) $A \wedge B \to A$. Then explain why intuitionistic logic, which matches Curry–Howard, has no λ-term proving $A \vee \neg A$ for arbitrary $A$.

<details><summary>Hints and answers</summary>

- **Warm-up:** the counts are $\binom{4}{n}$: $1, 4, 6, 4, 1, 0, 0$ for $n = 0, \ldots, 6$. The numbers 5, 6, 7, … are all the empty class, so they coincide. Berry's phrase: the(1) least(2) in-te-ger(3–5) not(6) name-a-ble(7–9) in(10) few-er(11–12) than(13) nine-teen(14–15) syl-la-bles(16–18): eighteen syllables, fewer than nineteen.
- **Core:** if $R_A \in R_A$, then (being in $R_A$) $R_A \notin R_A$; so $R_A \notin R_A$. If also $R_A \in A$, then $R_A$ satisfies the condition and $R_A \in R_A$: contradiction. So $R_A \notin A$. Hence for every set $A$ there is a set not in $A$, and no set contains all sets. In Cantor's terms: the "diagonal set" escapes every attempt to collect everything.
- **Stretch:** (a) $\lambda f.\, \lambda g.\, \lambda a.\, g(f(a))$, i.e. composition; (b) $\lambda p.\, \pi_1(p)$, the first projection. A λ-term of type $A \vee \neg A$ would have to *decide*, for an arbitrary proposition, which side holds and produce evidence for it, which no uniform program can do. (In Lean, `Classical.em` provides excluded middle as an axiom, not as a computation.)

</details>

## Historical note
Gottlob Frege (1848–1925) spent his career at the University of Jena. His *Begriffsschrift* (1879) introduced the essentials of modern quantified logic. *Die Grundlagen der Arithmetik* (1884) criticized earlier accounts of number and gave the definitions of Section 2 informally. The *Grundgesetze der Arithmetik* (vol. 1, 1893; vol. 2, 1903) carried them out formally, resting on Basic Law V.

Bertrand Russell (1872–1970) found his paradox in 1901 while working on *The Principles of Mathematics*. (Ernst Zermelo seems to have found the same contradiction independently a little earlier, and communicated it to colleagues in Göttingen, but did not publish it.) Russell wrote to Frege on 16 June 1902; Frege replied on 22 June. Frege added an appendix to volume 2 of the *Grundgesetze* acknowledging the contradiction and proposing a modified Basic Law V; that repair was later shown to fail as well. Both letters are translated in van Heijenoort's *From Frege to Gödel*.

Russell's *Principles of Mathematics* (1903) included an appendix on Frege's work and another sketching a "doctrine of types." The full ramified theory appeared in Russell's 1908 paper "Mathematical Logic as Based on the Theory of Types." *Principia Mathematica*, written with his former teacher Alfred North Whitehead, followed in 1910–13, with a second edition in 1925–27. In 1918 Russell was imprisoned for six months for an article opposing the war, and in Brixton prison he wrote *Introduction to Mathematical Philosophy* (1919), still one of the clearest introductions to these ideas.

In 1931 a 25-year-old Kurt Gödel published "On Formally Undecidable Propositions of *Principia Mathematica* and Related Systems I." The title names Russell and Whitehead's system, and the theorem in it ended the hope that any single such system could capture all of arithmetic (↪ S1E15).

## Connections
- **Callbacks:** ↩ S1E02 (Peano axioms; injectivity of successor), ↩ S1E03 (recursive addition, used by Lean's `rfl`), ↩ S1E04 (Russell's paradox first met; ZF; von Neumann and Zermelo numerals), ↩ S1E05 (numbers as equivalence classes under matching), ↩ S1E08 (least upper bounds are impredicative, which is why reducibility was needed), ↩ S1E11 (one-to-one matching as "same number"), ↩ S1E12 (Russell's and Berry's paradoxes as diagonal arguments), ↩ S1E13 (Burali-Forti)
- **Sets up:** ↪ S1E15 (Gödel's incompleteness ends the full ambitions of Principia and Hilbert's program; Russell's shoes and socks illustrate Choice), ↪ S1E20 (the finale's thesis: "a number is whatever behaves like one," not any particular class), ↪ S3E12 (category theory as the language of "what you can do with it")
- **Side quests:** *Constructive mathematics* (attaches here: what changes without excluded middle), *Proof assistants* (attaches here: formalize a small theorem in Lean live), history interludes *Russell's 1902 letter to Frege, and Russell writing Introduction to Mathematical Philosophy in prison in 1918* and *Hilbert's 1900 problems and the foundations crisis*

**End-card quote:** "Mathematics may be defined as the subject in which we never know what we are talking about, nor whether what we are saying is true." (Bertrand Russell, "Recent Work on the Principles of Mathematics," 1901; reprinted as "Mathematics and the Metaphysicians" in *Mysticism and Logic*, 1918.) In the spirit of this series: mathematics is about structure, not about what the objects are made of.

## References
- **Primary / historical**
  - Gottlob Frege, *Die Grundlagen der Arithmetik* (1884). English: *The Foundations of Arithmetic*, trans. J. L. Austin (1950).
  - Gottlob Frege, *Grundgesetze der Arithmetik*, vol. 1 (1893) and vol. 2 (1903, with the appendix responding to Russell). English: *Basic Laws of Arithmetic*, trans. and ed. Philip A. Ebert and Marcus Rossberg (2013).
  - Bertrand Russell, *The Principles of Mathematics* (1903), especially Chapter X ("The Contradiction") and Appendices A and B.
  - Bertrand Russell, "Mathematical Logic as Based on the Theory of Types," *American Journal of Mathematics* 30 (1908).
  - Alfred North Whitehead and Bertrand Russell, *Principia Mathematica*, 3 vols. (1910, 1912, 1913; 2nd ed. 1925–27): ∗54.43 (vol. 1) and ∗110.643 (vol. 2).
  - Bertrand Russell, *Introduction to Mathematical Philosophy* (1919), Chapters 1–2 (the natural numbers; definition of number) and Chapter 13 (the axiom of infinity and logical types).
  - Bertrand Russell, *Mysticism and Logic and Other Essays* (1918), the essay "Mathematics and the Metaphysicians" (source of the end-card quote).
  - Jean van Heijenoort (ed.), *From Frege to Gödel: A Source Book in Mathematical Logic, 1879–1931* (1967): includes the Russell–Frege letters of 1902, Russell (1908), Zermelo (1908), and Gödel (1931).
  - David Hilbert, "Über das Unendliche," *Mathematische Annalen* 95 (1926). (English "On the Infinite" in van Heijenoort.)
- **Textbooks**
  - Herbert B. Enderton, *Elements of Set Theory* (1977), Chapter 1 (the paradoxes and the axiomatic approach).
  - Benjamin C. Pierce, *Types and Programming Languages* (2002) (type systems and the simply typed λ-calculus).
  - Morten Heine Sørensen and Paweł Urzyczyn, *Lectures on the Curry–Howard Isomorphism* (2006).
- **Accessible**
  - Stanford Encyclopedia of Philosophy: "Russell's Paradox" (A. D. Irvine and Harry Deutsch), "Logicism and Neologicism" (Neil Tennant), "Principia Mathematica" (Bernard Linsky and A. D. Irvine), "Frege's Theorem and Foundations for Arithmetic" (Edward N. Zalta).
  - Apostolos Doxiadis and Christos H. Papadimitriou, *Logicomix: An Epic Search for Truth* (2009), a graphic novel about Russell and the foundations crisis.
