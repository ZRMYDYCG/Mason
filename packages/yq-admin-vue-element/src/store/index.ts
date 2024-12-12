/*
 * @Author: ZRMYDYCG
 * @Date: 2024-11
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-11
 * @Description:
 */
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
// pinia persist
pinia.use(piniaPluginPersistedstate)

export default pinia
