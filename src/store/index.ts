/*
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description:
 */
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { login, getRoute } from '@/api/modules/user'
import type { IMenubarList } from '@/config/interface'
import { generatorDynamicRouter } from '@/router/modules/asyncRouter'

export const useUserStore = defineStore('user', {
  state: (): any => ({
    token: localStorage.getItem('token') || '',
    userInfo: {
      name: '',
      role: '',
    },
    menubar: {
      menuList: [],
    },
    router: useRouter(),
  }),
  actions: {
    async loginAction({
      username,
      password,
    }: {
      username: string
      password: string
    }) {
      try {
        const res = await login({ username, password })
        this.token = res.data.data
        localStorage.setItem('token', res.data.data)
        await this.generateRoutes()
        this.router.push('/')
      } catch (error) {
        console.error('登录失败:', error)
      }
    },
    setRoutes(data: Array<IMenubarList>): void {
      this.menubar.menuList = data
    },
    async generateRoutes() {
      const res = await getRoute()
      generatorDynamicRouter(res.data.data)
    },
  },
})
