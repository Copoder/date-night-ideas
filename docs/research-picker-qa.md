# 市场调研：Picker 问题 & 答案设计

| 字段 | 内容 |
|------|------|
| 关联产品 | Date Night Ideas |
| 版本 | **v1.0（定稿）** |
| 日期 | 2026-07-19 |
| 目的 | 为点选决策流定题：问什么、怎么问、选项文案 |
| 状态 | 已与 PRD v1.0 对齐；暂不开工 |

---

## 1. 调研来源

| 来源类型 | 代表 | 学到什么 |
|----------|------|----------|
| 决策 App | DateNight（Play）、SoulPlan、Connected、PlanMyDate、DeftBrain | 筛选项高度重合：预算 / vibe / 关系阶段 / 在家或外出 / 时长 / 天气 / 安全边界 |
| SEO 内容站 | Fabulessly Frugal、MarryMeBrands、101 Planners、Money Saving Mom | 用户按**分类意图**搜，不是按「随机灵感」搜 |
| 对标站 | dinner-ideas.net | 少步数、单选点按、硬限制不破、结果固定 3 条 |
| People Also Ask / 常见标题 | at home / cheap / first date / married / fall / games | Spoke 预填必须对齐这些维度 |

---

## 2. 用户真实决策维度（频次综合）

按「决定是否采纳一条约会」的影响力排序：

| 优先级 | 维度 | 用户心里的话 | 是否进主流程 |
|--------|------|--------------|--------------|
| P0 | 在哪 | 在家还是出门？ | ✅ 必问 |
| P0 | 预算 | 今晚能不能花钱？ | ✅ 必问 |
| P0 | 氛围 vibe | 想放松、玩、还是浪漫？ | ✅ 必问 |
| P0 | 关系阶段 | 第一次？恋爱中？已婚有娃？ | ✅ 必问（影响安全/尺度） |
| P1 | 可用时间 | 1 小时还是整晚？ | ✅ 建议问 |
| P1 | 精力/体力 | 累到只能沙发 vs 想动一动 | ✅ 可与 vibe 或独立一步合并 |
| P1 | 硬限制 | 不喝酒 / 孩子在家 / 只能室内 / 不想准备 | ✅ 最后一步多选 |
| P2 | 天气 | 下雨怎么办 | ❌ v1 不做（无城市/实况）；用 indoor 硬限制兜 |
| P2 | 城市 POI | 附近餐厅 | ❌ 非目标 |
| P2 | 对方兴趣档案 | SoulPlan 式 profile | ❌ 过重，不做 |

**结论：** 主流程 **5 步单选 + 1 步可选硬限制**，与 dinner 站「约 30–60 秒」同量级；不做 10+ 题心理测验。

---

## 3. 竞品问题对照

### 3.1 DateNight App

- City、Budget（$–$$$）、Vibe（chill/playful/romantic/classy/adventurous）
- Activity level、Time of day、Relationship stage
- Weather、Safety（public / alcohol / spice）

→ **可借鉴：** vibe 枚举、关系阶段、安全边界  
→ **可砍：** 城市、天气、classy（与 romantic 重叠，合并）

### 3.2 Connected

- Vibe：cozy / adventurous / cultural / playful  
- Budget、Duration、Home vs Out  
- 库规模宣传 300+ anywhere ideas  

→ **可借鉴：** cozy≈chill；cultural 可并入 adventurous 或单独 tag，不必单独成题

### 3.3 DeftBrain DateNight

- Budget slider、Date type（casual/romantic/adventurous/first/anniversary/stay-in）、City  
- Dealbreakers、Avoid repeat  

→ **可借鉴：** first / anniversary / stay-in 是**场景**，可映射到关系阶段 + location，不必单独 6 个 date type 单题

### 3.4 SEO 站分类（= Spoke 与预填来源）

高频分类（应成为内容 taxonomy + 预填映射）：

1. At home  
2. Cheap / free  
3. Romantic  
4. First date  
5. Married / long-term / parents  
6. Outdoor / adventure  
7. Games / conversation cards  
8. Seasonal（fall / winter / Valentine）  
9. Unique / creative  
10. Daytime vs night（次要）

---

## 4. 推荐主流程（定稿草案）

> 原则：每步一眼能懂；选项 3–5 个；文案口语化；硬限制单独收口。

### Step 1 — Who is this for?（关系阶段）

