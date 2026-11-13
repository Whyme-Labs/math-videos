# S2E31 posting kit: Spectrum and Quantum Mechanics / 谱与量子力学

Season 2, episode 31 of *Spaces, Maps, and Measurements* (《空间、映射与度量》).
Titles, descriptions and captions for each platform, in English and Chinese.
The rules behind them are in
`.claude/skills/whyme-video-script/references/platforms.md`.

- English edition: `out/s2e31-spectrum-quantum.mp4` (4:28, 16:9)
- Chinese edition: `out/s2e31-zh-pu-yu-liang-zi.mp4` (4:52, 16:9). It has a scene the English edition
  doesn't: the rainbow in 沈括《梦溪笔谈》, book 21.
- Thumbnails: `thumbnails/png/S2E31-EN.png` and `S2E31-ZH.png` (16:9, for
  YouTube and bilibili). Covers: `thumbnails/cover-4x3/png/S2E31-*.png`
  (抖音's cover editor) and `thumbnails/cover-3x4/png/S2E31-*.png`
  (vertical, 抖音 and TikTok).
- Add it to the Season 2 playlist on YouTube and the Season 2 合集 on
  bilibili and 抖音.
- Before posting anywhere: confirm the background-music licence covers that
  platform, and fill in the Season 2 track title (`<Season 2 track title>`).
  Fill in `<YouTube link>`, `<S2E30 link>` and `<bilibili link>` once the
  uploads are live.
- Chapters: the title card is under 10 s, so it goes in with the next
  chapter. The brand sting belongs to the first chapter.

---

## YouTube (English upload)

**Title** (pick one)

1. Position Has No Eigenvalues. So What Does a Detector Measure? | Spaces, Maps, and Measurements S2E31
2. The Spectrum: Beyond Eigenvalues | Spaces, Maps, and Measurements S2E31
3. Why Position and Momentum Can't Be Bounded | Spaces, Maps, and Measurements S2E31

**Description**

```
Multiply a function by x. In quantum mechanics that's position, and it has no eigenvectors at all: x·f = λf forces f to live at a single point. Yet the textbook rule says measured values are eigenvalues, and detectors record positions all day. Eigenvalues were the wrong idea in infinite dimensions. The replacement is the spectrum.

Season 2, episode 31 of Whyme Labs' math series. The right shift on ℓ² has no eigenvalues, yet it isn't onto: one-to-one but not onto, impossible in finite dimensions. So ask instead where T − λ fails to be invertible. That set is the spectrum σ(T); it can fail by not being one-to-one (eigenvalues), by having dense but incomplete range, or by having a thin range. A geometric series inverts T − λ for |λ| > ‖T‖, so σ(T) is closed and bounded, and Liouville's theorem shows it is never empty over ℂ. The shift's spectrum is the whole closed unit disk; multiplication by x has spectrum [0, 1], all continuous, with tall thin bumps as approximate eigenvectors. XP − PX = iħ is impossible for bounded operators (trace in finite dimensions, a norm-growth argument in general), so position and momentum live on dense domains. The spectral theorem says every self-adjoint operator is multiplication by a real function in the right coordinates, with the Fourier transform turning momentum into ħk. The dictionary: states are unit vectors, observables self-adjoint operators, outcomes the spectrum, and Prob(a ≤ X ≤ b) = ∫ₐᵇ |ψ|². Cauchy–Schwarz gives ΔX·ΔP ≥ ħ/2.

0:00 Position has no eigenvalues
0:48 The right shift
1:20 The spectrum
1:56 The two examples solved
2:32 Why X and P are unbounded
3:08 The spectral theorem as multiplication
3:37 The quantum mechanics dictionary
4:13 Next: measure-preserving systems

Previous episode: Compact operators <S2E30 link>
Next: Measure-preserving systems. Linear algebra meets chaos.

Also in Chinese (中文版): <YouTube ZH link>

Sources: J. von Neumann, Mathematische Grundlagen der Quantenmechanik (1932); E. Hellinger and O. Toeplitz (1910); A. Wintner (1947) and H. Wielandt (1949); I. Gelfand (1941); M. Reed and B. Simon, Methods of Modern Mathematical Physics I, ch. VI–VIII.
Made by Whyme Labs.
Music: <Season 2 track title>, used under licence.
Fonts: Fraunces, Inter, JetBrains Mono, STIX Two, Noto Sans SC (SIL Open Font License).

#math #quantummechanics #functionalanalysis
```

**Tags:** spectrum, resolvent, point spectrum, continuous spectrum, residual spectrum, right shift, multiplication operator, unbounded operator, Hellinger-Toeplitz, canonical commutation relation, spectral theorem, Born rule, uncertainty principle, quantum mechanics, math explained

## YouTube (Chinese upload)

**标题**（任选其一）

1. 位置没有特征值，探测器在测什么？ | 空间、映射与度量 S2E31
2. 谱：超越特征值 | 空间、映射与度量 S2E31
3. 为什么位置和动量不能有界 | 空间、映射与度量 S2E31

**简介**

```
把函数乘以 x。在量子力学里这就是位置，可它一个特征向量都没有：x·f = λf 逼得 f 只能活在一个点上。教科书说测量结果都是特征值，探测器却天天在测位置。在无穷维里，“特征值”本来就选错了，该换成谱。

Whyme Labs 数学系列第二季第 31 集。ℓ² 上的右移没有特征值，却不是满射：单射却不满射，在有限维里不可能。所以换个问法：T − λ 在哪里不可逆？这个集合就是谱 σ(T)。不可逆有三种：不是单射（特征值）、像稠密但不满、像不稠密。|λ| > ‖T‖ 时几何级数把 T − λ 逆了回来，所以 σ(T) 是有界闭集；刘维尔定理说在 ℂ 上它永远不空。右移的谱是整个闭单位圆盘；乘以 x 的谱是 [0, 1]，全是连续谱，又高又窄的鼓包是近似特征向量。XP − PX = iħ 对有界算子不可能成立（有限维用迹，一般情形用范数增长），所以位置和动量只能定义在稠密子空间上。谱定理：每个自伴算子，选对坐标，就是乘以一个实函数；傅里叶变换把动量变成乘以 ħk。对照表：状态是单位向量，可观测量是自伴算子，测量结果是谱，Prob(a ≤ X ≤ b) = ∫ₐᵇ |ψ|²。柯西–施瓦茨给出 ΔX·ΔP ≥ ħ/2。中文版另加沈括《梦溪笔谈》记虹。

0:00 位置没有特征值
0:48 右移算子
1:20 谱
1:56 两个例子
2:32 沈括记虹
2:55 X 和 P 为何无界
3:31 谱定理：乘法算子
4:00 量子力学对照表
4:36 下一集：保测系统

上一集：紧算子 <S2E30 链接>
下一集：保测系统。线性代数遇上混沌。

English version: <YouTube EN link>

出处：沈括《梦溪笔谈》卷二十一记孙彦先“虹乃雨中日影也，日照雨则有之”；冯·诺依曼 (1932)；海林格、特普利茨 (1910)；温特纳 (1947)、维兰特 (1949)。
Whyme Labs 出品
音乐：<第二季配乐曲名>，已获授权
字体：思源黑体 Noto Sans SC 等（SIL Open Font License）

#数学 #量子力学 #泛函分析
```

---

## X (x.com), English

**Single post** (with a clip of detector hits building up a histogram):

```
Suppose bounded X, P had XP − PX = c ≠ 0. Induction gives XPⁿ − PⁿX = nc·Pⁿ⁻¹, so n|c| ≤ 2‖X‖‖P‖ for every n.

Impossible. So [X, P] = iħ forces unbounded operators on quantum mechanics.

<YouTube link>
```

**Thread** (4 posts):

1. `Position has no eigenvalues. So what does a detector measure? 🧵`
2. `The spectrum: all λ where T − λ fails to invert. Never empty, and it can be a whole disk or an interval.`
3. `Multiplication by x: spectrum [0, 1], no eigenvalues, tall thin bumps as approximate eigenvectors.`
4. `Detectors ask 'is X in [a, b]?', answered by ∫ₐᵇ |ψ|². No eigenvector needed. <YouTube link>`

---

## LinkedIn (Whyme Labs page, English)

```
Episode 31 of Season 2, Spaces, Maps, and Measurements: spectrum and quantum mechanics.

The episode starts from the fact that position has no eigenvalues, defines the spectrum and its three parts, shows it is closed, bounded and never empty, computes the spectra of the right shift and of multiplication by x, proves that XP − PX = iħ has no bounded solutions, states the spectral theorem in multiplication form, and builds the quantum dictionary through the Born rule and the uncertainty principle.

The Chinese edition adds Shen Kuo's note on the rainbow from the Dream Pool Essays.

Watch it here: <YouTube link>

#Mathematics #Education #LinearAlgebra #STEM
```

---

## TikTok, English

**On-screen text, first second:** `Position has no eigenvalues`

**Caption:**

```
So what does a detector measure? The spectrum, not eigenvalues. Season 2, part 31.
#math #mathtok #linearalgebra #learnontiktok
```

**Alternative hook:** `Why XP − PX = iħ needs unbounded operators`

---

## bilibili（中文）

**标题**（任选其一）

1. 【空间、映射与度量 S2E31】谱与量子力学：位置没有特征值
2. 【线性代数·第二季第31集】谱：超越特征值
3. 【S2E31】沈括记虹与连续谱

**简介**

```
Whyme Labs 数学系列第二季第 31 集。
位置算子没有特征值，探测器却天天在测位置。答案是谱。
右移算子、谱的定义与三种类型、谱非空且紧、右移的谱是闭圆盘、乘以 x 的谱是 [0, 1]、XP − PX = iħ 没有有界解、海林格–特普利茨、谱定理（乘法形式）、玻恩规则、不确定性原理。
中文版另加沈括《梦溪笔谈》记虹。

00:00 位置没有特征值
00:48 右移算子
01:20 谱
01:56 两个例子
02:32 沈括记虹
02:55 X 和 P 为何无界
03:31 谱定理：乘法算子
04:00 量子力学对照表
04:36 下一集：保测系统

上一集：紧算子 <B 站 S2E30 链接>
下一集：保测系统

出处：沈括《梦溪笔谈》卷二十一记孙彦先“虹乃雨中日影也，日照雨则有之”；冯·诺依曼 (1932)；海林格、特普利茨 (1910)；温特纳 (1947)、维兰特 (1949)。
音乐：<第二季配乐曲名>，已获授权
字体：思源黑体 Noto Sans SC（SIL Open Font License）
Whyme Labs 出品，自制
```

**标签：** 数学, 科普, 知识, 泛函分析, 谱, 特征值, 右移算子, 无界算子, 谱定理, 量子力学, 玻恩规则, 不确定性原理, 沈括, 梦溪笔谈, 空间映射与度量

**分区：** 知识 → 科学科普　**类型：** 自制
**分段章节：** 同简介中的时间点
**合集：** 空间、映射与度量（第二季，第 31 集）
**封面：** `thumbnails/png/S2E31-ZH.png`（复平面上一个实心圆盘和实轴上一段亮带，下方是探测器的位置直方图，大字“位置 没有特征值”）

**动态：** `第二季第 31 集：谱与量子力学。位置没有特征值，探测器在测什么？顺带看沈括怎么说彩虹。`

---

## 抖音

**画面首秒文字：** `位置没有特征值`

**封面：** 横屏用 `thumbnails/cover-4x3/png/S2E31-ZH.png`，切换竖版用 `thumbnails/cover-3x4/png/S2E31-ZH.png`

**标题 / 文案**（任选其一）

1. `位置竟然没有特征值 #数学 #涨知识 #量子力学`
2. `不确定性原理从哪来 #数学 #科普 #量子力学`
3. `沈括说彩虹是雨中日影 #数学 #传统文化 #知识科普`

**合集：** 空间、映射与度量（第二季）
**评论区置顶：** `第一季《数是什么？》二十集都在 B 站，搜“数是什么 Whyme Labs”`
