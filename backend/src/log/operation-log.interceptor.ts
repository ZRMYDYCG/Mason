import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Request } from 'express'
import { Observable, tap } from 'rxjs'
import { CurrentUser } from '../auth/current-user.decorator'
import { LogService } from './log.service'

const SENSITIVE_KEYS = ['password', 'pwd', 'token', 'authorization', 'accessToken', 'refreshToken']
const MAX_PARAMS_LENGTH = 2000
const MAX_STRING_LENGTH = 300
const MAX_DEPTH = 2

type AuthedRequest = Request & {
  user?: CurrentUser
}

type LogResponseBody = {
  code?: number
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const sanitizeValue = (value: unknown, depth = 0): unknown => {
  if (value === null || value === undefined) return value
  if (depth > MAX_DEPTH) return '[Depth Limit]'
  if (Buffer.isBuffer(value)) return '[Binary]'
  if (value instanceof Date) return value.toISOString()
  if (Array.isArray(value)) return value.slice(0, 20).map((item) => sanitizeValue(item, depth + 1))
  if (isRecord(value)) {
    const result: Record<string, unknown> = {}
    for (const key of Object.keys(value)) {
      result[key] = SENSITIVE_KEYS.some((item) => key.toLowerCase().includes(item.toLowerCase()))
        ? '[MASKED]'
        : sanitizeValue(value[key], depth + 1)
    }
    return result
  }
  if (typeof value === 'string' && value.length > MAX_STRING_LENGTH) {
    return `${value.slice(0, MAX_STRING_LENGTH)}...`
  }
  return value
}

const serializeParams = (value: unknown) => {
  try {
    const text = JSON.stringify(value)
    return text.length > MAX_PARAMS_LENGTH ? `${text.slice(0, MAX_PARAMS_LENGTH)}...` : text
  } catch {
    return String(value)
  }
}

const getBodyCode = (body: unknown) => {
  if (isRecord(body) && typeof body.code === 'number') return body.code
  return 200
}

@Injectable()
export class OperationLogInterceptor implements NestInterceptor {
  constructor(private readonly logService: LogService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<AuthedRequest>()
    const startedAt = Date.now()
    return next.handle().pipe(
      tap({
        next: (body) => this.write(req, body, startedAt),
        error: (error: { bodyCode?: number }) =>
          this.write(req, { code: error?.bodyCode ?? 404 } satisfies LogResponseBody, startedAt)
      })
    )
  }

  private write(req: AuthedRequest, body: unknown, startedAt: number) {
    if (req.method === 'OPTIONS' || req.path?.startsWith('/public')) return
    const usernameFromBody =
      isRecord(req.body) && typeof req.body.username === 'string' ? req.body.username : ''
    this.logService
      .createLog({
        userId: req.user?.id ?? null,
        username: req.user?.username ?? usernameFromBody,
        method: req.method,
        path: req.path,
        status: getBodyCode(body),
        ip: req.ip,
        userAgent: req.headers['user-agent'] || '',
        requestParams: serializeParams({ query: req.query || {}, body: sanitizeValue(req.body) }),
        duration: Date.now() - startedAt
      })
      .catch(() => undefined)
  }
}
