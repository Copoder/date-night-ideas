# 写实图片生成交接

当前站点的图片问题不是“再找几张情侣图”可以解决的。正式标准是：**每条 Idea 和每个站点入口都要有一张能一眼认出活动、且能看出两个人正在约会的写实图。**

## 交付清单

- 300 条 Idea：`assets/idea-image-generation-plan.json`
- 300 条 JSONL prompts：`assets/idea-image-generation-prompts.jsonl`
- 首页、15 个分类和社交分享图：`assets/site-image-generation-prompts.jsonl`
- 每条 brief 都指定了活动、情侣关系、构图、3:2 比例、负面约束和目标路径。

## 统一视觉要求

- `photorealistic-natural`，像真实生活方式杂志或纪录式生活摄影。
- 默认 exactly two adults；通过共同注意、自然距离和正在进行的动作表达情侣关系，不要摆拍接吻或婚纱照式姿势。
- 活动必须在图中进行：不要用咖啡杯代表咖啡约会、风景代表徒步、棋盘特写代表两个人在玩游戏。
- 普通、可实现的衣服和环境；保留皮肤、织物、木材、食物等真实纹理。
- 禁止文字、水印、品牌、孤立物件、空风景、无关活动、过度磨皮、插画和 3D 渲染。
- Idea 图统一 3:2；首页 hero 12:7；社交图 1.91:1。

## 生成和验收流程

1. 用 `idea-image-generation-plan.json` 的 `ideaSlug` 作为文件名，生成到 `assets/generated-idea-images/`。
2. 每张图先人工回答两题：不看标题能否说出活动？是否能看出两个人在共享一次约会？任一答案为否就退回重做。
3. 确认后运行：

   ```bash
   npm run images:install -- --reviewed assets/generated-idea-images
   ```

4. 该命令只安装已显式标记 reviewed 的图，统一转换成 `public/images/ideas/<slug>.webp`；未生成的 Idea 继续使用临时活动组图，不会出现 broken image。
5. 重新运行 `npm run verify`、`npm run images:contact-sheet` 和浏览器 QA，检查桌面与移动端裁切。

站点级入口图的当前文件仍保留授权记录，但 `visualStatus` 为 `replacement_required`；替换后必须同步更新来源/生成记录和 `imageCredits.json`，不能让旧的免费图片署名继续指向新生成图。
