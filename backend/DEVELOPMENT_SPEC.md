# Mason Backend：Koa → Nest 1:1 迁移开发规范

> 本文档由产品/架构 grilling 决策固化，记录迁移期约定。  
> **状态（2026-09-12）**：Nest 已落地于 `/backend`；旧 Koa `/server` 已移除。  
> 工作分支：`nest`。

---

## 1. 一句话目标

将 `server/` 中已挂载的 Koa 管理端 API **行为与契约 1:1** 迁移到 `backend/` 的 NestJS，技术栈为 **Nest + Zod + Prisma + MySQL + Redis + Docker（仅基础设施）**；授权使用 **CASL**（不上手搓 Guard 逻辑），权限码预置但 **首版 enforcement 与现网等价**。

---

## 2. 已锁定决策总表

| ID | 主题 | 选择 | 含义 |
|----|------|------|------|
| Q1 | 1:1 边界 | **A** | 路径、入参、响应 `{ code, data, msg }`、Cookie/JWT、业务错误码全保留（含多数错误 HTTP 200、鉴权失败真 401） |
| Q2 | RBAC | **C** | 上库，不手搓；语义先对齐现网 |
| Q3 | 代码位置 | **`backend/`** | Nest 写在仓库根 `backend/`，不覆盖 `server/` |
| Q4 | 数据模型 | **A** | Prisma 1:1 映射现表（`sys_*`） |
| Q5 | Redis | **A** | 首用：验证码存储（替换内存 Map） |
| Q6 | 授权库 | **A** | **CASL**（`@casl/ability` + `@casl/prisma`） |
| Q7 | 权限表达 | **B** | 每 API 预置权限码；种子里非超管授「与现网相同」的宽权限；超管全开 |
| Q8 | 旧 Koa | **A → 已完成** | 迁移期曾保留 `server/`；迁移完成后已删除 |
| Q9 | Zod | **A** | `nestjs-zod`（或等价）：DTO=Zod，Pipe 校验，错误映射进现有信封 |
| Q10 | Docker | **A** | Compose：**MySQL + Redis**；Nest 本机跑 |
| Q11 | 包形态 | **C** | `backend` **独立** `package.json`；暂不进根 pnpm workspace |
| Q12 | 权限表 | **A** | 新表 `sys_permission` + `sys_role_permission`；菜单表不动 |
| Q13 | 权限码 | **A** | `resource:action`（如 `user:list`）；CASL `can(action, subject)` 由码映射 |
| Q14 | 鉴权材料 | **A** | Cookie 名、RS256、PEM 与 Koa 一致，可复用密钥 |
| Q15 | 安全债 | **B** | 上传加登录鉴权；seed 密码 bcrypt；偏差写入说明 |
| Q16 | Prisma 来源 | **C** | 有库则 `db pull`，再与 Sequelize models / `init.sql` 对拍补齐（如 `sys_log`） |
| Q17 | 验收 | **A** | 前端原样连 backend，手工点通全流程（不做契约双跑） |
| Q18 | MySQL | **C** | Compose MySQL + 导入现有数据（`init.sql` 或 dump） |
| Q19 | CORS | **C** | 开发期与 Koa 一样 `origin: '*'`；文档标明生产须收紧 + credentials |
| Q20 | 范围外 | **A** | 不做 Socket.IO / Swagger / 智谱等未挂路由能力 |
| Q21 | 端口 | **A** | **`APP_PORT=8000`**，前端 `VITE_PROXY` 不改 |
| Q22 | 节奏 | **B** | **一次性做齐全部模块**再联调（接口面小） |

---

## 3. 技术栈与版本取向

| 层 | 选型 | 备注 |
|----|------|------|
| 运行时 | NestJS（建议当前稳定大版本） | 独立包 `backend/` |
| 校验 | Zod + nestjs-zod | 禁止首版用 class-validator 双轨 |
| ORM | Prisma | 替代 Sequelize；`synchronize` 禁止用于生产心智，用 migrate |
| DB | MySQL | 库名等与现环境对齐（示例：`mason-db`） |
| 缓存 | Redis | 仅验证码；用 ioredis 或 @nestjs-modules/ioredis |
| 授权 | CASL + @casl/prisma | Guard + AbilityFactory；能力从角色权限码构建 |
| 鉴权 | JWT RS256 | Cookie `access_token` + `Authorization: Bearer` 双通道 |
| 容器 | docker-compose | 仅 `mysql` + `redis` |
| 包管理 | pnpm（backend 目录内） | 不加入根 `pnpm-workspace` packages（除非后续共享 zod） |

