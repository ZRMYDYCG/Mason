# Mason Backend Nest Migration

NestJS backend for the Mason admin API. It keeps the Koa API paths and response envelope intact: `{ code, data, msg }`, no `/api` prefix, and `APP_PORT=8000`.

## Setup

```bash
cd backend
pnpm install
cp .env.example .env
docker compose up -d
pnpm prisma:migrate
pnpm prisma:seed
pnpm dev
```

If you do not use migrations yet, `pnpm db:push && pnpm prisma:seed` is fine for local development.

The seed is maintained from the current frontend routes under `src/views/**/index.vue`, then adds the Nest permission tables. Default users:

| Username | Password | Role |
| --- | --- | --- |
| `Mason` | `123456` | Super admin |
| `Coder` | `123456` | Normal user |

## Environment

`DATABASE_URL` must match the MySQL settings:

```env
DATABASE_URL=mysql://root:123456@localhost:3306/mason-db
APP_PORT=8000
REDIS_HOST=localhost
REDIS_PORT=6379
```

RSA keys are generated on `pnpm install` into `src/config/keys`. To preserve existing token continuity, copy compatible `private-key.pem` and `public-key.pem` there before starting the app.

## Compatibility Notes

Intentional differences from Koa:

| Item | Koa | Nest |
| --- | --- | --- |
| Upload | `POST /upload/single` was anonymous | Requires login |
| Seed passwords | Could be plain text | Always bcrypt |
| Captcha storage | In-memory Map | Redis with 5 minute TTL |
| Permissions | No tables | `sys_permission` and `sys_role_permission` |
| ORM | Sequelize sync | Prisma |

Development CORS currently mirrors Koa-style openness with `origin: '*'`. Production should restrict this to the real frontend origin and keep credentials behavior explicit.

## Validation Checklist

1. Login, logout, and cookie refresh behavior.
2. User, role, menu, and department CRUD.
3. Role menu assignment.
4. Captcha generation and verification via Redis.
5. Operation log list and delete.
6. Upload should fail while logged out and succeed while logged in.
