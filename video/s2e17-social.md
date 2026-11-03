# S2E17 posting kit: Projection and Least Squares / 投影与最小二乘

Season 2, episode 17 of *Spaces, Maps, and Measurements* (《空间、映射与度量》).
Titles, descriptions and captions for each platform, in English and Chinese.
The rules behind them are in
`.claude/skills/whyme-video-script/references/platforms.md`.

- English edition: `out/s2e17-projection-and-least-squares.mp4` (4:07, 16:9)
- Chinese edition: `out/s2e17-zh-tou-ying-yu-zui-xiao-er-cheng.mp4` (4:24, 16:9). It has a scene the English edition
  doesn't: 郭守敬's forty-foot gnomon and his 景符 pinhole at the 登封 observatory.
- Thumbnails: `thumbnails/png/S2E17-EN.png` and `S2E17-ZH.png` (16:9, for
  YouTube and bilibili). Covers: `thumbnails/cover-4x3/png/S2E17-*.png`
  (抖音's cover editor) and `thumbnails/cover-3x4/png/S2E17-*.png`
  (vertical, 抖音 and TikTok).
- Add it to the Season 2 playlist on YouTube and the Season 2 合集 on
  bilibili and 抖音.
- Before posting anywhere: confirm the background-music licence covers that
  platform, and fill in the Season 2 track title (`<Season 2 track title>`).
  Fill in `<YouTube link>`, `<S2E16 link>` and `<bilibili link>` once the
  uploads are live.
- Chapters: the title card is under 10 s, so it goes in with the next
  chapter. The brand sting belongs to the first chapter.

---

## YouTube (English upload)

**Title** (pick one)

1. Projection and Least Squares: The Best Fit Is a Shadow | Spaces, Maps, and Measurements S2E17
2. How Gauss Found Ceres With Least Squares | Spaces, Maps, and Measurements S2E17
3. Why the Best-Fit Line Leaves a Perpendicular Error | Spaces, Maps, and Measurements S2E17

**Description**

```
New Year's night, 1801. Giuseppe Piazzi spots a dot moving among the stars, tracks it for weeks, and loses it in the Sun's glare. His measurements are all slightly off, so no orbit fits them all. The 24-year-old Gauss looks for the orbit that is least wrong instead, the one with the smallest sum of squared misses. In December Ceres was where he said it would be.

Season 2, episode 17 of Whyme Labs' math series. Four points that no line can hit become one arrow above a plane: everything the model can draw. Shine a light straight down and the arrow casts a shadow; the error stands upright. Pythagoras proves the shadow is the closest point. The one-line formula x = a·b / a·a falls out of the right angle, the normal equations AᵀAx = Aᵀb are solved on the data (y = 1.5 + t, misses −½, ½, ½, −½, squares adding to 1), and the projector P is seen as a map with P² = P. Gram–Schmidt peels shadows off three arrows in 3D and fills the triangle R in A = QR. The same peeling turns 1, x, x², x³ into the Legendre polynomials, and the best line for x² on [−1, 1] is the constant ⅓.

0:00 1801: Ceres lost and found
0:43 Four points, no line
1:03 The best fit is a shadow
1:30 Why the shadow is closest
1:53 Projecting onto a line
2:16 The normal equations
2:42 The projector P
3:06 Gram–Schmidt and QR
3:33 Legendre polynomials
3:52 Next: the spectral theorem

Previous episode: Vectors and covectors <S2E16 link>
Next: symmetric maps, and why their axes are always perpendicular.

Also in Chinese (中文版): <YouTube ZH link>

Sources: C. F. Gauss, Theoria motus corporum coelestium (1809); A.-M. Legendre, Nouvelles méthodes pour la détermination des orbites des comètes (1805); G. Strang, Introduction to Linear Algebra, ch. 4; S. Axler, Linear Algebra Done Right, ch. 6.
Made by Whyme Labs.
Music: <Season 2 track title>, used under licence.
Fonts: Fraunces, Inter, JetBrains Mono, STIX Two, Noto Sans SC (SIL Open Font License).

#math #linearalgebra #statistics
```

**Tags:** least squares, projection, orthogonal projection, normal equations, Gram-Schmidt, QR decomposition, Legendre polynomials, linear regression, best fit line, Gauss, Ceres, linear algebra, math explained

## YouTube (Chinese upload)

**标题**（任选其一）

1. 投影与最小二乘：最好的拟合是一个影子 | 空间、映射与度量 S2E17
2. 高斯怎样用最小二乘找回谷神星 | 空间、映射与度量 S2E17
3. 为什么最佳拟合的误差总是垂直的 | 空间、映射与度量 S2E17

**简介**

```
1801 年元旦夜，皮亚齐看见一个在星星间移动的光点，追了几个星期，它钻进太阳的光芒里不见了。每次观测都有一点误差，没有轨道能全都对上。24 岁的高斯换了个问法：找偏差平方和最小的那条轨道。到了十二月，谷神星就在他说的地方。

Whyme Labs 数学系列第二季第 17 集。四个点，没有直线能全都穿过；换个看法，四个高度是一支箭头，模型能画出的直线都落在一个平面上。从正上方打光，箭头投下影子，误差笔直竖着。勾股定理证明影子是最近的点。从直角推出一行公式 x = a·b / a·a；在数据上解法方程 AᵀAx = Aᵀb，得到 y = 1.5 + t，四个偏差 −½、½、½、−½，平方和是 1；投影本身是映射 P，满足 P² = P。格拉姆–施密特在三维里把影子一个个剥掉，剥下的量填成 A = QR 的三角。对函数做同样的事，1、x、x²、x³ 变成勒让德多项式，x² 最好的直线近似是常数 ⅓。中文版另加郭守敬的四丈高表与景符。

0:00 1801 年：谷神星失而复得
0:42 四个点，没有直线
1:03 最好的拟合是影子
1:29 为什么影子最近
1:52 投影到一条直线
2:15 法方程
2:42 投影映射 P
3:05 郭守敬的高表与景符
3:24 格拉姆–施密特与 QR
3:51 勒让德多项式
4:10 下一集：谱定理

上一集：向量与余向量 <S2E16 链接>
下一集：对称映射，以及它的轴为什么总是互相垂直。

English version: <YouTube EN link>

出处：《元史·天文志》郭守敬高表、景符；高斯《天体运动论》(1809)；勒让德 (1805)。
Whyme Labs 出品
音乐：<第二季配乐曲名>，已获授权
字体：思源黑体 Noto Sans SC 等（SIL Open Font License）

#数学 #线性代数 #统计
```

---

## X (x.com), English

**Single post** (with a clip of the arrow casting its shadow onto the plane, the error standing upright):

```
Four points, and no straight line goes through all of them.

Put the four heights together as one arrow. Every line the model can draw lies on a flat plane. The best fit is that arrow's shadow on the plane, and the error stands at a right angle to it.

<YouTube link>
```

**Thread** (4 posts):

1. `Least squares in one picture. 🧵`
2. `Your data is one arrow b. Everything the model can make is a plane. b floats above it.`
3. `The best fit is b's shadow p. The error b − p is perpendicular to the plane, and Pythagoras says no other point is closer.`
4. `Write 'perpendicular to every column of A' as an equation and you get AᵀAx = Aᵀb. <YouTube link>`

---

## LinkedIn (Whyme Labs page, English)

```
Episode 17 of Season 2, Spaces, Maps, and Measurements: projection and least squares.

It starts with Gauss recovering the asteroid Ceres in 1801 and reduces least squares to a single geometric fact: the best fit is the orthogonal projection of the data onto the space the model can reach, and the residual is perpendicular to that space. From there the episode derives the normal equations on a worked example, Gram–Schmidt and A = QR, and the Legendre polynomials.

The Chinese edition adds Guo Shoujing's 13th-century gnomon and pinhole device.

Watch it here: <YouTube link>

#Mathematics #Education #LinearAlgebra #STEM
```

---

## TikTok, English

**On-screen text, first second:** `The best fit is a shadow`

**Caption:**

```
Shine a light on your data: the best fit is its shadow. Season 2, part 17.
#math #mathtok #linearalgebra #learnontiktok
```

**Alternative hook:** `How Gauss found Ceres`

---

## bilibili（中文）

**标题**（任选其一）

1. 【空间、映射与度量 S2E17】投影与最小二乘：最好的拟合是影子
2. 【线性代数·第二季第17集】高斯怎样找回谷神星
3. 【S2E17】郭守敬的高表与最小二乘

**简介**

```
Whyme Labs 数学系列第二季第 17 集。
1801 年谷神星消失在太阳光里，高斯用“偏差平方和最小”把它找了回来。
数据是一支箭头，模型能做的是一个平面，最好的拟合就是箭头的影子，误差垂直于平面。勾股定理、法方程、投影映射 P² = P、格拉姆–施密特与 QR、勒让德多项式。
中文版另加郭守敬的四丈高表与景符。

00:00 1801 年：谷神星失而复得
00:42 四个点，没有直线
01:03 最好的拟合是影子
01:29 为什么影子最近
01:52 投影到一条直线
02:15 法方程
02:42 投影映射 P
03:05 郭守敬的高表与景符
03:24 格拉姆–施密特与 QR
03:51 勒让德多项式
04:10 下一集：谱定理

上一集：向量与余向量 <B 站 S2E16 链接>
下一集：谱定理

出处：《元史·天文志》郭守敬高表、景符；高斯《天体运动论》(1809)；勒让德 (1805)。
音乐：<第二季配乐曲名>，已获授权
字体：思源黑体 Noto Sans SC（SIL Open Font License）
Whyme Labs 出品，自制
```

**标签：** 数学, 科普, 知识, 线性代数, 最小二乘, 投影, 正交投影, 法方程, 格拉姆施密特, QR分解, 勒让德多项式, 线性回归, 高斯, 郭守敬, 空间映射与度量

**分区：** 知识 → 科学科普　**类型：** 自制
**分段章节：** 同简介中的时间点
**合集：** 空间、映射与度量（第二季，第 17 集）
**封面：** `thumbnails/png/S2E17-ZH.png`（一支白色箭头、它在地面上的橙色影子和竖直的绿色虚线，大字“最好的拟合 是一个影子”）

**动态：** `第二季第 17 集：投影与最小二乘。最好的拟合是影子，误差总是垂直的。顺带看郭守敬的四丈高表。`

---

## 抖音

**画面首秒文字：** `最好的拟合，是一个影子`

**封面：** 横屏用 `thumbnails/cover-4x3/png/S2E17-ZH.png`，切换竖版用 `thumbnails/cover-3x4/png/S2E17-ZH.png`

**标题 / 文案**（任选其一）

1. `最小二乘其实就是一个影子 #数学 #涨知识 #线性代数`
2. `高斯怎样找回消失的谷神星 #数学 #科普 #天文`
3. `郭守敬的四丈高表 #数学 #传统文化 #知识科普`

**合集：** 空间、映射与度量（第二季）
**评论区置顶：** `第一季《数是什么？》二十集都在 B 站，搜“数是什么 Whyme Labs”`
