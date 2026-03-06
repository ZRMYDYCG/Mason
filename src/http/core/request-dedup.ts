import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from 'axios'
import type { HttpPlugin } from './plugin.ts'

/**
 * 请求防重插件
 * 负责防止重复请求，复用已有请求的结果
 */
export class RequestDedup implements HttpPlugin {
  // 存储正在进行的请求
  private pendingSet: Set<string>

  constructor() {
    this.pendingSet = new Set<string>()
  }

  /**
   * 生成请求的唯一标识
   */
  private generateKey(config: AxiosRequestConfig): string {
    const { url, method, params, data } = config
    return `${method || 'GET'}-${url}-${JSON.stringify(params || {})}-${JSON.stringify(data || {})}`
  }

  /**
   * 应用插件到 Axios 实例
   */
  public apply(instance: AxiosInstance): void {
    instance.interceptors.request.use((config: AxiosRequestConfig) => {
      if (!(config as any).disableDedup) {
        const key = this.generateKey(config)
        if (this.pendingSet.has(key)) {
          throw new axios.Cancel('Duplicate request canceled.')
        }
        this.pendingSet.add(key)
      }
      return config as any
    })
    // 响应拦截器：清理请求
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const key = this.generateKey(response.config)
        this.pendingSet.delete(key)
        return response
      },
      (error: AxiosError) => {
        if (axios.isCancel(error)) {
          console.warn('请求已取消', error.message)
        } else {
          if (error.config) {
            const key = this.generateKey(error.config)
            this.pendingSet.delete(key)
          }
        }
        return Promise.reject(error)
      },
    )
  }
}
