import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'


export const routes: Array<RouteRecordRaw> = [
    {
        name: 'Dashboard',
        path: '/',
        component: () => import('@/Layout/index.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router