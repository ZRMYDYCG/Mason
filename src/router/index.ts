/*
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description:
 */
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    name: 'Dashboard',
    path: '/',
    component: () => import('@/Layout/index.vue'),
    children: [],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
