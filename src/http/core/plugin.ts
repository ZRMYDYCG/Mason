import type { AxiosInstance } from 'axios'

/**
 * HTTP 插件接口
 * 所有网络请求相关额功能都将作为插件及实现该接口
 */
export interface HttpPlugin {
    /**
     * 应用插件到 Axios 实例
     * @param instance Axios 实例
     */
    apply(instance: AxiosInstance): void
}