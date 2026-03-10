import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import type { HttpPlugin } from './plugin.ts'
import type { RetryConfig } from './types.ts'
import { HttpErrorType } from './types.ts'

/**
 * 请求重试插件
 * 负责自动重试失败的请求
 */
export class RequestRetry implements HttpPlugin {
  private config: RetryConfig

  constructor(config: RetryConfig = {}) {
    this.config = {
      maxAttempts: 3,
      delay: 1000,
      exponentialBackoff: true,
      retryableStatusCodes: [429, 500, 502, 503, 504],
      retryableErrorTypes: [HttpErrorType.NETWORK_ERROR, HttpErrorType.CONNECTION_ABORTED],
      ...config,
    }
  }

  /**
   * 生成重试延迟时间
   */
  private getDelay(attempt: number): number {
    if (this.config.exponentialBackoff) {
      return this.config.delay! * Math.pow(2, attempt - 1)
    }
    return this.config.delay!
  }

  /**
   * 判断是否可重试
   */
  private isRetryable(error: AxiosError): boolean {
    // 如果是取消请求就不要重试
    if (error.code === 'ECONNABORTED' && error.message.includes('canceled')) {
      return false
    }

    // 检查错误类型
    if (error.code && this.config.retryableErrorTypes!.includes(error.code)) {
      return true
    }

    // 检查状态码
    if (error.response?.status && this.config.retryableStatusCodes!.includes(error.response.status)) {
      return true
    }

    return false
  }

  /**
   * 应用插件到 Axios 实例
   */
  public apply(instance: AxiosInstance): void {
    instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const config = error.config as AxiosRequestConfig & { _retryAttempts?: number }

        // 检查是否可重试
        if (!config || !this.isRetryable(error)) {
          return Promise.reject(error)
        }

        // 初始化重试次数
        config._retryAttempts = config._retryAttempts || 0

        // 检查是否达到最大重试次数
        if (config._retryAttempts >= this.config.maxAttempts!) {
          return Promise.reject(error)
        }

        // 增加重试次数
        config._retryAttempts++

        // 计算延迟时间
        const delay = this.getDelay(config._retryAttempts)

        // 延迟后重试
        await new Promise(resolve => setTimeout(resolve, delay))

        // 重新发送请求
        return instance(config)
      },
    )
  }
}
