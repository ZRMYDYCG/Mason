import { HOME_URL, LOGIN_URL } from '@/config'
import type { RouteRecordRaw } from 'vue-router'
import { initDynamicRouter } from './dynamicRouter'
import { useAuthStore } from '@/store/modules/auth'
import { useUserStore } from '@/store/modules/user'
import { createRouter, createWebHistory } from 'vue-router'
import { useSettingStore } from '@/store/modules/setting'

import NProgress from '@/utils/nprogress'
// import { ElLoading } from 'element-plus'

// let loadingInstance: ReturnType<typeof ElLoading.service> | null = null

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: HOME_URL
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue'),
    meta: {
      titleKey: 'route.login'
    }
  },
  {
    path: '/layout',
    redirect: HOME_URL, // 重定向主页
    name: 'layout',
    component: () => import('@/Layout/index.vue'),
    children: [
      // -----非全屏页面动态引入-----
    ]
  },
  // -----全屏页面引入-----

  // -----错误页面引入-----
  {
    path: '/403',
    name: '403',
    component: () => import('@/components/ErrorMessage/403.vue'),
    meta: {
      title: '403页面',
      titleKey: 'route.error403'
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/components/ErrorMessage/404.vue'),
    meta: {
      title: '404页面',
      titleKey: 'route.error404'
    }
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/components/ErrorMessage/500.vue'),
    meta: {
      title: '500页面',
      titleKey: 'route.error500'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/components/ErrorMessage/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach(async (to, from, next) => {
  const settingStore = useSettingStore()
  const userStore = useUserStore()
  const authStore = useAuthStore()
  const hasSession = Boolean(userStore.userInfo?.id)

  // nprogress 启动
  if (settingStore.showNprogress) NProgress.start()

  // 全屏 loading 启动
  // if (authStore.authMenuList.length === 0) {
  //   loadingInstance = ElLoading.service({
  //     lock: true,
  //     background: 'rgba(0, 0, 0, 0)'
  //   })
  // }

  if (to.path.toLocaleLowerCase() === LOGIN_URL) {
    if (hasSession) return next(from.fullPath)
    resetRouter()
    return next()
  }

  if (!hasSession) return next({ path: LOGIN_URL, replace: true })

  // 如果没有菜单列表，就重新请求菜单列表并添加动态路由
  if (!authStore.authMenuListGet.length) {
    const flag = await authStore.getAuthMenuList()

    if (flag) {
      // 动态加载路由
      await initDynamicRouter()
      // loadingInstance?.close()

      return next({ ...to, replace: true })
    }
    userStore.clearSession()
    resetRouter()
    return next({ path: LOGIN_URL, replace: true })
  }
  next()
})

/**
 * @description 重置路由（全部清除）
 * */
export const resetRouter = () => {
  const authStore = useAuthStore()
  authStore.flatMenuListGet.forEach((route: any) => {
    const { name } = route
    if (name && router.hasRoute(name)) router.removeRoute(name)
  })
}

/**
 * @description 路由跳转错误
 * */
router.onError((error) => {
  const settingStore = useSettingStore()
  if (settingStore.showNprogress) NProgress.done()
  console.warn('路由错误', error.message)
})

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
  const settingStore = useSettingStore()

  if (settingStore.showNprogress) NProgress.done()
})

export default router