环境变量以 `server/.env.example` 为基线对齐，并新增 Redis：

```env
APP_HOST=localhost
APP_PORT=8000
MYSQL_DATABASE=mason-db
MYSQL_USER=root
MYSQL_PASSWORD=123456
MYSQL_HOST=localhost
MYSQL_PORT=3306
REDIS_HOST=localhost
REDIS_PORT=6379
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin
ADMIN_NAME=Administrator
TEST_USERNAME=test
TEST_PASSWORD=test
TEST_NAME=TestUser
```

密钥：RSA PEM 放在 `backend` 内（路径可 `src/config/keys/`），**格式与生成脚本对齐** `server/scripts/generate-keys.js` / `copy-keys.js`；支持从 `server` 拷贝已有密钥以保持 token 连续。

---

## 4. 目录与仓库约定

```
Mason/
├── backend/                 # Nest 后端（唯一后端）
│   ├── docker-compose.yml   # mysql + redis
│   ├── prisma/
│   ├── src/
│   ├── package.json         # 独立包
│   └── DEVELOPMENT_SPEC.md  # 本文件
└── src/                     # Vue 前端；代理 http://localhost:8000
```

- 旧 `server/`（Koa）已删除，勿再恢复为双后端。  
- **禁止**为迁就后端去改前端 API 路径/信封（除非发现前端 bug 并单独说明）。  
- 根目录 `pnpm-workspace.yaml` 当前主要用于 `allowBuilds`；**不要**强行把 frontend/backend 合成复杂 monorepo，除非另开决策。

---

## 5. API 契约（必须 1:1）

### 5.1 响应信封

- 成功/业务失败主体：`{ code, data?, msg }`  
- **多数业务错误：HTTP 状态仍为 200**，用 body `code` 区分（对齐 Koa `errorHandler`）。  
- **鉴权失败（无/无效 token）：HTTP 401**（对齐 `verifyAuth`）。  
- `UNPERMISSION` 等在 Koa 中映射为 **401 语义的业务码**时，保持与 `server` 一致（不要擅自改成 403，除非对照源码确认）。

### 5.2 路由清单（全部实现，无前缀 `/api`）

| 模块 | 方法与路径 | 现网鉴权 | Nest 首版鉴权 |
|------|------------|----------|---------------|
| auth | `POST /register` | 无 | 无 |
| auth | `POST /login` | 无 | 无 |
| auth | `POST /logout` | 无 | 无 |
| auth | `GET /test` | verifyAuth | JWT + 对应 permission（宽授） |
| user | `POST /user/list` | auth | 同上 |
| user | `POST /user/add` | auth + Joi/user 中间件 | auth + Zod + permission |
| user | `POST /user/update-profile` | auth | 同上 |
| user | `POST /user/update` | auth | 同上 |
| user | `POST /user/delete` | auth | 同上 |
| user | `GET /user/:userId` | auth | 同上 |
| role | `POST /role/list` | auth | 同上 |
| role | `POST /role/listAll` | auth | 同上 |
| role | `POST /role/add` | auth + verifyRole | 同上 |
| role | `POST /role/update` | auth | 同上 |
| role | `POST /role/delete` | auth | 同上 |
| role | `POST /role/useMenus` | auth | 同上 |
| menu | `POST /menu/list` | auth | 同上 |
| menu | `POST /menu/listAll` | auth | 同上 |
| menu | `POST /menu/add` | auth + **verifySuper** | JWT + **需超管等价 permission**（仅超管角色拥有） |
| menu | `POST /menu/update` | auth + verifySuper | 同上 |
| menu | `POST /menu/delete` | auth + verifySuper | 同上 |
| department | `POST /department/listAll` | auth | 宽授 |
| department | `POST /department/add\|update\|delete` | auth + verifySuper | 仅超管码 |
| captcha | `GET /captcha/graphic\|arithmetic\|slider\|rotate\|click` | 无 | 无 |
| captcha | `POST /captcha/verify` | 无 | 无；答案存 **Redis** |
| log | `POST /log/list` | auth | 宽授 |
| log | `POST /log/delete` | auth | 宽授 |
| upload | `POST /upload/single` | **现网无鉴权** | **必须 verifyAuth**（Q15=B，刻意偏差） |
| static | `GET /public/*` | 无 | `ServeStatic` 挂载同等路径 |

几乎全部写操作为 **POST**（非 REST 化）；**不要**改成 PUT/DELETE。

### 5.3 登录/Token

