# S2E16 posting kit: Vectors and Covectors / 向量与余向量

Season 2, episode 16 of *Spaces, Maps, and Measurements* (《空间、映射与度量》).
Titles, descriptions and captions for each platform, in English and Chinese.
The rules behind them are in
`.claude/skills/whyme-video-script/references/platforms.md`.

- English edition: `out/s2e16-vectors-and-covectors.mp4` (4:01, 16:9)
- Chinese edition: `out/s2e16-zh-xiang-liang-yu-yu-xiang-liang.mp4` (4:20, 16:9). It has a scene the English edition
  doesn't: 裴秀's six principles of map-making (制图六体): when the map's
  scale (分率) goes wrong, right angles break but contour counts don't.
- Thumbnails: `thumbnails/png/S2E16-EN.png` and `S2E16-ZH.png` (16:9, for
  YouTube and bilibili). Covers: `thumbnails/cover-4x3/png/S2E16-*.png`
  (抖音's cover editor) and `thumbnails/cover-3x4/png/S2E16-*.png`
  (vertical, 抖音 and TikTok).
- Add it to the Season 2 playlist on YouTube and the Season 2 合集 on
  bilibili and 抖音.
- Before posting anywhere: confirm the background-music licence covers that
  platform, and fill in the Season 2 track title (`<Season 2 track title>`).
  Fill in `<YouTube link>`, `<S2E15 link>` and `<bilibili link>` once the
  uploads are live.
- Chapters: the title card is under 10 s, so it goes in with the next
  chapter. The brand sting belongs to the first chapter.

---

## YouTube (English upload)

**Title** (pick one)

1. Vectors and Covectors: The Riesz Theorem | Spaces, Maps, and Measurements S2E16
2. Is the Gradient Really an Arrow? | Spaces, Maps, and Measurements S2E16
3. Why Steepest Ascent Depends on Your Ruler | Spaces, Maps, and Measurements S2E16

**Description**

```
1907. Frigyes Riesz, a schoolteacher in Hungary, and Maurice Fréchet in Paris publish the same theorem in the same year. It answers a hiker's question: which way is straight uphill? On the map, perpendicular to the contours. But squash the map north to south and perpendicular points somewhere else on the ground. The contours didn't change. The arrow did.

Season 2, episode 16 of Whyme Labs' math series. A 3D hill becomes a contour map, and squashing the map swings the 'uphill' arrow while the contours stay put. Arrows and stacks are different things: a basis can pair them, but bend the basis and the pairing changes. An inner product gives a pairing that doesn't depend on a basis: the Riesz theorem, built on screen from an orthonormal basis and proved unique (two candidates differ by an arrow perpendicular to itself). Change the ruler and the arrow for a fixed stack swings to G⁻¹a. On the hill f = x²y, df = (4, 1) is a stack; the gradient is (4, 1) for the dot product and (1, 1) for G = diag(4, 1). Why 'steepest'? Sweep every unit step: the best one touches the highest sheet, and the unit circle becomes an ellipse when the ruler changes. The adjoint is the round trip stack → pull back → arrow, checked numerically against the transpose. And where Riesz runs out: the arrows for 'evaluate at 0' spike higher with lengths 2, 3, 4, … and on all polynomials no arrow exists.

0:00 1907: the hiker's squashed map
0:41 Arrows and stacks
1:02 The Riesz theorem
1:38 The stack stays, the arrow moves
1:59 The gradient needs a ruler
2:26 Why steepest depends on the ruler
2:53 The adjoint
3:22 Where Riesz runs out
3:47 Next: projection and least squares

Previous episode: Unitary spaces <S2E15 link>
Next: the closest point. Projections, and the line that best fits a cloud of data.

Also in Chinese (中文版): <YouTube ZH link>

Sources: F. Riesz, Sur une espèce de géométrie analytique des systèmes de fonctions sommables, C. R. Acad. Sci. Paris 144 (1907); M. Fréchet, Sur les ensembles de fonctions et les opérations linéaires, same volume (1907); S. Axler, Linear Algebra Done Right, ch. 6–7.
Made by Whyme Labs.
Music: <Season 2 track title>, used under licence.
Fonts: Fraunces, Inter, JetBrains Mono, STIX Two, Noto Sans SC (SIL Open Font License).

#math #linearalgebra #calculus
```

**Tags:** Riesz representation theorem, covector, dual vector, gradient, differential, inner product, metric, adjoint, transpose, steepest ascent, Riesz, Fréchet, linear algebra, math explained

## YouTube (Chinese upload)

**标题**（任选其一）

1. 向量与余向量：里斯表示定理 | 空间、映射与度量 S2E16
2. 梯度真的是一支箭头吗？ | 空间、映射与度量 S2E16
3. 为什么“最陡”取决于你的尺子 | 空间、映射与度量 S2E16

**简介**

```
1907 年。匈牙利的中学教师里斯，和巴黎的弗雷歇，在同一年发表了同一个定理。它回答登山者的问题：哪边是笔直的上坡？在地图上，垂直于等高线。可把地图南北压扁，“垂直”在地面上就指向别处了。等高线没变，变的是箭头。

Whyme Labs 数学系列第二季第 16 集。一座三维的山变成等高线地图，把地图压扁，“上坡”箭头转了，等高线却不动。箭头和薄片是两种东西：一组基能把它们配对，可基一弯，配对就变。内积给出不依赖基的配对：里斯定理，在画面上用标准正交基构造出来，再证明唯一（两个候选之差垂直于自己）。换一把尺，固定薄片对应的箭头转到 G⁻¹a。在山 f = x²y 上，df = (4, 1) 是一叠薄片；用点积梯度是 (4, 1)，用 G = diag(4, 1) 是 (1, 1)。为什么叫“最陡”？把所有单位步都扫一遍：最好的那一步碰到最高的薄片，换尺后单位圆变成椭圆。伴随是“薄片 → 拉回 → 箭头”这一圈，并用数字验证它和转置不同。最后看里斯定理失效的地方：“在 0 处取值”的箭头越来越尖，长度 2、3、4……，在所有多项式上箭头不存在。中文版另加裴秀制图六体。

0:00 1907 年：压扁的地图
0:41 箭头与薄片
1:02 里斯定理
1:38 薄片不动，箭头在转
1:59 裴秀制图六体
2:16 梯度需要一把尺子
2:43 “最陡”取决于尺子
3:10 伴随
3:40 里斯定理失效的地方
4:05 下一集：投影与最小二乘

上一集：酉空间 <S2E15 链接>
下一集：最近的那一点。投影，以及最贴合一团数据的那条直线。

English version: <YouTube EN link>

出处：裴秀《禹贡地域图·序》“制图六体”（《晋书·裴秀传》）；里斯、弗雷歇 (1907)。
Whyme Labs 出品
音乐：<第二季配乐曲名>，已获授权
字体：思源黑体 Noto Sans SC 等（SIL Open Font License）

#数学 #线性代数 #微积分
```

---

## X (x.com), English

**Single post** (with a clip of the contour lines staying put while the uphill arrow swings):

```
Squash a hiking map north to south. The contour lines on the ground don't change. The 'perpendicular to the contours' arrow does.

The gradient isn't really an arrow. It's a stack of sheets, turned into an arrow by a choice of inner product.

<YouTube link>
```

**Thread** (4 posts):

1. `The gradient is not an arrow. Here's what it is. 🧵`
2. `An inner product turns each arrow into a stack of sheets. Riesz (1907): every stack comes from exactly one arrow.`
3. `Change the inner product: the stack stays, the arrow swings. df is the stack; the gradient is df seen through your ruler.`
4. `Same for the adjoint: pull back a stack, turn it into an arrow. It's the transpose only for the dot product. <YouTube link>`

---

## LinkedIn (Whyme Labs page, English)

```
Episode 16 of Season 2, Spaces, Maps, and Measurements: vectors and covectors.

Riesz and Fréchet's 1907 theorem says an inner product pairs every linear measurement (a stack of level sheets) with exactly one vector. The episode uses it to explain why the gradient depends on the choice of metric while the differential doesn't, and why the adjoint of a map equals the transpose only for the standard dot product.

The Chinese edition adds Pei Xiu's six principles of map-making from third-century China.

Watch it here: <YouTube link>

#Mathematics #Education #LinearAlgebra #STEM
```

---

## TikTok, English

**On-screen text, first second:** `The gradient isn't an arrow`

**Caption:**

```
Squash the map: contours stay, the uphill arrow swings. Season 2, part 16.
#math #mathtok #linearalgebra #learnontiktok
```

**Alternative hook:** `Why steepest ascent depends on your ruler`

---

## bilibili（中文）

**标题**（任选其一）

1. 【空间、映射与度量 S2E16】向量与余向量：里斯表示定理
2. 【线性代数·第二季第16集】梯度真的是箭头吗？
3. 【S2E16】裴秀制图六体与“最陡”的方向

**简介**

```
Whyme Labs 数学系列第二季第 16 集。
1907 年里斯和弗雷歇同年发表同一个定理。地图压扁了，等高线不变，上坡箭头却转了。
内积把箭头变成薄片；里斯定理：每叠薄片恰好来自一支箭头。换内积，薄片不动、箭头在转。梯度：df = (4, 1) 是薄片，用点积才是课本梯度。伴随：拉回再变成箭头，只有点积时才是转置。
中文版另加裴秀“制图六体”：分率一歪，图上的直角就对不上，可穿过几条等高线不变。

00:00 1907 年：压扁的地图
00:41 箭头与薄片
01:02 里斯定理
01:38 薄片不动，箭头在转
01:59 裴秀制图六体
02:16 梯度需要一把尺子
02:43 “最陡”取决于尺子
03:10 伴随
03:40 里斯定理失效的地方
04:05 下一集：投影与最小二乘

上一集：酉空间 <B 站 S2E15 链接>
下一集：投影与最小二乘

出处：裴秀《禹贡地域图·序》“制图六体”（《晋书·裴秀传》）；里斯、弗雷歇 (1907)。
音乐：<第二季配乐曲名>，已获授权
字体：思源黑体 Noto Sans SC（SIL Open Font License）
Whyme Labs 出品，自制
```

**标签：** 数学, 科普, 知识, 线性代数, 里斯表示定理, 余向量, 对偶空间, 梯度, 内积, 伴随, 转置, 裴秀, 制图六体, 空间映射与度量

**分区：** 知识 → 科学科普　**类型：** 自制
**分段章节：** 同简介中的时间点
**合集：** 空间、映射与度量（第二季，第 16 集）
**封面：** `thumbnails/png/S2E16-ZH.png`（一叠橙色薄片和垂直伸出的一支黄色箭头，大字“梯度 真的是箭头吗？”）

**动态：** `第二季第 16 集：向量与余向量。梯度到底是箭头还是一叠薄片？顺带看裴秀制图六体。`

---

## 抖音

**画面首秒文字：** `梯度真的是箭头吗？`

**封面：** 横屏用 `thumbnails/cover-4x3/png/S2E16-ZH.png`，切换竖版用 `thumbnails/cover-3x4/png/S2E16-ZH.png`

**标题 / 文案**（任选其一）

1. `梯度其实不是箭头 #数学 #涨知识 #线性代数`
2. `地图压扁了，上坡方向就变了 #数学 #科普 #微积分`
3. `裴秀制图六体：比例一歪直角就错 #数学 #传统文化 #知识科普`

**合集：** 空间、映射与度量（第二季）
**评论区置顶：** `第一季《数是什么？》二十集都在 B 站，搜“数是什么 Whyme Labs”`