| 选项 ID | 展示文案 | 副文案 |
|---------|----------|--------|
| `first` | First date | Keep it easy and public-friendly |
| `dating` | Dating / new-ish | Fun, low pressure |
| `longterm` | Together a while | Married, engaged, or long-term |
| `parents` | Parents on a clock | Kids at home or limited window |

**为何独立 `parents`：** SEO 与内容站大量「married with kids / after bedtime」需求；与 longterm 体验差异大（噪音、时长、出门难度）。

### Step 2 — Stay in or go out?

| 选项 ID | 展示文案 | 副文案 |
|---------|----------|--------|
| `home` | At home | Cozy, no commute |
| `out` | Out & about | Leave the house |
| `either` | Surprise me on place | You’re flexible |

### Step 3 — What’s the budget?

| 选项 ID | 展示文案 | 副文案 |
|---------|----------|--------|
| `free` | Free | $0 on purpose |
| `low` | Under ~$30 | Cheap & doable |
| `mid` | $30–$80 | Nice but not wild |
| `high` | Splurge | Make it special |

### Step 4 — What vibe?

| 选项 ID | 展示文案 | 副文案 |
|---------|----------|--------|
| `chill` | Chill / cozy | Low energy, soft night |
| `playful` | Playful / fun | Laughs and games |
| `romantic` | Romantic | Closer, warmer |
| `adventurous` | Adventurous | Try something new |

### Step 5 — How much time?

| 选项 ID | 展示文案 | 副文案 |
|---------|----------|--------|
| `short` | Under 1 hour | Quick reset |
| `medium` | 1–3 hours | Classic date night |
| `long` | Half day or more | Slow & spacious |

### Step 6（可选）— Any hard limits?（多选，可跳过）

| 选项 ID | 展示文案 |
|---------|----------|
| `noAlcohol` | No alcohol |
| `kidFriendly` | Kid-friendly / kid-safe |
| `indoorOnly` | Indoor only |
| `lowPrep` | Low prep (minimal setup) |
| `publicFriendly` | Public / first-date safe |
| `none` | No hard limits |

**跳过 = 无硬限制。**（定稿：可跳过，不强制逐项确认）

### 额外入口（非步骤）

- **Surprise me**：跳过 1–5，用多样性采样出 3 条  
- **Spoke 预填**：见 §6，进入时可跳过已填步骤或显示为已选可改  
- **结果刷新**：固定 3 条；Refresh 在同一答案下再抽一组（尽量不与上一组完全重复）

---

## 5. 为什么不这样问（反模式）

| 反模式 | 原因 |
|--------|------|
| 「你们爱什么菜系/电影类型？」开放兴趣题 | 决策变慢，库要爆炸式标签 |
| 10+ 题心理测验 | 完成率崩；对标 dinner 是秒级决策 |
| 一上来问城市 | 偏离产品边界（无 POI） |
| Vibe 选项超过 6 个 | 选择困难，选项语义重叠 |
| 把「季节」做成必问 | 多数用户不在乎；用内容 season 字段 + Spoke 预填即可 |

---

## 6. Spoke 预填映射（问答 ↔ SEO）

| Spoke URL 意图 | 预填 |
|----------------|------|
| at-home-date-night-ideas | location=`home` |
| cheap-date-night-ideas / free | budget=`free` 或 `low` |
| romantic-date-night-ideas | vibe=`romantic` |
| first-date-ideas | relationship=`first` + 建议勾选 `publicFriendly` |
| date-night-ideas-for-married-couples | relationship=`longterm` |
| date-night-ideas-for-parents | relationship=`parents` |
| outdoor / adventure | location=`out` + vibe=`adventurous` |
| date-night-games | vibe=`playful` + tag 偏好 `games` |
| fall / winter / valentine | season 过滤加权（可不占一步问题） |

---

## 7. 结果页文案规则（Why it fits）

每条结果必须用**用户刚选的答案**生成 1 句理由，例如：

> “Fits an **at-home**, **low-budget**, **romantic** night in about **1–3 hours**.”

禁止空泛：「Great for couples!」

---

## 8. 已确认（定稿）

| 议题 | 决策 |
|------|------|
| Step 1 Parents | **保留** |
| Step 6 硬限制 | **可跳过** |
| 结果条数 | **固定 3 条**，支持刷新再抽一组 |

---

## 变更记录

| 版本 | 日期 | 说明 |
|------|------|------|
| v0.1 | 2026-07-19 | 初版市场调研 + 问题草案 |
| v1.0 | 2026-07-19 | 定稿对齐 PRD：Parents / 可跳过硬限制 / 3 条可刷新 |