- 密码：`bcrypt` 比对。  
- JWT payload：`{ id, username }`，RS256，过期 `7d` 或 `24h`（对齐 `expires7d`）。  
- Set-Cookie：`access_token`，httpOnly，sameSite 等与 Koa 对齐。  
- 登录响应 body：**不含 token 字符串**，含 `{ id, username, expires }`。  
- 校验顺序：Bearer **或** Cookie。

### 5.4 业务硬规则（对照 `server` 源码保留）

- 用户多角色关联存在，但业务多取 `roles[0]` / 第一角色。  
- 保护：用户 id `1`；角色 id `1`/`2` 删除限制；非超管不可操作 `isSuper` 角色等——**以 `server` 实现为准逐条移植**。  
- 注册默认 `roleId: 2`、`deptId: 1` 等魔法数保持。  
- 操作日志中间件/拦截器行为对齐（字段、写入时机）。  
- 菜单 list 需容忍前端可能带的尾斜杠。

---

## 6. 数据层

### 6.1 现有表（Prisma 1:1）

至少：

- `sys_user`（paranoid / soft delete）  
- `sys_role`（含 `is_super`）  
- `sys_user_role`  
- `sys_menu`  
- `sys_role_menu`  
- `sys_department`  
- `sys_log`（`init.sql` 可能缺失，须在 schema/migrate 中补齐）

字段命名：DB snake_case，Prisma 可用 `@map`；**表名、列名与现库一致**，保证可接已有数据。

### 6.2 新增表（Q12）

- `sys_permission`：权限定义（建议字段：`id`, `code` 唯一如 `user:list`, `name`, `resource`, `action`, timestamps…）  
- `sys_role_permission`：角色↔权限 M2M  

**不**改 `sys_menu` 结构；菜单仍只服务前端路由。

### 6.3 Schema 流程（Q16 + Q18）

1. `docker-compose` 起 MySQL，导入 `server/init.sql`（及必要补丁，如 `sys_log`）。  
2. `prisma db pull` 生成基线。  
3. 与 `server/src/models/*` 对拍，补关联、软删、缺表。  
4. 手写加入 permission 两表 + migrate。  
5. Seed：部门/角色/用户/菜单/role_menu **对齐现逻辑**，但 **密码必须 bcrypt**（Q15）；写入 permission 与 role_permission。

### 6.4 权限种子策略（Q7 + Q13）

- 码格式：`resource:action`（例：`user:list`, `user:add`, `menu:add`, `department:delete`…）。  
- **超管角色（`is_super=1`）**：拥有全部 permission。  
- **普通角色（如 `user`）**：授予所有「现网仅 verifyAuth 即可访问」的码；**不授予** 现网 `verifySuper` 的码（`menu:add|update|delete`, `department:add|update|delete`）。  
- CASL：登录后加载用户角色权限码 → `Ability`；Guard 校验当前路由绑定的 code。  
- 路由装饰器示例意向：`@CheckPermission('user:list')`（具体 API 名可自定，但必须集中映射表，禁止散落魔法字符串无注册）。

---

## 7. CASL 集成要求

- 使用 AbilityFactory：根据用户 permission codes 构建规则。  
- HTTP Guard 统一鉴权；**禁止**在各处手写 `if (!isSuper) throw` 作为主路径（超管可通过拥有全部码或 `manage all` 表达，但码表仍要存在）。  
- `@casl/prisma`：若列表需按权限过滤再启用；首版以 **路由级** 校验为主（与现网一致，不做行级过滤除非现网已有）。  
- `is_super` 仍保留在角色表，用于业务规则（如不可编辑超管角色）及种子；**接口放行以 permission/CASL 为准**。

---

## 8. Redis 与验证码

- Compose 服务 `redis`；app 配置 `REDIS_*`。  
- 所有 captcha 类型的 challenge/答案写入 Redis，带 TTL（对齐原内存逻辑的有效期；若无明确 TTL，选合理短 TTL 如 5 分钟并在说明中写明）。  
- 多实例下 verify 必须仍可用。  
- **首版不用 Redis 做 session/token 黑名单**（未决策开启）。

---

## 9. Docker

`backend/docker-compose.yml` 最小集：

- `mysql`：端口映射 `3306`，初始化挂载 `backend/docker/init/...`。  
- `redis`：`6379`。  
- **不含** Nest 容器（本机 `pnpm dev`）。

文档中注明生产 CORS 应收紧为前端 origin + `credentials: true`。

---

## 10. Zod / 校验

