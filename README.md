# 辩论计时器（DebateTimer）

跨平台（Windows / macOS / Linux）的辩论赛计时器，面向学校多媒体教室：单屏全屏、浅色简洁界面、内置多套辩论赛流程并支持自定义，提示音用 Web Audio 实时合成（不依赖任何音频文件）。

技术栈：Tauri 2 + SvelteKit（SPA 模式，`ssr = false`）+ Svelte 5 runes + Tailwind 4。`src/core/` 是纯 TypeScript，零框架零 Tauri 依赖，可独立单测。

## 开发

```bash
npm install
npm run tauri dev     # 启动桌面应用（首次会编译 Rust，较慢）
npm test              # 运行 core 层单测
npm run check         # 类型检查
```

> 本机 `pnpm` 因 corepack 报错不可用，统一使用 `npm`。

## 快捷键

| 键 | 动作 |
|---|---|
| 空格 | 开始 / 暂停当前环节 |
| Enter / → | 下一环节 |
| Backspace / ← | 上一环节 |
| R | 重置当前环节 |
| Tab | 自由辩论切换发言方 |
| + / − | 当前环节 ±10 秒（Shift 为 ±60 秒） |
| 1–9 | 跳到第 N 个环节 |
| T | 修改辩题 |
| F11 / F | 全屏切换 |
| H | 快捷键帮助 |
| Esc | 关闭弹窗 / 退出编辑 |

改辩题或改时长时，输入框内的单键快捷键会被自动屏蔽（Esc 除外），避免误启停计时。

## 内置赛制

`四辩制（大学常见）`、`新加坡模式（四人制）`、`三人制（中学）`、`奥瑞冈制（五·四·四）`、`四辩制（精简版，时长待复核）`、`空白自定义`。

辩论赛**没有全国统一的计时标准**（"剩 30 秒提示"只是行业惯例），各校差异很大，因此所有时长与提示点都可以在「赛制」面板里改，改内置模板时会自动另存为自定义副本。

时长来源：
- 四辩制（大学）· 三人制（中学）：各校公开的赛制文件
- 新加坡模式：https://wikis.pro/新加坡制
- 奥瑞冈五·四·四：https://zhuanlan.zhihu.com/p/645628336
- 四辩制精简版：来源为搜索摘要，原始 .doc 未抓取成功，**数字待现场复核**

## 计时准确性

- 剩余时间由**绝对截止时间戳**计算，不做 tick 累加，因此没有累积漂移。
- 提示点预先算成绝对时间戳，掉帧或系统休眠后一次性补触发，不会漏报。
- 权威时钟是**墙钟 `Date.now()`**：`performance.now()` 不计系统休眠时间，以它为准会让电脑睡几分钟后计时器凭空多出时间。墙钟回拨时退回 `performance.now()` 兜底。

## 打包

```bash
npm run tauri build
```

通常在哪个系统上构建就产出哪个系统的安装包（交叉编译需要额外配置 CI）。Windows 目标机器需 WebView2（Win10 1803+ 系统自带，否则需随包安装运行时）。字体已本地打包，教室无网络也能正常显示。

## 项目结构

```
src/core/         纯 TypeScript 领域层：计时引擎、赛制、提示音、快捷键、存储（零框架依赖，Vitest 覆盖）
src/lib/          Svelte 5 runes 状态桥接，把 core 包成响应式
src/components/   视图组件
src-tauri/        桌面壳配置与 Rust 入口
docs/plans/       三套候选方案对比与实施计划
```

## 开源协议

代码使用 **GNU General Public License v3.0**，见 [`LICENSE`](LICENSE)。

内置字体 Plus Jakarta Sans 使用 **SIL Open Font License 1.1**，与本项目代码分开授权，协议全文见 [`static/fonts/OFL.txt`](static/fonts/OFL.txt)。
