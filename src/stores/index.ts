import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import type { App } from 'vue'

const pinia = createPinia()

// 使用持久化插件
// 该插件会自动将状态保存到 localStorage，默认 key 为 store 名称
pinia.use(piniaPluginPersistedstate)

/**
 * 安装 Pinia
 * @param app 应用实例
 */
export const installPinia = (app: App) => {
  app.use(pinia)
}

export default pinia
