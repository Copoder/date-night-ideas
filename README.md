# Date Night Ideas

> 项目路径：`/Users/tonghou/WebsiteProject/date-night-ideas`

交互式约会灵感站：对标 [dinner-ideas.net](https://dinner-ideas.net)，点选问答后给出 3 条图文建议（可刷新）。SEO 主攻 `date night ideas`。

| 项 | 定稿 |
|----|------|
| 域名 | `date-night-ideas.com`（用户注册） |
| 代码 | 全新独立仓库；不复用 `dinner-ideas` 的代码、内容或设计资产 |
| 内容 | 分类主题库 = 300；网络调研 + 逐条独立编辑增值 |
| 图片 | AI 生成 + **免费无版权风险**实拍（非付费商用图） |
| 状态 | **产品与功能可上线 · 视觉素材待逐条验收** | 

## 文档

| 文档 | 路径 |
|------|------|
| **PRD v1.1.4（产品定义已确认）** | [docs/PRD.md](./docs/PRD.md) |
| **上线验收报告** | [memory/launch-readiness-2026-07-19.md](./memory/launch-readiness-2026-07-19.md) |
| Date Night 主题审查 | [memory/ceo-review-date-night-fit-2026-07-19.md](./memory/ceo-review-date-night-fit-2026-07-19.md) |
| **问答调研（定稿）** | [docs/research-picker-qa.md](./docs/research-picker-qa.md) |
| 文案规范 | [docs/editorial-guidelines.md](./docs/editorial-guidelines.md) |
| 主题库 Schema | [spec/spec-data-date-idea-schema.md](./spec/spec-data-date-idea-schema.md) |
| 图片需求清单 | [assets/image-requirements.json](./assets/image-requirements.json) |
| 内容研究收据 | [assets/content-research-sources.json](./assets/content-research-sources.json) |
| 逐条写实图片计划 | [assets/idea-image-generation-plan.json](./assets/idea-image-generation-plan.json) |
| 图片批处理 prompts | [assets/idea-image-generation-prompts.jsonl](./assets/idea-image-generation-prompts.jsonl) |
| 首页与分类图片 prompts | [assets/site-image-generation-prompts.jsonl](./assets/site-image-generation-prompts.jsonl) |
| 写实图片生成交接 | [docs/image-generation-handoff.md](./docs/image-generation-handoff.md) |

## 本地运行与上线检查

```bash
npm install
npm run dev
npm run verify
```

`npm run verify` 会依次检查类型、推荐算法、300 条内容及分类配额、图片文件与授权台账、生产构建、canonical/meta/sitemap/robots。生产文件输出到 `dist/`，可部署到任意静态托管平台。

`npm run content:research` 会重新访问 12 个允许访问的公开研究来源，只保存状态、标题、访问时间、体积、可见字数和内容哈希，不保存或复制来源正文。已有研究收据是发布审计的一部分。

可选环境变量见 [`.env.example`](./.env.example)：`PUBLIC_GA_ID` 为空时不加载分析脚本，`PUBLIC_ADS_ENABLED=false` 时不请求广告资源。

图片需求、用途、生成提示词、负面提示词、来源与授权统一记录在 [assets/image-requirements.json](./assets/image-requirements.json)。300 条 Idea 的逐条写实图片 brief 在 [assets/idea-image-generation-plan.json](./assets/idea-image-generation-plan.json)；生成后先放入 [assets/generated-idea-images](./assets/generated-idea-images)，逐张对照 Idea 审核，再运行 `npm run images:install -- --reviewed assets/generated-idea-images`，最后执行完整检查。
