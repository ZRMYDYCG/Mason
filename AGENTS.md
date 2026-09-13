# Mason — Agent 指南

面向 AI / 开发者的项目索引与约定。改代码前先读本文件，再按需深入对应目录。

## 项目概览

Mason 是 Vue 3 管理后台 + NestJS API 的全栈模板。

| 层 | 技术 | 入口 / 端口 |
| --- | --- | --- |
| 前端 | Vue 3 · Vite 6 · TypeScript · Element Plus · Pinia · Tailwind 4 | 根目录 `pnpm dev` → 默认 `5173`（见 `VITE_PORT`） |
| 后端 | NestJS 10 · Prisma 6 · MySQL · Redis · CASL | `backend/` `pnpm dev` → `8000` |
| 包管理 | pnpm 9+ · Node 20+ | 根目录与 `backend/` 各自 `pnpm install` |

- 前端路径别名：`@` → `src/`
- 开发代理：`/api` → 后端（去掉 `/api` 前缀），配置在 `.env.development` + `vite.config.ts`
- API 响应信封：`{ code, data, msg }`（后端无 `/api` 前缀）
- 系统模块（账号 / 角色 / 菜单 / 部门 / 日志）走真实后端；其余演示页可用 Mock（`VITE_MOCK`）

默认账号：`Mason` / `123456`（超管），`Coder` / `123456`（普通用户）

---

## 仓库目录

```text
Mason/
├── AGENTS.md                 # 本文件：Agent 索引
├── README.md                 # 人类可读快速开始
├── package.json              # 前端脚本与依赖
├── vite.config.ts            # Vite / 代理 / 插件
├── vercel.json               # 前端部署
├── plop-templates/           # `pnpm new` 代码生成模板
├── public/                   # 静态资源（品牌、地图 geojson 等）
├── src/                      # 前端源码
└── backend/                  # NestJS 后端（独立 package）
```

---

## 前端 `src/` 目录

| 路径 | 职责 |
| --- | --- |
| `api/` | Axios 封装（`index.ts`）与业务接口（`modules/`） |
| `api/interface/` | 请求 / 响应类型 |
| `api/modules/` | `login` · `system` · `captcha` · `dashboard` · `visualization` · `mason-ai` |
| `assets/` | 图片等静态资源 |
| `components/` | 通用组件（table、toast、loading、watermark、app-icon…） |
| `config/` | 前端配置 |
| `directives/` | 全局指令 |
| `hooks/` | 组合式函数（见下表） |
| `language/` | vue-i18n |
| `layout/` | 布局与布局子组件 |
| `mdx/` | MDX 文档相关 |
| `mock/` | MockXHR；`VITE_MOCK=true` 时启用 |
| `plugins/` | 如 ECharts 注册 |
| `router/` | 路由；`dynamicRouter.ts` 动态路由 |
| `store/` | Pinia；`modules/` 为各 store |
| `styles/` | design tokens、主题、工具类、动画 |
| `typings/` | 全局类型 |
| `utils/` | 工具（含 crypto、storage） |
| `views/` | 页面（按业务分子目录，页面多为 `index.vue`） |
| `main.ts` | 应用启动：Pinia → Router → Element Plus → i18n |
| `App.vue` | 根组件 |

### 页面 `views/` 速查

| 目录 | 说明 |
| --- | --- |
| `login/` | 登录 |
| `dashboard/` | 仪表盘 |
| `system/` | 系统管理：账号、角色、菜单、部门、日志 |
| `features/` | 演示：验证码、viewer、瀑布流 |
| `visualization/` | 可视化大屏 |
| `menu/` | 多级菜单演示 |
| `document/` · `component-docs/` · `changelog/` · `about/` · `legal/` | 文档 / 说明类 |
| `vue-directive/` · `local-svg/` · `jump-confirmation/` | 其它演示页 |

### Hooks

