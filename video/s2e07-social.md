# S2E07 posting kit: Functionals Everywhere / 无处不在的泛函

Season 2, episode 7 of *Spaces, Maps, and Measurements* (《空间、映射与度量》).
Titles, descriptions and captions for each platform, in English and Chinese.
The rules behind them are in
`.claude/skills/whyme-video-script/references/platforms.md`.

- English edition: `out/s2e07-functionals-everywhere.mp4` (DUR_EN, 16:9)
- Chinese edition: `out/s2e07-zh-wu-chu-bu-zai-de-fan-han.mp4` (DUR_ZH,
  16:9). It has a scene the English edition doesn't: 刘焯's 《皇极历》
  (600 CE) and equal-interval quadratic interpolation, three observations of
  the sun fitted with a parabola.
- Thumbnails: `thumbnails/png/S2E07-EN.png` and `S2E07-ZH.png` (16:9, for
  YouTube and bilibili). Covers: `thumbnails/cover-4x3/png/S2E07-*.png`
  (抖音's cover editor) and `thumbnails/cover-3x4/png/S2E07-*.png`
  (vertical, 抖音 and TikTok).
- Add it to the Season 2 playlist on YouTube and the Season 2 合集 on
  bilibili and 抖音.
- Before posting anywhere: confirm the background-music licence covers that
  platform, and fill in the Season 2 track title (`<Season 2 track title>`).
  Fill in `<YouTube link>`, `<S2E06 link>` and `<bilibili link>` once the
  uploads are live.
- Chapters: the title card is under 10 s, so it goes in with the next
  chapter. The brand sting belongs to the first chapter.

---

## YouTube (English upload)

**Title** (pick one)

1. Why Simpson's Rule Is Exact for Cubics | Spaces, Maps, and Measurements S2E07
2. Kepler's Wine Barrels and the Dual Space | Spaces, Maps, and Measurements S2E07
3. Interpolation Is a Change of Basis | Spaces, Maps, and Measurements S2E07

**Description**

```
Linz, autumn 1613. Johannes Kepler buys wine for his wedding, and the merchant prices each barrel by poking one rod through the bung hole. One reading for a whole curved barrel? Kepler doesn't trust it, and writes a book on measuring barrels. The rule now named after him measures the two ends and the middle and weighs them 1/6, 4/6, 1/6. It's exact for parabolas, which makes sense. But it's also exact for cubics. How?

Season 2, episode 7 of Whyme Labs' math series. A function's value at 0, its slope at 1 and the area under it are all covectors: measurements that respect adding and scaling. Measure a parabola at 0, 1 and 2 and three readings pin it down, so those three probes are a basis of the measurements; swap in the value, slope and half-curvature at 0 and the readings change while the parabola doesn't. Each probe has a partner, a Lagrange polynomial, and interpolation is a change of basis. The payoff: area is one more measurement, so on parabolas it's a mix of the three values. Add the cubic (x − ½)³: its lobes cancel, its area is 0, and the probes read minus, 0, plus, which also sum to 0. Both measurements are blind to that direction, so they agree on every cubic. Symmetry bought a degree for free.

0:00 Linz, 1613
0:31 Measuring functions
0:47 Probes as coordinates
1:00 The Lagrange partners
1:14 Kepler's rule is exact for cubics
1:35 Next: the transpose

Previous episode: Covectors <S2E06 link>
Next: every linear map pulls measurements back. That's what the transpose really is.

Also in Chinese (中文版): <YouTube ZH link>

Sources: J. Kepler, Nova stereometria doliorum vinariorum (1615); T. Simpson, Mathematical Dissertations (1743); E. Waring (1779) and J.-L. Lagrange (1795) on interpolation; C. F. Gauss, "Methodus nova integralium valores per approximationem inveniendi" (1814); K. Hoffman and R. Kunze, Linear Algebra, ch. 3.
Made by Whyme Labs.
Music: <Season 2 track title>, used under licence.
Fonts: Fraunces, Inter, JetBrains Mono, STIX Two, Noto Sans SC (SIL Open Font License).

#math #linearalgebra #numericalanalysis
```

**Tags:** Simpson's rule, Kepler barrel rule, linear functional, dual space, Lagrange interpolation, quadrature, numerical integration, interpolation, Taylor coefficients, linear algebra, math explained

## YouTube (Chinese upload)

**标题**（任选其一）

1. 辛普森法则为什么对三次曲线也精确 | 空间、映射与度量 S2E07
2. 开普勒量酒桶与对偶空间 | 空间、映射与度量 S2E07
3. 插值就是换基 | 空间、映射与度量 S2E07

**简介**

```
1613 年秋，林茨。开普勒为婚礼买酒，酒商估一桶酒，只把一根量杆从桶口插进去读一下。一个读数就定下一整只弯弯的酒桶？开普勒不信，写了一本讲量酒桶的书。如今以他命名的“酒桶法则”量两头和正中，按 1/6、4/6、1/6 加权。它对抛物线精确，说得通；可它对三次曲线也精确。为什么？

Whyme Labs 数学系列第二季第 7 集。函数在 0 处的值、在 1 处的斜率、曲线下的面积，都是余向量：尊重加法和数乘的测量。在 0、1、2 三处量一条抛物线，三个读数就定死了它，这三个探针是测量的一组基；换成 0 处的值、斜率、曲率的一半，读数变了，抛物线没变。每个探针有一条搭档抛物线，就是拉格朗日多项式；插值就是换基。压轴：面积也是一种测量，在抛物线上它是三个值的组合；再加一条 (x − ½)³，两瓣抵消，面积为 0，三个探针读到负、0、正，加权也是 0。两种测量都看不见这个方向，所以对每条三次曲线都一致：对称白送了一次方。中文版另加刘焯《皇极历》的二次内插。

0:00 1613 年，林茨
0:26 测量函数
0:41 探针当坐标
0:51 拉格朗日搭档
1:02 刘焯《皇极历》
1:18 酒桶法则对三次也精确
1:38 下一集：转置与双重对偶

上一集：余向量 <S2E06 链接>
下一集：每个线性映射都把测量拉回去，这才是转置的真面目。

English version: <YouTube EN link>

出处：刘焯《皇极历》（600 年）；开普勒《酒桶的新立体几何》(1615)；辛普森 (1743)；拉格朗日 (1795)；高斯 (1814)。
Whyme Labs 出品
音乐：<第二季配乐曲名>，已获授权
字体：思源黑体 Noto Sans SC 等（SIL Open Font License）

#数学 #线性代数 #数值分析
```

---

## X (x.com), English

**Single post** (with a clip of the cubic's two lobes cancelling while the probes read −, 0, +):

```
Kepler's barrel rule (Simpson's rule) samples a curve at 3 points. That should only be exact for parabolas.

It's exact for cubics too, because the one extra cubic direction, (x − ½)³, is invisible to both the area and the three probes.

<YouTube link>
```

**Thread** (4 posts):

1. `Why is Simpson's rule exact for cubics when it only samples 3 points? 🧵`
2. `Value at a point, slope at a point, area under a curve: each is a linear functional, a covector on the space of polynomials.`
3. `On parabolas, three values are a basis of the dual space, so area must be a mix of them: 1/6, 4/6, 1/6. That's the rule.`
4. `The cubic (x − ½)³ has area 0 and the three samples read −⅛, 0, +⅛, which also weigh to 0. Both functionals vanish on it, so they agree on all cubics. <YouTube link>`

---

## LinkedIn (Whyme Labs page, English)

```
Episode 7 of Season 2, Spaces, Maps, and Measurements: functionals everywhere.

Point values, derivatives at a point and integrals are all linear functionals on spaces of functions. Seen that way, interpolation, finite differences and numerical integration are one idea: writing one measurement as a combination of others, which is a change of basis in the dual space.

The episode starts with Kepler, who in 1613 doubted a wine merchant's one-rod method of gauging barrels, and ends by showing why the three-point barrel rule (Simpson's rule) is exact not just for parabolas but for every cubic.

The Chinese edition adds Liu Zhuo's quadratic interpolation in the Huangji calendar of 600 CE.

Watch it here: <YouTube link>

#Mathematics #Education #NumericalAnalysis #STEM
```

---

## TikTok, English

**On-screen text, first second:** `Three samples, exact for cubics. How?`

**Caption:**

```
Kepler's barrel rule weighs the ends and the middle 1/6, 4/6, 1/6. It's exact for cubics, and symmetry is why. Season 2, part 7.
#math #mathtok #calculus #learnontiktok
```

**Alternative hook:** `Kepler didn't trust his wine merchant.`

---

## bilibili（中文）

**标题**（任选其一）

1. 【空间、映射与度量 S2E07】辛普森法则为什么对三次曲线也精确
2. 【线性代数·第二季第7集】插值就是换基：无处不在的泛函
3. 【S2E07】开普勒量酒桶，刘焯算日月：同一个想法

**简介**

```
Whyme Labs 数学系列第二季第 7 集。
1613 年开普勒为婚礼买酒，不信酒商一根量杆估一整桶。
测量函数：0 处的值、1 处的斜率、面积，都是余向量。探针当坐标：0、1、2 三处的值定死一条抛物线；换成 0 处的值、斜率、曲率一半，读数变、抛物线不变。拉格朗日搭档：插值就是换基。压轴：面积是三个值的组合 1/6、4/6、1/6；(x − ½)³ 面积为 0、探针读数加权也为 0，两种测量都看不见它，所以法则对三次曲线也精确。
中文版另加隋代刘焯《皇极历》（600 年）的二次内插：三个等距时刻的观测配出一条二次曲线。

00:00 1613 年，林茨
00:26 测量函数
00:41 探针当坐标
00:51 拉格朗日搭档
01:02 刘焯《皇极历》
01:18 酒桶法则对三次也精确
01:38 下一集：转置与双重对偶

上一集：余向量 <B 站 S2E06 链接>
下一集：转置与双重对偶

出处：刘焯《皇极历》；开普勒 (1615)；辛普森 (1743)；拉格朗日 (1795)。
音乐：<第二季配乐曲名>，已获授权
字体：思源黑体 Noto Sans SC（SIL Open Font License）
Whyme Labs 出品，自制
```

**标签：** 数学, 科普, 知识, 线性代数, 泛函, 对偶空间, 拉格朗日插值, 辛普森法则, 数值积分, 开普勒, 刘焯, 皇极历, 空间映射与度量

**分区：** 知识 → 科学科普　**类型：** 自制
**分段章节：** 同简介中的时间点
**合集：** 空间、映射与度量（第二季，第 7 集）
**封面：** `thumbnails/png/S2E07-ZH.png`（一只横放的酒桶，两头和正中三个探针，大字“开普勒 量酒桶”）

**动态：** `第二季第 7 集：无处不在的泛函。三个点的法则为什么对三次曲线也精确？顺带看隋代刘焯的二次内插。`

---

## 抖音

**画面首秒文字：** `三个点，为什么能算准三次曲线`

**封面：** 横屏用 `thumbnails/cover-4x3/png/S2E07-ZH.png`，切换竖版用 `thumbnails/cover-3x4/png/S2E07-ZH.png`

**标题 / 文案**（任选其一）

1. `开普勒不信酒商的量杆 #数学 #涨知识 #微积分`
2. `插值就是换基 #数学 #科普 #线性代数`
3. `隋代刘焯早就会二次内插 #数学 #传统文化 #知识科普`

**合集：** 空间、映射与度量（第二季）
**评论区置顶：** `第一季《数是什么？》二十集都在 B 站，搜“数是什么 Whyme Labs”`
