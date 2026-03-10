import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios'
import type { HttpPlugin } from './plugin.ts'

/**
 * 请求取消器插件
 * 负责管理和取消请求
 */
export class RequestCanceler implements HttpPlugin {
  // 存储取消器的映射表
  private cancelMap: Map<string, AbortController>

  constructor() {
    this.cancelMap = new Map()
  }

  /**
   * 生成请求的唯一标识
   */
  private generateKey(config: AxiosRequestConfig): string {
    const { url, method, params, data } = config
    return `${method || 'GET'}-${url}-${JSON.stringify(params || {})}-${JSON.stringify(data || {})}`
  }

  /**
   * 添加请求到取消器映射表
   * @param config 请求配置
   */
  public add(config: AxiosRequestConfig): void {
    // 先取消之前相同的请求
    this.remove(config)

    const key = this.generateKey(config)
    const controller = new AbortController()

    config.signal = controller.signal
    this.cancelMap.set(key, controller)
  }

  /**
   * 取消请求并从映射表中移除
   */
  public remove(config: AxiosRequestConfig): void {
    const key = this.generateKey(config)
    if (this.cancelMap.has(key)) {
      const controller = this.cancelMap.get(key)
      controller?.abort()
      this.cancelMap.delete(key)
    }
  }

  /**
   * 取消所有请求
   */
  public clear(): void {
    this.cancelMap.forEach((controller) => {
      controller.abort()
    })
    this.cancelMap.clear()
  }

  /**
   * 应用插件到 Axios 实例
   * @param instance Axios 实例
   */
  public apply(instance: AxiosInstance): void {
    // 请求拦截器：添加请求到取消器
    instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        this.add(config)
        return config as any
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    // 响应拦截器：从取消器中移除请求
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        this.remove(response.config)
        return response
      },
      (error: AxiosError) => {
        if (error.config) {
          this.remove(error.config)
        }
        return Promise.reject(error)
      }
    )
  }
}
