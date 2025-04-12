import http from '@/api'
import { Login } from '@/api/interface'
import { Menu } from '@/api/interface/system'

// 用户登录
export const loginApi = (params: Login.ReqLoginForm) => {
  return http.post<Login.ResLogin>('/kafka/login', params)
}

// 获取用户信息
export const getUserInfoApi = (userId: number) => {
  return http.get<Login.Userinfo>(`/kafka/info/${userId}`)
}

// 获取菜单列表
export const getAuthMenuListApi = () => {
  return http.get<Menu[]>(`/kafka/menu/list`)
}