| Hook | 文件 | 用途 |
| --- | --- | --- |
| `useTheme` | `hooks/useTheme.ts` | 主题 |
| `useEcharts` | `hooks/useEcharts.ts` | ECharts |
| `useTable` | `hooks/useTable.ts` | 表格加载 / 分页 / 排序 / 防抖查询 |
| `useResizable` | `hooks/useResizable.ts` | 拖拽改尺寸 |
| `useCurrentInstance` | `hooks/useCurrentInstance.ts` | 当前实例 |

### Pinia stores（`store/modules/`）

`auth` · `user` · `global` · `setting` · `tabs` · `keepAlive` · `view` · `formGenerator`

---

## 后端 `backend/` 目录

| 路径 | 职责 |
| --- | --- |
| `prisma/` | `schema.prisma`、migrations、`seed.ts`（种子对齐前端 `src/views/**/index.vue` 路由） |
| `docker/` · `docker-compose.yml` | 本地 MySQL + Redis |
| `scripts/` | RSA 密钥生成 / 拷贝等 |
| `public/` | 上传等静态文件（`/public`） |
| `src/main.ts` | Nest 启动 |
| `src/app.module.ts` | 模块装配 |

### 业务模块（`backend/src/`）

| 模块 | 说明 |
| --- | --- |
| `auth/` | 登录 / 登出 / Cookie 刷新 |
| `user/` · `role/` · `menu/` · `department/` | 系统 CRUD |
| `captcha/` | 验证码（Redis，TTL 5 分钟） |
| `upload/` | 上传（需登录） |
| `log/` | 操作日志 + `OperationLogInterceptor` |
| `casl/` | 权限能力 |
| `prisma/` · `redis/` · `config/` | 基础设施 |
| `common/` | 如 `ResponseInterceptor`（统一 `{ code, data, msg }`） |

更细的兼容说明见 [`backend/README.md`](./backend/README.md)。

---

## 常用命令

```bash
# 前端（仓库根）
pnpm install
pnpm dev                 # 开发
pnpm build               # 生产构建
pnpm lint / pnpm test    # ESLint / Vitest
pnpm new                 # Plop 生成页面 / 组件 / store
pnpm commit              # Commitizen 规范提交

# 后端（backend/）
pnpm install
cp .env.example .env
docker compose up -d
pnpm prisma:migrate      # 或本地：pnpm db:push
pnpm prisma:seed
pnpm dev
```

---

## Agent 约定

1. **改动范围**：只改任务相关文件；不顺手大重构、不擅自改无关配置。
2. **前后端边界**：系统权限与 CRUD 改 `backend/` + 对应 `src/api/modules` + `src/views/system`；纯演示页优先前端 / Mock。
3. **风格一致**：沿用现有 Vue SFC、Nest module 结构、命名与导入风格；前端用 `@/` 别名。
4. **环境变量**：不要提交真实密钥；参考 `.env.development`、`backend/.env.example`。RSA 密钥在 `backend/src/config/keys`（`postinstall` 生成）。
5. **提交信息**：conventional commits（`feat` / `fix` / `refactor` / `docs` / `chore` 等，见 `commitlint.config.cjs`）；仅在用户明确要求时执行 `git commit`。
6. **新页面 / 组件**：优先 `pnpm new`（Plop），或对齐现有 `views/**/index.vue` 与 `components/` 组织方式。
7. **权限与菜单**：后端种子依赖前端路由页面；增减系统菜单时同步考虑 `prisma/seed.ts` 与菜单管理数据。
8. **生产注意**：`main.ts` 中 Pinia 须先于 Router 注册；Vite `dedupe` 已处理多份 vue/pinia。CI / Vercel 会跳过 imagemin 等重型插件。

---

## 相关文档

- [README.md](./README.md) — 快速开始与预览
- [backend/README.md](./backend/README.md) — 后端环境、兼容差异、验证清单
- [CHANGELOG.md](./CHANGELOG.md) — 版本变更
