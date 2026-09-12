<p align="center">
  <img src="./src/assets/images/logo-wordmark.png" width="220" alt="Mason Logo" />
</p>

<h1 align="center">Mason Admin</h1>

<p align="center">
  基于 <b>Vue 3</b>、<b>TypeScript</b>、<b>Element Plus</b> 的现代化中后台管理系统，配套 <b>NestJS</b> 后端，打通前后端开发流程，开箱即用。
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.4-42b883?style=flat-square&logo=vue.js" />
  <img src="https://img.shields.io/badge/TypeScript-5+-3178C6?style=flat-square&logo=typescript" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Element_Plus-2.7-409EFF?style=flat-square" />
  <img src="https://img.shields.io/badge/NestJS-10-E0234E?style=flat-square&logo=nestjs" />
  <img src="https://img.shields.io/badge/Prisma-6-2D3748?style=flat-square" />
  <img src="https://img.shields.io/badge/version-1.0.9-blue?style=flat-square" />
</p>

| 资源 | 地址 |
| --- | --- |
| 文档 | [https://mason.versakit.online](https://mason.versakit.online) |
| 在线预览（Mock） | [http://admin.dev.versakit.online/login](http://admin.dev.versakit.online/login) |
| 源码 | [github.com/ZRMYDYCG/Mason](https://github.com/ZRMYDYCG/Mason) |

预览账号：`Mason` / `123456`（超级管理员）、`Coder` / `123456`（普通用户）

---

## 技术栈

| 层 | 技术 |
| --- | --- |
| 前端 | Vue 3 · Vite 6 · TypeScript · Element Plus · Pinia · Vue Router · Tailwind CSS 4 · PostCSS |
| 后端 | NestJS · Prisma · MySQL · Redis · JWT（RSA）· CASL |
| 工程化 | ESLint 9 · Prettier · Stylelint · Lefthook · Commitlint · Commitizen · Plop · Vitest |

---

## 功能概览

- **RBAC 权限**：账号 / 角色 / 菜单 / 部门，前后端分离鉴权，细粒度到菜单与按钮
- **布局与主题**：多标签页、可折叠侧边栏、亮色 / 暗色主题、动态路由与多级菜单
- **业务能力**：登录加密、七天登录、操作日志、个人中心、内嵌页面、页面重载
- **可视化**：数据大屏（vue-echarts）、`useEcharts` 封装
- **组件与工具**：表格 / 表单、富文本、流程图、图片裁剪、水印、Toast / Dialog 等
- **国际化**：vue-i18n（简体中文 / English）
- **代码生成**：基于 Plop 的组件 / 视图 / Store 模板

更多说明见 [在线文档](https://mason.versakit.online)。

---

## 快速开始

### 环境要求

- Node.js 20+
- pnpm 9+
- Docker（用于本地 MySQL / Redis，可选）

### 1. 克隆与安装

```bash
git clone https://github.com/ZRMYDYCG/Mason.git
cd Mason
pnpm install
```

### 2. 启动后端

```bash
cd backend
pnpm install
cp .env.example .env
docker compose up -d          # 启动 MySQL + Redis
pnpm prisma:migrate           # 或本地开发用：pnpm db:push
pnpm prisma:seed
pnpm dev                      # 默认 http://localhost:8000
```

默认账号：

| 用户名 | 密码 | 角色 |
| --- | --- | --- |
| `Mason` | `123456` | 超级管理员 |
| `Coder` | `123456` | 普通用户 |

更多后端说明见 [`backend/README.md`](./backend/README.md)。

### 3. 启动前端

```bash
# 在仓库根目录
pnpm dev                      # 默认 http://localhost:5173
```

开发环境通过 Vite 代理将 `/api` 转发到 `http://localhost:8000`（见 `.env.development`）。

### 常用命令

```bash
pnpm build          # 生产构建
pnpm preview        # 预览构建产物
pnpm lint           # ESLint
pnpm test           # Vitest
pnpm new            # Plop 代码生成
pnpm commit         # Commitizen 规范提交
```

---

## 目录结构

```text
Mason/
├── src/                 # 前端源码
│   ├── api/             # 接口请求
│   ├── components/      # 通用组件
│   ├── hooks/           # 组合式函数
│   ├── Layout/          # 布局
│   ├── router/          # 路由
│   ├── store/           # Pinia
│   ├── views/           # 页面
│   └── ...
├── backend/             # NestJS 后端
│   ├── prisma/          # 数据模型与种子
│   └── src/             # 业务模块
├── plop-templates/      # 代码模板
└── public/              # 静态资源
```

---

## 组合函数

| Hook | 说明 |
| --- | --- |
| `useTheme` | 主题切换 |
| `useEcharts` | ECharts 封装 |
| `useTable` | 表格数据加载、分页、排序、防抖查询 |
| `useResizable` | 拖拽调整尺寸 |
| `useCurrentInstance` | 统一获取当前组件实例 |

---

## 设计说明

系统设置相关模块（账号、角色、菜单、部门）与权限走前后端分离；其余演示页可按本地 / Mock 方式扩展。线上 [Mock 预览](http://admin.dev.versakit.online/login) 便于快速体验界面与交互。

新业务模板分支：[template](https://github.com/ZRMYDYCG/Mason/tree/template)

---

## 贡献

1. Fork 并创建分支
2. `pnpm install` → `pnpm dev`
3. 提交 PR（建议使用 `pnpm commit` 规范提交信息）

问题与建议欢迎提 [Issue](https://github.com/ZRMYDYCG/Mason/issues)。

---

## License

详见仓库 LICENSE 文件。
