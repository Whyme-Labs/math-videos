# S2E27 posting kit: Weak Convergence / 弱收敛

Season 2, episode 27 of *Spaces, Maps, and Measurements* (《空间、映射与度量》).
Titles, descriptions and captions for each platform, in English and Chinese.
The rules behind them are in
`.claude/skills/whyme-video-script/references/platforms.md`.

- English edition: `out/s2e27-weak-convergence.mp4` (4:17, 16:9)
- Chinese edition: `out/s2e27-zh-ruo-shou-lian.mp4` (4:41, 16:9). It has a scene the English edition
  doesn't: the blind men and the elephant, from 《大般涅槃经》.
- Thumbnails: `thumbnails/png/S2E27-EN.png` and `S2E27-ZH.png` (16:9, for
  YouTube and bilibili). Covers: `thumbnails/cover-4x3/png/S2E27-*.png`
  (抖音's cover editor) and `thumbnails/cover-3x4/png/S2E27-*.png`
  (vertical, 抖音 and TikTok).
- Add it to the Season 2 playlist on YouTube and the Season 2 合集 on
  bilibili and 抖音.
- Before posting anywhere: confirm the background-music licence covers that
  platform, and fill in the Season 2 track title (`<Season 2 track title>`).
  Fill in `<YouTube link>`, `<S2E26 link>` and `<bilibili link>` once the
  uploads are live.
- Chapters: the title card is under 10 s, so it goes in with the next
  chapter. The brand sting belongs to the first chapter.

---

## YouTube (English upload)

**Title** (pick one)

1. Weak Convergence: Getting Compactness Back | Spaces, Maps, and Measurements S2E27
2. Every Sensor Reads 0. It's Still There. | Spaces, Maps, and Measurements S2E27
3. Banach–Alaoglu and the Direct Method | Spaces, Maps, and Measurements S2E27

**Description**

```
A bump of height 1 slides along an endless line. Its energy never changes. Plant a sensor anywhere: the bump passes, the sensor twitches, and then it reads 0 forever. Every measurement says the bump is gone, but it isn't. It escaped to infinity.

Season 2, episode 27 of Whyme Labs' math series. In infinite dimensions bounded sequences needn't converge, so a minimum can go missing: F(x) = (‖x‖² − 1)² + Σ xₖ²/k² drops to 0 along e₁, e₂, … and never gets there. Weak convergence asks only the measurements: xₙ ⇀ x when f(xₙ) → f(x) for every continuous f. In ℓ², eₙ ⇀ 0 because every probe y has yₙ → 0, even though every ‖eₙ‖ is 1; the norm can drop in the limit but never jump. Mass escapes in three ways, travelling, concentrating and oscillating, and sin²(nx) ⇀ ½ shows that squares don't pass through weak limits. In ℓ¹ it fails: the probe (1, 1, 1, …) reads every eₙ as 1. Weak* convergence of functionals, δ at 1/n ⇀* δ at 0, leads to Banach–Alaoglu, proved for separable spaces with Cantor's diagonal table. In reflexive spaces bounded sequences have weak limits, Mazur keeps them inside closed convex sets, and the direct method finds minimisers: G(x) = ‖x‖² − 2Σ xₖ/k has minimum −π²/6, while the non-convex F's limit lands too high.

0:00 The bump that escapes
0:49 A minimum that isn't attained
1:20 Weak convergence and eₙ ⇀ 0
1:55 Three ways mass escapes
2:30 ℓ¹ is different
2:48 Weak* convergence and Banach–Alaoglu
3:24 The direct method
4:00 Next: Hilbert spaces

Previous episode: The big three theorems <S2E26 link>
Next: Hilbert spaces. Geometry with angles again.

Also in Chinese (中文版): <YouTube ZH link>

Sources: S. Banach, Théorie des opérations linéaires (1932); L. Alaoglu, Weak topologies of normed linear spaces (Ann. Math. 41, 1940); S. Mazur (1933); H. Brezis, Functional Analysis, Sobolev Spaces and PDE, ch. 3.
Made by Whyme Labs.
Music: <Season 2 track title>, used under licence.
Fonts: Fraunces, Inter, JetBrains Mono, STIX Two, Noto Sans SC (SIL Open Font License).

#math #functionalanalysis #weakconvergence
```

**Tags:** weak convergence, weak star convergence, Banach-Alaoglu theorem, reflexive space, Mazur's lemma, direct method, calculus of variations, lower semicontinuity, Riemann-Lebesgue lemma, l1 Schur property, Dirac delta, compactness, math explained

## YouTube (Chinese upload)

**标题**（任选其一）

1. 弱收敛：把紧性找回来 | 空间、映射与度量 S2E27
2. 传感器都读 0，它却还在 | 空间、映射与度量 S2E27
3. 巴拿赫–阿劳格鲁与直接方法 | 空间、映射与度量 S2E27

**简介**

```
一条无限长的直线上，有个高度为 1 的鼓包往右滑。它的能量从不改变。随便在哪儿放个传感器：鼓包经过，传感器跳一下，之后永远读 0。所有测量都说它没了，其实没有，它逃到了无穷远。

Whyme Labs 数学系列第二季第 27 集。在无限维里，有界序列未必收敛，最小值就可能不见：F(x) = (‖x‖² − 1)² + Σ xₖ²/k² 沿着 e₁、e₂……一路掉向 0，却永远到不了。弱收敛只问测量：对每个连续的 f 都有 f(xₙ) → f(x)，就说 xₙ ⇀ x。在 ℓ² 里 eₙ ⇀ 0，因为每个探针 y 都有 yₙ → 0，虽然每个 ‖eₙ‖ 都是 1；范数在极限处可以变小，不会变大。质量能从三条路逃走：平移、集中、振荡；sin²(nx) ⇀ ½ 说明平方过不了弱极限。在 ℓ¹ 里不行：探针 (1, 1, 1, …) 把每个 eₙ 都读成 1。泛函的弱*收敛，比如 1/n 处的 δ ⇀* 0 处的 δ，引出巴拿赫–阿劳格鲁定理，可分情形用康托尔的对角线表格证明。在自反空间里，有界序列有弱极限，马祖尔让它留在闭凸集里，直接方法就能找到最小点：G(x) = ‖x‖² − 2Σ xₖ/k 的最小值是 −π²/6，而不凸的 F 的极限落得太高。中文版另加盲人摸象。

0:00 逃走的鼓包
0:49 达不到的最小值
1:20 弱收敛与 eₙ ⇀ 0
1:55 质量逃走的三条路
2:30 盲人摸象
2:54 ℓ¹ 不一样
3:11 弱*收敛与巴拿赫–阿劳格鲁
3:48 直接方法
4:24 下一集：希尔伯特空间

上一集：三大定理 <S2E26 链接>
下一集：希尔伯特空间。角度又回来了。

English version: <YouTube EN link>

出处：《大般涅槃经》盲人摸象“其触牙者，即言象形如芦菔根；其触耳者，言象如箕”；巴拿赫 (1932)；阿劳格鲁 (1940)；马祖尔 (1933)。
Whyme Labs 出品
音乐：<第二季配乐曲名>，已获授权
字体：思源黑体 Noto Sans SC 等（SIL Open Font License）

#数学 #泛函分析 #弱收敛
```

---

## X (x.com), English

**Single post** (with a clip of the bump sliding past the sensors):

```
A bump slides off to infinity. Every fixed sensor ends up reading 0, yet the bump's energy never changes.

That's weak convergence: eₙ ⇀ 0 in ℓ², while every ‖eₙ‖ is 1. The mass escaped where no single measurement can see it.

<YouTube link>
```

**Thread** (4 posts):

1. `Weak convergence 🧵`
2. `xₙ ⇀ x means f(xₙ) → f(x) for every continuous measurement f.`
3. `In ℓ², eₙ ⇀ 0 though ‖eₙ‖ = 1. Mass escapes by travelling, concentrating or oscillating.`
4. `The payoff: in reflexive spaces bounded sequences have weak limits, and the direct method finds minimisers. <YouTube link>`

---

## LinkedIn (Whyme Labs page, English)

```
Episode 27 of Season 2, Spaces, Maps, and Measurements: weak convergence.

The episode starts from a minimum that isn't attained in ℓ², defines weak and weak* convergence, shows the three ways mass escapes (travelling, concentrating, oscillating), explains why ℓ¹ is different, proves sequential Banach–Alaoglu with the diagonal argument, and ends with Mazur's theorem and the direct method of the calculus of variations.

The Chinese edition adds the parable of the blind men and the elephant.

Watch it here: <YouTube link>

#Mathematics #Education #LinearAlgebra #STEM
```

---

## TikTok, English

**On-screen text, first second:** `Every sensor reads 0. It's still there.`

**Caption:**

```
A bump that escapes to infinity, and what that means for convergence. Season 2, part 27.
#math #mathtok #linearalgebra #learnontiktok
```

**Alternative hook:** `sin²(nx) averages to ½, not 0`

---

## bilibili（中文）

**标题**（任选其一）

1. 【空间、映射与度量 S2E27】弱收敛：把紧性找回来
2. 【线性代数·第二季第27集】传感器都读 0，它却还在
3. 【S2E27】盲人摸象与弱收敛

**简介**

```
Whyme Labs 数学系列第二季第 27 集。
鼓包滑向无穷远，每个传感器最后都读 0，它的能量却一点没少。
达不到的最小值、弱收敛与 eₙ ⇀ 0、质量逃走的三条路、ℓ¹ 不一样、弱*收敛、巴拿赫–阿劳格鲁、马祖尔定理、直接方法。
中文版另加盲人摸象。

00:00 逃走的鼓包
00:49 达不到的最小值
01:20 弱收敛与 eₙ ⇀ 0
01:55 质量逃走的三条路
02:30 盲人摸象
02:54 ℓ¹ 不一样
03:11 弱*收敛与巴拿赫–阿劳格鲁
03:48 直接方法
04:24 下一集：希尔伯特空间

上一集：三大定理 <B 站 S2E26 链接>
下一集：希尔伯特空间

出处：《大般涅槃经》盲人摸象“其触牙者，即言象形如芦菔根；其触耳者，言象如箕”；巴拿赫 (1932)；阿劳格鲁 (1940)；马祖尔 (1933)。
音乐：<第二季配乐曲名>，已获授权
字体：思源黑体 Noto Sans SC（SIL Open Font License）
Whyme Labs 出品，自制
```

**标签：** 数学, 科普, 知识, 泛函分析, 弱收敛, 弱星收敛, 巴拿赫阿劳格鲁定理, 自反空间, 马祖尔定理, 直接方法, 变分法, 黎曼勒贝格引理, 盲人摸象, 空间映射与度量

**分区：** 知识 → 科学科普　**类型：** 自制
**分段章节：** 同简介中的时间点
**合集：** 空间、映射与度量（第二季，第 27 集）
**封面：** `thumbnails/png/S2E27-ZH.png`（滑向远处的鼓包和一排读数为 0 的传感器，大字“传感器都读 0 它却还在”）

**动态：** `第二季第 27 集：弱收敛。每个传感器都读 0，东西却还在？顺带看盲人摸象。`

---

## 抖音

**画面首秒文字：** `传感器都读 0，它却还在`

**封面：** 横屏用 `thumbnails/cover-4x3/png/S2E27-ZH.png`，切换竖版用 `thumbnails/cover-3x4/png/S2E27-ZH.png`

**标题 / 文案**（任选其一）

1. `每个传感器都读 0 #数学 #涨知识 #泛函分析`
2. `质量逃走的三条路 #数学 #科普 #弱收敛`
3. `盲人摸象和弱收敛 #数学 #传统文化 #知识科普`

**合集：** 空间、映射与度量（第二季）
**评论区置顶：** `第一季《数是什么？》二十集都在 B 站，搜“数是什么 Whyme Labs”`
