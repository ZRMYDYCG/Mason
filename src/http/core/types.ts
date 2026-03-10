import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

/**
 * 通用响应结构
 */
export interface ApiResp<T = any> {
    code: number
    message: string
    data: T
}

/**
 * 分页请求结构
 */
export interface PageReq {
    pageNum: number
    pageSize: number
}

/**
 * 分页响应数据结构
 */
export interface PageData<T> {
    list: T[]
    total: number
}

/**
 * 拦截器配置
 */
export interface InterceptorConfig {
  request?: {
    onFulfilled?: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>
    onRejected?: (error: AxiosError) => any
  }
  response?: {
    onFulfilled?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>
    onRejected?: (error: AxiosError) => any
  }
}


/**
 * HTTP请求客户端配置
 */
export interface HttpClientConfig {
    // 请求基础路径
    baseURL?: string
    // 超时时间
    timeout?: number
    // 公共请求头
    headers?: Record<string, string>
    // 拦截器配置
    interceptor?: InterceptorConfig
    // 是否开启请求取消
    enableCancel?: boolean
    // 是否开启请求防重
    enableDedup?: boolean
    // 是否开启请求重试
    enableRetry?: boolean
    // 重试配置
    retryConfig?: RetryConfig

    // 后期其他配置可以继续拓展
}

/**
 * HTTP错误类型常量
 */
export const HttpErrorType = {
    NETWORK_ERROR: 'ERR_NETWORK',
    CONNECTION_ABORTED: 'ECONNABORTED',
    BAD_REQUEST: 'ERR_BAD_REQUEST',
    UNAUTHORIZED: 'ERR_UNAUTHORIZED',
    FORBIDDEN: 'ERR_FORBIDDEN',
    NOT_FOUND: 'ERR_NOT_FOUND',
    SERVER_ERROR: 'ERR_BAD_RESPONSE',
} as const

export type HttpErrorTypeValue = typeof HttpErrorType[keyof typeof HttpErrorType]

/**
 * 重试配置
 */
export interface RetryConfig {
    maxAttempts?: number // 最大重试次数
    delay?: number // 间隔多久重试
    exponentialBackoff?: boolean // 是否开启指数退避
    retryableStatusCodes?: number[] // 允许重试的HTTP响应状态码数组
    retryableErrorTypes?: (string | HttpErrorTypeValue)[] // 允许重试的错误类型数组
}