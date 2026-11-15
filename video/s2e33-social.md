# S2E33 posting kit: Distributions / 广义函数

Season 2, episode 33 of *Spaces, Maps, and Measurements* (《空间、映射与度量》).
Titles, descriptions and captions for each platform, in English and Chinese.
The rules behind them are in
`.claude/skills/whyme-video-script/references/platforms.md`.

- English edition: `out/s2e33-distributions.mp4` (4:31, 16:9)
- Chinese edition: `out/s2e33-zh-guang-yi-han-shu.mp4` (4:54, 16:9). It has a scene the English edition
  doesn't: striking a bell, from 《礼记·学记》. This is the Season 2 finale.
- Thumbnails: `thumbnails/png/S2E33-EN.png` and `S2E33-ZH.png` (16:9, for
  YouTube and bilibili). Covers: `thumbnails/cover-4x3/png/S2E33-*.png`
  (抖音's cover editor) and `thumbnails/cover-3x4/png/S2E33-*.png`
  (vertical, 抖音 and TikTok).
- Add it to the Season 2 playlist on YouTube and the Season 2 合集 on
  bilibili and 抖音.
- Before posting anywhere: confirm the background-music licence covers that
  platform, and fill in the Season 2 track title (`<Season 2 track title>`).
  Fill in `<YouTube link>`, `<S2E32 link>` and `<bilibili link>` once the
  uploads are live.
- Chapters: the title card is under 10 s, so it goes in with the next
  chapter. The brand sting belongs to the first chapter.

---

## YouTube (English upload)

**Title** (pick one)

1. The Dirac Delta Is Not a Function (It's a Measurement) | Spaces, Maps, and Measurements S2E33
2. Distributions: Functions, Extended by Duality | Spaces, Maps, and Measurements S2E33
3. How to Differentiate a Jump: H′ = δ | Spaces, Maps, and Measurements S2E33

**Description**

```
Physicists love the Dirac delta: zero everywhere except one infinitely tall spike of area 1. A point charge, a hammer blow. One problem: no such function exists. Laurent Schwartz noticed the delta is only ever used inside an integral against a smooth function, and the answer is always that function's value at 0. So let the delta be a measurement.

Season 2, episode 33 of Whyme Labs' math series. Boxes of width 1/n and height n tend to 0 pointwise and blow up in L², yet ∫ δₙ φ → φ(0) for every smooth φ: the measurements converge. Test functions are smooth bumps that vanish outside a box; a distribution is a continuous linear functional on them. Every function is one (φ ↦ ∫ f φ), and so are δ (φ ↦ φ(0)) and every measure: tiny inputs, huge dual, D ⊂ L² ⊂ D′. Integration by parts becomes a definition, T′(φ) = −T(φ′), so every distribution has every derivative, the step H has H′ = δ, and limits commute with derivatives. Green's functions solve LG = δ once and superpose: on a string G(x, y) = min(x, y)(1 − max(x, y)), in 3D the Coulomb potential. The weak form of Poisson's equation, ∫ u′v′ = ∫ f v, is an inner product on H¹₀, so Riesz gives exactly one solution, and finite elements are an orthogonal projection onto hat functions. A montage closes the season's story of measurement: a function is the way it answers measurements.

0:00 The Dirac delta
0:49 The delta as a limit of boxes
1:21 Test functions and distributions
1:56 The distributional derivative
2:32 Green's functions
3:01 The weak form and Riesz
3:37 Season montage: measurement
4:12 Next season

Previous episode: Measure-preserving systems <S2E32 link>
Next: Season 3: fields are vector spaces.

Also in Chinese (中文版): <YouTube ZH link>

Sources: P. A. M. Dirac, The Principles of Quantum Mechanics (1930); L. Schwartz, Théorie des distributions (1950–51); S. Sobolev (1936); P. Lax and A. Milgram (1954); L. C. Evans, Partial Differential Equations, ch. 5–6.
Made by Whyme Labs.
Music: <Season 2 track title>, used under licence.
Fonts: Fraunces, Inter, JetBrains Mono, STIX Two, Noto Sans SC (SIL Open Font License).

#math #distributions #functionalanalysis
```

**Tags:** Dirac delta, distributions, generalized functions, test functions, Schwartz, distributional derivative, Heaviside step, Green's function, Poisson equation, weak formulation, Sobolev space, Riesz representation, finite element method, math explained

## YouTube (Chinese upload)

**标题**（任选其一）

1. δ 不是函数，是一个测量 | 空间、映射与度量 S2E33
2. 广义函数：用对偶扩充函数 | 空间、映射与度量 S2E33
3. 跳跃怎么求导：H′ = δ | 空间、映射与度量 S2E33

**简介**

```
物理学家最爱狄拉克 δ 函数：处处为零，只在一点有无穷高的尖峰，面积正好是 1。一个点电荷，一记锤击。只有一个问题：这样的函数不存在。施瓦茨注意到，δ 总是出现在积分里，和一个光滑函数相乘，结果永远是那个函数在 0 处的值。那就让 δ 当一个测量。

Whyme Labs 数学系列第二季第 33 集。宽 1/n、高 n 的方块逐点趋于 0，在 L² 里爆掉，可对每个光滑的 φ，∫ δₙ φ → φ(0)：测量值收敛。试验函数是出了一个盒子就为 0 的光滑鼓包；广义函数是试验函数上的连续线性泛函。每个函数都是（φ ↦ ∫ f φ），δ 也是（φ ↦ φ(0)），测度也是：输入越小，对偶越大，D ⊂ L² ⊂ D′。分部积分变成定义 T′(φ) = −T(φ′)，于是每个广义函数都能求任意阶导数，阶跃函数 H′ = δ，极限和求导也能交换了。格林函数先解一次 LG = δ 再叠加：弦上 G(x, y) = min(x, y)(1 − max(x, y))，三维里是库仑势。泊松方程的弱形式 ∫ u′v′ = ∫ f v 是 H¹₀ 上的内积，里斯给出唯一解；有限元就是往帽子函数上作正交投影。最后回顾这一季关于测量的故事：一个函数，就是它回应测量的方式。中文版另加《礼记·学记》论撞钟。

0:00 狄拉克 δ
0:49 方块的极限
1:21 试验函数与广义函数
1:56 广义导数
2:32 撞钟
2:55 格林函数
3:25 弱形式与里斯
4:01 本季回顾：测量
4:36 下一季

上一集：保测系统 <S2E32 链接>
下一集：第三季：域是向量空间。

English version: <YouTube EN link>

出处：《礼记·学记》“善待问者如撞钟，叩之以小者则小鸣，叩之以大者则大鸣”；狄拉克 (1930)；施瓦茨 (1950–51)；索伯列夫 (1936)；拉克斯、米尔格拉姆 (1954)。
Whyme Labs 出品
音乐：<第二季配乐曲名>，已获授权
字体：思源黑体 Noto Sans SC 等（SIL Open Font License）

#数学 #广义函数 #泛函分析
```

---

## X (x.com), English

**Single post** (with a clip of boxes narrowing while ∫ δₙ φ settles on φ(0)):

```
Why H′ = δ: for any test function φ,
H′(φ) = −∫ H φ′ = −∫₀^∞ φ′ = φ(0) = δ(φ).

A jump differentiates into a spike, and now it's a theorem.

<YouTube link>
```

**Thread** (4 posts):

1. `The Dirac delta is not a function. It's a measurement 🧵`
2. `Boxes of area 1 don't converge as functions, but ∫ δₙ φ → φ(0) for every smooth φ.`
3. `Distributions: continuous linear functionals on test functions. Every function is one, and so is δ.`
4. `Define T′(φ) = −T(φ′) and everything has a derivative: H′ = δ. <YouTube link>`

---

## LinkedIn (Whyme Labs page, English)

```
Episode 33, the Season 2 finale of Spaces, Maps, and Measurements: distributions.

The episode shows why the Dirac delta cannot be a function, defines test functions and distributions, differentiates anything with T′(φ) = −T(φ′) and proves H′ = δ, solves equations with Green's functions, sets up the weak form of Poisson's equation and solves it with the Riesz representation theorem, and closes with a montage of the season's story of measurement.

The Chinese edition adds the Book of Rites on striking a bell.

Watch it here: <YouTube link>

#Mathematics #Education #LinearAlgebra #STEM
```

---

## TikTok, English

**On-screen text, first second:** `The delta isn't a function`

**Caption:**

```
It's a measurement: φ ↦ φ(0). And then everything has a derivative. Season 2, part 33.
#math #mathtok #linearalgebra #learnontiktok
```

**Alternative hook:** `How to differentiate a jump`

---

## bilibili（中文）

**标题**（任选其一）

1. 【空间、映射与度量 S2E33】季终：广义函数，δ 是一个测量
2. 【线性代数·第二季第33集】跳跃怎么求导：H′ = δ
3. 【S2E33】撞钟与格林函数

**简介**

```
Whyme Labs 数学系列第二季第 33 集。
δ 函数不存在，却天天在用。答案：它是一个测量。
方块的极限、试验函数、广义函数、δ 与测度、广义导数与 H′ = δ、格林函数、泊松方程弱形式、索伯列夫空间、里斯表示定理、有限元，以及第二季回顾。
中文版另加《礼记·学记》论撞钟。

00:00 狄拉克 δ
00:49 方块的极限
01:21 试验函数与广义函数
01:56 广义导数
02:32 撞钟
02:55 格林函数
03:25 弱形式与里斯
04:01 本季回顾：测量
04:36 下一季

上一集：保测系统 <B 站 S2E32 链接>
下一集：域是向量空间

出处：《礼记·学记》“善待问者如撞钟，叩之以小者则小鸣，叩之以大者则大鸣”；狄拉克 (1930)；施瓦茨 (1950–51)；索伯列夫 (1936)；拉克斯、米尔格拉姆 (1954)。
音乐：<第二季配乐曲名>，已获授权
字体：思源黑体 Noto Sans SC（SIL Open Font License）
Whyme Labs 出品，自制
```

**标签：** 数学, 科普, 知识, 泛函分析, 广义函数, 狄拉克函数, 试验函数, 广义导数, 格林函数, 泊松方程, 弱形式, 有限元, 撞钟, 空间映射与度量

**分区：** 知识 → 科学科普　**类型：** 自制
**分段章节：** 同简介中的时间点
**合集：** 空间、映射与度量（第二季，第 33 集）
**封面：** `thumbnails/png/S2E33-ZH.png`（一个光滑鼓包上立着一根细高的尖峰，顶点画圈，大字“δ 不是函数 是一个测量”）

**动态：** `第二季季终：广义函数。δ 不是函数，是一个测量。顺带看《礼记》怎么说撞钟。`

---

## 抖音

**画面首秒文字：** `δ 不是函数`

**封面：** 横屏用 `thumbnails/cover-4x3/png/S2E33-ZH.png`，切换竖版用 `thumbnails/cover-3x4/png/S2E33-ZH.png`

**标题 / 文案**（任选其一）

1. `δ 函数其实不存在 #数学 #涨知识 #物理`
2. `跳跃求导变成尖峰 #数学 #科普 #广义函数`
3. `撞钟里的格林函数 #数学 #传统文化 #知识科普`

**合集：** 空间、映射与度量（第二季）
**评论区置顶：** `第一季《数是什么？》二十集都在 B 站，搜“数是什么 Whyme Labs”`
