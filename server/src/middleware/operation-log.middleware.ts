import { Context, Next } from 'koa'
import logService from '../modules/log/log.service'

const SENSITIVE_KEYS = [
  'password',
  'pwd',
  'token',
  'authorization',
  'accessToken',
  'refreshToken',
]

const MAX_PARAMS_LENGTH = 2000
const MAX_STRING_LENGTH = 300
const MAX_DEPTH = 2

const isSensitiveKey = (key: string) => {
  const lowerKey = key.toLowerCase()
  return SENSITIVE_KEYS.some((item) => lowerKey.includes(item.toLowerCase()))
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const sanitizeValue = (value: unknown, depth = 0): unknown => {
  if (value === null || value === undefined) return value
  if (depth > MAX_DEPTH) return '[Depth Limit]'

  if (Buffer.isBuffer(value)) {
    return '[Binary]'
  }

  if (value instanceof Date) {
    return value.toISOString()
  }

  if (Array.isArray(value)) {
    return value.slice(0, 20).map((item) => sanitizeValue(item, depth + 1))
  }

  if (isRecord(value)) {
    const result: Record<string, unknown> = {}
    Object.keys(value).forEach((key) => {
      if (isSensitiveKey(key)) {
        result[key] = '[MASKED]'
        return
      }
      result[key] = sanitizeValue(value[key], depth + 1)
    })
    return result
  }

  if (typeof value === 'string' && value.length > MAX_STRING_LENGTH) {
    return value.slice(0, MAX_STRING_LENGTH) + '...'
  }

  return value
}

const serializeParams = (value: unknown) => {
  if (value === undefined) return ''
  try {
    const text = JSON.stringify(value)
    if (text.length > MAX_PARAMS_LENGTH) {
      return text.slice(0, MAX_PARAMS_LENGTH) + '...'
    }
    return text
  } catch (error) {
    return String(value)
  }
}

const getBodyUsername = (body: unknown) => {
  if (!isRecord(body)) return ''
  return typeof body.username === 'string' ? body.username : ''
}

const getResponseCode = (body: unknown, fallback: number) => {
  if (!isRecord(body)) return fallback
  return typeof body.code === 'number' ? body.code : fallback
}

const shouldLog = (ctx: Context) => {
  if (ctx.method === 'OPTIONS') return false
  if (ctx.path.startsWith('/public')) return false
  return true
}

export const operationLogger = () => {
  return async (ctx: Context, next: Next) => {
    const startedAt = Date.now()

    try {
      await next()
    } finally {
      if (!shouldLog(ctx)) return

      const requestParams = {
        query: ctx.query || {},
        body: sanitizeValue(ctx.request.body),
      }

      const fallbackUsername = getBodyUsername(ctx.request.body)

      const payload = {
        userId: ctx.user?.id ?? null,
        username: ctx.user?.username ?? fallbackUsername,
        method: ctx.method,
        path: ctx.path,
        status: getResponseCode(ctx.body, ctx.status),
        ip: ctx.ip,
        userAgent: ctx.headers['user-agent'] || '',
        requestParams: serializeParams(requestParams),
        duration: Date.now() - startedAt,
      }

      logService.createLog(payload).catch((error) => {
        console.log(error)
      })
    }
  }
}
