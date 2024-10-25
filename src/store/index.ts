import { defineStore } from 'pinia'
import { login, getRoute } from '@/api/modules/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    userInfo: {
      name: '',
      role: '',
    },
    menubar: {
        menuList: []
    }
  }),
  actions: {
    async loginAction({ username, password }: { username: string; password: string }) {
      try {
        const res = await login({ username, password })
        this.token = res.data.data
        localStorage.setItem('token', res.data.data)
        const routeRes = await getRoute()
        this.menubar.menuList = routeRes.data
      } catch (error) {
        console.error('登录失败:', error)
      }
    },
  },
})
