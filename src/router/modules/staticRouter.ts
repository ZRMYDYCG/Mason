/*
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description:
 */
interface IObject<T> {
  [index: string]: T
}

import type { RouteRecordRaw } from 'vue-router'

const components: IObject<() => Promise<typeof import('*.vue')>> = {
  Layout: () => import('@/Layout/index.vue'),
  Workplace: () => import('@/views/Dashboard/WorkPlace/index.vue'),
  Login: () => import('@/views/Login/index.vue'),
  401: () => import('@/views/ErrorPage/401.vue'),
  404: () => import('@/views/ErrorPage/404.vue'),
}

export const staticRouter: Array<RouteRecordRaw> = [
  {
    name: 'Dashboard',
    path: '/',
    component: components['Layout'],
    redirect: '/Dashboard/WorkPlace',
    meta: {
      title: '仪表盘',
      icon: 'Odometer',
    },
    children: [
      {
        name: 'WorkPlace',
        path: '/Dashboard/WorkPlace',
        component: components['WorkPlace'],
        meta: {
          title: '工作台',
          icon: 'HelpFilled',
        },
      },
    ],
  },
  {
    name: 'ErrorPage',
    path: '/ErrorPage',
    component: components['Layout'],
    redirect: '/ErrorPage/401',
    meta: {
      title: '错误页面',
      icon: 'WarnTriangleFilled',
    },
    children: [
      {
        name: '401',
        path: '/ErrorPage/401',
        component: components['401'],
        meta: {
          title: '401',
          icon: 'Lock',
        },
      },
      {
        name: '404',
        path: '/ErrorPage/404',
        component: components['404'],
        meta: {
          title: '404',
          icon: 'CloseCircleFilled',
        },
      },
    ],
  },
  {
    name: 'Login',
    path: '/Login',
    component: components['Login'],
    meta: {
      title: '登录',
      icon: 'UserOutlined',
      hidden: true,
    },
  },
]