- 每个写接口与关键列表 DTO 用 Zod schema。  
- 校验失败映射进现有错误码/信封，对照 Joi 失败时的 `code/msg`。  
- 从 `server` 移植 schema 语义（`user.dto.ts`、role/menu/department/log 内联 Joi）。

---

## 11. 刻意偏差清单（必须在 README 写明）

| 项 | Koa | Nest | 原因 |
|----|-----|------|------|
| 上传 | 可匿名 `POST /upload/single` | **需登录** | Q15 安全 |
| Seed 密码 | 可能明文写入 | **bcrypt** | Q15；与 login 一致 |
| 验证码存储 | 内存 Map | **Redis** | Q5 |
| 权限表 | 无 | **新增** permission 表 | Q7/Q12；行为仍 1:1 |
| ORM | Sequelize sync | Prisma migrate | 栈升级 |

除此以外 **不得** 擅自改路径、字段名、信封、端口。

---

## 12. 明确不做（Q20）

- Socket.IO / 实时  
- Swagger / OpenAPI UI（除非后续另开）  
- 智谱等 AI SDK  
- 前端改版、权限管理 UI（DB 有码即可；管理界面非首版）  
- monorepo 共享包、Casbin、换端口、契约自动 diff 测试  

---

## 13. 实现清单（一次性交付，Q22=B）

Agent 应按下列顺序推进，但 **联调前必须全部完成**：

1. **工程骨架**：Nest app、配置模块、日志、全局信封与异常滤镜（200+code / 401）。  
2. **Docker + env**：compose、`.env.example`、README 启动步骤。  
3. **Prisma**：pull/对拍/permission 迁移、seed（bcrypt + 权限宽授）。  
4. **Keys + Auth**：RSA、Cookie+Bearer、login/register/logout/test。  
5. **CASL**：AbilityFactory、Permission Guard、码↔路由绑定表。  
6. **Redis + Captcha**：五类 GET + verify。  
7. **业务模块**：user、role、menu、department、log、upload、static `/public`。  
8. **操作日志**：对齐 middleware 行为。  
9. **README**：启动、偏差表、生产 CORS 提示。  

对照源码入口：

- 路由聚合：`server/src/router/index.ts`  
- 中间件：`server/src/middleware/*`  
- 模块：`server/src/modules/*`  
- 模型：`server/src/models/*`  
- 同步种子：`server/src/config/sync.ts`  
- 错误：`server/src/constant` + `app` errorHandler  

---

## 14. 验收标准（Q17=A）

前端不改代理（`VITE_PROXY=http://localhost:8000`），仅启动 `backend` 替代 `server`，手工验证：

1. 登录 / 登出 / 刷新后 Cookie 仍有效  
2. 用户、角色、菜单、部门 CRUD 与列表（超管 vs 普通用户差异与现网一致）  
3. 角色菜单分配  
4. 验证码获取与校验（可重启 API 进程后仍应能走 Redis）  
5. 操作日志列表/删除  
6. 上传（**未登录应失败**；登录后成功，URL 可访问 `/public/...`）  

验收通过定义：上述流程无阻断，且与 Koa 在权限档位上表现一致（普通用户不能做菜单/部门 CUD）。

---

## 15. 给实现 Agent 的硬约束

1. **先读**本规范与 `server` 对应模块，再写代码；行为以 `server` 为准，规范冲突时：**契约 1:1 > 规范笔误**，并注明。  
2. 不要手搓 RBAC；权限必须走 CASL + 码表。  
3. 旧 `server/` 已删除；唯一后端为 `backend/`。  
4. 不要改前端业务代码来迁就后端（上传需登录除外，前端若匿名上传需适应 401——若发现前端依赖匿名上传，在 PR 说明并最小改前端或提 blocker）。  
5. 完成时在 `backend/README.md` 给出：安装、compose up、migrate、seed、dev、偏差表。  

---

## 16. 决策溯源（问答摘要）

- 完美 1:1 契约；CASL 上库；代码在 `backend/`；Prisma 映旧表；Redis 验证码。  
- 权限码预置 + 新表；`resource:action`；密钥 Cookie 与 Koa 一致。  
- 上传强制登录 + seed bcrypt；Prisma pull 对拍；手工前端验收。  
- Compose MySQL 导数据 + Redis；CORS 开发 `*`、生产收紧；跳过未用能力；端口 8000；**模块一次性做齐**。

---

**规范版本**：2026-09-12  
**状态**：已对齐，可作为实现输入。若需变更，先更新本文件再改代码。
