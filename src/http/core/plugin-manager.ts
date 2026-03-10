import type { AxiosInstance } from 'axios'
import type { HttpPlugin } from './plugin'

/**
 * 插件管理器
 * 负责管理和应用 HTTP 插件
 */
export class PluginManager {
    private plugins: HttpPlugin[] = []

    /**
     * 注册插件
     * @param plugin HTTP 插件
     */
    public register(plugin: HttpPlugin): void {
        this.plugins.push(plugin)
    }

    /**
     * 应用所有插件到 Axios 实例
     * @param instance Axios 实例
     */
    public applyAll(instance: AxiosInstance): void {
        this.plugins.forEach((plugin) => plugin.apply(instance))
    }

    /**
     * 清除所有插件
     */
    public clear(): void {
        this.plugins = []
    }
}